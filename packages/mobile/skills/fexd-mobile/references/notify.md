---
name: notify
description: import { notify } from '@fexd/mobile'
---

# notify 通知

```ts
import { notify } from '@fexd/mobile'
```

仅命令式 API：内部 `createModalAPI(Notify, { shareMask: true, onConflict: modalConflict.extend(modalConflict.handlers.hidden, { types: ['notify'] }) })`，超时自动 `close`。

## 基础用法

```tsx
import { notify, TransitionFade } from '@fexd/mobile'

notify.info('提示')
notify.success('成功')
notify.warning('警告')
notify.error('失败')

notify.info('自定义', {
  duration: 3000,
  transition: TransitionFade,
  transitionSpeed: 'slow',
  touchable: true,
})
```

## API

### `notify` 对象

| 成员                                     | 说明                                  |
| ---------------------------------------- | ------------------------------------- |
| `defaultConfig`                          | 全局默认 `NotifyMethodConfig`。       |
| `info` / `success` / `warning` / `error` | 命令式方法；后三者预设 `notifyType`。 |

### 方法

`(content: React.ReactNode, config?: NotifyMethodConfig) => ModalMethodController<NotifyProps> & { reclock: () => void }`

`NotifyMethodConfig` = `Omit<NotifyProps, 'visible' | 'children'>` + `duration?`（默认 `2600` ms）。关闭延时为 `duration + transitionDuration`（`SPEED_MAP[transitionSpeed]` 或数值 `transitionSpeed`）。

### 返回值

- `close` / `update` / `promise`（`onDestroyed` 时 resolve），见 `createModalAPI/type.tsx`。
- `reclock()`：重置自动关闭定时器。

### `NotifyProps`（`notify/Notify/type.tsx`）

相对 `ModalProps` 去掉 `placement`、`type`，增加 `notifyType?`、`touchable?`。其余 Modal 字段可通过参数或 `defaultConfig` 传入。

### 异步用法

```ts
await notify.info('完成').promise
```

## 样式变量

`packages/mobile/src/exports/notify/type.tsx` — `NotifyStyleVars`。

<!--
Source:
- packages/mobile/src/exports/notify/type.tsx
- packages/mobile/src/exports/notify/index.zh.md
- packages/mobile/src/exports/notify/index.tsx
- packages/mobile/src/exports/notify/demos/
- packages/mobile/src/exports/notify/style.less
-->
