const fs = require('fs')
const path = require('path')
const glob = require('glob')

const files = glob.sync(path.resolve(__dirname, '../packages/mobile/src/exports/*'))
files.forEach((filepath) => {
  // console.log('filepath', filepath)
  // 检查路径下是否存在 type.ts/tsx 文件
  const name = path.basename(filepath)
  const isComponent = name[0] === name[0].toUpperCase()
  if (!isComponent) {
    return
  }
  const typeFile = path.resolve(filepath, 'type.ts')
  const typeTsxFile = path.resolve(filepath, 'type.tsx')

  if (fs.existsSync(typeFile)) {
    const content = fs.readFileSync(typeFile, { encoding: 'utf-8' })
    fs.renameSync(typeFile, typeTsxFile)
    fs.writeFileSync(
      typeTsxFile,
      `
import AUTO_API from '../../helpers/AUTO_API'
${content}
export default AUTO_API<${content.includes(`${name}Props`) ? `${name}Props` : 'any'}>()
  `,
      { encoding: 'utf-8' },
    )
    return
  }

  if (fs.existsSync(typeTsxFile)) {
    return
  }

  console.log('name', name)

  fs.writeFileSync(
    typeTsxFile,
    `
import AUTO_API from '../../helpers/AUTO_API'
import { FC } from '../../helpers/createFC'

export interface ${name}Props {}
export type ${name}Ref = any
export interface ${name}Type extends FC<${name}Props> {}

export default AUTO_API<${name}Props>()
`,
    { encoding: 'utf-8' },
  )

  // 不存在则创建
})
