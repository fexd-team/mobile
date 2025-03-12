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

## Form 静态属性

<API identifier="Form" namePrefix="Form." hideTitle src="./type.tsx" exports='["DOC_FormStaticMethods"]' hideRequiredMark hideDefaultColumn></API>

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

### field 控制器

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

### 校验特定 rule

可以使用对象类型的 `rules`，结合 `form.validate` 的第二个参数校验特定的 rule

```jsx | pure
<Form.Field
  name="userName"
  rules={{
    required: (...) => ...,
    equal: (...) => ...,
  }}
>
  {...}
</Form.Field>
<Button onClick={() => form.validate(['userName'], ['required'])}>
  只校验必填规则
</Button>
```

<code src="./demos/validate-rule.tsx" />

### watchValue

可以使用 `watchValue` 可以实现更灵活的表单行为配置

```jsx | pure
<Form.Field
  name="userName"
  rules={{
    equal: (value, values) => value !== values?.input1 ? '不能相等' : undefined,
  }}
  watchValue={{
    input1: (input1, fieldController) => fieldController?.validate(['equal'])
  }}
>
  {...}
</Form.Field>
```

<code src="./demos/watch-value.tsx" />

---

## 严格模式

当 `Form.strict` 为 `true` 时，表单处于严格模式，无法读写未进行 `Field 声明` 的属性

严格模式默认开启，可以通过 `<Form strict={false}>` 关闭

<code src="./demos/strict.tsx" />

## form 实例

调用 `Form.createForm()` 或 `Form.useForm()` 会得到 `form` 实例（`FormInstance`）

<!-- prettier-ignore -->
```jsx | pure
import { Form } from '@fexd/mobile'

const form = Form.createForm() // 任意位置
const form = Form.useForm() // React FC 内
<Form form={form}>...</Form>
```

以下是 `form` 实例的属性说明

<API namePrefix="form." identifier="FormInstance" hideTitle src="./type.tsx" exports='["DOC_FormInstance"]' hideDefaultColumn hideRequiredMark></API>

---

<!-- ## 演示代码

<code src="./demos/demo1/index.tsx" /> -->
