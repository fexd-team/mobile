---
group:
  title: 输入
  path: /data

mobileDemoFixed: false
---

# Form 表单 <ImportCost name="Form" />

<!-- prettier-ignore -->
```jsx | pure
import { Form } from '@fexd/mobile'

<Form />
```

---

## 效果演示

<code src="./demos/basic.tsx" />

<code src="./demos/relative.tsx" />

---

## Form

<!-- prettier-ignore -->
```jsx | pure
import { Form } from '@fexd/mobile'

<Form>...</Form>
```

<API identifier="Form" hideTitle src="./type.tsx" exports='["default"]'></API>

---

## Form.Field

`<From.Field>` 标签用来创建一个表单的作用域

与 `antd` 之类的常见表单方案不同的是，`<From.Field>` 是完全无样式的，只提供 `field 控制器` 来与各种组件进行自定义结合

<!-- prettier-ignore -->
```jsx | pure
import { Form } from '@fexd/mobile'

<Form>
  <Form.Field
    name="userName"
    defaultValue="YOUR_USER_NAME"
    rules={[
      value => !value ? '请输入用户名' : undefined
    ]}
  >
    {...}
  </Form.Field>
</Form>
```

<API identifier="Field" hideTitle src="../Form/Field/type.tsx" exports='["DOC_FormFieldProps"]'></API>

---

## field 控制器

与 `antd` 之类的常见表单方案不同的是，`<From.Field>` 是完全无样式的，只提供 `field 控制器` 来与各种组件进行自定义结合

<!-- prettier-ignore -->
```jsx | pure
import { Form } from '@fexd/mobile'

<Form.Field>
  {field => (
    <>
      <input
        value={value}
        onChange={e => field.setValue(e.target.value)}
        onBlur={field.validate}
      />
      <span>{field.error}</span>
    </>
  )}
</Form.Field>
```

以下是 `field 控制器` 的属性说明

<API namePrefix="field." identifier="FieldController" hideTitle src="../Form/Field/type.tsx" exports='["DOC_FieldController"]' hideDefaultColumn hideRequiredMark></API>

---

## form 实例

调用 `createForm()` 或 `Form.useForm()` 会得到 `form` 实例

<!-- prettier-ignore -->
```jsx | pure
import { Form, createForm } from '@fexd/mobile'

const form = createForm() // 任意位置
const form = Form.useForm() // React FC 内
<Form form={form}>...</Form>
```

以下是 `form` 实例的属性说明

<API namePrefix="form." identifier="createForm" hideTitle src="../createForm/type.tsx" hideDefaultColumn hideRequiredMark></API>

---

<!-- ## 演示代码

<code src="./demos/demo1/index.tsx" /> -->
