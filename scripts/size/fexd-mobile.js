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
  const [esm, cjs, total] = await Promise.all([
    cost('@fexd/mobile/es/*', getContent('mobile/es/exports')),
    cost('@fexd/mobile/lib/*', getContent('mobile/lib/exports')),
    cost('@fexd/mobile', `require('@fexd/mobile')`),
  ])

  spinner.stop()
  console.log(
    esm
      .map(
        (item) => `[ESM] ${item.gzip} -- ${item.name.replace('@fexd/mobile/es/exports/', '').replace('/index.js', '')}`,
      )
      .join(spliter),
  )

  console.log('--------------------')

  console.log(
    cjs
      .map(
        (item) =>
          `[CJS] ${item.gzip} -- ${item.name.replace('@fexd/mobile/lib/exports/', '').replace('/index.js', '')}`,
      )
      .join(spliter),
  )

  console.log('--------------------')

  console.log(`[Total] ${total?.[0]?.gzip} -- @fexd/mobile`)

  fs.writeFileSync(
    path.resolve(process.cwd(), './public/size.json'),
    JSON.stringify({
      esm: esm.map((item) => ({
        exportName: item.name.replace('@fexd/mobile/es/exports/', '').replace('/index.js', ''),
        ...item,
      })),
      cjs: cjs.map((item) => ({
        exportName: item.name.replace('@fexd/mobile/lib/exports/', '').replace('/index.js', ''),
        ...item,
      })),
      total,
    }),
    {
      encoding: 'utf-8',
    },
  )
}

module.exports = kulaSize
