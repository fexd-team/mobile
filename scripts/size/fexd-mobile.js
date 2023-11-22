const fs = require('fs')
const path = require('path')
const glob = require('glob')
const ora = require('ora')

const cost = require('./import-cost')

const spliter = `
`
function getContent(path) {
  return glob
    .sync(`./packages/${path}/*/index.js`)
    .map((filepath) => `require('${filepath.replace('./packages', '@fexd')}')`)
    .join(spliter)
}

// console.log(getContent('mobile/es/exports'))

async function kulaSize() {
  const spinner = ora('calculating size...')
  spinner.start()
  const [esm, cjs] = await Promise.all([
    cost('mobile/es/exports', getContent('mobile/es/exports')),
    cost('mobile/lib/exports', getContent('mobile/lib/exports')),
  ])

  spinner.stop()
  console.log(
    esm
      .map((item) => `[ESM] ${item.gzip} -- ${item.name.replace('@fexd/mobile/es/exports/', '').replace('/index.js', '')}`)
      .join(spliter),
  )

  console.log('--------------------')

  console.log(
    cjs
      .map((item) => `[CJS] ${item.gzip} -- ${item.name.replace('@fexd/mobile/lib/exports/', '').replace('/index.js', '')}`)
      .join(spliter),
  )

  fs.writeFileSync(path.resolve(process.cwd(), './public/size.json'), JSON.stringify({ esm, cjs }), {
    encoding: 'utf-8',
  })
}

module.exports = kulaSize
