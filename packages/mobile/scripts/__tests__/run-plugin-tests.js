/**
 * lessPlugin 测试运行器
 */

const testCases = require('./test-plugin-transform')
const lessPlugin = require('../less-cssvar-calc-plugin')

// Mock modifyVars（包含所有测试用到的变量）
const mockModifyVars = {
  width: 'var(--exd-width)',
  height: 'var(--exd-height)',
  scale: 'var(--exd-scale)',
  margin: 'var(--exd-margin)',
  padding: 'var(--exd-padding)',
  offset: 'var(--exd-offset)',
  x: 'var(--exd-x)',
  y: 'var(--exd-y)',
  s: 'var(--exd-s)',
  base: 'var(--exd-base)',
  color: 'var(--exd-color)',
  opacity: 'var(--exd-opacity)',
  'cell-loading-size': 'var(--exd-cell-loading-size)',
  'size-scale': 'var(--exd-size-scale)',
  angle: 'var(--exd-angle)',
  ratio: 'var(--exd-ratio)',
  'scale-x': 'var(--exd-scale-x)',
}

// 创建测试用的插件实例
const plugin = new lessPlugin.LessCalcPlugin({
  modifyVars: mockModifyVars,
  debug: false,
})

// 运行测试
function runTests() {
  console.log('🧪 Less Plugin Transform 测试\n')
  console.log('═'.repeat(80))

  let totalPass = 0
  let totalFail = 0
  const failures = []

  testCases.forEach((category) => {
    console.log(`\n📂 ${category.category}`)
    console.log('─'.repeat(80))

    category.cases.forEach((test) => {
      const result = plugin.transformSource(test.input)
      const normalize = (s) => s.replace(/\s+/g, ' ').trim()

      if (normalize(result) === normalize(test.expected)) {
        console.log(`  ✅ ${test.name}`)
        totalPass++
      } else {
        console.log(`  ❌ ${test.name}`)
        console.log(`     输入:   ${test.input}`)
        console.log(`     期望:   ${test.expected}`)
        console.log(`     实际:   ${result}`)
        totalFail++

        failures.push({
          category: category.category,
          name: test.name,
          input: test.input,
          expected: test.expected,
          actual: result,
        })
      }
    })
  })

  console.log('\n')
  console.log('═'.repeat(80))
  console.log(`📊 测试结果: ${totalPass} 通过 / ${totalFail} 失败 / ${totalPass + totalFail} 总计`)

  if (failures.length > 0) {
    console.log('\n❌ 失败用例详情:\n')
    failures.forEach((failure, i) => {
      console.log(`${i + 1}. [${failure.category}] ${failure.name}`)
      console.log(`   输入: ${failure.input}`)
      console.log(`   期望: ${failure.expected}`)
      console.log(`   实际: ${failure.actual}`)
      console.log('')
    })
  }

  process.exit(totalFail > 0 ? 1 : 0)
}

runTests()
