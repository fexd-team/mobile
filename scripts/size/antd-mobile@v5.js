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
  const info = await cost('es/components', getContent('es/components'))

  spinner.stop()
  console.log(
    info
      .map((item) => `${item.gzip} -- ${item.name.replace('antd-mobile/es/components/', '').replace('/index.js', '')}`)
      .join(spliter),
  )

  console.log('--------------------')

  fs.writeFileSync(path.resolve(process.cwd(), './public/antd-size.json'), JSON.stringify({ esm: info }), {
    encoding: 'utf-8',
  })
}

module.exports = antdMobileSize
