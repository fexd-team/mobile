---
name: toast
description: 命令式轻提示，非声明式组件。通过 info / success / warn / fail 等方法弹出；底层基于 createModalAPI 与 Toast 组件。
---

# toast

命令式轻提示，非声明式组件。通过 `info` / `success` / `warn` / `fail` 等方法弹出；底层基于 `createModalAPI` 与 `Toast` 组件。

```tsx
import { toast } from '@fexd/mobile'
```

## 基础用法

```tsx
import { toast } from '@fexd/mobile'

toast.info('message')
toast.success('done')
toast.warn('warning')
toast.fail('error')

toast.info('top', { placement: 'top', duration: 3000 })
```

调用返回控制器（见 API），可在超时关闭前 `close` / `update`，或使用 `reclock()` 重新计时。

## API

### `toast` 对象

| 成员            | 说明                                                                   |
| --------------- | ---------------------------------------------------------------------- |
| `info`          | 无默认图标                                                             |
| `success`       | 默认成功图标                                                           |
| `warn`          | 默认警告图标                                                           |
| `fail`          | 默认失败图标                                                           |
| `defaultConfig` | 全局默认配置对象；修改会影响后续所有方法（改字段即可，勿整体替换引用） |

每个方法形如：

```ts
;(content: React.ReactNode, config?: ToastMethodConfig) => ToastController
```

各方法另有 `defaultConfig`，仅影响对应方法；优先级：调用时 `config` > `toast.xxx.defaultConfig` > `toast.defaultConfig`。

### `ToastMethodConfig`

源码（`exports/toast/index.tsx`）：

```ts
interface ToastMethodConfig extends Omit<ToastProps, 'visible' | 'children'> {
  duration?: number
}
```

- `ToastProps`：`Omit<ModalProps, 'type'>` 且含 `touchable?`、`icon?`（`toast/Toast/type.tsx`）。
- `duration`：内容展示时长（毫秒），默认 `1800`。关闭总延迟为 `duration + transitionDuration`（过渡耗时来自 `transitionSpeed` 或数值配置）。

`Toast` 组件默认：`touchable` 为 `false`（`mask` 为假，不挡交互）；`touchable === true` 时 `mask` 为真。未指定 `transition` 时按 `placement` 选用 `TransitionFade` / `TransitionFadeSlideDown` / `TransitionFadeSlideUp`。

### `ToastController`

| 成员      | 说明                               |
| --------- | ---------------------------------- |
| `close`   | 关闭当前 toast                     |
| `update`  | 更新弹层 props                     |
| `promise` | 销毁完成后 resolve 的 Promise      |
| `reclock` | 按当前总时长重新启动自动关闭定时器 |

### 互斥

`showToast` 使用 `modalConflict.extend(modalConflict.handlers.hidden, { types: ['toast'] })`。可传 `onConflict: null` 关闭互斥，或使用库内其他处理器（如 `modalConflict.handlers.offsetByPlacement`）。

## 样式变量

`ToastStyleVars` 见 `toast/Toast/type.tsx` 与 `exports/toast/type.tsx`（含 `@toast-prefix` 等扩展），用于主题与 Less/CSS 变量。

<!--
Source:
- packages/mobile/src/exports/toast/type.tsx
- packages/mobile/src/exports/toast/index.zh.md
- packages/mobile/src/exports/toast/index.tsx
- packages/mobile/src/exports/toast/demos/
- packages/mobile/src/exports/toast/style.less
-->
