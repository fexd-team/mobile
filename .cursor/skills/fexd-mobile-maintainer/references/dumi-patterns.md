# Dumi 语法清洗规则

组件源码的 `index.zh.md` 使用 dumi 文档框架语法，以下 5 种模式在生成 AI skill 文档时必须清洗。

## 1. ImportCost 标签

**匹配模式**：`<ImportCost name="..." />`

通常出现在 H1 标题中，用于显示包体积。

```markdown
# Button 按钮 <ImportCost name="Button" />
```

**清洗方式**：删除整个标签。

```markdown
# Button 按钮
```

## 2. Code 引用标签

**匹配模式**：`<code src="./demos/..." ... />`

引用外部 demo 文件作为可运行示例。可能包含 `demoblockheight`、`pureview` 等属性。

```markdown
<code src="./demos/demo1/index.tsx" demoblockheight="500px" pureview />
```

**清洗方式**：有两种策略，AI 根据情况选择：

**策略 A**（优先）：读取引用的 demo 文件，提取关键代码内联到文档中。

```markdown
​`jsx // 来源: demos/demo1/index.tsx <Button type="primary">主要按钮</Button> <Button type="default">默认按钮</Button> ​`
```

**策略 B**：demo 文件过长或过于复杂时，替换为路径引用。

```markdown
> 完整示例见 `demos/demo1/index.tsx`
```

## 3. API 自动生成标签

**匹配模式**：`<API identifier="..." src="..." exports='[...]' ... />`

从 TypeScript 源文件自动提取 interface 生成 API 表格。常见属性：

- `identifier`：要提取的 export 名称
- `src`：源文件路径
- `exports`：JSON 数组指定要提取的导出
- `hideTitle`、`hideRequiredMark`、`hideDefaultColumn`：显示控制
- `namePrefix`：字段名前缀（如 `Form.`、`field.`）

```markdown
<API identifier="ButtonProps" hideTitle src="./type.tsx" exports='["ButtonProps"]'></API> <API identifier="ButtonStyleVars" hideTitle src="./type.tsx" exports='["DOC_ButtonStyleVars"]'></API>
```

**清洗方式**：读取 `src` 指向的 type.tsx 文件，找到对应的 interface/type 定义，转为 markdown Props 表格。

```markdown
## Props

| 属性 | 类型                     | 默认值      | 必填 | 说明     |
| ---- | ------------------------ | ----------- | ---- | -------- |
| type | `'primary' \| 'default'` | `'default'` | 否   | 按钮类型 |
```

对于 `DOC_` 前缀的 StyleVars 导出，转为样式变量表格：

```markdown
## 样式变量

| 变量               | 默认值         | 说明         |
| ------------------ | -------------- | ------------ |
| @button-primary-bg | `@brand-color` | 主按钮背景色 |
```

## 4. Fence 修饰符

**匹配模式**：` ```lang | pure `（注意 `|` 前后有空格）

dumi 约定 `| pure` 表示静态展示，不渲染为可交互 demo。

```markdown
​`jsx | pure <Button>示例</Button> ​`
```

**清洗方式**：删除 `| pure` 部分。

```markdown
​`jsx <Button>示例</Button> ​`
```

同理处理 ` ```ts | pure ` → ` ```ts `。

## 5. YAML Frontmatter

**匹配模式**：文件开头 `---` 包裹的 YAML 块。

```yaml
---
group:
  title: 输入
  path: /data
  order: 103
mobileDemoFixed: false
---
```

**清洗方式**：

- 提取 `group.path` 映射为分类信息（如 `/data` → 输入类）
- 删除整个 frontmatter 块
- 分类信息用于 catalog.md 索引，不写入组件文档

## 6. HTML 注释

**匹配模式**：`<!-- ... -->`

通常是 prettier-ignore 或临时注释。

```markdown
<!-- prettier-ignore -->
<!-- ### 预览 -->
```

**清洗方式**：删除。

## 快速检查清单

生成文档后，全文搜索以下模式确认零残留：

- `<ImportCost` — 必须为 0
- `<code src=` — 必须为 0
- `<API ` — 必须为 0
- `| pure` — 必须为 0（在 fence 行中）
- `mobileDemoFixed` — 必须为 0
- `<!-- ` — 应为 0（除非是有意义的注释）
