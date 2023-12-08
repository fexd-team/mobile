const fs = require('fs')
const path = require('path')
const glob = require('glob')
const ora = require('ora')

const cost = require('./import-cost')

const spliter = `
`
function getContent(path) {
  return glob
    .sync(`./node_modules/zarm/${path}/*/index.js`)
    .map((filepath) => `require('${filepath.replace('./node_modules/zarm', 'zarm')}')`)
    .join(spliter)
}

// console.log(getContent('mobile/es/exports'))

async function size() {
  // console.log(getContent('cjs/components'))

  // return
  const spinner = ora('calculating size...')
  spinner.start()
  const [info, total] = await Promise.all([cost('zarm/es/*', getContent('es')), cost('zarm', `require('zarm')`)])

  spinner.stop()
  console.log(
    info.map((item) => `${item.gzip} -- ${item.name.replace('zarm/es/', '').replace('/index.js', '')}`).join(spliter),
  )

  console.log('--------------------')

  console.log(`[Total] ${total?.[0]?.gzip} -- zarm`)

  fs.writeFileSync(
    path.resolve(process.cwd(), './public/zarm-size.json'),
    JSON.stringify({
      esm: info.map((item) => ({
        exportName: item.name.replace('zarm/es/', '').replace('/index.js', ''),
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
