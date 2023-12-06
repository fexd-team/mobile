---
group:
  title: 输入
  path: /data

mobileDemoFixed: false
---

# Form 表单 <ImportCost name="Form" />

---

## 使用说明

### 基础用法

<code src="./demos/basic.tsx" />

---

## Form Instance

`createForm()` 会得到 `From` 实例，以下是属性说明

<API namePrefix="form." identifier="createForm" hideTitle src="../createForm/type.tsx" hideDefaultColumn hideRequiredMark></API>

## Form.Field

`<From.Field>` 标签的属性说明

<API identifier="Field" hideTitle src="../Form/Field/type.tsx" exports='["DOC_FormFieldProps"]'></API>

## FieldController

`<From.Field>` 标签的属性说明

<API namePrefix="field." identifier="FieldController" hideTitle src="../Form/Field/type.tsx" exports='["DOC_FieldController"]' hideDefaultColumn hideRequiredMark></API>

---

## 演示代码

<code src="./demos/demo1/index.tsx" />
