const fs = require('fs')
const path = require('path')
const glob = require('glob')
const ora = require('ora')

const cost = require('./import-cost')

const spliter = `
`
function getContent(path) {
  return glob
    .sync(`./node_modules/antd-mobile/${path}/*/index.js`)
    .map((filepath) => `require('${filepath.replace('./node_modules/antd-mobile', 'antd-mobile')}')`)
    .join(spliter)
}

// console.log(getContent('mobile/es/exports'))

async function antdMobileSize() {
  // console.log(getContent('cjs/components'))

  // return
  const spinner = ora('calculating size...')
  spinner.start()
  const [info, total] = await Promise.all([
    cost('antd-mobile/es/*', getContent('es/components')),
    cost('antd-mobile', `require('antd-mobile')`),
  ])

  spinner.stop()
  console.log(
    info
      .map((item) => `${item.gzip} -- ${item.name.replace('antd-mobile/es/components/', '').replace('/index.js', '')}`)
      .join(spliter),
  )

  console.log('--------------------')

  console.log(`[Total] ${total?.[0]?.gzip} -- antd-mobile`)

  fs.writeFileSync(
    path.resolve(process.cwd(), './public/antd-size.json'),
    JSON.stringify({
      esm: info.map((item) => ({
        exportName: item.name.replace('antd-mobile/es/components/', '').replace('/index.js', ''),
        ...item,
      })),
      total,
    }),
    {
      encoding: 'utf-8',
    },
  )
}

module.exports = antdMobileSize
