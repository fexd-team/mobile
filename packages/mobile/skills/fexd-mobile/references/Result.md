---
name: Result
description: 用于展示操作结果：成功、警告、错误、信息等状态，可自定义图标、标题、描述与底部操作区。
---

# Result 结果页

用于展示操作结果：成功、警告、错误、信息等状态，可自定义图标、标题、描述与底部操作区。

```tsx
import { Result } from '@fexd/mobile'
```

## 基础用法

```tsx
import { Result, Button } from '@fexd/mobile'

<Result status="success" title="操作成功" description="您的操作已经成功完成" />

<Result icon={<CustomIcon />} title="自定义图标" description="说明文案" />

<Result status="success" title="提交成功" description="请等待审核">
  <Button type="primary">返回首页</Button>
</Result>
```

示例源码参考：`packages/mobile/src/exports/Result/demos/demo1/index.tsx`。

## Props

### Result（`ResultProps`）

定义于 `packages/mobile/src/exports/Result/type.tsx`。

| 属性        | 说明                                 | 类型                                                            |
| ----------- | ------------------------------------ | --------------------------------------------------------------- |
| status      | 结果状态                             | `ResultStatus`（`'success' \| 'warning' \| 'error' \| 'info'`） |
| icon        | 自定义图标（覆盖 `status` 默认图标） | `React.ReactNode`                                               |
| title       | 标题                                 | `React.ReactNode`                                               |
| description | 描述                                 | `React.ReactNode`                                               |

另继承标准 `div` 的 HTML 属性（`JSXDivProps`，不含 `title`）。

`ResultRef` = `HTMLDivElement`。

## 状态说明

- `success`：成功，默认成功图标与成功色
- `warning`：警告
- `error`：错误
- `info`：信息

## 样式变量

定义于 `packages/mobile/src/exports/Result/type.tsx`（`ResultStyleVars` / `DOC_ResultStyleVars`）。

| 变量 | 说明 |
| --- | --- |
| `@result-prefix` | 组件 className 前缀（默认 `exd-result`） |
| `@result-padding` | 容器内边距 |
| `@result-icon-size` | 图标尺寸 |
| `@result-icon-margin-bottom` | 图标下边距 |
| `@result-title-color` / `@result-title-font-size` / `@result-title-margin-bottom` | 标题样式 |
| `@result-description-color` / `@result-description-font-size` / `@result-description-margin-bottom` | 描述样式 |
| `@result-icon-color-success` / `warning` / `error` / `info` | 各状态图标色 |

<!--
Source:
- packages/mobile/src/exports/Result/type.tsx
- packages/mobile/src/exports/Result/index.zh.md
- packages/mobile/src/exports/Result/index.tsx
- packages/mobile/src/exports/Result/demos/
- packages/mobile/src/exports/Result/style.less
-->
