const fs = require('fs')
const glob = require('glob')
const path = require('path')
const less = require('less')
const LessNodeModules = require('less-plugin-import-node-modules')

const excludes = [/^\.\/lib\/theme/, /^\.\/es\/theme/, /^\.\/src\/theme/]

async function less2css(globPattern) {
  const filepaths = glob.sync(globPattern)
  const promises = filepaths
    .filter((filepath) => {
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
    .map(
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
            console.log(`[Less2Css Successfully] ${filepath}`)
          } catch (err) {
            console.log(`[Less2Css Failed] ${filepath}`)
            console.log(err)
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

async function start() {
  await supplyDefaultFile('./src/exports/*')
  await supplyDefaultFile('./lib/exports/*')

  await less2css('./src/**/*.less')
  await less2css('./es/**/*.less')
  await less2css('./lib/**/*.less')
}

start()
