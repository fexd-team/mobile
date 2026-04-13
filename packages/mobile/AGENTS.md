# @fexd/mobile

React 移动端 H5 组件库，128 个稳定导出。

## 快速开始

```jsx
import { Button, Modal, toast } from '@fexd/mobile'
```

```less
@import '~@fexd/mobile/es/style.less';
```

## 详细文档

完整 AI 文档位于 `skills/fexd-mobile/` 目录：

| 文件                                                            | 内容                                           |
| --------------------------------------------------------------- | ---------------------------------------------- |
| [SKILL.md](skills/fexd-mobile/SKILL.md)                         | 主入口、架构速览、任务路由                     |
| [catalog.md](skills/fexd-mobile/catalog.md)                     | 120 个组件的完整分类目录（含 references 链接） |
| [references/\*.md](skills/fexd-mobile/references/)              | 每个组件的详细用法、Props、代码示例、样式定制  |
| [architecture.md](skills/fexd-mobile/architecture.md)           | IO 分层设计、Modal 体系、Transition、Form      |
| [theming.md](skills/fexd-mobile/theming.md)                     | 主题定制、样式修改方案                         |
| [utilities.md](skills/fexd-mobile/utilities.md)                 | Hooks、工厂函数、命令式 API                    |
| [source-navigation.md](skills/fexd-mobile/source-navigation.md) | 源码导航指南                                   |

## 组件文档

每个组件的详细文档在 `skills/fexd-mobile/references/` 目录，按组件名命名：

```
skills/fexd-mobile/references/{ComponentName}.md          # 用法 + Props + 样式
skills/fexd-mobile/references/{ComponentName}-advanced.md  # 高级用法（仅复杂组件）
skills/fexd-mobile/references/{ComponentName}-design.md    # 设计思路（仅复杂组件）
```

## 源码导航

npm 包含完整源码，可直接读取每个组件的详细信息：

```
node_modules/@fexd/mobile/src/exports/{ComponentName}/
├── index.zh.md    # 完整中文文档（含 dumi 语法，需注意过滤）
├── type.tsx       # Props 类型定义
├── demos/         # 可运行示例
└── style.less     # 样式源码
```

## 不可用组件

以下组件处于开发阶段，禁止使用：Breadcrumb, Calendar, Card, Cascader, CountDown, CountTo, Drag, Drawer, Dropdown, Elevator, Footer, Gallery, ImagePicker, List, Marquee, Menu, NoticeBar, NumberKeyboard, Pagination, Search, SegmentedControl, ShareSheet, Skeleton, Sticky, SwipeAction, Table, Tag, Tips, TreeSelect, Video, Waterfall
