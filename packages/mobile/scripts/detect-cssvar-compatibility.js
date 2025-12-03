/**
 * 检测 Less 代码与 CSS 变量方案的兼容性
 *
 * 检测使用 less2cssvars 方案后可能存在的不兼容问题：
 * - Less 颜色函数（darken、lighten、fade 等）- 只能编译时计算
 * - Less 数学函数（ceil、floor、percentage 等）- 只能编译时计算
 * - 条件语句（when）- 无法用于 CSS 变量
 * - 循环（each、递归 mixin）- 无法用于 CSS 变量
 * - 选择器插值（.@{prefix}）- 只能编译时生成
 *
 * 智能特性：
 * - 两阶段扫描：先建立全局变量索引，支持跨文件识别
 * - 语义分析：自动识别 mixin 参数，只在真正有问题时报警
 * - 零误报：已标记的变量及其使用场景自动跳过
 */

const fs = require('fs')
const path = require('path')
const glob = require('glob')

const SRC_DIR = path.resolve(__dirname, '../src')

// Less 颜色函数列表
const COLOR_FUNCTIONS = [
  'lighten',
  'darken',
  'saturate',
  'desaturate',
  'fadein',
  'fadeout',
  'fade',
  'spin',
  'mix',
  'tint',
  'shade',
  'greyscale',
  'contrast',
]

// Less 数学函数列表
const MATH_FUNCTIONS = [
  'ceil',
  'floor',
  'percentage',
  'round',
  'sqrt',
  'abs',
  'sin',
  'cos',
  'tan',
  'asin',
  'acos',
  'atan',
  'pi',
  'pow',
  'mod',
  'min',
  'max',
]

// Less 字符串函数
const STRING_FUNCTIONS = ['escape', 'e', 'replace', '% ', 'unit']

// 其他复杂特性
const COMPLEX_FEATURES = [
  'when', // 条件语句
  'each', // 循环
  'if', // if 函数
  '&:extend', // extend
  '@import', // import with options
]

class ComplexLessDetector {
  constructor(options = {}) {
    this.options = {
      verbose: options.verbose || false,
      ...options,
    }
    this.issues = []
    this.fileCount = 0
    this.issueCount = 0
    this.markedVars = new Set() // 存储所有带 @no-cssvar 标记的变量名
    this.markedVarsCount = 0 // 已标记的变量数量
  }

  /**
   * 检查变量是否已经有 @no-cssvar 标记
   */
  hasNoCssvarComment(lines, lineIndex) {
    // 检查前面几行是否有 @no-cssvar
    for (let i = Math.max(0, lineIndex - 3); i < lineIndex; i++) {
      const line = lines[i]
      if (/\/\/\s*@no-cssvar|\/\*\s*@no-cssvar\s*\*\//.test(line)) {
        return true
      }
    }
    return false
  }

  /**
   * 阶段 1：扫描所有文件，收集带 @no-cssvar 标记的变量
   */
  collectMarkedVariables(files) {
    console.log('📋 阶段 1：收集已标记的变量...\n')

    files.forEach((filePath) => {
      const content = fs.readFileSync(filePath, 'utf-8')
      const lines = content.split('\n')

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const trimmed = line.trim()

        // 跳过注释行本身
        if (trimmed.startsWith('//') || trimmed.startsWith('/*')) {
          continue
        }

        // 匹配变量定义
        const match = trimmed.match(/^@([\w-]+)\s*:/)
        if (match) {
          const varName = match[1]

          // 检查是否有 @no-cssvar 标记
          if (this.hasNoCssvarComment(lines, i)) {
            this.markedVars.add(varName)
          }
        }
      }
    })

    this.markedVarsCount = this.markedVars.size
    console.log(`   ✅ 找到 ${this.markedVarsCount} 个已标记的变量\n`)
  }

  /**
   * 检测单个文件
   */
  detectFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const relPath = path.relative(SRC_DIR, filePath)
    const fileIssues = []

    // 按行检测
    const lines = content.split('\n')
    lines.forEach((line, index) => {
      const lineNumber = index + 1
      const trimmed = line.trim()

      // 跳过注释
      if (trimmed.startsWith('//') || trimmed.startsWith('/*')) {
        return
      }

      // 检测颜色函数
      COLOR_FUNCTIONS.forEach((func) => {
        const pattern = new RegExp(`\\b${func}\\s*\\(`, 'g')
        if (pattern.test(line)) {
          // 检查函数参数是否包含变量
          const funcCall = this.extractFunctionCall(line, func)
          if (funcCall && funcCall.includes('@')) {
            // 提取函数参数中的所有变量
            const vars = funcCall.match(/@([\w-]+)/g) || []
            const varNames = vars.map((v) => v.slice(1)) // 去掉 @

            // 如果至少有一个变量已标记，说明开发者已经意识到这个问题
            // 跳过检测（因为可能包含 mixin 参数等动态变量）
            const hasMarkedVar = varNames.some((v) => this.markedVars.has(v))
            if (hasMarkedVar) {
              return
            }

            fileIssues.push({
              line: lineNumber,
              type: 'color-function',
              function: func,
              code: trimmed,
              severity: 'warning',
              message: `颜色函数 ${func}() 包含变量，无法在运行时计算`,
            })
          }
        }
      })

      // 检测数学函数
      MATH_FUNCTIONS.forEach((func) => {
        const pattern = new RegExp(`\\b${func}\\s*\\(`, 'g')
        if (pattern.test(line)) {
          const funcCall = this.extractFunctionCall(line, func)
          if (funcCall && funcCall.includes('@')) {
            // 提取函数参数中的所有变量
            const vars = funcCall.match(/@([\w-]+)/g) || []
            const varNames = vars.map((v) => v.slice(1)) // 去掉 @

            // 如果至少有一个变量已标记，说明开发者已经意识到这个问题
            // 跳过检测（因为可能包含 mixin 参数等动态变量）
            const hasMarkedVar = varNames.some((v) => this.markedVars.has(v))
            if (hasMarkedVar) {
              return
            }

            fileIssues.push({
              line: lineNumber,
              type: 'math-function',
              function: func,
              code: trimmed,
              severity: 'warning',
              message: `数学函数 ${func}() 包含变量，无法在运行时计算`,
            })
          }
        }
      })

      // 检测条件语句
      if (/\bwhen\b/.test(line) && line.includes('@')) {
        // 检查当前行是否有 @no-cssvar 标记
        if (this.hasNoCssvarComment(lines, index)) {
          return // 已标记，跳过
        }

        // 提取 when 条件中的所有变量
        const whenMatch = line.match(/when\s*\(([^)]+)\)/)
        if (whenMatch) {
          const condition = whenMatch[1]
          const vars = condition.match(/@([\w-]+)/g) || []
          const varNames = vars.map((v) => v.slice(1)) // 去掉 @

          // 检查是否有未标记的全局变量
          // 如果所有变量都已标记（说明是已知的不兼容变量），或者没有全局变量，就跳过
          const hasUnmarkedVar = varNames.some(
            (v) =>
              !this.markedVars.has(v) && // 未标记
              !/^(index|i|j|k|n|count|item|key|value|class|type|size)$/i.test(v), // 且不是常见的参数名
          )

          if (!hasUnmarkedVar) {
            return // 没有未标记的全局变量，跳过
          }
        }

        fileIssues.push({
          line: lineNumber,
          type: 'conditional',
          code: trimmed,
          severity: 'error',
          message: '条件语句（when）无法用于 CSS 变量',
        })
      }

      // 检测复杂的嵌套运算（多层括号）
      const parenDepth = this.getMaxParenDepth(line)
      if (parenDepth >= 3 && line.includes('@') && /[\+\-\*\/]/.test(line)) {
        // 检查当前行是否有 @no-cssvar 标记
        if (!this.hasNoCssvarComment(lines, index)) {
          fileIssues.push({
            line: lineNumber,
            type: 'complex-operation',
            code: trimmed,
            severity: 'info',
            message: `检测到复杂嵌套运算（${parenDepth}层括号），请验证转换结果`,
          })
        }
      }

      // 检测字符串插值中的运算（只检查属性值部分）
      if (line.includes(':') && /@\{[^}]+[\+\-\*\/][^}]+\}/.test(line)) {
        const colonIndex = line.indexOf(':')
        const afterColon = line.substring(colonIndex)
        if (/@\{[^}]+[\+\-\*\/][^}]+\}/.test(afterColon)) {
          // 检查当前行是否有 @no-cssvar 标记
          if (!this.hasNoCssvarComment(lines, index)) {
            fileIssues.push({
              line: lineNumber,
              type: 'interpolation-operation',
              code: trimmed,
              severity: 'warning',
              message: '字符串插值中的运算无法转换为 calc()',
            })
          }
        }
      }

      // 检测 each 循环
      if (/\.each\s*\(/.test(line) || (/@\{[^}]+\}/.test(line) && line.includes('each'))) {
        // 检查当前行是否有 @no-cssvar 标记
        if (this.hasNoCssvarComment(lines, index)) {
          return // 已标记，跳过
        }

        fileIssues.push({
          line: lineNumber,
          type: 'loop',
          code: trimmed,
          severity: 'error',
          message: '循环（each）无法用于 CSS 变量',
        })
      }

      // 检测选择器中的变量插值
      // 如 .@{prefix}-item 或 .class-@{name}
      if (/^[\s.#&]*\..*@\{[\w-]+\}/.test(line) && !line.includes(':')) {
        // 提取变量名
        const varMatch = line.match(/@\{([\w-]+)\}/)
        if (varMatch) {
          const varName = varMatch[1]

          // 检查该变量是否在已标记列表中（支持跨文件）
          if (this.markedVars.has(varName)) {
            return // 已标记，跳过
          }
        }

        fileIssues.push({
          line: lineNumber,
          type: 'selector-interpolation',
          code: trimmed,
          severity: 'error',
          message: '选择器名称中的变量插值无法用 CSS 变量（只能编译时生成）',
        })
      }
    })

    if (fileIssues.length > 0) {
      this.issues.push({
        file: relPath,
        issues: fileIssues,
      })
      this.issueCount += fileIssues.length
    }

    this.fileCount++
    return fileIssues
  }

  /**
   * 提取函数调用内容
   */
  extractFunctionCall(line, funcName) {
    const startIndex = line.indexOf(funcName + '(')
    if (startIndex === -1) return null

    let depth = 0
    let start = -1
    let end = -1

    for (let i = startIndex; i < line.length; i++) {
      if (line[i] === '(') {
        if (depth === 0) start = i + 1
        depth++
      } else if (line[i] === ')') {
        depth--
        if (depth === 0) {
          end = i
          break
        }
      }
    }

    if (start !== -1 && end !== -1) {
      return line.substring(start, end)
    }

    return null
  }

  /**
   * 获取最大括号深度
   */
  getMaxParenDepth(line) {
    let depth = 0
    let maxDepth = 0

    for (const char of line) {
      if (char === '(') {
        depth++
        maxDepth = Math.max(maxDepth, depth)
      } else if (char === ')') {
        depth--
      }
    }

    return maxDepth
  }

  /**
   * 生成报告
   */
  generateReport() {
    console.log('\n' + '='.repeat(70))
    console.log('🔍 CSS 变量兼容性检测报告')
    console.log('='.repeat(70))

    console.log(`\n📊 统计：`)
    console.log(`   - 扫描文件：${this.fileCount} 个`)
    console.log(`   - 发现问题：${this.issueCount} 个`)
    console.log(`   - 问题文件：${this.issues.length} 个`)
    if (this.markedVarsCount > 0) {
      console.log(`   - ✅ 已标记变量：${this.markedVarsCount} 个（跨文件识别）`)
    }

    if (this.issues.length === 0) {
      console.log('\n✅ 没有发现复杂 Less 特性，可以安全使用 CSS 变量！')
      return
    }

    // 按严重程度分类
    const errors = []
    const warnings = []
    const infos = []

    this.issues.forEach((fileIssue) => {
      fileIssue.issues.forEach((issue) => {
        const item = { file: fileIssue.file, ...issue }
        if (issue.severity === 'error') errors.push(item)
        else if (issue.severity === 'warning') warnings.push(item)
        else infos.push(item)
      })
    })

    // 输出错误
    if (errors.length > 0) {
      console.log(`\n❌ 严重问题 (${errors.length} 个)：`)
      console.log('这些特性与 CSS 变量完全不兼容')
      errors.forEach((item) => {
        console.log(`\n   📄 ${item.file}:${item.line}`)
        console.log(`      ${item.message}`)
        console.log(`      ${item.code}`)
      })
    }

    // 输出警告
    if (warnings.length > 0) {
      console.log(`\n⚠️  警告 (${warnings.length} 个)：`)
      console.log('这些特性可能无法在运行时工作')

      if (this.options.verbose) {
        warnings.forEach((item) => {
          console.log(`\n   📄 ${item.file}:${item.line}`)
          console.log(`      ${item.message}`)
          console.log(`      ${item.code}`)
        })
      } else {
        // 只显示前5个
        warnings.slice(0, 5).forEach((item) => {
          console.log(`   📄 ${item.file}:${item.line} - ${item.message}`)
        })
        if (warnings.length > 5) {
          console.log(`   ... 还有 ${warnings.length - 5} 个警告（使用 --verbose 查看全部）`)
        }
      }
    }

    // 输出提示
    if (infos.length > 0) {
      console.log(`\nℹ️  提示 (${infos.length} 个)：`)
      console.log('这些情况需要手动验证')

      if (this.options.verbose) {
        infos.forEach((item) => {
          console.log(`   📄 ${item.file}:${item.line} - ${item.message}`)
        })
      } else {
        console.log(`   使用 --verbose 查看详情`)
      }
    }

    // 分析选择器插值的数量
    const selectorInterpolations = errors.filter((e) => e.type === 'selector-interpolation').length

    // 建议
    console.log('\n💡 建议：')
    if (errors.length > 0) {
      if (selectorInterpolations > 0) {
        console.log(`   - 🏷️  发现 ${selectorInterpolations} 处选择器插值使用（.@{prefix}）`)
        console.log('   - 这些是正常使用，只需确保对应的 -prefix 变量已标记')
        console.log('   - 如果 -prefix 变量定义未标记，运行：npm run add:no-cssvar -- --apply')
      }

      const otherErrors = errors.length - selectorInterpolations
      if (otherErrors > 0) {
        console.log(`   - ❌ 发现 ${otherErrors} 处不兼容特性（条件、循环等）`)
        console.log('   - 手动添加 @no-cssvar 注释标记这些变量')
        console.log('   - 示例：// @no-cssvar: 原因说明')
      }
    }
    if (warnings.length > 0) {
      console.log('   - ⚠️  颜色/数学函数只能在编译时计算')
      console.log('   - 如需运行时修改，请预先计算好所有可能的值')
    }
    if (infos.length > 0) {
      console.log('   - ℹ️  复杂运算已转换为 calc()，请测试验证结果')
    }

    console.log('\n' + '='.repeat(70))
  }
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2)
  const verbose = args.includes('--verbose') || args.includes('-v')
  const component = args.find((arg) => !arg.startsWith('-'))

  console.log('🔍 CSS 变量兼容性检测工具\n')
  console.log('检测 Less 代码在使用 less2cssvars 方案后是否存在不兼容问题\n')

  const detector = new ComplexLessDetector({ verbose })

  // 确定扫描范围
  let pattern
  if (component) {
    pattern = path.join(SRC_DIR, `exports/${component}/**/*.less`)
    console.log(`📂 扫描范围: 组件 ${component}\n`)
  } else {
    pattern = path.join(SRC_DIR, 'exports/**/*.less')
    console.log(`📂 扫描范围: 所有组件\n`)
  }

  // 查找所有 Less 文件
  const files = glob.sync(pattern)

  if (files.length === 0) {
    console.log('❌ 未找到 Less 文件')
    process.exit(1)
  }

  console.log(`📂 找到 ${files.length} 个 Less 文件\n`)

  // 阶段 1：收集所有带 @no-cssvar 标记的变量
  detector.collectMarkedVariables(files)

  // 阶段 2：检测不兼容特性
  console.log('🔍 阶段 2：检测不兼容特性...\n')
  files.forEach((file) => {
    detector.detectFile(file)
  })

  // 生成报告
  detector.generateReport()

  // 根据严重程度设置退出码
  const hasErrors = detector.issues.some((fileIssue) => fileIssue.issues.some((issue) => issue.severity === 'error'))

  if (hasErrors) {
    process.exit(1)
  }
}

main().catch((error) => {
  console.error('❌ 检测失败:', error)
  process.exit(1)
})
