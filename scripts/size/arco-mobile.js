const fs = require('fs')
const path = require('path')
const glob = require('glob')
const ora = require('ora')

const cost = require('./import-cost')

const spliter = `
`
function getContent(path) {
  return glob
    .sync(`./node_modules/@arco-design/mobile-react/${path}/*/index.js`)
    .map(
      (filepath) =>
        `require('${filepath.replace('./node_modules/@arco-design/mobile-react', '@arco-design/mobile-react')}')`,
    )
    .join(spliter)
}

// console.log(getContent('mobile/es/exports'))

async function size() {
  // console.log(getContent('cjs/components'))

  // return
  const spinner = ora('calculating size...')
  spinner.start()

  const [info, total] = await Promise.all([
    cost('@arco-design/mobile-react/esm/*', getContent('esm')),
    cost('@arco-design/mobile-react', `require('@arco-design/mobile-react')`),
  ])

  spinner.stop()
  console.log(
    info
      .map(
        (item) => `${item.gzip} -- ${item.name.replace('@arco-design/mobile-react/esm/', '').replace('/index.js', '')}`,
      )
      .join(spliter),
  )

  console.log('--------------------')

  console.log(`[Total] ${total?.[0]?.gzip} -- @arco-design/mobile-react`)

  fs.writeFileSync(
    path.resolve(process.cwd(), './public/arco-size.json'),
    JSON.stringify({
      esm: info.map((item) => ({
        exportName: item.name.replace('@arco-design/mobile-react/esm/', '').replace('/index.js', ''),
        ...item,
      })),
      total,
    }),
    {
      encoding: 'utf-8',
    },
  )
}

module.exports = size
