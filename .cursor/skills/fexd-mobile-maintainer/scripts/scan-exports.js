const fs = require('fs')
const path = require('path')

const EXPORTS_DIR = path.resolve(__dirname, '../../../../packages/mobile/src/exports')
const INDEX_PATH = path.resolve(__dirname, '../../../../packages/mobile/src/index.ts')

const CATEGORY_MAP = {
  '/data': 'data',
  '/feedback': 'feedback',
  '/layout': 'layout',
  '/display': 'display',
  '/navigation': 'navigation',
  '/other': 'other',
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  const fm = {}
  match[1].split('\n').forEach((line) => {
    const kv = line.match(/^\s*(\w+):\s*(.+)/)
    if (kv) fm[kv[1]] = kv[2].trim()
    const pathMatch = line.match(/^\s*path:\s*(.+)/)
    if (pathMatch) fm._path = pathMatch[1].trim()
  })
  return fm
}

function extractCategory(frontmatter) {
  const p = frontmatter._path
  if (p && CATEGORY_MAP[p]) return CATEGORY_MAP[p]
  return 'unknown'
}

const exportedNames = new Set()
try {
  const indexContent = fs.readFileSync(INDEX_PATH, 'utf-8')
  const re = /export\s*\{\s*default\s+as\s+(\w+)\s*\}/g
  let m
  while ((m = re.exec(indexContent)) !== null) {
    exportedNames.add(m[1])
  }
} catch (e) {
  process.stderr.write(`Warning: could not read index.ts: ${e.message}\n`)
}

const dirs = fs
  .readdirSync(EXPORTS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort()

const components = []
let developing = 0

for (const name of dirs) {
  const dir = path.join(EXPORTS_DIR, name)
  const isDeveloping = fs.existsSync(path.join(dir, '.developing'))
  const hasDoc = fs.existsSync(path.join(dir, 'index.zh.md'))
  const hasType = fs.existsSync(path.join(dir, 'type.tsx'))
  const hasDemos = fs.existsSync(path.join(dir, 'demos'))
  const hasStyle = fs.existsSync(path.join(dir, 'style.less'))

  let category = 'unknown'
  if (hasDoc) {
    try {
      const docContent = fs.readFileSync(path.join(dir, 'index.zh.md'), 'utf-8')
      const fm = parseFrontmatter(docContent)
      category = extractCategory(fm)
    } catch (_) {}
  }

  if (isDeveloping) developing++

  components.push({
    name,
    exported: exportedNames.has(name),
    developing: isDeveloping,
    hasDoc,
    hasType,
    hasDemos,
    hasStyle,
    category,
  })
}

const result = {
  total: components.length,
  exported: components.filter((c) => c.exported).length,
  developing,
  stable: components.filter((c) => c.exported && !c.developing).length,
  components,
}

process.stdout.write(JSON.stringify(result, null, 2) + '\n')
