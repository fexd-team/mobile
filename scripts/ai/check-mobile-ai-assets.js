const fs = require('fs')
const path = require('path')
const { paths, getFacts, generateManifestText, generateLlmsTxt, readJson, readText } = require('./mobile-ai-assets')

const errors = []

function fail(message) {
  errors.push(message)
}

function assert(condition, message) {
  if (!condition) {
    fail(message)
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function assertGeneratedFile(filePath, expected, label) {
  if (!fs.existsSync(filePath)) {
    fail(`${label} is missing: ${filePath}`)
    return
  }

  const actual = readText(filePath)
  if (actual !== expected) {
    fail(`${label} is out of date. Run: npm run ai:assets`)
  }
}

function assertEvalJson(filePath, ids) {
  const cases = readJson(filePath)
  assert(Array.isArray(cases), `${filePath} must be a JSON array`)

  cases.forEach((item, index) => {
    assert(item.id, `${filePath}[${index}] is missing id`)
    assert(item.prompt, `${filePath}[${index}] is missing prompt`)
    assert(Array.isArray(item.deterministic_checks), `${filePath}[${index}] deterministic_checks must be an array`)
    assert(Array.isArray(item.negative_checks), `${filePath}[${index}] negative_checks must be an array`)

    if (item.id) {
      assert(!ids.has(item.id), `Duplicate eval id: ${item.id}`)
      ids.add(item.id)
    }

    ;[...(item.deterministic_checks || []), ...(item.negative_checks || [])].forEach((pattern) => {
      try {
        new RegExp(pattern)
      } catch (error) {
        fail(`${filePath} ${item.id || index} has invalid regex "${pattern}": ${error.message}`)
      }
    })
  })
}

const facts = getFacts()
const packageJson = readJson(paths.packageJson)

assertGeneratedFile(paths.manifest, generateManifestText(), 'components.manifest.json')
assertGeneratedFile(paths.llms, generateLlmsTxt(), 'llms.txt')

const missingReferences = facts.publicExports.filter((name) => !facts.referenceNames.includes(name))
const orphanReferences = facts.referenceNames.filter((name) => !facts.publicExports.includes(name))
const publicDeveloping = facts.components
  .filter((component) => component.publicExport && component.status === 'developing')
  .map((component) => component.name)

assert(missingReferences.length === 0, `Public exports missing references: ${missingReferences.join(', ')}`)
assert(orphanReferences.length === 0, `Reference docs without public export: ${orphanReferences.join(', ')}`)
assert(
  publicDeveloping.length === 0,
  `Developing components leaked into public exports: ${publicDeveloping.join(', ')}`,
)

const readmeFiles = [
  ['root README', paths.rootReadme],
  ['package README', paths.readme],
]
const developingMentions = readmeFiles.flatMap(([label, filePath]) => {
  const readme = readText(filePath)
  return facts.developingComponents
    .filter((name) => new RegExp(`\\*\\*${escapeRegExp(name)}\\*\\*`).test(readme))
    .map((name) => `${label}: ${name}`)
})
assert(
  developingMentions.length === 0,
  `README lists developing components as normal components: ${developingMentions.join(', ')}`,
)

const skill = readText(paths.skill)
const agents = readText(paths.agents)
const catalog = readText(paths.catalog)
const sourceNavigation = readText(paths.sourceNavigation)

assert(skill.includes(`@fexd/mobile v${facts.packageVersion}`), 'SKILL.md does not mention the current package version')
assert(
  skill.includes(`${facts.counts.publicExports} 个公开导出`),
  'SKILL.md does not mention the current public export count',
)
assert(
  agents.includes(`${facts.counts.publicExports} 个公开导出`),
  'AGENTS.md does not mention the current public export count',
)
assert(
  catalog.includes(`${facts.counts.publicExports} 个公开导出`),
  'catalog.md does not mention the current public export count',
)
assert(
  sourceNavigation.includes(`src/index.ts\`（${facts.counts.publicExports} 个公开导出）`),
  'source-navigation.md does not mention the current public export count',
)

assert(
  packageJson.files.includes('components.manifest.json'),
  'package.json files must include components.manifest.json',
)
assert(packageJson.files.includes('llms.txt'), 'package.json files must include llms.txt')
assert(Array.isArray(packageJson.sideEffects), 'package.json sideEffects should be a style whitelist array')
assert(packageJson.sideEffects.includes('**/*.less'), 'package.json sideEffects should include **/*.less')
assert(packageJson.sideEffects.includes('**/*.css'), 'package.json sideEffects should include **/*.css')

const evalIds = new Set()
;['prompts.json', 'component-selection.json', 'anti-hallucination.json'].forEach((fileName) => {
  assertEvalJson(path.join(paths.skillDir, 'evals', fileName), evalIds)
})

if (errors.length > 0) {
  console.error('AI asset check failed:')
  errors.forEach((error) => console.error(`- ${error}`))
  process.exit(1)
}

console.log(
  `AI asset check passed: ${facts.counts.publicExports} public exports, ${facts.counts.developingComponents} developing components.`,
)
