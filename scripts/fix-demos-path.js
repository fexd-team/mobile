const fs = require('fs')
const path = require('path')

const docsDir = path.resolve(__dirname, '../docs')

// 1. 重命名 ~demos 目录为 demos
const oldDemosDir = path.join(docsDir, '~demos')
const newDemosDir = path.join(docsDir, 'demos')

if (fs.existsSync(oldDemosDir)) {
  if (fs.existsSync(newDemosDir)) {
    fs.rmSync(newDemosDir, { recursive: true })
  }
  fs.renameSync(oldDemosDir, newDemosDir)
  console.log('✅ 重命名 ~demos -> demos')
}

// 2. 替换所有 JS 文件中的 ~demos 引用
const files = fs.readdirSync(docsDir)
files.forEach((file) => {
  if (file.endsWith('.js')) {
    const filePath = path.join(docsDir, file)
    let content = fs.readFileSync(filePath, 'utf-8')
    if (content.includes('~demos') || content.includes('%7Edemos')) {
      content = content.replace(/~demos/g, 'demos')
      content = content.replace(/%7Edemos/g, 'demos')
      fs.writeFileSync(filePath, content)
      console.log(`✅ 修复文件: ${file}`)
    }
  }
})

console.log('🎉 修复完成!')
