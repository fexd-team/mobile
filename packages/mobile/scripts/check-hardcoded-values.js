const fs = require('fs')
const path = require('path')

// 配置
const CONFIG = {
  sourceDir: path.join(__dirname, '../src/exports'),
  outputFile: path.join(__dirname, '../hardcoded-values.log'),
  excludePatterns: ['.cssvars.less'],
  excludeDirs: ['demos'], // 需要忽略的目录
  developingMarker: '.developing', // 开发中的标记文件
}

// 需要忽略的合理硬编码值
const IGNORE_VALUES = {
  px: [
    '0px',
    '1px', // 常见的边框、分隔线
    // '2px',
  ],
  colors: [
    'transparent',
    'inherit',
    'currentColor',
    'none',
    // '#fff',
    // '#ffffff',
    // 'white',
    // '#000',
    // '#000000',
    // 'black',
  ],
  'z-index': ['0', '-1', '1'],
  'line-height': ['1', '1.0'],
  animation: [],
  transform: ['0px', '0deg', '0%', '100%', '50%', '-50%'],
}

// 正则表达式
const PATTERNS = {
  // 匹配 px 值（包括 * @size-scale 的情况）
  px: /(?<![-\w])(-?\d+(?:\.\d+)?px)\b/g,

  // 匹配十六进制颜色
  hexColor: /#[0-9a-fA-F]{3,8}\b/g,

  // 匹配 rgb/rgba
  rgbColor: /rgba?\([^)]+\)/g,

  // 匹配 hsl/hsla
  hslColor: /hsla?\([^)]+\)/g,

  // 匹配 CSS 颜色名称（常见的）
  namedColor:
    /\b(red|blue|green|yellow|orange|purple|pink|brown|gray|grey|cyan|magenta|lime|olive|navy|teal|aqua|maroon|fuchsia|silver|gold)\b/gi,

  // // 匹配 z-index 值（正整数或负整数）
  // zIndex: /z-index\s*:\s*(-?\d+)/gi,

  // 匹配 line-height 值（数字，不带单位的）
  lineHeight: /line-height\s*:\s*(\d+(?:\.\d+)?)\s*;/gi,

  // 匹配动画时间（ms 或 s，不在变量中）
  animationDuration:
    /(?:transition-duration|animation-duration|transition|animation)\s*:\s*[^;]*?(\d+(?:\.\d+)?(?:ms|s))/gi,

  // 匹配 transform 中的数值（包括负数）
  transform: /transform\s*:\s*[^;]*?(-?\d+(?:\.\d+)?(?:px|deg|%|turn))/gi,
}

// 检查是否应该忽略该值
function shouldIgnore(value, type) {
  if (!IGNORE_VALUES[type]) return false
  const normalizedValue = value.toLowerCase().trim()
  return IGNORE_VALUES[type].some((ignored) => normalizedValue === ignored.toLowerCase())
}

// 检查是否在注释中
function isInComment(content, position) {
  // 检查是否在单行注释中
  const beforeContent = content.substring(0, position)
  const lastNewline = beforeContent.lastIndexOf('\n')
  const lineContent = beforeContent.substring(lastNewline + 1)
  if (lineContent.includes('//')) {
    return true
  }

  // 检查是否在多行注释中
  const lastCommentStart = beforeContent.lastIndexOf('/*')
  const lastCommentEnd = beforeContent.lastIndexOf('*/')
  if (lastCommentStart > lastCommentEnd) {
    return true
  }

  return false
}

// 检查是否在变量定义行
function isVariableDefinition(content, position) {
  const beforeContent = content.substring(0, position)
  const lastNewline = beforeContent.lastIndexOf('\n')
  const lineContent = beforeContent.substring(lastNewline + 1)
  // 检查是否是 Less 变量定义
  return /^\s*@[\w-]+\s*:/.test(lineContent)
}

// 检查是否在 Less 变量名中（如 @color-gray-secondary 中的 gray）
function isInVariableName(content, position) {
  const beforeContent = content.substring(0, position)
  const afterContent = content.substring(position)

  // 向前查找最近的 @
  const lastAt = beforeContent.lastIndexOf('@')
  // 向后查找最近的空格、冒号、分号或换行
  const nextBreak = afterContent.search(/[\s:;)\n]/)

  if (lastAt === -1) return false

  // 检查 @ 和当前位置之间是否只有变量名字符
  const betweenContent = beforeContent.substring(lastAt)
  return /^@[\w-]*$/.test(betweenContent) && (nextBreak === -1 || /^[\w-]*/.test(afterContent.substring(0, nextBreak)))
}

// 检查是否在 @import 语句中
function isInImport(content, position) {
  const beforeContent = content.substring(0, position)
  const lastNewline = beforeContent.lastIndexOf('\n')
  const lineContent = beforeContent.substring(lastNewline + 1)
  return /^\s*@import/.test(lineContent)
}

// 检查目录或其父目录是否有 .developing 文件
function isDevelopingComponent(filePath) {
  // 从文件路径向上查找，直到 exports 目录
  let currentDir = path.dirname(filePath)
  const exportsDir = CONFIG.sourceDir

  while (currentDir.startsWith(exportsDir) && currentDir !== exportsDir) {
    const developingFile = path.join(currentDir, CONFIG.developingMarker)
    if (fs.existsSync(developingFile)) {
      return {
        isDeveloping: true,
        componentName: path.relative(exportsDir, currentDir).split(path.sep)[0],
      }
    }
    currentDir = path.dirname(currentDir)
  }

  return {
    isDeveloping: false,
    componentName: null,
  }
}

// 检查是否是 @no-cssvar 标记的行
function isNoCssvarLine(content, position) {
  const beforeContent = content.substring(0, position)
  const lastNewline = beforeContent.lastIndexOf('\n')
  const lineContent = content.substring(lastNewline + 1)
  return lineContent.includes('@no-cssvar')
}

// 检查是否有 @hardcoded-ignore 标记
function hasHardcodedIgnoreMarker(content, position) {
  const beforeContent = content.substring(0, position)
  const afterContent = content.substring(position)
  const lastNewline = beforeContent.lastIndexOf('\n')
  const nextNewline = afterContent.indexOf('\n')

  // 获取当前行完整内容（从行首到行尾）
  const lineContent = content.substring(lastNewline + 1, nextNewline > 0 ? position + nextNewline : content.length)

  // 检查当前行是否有标记
  if (lineContent.includes('@hardcoded-ignore')) {
    return true
  }

  // 检查上一行是否有标记
  const prevLineStart = beforeContent.lastIndexOf('\n', lastNewline - 1)
  const prevLineContent = beforeContent.substring(prevLineStart + 1, lastNewline)
  if (prevLineContent.trim().includes('@hardcoded-ignore')) {
    return true
  }

  return false
}

// 获取值所在的行号和上下文
function getContext(content, position) {
  const lines = content.substring(0, position).split('\n')
  const lineNumber = lines.length
  const beforeContent = content.substring(0, position)
  const afterContent = content.substring(position)
  const lastNewline = beforeContent.lastIndexOf('\n')
  const nextNewline = afterContent.indexOf('\n')
  const lineContent = content
    .substring(lastNewline + 1, nextNewline > 0 ? position + nextNewline : content.length)
    .trim()

  return {
    lineNumber,
    lineContent,
  }
}

// 分析单个文件
function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const absolutePath = path.resolve(filePath)
  const developingInfo = isDevelopingComponent(filePath)
  const results = []

  // 检测 px 值
  let match
  const pxPattern = new RegExp(PATTERNS.px)
  while ((match = pxPattern.exec(content)) !== null) {
    const value = match[1]
    const position = match.index

    // 检查是否有 @hardcoded-ignore 标记
    const hasIgnoreMarker = hasHardcodedIgnoreMarker(content, position)

    // 跳过需要忽略的情况（但保留有标记的）
    if (!hasIgnoreMarker) {
      if (shouldIgnore(value, 'px')) continue
      if (isInComment(content, position)) continue
      if (isVariableDefinition(content, position)) continue
      if (isInImport(content, position)) continue
      if (isNoCssvarLine(content, position)) continue
    } else {
      // 有标记的情况下，只跳过注释和变量定义
      if (isInComment(content, position)) continue
      if (isVariableDefinition(content, position)) continue
    }

    const context = getContext(content, position)
    results.push({
      type: 'px',
      value,
      isIgnored: hasIgnoreMarker,
      ...context,
    })
  }

  // 检测十六进制颜色
  const hexPattern = new RegExp(PATTERNS.hexColor)
  while ((match = hexPattern.exec(content)) !== null) {
    const value = match[0]
    const position = match.index
    const hasIgnoreMarker = hasHardcodedIgnoreMarker(content, position)

    if (!hasIgnoreMarker) {
      if (shouldIgnore(value, 'colors')) continue
      if (isInComment(content, position)) continue
      if (isVariableDefinition(content, position)) continue
      if (isNoCssvarLine(content, position)) continue
    } else {
      if (isInComment(content, position)) continue
      if (isVariableDefinition(content, position)) continue
    }

    const context = getContext(content, position)
    results.push({
      type: 'color',
      value,
      isIgnored: hasIgnoreMarker,
      ...context,
    })
  }

  // 检测 rgb/rgba
  const rgbPattern = new RegExp(PATTERNS.rgbColor)
  while ((match = rgbPattern.exec(content)) !== null) {
    const value = match[0]
    const position = match.index
    const hasIgnoreMarker = hasHardcodedIgnoreMarker(content, position)

    if (!hasIgnoreMarker) {
      if (shouldIgnore(value, 'colors')) continue
      if (isInComment(content, position)) continue
      if (isVariableDefinition(content, position)) continue
      if (isNoCssvarLine(content, position)) continue
    } else {
      if (isInComment(content, position)) continue
      if (isVariableDefinition(content, position)) continue
    }

    const context = getContext(content, position)
    results.push({
      type: 'color',
      value,
      isIgnored: hasIgnoreMarker,
      ...context,
    })
  }

  // 检测 hsl/hsla
  const hslPattern = new RegExp(PATTERNS.hslColor)
  while ((match = hslPattern.exec(content)) !== null) {
    const value = match[0]
    const position = match.index
    const hasIgnoreMarker = hasHardcodedIgnoreMarker(content, position)

    if (!hasIgnoreMarker) {
      if (shouldIgnore(value, 'colors')) continue
      if (isInComment(content, position)) continue
      if (isVariableDefinition(content, position)) continue
      if (isNoCssvarLine(content, position)) continue
    } else {
      if (isInComment(content, position)) continue
      if (isVariableDefinition(content, position)) continue
    }

    const context = getContext(content, position)
    results.push({
      type: 'color',
      value,
      isIgnored: hasIgnoreMarker,
      ...context,
    })
  }

  // 检测颜色名称（在属性值中）
  const namedPattern = new RegExp(PATTERNS.namedColor)
  while ((match = namedPattern.exec(content)) !== null) {
    const value = match[0]
    const position = match.index
    const hasIgnoreMarker = hasHardcodedIgnoreMarker(content, position)

    if (!hasIgnoreMarker) {
      if (shouldIgnore(value, 'colors')) continue
      if (isInComment(content, position)) continue
      if (isVariableDefinition(content, position)) continue
      if (isNoCssvarLine(content, position)) continue
      if (isInVariableName(content, position)) continue // 跳过 Less 变量名中的颜色关键词

      // 检查是否在 CSS 属性值中（避免误报类名等）
      const context = getContext(content, position)
      if (!/:\s*[^;]*$/.test(context.lineContent.substring(0, context.lineContent.indexOf(value)))) {
        continue
      }
    } else {
      if (isInComment(content, position)) continue
      if (isVariableDefinition(content, position)) continue
    }

    const context = getContext(content, position)
    results.push({
      type: 'color',
      value,
      isIgnored: hasIgnoreMarker,
      ...context,
    })
  }

  if (PATTERNS.zIndex) {
    // 检测 z-index 值
    const zIndexPattern = new RegExp(PATTERNS.zIndex)
    while ((match = zIndexPattern.exec(content)) !== null) {
      const value = match[1]
      const position = match.index
      const hasIgnoreMarker = hasHardcodedIgnoreMarker(content, position)

      if (!hasIgnoreMarker) {
        if (shouldIgnore(value, 'z-index')) continue
        if (isInComment(content, position)) continue
        if (isNoCssvarLine(content, position)) continue

        // 检查整行是否是 Less 变量定义
        const context = getContext(content, position)
        if (/^\s*@[\w-]+\s*:/.test(context.lineContent)) continue
      } else {
        if (isInComment(content, position)) continue
        const context = getContext(content, position)
        if (/^\s*@[\w-]+\s*:/.test(context.lineContent)) continue
      }

      const context = getContext(content, position)
      results.push({
        type: 'z-index',
        value,
        isIgnored: hasIgnoreMarker,
        ...context,
      })
    }
  }

  // 检测 line-height 值（纯数字）
  const lineHeightPattern = new RegExp(PATTERNS.lineHeight)
  while ((match = lineHeightPattern.exec(content)) !== null) {
    const value = match[1]
    const position = match.index
    const hasIgnoreMarker = hasHardcodedIgnoreMarker(content, position)

    if (!hasIgnoreMarker) {
      if (shouldIgnore(value, 'line-height')) continue
      if (isInComment(content, position)) continue
      if (isNoCssvarLine(content, position)) continue

      // 检查整行是否是 Less 变量定义
      const context = getContext(content, position)
      if (/^\s*@[\w-]+\s*:/.test(context.lineContent)) continue
    } else {
      if (isInComment(content, position)) continue
      const context = getContext(content, position)
      if (/^\s*@[\w-]+\s*:/.test(context.lineContent)) continue
    }

    const context = getContext(content, position)
    results.push({
      type: 'line-height',
      value,
      isIgnored: hasIgnoreMarker,
      ...context,
    })
  }

  // 检测动画时间
  if (PATTERNS.animationDuration) {
    const animationPattern = new RegExp(PATTERNS.animationDuration)
    while ((match = animationPattern.exec(content)) !== null) {
      const value = match[1]
      const position = match.index
      const hasIgnoreMarker = hasHardcodedIgnoreMarker(content, position)

      if (!hasIgnoreMarker) {
        if (isInComment(content, position)) continue
        if (isNoCssvarLine(content, position)) continue

        // 检查整行是否是 Less 变量定义
        const context = getContext(content, position)
        if (/^\s*@[\w-]+\s*:/.test(context.lineContent)) continue

        // 检查是否已经使用变量
        if (context.lineContent.includes('@') || context.lineContent.includes('var(')) continue
      } else {
        if (isInComment(content, position)) continue
        const context = getContext(content, position)
        if (/^\s*@[\w-]+\s*:/.test(context.lineContent)) continue
      }

      const context = getContext(content, position)
      results.push({
        type: 'animation',
        value,
        isIgnored: hasIgnoreMarker,
        ...context,
      })
    }
  }

  // 检测 transform 中的数值
  const transformPattern = new RegExp(PATTERNS.transform)
  while ((match = transformPattern.exec(content)) !== null) {
    const value = match[1]
    const position = match.index
    const hasIgnoreMarker = hasHardcodedIgnoreMarker(content, position)

    if (!hasIgnoreMarker) {
      if (shouldIgnore(value, 'transform')) continue
      if (isInComment(content, position)) continue
      if (isNoCssvarLine(content, position)) continue

      // 检查整行是否是 Less 变量定义
      const context = getContext(content, position)
      if (/^\s*@[\w-]+\s*:/.test(context.lineContent)) continue
    } else {
      if (isInComment(content, position)) continue
      const context = getContext(content, position)
      if (/^\s*@[\w-]+\s*:/.test(context.lineContent)) continue
    }

    const context = getContext(content, position)
    results.push({
      type: 'transform',
      value,
      isIgnored: hasIgnoreMarker,
      ...context,
    })
  }

  if (results.length > 0) {
    return {
      file: absolutePath,
      issues: results,
      isDeveloping: developingInfo.isDeveloping,
      componentName: developingInfo.componentName || path.relative(CONFIG.sourceDir, filePath).split(path.sep)[0],
    }
  }

  return null
}

// 递归扫描目录
function scanDirectory(dir) {
  const results = []

  function scan(currentDir) {
    const files = fs.readdirSync(currentDir)

    for (const file of files) {
      const fullPath = path.join(currentDir, file)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        // 跳过需要忽略的目录
        if (CONFIG.excludeDirs.includes(file)) {
          continue
        }
        scan(fullPath)
      } else if (stat.isFile() && file.endsWith('.less')) {
        // 排除 .cssvars.less 文件
        if (CONFIG.excludePatterns.some((pattern) => file.includes(pattern))) {
          continue
        }

        const result = analyzeFile(fullPath)
        if (result) {
          results.push(result)
        }
      }
    }
  }

  scan(dir)
  return results
}

// 生成报告
function generateReport(results) {
  const lines = []

  // 分离稳定组件、开发中组件和标记忽略的
  const stableResults = []
  const developingResults = []
  const ignoredResults = []

  results.forEach((result) => {
    const normalIssues = result.issues.filter((issue) => !issue.isIgnored)
    const ignoredIssues = result.issues.filter((issue) => issue.isIgnored)

    if (normalIssues.length > 0) {
      const normalResult = { ...result, issues: normalIssues }
      if (result.isDeveloping) {
        developingResults.push(normalResult)
      } else {
        stableResults.push(normalResult)
      }
    }

    if (ignoredIssues.length > 0) {
      ignoredResults.push({ ...result, issues: ignoredIssues })
    }
  })

  // 获取开发中的组件名称列表
  const developingComponents = [...new Set(developingResults.map((r) => r.componentName))].sort()

  lines.push('================================================================================')
  lines.push('硬编码值检测报告')
  lines.push('================================================================================')
  lines.push('')
  lines.push(`生成时间: ${new Date().toLocaleString('zh-CN')}`)
  lines.push(`扫描目录: ${CONFIG.sourceDir}`)
  lines.push('')

  if (results.length === 0) {
    lines.push('✅ 未发现硬编码值！')
  } else {
    // 总体统计
    const totalStats = { px: 0, color: 0, 'z-index': 0, 'line-height': 0, animation: 0, transform: 0 }
    const stableStatsObj = { px: 0, color: 0, 'z-index': 0, 'line-height': 0, animation: 0, transform: 0 }
    const developingStatsObj = { px: 0, color: 0, 'z-index': 0, 'line-height': 0, animation: 0, transform: 0 }
    const ignoredStatsObj = { px: 0, color: 0, 'z-index': 0, 'line-height': 0, animation: 0, transform: 0 }

    stableResults.forEach((result) => {
      result.issues.forEach((issue) => {
        totalStats[issue.type]++
        stableStatsObj[issue.type]++
      })
    })

    developingResults.forEach((result) => {
      result.issues.forEach((issue) => {
        totalStats[issue.type]++
        developingStatsObj[issue.type]++
      })
    })

    ignoredResults.forEach((result) => {
      result.issues.forEach((issue) => {
        ignoredStatsObj[issue.type]++
      })
    })

    lines.push('📊 总体统计')
    lines.push(`   文件总数: ${results.length} 个`)
    lines.push(`   - 稳定组件: ${stableResults.length} 个文件`)
    lines.push(`   - 开发中组件: ${developingResults.length} 个文件`)
    lines.push('')
    const total = Object.values(totalStats).reduce((sum, val) => sum + val, 0)
    const stableTotal = Object.values(stableStatsObj).reduce((sum, val) => sum + val, 0)
    const developingTotal = Object.values(developingStatsObj).reduce((sum, val) => sum + val, 0)
    const ignoredTotal = Object.values(ignoredStatsObj).reduce((sum, val) => sum + val, 0)

    lines.push('📈 硬编码值统计:')
    lines.push(`   总计: ${total} 个 (标记忽略: ${ignoredTotal} 个)`)
    lines.push(
      `   - px 值: ${totalStats.px} 个 (稳定: ${stableStatsObj.px}, 开发中: ${developingStatsObj.px}, 忽略: ${ignoredStatsObj.px})`,
    )
    lines.push(
      `   - 颜色值: ${totalStats.color} 个 (稳定: ${stableStatsObj.color}, 开发中: ${developingStatsObj.color}, 忽略: ${ignoredStatsObj.color})`,
    )
    if (totalStats['z-index'] > 0 || ignoredStatsObj['z-index'] > 0) {
      lines.push(
        `   - z-index: ${totalStats['z-index']} 个 (稳定: ${stableStatsObj['z-index']}, 开发中: ${developingStatsObj['z-index']}, 忽略: ${ignoredStatsObj['z-index']})`,
      )
    }
    if (totalStats['line-height'] > 0 || ignoredStatsObj['line-height'] > 0) {
      lines.push(
        `   - line-height: ${totalStats['line-height']} 个 (稳定: ${stableStatsObj['line-height']}, 开发中: ${developingStatsObj['line-height']}, 忽略: ${ignoredStatsObj['line-height']})`,
      )
    }
    if (totalStats.animation > 0 || ignoredStatsObj.animation > 0) {
      lines.push(
        `   - 动画时间: ${totalStats.animation} 个 (稳定: ${stableStatsObj.animation}, 开发中: ${developingStatsObj.animation}, 忽略: ${ignoredStatsObj.animation})`,
      )
    }
    if (totalStats.transform > 0 || ignoredStatsObj.transform > 0) {
      lines.push(
        `   - transform: ${totalStats.transform} 个 (稳定: ${stableStatsObj.transform}, 开发中: ${developingStatsObj.transform}, 忽略: ${ignoredStatsObj.transform})`,
      )
    }

    if (developingComponents.length > 0) {
      lines.push('')
      lines.push('🚧 开发中的组件:')
      developingComponents.forEach((comp) => {
        lines.push(`   - ${comp}`)
      })
    }

    lines.push('')
    lines.push('================================================================================')
    lines.push('')

    // 稳定组件详细信息
    if (stableResults.length > 0) {
      lines.push('✅ 稳定组件 (Stable Components)')
      lines.push('================================================================================')
      lines.push('')

      stableResults.forEach((result, index) => {
        lines.push(`${index + 1}. ${result.file}`)
        lines.push('   ' + '-'.repeat(76))

        const sortedIssues = result.issues.sort((a, b) => a.lineNumber - b.lineNumber)

        sortedIssues.forEach((issue) => {
          lines.push(`   行 ${issue.lineNumber.toString().padStart(4)}: [${issue.type.toUpperCase()}] ${issue.value}`)
          lines.push(`           ${issue.lineContent}`)
          lines.push('')
        })

        lines.push('')
      })

      lines.push('')
    }

    // 开发中组件详细信息
    if (developingResults.length > 0) {
      lines.push('🚧 开发中组件 (Developing Components)')
      lines.push('================================================================================')
      lines.push('')

      developingResults.forEach((result, index) => {
        lines.push(`${index + 1}. ${result.file}`)
        lines.push(`   [🚧 开发中: ${result.componentName}]`)
        lines.push('   ' + '-'.repeat(76))

        const sortedIssues = result.issues.sort((a, b) => a.lineNumber - b.lineNumber)

        sortedIssues.forEach((issue) => {
          lines.push(`   行 ${issue.lineNumber.toString().padStart(4)}: [${issue.type.toUpperCase()}] ${issue.value}`)
          lines.push(`           ${issue.lineContent}`)
          lines.push('')
        })

        lines.push('')
      })

      lines.push('')
    }

    // 标记忽略的硬编码值
    if (ignoredResults.length > 0) {
      lines.push('🏷️  已标记忽略 (Ignored with @hardcoded-ignore)')
      lines.push('================================================================================')
      lines.push('')

      ignoredResults.forEach((result, index) => {
        lines.push(`${index + 1}. ${result.file}`)
        if (result.isDeveloping) {
          lines.push(`   [🚧 开发中: ${result.componentName}]`)
        }
        lines.push('   ' + '-'.repeat(76))

        const sortedIssues = result.issues.sort((a, b) => a.lineNumber - b.lineNumber)

        sortedIssues.forEach((issue) => {
          lines.push(`   行 ${issue.lineNumber.toString().padStart(4)}: [${issue.type.toUpperCase()}] ${issue.value}`)
          lines.push(`           ${issue.lineContent}`)
          lines.push('')
        })

        lines.push('')
      })

      lines.push('')
    }
  }

  lines.push('================================================================================')
  lines.push('说明:')
  lines.push('  检测类型:')
  lines.push('    • px 值（包括 * @size-scale 形式，如 26px * @size-scale）')
  lines.push('    • 颜色值（十六进制、rgb/rgba、hsl/hsla、颜色名称）')
  lines.push('    • z-index 值（排除常见值 0, -1）')
  lines.push('    • line-height 纯数字值（排除常见值 1）')
  lines.push('    • 动画时间（transition-duration, animation-duration）')
  lines.push('    • transform 中的数值（包括负数和 * @size-scale 形式）')
  lines.push('')
  lines.push('  已自动忽略:')
  lines.push('    • demos 文件夹、.cssvars.less 文件')
  lines.push('    • 变量定义行、注释、@no-cssvar 标记的行')
  lines.push('    • Less 变量名中的颜色关键词（如 @color-gray-secondary）')
  lines.push('    • px 值: 0px, 1px, 2px')
  lines.push('    • 颜色: transparent, #fff, #000, white, black')
  lines.push('    • z-index: 0, -1')
  lines.push('    • line-height: 1')
  lines.push('    • transform: 0px, 0deg, 0%, 50%, -50%, 100% (居中定位等常见值)')
  lines.push('')
  lines.push('  标记功能:')
  lines.push('    • 使用 // @hardcoded-ignore 标记可将硬编码值归类到忽略组')
  lines.push('    • 标记可以放在当前行或上一行')
  lines.push('    • 示例: z-index: 99; // @hardcoded-ignore')
  lines.push('')
  lines.push('  其他:')
  lines.push('    • 文件路径为绝对路径，可在编辑器中直接跳转')
  lines.push('    • 🚧 标记: 包含 .developing 文件的组件及其子组件视为开发中')
  lines.push('    • 🏷️ 标记: 使用 @hardcoded-ignore 标记的硬编码值单独显示')
  lines.push('    • 建议: 优先处理稳定组件中的硬编码值')
  lines.push('================================================================================')

  return lines.join('\n')
}

// 主函数
function main() {
  console.log('\n🔍 开始扫描硬编码值...\n')

  if (!fs.existsSync(CONFIG.sourceDir)) {
    console.error(`❌ 错误: 源目录不存在: ${CONFIG.sourceDir}`)
    process.exit(1)
  }

  const results = scanDirectory(CONFIG.sourceDir)
  const report = generateReport(results)

  // 写入文件
  fs.writeFileSync(CONFIG.outputFile, report, 'utf-8')

  console.log(`✅ 扫描完成！`)
  console.log(`📄 报告已生成: ${CONFIG.outputFile}`)
  console.log('')

  if (results.length > 0) {
    const stableCount = results.filter((r) => !r.isDeveloping && r.issues.some((i) => !i.isIgnored)).length
    const developingCount = results.filter((r) => r.isDeveloping && r.issues.some((i) => !i.isIgnored)).length
    const ignoredCount = results.filter((r) => r.issues.some((i) => i.isIgnored)).length

    console.log(`⚠️  发现 ${results.length} 个文件包含硬编码值`)
    console.log(`   - 稳定组件: ${stableCount} 个文件`)
    console.log(`   - 开发中组件: ${developingCount} 个文件`)
    if (ignoredCount > 0) {
      console.log(`   - 标记忽略: ${ignoredCount} 个文件`)
    }
    console.log(`   请查看报告文件获取详细信息`)
  } else {
    console.log('✅ 未发现硬编码值！')
  }

  console.log('')
}

// 运行
if (require.main === module) {
  main()
}

module.exports = { analyzeFile, scanDirectory }
