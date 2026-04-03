---
name: ModalStation
description: 在指定挂载点注册「驿站」对象，供命令式弹层 API 将 Modal 渲染到固定容器。stationMap[id] 上暴露 add / remove，用于按 id 挂载/卸载子树渲染函数。
---

# ModalStation 模态驿站

在指定挂载点注册「驿站」对象，供命令式弹层 API 将 Modal 渲染到固定容器。`stationMap[id]` 上暴露 `add` / `remove`，用于按 id 挂载/卸载子树渲染函数。

```tsx
import { ModalStation, stationMap } from '@fexd/mobile'
```

## 基础用法

在应用根部（或布局中）放置驿站，并通过 `stationMap` 与 `createModalAPI` 等机制配合使用（具体集成以项目内 `showModal` / Portal 用法为准）。

```tsx
import { ModalStation } from '@fexd/mobile'

function App() {
  return (
    <>
      <ModalStation id="DEFAULT_STATION" />
      {/* 其他内容 */}
    </>
  )
}
```

## Props

`ModalStationProps`（`packages/mobile/src/exports/ModalStation/type.tsx`）。

| 属性                            | 类型      | 默认值 | 必填 | 说明                                   |
| ------------------------------- | --------- | ------ | ---- | -------------------------------------- |
| id                              | `string`  | -      | 是   | 驿站 id，对应 `stationMap` 的 key      |
| deleteStationMapKeyAfterUnmount | `boolean` | `true` | 否   | 卸载后是否从 `stationMap` 上删除该 key |

## 高级用法

模块导出 `stationMap: IStationMap`（`Record<string, unknown>`）。挂载后，对应 `id` 的值为包含 `add(id, render)` 与 `remove(id)` 的对象，用于在驿站内维护 `id → render` 映射并在 React 中渲染（见 `ModalStation/index.tsx`）。

## 注意事项

- 需保证 `id` 在应用内唯一。
- 若 `deleteStationMapKeyAfterUnmount={false}`，卸载组件后 `stationMap` 仍可能保留该 key，避免误用悬空引用。

## 相关组件

- `Modal`、`Portal`、`createModalAPI`、`showModal`

<!--
Source:
- packages/mobile/src/exports/ModalStation/type.tsx
- packages/mobile/src/exports/ModalStation/index.tsx
- packages/mobile/src/exports/ModalStation/style.less
-->
