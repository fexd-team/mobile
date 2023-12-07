const fs = require('fs')
const path = require('path')
const { argv } = require('yargs')

const ComponentGenerator = require('./generators/ComponentGenerator')

const br = `
`
if (!argv.name) {
  console.log('请使用 --name=XXX 参数提供组件名字')
  process.exit(0)
}

const cwd = process.cwd()
const names = argv.name.split(',')

async function addCompoment(name) {
  if (argv.force || !fs.existsSync(path.join(cwd, `./packages/mobile/src/exports/${name}/index.tsx`))) {
    await new ComponentGenerator({
      name,
      cwd,
    }).run()

    const scriptEntryPath = path.resolve(cwd, './packages/mobile/src/index.ts')
    const scriptEntryContent = fs.readFileSync(scriptEntryPath, { encoding: 'utf-8' })
    if (scriptEntryContent.indexOf(`from './exports/${name}'`) === -1) {
      fs.writeFileSync(
        scriptEntryPath,
        [`export { default as ${name} } from './exports/${name}'`, scriptEntryContent].join(br),
        { encoding: 'utf-8' },
      )
    }

    const typeEntryPath = path.resolve(cwd, './packages/mobile/src/types.ts')
    const typeEntryContent = fs.readFileSync(typeEntryPath, { encoding: 'utf-8' })
    if (typeEntryContent.indexOf(`from './exports/${name}'`) === -1) {
      fs.writeFileSync(typeEntryPath, [`export * from './exports/${name}/type'`, typeEntryContent].join(br), {
        encoding: 'utf-8',
      })
    }

    const styleEntryPath = path.resolve(cwd, './packages/mobile/src/style.less')
    const styleEntryContent = fs.readFileSync(styleEntryPath, { encoding: 'utf-8' })
    if (styleEntryContent.indexOf(`exports/${name}/style`) === -1) {
      fs.writeFileSync(styleEntryPath, [`@import './exports/${name}/style';`, styleEntryContent].join(br), {
        encoding: 'utf-8',
      })
    }
  } else {
    console.log(`/packages/mobile/src/exports/${name} 已存在，取消创建源码`)
  }
}

async function run() {
  await Promise.all(names.map(addCompoment))
}

run()
