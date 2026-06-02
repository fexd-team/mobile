const fs = require('fs')
const path = require('path')

const repoRoot = path.resolve(__dirname, '../..')
const mobileDir = path.join(repoRoot, 'packages/mobile')
const srcDir = path.join(mobileDir, 'src')
const exportsDir = path.join(srcDir, 'exports')
const skillDir = path.join(mobileDir, 'skills/fexd-mobile')
const referencesDir = path.join(skillDir, 'references')

const paths = {
  repoRoot,
  mobileDir,
  srcDir,
  exportsDir,
  skillDir,
  referencesDir,
  packageJson: path.join(mobileDir, 'package.json'),
  rootReadme: path.join(repoRoot, 'README.md'),
  readme: path.join(mobileDir, 'README.md'),
  agents: path.join(mobileDir, 'AGENTS.md'),
  skill: path.join(skillDir, 'SKILL.md'),
  catalog: path.join(skillDir, 'catalog.md'),
  sourceNavigation: path.join(skillDir, 'source-navigation.md'),
  manifest: path.join(mobileDir, 'components.manifest.json'),
  llms: path.join(mobileDir, 'llms.txt'),
}

let cachedFacts = null

function toPosix(filePath) {
  return filePath.split(path.sep).join('/')
}

function relFromMobile(filePath) {
  return toPosix(path.relative(mobileDir, filePath))
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8')
}

function readJson(filePath) {
  return JSON.parse(readText(filePath))
}

function listDirs(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
}

function listFilesRecursive(dir) {
  if (!fs.existsSync(dir)) {
    return []
  }

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    return entry.isDirectory() ? listFilesRecursive(fullPath) : [fullPath]
  })
}

function unique(values) {
  return [...new Set(values)].sort()
}

function matchAll(source, pattern, group = 1) {
  return unique([...source.matchAll(pattern)].map((match) => match[group]).filter(Boolean))
}

function getPublicExports() {
  const indexSource = readText(path.join(srcDir, 'index.ts'))
  return [...indexSource.matchAll(/^export \{ default as ([^ ]+) \} from '\.\/exports\/([^']+)'$/gm)].map((match) => ({
    name: match[1],
    dir: match[2],
  }))
}

function getReferenceNames() {
  if (!fs.existsSync(referencesDir)) {
    return []
  }

  return fs
    .readdirSync(referencesDir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => path.basename(name, '.md'))
    .filter((name) => !/-(advanced|design)$/.test(name))
    .sort()
}

function extractDescription(referencePath) {
  if (!referencePath || !fs.existsSync(referencePath)) {
    return null
  }

  const content = readText(referencePath)
  const match = content.match(/^description:\s*(.+)$/m)
  return match ? match[1].trim() : null
}

function getComponentFacts() {
  const publicExports = getPublicExports()
  const publicByDir = new Map(publicExports.map((item) => [item.dir, item.name]))
  const exportDirs = listDirs(exportsDir)

  return exportDirs.map((dir) => {
    const componentDir = path.join(exportsDir, dir)
    const typeFile = ['type.tsx', 'type.ts']
      .map((file) => path.join(componentDir, file))
      .find((file) => fs.existsSync(file))
    const styleFile = path.join(componentDir, 'style.less')
    const referenceFile = path.join(referencesDir, `${dir}.md`)
    const developing = fs.existsSync(path.join(componentDir, '.developing'))
    const publicName = publicByDir.get(dir)
    const typeSource = typeFile ? readText(typeFile) : ''
    const testFiles = listFilesRecursive(path.join(componentDir, 'tests')).filter((file) =>
      /\.(test|spec)\.(ts|tsx|js|jsx)$/.test(file),
    )

    return {
      name: publicName || dir,
      dir,
      status: developing ? 'developing' : publicName ? 'public' : 'internal',
      publicExport: Boolean(publicName),
      available: Boolean(publicName) && !developing,
      import: publicName ? `import { ${publicName} } from '@fexd/mobile'` : null,
      description: extractDescription(fs.existsSync(referenceFile) ? referenceFile : null),
      paths: {
        source: relFromMobile(componentDir),
        type: typeFile ? relFromMobile(typeFile) : null,
        style: fs.existsSync(styleFile) ? relFromMobile(styleFile) : null,
        reference: fs.existsSync(referenceFile) ? relFromMobile(referenceFile) : null,
        docs: fs.existsSync(path.join(componentDir, 'index.zh.md'))
          ? relFromMobile(path.join(componentDir, 'index.zh.md'))
          : null,
      },
      propsTypes: matchAll(typeSource, /export\s+(?:interface|type)\s+([A-Za-z0-9_]+Props)\b/g),
      styleVars: matchAll(typeSource, /export\s+interface\s+([A-Za-z0-9_]+StyleVars)\b/g),
      hasDemos: fs.existsSync(path.join(componentDir, 'demos')),
      hasTests: testFiles.length > 0,
    }
  })
}

function getFacts() {
  if (cachedFacts) {
    return cachedFacts
  }

  const packageJson = readJson(paths.packageJson)
  const components = getComponentFacts()
  const publicExports = components.filter((component) => component.publicExport)
  const developingComponents = components.filter((component) => component.status === 'developing')
  const references = getReferenceNames()

  cachedFacts = {
    packageName: packageJson.name,
    packageVersion: packageJson.version,
    counts: {
      publicExports: publicExports.length,
      developingComponents: developingComponents.length,
      sourceExportDirs: components.length,
      referenceDocuments: references.length,
    },
    publicExports: publicExports.map((component) => component.name).sort(),
    developingComponents: developingComponents.map((component) => component.name).sort(),
    referenceNames: references,
    components,
  }

  return cachedFacts
}

function buildManifest() {
  const facts = getFacts()

  return {
    package: facts.packageName,
    version: facts.packageVersion,
    source: {
      publicEntry: 'src/index.ts',
      exportsDir: 'src/exports',
      referencesDir: 'skills/fexd-mobile/references',
      developingMarker: '.developing',
    },
    counts: facts.counts,
    rules: {
      developingComponentsAreUnavailable: true,
      preferReferencesBeforeSource: true,
      sourceTypesAreAuthoritative: true,
    },
    components: facts.components,
  }
}

function generateManifestText() {
  return `${JSON.stringify(buildManifest(), null, 2)}\n`
}

function generateLlmsTxt() {
  const facts = getFacts()
  const unavailable = facts.developingComponents.join(', ')

  return [
    '# @fexd/mobile',
    '',
    `React mobile H5 component library. Current package version: ${facts.packageVersion}.`,
    '',
    '## AI Entry Points',
    '',
    '- `AGENTS.md`: shortest package-level context for coding agents.',
    '- `skills/fexd-mobile/SKILL.md`: main skill with routing, anti-hallucination rules, recipes, and self-checks.',
    '- `skills/fexd-mobile/catalog.md`: task-oriented component selection catalog.',
    '- `skills/fexd-mobile/decision-map.md`: selection rules when multiple components seem possible.',
    '- `skills/fexd-mobile/source-navigation.md`: how to verify props and behavior from source.',
    '- `skills/fexd-mobile/references/{ComponentName}.md`: component-level usage, props, examples, and style notes.',
    '- `components.manifest.json`: machine-readable public exports, developing components, source paths, references, props type names, and style var type names.',
    '',
    '## Current Public Surface',
    '',
    `- Public exports: ${facts.counts.publicExports}`,
    `- Developing/unavailable components: ${facts.counts.developingComponents}`,
    `- Reference documents: ${facts.counts.referenceDocuments}`,
    '',
    '## Important Rules',
    '',
    '- Do not import components marked with `.developing`; they are not public exports.',
    '- Verify uncertain props in `references/{ComponentName}.md`, then in `src/exports/{ComponentName}/type.tsx`.',
    '- Prefer command APIs such as `showDialog`, `showPopup`, `toast`, and `loading` for one-off feedback flows.',
    '- For forms, use `Form.Field`; `Form.Item` does not exist in this package.',
    '- `Button` does not have a `danger` prop; use `type="danger"`.',
    '',
    '## Unavailable Components',
    '',
    unavailable,
    '',
  ].join('\n')
}

module.exports = {
  paths,
  getFacts,
  buildManifest,
  generateManifestText,
  generateLlmsTxt,
  readJson,
  readText,
}
