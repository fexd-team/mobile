---
name: fexd-tools-api-catalog
description: '@fexd/tools 全部 72 个导出的 API 签名、使用示例与注意事项'
---

# @fexd/tools 完整 API 参考

> `@fexd/tools@0.1.7` — 72 个导出

---

## 🏷️ 样式

### classnames

> className 条件拼接（re-export npm `classnames` 包）

```typescript
function classnames(...args: any[]): string
```

```typescript
import { classnames } from '@fexd/tools'

classnames('btn', 'primary') // → 'btn primary'
classnames('btn', { active: true, disabled: false }) // → 'btn active'
classnames('btn', isActive && 'btn-active') // 条件字符串
classnames(['btn', 'large']) // 数组形式
```

---

## 🎭 类型守卫

所有 `is*` 类型守卫均支持 TypeScript 类型收窄。

### isArray

```typescript
function isArray(value: any): value is any[]
```

```typescript
if (isArray(children)) {
  return children.map(renderItem)
}
```

### isBoolean

```typescript
function isBoolean(value: any): value is boolean
```

### isDate

```typescript
function isDate(value: any): value is Date
```

### isError

```typescript
function isError(value: any): boolean
```

### isExist

> 非 undefined 且非 null

```typescript
function isExist(value: any): boolean
```

```typescript
if (isExist(props.value)) {
  // value 不为 undefined 或 null
}
```

### isFunction

```typescript
function isFunction(value: any): value is Function
```

```typescript
if (isFunction(onClick)) {
  onClick(event)
}
```

### isNaN

```typescript
function isNaN(value: any): value is number
```

### isNull

```typescript
function isNull(value: any): value is null
```

### isNumber

```typescript
function isNumber(value: any): value is number
```

```typescript
if (isNumber(size)) {
  return `${size}px`
}
```

### isObject

> 纯对象判断（Array 不算）

```typescript
function isObject(value: any): boolean
```

### isPromiseLike

```typescript
function isPromiseLike(value: any): value is Promise<any>
```

### isString

```typescript
function isString(value: any): value is string
```

```typescript
if (isString(icon)) {
  return <Iconfont type={icon} />
}
```

### isUndefined

```typescript
function isUndefined(value: any): value is undefined
```

---

## 📱 环境检测

所有环境检测函数基于 UA 字符串判断，返回 `boolean`，无参数。

### isAndroid

```typescript
function isAndroid(): boolean
```

### isIOS

```typescript
function isIOS(): boolean
```

### isMobile

```typescript
function isMobile(): boolean
```

### isDesktop

```typescript
function isDesktop(): boolean
```

### isWKWebview

> iOS WKWebView 环境检测

```typescript
function isWKWebview(): boolean
```

---

## 📦 对象操作

### get

> 安全深层取值，同 `?.` 链

```typescript
type KType = string | any[] | number
function get<T = any>(obj: any, keys?: KType, defaultValue?: any): T
```

```typescript
import { get } from '@fexd/tools'

get(user, 'address.city') // → 'Beijing'
get(user, 'address.zip', '000000') // 带默认值
get(data, ['list', 0, 'name']) // 数组路径
get(config, 'theme.colors.primary') // 深层嵌套
```

### set

> 按路径设置对象属性

```typescript
function set(obj: Record<string, any>, keys: KType, value: any): Record<string, any>
```

```typescript
import { set } from '@fexd/tools'

set(config, 'theme.primary', '#1890ff')
set(formData, ['fields', 0, 'value'], 'hello')
```

### run

> 安全执行函数/方法，本项目最常用的工具之一

```typescript
function run<T = any>(obj: any, keys?: KType, ...args: any[]): T
```

```typescript
import { run } from '@fexd/tools'

// 1. 安全调用 props 回调（最常见用法）
run(props, 'onClick', event) // ≈ props?.onClick?.(event)
run(props, 'onChange', newValue) // ≈ props?.onChange?.(newValue)
run(props, 'onClose') // ≈ props?.onClose?.()

// 2. 直接安全调用函数
run(callback) // ≈ callback?.()
run(onConfirm, undefined, data) // ≈ onConfirm?.(data)

// 3. 深层方法调用
run(store, 'actions.save', payload)
```

### pick

> 从对象中选取指定 key

```typescript
function pick(obj: Record<string, any>, keys?: any[]): Record<string, any>
```

```typescript
pick(props, ['className', 'style', 'id'])
```

### pickBy

> 按条件选取对象属性

```typescript
function pickBy(obj: Record<string, any>, predicate?: (...args: any[]) => boolean): Record<string, any>
```

```typescript
pickBy(props, (val) => val !== undefined)
```

### deepMerge

> 深合并多个对象

```typescript
function deepMerge(...sources: any[]): any
```

```typescript
deepMerge(defaultConfig, userConfig, overrides)
```

### createProxyGetter

> 创建代理取值器

```typescript
function createProxyGetter(target: any, valueHandler: (value: any, prop: any) => any): any
```

---

## 📚 数组操作

### first

> 取第一个元素（兼容对象）

```typescript
function first<T = any>(value: any[] | Object): T
```

```typescript
import { first } from '@fexd/tools'

first([1, 2, 3]) // → 1
first({ a: 10, b: 20 }) // → 10
```

### last

> 取最后一个元素（兼容对象）

```typescript
function last<T = any>(value: any[] | Object): T
```

### flatten

> 数组拍平

```typescript
function flatten<T = any>(array: any[], deep?: number): T[]
```

```typescript
flatten([1, [2, [3, 4]]]) // → [1, 2, [3, 4]]（默认 1 层）
flatten([1, [2, [3, 4]]], 2) // → [1, 2, 3, 4]
```

### groupBy

> 按条件归类

```typescript
function groupBy(namer: Function, list: any[]): Object
```

```typescript
groupBy((item) => item.type, list)
// → { typeA: [...], typeB: [...] }
```

### uniqByKey

> 按 key 去重

```typescript
function uniqByKey<T = any>(array: any[], key: any): T[]
```

```typescript
uniqByKey([{ id: 1 }, { id: 2 }, { id: 1 }], 'id')
// → [{ id: 1 }, { id: 2 }]
```

### intersection

> 数组交集

```typescript
function intersection(...args: any[]): any[]
```

### difference

> 数组差集

```typescript
function difference(arr1: any[], arr2: any[]): any[]
```

### diffArray

> 数组差异分析

```typescript
function diffArray<T = any>(init: T[], current: T[]): { add: T[]; remove: T[]; diff: T[] }
```

```typescript
diffArray([1, 2, 3], [2, 3, 4])
// → { add: [4], remove: [1], diff: [2, 3] }
```

### sample

> 随机取样

```typescript
function sample<T = any>(array: any[]): T
```

```typescript
sample(['red', 'blue', 'green']) // → 'blue'（随机）
```

---

## 🔗 函数式编程

### pipe

> 管道组合，同 `|>` 运算符

```typescript
function pipe<T>(...handlers: Function[]): (arg: any) => T
```

```typescript
const process = pipe(trim, toLowerCase, slugify)
process('  Hello World ') // → 'hello-world'
```

### curry

> 柯里化

```typescript
function curry<T>(fn: Function): (...args: any[]) => T
```

### \_\_

> 自由柯里化（支持绑定 context）

```typescript
type AnyFunction = (...args: any[]) => any
function __<T extends AnyFunction>(func: T, context?: any): (...preArgs: any[]) => (...args: any[]) => ReturnType<T>
```

### value

> 返回第一个已定义的值，同 `??` 链

```typescript
function value<T = any>(...values: any[]): T
```

```typescript
import { value } from '@fexd/tools'

value(props.size, defaultSize, 'md')
// → 返回第一个非 undefined/null 的值
```

---

## 🔢 数值处理

### clamp

> 数值钳位

```typescript
function clamp(value: number, min: number, max?: number): number
```

```typescript
import { clamp } from '@fexd/tools'

clamp(150, 0, 100) // → 100
clamp(-5, 0) // → 0
clamp(50, 0, 100) // → 50
```

### random

> 随机数

```typescript
function random(min: number, max: number, int?: boolean): number
```

```typescript
random(0, 100) // → 73.42（浮点）
random(0, 100, true) // → 73（整数）
```

### segment

> 将长度按数量等分，限定在 [min, max] 范围

```typescript
function segment(length: number, count: number, [min, max]: number[]): number[]
```

### isBigNumber

> 大数字符串检测

```typescript
function isBigNumber(value: any): boolean

// 额外命名导出
export function trimZeros(value: string): string
```

### isNumberString

> 判断字符串是否为数字

```typescript
function isNumberString(value: any): boolean
```

---

## 📝 字符串

### capitalize

> 首字母大写

```typescript
function capitalize(word: string): string
```

```typescript
capitalize('hello') // → 'Hello'
```

### getFormatter

> 格式化工具工厂

```typescript
function getFormatter(config?: {
  separator?: string
  length?: number
  reverse?: boolean
  isNumber?: boolean
}): (text: any) => string
```

```typescript
const phoneFormatter = getFormatter({ separator: '-', length: 4 })
phoneFormatter('13812345678') // → '138-1234-5678'
```

---

## ⏱️ 异步与定时

### debounce

> 防抖

```typescript
function debounce<T extends AnyFunction>(func: T, wait?: number): T
```

```typescript
import { debounce } from '@fexd/tools'

const debouncedSearch = debounce(search, 300)
```

### throttle

> 节流

```typescript
function throttle<T extends AnyFunction>(func: T, wait?: number): T
```

```typescript
import { throttle } from '@fexd/tools'

const throttledScroll = throttle(handleScroll, 100)
```

### delay

> 延时 Promise

```typescript
function delay(time?: number): Promise<unknown>
```

```typescript
await delay(300)
```

### nextTick

> 微任务调度

```typescript
function nextTick(func: (value: void) => void | PromiseLike<void>): Promise<void>
```

### memoize

> 记忆函数

```typescript
interface CachedFunction extends Function {
  cache: Map<any, any>
}
function memoize<T>(func: Function, options?: { disable?: () => boolean }): CachedFunction
```

```typescript
const cachedFetch = memoize(fetchUser)
cachedFetch('id-1') // 请求
cachedFetch('id-1') // 命中缓存
cachedFetch.cache.clear() // 清除缓存
```

⚠️ `.d.ts` 中 `disable` 类型标注为 `() => false`，实际应为 `() => boolean`。

### lock

> 自锁函数（防止并发重复执行）

```typescript
interface LockedFunction extends Function {
  unlock: () => void
  isLocked: () => boolean
}
interface LockConfig {
  always?: Function // 锁定期间每次调用也会执行
  locking?: Function // 锁定时调用的回调
}
function lock<T>(func: any, conf?: LockConfig): LockedFunction
```

```typescript
const lockedSubmit = lock(async () => {
  await submitForm()
})
lockedSubmit() // 执行
lockedSubmit() // 被锁定，跳过
// 异步完成后自动解锁
```

**静态属性**：`lock.memory` — 内置 memoize 的自锁函数。

### SAS

> Single Advisory Service — 相同异步请求去重

```typescript
function SAS<T = any>(query: () => Promise<T>): () => Promise<T>
```

```typescript
const fetchUser = SAS(() => api.getUser())
// 并发调用只发一次请求，所有调用者共享同一个 Promise
fetchUser()
fetchUser() // 复用上面的 Promise
```

### catchPromise

> Promise 元组化（Go 风格错误处理）

```typescript
function catchPromise<T = any>(promise: Promise<T> | (() => Promise<T>)): Promise<[undefined, T] | [any, undefined]>
```

```typescript
const [err, data] = await catchPromise(fetchData())
if (err) {
  console.error(err)
  return
}
// data 可安全使用
```

### enhancePromise

> 增强 Promise（附加状态查询）

```typescript
function enhancePromise<T = any>(
  promise?: Promise<T>,
): Promise<T> & {
  resolve: (value: T) => void
  reject: (reason?: any) => void
  isPending: () => boolean
  isFulfilled: () => boolean
  isRejected: () => boolean
  getValue: () => T | undefined
  getError: () => any
}
```

```typescript
const p = enhancePromise<string>()
p.isPending() // → true
p.resolve('done')
p.isFulfilled() // → true
p.getValue() // → 'done'
```

### promiseGuess

> 智能处理 Promise / 同步返回值

```typescript
function promiseGuess<T = any>(executor: Function, valuer: Function): (...args: any[]) => T
```

---

## 🎬 动画与帧调度

### easing

> 缓动函数集合

```typescript
type EasingFunction = (position: number, ...args: any[]) => number
interface EasingFunctionMap {
  [key: string]: EasingFunction
}

const easing: EasingFunctionMap
```

```typescript
import { easing } from '@fexd/tools'

easing.linear(0.5) // → 0.5
easing.easeInQuad(0.5) // → 0.25
```

### Tween

> 缓动动画

```typescript
class Tween {
  constructor(config?: { from?: number; to?: number; duration?: number; ease?: EasingFunction; loop?: boolean })

  on(event: 'update', listener: (value: number, prevValue: number) => void): this
  on(event: 'start' | 'stop' | 'reverse' | 'end', listener: () => void): this

  start(): this
  stop(): this
  reverse(): this
  restart(): this
  reset(): this
  progress(progress: number): this
  value(progress?: number): number
  isEnded(progress?: number): boolean
}
```

```typescript
import { Tween } from '@fexd/tools'

const tween = new Tween({ from: 0, to: 100, duration: 500 })
tween.on('update', (val) => {
  element.style.opacity = val / 100
})
tween.start()
```

### FrameProcess

> 帧进程管理器

```typescript
class Process {
  static defaultProcess: Process
  constructor(config?: { maxTaskCount?: number })
  start(frame: Function): Function // 返回 stop 函数
  once(frame: Function): void
}

export const defaultProcess: Process
export default Process
```

---

## 📡 事件与滚动

### EventBus

> 事件总线

```typescript
class EventBus<T = string> {
  on(event: T, listener: Function, options?: { once?: boolean }): this
  once(event: T, listener: Function): this
  off(event: T, listener: Function): this
  emit(event: T, ...args: any[]): void
}
```

```typescript
import { EventBus } from '@fexd/tools'

const bus = new EventBus()
bus.on('change', (val) => console.log(val))
bus.emit('change', 42)

// 本项目中的用法：modalStore 使用 EventBus 管理弹窗事件
```

### ScrollListener

> 滚动监听（上拉加载、触底检测）

```typescript
class ScrollListener {
  constructor(config: ScrollListenerConfig)
  destroy(): void
  init(): void
}
```

```typescript
// ScrollView 组件内部使用
import { ScrollListener } from '@fexd/tools'
```

---

## 🌐 URL 与查询字符串

### qs

> 查询字符串工具

```typescript
const qs: {
  parse(str: any): any
  stringify(params?: {}): string
}
```

```typescript
import { qs } from '@fexd/tools'

qs.parse('a=1&b=2') // → { a: '1', b: '2' }
qs.stringify({ a: 1, b: 2 }) // → 'a=1&b=2'
```

### url

> URL 参数操作

```typescript
const url: {
  param(name: string, url?: any, decode?: Function): any
  allParam(url?: any, decode?: Function): any
  paramEscape(...args: any[]): any
  allParamEscape(...args: any[]): any
  generateParamStr(paramObj: Object, encode?: Function): string
}
```

```typescript
import { url } from '@fexd/tools'

url.param('id') // 从当前 URL 取 id 参数
url.param('id', 'https://example.com?id=42') // → '42'
url.allParam() // 获取所有参数对象
url.generateParamStr({ a: 1, b: 2 }) // → 'a=1&b=2'
```

---

## 💾 存储

### storage

> localStorage / sessionStorage 封装

```typescript
const storage: {
  get(key: string): any
  set(key: string, value: any): void
  remove(key: string): void
  getSession(key: string): any
  setSession(key: string, value: any): void
  removeSession(key: string): void
}
```

```typescript
import { storage } from '@fexd/tools'

storage.set('token', 'abc123')
storage.get('token') // → 'abc123'
storage.remove('token')

storage.setSession('temp', { data: 1 })
storage.getSession('temp')
```

⚠️ `.d.ts` 中所有方法类型为 `Function`，上述签名基于源码推断。

---

## 🔧 浏览器工具

### copy

> 复制到剪贴板

```typescript
function copy(content: string | number | HTMLElement): void | Promise<void>
```

```typescript
import { copy } from '@fexd/tools'

copy('文本内容')
copy(document.getElementById('target'))
```

### source

> 动态加载 JS/CSS 资源

```typescript
const source: {
  js(src: string, externals?: string | string[]): Promise<unknown>
  css(href: string): void
}
```

```typescript
import { source } from '@fexd/tools'

await source.js('https://cdn.example.com/lib.js')
source.css('https://cdn.example.com/style.css')
```

### preloadImage

> 预加载图片

```typescript
function preloadImage(srcList: string[]): void
```

### globalThis

> 全局对象安全引用

```typescript
const globalThis: any
```

```typescript
import { globalThis as root } from '@fexd/tools'

root.addEventListener('resize', handler)
root.document.title = 'New Title'
```

---

## 📋 表单转换

### formdata2obj

> FormData → 普通对象

```typescript
function formdata2obj(formData: FormData): any
```

### obj2formdata

> 普通对象 → FormData

```typescript
function obj2formdata(obj: any): FormData
```

---

## 🌍 国际化

### I18n

> 多语言工具

```typescript
class I18n {
  language: string
  eventBus: EventBus<string>

  translate(key: string, ...args: any[]): string
  t(key: string, ...args: any[]): string // translate 的别名
  template(str: string, data: object): string
  load(...args: any[]): CachedFunction
  applyLanguage(lng: string): void
  applyConfig(config: I18nConfig): void
}
```

---

## 🎯 其他

### CombJudge

> 组合判断器 — 按属性组合从列表中匹配

```typescript
class CombJudge {
  constructor(list: Object | any[])
  find(...args: any[]): any
}
```

⚠️ `.d.ts` 中类名拼写为 `CombJubge`（typo），导入名 `CombJudge` 正确。

---

## 非 barrel 导出的内部模块

以下存在于包内但不在 `index.d.ts` 中导出，仅供内部引用：

| 模块                | 路径                           | 说明                 |
| ------------------- | ------------------------------ | -------------------- |
| `trimZeros`         | `isBigNumber` 模块的命名导出   | 去除数字字符串尾部零 |
| `withSupportive`    | `storage/withSupportive`       | storage 兼容性包装   |
| `getExternals`      | `source/getExternals`          | 外部依赖解析         |
| `getClassNameArray` | `classnames/getClassNameArray` | className 转数组     |
| `defaultProcess`    | `FrameProcess` 模块的命名导出  | 默认帧进程实例       |
