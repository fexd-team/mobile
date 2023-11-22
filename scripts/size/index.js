const { argv } = require('yargs')
const ora = require('ora')
const { clearSizeCache } = require('@cjy0208/import-cost/dist/packageInfo')

const calculateFexdMobileSize = require('./fexd-mobile')
const calculateAntdMobileSize = require('./antd-mobile@v5')
const calculateArcodMobileSize = require('./arco-mobile')
const calculateZarmSize = require('./zarm')

if (argv.fresh) {
  const spinner = ora('clearing size cache...')
  spinner.start()
  clearSizeCache()
  spinner.stop()
  process.exit(0) // fresh 时仅清空缓存，不进行计算
}

const { target = 'fexd-mobile' } = argv

console.log(`calculating ${target}'s size`)

const calculate =
  {
    'fexd-mobile': calculateFexdMobileSize,
    'antd-mobile': calculateAntdMobileSize,
    zarm: calculateZarmSize,
    'arco-mobile': calculateArcodMobileSize,
  }[target] || calculateFexdMobileSize

calculate()
