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
  const info = await cost('esm', getContent('esm'))

  spinner.stop()
  console.log(
    info
      .map(
        (item) => `${item.gzip} -- ${item.name.replace('@arco-design/mobile-react/esm/', '').replace('/index.js', '')}`,
      )
      .join(spliter),
  )

  console.log('--------------------')
}

module.exports = size
