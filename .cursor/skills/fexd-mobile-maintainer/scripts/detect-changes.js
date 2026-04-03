const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const ROOT = path.resolve(__dirname, '../../../..')
const TRACKER_PATH = path.join(ROOT, '.cursor/skills/fexd-mobile-maintainer/.doc-tracker.json')
const EXPORTS_DIR = path.join(ROOT, 'packages/mobile/src/exports')
const REFS_DIR = path.join(ROOT, 'packages/mobile/skills/fexd-mobile/references')
const INDEX_PATH = path.join(ROOT, 'packages/mobile/src/index.ts')

let tracker = { generatedAt: null, components: {} }
try {
  tracker = JSON.parse(fs.readFileSync(TRACKER_PATH, 'utf-8'))
} catch (_) {}

const exportedNames = new Set()
try {
  const indexContent = fs.readFileSync(INDEX_PATH, 'utf-8')
  const re = /export\s*\{\s*default\s+as\s+(\w+)\s*\}/g
  let m
  while ((m = re.exec(indexContent)) !== null) {
    exportedNames.add(m[1])
  }
} catch (_) {}

const dirs = fs
  .readdirSync(EXPORTS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort()

const needsUpdate = []
const needsCreate = []
const needsRemoval = []
const needsReview = []
let upToDate = 0

for (const name of dirs) {
  const dir = path.join(EXPORTS_DIR, name)
  const isDeveloping = fs.existsSync(path.join(dir, '.developing'))
  const isExported = exportedNames.has(name)

  if (isDeveloping || !isExported) continue

  const tracked = tracker.components[name]

  if (!tracked) {
    needsCreate.push({ name, reason: 'new_component' })
    continue
  }

  const refFile = path.join(REFS_DIR, `${name}.md`)
  if (!fs.existsSync(refFile)) {
    needsCreate.push({ name, reason: 'doc_file_missing' })
    continue
  }

  if (!tracked.reviewStatus || tracked.reviewStatus !== 'passed') {
    needsReview.push({ name, reason: 'not_reviewed' })
  }

  const lastUpdated = tracked.lastUpdated
  if (!lastUpdated) {
    needsUpdate.push({ name, reason: 'no_timestamp', changedFiles: [] })
    continue
  }

  try {
    const sinceDate = new Date(lastUpdated).toISOString().split('T')[0]
    const gitOutput = execSync(
      `git log --name-only --format="" --since="${sinceDate}" -- "packages/mobile/src/exports/${name}/"`,
      { cwd: ROOT, encoding: 'utf-8', timeout: 10000 },
    ).trim()

    if (gitOutput) {
      const changedFiles = [
        ...new Set(
          gitOutput
            .split('\n')
            .filter(Boolean)
            .map((f) => path.basename(f)),
        ),
      ]
      needsUpdate.push({ name, reason: 'source_changed', changedFiles })
    } else {
      upToDate++
    }
  } catch (_) {
    needsUpdate.push({ name, reason: 'git_check_failed', changedFiles: [] })
  }
}

for (const name of Object.keys(tracker.components)) {
  const dir = path.join(EXPORTS_DIR, name)
  const isDeveloping = fs.existsSync(path.join(dir, '.developing'))
  const dirExists = fs.existsSync(dir)

  if (!dirExists || isDeveloping || !exportedNames.has(name)) {
    needsRemoval.push({ name, reason: !dirExists ? 'deleted' : isDeveloping ? 'now_developing' : 'no_longer_exported' })
  }
}

const result = {
  needsUpdate,
  needsCreate,
  needsRemoval,
  needsReview,
  upToDate,
  summary: [
    `${needsUpdate.length} 个需更新`,
    `${needsCreate.length} 个需新建`,
    `${needsRemoval.length} 个需删除`,
    `${needsReview.length} 个待审查`,
    `${upToDate} 个已最新`,
  ].join(', '),
}

process.stdout.write(JSON.stringify(result, null, 2) + '\n')
