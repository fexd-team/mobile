---
name: fexd-mobile
description: >-
  React 移动端 H5 组件库 @fexd/mobile 的完整使用指南。涵盖 127 个公开导出/工具的用法、 代码片段、主题定制、样式修改、架构设计。当用户使用 @fexd/mobile 开发页面、查找组件 用法、定制主题、修改样式、查询 API 时使用。触发词：fexd、@fexd/mobile、fexd-mobile。


metadata:
  author: FEXD Team
  version: '2026.06.02'
  source: packages/mobile/src/exports/
---

# @fexd/mobile 使用指南

> 文档基于 @fexd/mobile v0.1.34，更新于 2026-06-02。

React 移动端 H5 组件库，127 个公开导出，覆盖输入、反馈、布局、展示、导航等场景。

## Skill 导览

按任务场景选择对应文档，避免全量阅读：

| 场景 | 应读文件 |
| --- | --- |
| 选组件 / 不确定用哪个 | [decision-map.md](decision-map.md) → [catalog.md](catalog.md) |
| 使用某个组件 | `references/{ComponentName}.md` |
| 理解组件家族（IO/Modal/Picker 变体） | [families/](families/) 目录 |
| 弹层 / Modal 相关 | [systems/modal-system.md](systems/modal-system.md) → 具体 reference |
| 表单开发 | [systems/form-system.md](systems/form-system.md) → [references/Form.md](references/Form.md) |
| 选择器相关 | [systems/picker-system.md](systems/picker-system.md) → 具体 reference |
| IO 控制机制 | [systems/io-control-system.md](systems/io-control-system.md) |
| 业务场景模式（表单页/弹窗组合/三态处理） | [recipes/](recipes/) 目录 |
| 查完整 Props | `references/{ComponentName}.md` 或 [source-navigation.md](source-navigation.md) → 源码 type.tsx |
| 改主题 / 样式 | [theming.md](theming.md) + `references/{ComponentName}.md` 样式定制章节 |
| 理解架构 | [architecture.md](architecture.md) |
| 使用 hooks / 工具 | [utilities.md](utilities.md) |

## Skill 注册

消费项目安装 `@fexd/mobile` 后，通过 `@fexd/tools` 统一注册 skill 到各 AI Agent：

```bash
fexd-tools skills install
```

该方法会扫描 `node_modules` 和 workspace 包中所有符合规范的 `skills/*/SKILL.md`，同时注册 `fexd-mobile`、`fexd-tools` 及其他依赖包发布的 skills。也可在 `package.json` 中添加 `prepare:skills` 脚本实现自动化注册。

## 推荐实践

- 新建应用入口时用 `<Provider>` 包裹根组件（已有项目中无需重复提及）
- 表单输入场景使用 IO 变体（`Line*` / `Block*` / `Cell*`），具体选哪种跟随项目已有风格；如果项目中没有先例，查看设计稿或问用户偏好
- 简单确认对话用 `showDialog`，复杂面板用 `showPopup`，不需要阻断交互的反馈用 `toast`
- 命令式 API（showModal / toast / loading）优先于声明式，减少状态管理
- 样式定制首选 Less 变量覆盖，避免直接写 CSS 选择器覆盖
- 禁止使用有 `.developing` 标记的组件（未导出、API 不稳定）

## 反幻觉规则

生成 @fexd/mobile 代码时必须遵守：

1. **不要按其他组件库的习惯幻觉 Props**：@fexd/mobile 不是 antd-mobile、Ant Design、MUI 或 React Native。不要假设 Button 有 `danger` 属性（用 `type="danger"`）、不要假设 Form 有 `Form.Item`（用 `Form.Field`）、不要假设 Dialog 有 `Dialog.confirm`（用 `showDialog`）。
2. **不确定的 Prop 先查证**：如果某个 Prop 没有在 reference 文档中找到，按 [source-navigation.md](source-navigation.md) 去源码 `type.tsx` 确认。仍然找不到则声明不确定，不要猜。
3. **不要编造不存在的组件**：开发中组件清单在下方「不可用组件」一节，如果用户要用的组件在此清单中，必须明确告知不可用并推荐替代方案。
4. **不要假设行为与 Ant Design 一致**：`Form.useForm()` 返回实例而非数组、`Form.Field` 用 render prop 而非 `Form.Item`、校验规则是函数而非规则对象。

## 需求澄清

当用户需求包含以下模糊词时，先给出选型分析和推荐方案，再编码。如果你有足够上下文判断意图，可直接给出推荐方案并说明理由，无需反复追问。

- **"弹窗"** → 确认操作？用 `showDialog`。复杂内容面板？用 `showPopup`。多选项操作菜单？用 `showActionSheet`。不确定？列出三种方案让用户选。
- **"选择"** → 单列选项？`Picker`。多级联动（如省市区）？`CascadePicker`。日期？`DatePicker`。时间？`TimePicker`。具体 IO 变体（`Line*` / `Block*` / `Cell*`）跟随项目已有风格。
- **"输入"** → 单行文本？`Input`。多行？`TextArea`。密码？`Input` + `type: 'password'`。数值？`Stepper` 或 `Input` + `inputMode: 'decimal'`。具体 IO 变体跟随项目已有风格。
- **"表单"** → 先确认字段列表和类型，再选用对应的 IO 变体。提交目标（接口/本地）影响提交逻辑。
- **"列表"** → 静态数据直接 map 渲染。需要下拉刷新/无限滚动？`ScrollView`。带分组？`Cell.Group`。

## 多步骤任务

遇到以下复杂场景时，按步骤执行，每步确认后再进入下一步。

**搭建表单页面：**

1. 确认字段列表和类型 → 查看项目已有 IO 变体风格，对每个字段选用对应变体
2. 搭建骨架 → `<Form form={Form.useForm()}>` + 每个字段的 `<Form.Field>`
3. 绑定控制器 → `field.value` / `field.setValue` / `field.validate()` / `field.error`
4. 提交逻辑 → `await form.validate()` → `form.getValues()` → 调接口 → `toast.success`
5. 样式定制 → Less 变量覆盖或 className

**弹窗交互流程（按钮 → 确认 → 操作 → 反馈）：**

1. 选弹窗类型 → `showDialog`（确认）/ `showPopup`（复杂内容）/ `showActionSheet`（多选项）
2. 触发逻辑 → `const dialogController = showDialog({ actions: [{ content: '确认', onClick: () => { dialogController.close(); ... } }] })`
3. 异步操作 → `loading.show()` → `try { await action() } finally { loading.hide() }`（成对调用）
4. 结果反馈 → `toast.success('完成')` 或 `toast.fail('失败')`

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

127 个公开导出按功能分为 6 大类，含描述、关联、坑点、选型建议。

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

## 回复前自检

生成 @fexd/mobile 相关代码后，仅检查与本次改动相关的项：

1. **禁用组件**：未使用上方「不可用组件」清单中的任何组件
2. **命令式优先**：简单反馈用 `showDialog` / `toast` / `loading` 等命令式 API，而非声明式 + `useState`
3. **IO 变体一致性**：表单类组件的 IO 变体与项目已有风格保持一致
4. **坑点提示**：提到了所用组件的关键注意事项（如 `loading.show/hide` 必须成对、`Form.useForm()` 返回实例而非数组）
5. **Props 准确性**：未使用 reference 文档和源码中不存在的 Props。如有不确定，声明不确定而非猜测
6. **组件选型**：选了最合适的组件而非第一个看起来能用的。相似组件间的选型参考了 [decision-map.md](decision-map.md)
