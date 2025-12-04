const fs = require('fs')
const glob = require('glob')
const path = require('path')
const less = require('less')
const LessNodeModules = require('less-plugin-import-node-modules')

const excludes = [/^\.\/lib\/theme/, /^\.\/es\/theme/, /^\.\/src\/theme/]

// 统计信息
const stats = {
  success: 0,
  failed: 0,
  errors: [], // { file, error, message }
}

/**
 * 格式化错误信息
 */
function formatError(err) {
  if (err.line !== undefined && err.column !== undefined) {
    return {
      type: err.type || 'Syntax',
      message: err.message,
      line: err.line,
      column: err.column,
      extract: err.extract ? err.extract.join('\n') : null,
    }
  }
  return {
    type: 'Unknown',
    message: err.message || String(err),
  }
}

/**
 * 打印错误详情
 */
function printError(filepath, errorInfo) {
  console.log(`\n❌ [Less2Css Failed] ${filepath}`)
  console.log(`   类型: ${errorInfo.type}`)
  console.log(`   信息: ${errorInfo.message}`)
  if (errorInfo.line !== undefined) {
    console.log(`   位置: 第 ${errorInfo.line} 行, 第 ${errorInfo.column} 列`)
  }
  if (errorInfo.extract) {
    console.log(`   代码片段:`)
    errorInfo.extract.split('\n').forEach((line) => {
      console.log(`   ${line}`)
    })
  }
}

async function less2css(globPattern) {
  const filepaths = glob.sync(globPattern)
  const filteredFiles = filepaths.filter((filepath) => {
    // 排除 theme 目录
    if (excludes.some((reg) => reg.test(filepath))) {
      return false
    }
    // 排除 demos 目录
    if (filepath.includes('/demos/') || filepath.includes('\\demos\\')) {
      return false
    }
    return true
  })

  console.log(`\n📂 处理 ${filteredFiles.length} 个 Less 文件 (${globPattern})...`)

  const promises = filteredFiles.map(
    async (filepath) =>
      new Promise(async (resolve) => {
        const fullpath = path.join(__dirname, '../', filepath)

        const cssSource = fs.readFileSync(fullpath, {
          encoding: 'utf-8',
        })

        try {
          const { css } = await less.render(cssSource, {
            // 需告知 less 该文件确切路径，否则其中 @import 相对路径将失效
            // https://github.com/less/less.js/issues/2342#issuecomment-67596931
            filename: fullpath,
            plugins: [new LessNodeModules()],
            javascriptEnabled: true,
          })

          fs.writeFileSync(fullpath.replace(/\.less$/, '.css'), css, {
            encoding: 'utf-8',
          })

          stats.success++
          console.log(`✅ ${filepath}`)
        } catch (err) {
          stats.failed++
          const errorInfo = formatError(err)
          stats.errors.push({
            file: filepath,
            ...errorInfo,
          })
          printError(filepath, errorInfo)
        }
        resolve()
      }),
  )

  await Promise.all(promises)
}

async function supplyDefaultFile(globPattern) {
  const filepaths = glob.sync(globPattern)
  filepaths
    .filter((filepath) => !fs.existsSync(`${filepath}/style.less`))
    .forEach((filepath) => {
      fs.writeFileSync(`${filepath}/style.less`, '', { encoding: 'utf-8' })
    })
}

/**
 * 打印汇总报告
 */
function printSummary() {
  console.log('\n' + '='.repeat(80))
  console.log('📊 Less 编译汇总报告')
  console.log('='.repeat(80))
  console.log(`✅ 成功: ${stats.success} 个`)
  console.log(`❌ 失败: ${stats.failed} 个`)
  console.log(`📁 总计: ${stats.success + stats.failed} 个`)

  if (stats.failed > 0) {
    console.log('\n' + '-'.repeat(80))
    console.log('❌ 失败文件列表:')
    console.log('-'.repeat(80))

    stats.errors.forEach((error, index) => {
      console.log(`\n${index + 1}. ${error.file}`)
      console.log(`   类型: ${error.type}`)
      console.log(`   信息: ${error.message}`)
      if (error.line !== undefined) {
        console.log(`   位置: 第 ${error.line} 行, 第 ${error.column} 列`)
      }
    })

    console.log('\n' + '-'.repeat(80))
    console.log(`💡 提示: 请修复以上 ${stats.failed} 个文件的错误后重新编译`)
  } else {
    console.log('\n🎉 所有文件编译成功！')
  }

  console.log('='.repeat(80) + '\n')
}

async function start() {
  console.log('\n🎨 Less 到 CSS 编译工具')
  console.log('='.repeat(80))

  const startTime = Date.now()

  // 补充默认样式文件
  await supplyDefaultFile('./src/exports/*')
  await supplyDefaultFile('./lib/exports/*')

  // 编译所有 Less 文件
  await less2css('./src/**/*.less')
  await less2css('./es/**/*.less')
  await less2css('./lib/**/*.less')

  const endTime = Date.now()
  const duration = ((endTime - startTime) / 1000).toFixed(2)

  // 打印汇总报告
  printSummary()

  console.log(`⏱️  编译耗时: ${duration}s\n`)

  // 如果有失败的文件，以非零退出码退出
  if (stats.failed > 0) {
    process.exit(1)
  }
}

start()
