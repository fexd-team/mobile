# 硬编码值检测脚本使用说明

## 📖 脚本运作原理

### 1. 整体架构

```
扫描目录 → 读取文件 → 正则匹配 → 上下文过滤 → 生成报告
```

### 2. 核心流程

#### 阶段 1: 配置与初始化

```javascript
const CONFIG = {
  sourceDir: path.join(__dirname, '../src/exports'), // 扫描目录
  outputFile: path.join(__dirname, '../hardcoded-values.log'), // 输出文件
  excludePatterns: ['.cssvars.less'], // 排除文件模式
  excludeDirs: ['demos'], // 排除目录
  developingMarker: '.developing', // 开发中标记文件
}
```

#### 阶段 2: 文件扫描

- 递归扫描 `sourceDir` 目录
- 排除 `excludeDirs` 中的目录（如 demos）
- 过滤 `.less` 文件（排除 `.cssvars.less`）
- 检测是否有 `.developing` 文件标记

#### 阶段 3: 内容分析

对每个文件进行正则匹配：

```javascript
const PATTERNS = {
  px: /(?<![-\w])(\d+(?:\.\d+)?px)(?!\s*\*\s*@size-scale)/g,
  hexColor: /#[0-9a-fA-F]{3,8}\b/g,
  rgbColor: /rgba?\([^)]+\)/g,
  // ... 更多模式
}
```

#### 阶段 4: 上下文过滤

对每个匹配结果进行过滤：

```javascript
// 过滤条件
if (isInComment(content, position)) continue;          // 在注释中
if (isVariableDefinition(content, position)) continue;  // 变量定义行
if (isInVariableName(content, position)) continue;     // 变量名中
if (isNoCssvarLine(content, position)) continue;       // @no-cssvar 标记
if (shouldIgnore(value, type)) continue;               // 白名单值
```

#### 阶段 5: 结果聚合

- 按组件分组
- 区分稳定组件和开发中组件
- 统计各类型硬编码值数量

#### 阶段 6: 报告生成

- 生成格式化的文本报告
- 使用绝对路径便于跳转
- 提供详细统计信息

---

## 🏷️ 使用 @hardcoded-ignore 标记

### 功能说明

当你有一些硬编码值是有意为之，不想在主报告中显示但又想保留记录时，可以使用 `// @hardcoded-ignore` 标记。

### 使用方法

#### 方法 1: 在同一行标记

```less
.badge {
  z-index: 99; // @hardcoded-ignore
  opacity: 0.95; // @hardcoded-ignore
}
```

#### 方法 2: 在上一行标记

```less
.badge {
  // @hardcoded-ignore
  z-index: 99;

  // @hardcoded-ignore
  opacity: 0.95;
}
```

### 效果

标记后的硬编码值会：

- ✅ 不出现在 "稳定组件" 或 "开发中组件" 部分
- ✅ 单独显示在 "已标记忽略" 部分
- ✅ 在统计中单独计数
- ✅ 在控制台输出中单独计数

### 适用场景

1. **浏览器兼容性修复**

   ```less
   -webkit-tap-highlight-color: rgba(0, 0, 0, 0); // @hardcoded-ignore
   ```

2. **特殊的 z-index 值**

   ```less
   // @hardcoded-ignore (遮罩层需要最高层级)
   z-index: 9999;
   ```

3. **特殊的 transform 值**

   ```less
   // @hardcoded-ignore (居中定位)
   transform: translate(50%, -50%);
   ```

4. **动画时间**
   ```less
   transition: opacity 0.3s; // @hardcoded-ignore (符合设计规范)
   ```

---

## 🛠️ 自定义检测规则

### 方法 1: 修改现有模式（简单）

#### 1.1 添加需要忽略的值

```javascript
const IGNORE_VALUES = {
  px: [
    '0px',
    '1px',
    '2px',
    '3px', // ⬅️ 添加新的忽略值
    '4px',
  ],
  colors: [
    'transparent',
    '#f0f0f0', // ⬅️ 添加新的忽略颜色
  ],
  'z-index': ['0', '1', '-1', '9999', '99999'],
  'line-height': ['1', '1.5', '2'],
}
```

#### 1.2 修改排除目录或文件模式

```javascript
const CONFIG = {
  excludeDirs: ['demos', 'tests', '__tests__'], // ⬅️ 添加更多目录
  excludePatterns: ['.cssvars.less', '.module.less'], // ⬅️ 添加模式
}
```

#### 1.3 调整正则表达式

```javascript
const PATTERNS = {
  // 原来：只匹配 px
  px: /(?<![-\w])(\d+(?:\.\d+)?px)(?!\s*\*\s*@size-scale)/g,

  // 修改：匹配 px, em, rem
  px: /(?<![-\w])(\d+(?:\.\d+)?(?:px|em|rem))(?!\s*\*\s*@size-scale)/g,
}
```

---

### 方法 2: 添加新的检测类型（中等）

#### 示例：添加 font-size 检测

**步骤 1: 添加正则模式**

```javascript
const PATTERNS = {
  // ... 现有模式

  // 新增：检测 font-size
  fontSize: /font-size\s*:\s*(\d+(?:\.\d+)?(?:px|em|rem))/gi,
}
```

**步骤 2: 添加忽略值**

```javascript
const IGNORE_VALUES = {
  // ... 现有值

  // 新增：font-size 忽略值
  fontSize: ['12px', '14px', '16px'],
}
```

**步骤 3: 添加检测逻辑**

在 `analyzeFile()` 函数中添加：

```javascript
// 检测 font-size
const fontSizePattern = new RegExp(PATTERNS.fontSize)
while ((match = fontSizePattern.exec(content)) !== null) {
  const value = match[1]
  const position = match.index

  if (shouldIgnore(value, 'fontSize')) continue
  if (isInComment(content, position)) continue
  if (isNoCssvarLine(content, position)) continue

  const context = getContext(content, position)
  if (/^\s*@[\w-]+\s*:/.test(context.lineContent)) continue

  results.push({
    type: 'font-size',
    value,
    ...context,
  })
}
```

**步骤 4: 更新统计逻辑**

在 `generateReport()` 函数中：

```javascript
const totalStats = {
  px: 0,
  color: 0,
  'z-index': 0,
  'line-height': 0,
  animation: 0,
  transform: 0,
  'font-size': 0, // ⬅️ 添加新类型
}
```

并在统计输出部分添加：

```javascript
if (totalStats['font-size'] > 0) {
  lines.push(
    `   - font-size: ${totalStats['font-size']} 个 (稳定: ${stableStats['font-size']}, 开发中: ${developingStats['font-size']})`,
  )
}
```

---

### 方法 3: 添加高级过滤器（复杂）

#### 示例：检测未使用 CSS 变量的属性

**添加新的过滤函数：**

```javascript
// 检查属性是否使用了 CSS 变量
function isUsingCssVariable(content, position) {
  const context = getContext(content, position)
  const line = context.lineContent

  // 检查是否包含 var() 或 @变量
  return line.includes('var(') || /@[\w-]+/.test(line)
}
```

**在检测逻辑中使用：**

```javascript
// 检测颜色值
const hexPattern = new RegExp(PATTERNS.hexColor)
while ((match = hexPattern.exec(content)) !== null) {
  const value = match[0]
  const position = match.index

  // ... 其他过滤

  // ⬅️ 新增过滤：如果已使用变量，跳过
  if (isUsingCssVariable(content, position)) continue

  results.push({ type: 'color', value, ...context })
}
```

---

## 🎯 实用自定义示例

### 示例 1: 检测魔法数字（任意数字）

```javascript
const PATTERNS = {
  // 检测所有数字（用于发现可能的魔法数字）
  magicNumber: /:\s*(\d+(?:\.\d+)?)\s*(?!px|em|rem|%|ms|s|deg)/gi,
}

// 在 analyzeFile 中添加检测逻辑
const magicNumberPattern = new RegExp(PATTERNS.magicNumber)
while ((match = magicNumberPattern.exec(content)) !== null) {
  const value = match[1]
  const position = match.index

  // 过滤掉合理的值
  if (['0', '1', '2'].includes(value)) continue
  if (isInComment(content, position)) continue

  const context = getContext(content, position)
  if (/^\s*@[\w-]+\s*:/.test(context.lineContent)) continue

  results.push({
    type: 'magic-number',
    value,
    ...context,
  })
}
```

### 示例 2: 检测语义化颜色使用

```javascript
// 检测是否直接使用了 ant-color，而不是语义化的 color-primary 等
function isDirectAntColorUsage(content, position) {
  const context = getContext(content, position)
  const line = context.lineContent

  // 检查是否直接使用了 ant-color-xxx
  return /@ant-color-/.test(line) && !/@color-/.test(line)
}

// 添加到颜色检测中
if (isDirectAntColorUsage(content, position)) {
  results.push({
    type: 'non-semantic-color',
    value,
    ...context,
  })
}
```

### 示例 3: 检测特定属性的硬编码

```javascript
// 只检测特定属性的硬编码值
const CRITICAL_PROPERTIES = [
  'width', 'height', 'padding', 'margin',
  'font-size', 'line-height', 'color', 'background'
]

function isCriticalProperty(content, position) {
  const context = getContext(content, position)
  const line = context.lineContent

  return CRITICAL_PROPERTIES.some(prop => {
    const regex = new RegExp(`${prop}\\s*:`, 'i')
    return regex.test(line)
  })
}

// 在检测时使用
if (!isCriticalProperty(content, position)) continue
```

---

## 🔧 配置文件方案（推荐）

### 创建配置文件 `check-hardcoded-values.config.js`

```javascript
module.exports = {
  // 基础配置
  sourceDir: './src/exports',
  outputFile: './hardcoded-values.log',
  excludeDirs: ['demos', 'tests'],
  excludePatterns: ['.cssvars.less', '.module.less'],

  // 检测规则
  rules: {
    // 启用/禁用规则
    'px-values': true,
    colors: true,
    'z-index': true,
    'line-height': true,
    animation: true,
    transform: true,
    'font-size': false, // 可选规则，默认禁用
  },

  // 忽略值
  ignore: {
    px: ['0px', '1px', '2px'],
    colors: ['transparent', '#fff', '#000'],
    'z-index': ['0', '1', '-1'],
  },

  // 自定义规则
  customRules: [
    {
      name: 'magic-number',
      pattern: /:\s*(\d+(?:\.\d+)?)\s*(?!px|em|rem)/gi,
      filter: (value) => !['0', '1', '2'].includes(value),
    },
  ],
}
```

### 在脚本中加载配置

```javascript
// 加载配置
let userConfig = {}
const configPath = path.join(__dirname, '../check-hardcoded-values.config.js')
if (fs.existsSync(configPath)) {
  userConfig = require(configPath)
}

// 合并配置
const CONFIG = {
  sourceDir: path.join(__dirname, userConfig.sourceDir || '../src/exports'),
  outputFile: path.join(__dirname, userConfig.outputFile || '../hardcoded-values.log'),
  excludePatterns: userConfig.excludePatterns || ['.cssvars.less'],
  excludeDirs: userConfig.excludeDirs || ['demos'],
  developingMarker: '.developing',
}
```

---

## 📝 调试技巧

### 1. 查看匹配的原始位置

```javascript
results.push({
  type: 'color',
  value,
  position, // ⬅️ 添加原始位置
  ...context,
})
```

### 2. 输出详细日志

```javascript
if (process.env.DEBUG) {
  console.log(`Found ${value} at line ${context.lineNumber}`)
  console.log(`Context: ${context.lineContent}`)
}
```

运行时：

```bash
DEBUG=1 node scripts/check-hardcoded-values.js
```

### 3. 测试单个文件

```javascript
// 添加命令行参数支持
const testFile = process.argv[2]
if (testFile) {
  const result = analyzeFile(testFile)
  console.log(JSON.stringify(result, null, 2))
  process.exit(0)
}
```

运行时：

```bash
node scripts/check-hardcoded-values.js src/exports/Badge/style.less
```

---

## 🚀 快速开始自定义

### 1. 复制脚本作为模板

```bash
cp scripts/check-hardcoded-values.js scripts/check-my-rules.js
```

### 2. 修改配置

编辑 `CONFIG` 和 `IGNORE_VALUES`

### 3. 添加/修改模式

编辑 `PATTERNS` 对象

### 4. 更新检测逻辑

在 `analyzeFile()` 函数中添加新的检测代码

### 5. 运行测试

```bash
node scripts/check-my-rules.js
```

---

## 💡 最佳实践

1. **渐进式检测**：先检测少量规则，确保没有误报后再添加更多
2. **合理忽略**：不是所有硬编码都需要提取，如 `0px`, `1px` 等
3. **优先级**：先处理稳定组件，开发中组件可以稍后
4. **文档化**：为新增的规则编写说明文档
5. **版本控制**：将配置文件加入版本控制

---

## 📚 相关资源

- Less 文档: https://lesscss.org/
- 正则表达式测试: https://regex101.com/
- CSS 变量最佳实践: 查看项目文档

---

## 🤝 贡献

如果你添加了有用的检测规则，欢迎分享！

---

**最后更新**: 2025-12-12
