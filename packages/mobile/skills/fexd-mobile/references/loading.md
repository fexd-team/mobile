---
name: loading
description: 加载中
---

# loading 加载中

**命令式** API：`show` / `hide` 采用 **引用计数**；每次 `show` 需对应一次 `hide`，计数归零后才会在 `close` 中关闭弹层。`hide(true)` 会强制触发 `close`（内部 `close` 经 60ms debounce）；弹层退场时 `onExited` 会将 `loadingCount` 置为 `0`。

```tsx
import { loading } from '@fexd/mobile'
```

## 基础用法

```tsx
import { loading } from '@fexd/mobile'

loading.show({ content: '加载中…' })
// ...async work
loading.hide()

loading.hide(true)
```

## 命令式 API

| 成员 | 签名 | 说明 |
| --- | --- | --- |
| `show` | `(config?: LoadingMethodConfig) => ModalMethodController<LoadingProps>` | 打开或叠加计数；首次打开时走 `createModalAPI(Loading)`；返回类型中的 `LoadingProps` 取自 `Loading/type.tsx`（`Omit<ModalProps, 'placement' \| 'transition' \| 'type'>`） |
| `hide` | `(forced?: boolean) => void` | 与源码参数名一致；计数减一后调用内部 `close`；`true` 时无论计数是否为零都会执行关闭 |
| `getCount` | `() => number` | 当前计数 |
| `getController` | `() => ModalMethodController<LoadingProps> \| undefined` | 当前控制器（`LoadingProps` 同 `Loading/type.tsx`） |
| `defaultConfig` | `LoadingMethodConfig` | 默认配置对象，可修改（与单次 `show` 合并） |

`ModalMethodController` 定义见 `createModalAPI/type.tsx`（`close` / `update` / `promise`）。

**注意**：`show` 多次调用时，内部在计数大于 0 时可能直接返回已有 `loadingController` 而不重复创建（见 `loading/index.tsx`）。

## Props / 配置类型（loading/type.tsx）

### PureLoadingProps / LoadingProps（`loading/type.tsx`）

- `PureLoadingProps`：`Omit<PureModalProps, 'transition' | 'type'>`
- `LoadingProps`：与 `ModalProps` 合并语义（同一文件多重 `interface` 合并），并 `Omit<ModalProps, 'transition' | 'type'>`

声明式子组件 `Loading/` 另有 `LoadingProps`（`Loading/type.tsx`）：`Omit<ModalProps, 'placement' | 'transition' | 'type'>`，与命令式 `show` 返回的控制器泛型一致。

除上述 Omit 外，字段以 `Modal/type.tsx` 为准。

### PureLoadingMethodConfig / LoadingMethodConfig

在对应 `PureLoadingProps` / `LoadingProps` 基础上：

- 排除 `visible`、`children`
- 增加可选 `content?: React.ReactNode`

用于 `loading.show(config)`。

## 样式变量（LoadingStyleVars）

| 变量                             | 说明         | 默认                 |
| -------------------------------- | ------------ | -------------------- |
| `@loading-prefix`                | 类名前缀     | `exd-loading`        |
| `@loading-content-padding`       | 内容区内边距 | `18px`               |
| `@loading-content-background`    | 内容区背景   | `rgba(0, 0, 0, 0.8)` |
| `@loading-content-border-radius` | 圆角         | `4px`                |
| `@loading-content-color`         | 文字颜色     | `#fff`               |
| `@loading-spinner-size`          | Spinner 尺寸 | `40px`               |
| `@loading-text-margin-top`       | 文字上边距   | `8px`                |

<!--
Source:
- packages/mobile/src/exports/loading/type.tsx
- packages/mobile/src/exports/loading/index.zh.md
- packages/mobile/src/exports/loading/index.tsx
- packages/mobile/src/exports/loading/demos/
- packages/mobile/src/exports/loading/style.less
-->
