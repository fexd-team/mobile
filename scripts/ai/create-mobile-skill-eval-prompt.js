const path = require('path')
const { paths, getFacts, readJson, readText } = require('./mobile-ai-assets')

function loadCases() {
  return ['prompts.json', 'component-selection.json', 'anti-hallucination.json'].flatMap((fileName) =>
    readJson(path.join(paths.skillDir, 'evals', fileName)),
  )
}

const facts = getFacts()
const cases = loadCases()
const rubric = readText(path.join(paths.skillDir, 'evals/rubric.md'))

const lines = [
  '# fexd-mobile Skill Local Eval Prompt',
  '',
  `Package: ${facts.packageName}@${facts.packageVersion}`,
  `Public exports: ${facts.counts.publicExports}`,
  `Developing components: ${facts.counts.developingComponents}`,
  '',
  'You are evaluating the `fexd-mobile` skill in this repository. Read `packages/mobile/skills/fexd-mobile/SKILL.md` first, then follow its routing guidance for each case. Do not invent props or components.',
  '',
  'For every case:',
  '',
  '1. Answer the user prompt as a coding assistant would.',
  '2. Check the answer against `deterministic_checks` and `negative_checks`.',
  '3. Score it using the rubric below.',
  '4. Return a compact JSON report with per-case `id`, `passed_deterministic`, `passed_negative`, `scores`, `weighted_total`, and `notes`.',
  '',
  'Fail the run if any negative check matches, any deterministic check is missing, any `weighted_total` is below 4.5, or any single dimension is below 3.5.',
  '',
  '## Cases',
  '',
  ...cases.map((item) =>
    [
      `### ${item.id} (${item.category})`,
      '',
      `Prompt: ${item.prompt}`,
      '',
      `Deterministic checks: ${JSON.stringify(item.deterministic_checks)}`,
      '',
      `Negative checks: ${JSON.stringify(item.negative_checks)}`,
      '',
      item.expected_selection ? `Expected selection: ${item.expected_selection}` : '',
      item.expected_answer ? `Expected answer: ${item.expected_answer}` : '',
      '',
    ]
      .filter(Boolean)
      .join('\n'),
  ),
  '## Rubric',
  '',
  rubric,
]

process.stdout.write(`${lines.join('\n')}\n`)
