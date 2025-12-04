/**
 * Less 编译插件：自动将包含 CSS 变量的运算转换为 calc()
 *
 * 策略：
 * 1. 在预处理阶段获取 modifyVars 配置
 * 2. 识别哪些变量被替换为了 var(...)
 * 3. 用正则查找包含这些变量的运算表达式
 * 4. 将运算表达式包装为 calc()
 *
 * 这样在 Less 解析之前就完成转换，避免 "Operation on an invalid type" 错误
 */

class LessCalcPlugin {
  constructor(options = {}) {
    this.options = {
      debug: options.debug || false,
      ...options,
    }
    this.cssVarNames = new Set() // 存储被替换为 CSS 变量的变量名

    // 如果在构造时提供了 modifyVars，立即识别 CSS 变量
    if (options.modifyVars) {
      this.identifyCssVars(options.modifyVars)
    }
  }

  install(less, pluginManager) {
    const self = this

    // 添加预处理器
    pluginManager.addPreProcessor({
      process: function (src, extra) {
        if (self.options.debug) {
          console.log('📝 Pre-processing file:', extra?.fileInfo?.filename || 'inline')
          console.log('🔧 CSS variables to watch:', self.cssVarNames.size, 'variables')
        }

        // 如果没有 CSS 变量，直接返回
        if (self.cssVarNames.size === 0) {
          if (self.options.debug) {
            console.log('⏭️  No CSS variables found, skipping transformation')
          }
          return src
        }

        // 转换源代码
        const transformed = self.transformSource(src)

        return transformed
      },
    })
  }

  /**
   * 识别哪些变量被替换为了 CSS 变量（包含 var(）
   */
  identifyCssVars(modifyVars) {
    this.cssVarNames.clear()

    for (const [name, value] of Object.entries(modifyVars)) {
      // 检查值是否包含 var(
      if (typeof value === 'string' && value.includes('var(')) {
        this.cssVarNames.add(name)

        if (this.options.debug) {
          console.log(`  ✓ CSS variable: @${name} = ${value}`)
        }
      }
    }
  }

  /**
   * 预处理：合并跨行的属性定义
   * 例如：
   *   padding: @a * @s @b * @s
   *     @c * @s;
   * 合并为：
   *   padding: @a * @s @b * @s @c * @s;
   */
  mergeMultilineProperties(src) {
    const lines = src.split('\n')
    const mergedLines = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]
      const trimmed = line.trim()

      // 跳过注释行和空行
      if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
        mergedLines.push(line)
        i++
        continue
      }

      // 检查是否是属性定义的开始（包含冒号但没有分号结尾）
      if (trimmed.includes(':') && !trimmed.endsWith(';') && !trimmed.endsWith('{') && !trimmed.endsWith('}')) {
        // 检查下一行是否是续行（以空格开头且不是注释）
        let j = i + 1
        let mergedLine = line

        while (j < lines.length) {
          const nextLine = lines[j]
          const nextTrimmed = nextLine.trim()

          // 如果下一行是空行、注释或新的属性定义，则停止合并
          if (
            !nextTrimmed ||
            nextTrimmed.startsWith('//') ||
            nextTrimmed.startsWith('/*') ||
            nextTrimmed.includes(':') ||
            nextTrimmed.startsWith('}')
          ) {
            break
          }

          // 如果下一行以空格开头，说明是续行
          if (nextLine.startsWith(' ') || nextLine.startsWith('\t')) {
            // 合并到当前行（保留一个空格）
            mergedLine += ' ' + nextTrimmed
            j++

            // 如果遇到分号，停止合并
            if (nextTrimmed.endsWith(';')) {
              break
            }
          } else {
            break
          }
        }

        mergedLines.push(mergedLine)
        i = j
      } else {
        mergedLines.push(line)
        i++
      }
    }

    return mergedLines.join('\n')
  }

  /**
   * 转换源代码，将包含 CSS 变量的运算包装为 calc()
   */
  transformSource(src) {
    if (this.cssVarNames.size === 0) {
      // 没有 CSS 变量，不需要转换
      return src
    }

    let result = src
    let transformCount = 0

    // 预处理：合并跨行的属性定义
    result = this.mergeMultilineProperties(result)

    // 按行处理以保持代码结构
    const lines = result.split('\n')
    const transformedLines = lines.map((line, lineIndex) => {
      // 跳过注释行
      const trimmedLine = line.trim()
      if (trimmedLine.startsWith('//') || trimmedLine.startsWith('/*') || trimmedLine.startsWith('*')) {
        return line
      }

      let transformedLine = line

      // 查找属性值部分
      // 匹配冒号后的值，包括可能的前导负号
      const colonMatch = line.match(/:\s*(.+?)(?:;|$)/)
      if (!colonMatch) {
        return line
      }

      let value = colonMatch[1].trim()

      // 检查是否包含 CSS 变量
      let hasCssVar = false
      for (const varName of this.cssVarNames) {
        if (value.includes(`@${varName}`)) {
          hasCssVar = true
          break
        }
      }

      if (!hasCssVar) {
        return line
      }

      // 跳过已经在 calc() 中的值
      if (value.trim().startsWith('calc(')) {
        return line
      }

      // 尝试包裹整个值
      let transformedValue = this.wrapWithCalc(value)

      if (transformedValue !== value) {
        transformedLine = line.replace(value, transformedValue)
        transformCount++

        if (this.options.debug) {
          console.log(`  🔄 Line ${lineIndex + 1}:`)
          console.log(`     Before: ${value.trim()}`)
          console.log(`     After:  ${transformedValue.trim()}`)
        }
      }

      return transformedLine
    })

    if (this.options.debug && transformCount > 0) {
      console.log(`✨ Transformed ${transformCount} operations`)
    }

    result = transformedLines.join('\n')

    // 后处理：移除单个变量的 calc() 包裹
    // 此时变量还是 @variable 形式，还没有被替换成 var(--xxx)
    // 匹配 calc(@variable) 模式（单个变量，没有运算符）
    const beforeClean = result
    result = result.replace(/calc\((@[\w-]+)\)(?!\s*[\+\-\*\/])/g, '$1')

    if (this.options.debug && beforeClean !== result) {
      const removedCount = (beforeClean.match(/calc\(@[\w-]+\)(?!\s*[\+\-\*\/])/g) || []).length
      console.log(`🧹 Removed ${removedCount} unnecessary calc() wrappers for single variables`)
    }

    return result
  }

  /**
   * 智能分割值的多个部分（考虑括号和 calc）
   * 例如：'@y * @s @x * @s' → ['@y * @s', '@x * @s']
   * 例如：'@padding 10px @margin * @s' → ['@padding', '10px', '@margin * @s']
   */
  splitValueParts(value) {
    const parts = []
    let current = ''
    let depth = 0
    let inCalc = false

    for (let i = 0; i < value.length; i++) {
      const char = value[i]

      // 检查是否进入 calc(
      if (value.substring(i, i + 5) === 'calc(') {
        inCalc = true
        current += 'calc('
        i += 4
        depth++
        continue
      }

      if (char === '(') {
        depth++
        current += char
      } else if (char === ')') {
        depth--
        current += char
        if (depth === 0 && inCalc) {
          inCalc = false
        }
      } else if (char === ' ' && depth === 0) {
        // 空格分隔，且不在括号内
        if (current.trim()) {
          parts.push(current.trim())
          current = ''
        }
      } else {
        current += char
      }
    }

    if (current.trim()) {
      parts.push(current.trim())
    }

    return parts.length > 0 ? parts : [value]
  }

  /**
   * 检查一个部分是否包含运算
   *
   * 关键：正确区分负号和减法
   * - 负数：-10px, -@var (不是运算)
   * - 运算：-10px * @scale, @a - @b (是运算)
   */
  hasOperation(part) {
    // 移除字符串内容
    const cleaned = part.replace(/(["']).*?\1/g, '')

    // 规则1：明确的二元运算
    // 操作数 运算符 操作数
    const binaryOp = /(@[\w-]+|[\d.]+[a-z%]*|%|\([^)]*\))\s*[\+\-\*\/]\s*(@[\w-]+|[\d.]+[a-z%]*|%|\([^)]*\))/
    if (binaryOp.test(cleaned)) {
      return true
    }

    // 规则2：前导负号 + 乘除运算
    // -@var * 2, -10px / @scale
    const negativeWithMultDiv = /^-\s*(@[\w-]+|[\d.]+[a-z%]*|\([^)]*\))\s*[\*\/]\s*/
    if (negativeWithMultDiv.test(cleaned)) {
      return true
    }

    return false
  }

  /**
   * 将值包装为 calc()
   * 策略：找到包含 CSS 变量的最长运算表达式
   */
  wrapWithCalc(value) {
    let result = value

    // 首先检查整个值是否包含运算
    const hasRealOperation =
      /(?:@[\w-]+|[\d.]+[a-z%]*|\([^)]+\))\s*[\+\-\*\/]\s*(?:@[\w-]+|[\d.]+[a-z%]*|\([^)]+\))/.test(value)

    if (!hasRealOperation) {
      return result
    }

    // 检查是否包含我们关注的 CSS 变量
    let hasCssVar = false
    for (const varName of this.cssVarNames) {
      if (value.includes(`@${varName}`)) {
        hasCssVar = true
        break
      }
    }

    if (!hasCssVar) {
      return result
    }

    // 如果值已经以 calc( 开头，不再包裹
    if (value.trim().startsWith('calc(')) {
      return result
    }

    // 检查是否是 CSS 函数调用（如 translateX、rotate 等）
    // 格式：functionName(arguments)
    const cssFunctionMatch = value.match(
      /^(translateX|translateY|translate|rotate|rotateX|rotateY|rotateZ|scale|scaleX|scaleY|skew|skewX|skewY|matrix|matrix3d|perspective)\s*\((.+)\)$/,
    )

    if (cssFunctionMatch) {
      const [, funcName, args] = cssFunctionMatch
      // 递归处理函数参数
      const wrappedArgs = this.wrapWithCalc(args)
      return `${funcName}(${wrappedArgs})`
    }

    // 直接使用智能分割处理（处理所有情况：单值、多值、混合值）
    return this.wrapMultipleValues(value)
  }

  /**
   * 处理多值情况（如 padding: @y * @s @x * @s）
   * 策略：智能分割，只包裹包含运算的部分
   */
  wrapMultipleValues(value) {
    // 使用更智能的分割：按空格分割，但保留括号和 calc 内的内容
    const tokens = []
    let current = ''
    let depth = 0
    let inCalc = false

    for (let i = 0; i < value.length; i++) {
      const char = value[i]

      if (value.substring(i, i + 5) === 'calc(') {
        inCalc = true
        current += 'calc('
        i += 4
        depth++
        continue
      }

      if (char === '(') {
        depth++
        current += char
      } else if (char === ')') {
        depth--
        current += char
        if (depth === 0 && inCalc) {
          inCalc = false
        }
      } else if (char === ' ' && depth === 0) {
        if (current.trim()) {
          tokens.push(current.trim())
        }
        current = ''
      } else {
        current += char
      }
    }

    if (current.trim()) {
      tokens.push(current.trim())
    }

    // 现在tokens是按空格分割的独立部分
    // 例如：['@y', '*', '@s', '@x', '*', '@s']
    // 我们需要重新组合成表达式：['@y * @s', '@x * @s']

    const expressions = []
    let expr = ''

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]
      const isOperator = /^[\+\-\*\/]$/.test(token)

      if (isOperator) {
        // 运算符，添加到当前表达式
        expr += (expr ? ' ' : '') + token
      } else {
        // 操作数
        if (expr && /[\+\-\*\/]\s*$/.test(expr)) {
          // 前面有未完成的运算符，继续表达式
          expr += ' ' + token
        } else {
          // 新的操作数
          if (expr) {
            expressions.push(expr.trim())
            expr = ''
          }
          expr = token

          // 检查下一个token是否是运算符
          if (i + 1 < tokens.length && /^[\+\-\*\/]$/.test(tokens[i + 1])) {
            // 继续，这是运算表达式的开始
          } else {
            // 单独的值，直接保存
            expressions.push(expr.trim())
            expr = ''
          }
        }
      }
    }

    if (expr) {
      expressions.push(expr.trim())
    }

    // 对每个表达式判断是否需要包裹 calc()
    const wrapped = expressions.map((exp) => {
      if (exp.startsWith('calc(')) {
        return exp
      }

      if (this.hasOperation(exp)) {
        // 检查是否以负号开头，如果是，转换为 -1 * 形式
        // 这样可以避免 Less 编译时 -calc() 的错误
        let finalExp = exp
        if (exp.startsWith('-')) {
          // 将 -@var / 2 * @scale 转换为 -1 * @var / 2 * @scale
          finalExp = `-1 * ${exp.substring(1).trim()}`
        }
        return `calc(${finalExp})`
      }

      return exp
    })

    return wrapped.join(' ')
  }

  /**
   * 智能分割值，处理函数调用
   */
  splitValue(value) {
    const parts = []
    let current = ''
    let parenDepth = 0
    let inCalc = false

    for (let i = 0; i < value.length; i++) {
      const char = value[i]

      // 检测 calc( 的开始
      if (char === 'c' && value.substring(i, i + 5) === 'calc(') {
        inCalc = true
      }

      if (char === '(') {
        parenDepth++
        current += char
      } else if (char === ')') {
        parenDepth--
        current += char
        if (parenDepth === 0 && inCalc) {
          inCalc = false
        }
      } else if (char === ' ' && parenDepth === 0) {
        // 只在括号外部的空格才分割
        if (current.trim()) {
          parts.push(current)
        }
        current = ' ' // 保留空格
        parts.push(current)
        current = ''
      } else {
        current += char
      }
    }

    if (current) {
      parts.push(current)
    }

    return parts
  }
}

// 创建插件实例
function createPlugin(options) {
  return new LessCalcPlugin(options)
}

// 默认导出插件实例
module.exports = createPlugin()

// 导出创建函数
module.exports.createPlugin = createPlugin

// 导出插件类
module.exports.LessCalcPlugin = LessCalcPlugin
