# 构建表单页面

完整的移动端表单页面模式，涵盖创建、校验、提交、反馈全流程。

## 基本结构

```tsx
import { Form, LineInput, LinePicker, LineDatePicker, Button, toast, loading } from '@fexd/mobile'

function MyFormPage() {
  const form = Form.useForm()

  const handleSubmit = async () => {
    try {
      await form.validate()
    } catch {
      toast.warn('请完善表单')
      return
    }

    loading.show()
    try {
      await api.submit(form.getValues())
      toast.success('提交成功')
    } catch {
      toast.fail('提交失败')
    } finally {
      loading.hide()
    }
  }

  return (
    <Form form={form}>
      <Form.Field name="name" rules={[(v) => (!v ? '请输入名称' : undefined)]}>
        {(field) => <LineInput label="名称" value={field.value} onChange={field.setValue} error={field.error} />}
      </Form.Field>

      <Form.Field name="type">
        {(field) => <LinePicker label="类型" value={field.value} onChange={field.setValue} options={typeOptions} />}
      </Form.Field>

      <Form.Field name="date">
        {(field) => <LineDatePicker label="日期" value={field.value} onChange={field.setValue} />}
      </Form.Field>

      <Button type="primary" block onClick={handleSubmit}>
        提交
      </Button>
    </Form>
  )
}
```

## IO 变体选择

同一表单内所有字段使用同一种 IO 变体：

| 项目风格        | 使用                                       |
| --------------- | ------------------------------------------ |
| 列表/设置页风格 | CellInput / CellPicker / CellDatePicker    |
| 底部线条风格    | LineInput / LinePicker / LineDatePicker    |
| 块级填充风格    | BlockInput / BlockPicker / BlockDatePicker |

**不要在同一个表单内混用不同 IO 变体。**

## 字段类型与对应组件

| 字段类型     | 组件                                         |
| ------------ | -------------------------------------------- |
| 文本         | LineInput / CellInput / BlockInput           |
| 多行文本     | TextArea（IO 变体内嵌）                      |
| 数值         | LineInput + `inputMode="decimal"` 或 Stepper |
| 密码         | LineInput + `type="password"`                |
| 单选（少量） | Radio                                        |
| 多选         | Checkbox                                     |
| 开关         | Switch                                       |
| 评分         | Rate                                         |
| 滑动输入     | Slider                                       |
| 步进器       | Stepper                                      |
| 单列选择     | LinePicker / CellPicker                      |
| 级联选择     | LineCascadePicker / CellCascadePicker        |
| 日期         | LineDatePicker / CellDatePicker              |
| 时间         | LineTimePicker / CellTimePicker              |

## 校验模式

### 必填校验

```tsx
<Form.Field name="name" rules={[(v) => !v ? '请输入名称' : undefined]}>
```

### 多规则校验

```tsx
<Form.Field name="phone" rules={[
  (v) => !v ? '请输入手机号' : undefined,
  (v) => !/^1\d{10}$/.test(v) ? '手机号格式不正确' : undefined,
]}>
```

### 命名规则（按需校验）

```tsx
<Form.Field name="email" rules={{
  required: (v) => !v ? '必填' : undefined,
  format: (v) => !/@/.test(v) ? '邮箱格式不正确' : undefined,
}}>
// 提交时只校验必填：form.validate(undefined, ['required'])
```

### 异步校验

```tsx
<Form.Field name="username" rules={[
  async (v) => {
    const exists = await api.checkUsername(v)
    return exists ? '用户名已存在' : undefined
  }
]}>
```

## 字段联动

### 城市联动（省 → 市 → 区）

```tsx
<Form.Field name="province">
  {(field) => <LineCascadePicker label="地区" value={field.value} onChange={field.setValue} options={regionOptions} />}
</Form.Field>
```

级联选择器天然支持联动，不需要 watchValue。

### 自定义联动

```tsx
<Form.Field name="type" watchValue={{
  category: (categoryValue, field) => {
    field.setValue('') // 类型随分类变化时重置
  }
}}>
```

## 提交按钮

```tsx
<Button type="primary" block loading="auto" onClick={handleSubmit}>
  提交
</Button>
```

`loading="auto"` 使按钮在 onClick 返回 Promise 期间自动显示加载态。

## 带确认弹窗的提交

```tsx
const handleSubmit = async () => {
  try {
    await form.validate()
  } catch {
    toast.warn('请完善表单')
    return
  }

  const controller = showDialog({
    title: '确认提交',
    content: '提交后不可修改，确认？',
    actions: [
      {
        content: '确认',
        onClick: () => {
          controller.close()
          doSubmit()
        },
      },
    ],
  })
}
```

## 常见错误

| 错误                           | 正确                                                     |
| ------------------------------ | -------------------------------------------------------- |
| `Form.useForm()[0]`            | `Form.useForm()` 直接返回实例                            |
| `Form.Item`                    | `Form.Field`                                             |
| IO 组件不连 field              | 必须传 `value={field.value}` `onChange={field.setValue}` |
| 同一表单混用 Line/Cell/Block   | 统一使用一种 IO 变体                                     |
| `loading.show()` 后不 `hide()` | 用 try/finally 保证成对                                  |
