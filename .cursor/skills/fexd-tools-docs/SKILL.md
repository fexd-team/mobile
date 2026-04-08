---
name: fexd-tools-docs
description: >-
  @fexd/tools 工具库使用指南。包含全部 72 个工具的 API 签名、分类速查和使用示例。 编写组件代码时查阅工具用法、选择合适的工具函数。 触发词：@fexd/tools、工具库、tools 用法、怎么用 classnames、run 怎么用。
---

# @fexd/tools 使用指南

`@fexd/tools@0.1.7` 是 `@fexd/mobile` 的底层工具库，提供 72 个通用工具函数。

```typescript
import { classnames, run, isArray } from '@fexd/tools'
```

## 高频工具速查

以下是本项目中**最常用**的工具，按使用频率排列：

### classnames — 条件 className 拼接

```typescript
import { classnames } from '@fexd/tools'

// 等价于 npm classnames 包
classnames('btn', { 'btn-active': isActive }, disabled && 'btn-disabled')
// → 'btn btn-active'
```

### run — 安全执行函数（替代 `fn?.()`)

```typescript
import { run } from '@fexd/tools'

// 安全调用可能不存在的回调
run(props, 'onClick', event) // ≈ props?.onClick?.(event)
run(props, 'onChange', value) // ≈ props?.onChange?.(value)
run(onConfirm) // ≈ onConfirm?.()

// 常见模式：组件内触发回调
const handleClick = () => {
  run(props, 'onClick', e)
  run(props, 'onClose')
}
```

### get — 安全取值（替代 `?.` 链）

```typescript
import { get } from '@fexd/tools'

type KType = string | any[] | number
function get<T = any>(obj: any, keys?: KType, defaultValue?: any): T

get(data, 'a.b.c') // ≈ data?.a?.b?.c
get(data, 'a.b.c', 'fallback') // 有默认值
get(data, ['a', 0, 'name']) // 支持数组路径
```

### 类型守卫 — is\* 系列

```typescript
import { isFunction, isArray, isString, isNumber, isObject, isExist, isUndefined } from '@fexd/tools'

// 所有 is* 均为 TypeScript 类型守卫（value is T）
if (isFunction(onClick)) onClick()
if (isArray(children)) children.map(...)
if (isString(label)) return <span>{label}</span>
if (isExist(value)) ...  // value !== undefined && value !== null
```

### clamp — 数值钳位

```typescript
import { clamp } from '@fexd/tools'

clamp(150, 0, 100) // → 100
clamp(-5, 0, 100) // → 0
clamp(50, 0, 100) // → 50
```

### debounce / throttle — 防抖节流

```typescript
import { debounce, throttle } from '@fexd/tools'

const debouncedFn = debounce(fn, 300)
const throttledFn = throttle(fn, 100)
```

### globalThis — 全局对象引用

```typescript
import { globalThis as root } from '@fexd/tools'

// 常见用法：获取 window 的安全引用
root.addEventListener('resize', handler)
```

### delay — 延时 Promise

```typescript
import { delay } from '@fexd/tools'

await delay(300) // 等待 300ms
```

### first / value — 取值工具

```typescript
import { first } from '@fexd/tools'
import { value } from '@fexd/tools'

first([1, 2, 3]) // → 1
first({ a: 1, b: 2 }) // → 1（第一个属性值）

value(undefined, null, 'fallback') // → 'fallback'（≈ ?? 运算符链）
```

## 完整分类索引

| 分类 | 工具 | 数量 |
| --- | --- | --- |
| 🎭 类型守卫 | `isArray` `isBoolean` `isDate` `isError` `isExist` `isFunction` `isNaN` `isNull` `isNumber` `isObject` `isPromiseLike` `isString` `isUndefined` | 13 |
| 📱 环境检测 | `isAndroid` `isIOS` `isMobile` `isDesktop` `isWKWebview` | 5 |
| 🔢 数值 | `clamp` `random` `isBigNumber` `isNumberString` `segment` | 5 |
| 📝 字符串 | `capitalize` `getFormatter` | 2 |
| 📦 对象 | `get` `set` `run` `pick` `pickBy` `deepMerge` `createProxyGetter` | 7 |
| 📚 数组 | `first` `last` `flatten` `groupBy` `uniqByKey` `intersection` `difference` `diffArray` `sample` | 9 |
| 🔗 函数式 | `pipe` `curry` `__` `value` | 4 |
| ⏱️ 异步 | `debounce` `throttle` `delay` `nextTick` `memoize` `lock` `SAS` `catchPromise` `enhancePromise` `promiseGuess` | 10 |
| 🎬 动画 | `easing` `Tween` `FrameProcess` | 3 |
| 📡 事件 | `EventBus` `ScrollListener` | 2 |
| 🌐 URL | `qs` `url` | 2 |
| 💾 存储 | `storage` | 1 |
| 🔧 浏览器 | `copy` `source` `preloadImage` `globalThis` | 4 |
| 📋 表单 | `formdata2obj` `obj2formdata` | 2 |
| 🌍 i18n | `I18n` | 1 |
| 🎯 其他 | `CombJudge` | 1 |
| 🏷️ 样式 | `classnames` | 1 |

## 使用规范

### import 方式

```typescript
// ✅ 推荐：命名导入
import { classnames, run, isArray } from '@fexd/tools'

// ✅ 别名用法（globalThis 与原生冲突时）
import { globalThis as root } from '@fexd/tools'

// ✅ 按需加载（配合 babel-plugin-import）
// babel.config.js 中已配置 camel2DashComponentName: false
```

### 选择工具的原则

| 场景           | 推荐工具                       | 不推荐                              |
| -------------- | ------------------------------ | ----------------------------------- |
| 安全调用回调   | `run(props, 'onClick', e)`     | `props.onClick && props.onClick(e)` |
| 安全取深层属性 | `get(obj, 'a.b.c')`            | 手写 `obj?.a?.b?.c` 也可以          |
| 条件 className | `classnames('a', { b: cond })` | 字符串模板拼接                      |
| 判断类型       | `isArray(v)`                   | `Array.isArray(v)` 也可以           |
| 数值限制范围   | `clamp(v, min, max)`           | `Math.min(Math.max(...))`           |
| 防抖/节流      | `debounce(fn, ms)`             | 手写或 lodash                       |

## 深入 API 参考

完整的 72 个工具签名和详细说明见 [api-catalog.md](references/api-catalog.md)。

## 扫描工具

检查当前安装版本和导出列表：

```bash
node .cursor/skills/fexd-tools-docs/scripts/scan-tools.cjs
```

## ⚠️ 已知注意事项

| 工具         | 注意                                                            |
| ------------ | --------------------------------------------------------------- |
| `classnames` | 实为 npm `classnames` 包的 re-export，README 标注"自实现"不准确 |
| `CombJudge`  | `.d.ts` 中类名拼写为 `CombJubge`（typo），导入名正确            |
| `storage`    | 类型定义中方法均为 `Function`，签名不精确                       |
| `memoize`    | `disable` 参数类型标注 `() => false` 疑似 typo                  |
| `globalThis` | 使用时建议 `import { globalThis as root }` 避免与原生冲突       |
