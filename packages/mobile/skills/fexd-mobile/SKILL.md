---
name: fexd-mobile
description: >-
  React 移动端 H5 组件库 @fexd/mobile 的完整使用指南。涵盖 128 个组件/工具的用法、 代码片段、主题定制、样式修改、架构设计。当用户使用 @fexd/mobile 开发页面、查找组件 用法、定制主题、修改样式、查询 API 时使用。触发词：fexd、@fexd/mobile、fexd-mobile。


metadata:
  author: FEXD Team
  version: '2026.04.09'
  source: packages/mobile/src/exports/
---

# @fexd/mobile 使用指南

> 文档基于 @fexd/mobile v0.1.32，更新于 2026-04-09。

React 移动端 H5 组件库，128 个稳定导出，覆盖输入、反馈、布局、展示、导航等场景。

## Skill 导览

按任务场景选择对应文档，避免全量阅读：

| 场景              | 应读文件                                                                                        |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| 使用某个组件      | `references/{ComponentName}.md`                                                                 |
| 开发页面 / 选组件 | [catalog.md](catalog.md)                                                                        |
| 查完整 Props      | `references/{ComponentName}.md` 或 [source-navigation.md](source-navigation.md) → 源码 type.tsx |
| 改主题 / 样式     | [theming.md](theming.md) + `references/{ComponentName}.md` 样式定制章节                         |
| 弹窗 / 反馈交互   | `references/Modal.md` 等 + [architecture.md](architecture.md)                                   |
| 表单开发          | `references/Form.md` + [architecture.md](architecture.md)                                       |
| 理解架构          | [architecture.md](architecture.md)                                                              |
| 使用 hooks / 工具 | [utilities.md](utilities.md)                                                                    |

## 推荐实践

- 应用根组件始终用 `<Provider>` 包裹，它提供 ModalStation 和全局配置
- 表单输入场景优先选 `Line*` 变体（LineInput / LinePicker），非表单场景直接用基础组件
- 简单确认对话用 `showDialog`，复杂面板用 `showPopup`，不需要阻断交互的反馈用 `toast`
- 命令式 API（showModal / toast / loading）优先于声明式，减少状态管理
- 样式定制首选 Less 变量覆盖，避免直接写 CSS 选择器覆盖
- 禁止使用有 `.developing` 标记的组件（未导出、API 不稳定）

## 组件文档

每个组件的详细用法、Props、代码示例、样式定制均在 `references/` 目录中，按组件名命名：

```
references/{ComponentName}.md          # 基础用法 + Props + 样式定制
references/{ComponentName}-advanced.md  # 高级用法（仅复杂组件）
references/{ComponentName}-design.md    # 设计思路和 DOM 结构（仅复杂组件）
```

查找某个组件的用法时，直接读取 `references/{ComponentName}.md`。

## Import 规范

```jsx
import { Button, Modal, toast, Input } from '@fexd/mobile'
```

样式引入（选其一）：

```less
// Less 全量引入（推荐）
@import '~@fexd/mobile/es/style.less';
```

```js
// babel-plugin-import 按需引入
;[
  'import',
  { libraryName: '@fexd/mobile', libraryDirectory: 'es/exports', style: (name) => `${name}/style.less` },
  '@fexd/mobile',
]
```

## 分类概览 → [catalog.md](catalog.md)

120 个稳定导出按功能分为 6 大类，含描述、关联、坑点、选型建议。

| 分类      | 导出数 | 典型组件                                                                     |
| --------- | ------ | ---------------------------------------------------------------------------- |
| 输入类    | 48+    | Button, Input, Form, Picker, DatePicker, CascadePicker, Line/Block/Cell 变体 |
| 反馈类    | 20+    | Modal, Dialog, Popup, toast, notify, loading, show*/useShow*                 |
| 布局类    | 9      | Cell, Collapse, Grid, ScrollView, Space                                      |
| 展示类    | 20+    | Alert, Badge, Swiper, Steps, Transition\* 动画组件                           |
| 导航类    | 3      | NavBar, TabBar, Tabs                                                         |
| 其他/基础 | 6+     | Provider, Portal, ErrorBoundary                                              |

工具函数（Hooks / 工厂 / 命令式 API）→ [utilities.md](utilities.md)

## 架构速览

**IO 四层分层（仅表单类组件）：** Label（视觉） → IOLabel（字段逻辑） → UnstyledIO（输入能力） → Line*/Block*/Cell\*（主题注入）。3 种布局 × 4 种输入 = 12 个组件。非表单组件（Button、Modal 等）不涉及此分层。详见 [architecture.md](architecture.md)。

**Modal 体系：** Portal → Overlay → BasicModal → Modal。支持声明式 `<Modal>` 和命令式 `showModal()`。互斥控制通过 `modalConflict` 实现。详见 [architecture.md](architecture.md)。

**Transition 系统：** `createTransition` 工厂 + 7 个内置过渡动画。速度预设 none/fastest/fast/normal/slow/slowest。

## 主题定制 → [theming.md](theming.md)

- Less 变量覆盖（推荐）
- CSS 变量方案（实验性）
- 组件级样式修改 4 种策略
- 全局设计变量速查

## 源码导航 → [source-navigation.md](source-navigation.md)

npm 包含完整源码（`src/`），当组件文档不够详尽时可直接在 `node_modules/@fexd/mobile/src/` 中读取源码补充。

## 不可用组件

以下 31 个组件处于开发阶段，未从 @fexd/mobile 导出，**禁止使用**：

Breadcrumb, Calendar, Card, Cascader, CountDown, CountTo, Drag, Drawer, Dropdown, Elevator, Footer, Gallery, ImagePicker, List, Marquee, Menu, NoticeBar, NumberKeyboard, Pagination, Search, SegmentedControl, ShareSheet, Skeleton, Sticky, SwipeAction, Table, Tag, Tips, TreeSelect, Video, Waterfall
