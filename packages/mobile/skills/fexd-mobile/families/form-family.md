# Form 家族

@fexd/mobile 的表单体系采用容器 + 字段控制器模式，与 Ant Design 的 Form.Item 模式不同。

## 家族成员

| 成员                    | 类型     | 用途                                           |
| ----------------------- | -------- | ---------------------------------------------- |
| **Form**                | 组件     | 表单容器，提供上下文和 strict 模式             |
| **Form.Field**          | 组件     | 字段作用域，通过 render prop 暴露 field 控制器 |
| **Form.useForm**        | 静态方法 | 函数组件内创建表单实例                         |
| **Form.createForm**     | 静态方法 | 非组件环境创建表单实例                         |
| **Form.useContextForm** | 静态方法 | 读取上下文中的表单实例                         |
| **Form.useRelative**    | 静态方法 | 创建关联值                                     |
| **Form.useValue**       | 静态方法 | 读取当前上下文字段值                           |
| **Form.useError**       | 静态方法 | 读取当前上下文字段错误                         |
| **Form.useWatchValue**  | 静态方法 | 创建值监听                                     |
| **createForm**          | 工厂函数 | 创建表单实例（与 Form.createForm 相同）        |

## 核心模式

### 表单结构

```tsx
import { Form, LineInput, LinePicker, Button } from '@fexd/mobile'

const form = Form.useForm()

<Form form={form}>
  <Form.Field name="username" rules={[(v) => !v ? '必填' : undefined]}>
    {(field) => (
      <LineInput
        label="用户名"
        value={field.value}
        onChange={field.setValue}
        onBlur={() => field.validate()}
        error={field.error}
      />
    )}
  </Form.Field>
</Form>
```

### Field 控制器

`Form.Field` 的 children 是一个 render prop，参数为 `FieldController`：

| 属性/方法             | 说明         |
| --------------------- | ------------ |
| `field.value`         | 当前字段值   |
| `field.setValue(val)` | 设置值       |
| `field.error`         | 当前错误信息 |
| `field.validate()`    | 校验当前字段 |
| `field.relative`      | 关联数据     |
| `field.form`          | 表单实例     |

## 与 Ant Design Form 的关键差异

| @fexd/mobile                 | Ant Design                | 说明                           |
| ---------------------------- | ------------------------- | ------------------------------ |
| `Form.Field` + render prop   | `Form.Item` + children    | fexd 用 render prop 暴露控制器 |
| `Form.useForm()` 返回实例    | `Form.useForm()` 返回数组 | fexd 返回值直接就是 form 实例  |
| `field.setValue()`           | `form.setFieldValue()`    | fexd 通过 field 控制器设置     |
| `field.validate()`           | `form.validateFields()`   | fexd 支持字段级校验            |
| `rules` 为函数数组或命名对象 | `rules` 为规则对象数组    | fexd 校验规则是函数            |

**禁止**使用 `Form.Item`（不存在）。

## 表单提交模式

```tsx
const handleSubmit = async () => {
  try {
    await form.validate()
    const values = form.getValues()
    loading.show()
    await api.submit(values)
    toast.success('提交成功')
  } catch (errors) {
    // 校验失败，errors 包含各字段错误
  } finally {
    loading.hide()
  }
}
```

## 字段联动

### watchValue（监听其他字段）

```tsx
<Form.Field name="city" watchValue={{
  province: (provinceValue, field) => {
    field.setValue('') // 省份变化时清空城市
  }
}}>
```

### relative（关联数据）

```tsx
<Form.Field
  name="discount"
  relative={{
    price: (formValues) => formValues.price * 0.9,
  }}
>
  {(field) => <LineInput label="折后价" value={field.relative.price} disabled />}
</Form.Field>
```

## 常见错误

| 错误                                    | 正确                                                     |
| --------------------------------------- | -------------------------------------------------------- |
| `Form.useForm()[0]`                     | `Form.useForm()` 返回值直接是实例，不是数组              |
| `Form.Item`                             | `Form.Field`（没有 Form.Item）                           |
| `form.getFieldsValue()`                 | `form.getValues()`                                       |
| 在 Field children 里不使用 field 控制器 | 必须通过 `field.value` / `field.setValue` 连接           |
| IO 变体不传 `value`/`onChange`          | 必须传 `value={field.value}` `onChange={field.setValue}` |
