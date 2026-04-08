const fs = require('fs')
const path = require('path')

const TOOLS_LIB = path.resolve(__dirname, '../../../../node_modules/@fexd/tools/lib')
const TOOLS_ES = path.resolve(__dirname, '../../../../node_modules/@fexd/tools/es')
const PKG_PATH = path.resolve(__dirname, '../../../../node_modules/@fexd/tools/package.json')

const CATEGORY_MAP = {
  isArray: 'type-guard',
  isBoolean: 'type-guard',
  isDate: 'type-guard',
  isError: 'type-guard',
  isExist: 'type-guard',
  isFunction: 'type-guard',
  isNaN: 'type-guard',
  isNull: 'type-guard',
  isNumber: 'type-guard',
  isObject: 'type-guard',
  isPromiseLike: 'type-guard',
  isString: 'type-guard',
  isUndefined: 'type-guard',

  isAndroid: 'env-detect',
  isIOS: 'env-detect',
  isMobile: 'env-detect',
  isDesktop: 'env-detect',
  isWKWebview: 'env-detect',

  clamp: 'number',
  random: 'number',
  isBigNumber: 'number',
  isNumberString: 'number',
  segment: 'number',

  capitalize: 'string',
  getFormatter: 'string',

  get: 'object',
  set: 'object',
  run: 'object',
  pick: 'object',
  pickBy: 'object',
  deepMerge: 'object',
  createProxyGetter: 'object',

  first: 'array',
  last: 'array',
  flatten: 'array',
  groupBy: 'array',
  uniqByKey: 'array',
  intersection: 'array',
  difference: 'array',
  diffArray: 'array',
  sample: 'array',

  pipe: 'fp',
  curry: 'fp',
  __: 'fp',
  value: 'fp',

  debounce: 'async',
  throttle: 'async',
  delay: 'async',
  nextTick: 'async',
  memoize: 'async',
  lock: 'async',
  SAS: 'async',
  catchPromise: 'async',
  enhancePromise: 'async',
  promiseGuess: 'async',

  easing: 'animation',
  Tween: 'animation',
  FrameProcess: 'animation',

  EventBus: 'event',
  ScrollListener: 'event',

  qs: 'url',
  url: 'url',

  storage: 'storage',

  copy: 'browser',
  source: 'browser',
  preloadImage: 'browser',
  globalThis: 'browser',

  formdata2obj: 'form',
  obj2formdata: 'form',

  I18n: 'i18n',
  CombJudge: 'misc',
  classnames: 'style',
}

const CATEGORY_LABELS = {
  'type-guard': '🎭 类型守卫',
  'env-detect': '📱 环境检测',
  number: '🔢 数值处理',
  string: '📝 字符串',
  object: '📦 对象操作',
  array: '📚 数组操作',
  fp: '🔗 函数式',
  async: '⏱️ 异步与定时',
  animation: '🎬 动画与帧',
  event: '📡 事件与滚动',
  url: '🌐 URL 与查询',
  storage: '💾 存储',
  browser: '🔧 浏览器工具',
  form: '📋 表单',
  i18n: '🌍 国际化',
  misc: '🎯 其他',
  style: '🏷️ 样式',
}

let pkg = {}
try {
  pkg = JSON.parse(fs.readFileSync(PKG_PATH, 'utf-8'))
} catch (e) {
  process.stderr.write(`Error: cannot read package.json: ${e.message}\n`)
  process.exit(1)
}

let indexContent = ''
try {
  indexContent = fs.readFileSync(path.join(TOOLS_LIB, 'index.d.ts'), 'utf-8')
} catch (e) {
  process.stderr.write(`Error: cannot read index.d.ts: ${e.message}\n`)
  process.exit(1)
}

const toolExports = []
const re = /export\s*\{\s*default\s+as\s+(\w+)\s*\}\s*from\s*'([^']+)'/g
let m
while ((m = re.exec(indexContent)) !== null) {
  const name = m[1]
  const importPath = m[2]

  const dtsFile = importPath.endsWith('/index')
    ? path.join(TOOLS_LIB, importPath + '.d.ts')
    : path.join(TOOLS_LIB, importPath + '.d.ts')

  const hasDts = fs.existsSync(dtsFile)
  const isDir = fs.existsSync(path.join(TOOLS_LIB, importPath.replace('./', ''), 'index.d.ts'))

  toolExports.push({
    name,
    importPath,
    category: CATEGORY_MAP[name] || 'unknown',
    categoryLabel: CATEGORY_LABELS[CATEGORY_MAP[name]] || '❓ 未分类',
    hasDts,
    isSubModule: isDir,
  })
}

const byCategory = {}
toolExports.forEach((exp) => {
  if (!byCategory[exp.category]) {
    byCategory[exp.category] = {
      label: exp.categoryLabel,
      tools: [],
    }
  }
  byCategory[exp.category].tools.push(exp.name)
})

const result = {
  package: pkg.name,
  version: pkg.version,
  totalExports: toolExports.length,
  categories: byCategory,
  exports: toolExports,
}

process.stdout.write(JSON.stringify(result, null, 2) + '\n')
