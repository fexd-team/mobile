---
name: Form
description: 轻量表单上下文：Form 提供表单实例与严格模式等行为；Form.Field 为无样式字段作用域，通过 render prop 暴露 field 控制器，可与任意输入组件组合。
---

# Form 表单

轻量表单上下文：`Form` 提供表单实例与严格模式等行为；`Form.Field` 为无样式字段作用域，通过 render prop 暴露 `field` 控制器，可与任意输入组件组合。

```tsx
import { Form, LineInput, Button } from '@fexd/mobile'

const form = Form.useForm()

return (
  <Form form={form}>
    <Form.Field name="name" rules={[(v) => (!v ? '必填' : undefined)]}>
      {(field) => (
        <LineInput
          label="名称"
          value={field.value}
          onChange={(val) => {
            field.setValue(val)
            field.validate()
          }}
          onBlur={() => field.validate()}
          error={field.error}
        />
      )}
    </Form.Field>
  </Form>
)
```

## 基础用法

在组件内使用 `Form.useForm()`，字段用 `Form.Field` 包裹并通过 `field.setValue` / `field.validate` 与控件对接（完整多控件示例见 `packages/mobile/src/exports/Form/demos/basic.tsx`）。

非 React 环境可使用 `Form.createForm()` 创建实例，再传入 `<Form form={...}>`：

```tsx
import { Form } from '@fexd/mobile'

const form = Form.createForm()

return <Form form={form}>...</Form>
```

关联值与 `relative` 用法见 `packages/mobile/src/exports/Form/demos/relative.tsx`。

## Props

### Form

类型定义：`packages/mobile/src/exports/Form/type.tsx` → `FormProps`。

| 属性             | 说明                                      | 类型                               | 默认值 |
| :--------------- | :---------------------------------------- | :--------------------------------- | :----- |
| strict           | 为 `true` 时仅处理已注册 `Field` 的字段   | `boolean`                          | `true` |
| form             | 表单控制器实例                            | `Form`（见 `createForm/type.tsx`） | —      |
| children         | 表单区域；`Form.Field` 必须置于 `Form` 内 | `React.ReactNode`                  | —      |
| validateOnChange | 值变化时是否自动校验                      | `boolean`                          | `true` |

### Form.Field

类型定义：`packages/mobile/src/exports/Form/Field/type.tsx` → `FormFieldProps`。

| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| name | 字段名 | `string` | — |
| defaultValue | 默认值 | `any` | — |
| rules | 校验规则：函数数组，或 `{ [ruleName: string]: FormRule }` | `FormRule[] \| Record<string, FormRule>` | — |
| relative | 根据全表单值计算当前字段的关联数据 | `FormComputeRelative` | — |
| children | 渲染函数，参数为 `FieldController` | `(field: FieldController) => JSX.Element` | — |
| validateOnChange | 是否在该字段值变化时自动校验 | `boolean` | `true` |
| watchValue | 监听其他字段变化时的回调映射 | `Record<string, (watchedValue: any, field: FieldController) => void>` | — |

`FormRule` 类型：`(value: any, values: any, field: FormField) => Promise<any> | any`（定义于 `packages/mobile/src/exports/createForm/type.tsx`）。

### field 控制器（`FieldController`）

| 属性 / 方法 | 说明                                        | 类型                                         |
| :---------- | :------------------------------------------ | :------------------------------------------- |
| value       | 当前字段值                                  | `FormValue`                                  |
| setValue    | 设置当前字段值                              | `(value: FormValue) => void`                 |
| error       | 当前字段错误                                | `FormError`                                  |
| validate    | 校验当前字段；可传 `ruleNames` 指定具名规则 | `(ruleNames?: (number \| string)[]) => void` |
| relative    | 当前字段关联数据                            | `FormRelative`                               |
| form        | 表单实例                                    | `Form`                                       |

渲染示例：

```tsx
<Form.Field name="userName">
  {(field) => (
    <input value={field.value} onChange={(e) => field.setValue(e.target.value)} onBlur={() => field.validate()} />
  )}
</Form.Field>
```

## Form 静态成员

`FormType` 上的静态能力（`packages/mobile/src/exports/Form/type.tsx` → `FormStaticMethods`）：

| 成员                  | 说明                           |
| :-------------------- | :----------------------------- |
| `Form.Field`          | 字段组件                       |
| `Form.useForm`        | 在函数组件内创建表单实例       |
| `Form.useContextForm` | 读取上下文中的表单实例         |
| `Form.createForm`     | 在非组件环境创建实例           |
| `Form.useRelative`    | 创建关联值（与表单工具链一致） |
| `Form.useValue`       | 读取当前上下文字段值           |
| `Form.useError`       | 读取当前上下文字段错误         |
| `Form.useWatchValue`  | 创建值监听                     |

## 高级用法

- **严格模式**：`strict` 默认为 `true`；关闭方式 `<Form strict={false}>`。示例：`packages/mobile/src/exports/Form/demos/strict.tsx`。
- **按规则名校验**：`rules` 为对象时，可 `form.validate(['userName'], ['required'])`。示例：`packages/mobile/src/exports/Form/demos/validate-rule.tsx`。
- **`watchValue`**：在其他字段变化时触发自定义逻辑（如联动校验）。示例：`packages/mobile/src/exports/Form/demos/watch-value.tsx`。
- **`form` 实例全部 API**（`getValues`、`validate`、`watch` 等）：见同目录 **[Form-advanced.md](./Form-advanced.md)**。

## 相关组件

- `Input` / `LineInput` / `LinePicker` 等：与 `Form.Field` 组合的输入控件

## 不要在以下情况使用 Form

- 不需要校验和字段管理 → 直接用受控组件 + useState
- 需要 Ant Design 风格的 Form.Item → Form.Item 不存在，@fexd/mobile 只有 Form.Field + render prop
- 想用 `Form.useForm()[0]` → `Form.useForm()` 直接返回实例，不是数组，不需要解构

<!--
Source:
- packages/mobile/src/exports/Form/type.tsx
- packages/mobile/src/exports/Form/index.zh.md
- packages/mobile/src/exports/Form/index.tsx
- packages/mobile/src/exports/Form/demos/
- packages/mobile/src/exports/Form/style.less
-->
