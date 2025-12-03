/**
 * lessPlugin.transformSource() 详尽测试
 *
 * 目标：确保 transformSource 能正确处理所有边界情况
 */

const testCases = [
  // ========== 基础运算 ==========
  {
    category: '基础运算',
    cases: [
      {
        name: '乘法',
        input: 'width: @width * @scale;',
        expected: 'width: calc(@width * @scale);',
      },
      {
        name: '加法',
        input: 'height: @height + 10px;',
        expected: 'height: calc(@height + 10px);',
      },
      {
        name: '减法',
        input: 'margin: @margin - 5px;',
        expected: 'margin: calc(@margin - 5px);',
      },
      {
        name: '除法',
        input: 'width: @width / 2;',
        expected: 'width: calc(@width / 2);',
      },
    ],
  },

  // ========== 负号处理 ==========
  {
    category: '负号处理',
    cases: [
      {
        name: '负数运算',
        input: 'left: -28px * @scale;',
        expected: 'left: calc(-1 * 28px * @scale);',
      },
      {
        name: '负变量运算',
        input: 'top: -@offset * 2;',
        expected: 'top: calc(-1 * @offset * 2);',
      },
      {
        name: '负数除法混合运算（Cell 用例）',
        input: 'top: -@cell-loading-size / 2 * @size-scale;',
        expected: 'top: calc(-1 * @cell-loading-size / 2 * @size-scale);',
      },
      {
        name: '单个负数（不包裹）',
        input: 'margin: -@padding;',
        expected: 'margin: -@padding;',
      },
      {
        name: '单个负数值（不包裹）',
        input: 'margin: -10px;',
        expected: 'margin: -10px;',
      },
      {
        name: '减法运算',
        input: 'width: @width - @padding;',
        expected: 'width: calc(@width - @padding);',
      },
    ],
  },

  // ========== 括号表达式 ==========
  {
    category: '括号表达式',
    cases: [
      {
        name: '括号 + 运算',
        input: 'width: (@width + @padding) * @scale;',
        expected: 'width: calc((@width + @padding) * @scale);',
      },
      {
        name: '嵌套括号',
        input: 'height: ((@height - 10px) / 2) + @offset;',
        expected: 'height: calc(((@height - 10px) / 2) + @offset);',
      },
      {
        name: '括号内运算 + 除法',
        input: 'height: (@height - 10px) / 2;',
        expected: 'height: calc((@height - 10px) / 2);',
      },
    ],
  },

  // ========== 多值情况 ==========
  {
    category: '多值情况',
    cases: [
      {
        name: 'padding 四值',
        input: 'padding: @y * @s @x * @s @y * @s @x * @s;',
        expected: 'padding: calc(@y * @s) calc(@x * @s) calc(@y * @s) calc(@x * @s);',
      },
      {
        name: 'padding 两值',
        input: 'padding: @y * @s @x * @s;',
        expected: 'padding: calc(@y * @s) calc(@x * @s);',
      },
      {
        name: '混合值',
        input: 'padding: @padding 10px @margin * @s;',
        expected: 'padding: @padding 10px calc(@margin * @s);',
      },
    ],
  },

  // ========== 不应转换 ==========
  {
    category: '不应转换',
    cases: [
      {
        name: '单个变量',
        input: 'width: @width;',
        expected: 'width: @width;',
      },
      {
        name: '单个数值',
        input: 'width: 100px;',
        expected: 'width: 100px;',
      },
      {
        name: '已有 calc',
        input: 'width: calc(100% - @width);',
        expected: 'width: calc(100% - @width);',
      },
      {
        name: '函数调用',
        input: 'color: rgba(255, 255, 255, @opacity);',
        expected: 'color: rgba(255, 255, 255, @opacity);',
      },
    ],
  },

  // ========== 变量定义 ==========
  {
    category: '变量定义',
    cases: [
      {
        name: '变量定义运算',
        input: '@my-var: @base * 2;',
        expected: '@my-var: calc(@base * 2);',
      },
      {
        name: '变量定义复杂运算',
        input: '@height: (@base + 10px) * @scale;',
        expected: '@height: calc((@base + 10px) * @scale);',
      },
    ],
  },

  // ========== 边界情况 ==========
  {
    category: '边界情况',
    cases: [
      {
        name: '字符串中的变量',
        input: 'content: "@icon-name";',
        expected: 'content: "@icon-name";',
      },
      {
        name: '注释',
        input: '// width: @width * @scale;',
        expected: '// width: @width * @scale;',
      },
      {
        name: '复杂边框',
        input: 'border: @width * @s solid @color;',
        expected: 'border: calc(@width * @s) solid @color;',
      },
    ],
  },
  {
    category: 'CSS 函数',
    cases: [
      {
        name: 'translateX 内的运算',
        input: 'transform: translateX(-12px * @size-scale);',
        expected: 'transform: translateX(calc(-1 * 12px * @size-scale));',
      },
      {
        name: 'translateY 内的运算',
        input: 'transform: translateY(@offset / 2);',
        expected: 'transform: translateY(calc(@offset / 2));',
      },
      {
        name: 'rotate 内的运算',
        input: 'transform: rotate(@angle * @ratio);',
        expected: 'transform: rotate(calc(@angle * @ratio));',
      },
      {
        name: 'scale 内的运算',
        input: 'transform: scale(@scale-x * @size-scale);',
        expected: 'transform: scale(calc(@scale-x * @size-scale));',
      },
    ],
  },
]

// 导出测试用例
module.exports = testCases

// 如果直接运行此文件，显示测试用例概览
if (require.main === module) {
  console.log('📋 lessPlugin 测试用例概览\n')

  let totalCases = 0
  testCases.forEach((category) => {
    console.log(`${category.category}: ${category.cases.length} 个用例`)
    totalCases += category.cases.length
  })

  console.log(`\n总计: ${totalCases} 个测试用例`)
}
