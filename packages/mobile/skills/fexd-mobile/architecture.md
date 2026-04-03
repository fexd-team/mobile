# 架构设计

## Contents

- [IO 四层分层设计](#io-四层分层设计) — 仅表单类组件
- [Modal 体系](#modal-体系) — 弹层层级、声明式/命令式、互斥控制
- [Transition 系统](#transition-系统) — 动画工厂和内置组件
- [Form 系统](#form-系统) — 表单容器和字段控制器
- [组件继承关系](#组件继承关系) — 全局继承树

## IO 四层分层设计

@fexd/mobile 的**表单输入类组件**采用四层分层架构，实现"3 种布局风格 × 4 种输入能力 = 12 个组件"的矩阵，核心复用仅 ~7 个基础模块。非表单组件（Button、Modal 等）不涉及此分层。

### 第一层：Label（视觉主题层）

纯展示壳，不含任何表单逻辑，只定义视觉风格：

| 组件            | 风格           |
| --------------- | -------------- |
| `UnstyledLabel` | 无样式基础     |
| `LineLabel`     | 底部线条风格   |
| `BlockLabel`    | 块级填充风格   |
| `CellLabel`     | 列表单元格风格 |

### 第二层：IOLabel（表单字段逻辑层）

在 Label 之上注入表单字段通用逻辑：placeholder、error、helper、focus/active/disabled 状态、prefix/suffix。

### 第三层：Unstyled IO（输入能力层）

只关注输入能力，不绑定特定视觉风格。通过依赖注入接收 `theme`（IOLabel 变体）：

| 组件                   | 能力     |
| ---------------------- | -------- |
| `UnstyledIOInput`      | 文本输入 |
| `UnstyledIOPicker`     | 选择器   |
| `UnstyledIODatePicker` | 日期选择 |
| `UnstyledIOTimePicker` | 时间选择 |

### 第四层：具体组件（主题注入层）

通过 `cloneFC` + `defaultProps.theme` 将视觉风格注入能力层：

```jsx
const LineInput = cloneFC(UnstyledIOInput)
LineInput.defaultProps.theme = LineIOLabel
```

**完整矩阵：**

|           | Input      | Picker      | DatePicker      | TimePicker      |
| --------- | ---------- | ----------- | --------------- | --------------- |
| **Line**  | LineInput  | LinePicker  | LineDatePicker  | LineTimePicker  |
| **Block** | BlockInput | BlockPicker | BlockDatePicker | BlockTimePicker |
| **Cell**  | CellInput  | CellPicker  | CellDatePicker  | CellTimePicker  |

**设计模式**：依赖注入（theme 通过 defaultProps）、组合优于继承（每层只管一件事）、策略模式（Label 变体可替换）。

## Modal 体系

### 层级关系

```
Portal          → 将子节点渲染到指定 DOM 节点（默认 document.body）
  └─ Overlay    → 遮罩层（背景蒙层 + 点击关闭 + 动画）
    └─ BasicModal → 基础模态框（Portal + Overlay + 内容动画 + modalStore 注册）
      └─ Modal  → 完整模态框（互斥控制 + shareMask + contentVisible）
        ├─ Dialog / Popup / ActionSheet  → 高层业务弹层
        └─ toast / notify / loading      → 命令式反馈
```

### 声明式 vs 命令式

| 声明式          | 命令式              | Hook 版本              |
| --------------- | ------------------- | ---------------------- |
| `<Modal>`       | `showModal()`       | `useShowModal()`       |
| `<Dialog>`      | `showDialog()`      | `useShowDialog()`      |
| `<Popup>`       | `showPopup()`       | `useShowPopup()`       |
| `<ActionSheet>` | `showActionSheet()` | `useShowActionSheet()` |
| —               | `toast.info()`      | —                      |
| —               | `notify.info()`     | —                      |
| —               | `loading.show()`    | —                      |

命令式 API 均通过 `createModalAPI` 工厂函数生成，返回 `{ close, update, promise }`。详见 [references/showModal.md](references/showModal.md)。

### 互斥控制（modalConflict）

多个弹层同时存在时的冲突处理：

| 处理器                                     | 效果                        |
| ------------------------------------------ | --------------------------- |
| `modalConflict.handlers.mask`              | 较低层加内容蒙层            |
| `modalConflict.handlers.hidden`            | 较低层隐藏内容              |
| `modalConflict.handlers.offsetByPlacement` | 较低层偏移（仅 top/bottom） |

详见 [references/modalConflict.md](references/modalConflict.md)。

### z-index 层级

通过 `level` 属性控制：

| level     | z-index 基础值 |
| --------- | -------------- |
| `low`     | 999            |
| `normal`  | 9,999          |
| `high`    | 99,999         |
| `highest` | 999,999        |

### ModalStation 与 Provider

- `Provider` 提供默认的 `ModalStation` + 全局共享遮罩，推荐在应用根组件使用
- 未使用 `Provider` 时，命令式 API 会自动挂载全局 Provider 到 `document.body`

### modalStore

全局弹层状态管理。详见 [references/modalStore.md](references/modalStore.md)。

**注意**：在 `open`/`close` 监听器中不要调用 `toast`/`showDialog` 等命令式 API，会导致无限循环。

## Transition 系统

### createTransition 工厂

基于 `react-transition-group` 的 `CSSTransition`，提供统一的动画组件工厂：

```jsx
import { createTransition } from '@fexd/mobile'
const MyTransition = createTransition('my-animation', { speed: 'normal' })
```

### 内置过渡组件

| 组件                      | 效果         | 典型场景         |
| ------------------------- | ------------ | ---------------- |
| `TransitionFade`          | 淡入淡出     | Modal 默认、通用 |
| `TransitionSlideUp`       | 从下往上滑入 | Popup、底部面板  |
| `TransitionSlideDown`     | 从上往下滑入 | 顶部通知         |
| `TransitionFadeSlideUp`   | 淡入 + 上滑  | 组合效果         |
| `TransitionFadeSlideDown` | 淡入 + 下滑  | 组合效果         |
| `TransitionNone`          | 无动画       | 性能优先场景     |
| `TransitionSwitch`        | 内容切换动画 | Tab 内容切换     |

### 动画速度

| 预设      | 时长  |
| --------- | ----- |
| `none`    | 0ms   |
| `fastest` | 100ms |
| `fast`    | 200ms |
| `normal`  | 300ms |
| `slow`    | 500ms |
| `slowest` | 700ms |

```jsx
<TransitionFade speed="fast">...</TransitionFade>
<TransitionFade speed={400}>...</TransitionFade>
```

## Form 系统

表单容器 + 字段控制器模式。详见 [references/Form.md](references/Form.md)。

核心用法：

```jsx
import { Form, createForm, LineInput } from '@fexd/mobile'

const form = createForm({ strict: true })

<Form form={form}>
  <Form.Field name="username" rules={[{ required: true, message: '请输入' }]}>
    {({ value, setValue, error }) => (
      <LineInput value={value} onChange={setValue} error={error} />
    )}
  </Form.Field>
</Form>
```

`Form.Field` 的 children 接收 `FieldController`（value、setValue、error、validate、form）。支持 `watchValue` 实现字段联动、`rules` 对象支持命名规则。

## 组件继承关系

```
createFC                          # 所有组件的创建工厂
├── Portal                        # DOM 传送门
│   └── BasicModal                # 基础弹层
│       └── Modal                 # 完整弹层（互斥 + shareMask）
│           ├─ Dialog / Popup / ActionSheet
│           └─ toast / notify / loading
├── UnstyledLabel                 # 无样式标签
│   ├── Line/Block/CellLabel      # 视觉风格层
│   │   └── *IOLabel → UnstyledIO* → Line*/Block*/Cell* 变体
├── Button (← BasicButton)       # 按钮
├── Form + Form.Field             # 表单系统
└── Transition* (← createTransition)  # 动画系统
```
