# 组件文档输出模板

生成 `references/{NAME}.md` 时遵循以下柔性规范。

## 文件头

每个输出文件**必须**以 YAML frontmatter 开头：

```markdown
---
name: { NAME }
description: { 中文一句话概括组件用途和核心能力 }
---

# {NAME} {中文名}

​`jsx import { {NAME} } from '@fexd/mobile' ​`
```

frontmatter 要求：

- `name`：组件导出名（PascalCase 或 camelCase，与 import 名一致）
- `description`：用中文，一句话概括，不超过 80 字

## 必选 Section

### 基础用法

提供组件最常见的使用方式，1-3 个核心代码片段：

```markdown
## 基础用法

​`jsx <Button type="primary" onClick={() => {}}> 确认 </Button> ​`
```

要求：

- 代码必须可直接运行（import 路径正确、prop 名称正确）
- 优先从 `demos/` 中提取真实示例，不可编造
- 片段应简洁，展示最常用的 2-3 种变体

### Props

从 `type.tsx` 中提取实际 interface，转为 markdown 表格：

```markdown
## Props

| 属性 | 类型                                                     | 默认值      | 必填 | 说明     |
| ---- | -------------------------------------------------------- | ----------- | ---- | -------- |
| type | `'primary' \| 'default' \| 'text' \| 'danger' \| 'link'` | `'default'` | 否   | 按钮类型 |
| size | `'mini' \| 'small' \| 'normal' \| 'large'`               | `'normal'`  | 否   | 按钮尺寸 |
```

要求：

- 必须从 type.tsx 中的实际 interface 提取，严禁编造不存在的 prop
- 复杂联合类型可适当简化但不可丢失关键信息
- 默认值从源码或文档中确认，不确定时标注「-」

## 按需 Section

以下 section 根据组件复杂度选择性包含：

### 高级用法（复杂组件）

```markdown
## 高级用法

### 异步 loading

Button 的 `loading` 属性支持 `"auto"` 模式，onClick 返回 Promise 时自动管理 loading 状态：

​`jsx <Button loading="auto" onClick={async () => { await submitForm() }}> 提交 </Button> ​`
```

### 子组件（有子组件的）

```markdown
## 子组件

### Form.Field

| 属性 | 类型     | 默认值 | 说明   |
| ---- | -------- | ------ | ------ |
| name | `string` | -      | 字段名 |
```

### 样式定制（有 style.less 或 StyleVars 的）

```markdown
## 样式定制

### Less 变量

| 变量               | 默认值         | 说明         |
| ------------------ | -------------- | ------------ |
| @button-primary-bg | `@brand-color` | 主按钮背景色 |

### CSS 变量（实验性）

| 变量                    | 说明         |
| ----------------------- | ------------ |
| --exd-button-primary-bg | 主按钮背景色 |
```

### 注意事项（有坑点的）

```markdown
## 注意事项

- `loading="auto"` 要求 `onClick` 返回 Promise，否则无效
- 组件内部使用 `Portal` 挂载，z-index 需注意
```

### 相关组件

```markdown
## 相关组件

- [BasicButton](BasicButton.md) — 无样式底层按钮
- [Form](Form.md) — 表单容器
```

## 拆分规则

当预估内容**超过 300 行**时，拆分为：

- `{NAME}.md`：概述 + 基础用法 + 核心 Props + 样式定制 + 注意事项
- `{NAME}-advanced.md`：高级用法 + 完整 Props（含不常用字段）+ 边界场景

在主文件末尾添加：

```markdown
> 高级用法和完整 API 见 [{NAME}-advanced.md]({NAME}-advanced.md)
```

## Design 文件规则

以下类型的组件需要额外的 `{NAME}-design.md`：

- Modal/Dialog/Popup/ActionSheet 系列（弹层体系）
- Form/Form.Field 系列（表单体系）
- IO 分层组件（Input/Picker/DatePicker/TimePicker 的 Line/Block/Cell 变体）
- 有复杂 DOM 层级或继承关系的组件

Design 文件内容：

1. DOM 层级结构描述（用缩进或树形图）
2. 组件继承/组合关系
3. 设计决策和权衡
4. 在末尾注明：「更多实现细节可查看 `node_modules/@fexd/mobile/src/exports/{NAME}/` 中的源码」

## 选用建议（功能相似组件必须）

若组件存在功能相似的兄弟组件（如 Dialog/Popup/ActionSheet、toast/notify），在"基础用法"之前增加一行"选用建议"：

```markdown
> **选用建议**：简单确认/取消场景用 `showDialog`，复杂面板用 `showPopup`。本组件适合 {具体场景}。
```

## 文件尾（源码溯源）

每个输出文件**末尾**必须追加源码路径 HTML 注释，标注生成该文档所参考的源文件：

```html
<!--
Source:
- packages/mobile/src/exports/{NAME}/type.tsx
- packages/mobile/src/exports/{NAME}/index.zh.md
- packages/mobile/src/exports/{NAME}/demos/
-->
```

仅列出该组件实际存在的源文件路径。

## 质量红线

- Props 表格中的每个字段都必须能在 type.tsx 中找到对应定义
- 代码片段中的 prop 名称必须与 type.tsx 中一致
- 不得出现任何 dumi 专有语法（参见 dumi-patterns.md）
- 不得编造不存在的功能或 API
- 必须包含 YAML frontmatter（name + description）
- 必须包含文件尾源码溯源注释
