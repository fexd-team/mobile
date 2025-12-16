const fs = require('fs')
const path = require('path')

// 配置
const CONFIG = {
  sourceDir: path.join(__dirname, '../src/exports'),
  themeDir: path.join(__dirname, '../src/theme'),
  outputFile: path.join(__dirname, '../color-semantic-check.log'),
  excludePatterns: ['.cssvars.less'],
  excludeDirs: ['demos'],
  developingMarker: '.developing',
}

// 不推荐直接使用的基础颜色变量（应该使用语义化变量）
const NON_SEMANTIC_COLOR_VARS = [
  '@color-white',
  '@color-black',
  '@color-gray',
  '@color-red',
  '@color-blue',
  '@color-green',
  '@color-yellow',
  '@color-orange',
]

// 推荐的语义化变量及其使用建议
const SEMANTIC_SUGGESTIONS = {
  '@color-white': {
    背景相关: ['@color-bg-container', '@color-bg-elevated', '@color-bg-component'],
    文字相关: ['@color-text-inverse'],
    边框相关: ['@color-border-inverse'],
  },
  '@color-black': {
    文字相关: ['@color-text-primary', '@color-text-title'],
  },
  '@color-gray': {
    文字相关: ['@color-text-secondary', '@color-text-disabled'],
    边框相关: ['@color-border', '@color-border-secondary'],
    填充相关: ['@color-fill', '@color-fill-secondary'],
  },
  '@color-red': {
    功能色: ['@color-danger', '@color-error'],
  },
  '@color-blue': {
    功能色: ['@color-primary', '@color-info'],
  },
  '@color-green': {
    功能色: ['@color-success'],
  },
  '@color-orange': {
    功能色: ['@color-warning'],
  },
  '@color-yellow': {
    功能色: ['@color-warning'],
  },
}

// 旧的 color-gray-* 变量（不推荐，建议迁移到新的语义化变量）
const DEPRECATED_GRAY_VARS = [
  '@color-gray-title',
  '@color-gray-primary',
  '@color-gray-secondary',
  '@color-gray-disable',
  '@color-gray-border',
  '@color-gray-divider',
  '@color-gray-background',
  '@color-gray-table-header',
]

const DEPRECATED_SUGGESTIONS = {
  '@color-gray-title': '@color-text-title',
  '@color-gray-primary': '@color-text-primary',
  '@color-gray-secondary': '@color-text-secondary',
  '@color-gray-disable': '@color-text-disabled',
  '@color-gray-border': '@color-border',
  '@color-gray-divider': '@color-divider',
  '@color-gray-background': '@color-bg-layout',
  '@color-gray-table-header': '@color-bg-spotlight',
}

// 时间变量规则配置
const DURATION_RULES = {
  // 硬编码时间值建议映射
  suggestions: {
    '50ms': '@duration-faster',
    '100ms': '@duration-fast',
    '150ms': '@duration-fast',
    '200ms': '@duration-normal',
    '250ms': '@duration-normal',
    '300ms': '@duration-slow',
    '350ms': '@duration-slow',
    '400ms': '@duration-slow',
    '500ms': '@duration-slower',
    '0.05s': '@duration-faster',
    '0.1s': '@duration-fast',
    '0.15s': '@duration-fast',
    '0.2s': '@duration-normal',
    '0.25s': '@duration-normal',
    '0.3s': '@duration-slow',
    '0.35s': '@duration-slow',
    '0.4s': '@duration-slow',
    '0.5s': '@duration-slower',
  },
  // 推荐的语义化时间变量
  semanticVars: ['@duration-faster', '@duration-fast', '@duration-normal', '@duration-slow', '@duration-slower'],
  // 需要忽略的常见值（0s, 0ms 等）
  ignoreValues: ['0s', '0ms', '0.0s'],
}

// 检查是否在注释中
function isInComment(content, position) {
  const beforeContent = content.substring(0, position)
  const lastNewline = beforeContent.lastIndexOf('\n')
  const lineContent = beforeContent.substring(lastNewline + 1)

  // 单行注释
  if (lineContent.includes('//')) {
    return true
  }

  // 多行注释
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
  // Less 变量定义行
  return /^\s*@[\w-]+\s*:/.test(lineContent)
}

// 检查是否是 @no-cssvar 标记的行
function isNoCssvarLine(content, position) {
  const beforeContent = content.substring(0, position)
  const lastNewline = beforeContent.lastIndexOf('\n')
  const lineContent = content.substring(lastNewline + 1)
  return lineContent.includes('@no-cssvar')
}

// 检查目录或其父目录是否有 .developing 文件
function isDevelopingComponent(filePath) {
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

// 获取值所在的行号和上下文
function getContext(content, position, matchLength) {
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

// 判断变量使用的上下文类型（背景、文字、边框等）
function guessContextType(lineContent, varName) {
  const line = lineContent.toLowerCase()

  if (/background|bg/.test(line)) {
    return '背景相关'
  }
  if (/color(?!-)|text/.test(line) && !/background/.test(line)) {
    return '文字相关'
  }
  if (/border/.test(line)) {
    return '边框相关'
  }
  if (/fill/.test(line)) {
    return '填充相关'
  }

  return null
}

// 获取针对性的建议
function getSuggestions(varName, contextType) {
  const suggestions = SEMANTIC_SUGGESTIONS[varName]
  if (!suggestions) return []

  if (contextType && suggestions[contextType]) {
    return suggestions[contextType]
  }

  // 返回所有建议
  const allSuggestions = []
  Object.keys(suggestions).forEach((category) => {
    allSuggestions.push(...suggestions[category].map((s) => `${s} (${category})`))
  })
  return allSuggestions
}

// 分析单个文件
function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const absolutePath = path.resolve(filePath)
  const developingInfo = isDevelopingComponent(filePath)
  const results = []

  // 检测非语义化颜色变量
  NON_SEMANTIC_COLOR_VARS.forEach((varName) => {
    const pattern = new RegExp(`(${varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(?![\\w-])`, 'g')
    let match

    while ((match = pattern.exec(content)) !== null) {
      const position = match.index

      // 跳过需要忽略的情况
      if (isInComment(content, position)) continue
      if (isVariableDefinition(content, position)) continue
      if (isNoCssvarLine(content, position)) continue

      const context = getContext(content, position, match[0].length)
      const contextType = guessContextType(context.lineContent, varName)
      const suggestions = getSuggestions(varName, contextType)

      results.push({
        type: 'non-semantic',
        variable: varName,
        contextType,
        suggestions,
        ...context,
      })
    }
  })

  // 检测已废弃的 color-gray-* 变量
  DEPRECATED_GRAY_VARS.forEach((varName) => {
    const pattern = new RegExp(`(${varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(?![\\w-])`, 'g')
    let match

    while ((match = pattern.exec(content)) !== null) {
      const position = match.index

      if (isInComment(content, position)) continue
      if (isVariableDefinition(content, position)) continue
      if (isNoCssvarLine(content, position)) continue

      const context = getContext(content, position, match[0].length)
      const suggestion = DEPRECATED_SUGGESTIONS[varName]

      results.push({
        type: 'deprecated',
        variable: varName,
        suggestion,
        ...context,
      })
    }
  })

  // 检测硬编码的时间值
  const durationPattern = /(\d+(?:\.\d+)?(?:ms|s))\b/g
  let match

  while ((match = durationPattern.exec(content)) !== null) {
    const value = match[1]
    const position = match.index

    // 跳过需要忽略的情况
    if (isInComment(content, position)) continue
    if (isVariableDefinition(content, position)) continue
    if (isNoCssvarLine(content, position)) continue

    // 跳过忽略值
    if (DURATION_RULES.ignoreValues.includes(value)) continue

    const context = getContext(content, position, match[0].length)

    // 只检测 transition、animation 相关的属性
    if (!/transition|animation/.test(context.lineContent)) continue

    // 跳过已经使用语义化变量的行
    if (/@duration|var\(--duration/.test(context.lineContent)) continue

    const suggestion = DURATION_RULES.suggestions[value]

    // 只报告有建议的值，或者超过 500ms 的值
    if (suggestion || parseFloat(value) > 500) {
      results.push({
        type: 'hardcoded-duration',
        value,
        suggestion: suggestion || '建议定义语义化的时间变量',
        ...context,
      })
    }
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
    if (!fs.existsSync(currentDir)) return

    const files = fs.readdirSync(currentDir)

    for (const file of files) {
      const fullPath = path.join(currentDir, file)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        if (CONFIG.excludeDirs.includes(file)) {
          continue
        }
        scan(fullPath)
      } else if (stat.isFile() && file.endsWith('.less')) {
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

  // 分离稳定组件和开发中组件
  const stableResults = results.filter((r) => !r.isDeveloping)
  const developingResults = results.filter((r) => r.isDeveloping)

  const developingComponents = [...new Set(developingResults.map((r) => r.componentName))].sort()

  lines.push('================================================================================')
  lines.push('样式变量语义化检测报告 (颜色 + 时间)')
  lines.push('================================================================================')
  lines.push('')
  lines.push(`生成时间: ${new Date().toLocaleString('zh-CN')}`)
  lines.push(`扫描目录: ${CONFIG.sourceDir}`)
  lines.push('')

  if (results.length === 0) {
    lines.push('✅ 所有颜色变量使用规范！')
  } else {
    // 统计
    const nonSemanticCount = results.reduce(
      (sum, r) => sum + r.issues.filter((i) => i.type === 'non-semantic').length,
      0,
    )
    const deprecatedCount = results.reduce((sum, r) => sum + r.issues.filter((i) => i.type === 'deprecated').length, 0)
    const durationCount = results.reduce(
      (sum, r) => sum + r.issues.filter((i) => i.type === 'hardcoded-duration').length,
      0,
    )

    const stableNonSemantic = stableResults.reduce(
      (sum, r) => sum + r.issues.filter((i) => i.type === 'non-semantic').length,
      0,
    )
    const stableDeprecated = stableResults.reduce(
      (sum, r) => sum + r.issues.filter((i) => i.type === 'deprecated').length,
      0,
    )
    const stableDuration = stableResults.reduce(
      (sum, r) => sum + r.issues.filter((i) => i.type === 'hardcoded-duration').length,
      0,
    )

    const devNonSemantic = developingResults.reduce(
      (sum, r) => sum + r.issues.filter((i) => i.type === 'non-semantic').length,
      0,
    )
    const devDeprecated = developingResults.reduce(
      (sum, r) => sum + r.issues.filter((i) => i.type === 'deprecated').length,
      0,
    )
    const devDuration = developingResults.reduce(
      (sum, r) => sum + r.issues.filter((i) => i.type === 'hardcoded-duration').length,
      0,
    )

    lines.push('📊 总体统计')
    lines.push(`   文件总数: ${results.length} 个`)
    lines.push(`   - 稳定组件: ${stableResults.length} 个文件`)
    lines.push(`   - 开发中组件: ${developingResults.length} 个文件`)
    lines.push('')

    lines.push('📈 问题统计:')
    lines.push(`   总计: ${nonSemanticCount + deprecatedCount + durationCount} 个问题`)
    lines.push(`   - 非语义化变量: ${nonSemanticCount} 个 (稳定: ${stableNonSemantic}, 开发中: ${devNonSemantic})`)
    lines.push(`   - 已废弃变量: ${deprecatedCount} 个 (稳定: ${stableDeprecated}, 开发中: ${devDeprecated})`)
    lines.push(`   - 硬编码时间: ${durationCount} 个 (稳定: ${stableDuration}, 开发中: ${devDuration})`)

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
          if (issue.type === 'non-semantic') {
            lines.push(`   行 ${issue.lineNumber.toString().padStart(4)}: ❌ 非语义化变量: ${issue.variable}`)
            lines.push(`           ${issue.lineContent}`)
            if (issue.contextType) {
              lines.push(`           上下文: ${issue.contextType}`)
            }
            if (issue.suggestions.length > 0) {
              lines.push(`           建议使用:`)
              issue.suggestions.forEach((suggestion) => {
                lines.push(`              • ${suggestion}`)
              })
            }
          } else if (issue.type === 'deprecated') {
            lines.push(`   行 ${issue.lineNumber.toString().padStart(4)}: ⚠️  已废弃变量: ${issue.variable}`)
            lines.push(`           ${issue.lineContent}`)
            lines.push(`           建议改为: ${issue.suggestion}`)
          } else if (issue.type === 'hardcoded-duration') {
            lines.push(`   行 ${issue.lineNumber.toString().padStart(4)}: ⏱️  硬编码时间: ${issue.value}`)
            lines.push(`           ${issue.lineContent}`)
            lines.push(`           建议使用: ${issue.suggestion}`)
          }
          lines.push('')
        })

        lines.push('')
      })
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
          if (issue.type === 'non-semantic') {
            lines.push(`   行 ${issue.lineNumber.toString().padStart(4)}: ❌ 非语义化变量: ${issue.variable}`)
            lines.push(`           ${issue.lineContent}`)
            if (issue.contextType) {
              lines.push(`           上下文: ${issue.contextType}`)
            }
            if (issue.suggestions.length > 0) {
              lines.push(`           建议使用:`)
              issue.suggestions.forEach((suggestion) => {
                lines.push(`              • ${suggestion}`)
              })
            }
          } else if (issue.type === 'deprecated') {
            lines.push(`   行 ${issue.lineNumber.toString().padStart(4)}: ⚠️  已废弃变量: ${issue.variable}`)
            lines.push(`           ${issue.lineContent}`)
            lines.push(`           建议改为: ${issue.suggestion}`)
          } else if (issue.type === 'hardcoded-duration') {
            lines.push(`   行 ${issue.lineNumber.toString().padStart(4)}: ⏱️  硬编码时间: ${issue.value}`)
            lines.push(`           ${issue.lineContent}`)
            lines.push(`           建议使用: ${issue.suggestion}`)
          }
          lines.push('')
        })

        lines.push('')
      })
    }
  }

  lines.push('================================================================================')
  lines.push('说明:')
  lines.push('  检测类型:')
  lines.push('    • 非语义化变量: 直接使用基础颜色变量（@color-white, @color-black 等）')
  lines.push('    • 已废弃变量: 使用旧的 @color-gray-* 系列变量')
  lines.push('    • 硬编码时间: transition/animation 中直接使用时间值（100ms, 0.3s 等）')
  lines.push('')
  lines.push('  规范建议:')
  lines.push('    • 颜色: 使用语义化变量如 @color-text-primary, @color-bg-container 等')
  lines.push('    • 时间: 使用语义化变量如 @duration-fast, @duration-normal 等')
  lines.push('    • 基础颜色变量（@color-white 等）仅在 vars.less 中定义时使用')
  lines.push('    • 功能色（@color-primary 等）可以直接使用')
  lines.push('')
  lines.push('  已自动忽略:')
  lines.push('    • demos 文件夹、.cssvars.less 文件')
  lines.push('    • 变量定义行、注释、@no-cssvar 标记的行')
  lines.push('    • 时间检测: 0s/0ms、已使用变量的行、非 transition/animation 相关的行')
  lines.push('')
  lines.push('  其他:')
  lines.push('    • 文件路径为绝对路径，可在编辑器中直接跳转')
  lines.push('    • 🚧 标记: 包含 .developing 文件的组件及其子组件视为开发中')
  lines.push('    • 建议: 优先处理稳定组件中的问题')
  lines.push('================================================================================')

  return lines.join('\n')
}

// 主函数
function main() {
  console.log('\n🔍 开始检查样式变量语义化使用（颜色 + 时间）...\n')

  if (!fs.existsSync(CONFIG.sourceDir)) {
    console.error(`❌ 错误: 源目录不存在: ${CONFIG.sourceDir}`)
    process.exit(1)
  }

  const results = scanDirectory(CONFIG.sourceDir)
  const report = generateReport(results)

  // 写入文件
  fs.writeFileSync(CONFIG.outputFile, report, 'utf-8')

  console.log(`✅ 检查完成！`)
  console.log(`📄 报告已生成: ${CONFIG.outputFile}`)
  console.log('')

  if (results.length > 0) {
    const stableCount = results.filter((r) => !r.isDeveloping).length
    const developingCount = results.filter((r) => r.isDeveloping).length
    const totalIssues = results.reduce((sum, r) => sum + r.issues.length, 0)

    console.log(`⚠️  发现 ${results.length} 个文件存在问题 (共 ${totalIssues} 个问题)`)
    console.log(`   - 稳定组件: ${stableCount} 个文件`)
    console.log(`   - 开发中组件: ${developingCount} 个文件`)
    console.log(`   请查看报告文件获取详细信息`)
  } else {
    console.log('✅ 所有样式变量使用规范！')
  }

  console.log('')
}

// 运行
if (require.main === module) {
  main()
}

module.exports = { analyzeFile, scanDirectory }
