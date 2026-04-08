const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '../../../..')
const EXPORTS_DIR = path.join(ROOT, 'packages/mobile/src/exports')

const componentName = process.argv[2]
if (!componentName) {
  console.error('用法: node scaffold-test.js <ComponentName>')
  process.exit(1)
}

const componentDir = path.join(EXPORTS_DIR, componentName)
const typePath = path.join(componentDir, 'type.tsx')
const indexPath = path.join(componentDir, 'index.tsx')

if (!fs.existsSync(typePath)) {
  console.error(`找不到 type.tsx: ${typePath}`)
  process.exit(1)
}

const typeContent = fs.readFileSync(typePath, 'utf-8')
const indexContent = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf-8') : ''

function extractProps(content) {
  const props = []
  const interfaceMatch = content.match(/export\s+interface\s+\w+Props[^{]*\{([\s\S]*?)\n\}/)
  if (!interfaceMatch) return props

  const body = interfaceMatch[1]
  const propRegex = /^\s+(\w+)\??\s*:\s*(.+?)$/gm
  let m
  while ((m = propRegex.exec(body)) !== null) {
    const [, name, rawType] = m
    if (['ref', 'className', 'style', 'children'].includes(name)) continue
    props.push({ name, type: rawType.trim().replace(/;$/, '') })
  }
  return props
}

function extractDefaultProps(content) {
  const defaults = {}
  const match = content.match(/\.defaultProps\s*=\s*\{([\s\S]*?)\}/)
  if (!match) return defaults

  const pairs = match[1].matchAll(/(\w+)\s*:\s*(.+?)(?:,|\s*$)/g)
  for (const [, key, val] of pairs) {
    defaults[key] = val.trim()
  }
  return defaults
}

function hasIOControl(content) {
  return content.includes('useIOControl')
}

function hasSubComponents(dir) {
  const subs = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.isDirectory() && entry.name !== 'tests' && entry.name !== 'demos' && entry.name !== '__tests__') {
      subs.push(entry.name)
    }
  }
  return subs
}

const props = extractProps(typeContent)
const defaults = extractDefaultProps(indexContent)
const isControlled = hasIOControl(indexContent)
const subComponents = hasSubComponents(componentDir)

const booleanProps = props.filter((p) => p.type === 'boolean')
const enumProps = props.filter((p) => p.type.includes("'") && p.type.includes('|'))
const callbackProps = props.filter((p) => p.name.startsWith('on') || p.type.includes('=>'))
const valueProps = props.filter((p) =>
  ['value', 'defaultValue', 'checked', 'defaultChecked', 'activeKey', 'defaultActiveKey'].includes(p.name),
)

function parseEnumValues(type) {
  const matches = type.match(/'([^']+)'/g)
  return matches ? matches.map((m) => m.replace(/'/g, '')) : []
}

const lines = []

lines.push(`import React from 'react'`)
lines.push(`import { render, fireEvent, screen } from '@testing-library/react'`)
lines.push(`import ${componentName} from '../..'`)
if (subComponents.length > 0) {
  for (const sub of subComponents) {
    lines.push(`import ${sub} from '../../${sub}'`)
  }
}
lines.push('')
lines.push(`describe('${componentName}', () => {`)

lines.push(`  // L1 冒烟`)
lines.push(`  test('默认渲染不崩溃', () => {`)
if (subComponents.length > 0) {
  const sub = subComponents[0]
  lines.push(`    const { container } = render(`)
  lines.push(`      <${componentName}>`)
  lines.push(`        <${sub} key="1">内容</${sub}>`)
  lines.push(`      </${componentName}>`)
  lines.push(`    )`)
} else {
  lines.push(`    const { container } = render(<${componentName} />)`)
}
lines.push(`    expect(container.firstChild).toBeInTheDocument()`)
lines.push(`  })`)
lines.push('')

for (const prop of booleanProps) {
  lines.push(`  // L2 布尔 prop`)
  lines.push(`  test('${prop.name} 属性能正常工作', () => {`)
  lines.push(`    const { container: off } = render(<${componentName} ${prop.name}={false} />)`)
  lines.push(`    const { container: on } = render(<${componentName} ${prop.name}={true} />)`)
  lines.push(`    // TODO: 验证 className 或 DOM 差异`)
  lines.push(`  })`)
  lines.push('')
}

for (const prop of enumProps) {
  const values = parseEnumValues(prop.type)
  if (values.length === 0) continue
  lines.push(`  // L2 枚举 prop`)
  lines.push(`  ${JSON.stringify(values)}.forEach((val) => {`)
  lines.push(`    test(\`${prop.name}="\${val}" 渲染正确\`, () => {`)
  lines.push(`      const { container } = render(<${componentName} ${prop.name}={val as any} />)`)
  lines.push(`      // TODO: 验证对应 className`)
  lines.push(`    })`)
  lines.push(`  })`)
  lines.push('')
}

for (const prop of callbackProps) {
  lines.push(`  // L3 事件回调`)
  lines.push(`  test('${prop.name} 回调被触发', () => {`)
  lines.push(`    const handler = jest.fn()`)
  lines.push(`    const { container } = render(<${componentName} ${prop.name}={handler} />)`)
  lines.push(`    // TODO: 触发交互后验证 handler`)
  lines.push(`  })`)
  lines.push('')
}

if (isControlled && valueProps.length > 0) {
  lines.push(`  // L5 受控/非受控`)
  const valueProp = valueProps.find((p) => !p.name.startsWith('default'))
  const defaultProp = valueProps.find((p) => p.name.startsWith('default'))

  if (defaultProp) {
    lines.push(`  test('非受控模式：${defaultProp.name} 设置初始值', () => {`)
    lines.push(`    // TODO: 传 ${defaultProp.name}，验证初始状态，交互后自行变化`)
    lines.push(`  })`)
    lines.push('')
  }

  if (valueProp) {
    lines.push(`  test('受控模式：${valueProp.name} 由外部控制', () => {`)
    lines.push(`    // TODO: 传 ${valueProp.name}，交互后不自行变化，rerender 后更新`)
    lines.push(`  })`)
    lines.push('')
  }
}

lines.push(`  // L6 边界`)
lines.push(`  test('异常 prop 不崩溃', () => {`)
lines.push(`    expect(() => {`)
lines.push(`      render(<${componentName} />)`)
lines.push(`    }).not.toThrow()`)
lines.push(`  })`)

lines.push(`})`)
lines.push('')

process.stdout.write(lines.join('\n'))
