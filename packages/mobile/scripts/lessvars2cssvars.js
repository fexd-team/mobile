/**
 * Less 变量转 CSS 变量统一脚本
 *
 * 功能：
 * 1. 扫描所有组件的 style.less，建立全局变量表
 * 2. 为每个组件生成 .cssvars.less 文件
 * 3. 在文件顶部添加该组件使用的 CSS 变量初始化
 * 4. 转换 Less 变量为 CSS 变量，包裹运算为 calc()
 */

const fs = require('fs')
const path = require('path')
const glob = require('glob')
const lessCalcPlugin = require('./less-cssvar-calc-plugin')

const CSS_VAR_PREFIX = 'exd'
const SRC_DIR = path.resolve(__dirname, '../src')
const ES_DIR = path.resolve(__dirname, '../es')
const LIB_DIR = path.resolve(__dirname, '../lib')

// ========== 第一部分：变量扫描（复用 generate-cssvars.js 逻辑）==========

/**
 * 解析 Less 文件中的变量定义
 */
function parseLessFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const vars = {}
  const lines = content.split('\n')
  let skipNextVar = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim()

    // 检查 @no-cssvar 标记
    if (/\/\/\s*@no-cssvar|\/\*\s*@no-cssvar\s*\*\//.test(line)) {
      skipNextVar = true
      continue
    }

    // 跳过注释行
    if (trimmedLine.startsWith('//') || trimmedLine.startsWith('/*') || trimmedLine.startsWith('*')) {
      continue
    }

    // 匹配变量定义
    const match = trimmedLine.match(/^@([\w-]+)\s*:\s*([^;]+);/)

    if (match) {
      const varName = match[1]
      let value = match[2].trim()

      if (skipNextVar) {
        skipNextVar = false
        vars[varName] = { value, noCssVar: true }
        continue
      }

      // 跳过 prefix 变量
      if (varName.endsWith('-prefix')) {
        continue
      }

      // 跳过特殊值（Less 字符串转义）
      if (value.startsWith('~')) {
        continue
      }

      // 跳过 mixin 定义
      const isCssFunction = /^(rgb|rgba|hsl|hsla|calc|var|url|linear-gradient|radial-gradient)\(/.test(value)
      if (value.includes(')') && !isCssFunction) {
        continue
      }

      vars[varName] = { value, noCssVar: false }
    }

    if (!match && skipNextVar) {
      skipNextVar = false
    }
  }

  return vars
}

/**
 * 解析 ant-colors.less
 */
function parseAntColors() {
  const filePath = path.join(SRC_DIR, 'theme/ant-colors.less')
  const content = fs.readFileSync(filePath, 'utf-8')

  const colors = {}
  const regex = /@(ant-color-[\w-]+):\s*([^;]+);/g
  let match

  while ((match = regex.exec(content)) !== null) {
    colors[match[1]] = match[2].trim()
  }

  return colors
}

/**
 * 扫描所有组件，建立全局变量表
 */
function scanAllLessVariables() {
  console.log('📝 扫描所有 Less 变量...\n')

  // 1. 扫描 theme/vars.less（全局变量）
  const themeVarsPath = path.join(SRC_DIR, 'theme/vars.less')
  const allVars = {}

  if (fs.existsSync(themeVarsPath)) {
    const themeVars = parseLessFile(themeVarsPath)
    Object.assign(allVars, themeVars)
    console.log(`   ✅ 全局变量: ${Object.keys(themeVars).length} 个`)
  }

  // 2. 扫描所有组件的 style.less（排除 demos 目录）
  const lessFiles = glob
    .sync(path.join(SRC_DIR, 'exports/**/style.less'))
    .filter((file) => !file.includes('/demos/') && !file.includes('\\demos\\'))

  lessFiles.forEach((file) => {
    const vars = parseLessFile(file)
    Object.assign(allVars, vars)
  })

  console.log(`   ✅ 组件变量: ${Object.keys(allVars).length} 个`)

  // 3. 解析 Ant 颜色
  const antColors = parseAntColors()
  console.log(`   ✅ Ant 颜色: ${Object.keys(antColors).length} 个`)

  return { allVars, antColors }
}

/**
 * 将 Less 变量引用解析为实际值
 */
function resolveLessValue(value, allVars, antColors, depth = 0) {
  // 防止无限递归
  if (depth > 10) {
    return value
  }

  // 如果值中包含多个变量引用或表达式，需要递归替换
  let result = value
  let hasReplacement = true

  while (hasReplacement && depth < 10) {
    hasReplacement = false

    // 匹配所有 @variable 引用
    result = result.replace(/@([\w-]+)(?![a-zA-Z0-9_-])/g, (match, varName) => {
      hasReplacement = true

      // Ant 颜色
      if (varName.startsWith('ant-color-')) {
        return antColors[varName] || match
      }

      // 组件变量
      const varInfo = allVars[varName]
      if (varInfo && !varInfo.noCssVar) {
        return varInfo.value
      }

      return match
    })

    depth++
  }

  return result
}

/**
 * 分析变量的依赖关系，识别引用了其他变量的变量
 * @param {Object} allVars - 所有变量
 * @param {Object} antColors - Ant 颜色变量
 * @returns {Object} 变量依赖映射 { varName: referencedVarName }
 */
function analyzeVariableDependencies(allVars, antColors) {
  const dependencies = {}

  Object.keys(allVars).forEach((varName) => {
    const varInfo = allVars[varName]
    if (varInfo.noCssVar) return

    const value = varInfo.value.trim()

    // 检查值是否是单个变量引用（@xxx 格式）
    const singleVarMatch = value.match(/^@([\w-]+)$/)
    if (singleVarMatch) {
      const referencedVar = singleVarMatch[1]

      // 确保引用的是有效变量
      if (allVars[referencedVar] || antColors[referencedVar]) {
        dependencies[varName] = referencedVar
      }
    }
  })

  return dependencies
}

// ========== 第二部分：变量提取 ==========

/**
 * 提取组件定义的变量（不是使用的变量）
 */
function extractDefinedVariables(content, allVars, antColors) {
  const lines = content.split('\n')
  const componentVars = []
  const antColorVars = new Set()

  let skipNextVar = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim()

    // 检查 @no-cssvar 标记
    if (/\/\/\s*@no-cssvar|\/\*\s*@no-cssvar\s*\*\//.test(line)) {
      skipNextVar = true
      continue
    }

    // 跳过注释行
    if (trimmedLine.startsWith('//') || trimmedLine.startsWith('/*') || trimmedLine.startsWith('*')) {
      continue
    }

    // 匹配变量定义（支持缩进，即选择器内部的变量）
    const match = trimmedLine.match(/^@([\w-]+)\s*:\s*([^;]+);/)

    if (match) {
      const varName = match[1]
      const value = match[2].trim()

      // 跳过标记为 @no-cssvar 的变量
      if (skipNextVar) {
        skipNextVar = false
        continue
      }

      // 跳过 prefix 变量
      if (varName.endsWith('-prefix')) {
        continue
      }

      // 跳过特殊值（Less 字符串转义）
      if (value.startsWith('~')) {
        continue
      }

      // 跳过 mixin 定义
      const isCssFunction = /^(rgb|rgba|hsl|hsla|calc|var|url|linear-gradient|radial-gradient)\(/.test(value)
      if (value.includes(')') && !isCssFunction) {
        continue
      }

      // 该组件定义的变量
      componentVars.push({ name: varName, value: `@${varName}` })

      // 同时收集该变量值中引用的 Ant 颜色
      const antColorRefs = value.match(/@(ant-color-[\w-]+)(?![a-zA-Z0-9_-])/g) || []
      antColorRefs.forEach((ref) => {
        const colorName = ref.slice(1)
        if (antColors[colorName]) {
          antColorVars.add(colorName)
        }
      })
    }

    if (!match && skipNextVar) {
      skipNextVar = false
    }
  }

  // 转换为数组
  const antColorVarsArray = Array.from(antColorVars).map((name) => ({
    name,
    value: antColors[name],
  }))

  return { componentVars, antColorVars: antColorVarsArray }
}

/**
 * 生成 CSS 变量初始化代码
 * @param {Object} definedVars - 组件定义的变量（不是使用的变量）
 * @param {Object} varDependencies - 变量依赖关系映射
 * @param {Object} options - 选项
 * @param {boolean} options.skipDependentVars - 是否跳过有依赖关系的变量（使用 fallback 代替）
 * @returns {string} CSS 变量初始化代码
 */
function generateCssVarsInit(definedVars, varDependencies = {}, options = {}) {
  const { componentVars, antColorVars } = definedVars
  const { skipDependentVars = false } = options

  if (componentVars.length === 0 && antColorVars.length === 0) {
    return ''
  }

  let init = ':root {\n'

  // Ant 颜色变量（直接使用实际值）
  if (antColorVars.length > 0) {
    init += '  /* Ant Design 颜色 */\n'
    antColorVars.forEach((v) => {
      init += `  --${v.name}: ${v.value};\n`
    })
    init += '\n'
  }

  // 组件变量（引用 Less 变量）
  if (componentVars.length > 0) {
    init += '  /* 组件变量 */\n'
    componentVars.forEach((v) => {
      // 如果启用 skipDependentVars 且该变量有依赖，则跳过（不在 :root 定义）
      // 这样就只能通过 fallback 获取值
      if (skipDependentVars && varDependencies[v.name]) {
        init += `  /* --${CSS_VAR_PREFIX}-${v.name}: 使用 fallback 机制，依赖 --${CSS_VAR_PREFIX}-${
          varDependencies[v.name]
        } */\n`
      } else {
        init += `  --${CSS_VAR_PREFIX}-${v.name}: ${v.value};\n`
      }
    })
  }

  init += '}\n\n'

  return init
}

// ========== 第三部分：文件处理（复用 generate-cssvars-styles.js 逻辑）==========

/**
 * 处理 @import 语句
 */
function processImports(content) {
  let result = content

  // 替换组件样式引入 - 支持带引号和不带引号的格式
  // 格式1: @import './path/style.less';
  result = result.replace(/@import\s+['"]([^'"]+\/style)\.less['"];/g, (match, componentPath) => {
    return `@import '${componentPath}.cssvars.less';`
  })

  // 格式2: @import './path/style';
  result = result.replace(/@import\s+['"]([^'"]+\/style)['"]\s*;/g, (match, componentPath) => {
    return `@import '${componentPath}.cssvars.less';`
  })

  // 格式3: @import 'path/style' (无引号，可能有注释)
  result = result.replace(/@import\s+([^\s;'"]+\/style)(?:\.less)?\s*;/g, (match, componentPath) => {
    return `@import '${componentPath}.cssvars.less';`
  })

  // 替换 theme/vars.less 引入 - 支持多种格式
  // 格式1: @import './theme/vars.less';
  result = result.replace(/@import\s+['"]([^'"]*?\/theme\/vars)\.less['"];/g, (match, themePath) => {
    return `@import '${themePath}.cssvars.less';`
  })

  // 格式2: @import './theme/vars';
  result = result.replace(/@import\s+['"]([^'"]*?\/theme\/vars)['"]\s*;/g, (match, themePath) => {
    return `@import '${themePath}.cssvars.less';`
  })

  // 格式3: @import path/theme/vars (无引号)
  result = result.replace(/@import\s+([^\s;'"]*?\/theme\/vars)(?:\.less)?\s*;/g, (match, themePath) => {
    return `@import '${themePath}.cssvars.less';`
  })

  return result
}

/**
 * 应用 Less 变量替换
 * @param {string} content - 文件内容
 * @param {Object} allVars - 所有变量
 * @param {Object} antColors - Ant 颜色变量
 * @param {Object} varDependencies - 变量依赖关系映射
 */
function applyModifyVars(content, allVars, antColors, varDependencies = {}) {
  let result = content
  const lines = content.split('\n')

  const processedLines = lines.map((line) => {
    const trimmedLine = line.trim()

    // 跳过注释行
    if (trimmedLine.startsWith('//') || trimmedLine.startsWith('/*') || trimmedLine.startsWith('*')) {
      return line
    }

    // 处理 Less 变量定义行（格式：@varname: value; 或 @varname: value; // comment）
    // 需要将值中的 Less 变量引用替换为 CSS 变量引用
    const varDefMatch = trimmedLine.match(/^(@[\w-]+\s*:\s*)([^;]+)(;)(.*)$/)
    if (varDefMatch) {
      const indent = line.match(/^(\s*)/)[1]
      const varDecl = varDefMatch[1] // @varname:
      let value = varDefMatch[2].trim() // value 部分
      const semicolon = varDefMatch[3] // ;
      const comment = varDefMatch[4] // 行尾注释（如果有）

      // 提取变量名（去掉 @ 和 :）
      const currentVarName = varDecl.match(/@([\w-]+)/)[1]

      // 如果这个变量有依赖关系，注释掉这个定义
      // 这样 Less 编译器就不会优化掉 fallback
      if (varDependencies[currentVarName]) {
        return `${indent}// ${varDecl}${value}${semicolon}${comment} (使用 fallback，见使用处)`
      }

      // 替换值中的 Less 变量引用为 CSS 变量引用
      // 替换组件变量
      Object.keys(allVars).forEach((varName) => {
        const varInfo = allVars[varName]
        if (varInfo.noCssVar) return

        const regex = new RegExp(`@${varName}(?![a-zA-Z0-9_-])`, 'g')
        value = value.replace(regex, `var(--${CSS_VAR_PREFIX}-${varName})`)
      })

      // 替换 Ant 颜色变量
      Object.keys(antColors).forEach((colorName) => {
        const regex = new RegExp(`@${colorName}(?![a-zA-Z0-9_-])`, 'g')
        value = value.replace(regex, `var(--${colorName})`)
      })

      return `${indent}${varDecl}${value}${semicolon}${comment}`
    }

    let processedLine = line

    // 替换组件变量（带 fallback 支持）
    Object.keys(allVars).forEach((varName) => {
      const varInfo = allVars[varName]
      if (varInfo.noCssVar) return

      const regex = new RegExp(`@${varName.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}(?![a-zA-Z0-9_-])`, 'g')

      // 检查是否有依赖关系
      const fallbackVar = varDependencies[varName]
      let replacement

      if (fallbackVar) {
        // 生成带 fallback 的替换
        if (antColors[fallbackVar]) {
          replacement = `var(--${CSS_VAR_PREFIX}-${varName}, var(--${fallbackVar}))`
        } else {
          replacement = `var(--${CSS_VAR_PREFIX}-${varName}, var(--${CSS_VAR_PREFIX}-${fallbackVar}))`
        }
      } else {
        replacement = `var(--${CSS_VAR_PREFIX}-${varName})`
      }

      processedLine = processedLine.replace(regex, replacement)
    })

    // 替换 Ant 颜色变量
    Object.keys(antColors).forEach((colorName) => {
      const regex = new RegExp(`@${colorName.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}(?![a-zA-Z0-9_-])`, 'g')
      processedLine = processedLine.replace(regex, `var(--${colorName})`)
    })

    return processedLine
  })

  return processedLines.join('\n')
}

/**
 * 查找 Less 变量定义块的结束位置
 * @param {string} content - 文件内容
 * @returns {number} 变量定义块结束的行索引
 */
function findVariableDefinitionsEnd(content) {
  const lines = content.split('\n')
  let lastVarLineIndex = -1
  let inCommentBlock = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim()

    // 跟踪多行注释
    if (trimmedLine.includes('/*')) {
      inCommentBlock = true
    }
    if (trimmedLine.includes('*/')) {
      inCommentBlock = false
      continue
    }

    // 跳过注释
    if (inCommentBlock || trimmedLine.startsWith('//')) {
      continue
    }

    // 跳过空行
    if (!trimmedLine) {
      continue
    }

    // 跳过 @import 语句
    if (trimmedLine.startsWith('@import')) {
      continue
    }

    // 检查是否是变量定义
    if (/^@[\w-]+\s*:/.test(trimmedLine)) {
      lastVarLineIndex = i
    } else if (trimmedLine.startsWith('.') || trimmedLine.startsWith('&') || trimmedLine.startsWith(':root')) {
      // 遇到选择器，停止查找
      break
    }
  }

  return lastVarLineIndex
}

/**
 * 在 Less 变量定义后插入 CSS 变量初始化
 * @param {string} content - 转换后的内容
 * @param {string} cssVarsInit - CSS 变量初始化代码
 * @returns {string} 插入后的内容
 */
function insertCssVarsAfterLessVars(content, cssVarsInit) {
  if (!cssVarsInit) {
    return content
  }

  const lines = content.split('\n')
  const insertAfterLine = findVariableDefinitionsEnd(content)

  if (insertAfterLine === -1) {
    // 没有找到变量定义，插入到文件开头（在 @import 之后）
    let importEndIndex = -1
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('@import')) {
        importEndIndex = i
      } else if (importEndIndex !== -1 && lines[i].trim() !== '') {
        break
      }
    }

    if (importEndIndex !== -1) {
      lines.splice(importEndIndex + 1, 0, '', cssVarsInit.trim())
    } else {
      lines.unshift(cssVarsInit.trim(), '')
    }
  } else {
    // 在变量定义块之后插入
    lines.splice(insertAfterLine + 1, 0, '', cssVarsInit.trim())
  }

  return lines.join('\n')
}

/**
 * 处理单个 Less 文件
 */
async function processLessFile(lessFilePath, globalContext) {
  const { allVars, antColors, plugin, varDependencies } = globalContext

  try {
    // 读取原始 Less 文件
    let content = fs.readFileSync(lessFilePath, 'utf-8')

    // 判断是否是 theme 目录的文件（不需要 fallback 处理）
    const isThemeFile = lessFilePath.includes('/theme/') || lessFilePath.includes('\\theme\\')

    // 第一步：提取该组件定义的变量
    const definedVars = extractDefinedVariables(content, allVars, antColors)

    // 第二步：生成 CSS 变量初始化代码（必须在处理前生成，因为需要引用 @var）
    const cssVarsInit = generateCssVarsInit(definedVars, varDependencies || {}, {
      skipDependentVars: !isThemeFile, // theme 文件不启用 fallback 模式
    })

    // 第三步：处理 @import 语句
    content = processImports(content)

    // 第四步：使用插件预处理（转换运算为 calc()）
    if (plugin && typeof plugin.transformSource === 'function') {
      content = plugin.transformSource(content)
    }

    // 第五步：应用 Less 变量替换（传入依赖关系）
    // theme 文件不使用 fallback
    let transformedContent = applyModifyVars(content, allVars, antColors, isThemeFile ? {} : varDependencies || {})

    // 第六步：后处理 - 移除单个 CSS 变量的 calc() 包裹
    transformedContent = transformedContent.replace(/calc\((var\(--[\w-]+\))\)(?!\s*[\+\-\*\/])/g, '$1')

    // 第七步：在 Less 变量定义后插入 CSS 变量初始化
    transformedContent = insertCssVarsAfterLessVars(transformedContent, cssVarsInit)

    // 第八步：生成最终文件
    const cssvarsFilePath = lessFilePath.replace(/\.less$/, '.cssvars.less')

    const header = `/**
 * CSS 变量版本样式
 * 自动生成，请勿手动修改
 * 
 * 使用方式：
 *    import '@fexd/mobile/es/exports/Button/style.cssvars.less';
 * 
 * 说明：
 * - 已包含该组件使用的 CSS 变量初始化（:root 定义）
 * - 所有 Less 变量已替换为 var(--exd-xxx)
 * - 运算表达式已自动包裹 calc()
 */

`

    const finalContent = header + transformedContent

    // 写入文件
    fs.writeFileSync(cssvarsFilePath, finalContent, 'utf-8')

    return true
  } catch (error) {
    console.error(`   ❌ 处理失败: ${lessFilePath}`)
    console.error(`      ${error.message}`)
    return false
  }
}

/**
 * 处理根目录的 style.less（全量引入文件）
 */
async function processRootStyleFile(dir) {
  const rootStylePath = path.join(dir, 'style.less')
  if (!fs.existsSync(rootStylePath)) {
    return false
  }

  try {
    let content = fs.readFileSync(rootStylePath, 'utf-8')

    // 将所有组件的 style.less 引入替换为 style.cssvars.less
    content = content.replace(/(@import\s+['"]\.\/exports\/[^'"]+\/)style\.less(['"];)/g, '$1style.cssvars.less$2')

    const cssvarsFilePath = rootStylePath.replace(/\.less$/, '.cssvars.less')
    const header = `/**
 * CSS 变量版本 - 全量引入
 * 自动生成，请勿手动修改
 * 
 * 使用方式：
 *    import '@fexd/mobile/es/style.cssvars.less';
 * 
 * 说明：
 * - 引入所有组件的 CSS 变量版本样式
 * - 已包含所有组件的 CSS 变量初始化
 */

`

    fs.writeFileSync(cssvarsFilePath, header + content, 'utf-8')
    return true
  } catch (error) {
    console.error(`   ❌ 处理 style.cssvars.less 失败: ${error.message}`)
    return false
  }
}

/**
 * 处理指定目录
 */
async function processDirectory(dir, globalContext, label, specificComponents = null) {
  if (!fs.existsSync(dir)) {
    return { success: 0, fail: 0 }
  }

  console.log(`\n📂 处理 ${label} 目录...`)

  // 1. 处理 theme/vars.less
  const themeVarsPath = path.join(dir, 'theme/vars.less')
  let themeProcessed = false
  if (fs.existsSync(themeVarsPath)) {
    console.log(`   处理全局主题变量...`)
    const success = await processLessFile(themeVarsPath, globalContext)
    if (success) {
      console.log(`   ✅ theme/vars.cssvars.less\n`)
      themeProcessed = true
    } else {
      console.log(`   ❌ theme/vars.cssvars.less 处理失败\n`)
    }
  }

  /**
   * 检查组件或其任何父级组件是否标记为开发中
   * @param {string} filePath - 组件样式文件路径
   * @param {string} baseDir - 基础目录（src/es/lib）
   * @returns {boolean} 是否在开发中
   */
  function isUnderDevelopment(filePath, baseDir) {
    return false
    const relativePath = path.relative(baseDir, filePath)
    const parts = relativePath.split(path.sep)

    // 从当前目录向上逐级检查 .developing 文件
    // exports/List/Item/style.less -> 检查 Item, List, exports
    for (let i = parts.length - 2; i >= 0; i--) {
      const checkPath = path.join(baseDir, ...parts.slice(0, i + 1), '.developing')
      if (fs.existsSync(checkPath)) {
        return true
      }
    }

    return false
  }

  // 2. 处理组件样式
  const lessFiles = glob.sync(path.join(dir, 'exports/**/style.less')).filter((file) => {
    // 跳过 demos 目录
    if (file.includes('/demos/') || file.includes('\\demos\\')) {
      return false
    }

    // 跳过开发中的组件（包括其子组件）
    if (isUnderDevelopment(file, dir)) {
      return false
    }

    // 如果指定了组件列表，只处理指定的组件
    if (specificComponents && specificComponents.length > 0) {
      const relativePath = path.relative(dir, file)
      const componentName = relativePath
        .replace(/^exports[\\/]/, '')
        .replace(/[\\/]style\.less$/, '')
        .replace(/\\/g, '/')
      return specificComponents.some((c) => componentName === c || componentName.startsWith(c + '/'))
    }

    return true
  })

  console.log(`   找到 ${lessFiles.length} 个组件样式文件\n`)

  let successCount = themeProcessed ? 1 : 0
  let failCount = themeProcessed ? 0 : fs.existsSync(themeVarsPath) ? 1 : 0

  for (const file of lessFiles) {
    const relativePath = path.relative(dir, file)
    const componentName = relativePath.replace(/^exports[\\/]/, '').replace(/[\\/]style\.less$/, '')

    const success = await processLessFile(file, globalContext)

    if (success) {
      console.log(`   ✅ ${componentName.padEnd(30)} ${relativePath.replace(/\.less$/, '.cssvars.less')}`)
      successCount++
    } else {
      failCount++
    }
  }

  console.log(`\n   📊 成功: ${successCount} 个，失败: ${failCount} 个`)

  // 3. 处理根目录的 style.less（全量引入）
  if (!specificComponents) {
    // 只有在处理全部组件时才处理根样式
    console.log(`\n   处理根样式文件...`)
    const rootStyleProcessed = await processRootStyleFile(dir)
    if (rootStyleProcessed) {
      console.log(`   ✅ style.cssvars.less`)
      successCount++
    } else {
      console.log(`   ℹ️  style.less 不存在或处理失败`)
    }
  }

  return { success: successCount, fail: failCount }
}

// ========== 主流程 ==========

async function main() {
  const args = process.argv.slice(2)
  const componentsArg = args.find((arg) => arg.startsWith('--components='))
  const targetArg = args.find((arg) => arg.startsWith('--target='))

  const specificComponents = componentsArg ? componentsArg.split('=')[1].split(',') : null
  const targetDirs = targetArg ? targetArg.split('=')[1].split(',') : ['src', 'es', 'lib']

  console.log('\n🎨 Less 变量转 CSS 变量统一脚本\n')
  console.log('='.repeat(80))

  // 1. 扫描所有变量
  const { allVars, antColors } = scanAllLessVariables()

  // 2. 分析变量依赖关系
  const varDependencies = analyzeVariableDependencies(allVars, antColors)
  console.log(`\n   ✅ 变量依赖分析: 找到 ${Object.keys(varDependencies).length} 个引用型变量`)
  if (Object.keys(varDependencies).length > 0) {
    const examples = Object.keys(varDependencies)
      .slice(0, 3)
      .map((k) => `${k} -> ${varDependencies[k]}`)
      .join(', ')
    console.log(`   📌 示例: ${examples}`)
  }

  // 3. 创建 modifyVars 映射（用于 lessPlugin）
  const modifyVars = {}
  Object.keys(allVars).forEach((name) => {
    if (!allVars[name].noCssVar) {
      modifyVars[name] = `var(--${CSS_VAR_PREFIX}-${name})`
    }
  })
  Object.keys(antColors).forEach((name) => {
    modifyVars[name] = `var(--${name})`
  })

  console.log(`\n   ✅ 变量映射表: ${Object.keys(modifyVars).length} 个\n`)

  // 4. 创建插件实例
  const plugin = new lessCalcPlugin.LessCalcPlugin({
    modifyVars,
    debug: false,
  })

  const globalContext = { allVars, antColors, plugin, varDependencies }

  // 4. 处理目标目录
  const stats = { total: 0, success: 0, fail: 0 }

  if (specificComponents) {
    console.log(`\n🎯 只处理指定组件: ${specificComponents.join(', ')}\n`)
  }

  if (targetDirs.includes('src') && fs.existsSync(SRC_DIR)) {
    const result = await processDirectory(SRC_DIR, globalContext, 'src', specificComponents)
    stats.success += result.success
    stats.fail += result.fail
  }

  if (targetDirs.includes('es') && fs.existsSync(ES_DIR)) {
    const result = await processDirectory(ES_DIR, globalContext, 'es', specificComponents)
    stats.success += result.success
    stats.fail += result.fail
  }

  if (targetDirs.includes('lib') && fs.existsSync(LIB_DIR)) {
    const result = await processDirectory(LIB_DIR, globalContext, 'lib', specificComponents)
    stats.success += result.success
    stats.fail += result.fail
  }

  console.log('\n' + '='.repeat(80))
  console.log('\n✨ 处理完成！\n')
  console.log(`📊 总计: 成功 ${stats.success} 个，失败 ${stats.fail} 个`)

  if (stats.fail > 0) {
    process.exit(1)
  }
}

// 导出函数供测试使用
module.exports = {
  scanAllLessVariables,
  extractDefinedVariables,
  generateCssVarsInit,
  parseLessFile,
  parseAntColors,
  resolveLessValue,
  analyzeVariableDependencies,
}

// 直接运行
if (require.main === module) {
  main().catch((err) => {
    console.error('\n❌ 执行失败:', err)
    process.exit(1)
  })
}
