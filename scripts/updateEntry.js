const fs = require('fs')
const path = require('path')
const glob = require('glob')

const files = glob.sync(path.resolve(__dirname, '../packages/mobile/src/exports/*'))
const styleContent = []
const typeContent = []
const indexContent = []

files.forEach((filepath) => {
  // console.log('filepath', filepath)
  // 检查路径下是否存在 type.ts/tsx 文件
  const name = path.basename(filepath)
  const hasStyle = fs.existsSync(path.resolve(filepath, 'style.less'))
  const hasType = fs.existsSync(path.resolve(filepath, 'type.ts')) || fs.existsSync(path.resolve(filepath, 'type.tsx'))

  if (hasStyle) {
    styleContent.push(`@import './exports/${name}/style.less';`)
  }

  if (hasType) {
    typeContent.push(`export * from './exports/${name}/type'`)
  }

  indexContent.push(`export { default as ${name} } from './exports/${name}'`)

  return name
})

fs.writeFileSync(path.resolve(__dirname, '../packages/mobile/src/index.ts'), `${indexContent.join('\n')}${'\n'}`)
fs.writeFileSync(path.resolve(__dirname, '../packages/mobile/src/style.less'), `${styleContent.join('\n')}${'\n'}`)
fs.writeFileSync(path.resolve(__dirname, '../packages/mobile/src/types.ts'), `${typeContent.join('\n')}${'\n'}`)
