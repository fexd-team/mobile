# Scripts 目录说明

本目录包含 CSS 变量方案和构建相关的脚本。

## 📁 目录结构

```
scripts/
├── __tests__/                          # 测试文件目录
│   ├── edge-cases-analysis.md          # 边界情况分析文档
│   ├── run-plugin-tests.js             # 测试运行器
│   └── test-plugin-transform.js        # 测试用例定义（25个测试）
├── detect-cssvar-compatibility.js      # CSS 变量兼容性检测
├── lessvars2cssvars.js                 # Less 变量转 CSS 变量（统一脚本）
├── less-cssvar-calc-plugin.js          # Less 编译插件
├── less2css.js                         # Less 编译脚本
└── README.md                           # 本文件
```

## 🔧 核心脚本说明

### 1. lessvars2cssvars.js

**用途**：Less 变量转 CSS 变量的统一脚本

**功能**：

1. 扫描所有 Less 文件，建立全局变量表
2. 为每个组件生成 CSS 变量版本的样式文件（`.cssvars.less`）
3. 生成 `theme/vars.cssvars.less` 全局样式

**处理流程**：

1. 扫描 `theme/vars.less` 和所有组件的 `style.less`
2. 提取每个组件定义的变量
3. 在 Less 变量定义后生成 `:root { CSS 变量初始化 }`
4. 使用 `lessPlugin` 将运算包裹 `calc()`
5. 将样式代码中的 Less 变量替换为 CSS 变量

**生成的文件**：

- `theme/vars.cssvars.less` - 全局变量的 CSS 变量版本
- `exports/*/style.cssvars.less` - 每个组件的 CSS 变量版本

**文件格式**（示例）：

```less
@import 语句 // Less 变量定义
  @radio-default-color: @color-gray;
@radio-active-color: @color-primary;

:root {
  /* CSS 变量初始化 */
  --exd-radio-default-color: @radio-default-color;
  --exd-radio-active-color: @radio-active-color;
}

// 样式代码（变量已替换为 CSS 变量）
.exd-radio {
  color: var(--exd-radio-default-color);
}
```

**执行**：

```bash
# 处理所有目录
npm run lessvars2cssvars

# 只处理 src（开发时）
node scripts/lessvars2cssvars.js --target=src

# 只处理指定组件
node scripts/lessvars2cssvars.js --components=Button,Radio --target=src
```

**何时运行**：

- 在 `npm run build` 时自动执行（postbuild）
- 添加或修改 Less 变量时
- 修改组件样式时

---

### 2. less-cssvar-calc-plugin.js

**用途**：Less 编译插件，自动将包含 CSS 变量的运算转换为 `calc()`

**核心功能**：

1. 识别哪些 Less 变量被替换为了 CSS 变量
2. 找到包含这些变量的运算表达式
3. 将运算包裹为 `calc()`
4. 优化负号处理（`-@var * 2` → `calc(-1 * @var * 2)`）

**示例**：

```less
// 输入
width: @width * @scale;
top: -@offset / 2;

// 输出（经过 plugin 处理）
width: calc(@width * @scale);
top: calc(-1 * @offset / 2);
```

**使用**：

- 被 `lessvars2cssvars.js` 调用

---

### 3. less2css.js

**用途**：编译 Less 文件为 CSS

**处理范围**：

- `src/**/*.less`
- `es/**/*.less`
- `lib/**/*.less`

**排除**：

- `theme/` 目录（全局变量定义）

**执行**：

```bash
npm run less2css
```

**何时运行**：

- 在 `npm run build` 时自动执行
- 手动编译样式时

---

### 4. detect-cssvar-compatibility.js

**用途**：检测 CSS 变量的兼容性

**功能**：

- 扫描代码中 CSS 变量的使用情况
- 检查浏览器兼容性
- 生成兼容性报告

**执行**：

```bash
npm run cssvar:compat
```

---

## 🧪 测试文件说明

### **tests**/test-plugin-transform.js

**用途**：定义 `less-cssvar-calc-plugin.js` 的测试用例

**包含**：25 个测试用例，覆盖：

- 基础运算（+、-、\*、/）
- 负号处理
- 括号表达式
- 多值情况
- 边界情况

---

### **tests**/run-plugin-tests.js

**用途**：运行 plugin 的测试

**执行**：

```bash
cd packages/mobile
node scripts/__tests__/run-plugin-tests.js
```

**输出**：详细的测试结果和失败信息

---

### **tests**/edge-cases-analysis.md

**用途**：记录和分析边界情况

**内容**：

- 当前方案可以处理的情况（✅）
- 可能存在的边界问题（⚠️）
- 风险评估
- 改进建议

**重要性**：作为未来优化的参考文档

---

## 📝 NPM Scripts

在 `package.json` 中定义的相关脚本：

```json
{
  "scripts": {
    "build": "father build",
    "less2css": "node ./scripts/less2css",
    "lessvars2cssvars": "node ./scripts/lessvars2cssvars.js",
    "cssvar:compat": "node ./scripts/detect-cssvar-compatibility.js",
    "postbuild": "npm run lessvars2cssvars && npm run less2css"
  }
}
```

**构建流程**：

```
npm run build
  ↓
father build (构建代码)
  ↓
postbuild:
  ├─ lessvars2cssvars (生成 .cssvars.less)
  └─ less2css (编译为 CSS)
```

---

## 🚀 快速开始

### 开发时

```bash
# 1. 修改组件样式后，重新生成 CSS 变量版本（只处理 src）
node scripts/lessvars2cssvars.js --target=src

# 2. 编译为 CSS
npm run less2css

# 或者，只处理特定组件
node scripts/lessvars2cssvars.js --components=Button,Radio --target=src
```

### 发布前

```bash
# 完整构建（会自动执行所有步骤）
npm run build
```

### 测试

```bash
# 运行 plugin 测试
node scripts/__tests__/run-plugin-tests.js

# 检查 CSS 变量兼容性
npm run cssvar:compat
```

---

## 📚 相关文档

- [CSS 变量使用指南](../../documents/exports/theme-customization.md)
- [边界情况分析](__tests__/edge-cases-analysis.md)
- [Less Plugin 实现](less-cssvar-calc-plugin.js)

---

## 🔧 维护说明

### 添加新 Less 变量

1. 在组件的 `style.less` 或 `theme/vars.less` 中添加变量
2. 运行 `npm run lessvars2cssvars` 重新生成 `.cssvars.less`
3. 验证生成的 CSS 变量初始化正确

### 修改 Plugin 功能

1. 在 `less-cssvar-calc-plugin.js` 中实现
2. 在 `test-plugin-transform.js` 中添加测试用例
3. 运行 `node scripts/__tests__/run-plugin-tests.js` 验证
4. 运行 `npm run lessvars2cssvars` 重新生成

### 修复 Bug

1. 在 `test-plugin-transform.js` 中添加复现用例
2. 修复 `less-cssvar-calc-plugin.js` 或 `lessvars2cssvars.js`
3. 验证测试通过
4. 重新构建

### 更新文档

1. 修改 `edge-cases-analysis.md` 记录新的边界情况
2. 更新本 README.md
3. 更新 `theme-customization.md` 用户文档
