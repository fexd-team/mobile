---
name: ScrollView
description: 可滚动容器；支持触底加载、按距离触发的滚动事件、上下阴影与外层包裹类名。
---

# ScrollView 滚动区域

可滚动容器；支持触底加载、按距离触发的滚动事件、上下阴影与外层包裹类名。

```tsx
import { ScrollView } from '@fexd/mobile'
```

## 基础用法

```tsx
import { ScrollView } from '@fexd/mobile'

export default () => (
  <>
    <ScrollView>{/* long content */}</ScrollView>
    <ScrollView shadow>{/* content */}</ScrollView>
    <ScrollView
      onEndReached={async (done) => {
        await doLoadMore()
        done()
      }}
    >
      {items}
    </ScrollView>
  </>
)
```

`distanceEvents` 为数组；每项可含距顶距离 `distance`（`number` 或返回距离的函数）、可选 `dynamic`（见 demo）、以及 `onGoingIn` / `onGoingOut`（滚动位置跨越阈值时各触发一次）。类型在 `type.tsx` 中为 `any`，行为以 `ScrollView/index.tsx` 与 `@fexd/tools` 的 `ScrollListener` 为准。

示例：`packages/mobile/src/exports/ScrollView/demos/demo1/index.tsx`。

`children` 若为函数，会收到 `{ canScrollUp, canScrollDown }`（与上下阴影展示状态一致）。

## Props

### ScrollView（`ScrollViewProps`）

定义于 `packages/mobile/src/exports/ScrollView/type.tsx`。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 子内容；可为函数 `(state: { canScrollUp: boolean; canScrollDown: boolean }) => ReactNode` | `any` | — |
| className | 内层滚动容器类名 | `any` | — |
| distanceToReachEnd | 距底部多少 px 视为触底（用于 `onEndReached`）；具体默认以 `ScrollListener` 为准，文档站常见为 `100` | `any` | （见运行时） |
| onEndReached | 触底回调；调用传入的 `done` 解锁后可再次触发 | `(done: () => void) => void` | — |
| distanceEvents | 按滚动距离触发的事件配置列表 | `any` | `[]`（`ScrollView` defaultProps） |
| shadow | `false` 关闭；`true` 上下阴影；`[boolean, boolean]` 分别控制上/下阴影 | `any` | `false` |
| wrapperClassName | 最外层包裹元素类名 | `any` | — |
| ref | 引用 | `React.Ref<ScrollViewRef>`（`ScrollViewRef` = `HTMLDivElement`） | — |

另继承标准 `div` 的 HTML 属性（`JSXDivProps`）。

## 样式变量

定义于 `packages/mobile/src/exports/ScrollView/type.tsx`（`ScrollViewStyleVars` / `DOC_ScrollViewStyleVars`）。

| 变量          | 说明             | 默认 |
| ------------- | ---------------- | ---- |
| `@size-scale` | 全局尺寸缩放比例 | `1`  |

<!--
Source:
- packages/mobile/src/exports/ScrollView/type.tsx
- packages/mobile/src/exports/ScrollView/index.zh.md
- packages/mobile/src/exports/ScrollView/index.tsx
- packages/mobile/src/exports/ScrollView/demos/
- packages/mobile/src/exports/ScrollView/style.less
-->
