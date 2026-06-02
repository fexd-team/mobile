# Form 系统

@fexd/mobile 的表单系统采用容器 + 字段控制器模式，与 Ant Design 的 Form.Item 模式有本质区别。

**遇到表单相关需求时，先读本文件，再读具体 reference。**

## 系统架构

```
createForm / Form.useForm()  →  创建表单实例
       ↓
<Form form={form}>           →  表单容器（提供上下文、strict 模式）
       ↓
<Form.Field name="...">      →  字段作用域（render prop 暴露 field 控制器）
  {(field) => <LineInput     →  IO 输入组件（通过 field.value / field.setValue 连接）
    value={field.value}
    onChange={field.setValue}
  />}
```

## 表单实例

### 创建方式

| 方式       | API                                  | 适用场景          |
| ---------- | ------------------------------------ | ----------------- |
| 函数组件内 | `Form.useForm()`                     | 最常用            |
| 非组件环境 | `Form.createForm()` / `createForm()` | 工具函数/类外使用 |

**关键**：`Form.useForm()` 返回值直接就是表单实例，不是数组，不需要解构。

### 实例 API

| 方法                         | 说明                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| `form.getValues()`           | 获取全部字段值                                               |
| `form.validate()`            | 校验全部字段，返回 Promise（校验失败 reject）                |
| `form.setValues(values)`     | 批量设置字段值                                               |
| `form.reset()`               | 重置全部字段                                                 |
| `form.watch(name, callback)` | 监听字段变化                                                 |
| 更多 API                     | → [references/Form-advanced.md](references/Form-advanced.md) |

## Form 容器

| Prop             | 类型      | 默认 | 说明                      |
| ---------------- | --------- | ---- | ------------------------- |
| form             | Form 实例 | —    | 表单控制器                |
| strict           | boolean   | true | 仅处理已注册 Field 的字段 |
| validateOnChange | boolean   | true | 值变化时自动校验          |
| children         | ReactNode | —    | 表单区域                  |

## Form.Field 字段

### Props

| Prop             | 类型                                    | 说明                       |
| ---------------- | --------------------------------------- | -------------------------- |
| name             | string                                  | 字段名                     |
| defaultValue     | any                                     | 默认值                     |
| rules            | 函数数组 或 命名规则对象                | 校验规则                   |
| relative         | FormComputeRelative                     | 关联数据计算               |
| watchValue       | Record<string, callback>                | 监听其他字段变化           |
| children         | (field: FieldController) => JSX.Element | 渲染函数                   |
| validateOnChange | boolean                                 | 该字段值变化时是否自动校验 |

### Field 控制器

| 属性/方法 | 类型                 | 说明                   |
| --------- | -------------------- | ---------------------- |
| value     | any                  | 当前字段值             |
| setValue  | (val) => void        | 设置值                 |
| error     | FormError            | 当前错误信息           |
| validate  | (ruleNames?) => void | 校验（可指定命名规则） |
| relative  | FormRelative         | 关联数据               |
| form      | Form                 | 表单实例引用           |

## 校验规则

### 函数数组

```tsx
<Form.Field
  name="username"
  rules={[
    (v) => !v ? '请输入用户名' : undefined,
    (v) => v.length < 3 ? '至少 3 个字符' : undefined,
  ]}
>
```

### 命名规则对象

```tsx
<Form.Field
  name="username"
  rules={{
    required: (v) => !v ? '必填' : undefined,
    minLength: (v) => v.length < 3 ? '至少 3 个字符' : undefined,
  }}
>
// 按名称校验：field.validate(['required'])
```

## 字段联动

### watchValue

监听其他字段变化，触发回调：

```tsx
<Form.Field name="city" watchValue={{
  province: (provinceValue, field) => {
    field.setValue('') // 省份变化时清空城市
  }
}}>
```

### relative

根据全表单值计算关联数据：

```tsx
<Form.Field
  name="discountPrice"
  relative={{
    computed: (values) => values.price * values.discount,
  }}
>
  {(field) => <LineInput label="折后价" value={field.relative.computed} disabled />}
</Form.Field>
```

## 完整表单页面模式

```tsx
import { Form, LineInput, LinePicker, LineDatePicker, Button, toast, loading } from '@fexd/mobile'

function ProductForm() {
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
      <Form.Field name="name" rules={[(v) => (!v ? '必填' : undefined)]}>
        {(field) => <LineInput label="商品名称" value={field.value} onChange={field.setValue} error={field.error} />}
      </Form.Field>

      <Form.Field name="category">
        {(field) => <LinePicker label="分类" value={field.value} onChange={field.setValue} options={categories} />}
      </Form.Field>

      <Form.Field name="date">
        {(field) => <LineDatePicker label="上架日期" value={field.value} onChange={field.setValue} />}
      </Form.Field>

      <Button type="primary" block onClick={handleSubmit}>
        提交
      </Button>
    </Form>
  )
}
```

## 与 Ant Design Form 对比

| @fexd/mobile               | Ant Design              | 说明                   |
| -------------------------- | ----------------------- | ---------------------- |
| `Form.Field` + render prop | `Form.Item` + children  | 完全不同的模式         |
| `Form.useForm()` → 实例    | `Form.useForm()` → 数组 | fexd 直接返回实例      |
| `field.setValue()`         | `form.setFieldValue()`  | fexd 通过 field 控制器 |
| `field.validate()`         | `form.validateFields()` | fexd 字段级校验        |
| `rules` 为函数             | `rules` 为规则对象      | fexd 更灵活            |
| `Form.Item` 不存在         | `Form.Item`             | 禁止使用 Form.Item     |

## 相关 reference

- [references/Form.md](references/Form.md) — Form 基础 Props 和用法
- [references/Form-advanced.md](references/Form-advanced.md) — Form 高级用法和完整 API
- [references/createForm.md](references/createForm.md) — createForm 工厂函数
