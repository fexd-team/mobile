---
name: createForm
description: 创建响应式表单实例：管理字段值、校验错误、字段配置与关联计算（relatives）。
---

# createForm

创建响应式表单实例：管理字段值、校验错误、字段配置与关联计算（relatives）。

```tsx
import { createForm } from '@fexd/mobile'
```

## 基础用法

```tsx
import { createForm } from '@fexd/mobile'

const form = createForm({
  fields: [{ name: 'username', defaultValue: '' }],
})

form.setValue('username', 'alice')
await form.validate()
```

## 函数签名

```ts
function createForm(formOptions?: FormOptions): Form
```

| 参数          | 类型          | 说明                         |
| ------------- | ------------- | ---------------------------- |
| `formOptions` | `FormOptions` | 可选；见下方 **FormOptions** |

**返回值**：`Form` 实例（含 `__isFormInstance: true`）。

## FormOptions

| 属性            | 类型                                                | 说明                                   |
| --------------- | --------------------------------------------------- | -------------------------------------- |
| `strict`        | `boolean`                                           | 可选；严格模式下仅允许已声明字段的读写 |
| `fields`        | `FormField[]`                                       | 可选；字段配置列表                     |
| `defaultValues` | `Record<string, any>`                               | 可选；表单字段默认值                   |
| `relatives`     | `Record<string, (values: any, errors: any) => any>` | 可选；关联计算配置                     |

### FormField

| 属性           | 类型         | 说明                                                  |
| -------------- | ------------ | ----------------------------------------------------- |
| `name`         | `string`     | 字段名                                                |
| `defaultValue` | `any`        | 可选                                                  |
| `rules`        | `FormRule[]` | 可选；`(value, values, field) => Promise<any> \| any` |

### FormRule

```ts
type FormRule = (value: any, values: any, field: FormField) => Promise<any> | any
```

### FormWatchOptions

| 属性       | 类型                         | 说明 |
| ---------- | ---------------------------- | ---- |
| `debounce` | `number \| boolean \| false` | 可选 |

## Form 实例 API

类型别名：`FormStopWatch`、`FormRemoveRelative`、`FormValue`、`FormValues`、`FormError`、`FormErrors`、`FormRelative`、`FormRelatives`、`FormComputeRelative` 见 `type.tsx`。

| 方法                                      | 说明                                              |
| ----------------------------------------- | ------------------------------------------------- |
| `getValue(name)`                          | 获取字段值                                        |
| `getValues()`                             | 获取全部值（对象）                                |
| `setValue(name, value)`                   | 设置单字段                                        |
| `setValues(values)`                       | 批量设置值                                        |
| `watchValues(listener, options?)`         | 监听任意字段值变化；返回取消函数                  |
| `watchValue(name, listener, options?)`    | 监听单字段值                                      |
| `getError(name)`                          | 获取字段错误                                      |
| `getErrors()`                             | 获取全部错误                                      |
| `setError(name, error)`                   | 设置字段错误                                      |
| `setErrors(errors)`                       | 批量设置错误                                      |
| `watchErrors(listener, options?)`         | 监听错误集合                                      |
| `watchError(name, listener, options?)`    | 监听单字段错误                                    |
| `getFields()`                             | 获取字段配置数组                                  |
| `getField(fieldName)`                     | 获取单个字段配置                                  |
| `setFields(nextFields)`                   | 批量替换字段配置                                  |
| `setField(fieldName, field)`              | 合并/设置单个字段（`field` 可为部分 `FormField`） |
| `removeField(fieldName)`                  | 移除字段                                          |
| `addField(field)`                         | 添加字段；返回移除函数                            |
| `hasField(fieldName)`                     | 是否存在该字段                                    |
| `getRelative(name)`                       | 获取关联结果                                      |
| `getRelatives()`                          | 获取全部关联结果                                  |
| `setRelatives(configs)`                   | 批量设置关联计算                                  |
| `removeRelative(name)`                    | 移除关联                                          |
| `addRelative(name, compute)`              | 添加关联；返回移除函数                            |
| `watchRelatives(listener, options?)`      | 监听关联集合                                      |
| `watchRelative(name, listener, options?)` | 监听单项关联                                      |
| `watch(listener)`                         | 值、错误、关联任一变化时触发                      |
| `validate(filedNames?, ruleNames?)`       | 校验；`Promise<boolean>`                          |
| `reset()`                                 | 重置为默认值与初始错误                            |
| `setStrict(strict)`                       | 切换严格模式                                      |

<!--
Source:
- packages/mobile/src/exports/createForm/type.tsx
- packages/mobile/src/exports/createForm/index.ts
- packages/mobile/src/exports/createForm/style.less
-->
