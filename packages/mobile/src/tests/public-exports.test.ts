import fs from 'fs'
import path from 'path'

interface PublicExport {
  name: string
  dir: string
}

const rootDir = process.cwd()
const srcDir = path.join(rootDir, 'packages/mobile/src')
const exportsDir = path.join(srcDir, 'exports')
const testFilePattern = /\.(test|spec)\.(ts|tsx|js|jsx)$/

function listFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return []
  }

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath]
  })
}

function getPublicExports(): PublicExport[] {
  const indexSource = fs.readFileSync(path.join(srcDir, 'index.ts'), 'utf8')

  return indexSource
    .split(/\r?\n/)
    .map((line) => line.match(/^export \{ default as ([^ ]+) \} from '\.\/exports\/([^']+)'$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => ({
      name: match[1],
      dir: match[2],
    }))
}

describe('public exports test coverage guard', () => {
  test('每个公开导出目录都有至少一个测试文件', () => {
    const missingTests = getPublicExports()
      .filter(({ dir }) => {
        const testsDir = path.join(exportsDir, dir, 'tests')
        return !listFiles(testsDir).some((file) => testFilePattern.test(file))
      })
      .map(({ name }) => name)

    expect(missingTests).toEqual([])
  })
})
