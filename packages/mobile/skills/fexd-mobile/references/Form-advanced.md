---
name: Form-advanced
description: Form 控制器实例的完整 API，包括 getValue/setValue/validate/watch 等方法
---

# Form 高级说明（form 实例 API）

本文档补充 `Form` 控制器实例的类型定义，对应 `packages/mobile/src/exports/createForm/type.tsx` 中的 `Form` 接口。基础用法、`Form.Field` 与静态方法见 **[Form.md](./Form.md)**。

## `form` 实例一览

通过 `Form.createForm()`、`Form.useForm()` 或 `FieldController.form` 拿到的对象均满足该接口（实现见 `createForm` 模块）。

| 方法 | 说明 |
| :-- | :-- |
| `getValue(name)` | 获取字段值 |
| `getValues()` | 获取全部字段值对象 |
| `setValue(name, value)` | 设置单字段值 |
| `setValues(values)` | 批量设置值 |
| `watchValues(listener, options?)` | 监听值集合变化，返回取消函数 |
| `watchValue(name, listener, options?)` | 监听单字段值 |
| `getError(name)` | 获取字段错误 |
| `getErrors()` | 获取全部错误对象 |
| `setError(name, error)` | 设置单字段错误 |
| `setErrors(errors)` | 批量设置错误 |
| `watchErrors(listener, options?)` | 监听错误集合 |
| `watchError(name, listener, options?)` | 监听单字段错误 |
| `getFields()` | 获取字段配置列表 |
| `getField(fieldName)` | 获取单个字段配置 |
| `setFields(nextFields)` | 批量设置字段配置 |
| `setField(fieldName, field)` | 设置单个字段配置 |
| `removeField(fieldName)` | 移除字段配置 |
| `addField(field)` | 添加字段配置，返回移除函数 |
| `hasField(fieldName)` | 是否已注册字段 |
| `getRelative(name)` | 获取字段关联数据 |
| `getRelatives()` | 获取全部关联数据 |
| `setRelatives(configs)` | 批量设置关联计算函数 |
| `removeRelative(name)` | 移除关联 |
| `addRelative(name, compute)` | 添加关联，返回移除函数 |
| `watchRelatives(listener, options?)` | 监听关联集合 |
| `watchRelative(name, listener, options?)` | 监听单字段关联 |
| `watch(listener)` | 监听表单任意变化（值 / 错误 / 关联） |
| `validate(fieldNames?, ruleNames?)` | 触发校验；`fieldNames` 可为字符串或字符串数组；`ruleNames` 用于对象型 `rules` 时指定规则键 |
| `reset()` | 重置表单 |
| `setStrict(strict)` | 运行时切换严格模式 |

### 监听选项

`FormWatchOptions`（同文件）：`debounce?: number \| boolean \| false`。

### 内部标记

| 属性               | 说明                          |
| :----------------- | :---------------------------- |
| `__isFormInstance` | 恒为 `true`，用于识别表单实例 |

## 类型别名（摘录）

| 名称                             | 含义                               |
| :------------------------------- | :--------------------------------- |
| `FormValue` / `FormValues`       | 字段值 / 值对象                    |
| `FormError` / `FormErrors`       | 错误 / 错误对象                    |
| `FormRelative` / `FormRelatives` | 关联数据                           |
| `FormComputeRelative`            | `(values, errors) => FormRelative` |
| `FormStopWatch`                  | 取消监听函数                       |
| `FormRemoveRelative`             | 移除关联函数                       |

## 与 `FormOptions` 的关系

创建表单时可选配置（`FormOptions`）包含：`strict`、`fields`、`defaultValues`、`relatives` 等；运行时仍可通过上表方法与 `Form.Field` 协同修改。

## 演示源码索引

| 文件                           | 内容                     |
| :----------------------------- | :----------------------- |
| `Form/demos/basic.tsx`         | 多控件与 `form.validate` |
| `Form/demos/relative.tsx`      | 关联值                   |
| `Form/demos/strict.tsx`        | 严格模式                 |
| `Form/demos/validate-rule.tsx` | 具名规则与部分校验       |
| `Form/demos/watch-value.tsx`   | `watchValue` 联动        |
