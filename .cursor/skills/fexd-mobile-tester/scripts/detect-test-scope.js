const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const ROOT = path.resolve(__dirname, '../../../..')
const EXPORTS_DIR = path.join(ROOT, 'packages/mobile/src/exports')

const base = process.argv[2] || 'HEAD~1'

let changedFiles = []
try {
  const output = execSync(`git diff --name-only ${base}`, {
    cwd: ROOT,
    encoding: 'utf-8',
    timeout: 10000,
  }).trim()
  changedFiles = output ? output.split('\n') : []
} catch {
  try {
    const output = execSync('git diff --name-only --cached', {
      cwd: ROOT,
      encoding: 'utf-8',
      timeout: 10000,
    }).trim()
    changedFiles = output ? output.split('\n') : []
  } catch {
    changedFiles = []
  }
}

const componentPattern = /packages\/mobile\/src\/exports\/([^/]+)\//
const sharedPatterns = [
  /packages\/mobile\/src\/(?:helpers|hooks|utils)\//,
  /packages\/mobile\/src\/index\.ts$/,
  /jest\.config/,
  /\.swcrc$/,
  /jest-setup/,
]

const changedComponents = new Set()
let hasSharedChange = false

for (const file of changedFiles) {
  const match = file.match(componentPattern)
  if (match) {
    changedComponents.add(match[1])
  }
  if (sharedPatterns.some((p) => p.test(file))) {
    hasSharedChange = true
  }
}

const withTests = []
const withoutTests = []

for (const name of changedComponents) {
  const testDir = path.join(EXPORTS_DIR, name, 'tests')
  const testFile = path.join(testDir, 'index.test.tsx')
  if (fs.existsSync(testFile)) {
    withTests.push(name)
  } else {
    withoutTests.push(name)
  }
}

withTests.sort()
withoutTests.sort()

const jestPattern = withTests.length ? `exports/(${withTests.join('|')})/tests/` : ''

const result = {
  base,
  totalChanged: changedFiles.length,
  withTests,
  withoutTests,
  shared: hasSharedChange,
  runFullSuite: hasSharedChange,
  jestPattern,
  command: hasSharedChange
    ? 'npx jest --no-silent'
    : jestPattern
    ? `npx jest --testPathPattern='${jestPattern}' --no-silent`
    : null,
  summary: [
    `${withTests.length} 个有测试`,
    `${withoutTests.length} 个缺测试`,
    hasSharedChange ? '有公共模块变更 → 建议全量' : '无公共变更',
  ].join(', '),
}

process.stdout.write(JSON.stringify(result, null, 2) + '\n')
