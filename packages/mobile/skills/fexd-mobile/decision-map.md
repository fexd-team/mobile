# 组件选型决策表

当多个组件看似都能满足需求时，按本文件决策。先匹配场景，再读对应 reference。

## 我要按钮

| 场景                        | 推荐                                           | 不推荐      |
| --------------------------- | ---------------------------------------------- | ----------- |
| 业务页面的操作按钮          | **Button**                                     | BasicButton |
| 自定义按钮底层/构建按钮变体 | **BasicButton**                                | Button      |
| 提交表单                    | **Button** `type="primary"` + `loading="auto"` | —           |

## 我要文本输入

| 场景                             | 推荐                | 不推荐                                  |
| -------------------------------- | ------------------- | --------------------------------------- |
| 默认文本输入（等同于 LineInput） | **Input**           | BasicInput                              |
| 多行文本                         | **TextArea**        | BasicTextArea                           |
| 列表/Cell 风格表单中的输入       | **CellInput**       | Input（裸用需自行套 Label）             |
| 块级填充风格表单中的输入         | **BlockInput**      | Input                                   |
| 底部线条风格表单中的输入         | **LineInput**       | Input（LineInput 是 Input 的完整形态）  |
| 构建自定义 IO 输入组件           | **UnstyledIOInput** | BasicInput（BasicInput 无 IO 分层能力） |
| 构建完全自定义输入（无 IO 体系） | **BasicInput**      | UnstyledIOInput（有 IO 体系约束）       |
| 多行输入底层                     | **BasicTextArea**   | TextArea（TextArea 已有 IO 分层）       |

**关键区分**：`Input` 是 `LineInput` 的别名。业务代码中直接用 `LineInput`/`BlockInput`/`CellInput` 选择布局风格，不要裸用 `Input` 再手动套 Label。

## 我要选择器

| 场景 | 推荐 | 不推荐 |
| --- | --- | --- |
| 单列选项（如性别/学历） | **LinePicker** / **CellPicker** / **BlockPicker** | PickerView（需要自行管理弹层） |
| 多级联动（如省市区） | **LineCascadePicker** / **CellCascadePicker** / **BlockCascadePicker** | Cascader（开发中，不可用） |
| 日期选择 | **LineDatePicker** / **CellDatePicker** / **BlockDatePicker** | Calendar（开发中，不可用） |
| 时间选择 | **LineTimePicker** / **CellTimePicker** / **BlockTimePicker** | — |
| 嵌入式面板（不需要弹层） | **PickerView** / **DatePickerView** / **TimePickerView** / **CascadePickerView** | Picker（含弹层，不适合嵌入） |
| 一次性选择（命令式，无需组件） | **showPicker** | 手动组合 Popup + PickerView |
| 自定义 IO 选择器 | **UnstyledIOPicker** / **UnstyledIODatePicker** 等 | — |

**布局风格选择**：Line/Cell/Block 跟随项目已有风格。如果项目中没有先例，查看设计稿或问用户偏好。

## 我要弹窗/弹层

| 场景 | 推荐 | 不推荐 |
| --- | --- | --- |
| 确认/取消操作 | **showDialog** | showModal（太底层）、showPopup（太重） |
| 底部复杂内容面板 | **showPopup** | showDialog（居中，不适合大内容） |
| 多选项操作菜单 | **showActionSheet** | showPopup（操作菜单更轻量） |
| 自定义富内容弹层 | **showModal** | showDialog（只有标题+按钮） |
| 轻提示，1-2 秒自动消失 | **toast** | notify（更重，带类型图标） |
| 通知条（带 info/success/warning/error 图标） | **notify** | toast（无类型图标区分） |
| 全屏加载遮罩 | **loading** | toast |
| 需要持久存在的弹层（声明式） | **Modal** / **Dialog** / **Popup** 组件 + `visible` | — |
| 需要自定义 Hook 调用 | **useShowModal** / **useShowDialog** / **useShowPopup** | — |

## 声明式 vs 命令式 vs Hook

| 调用方式 | 适用场景 | 典型 API |
| --- | --- | --- |
| **命令式** `showXxx()` | 一次性/临时交互，不需要持久状态 | showDialog, showPopup, showActionSheet, showModal, showPicker, toast, notify, loading |
| **声明式** `<Xxx visible={...}>` | 持久存在于页面结构中，需精细控制生命周期 | Modal, Dialog, Popup, ActionSheet |
| **Hook** `useShowXxx()` | 需要绑定到特定 ModalStation（如局部容器） | useShowModal, useShowDialog, useShowPopup, useShowActionSheet |

**默认选命令式**。只有以下情况选声明式或 Hook：

- 弹层需要跟随组件生命周期（声明式）
- 弹层需要挂载到特定容器而非全局（Hook）
- 弹层需要频繁 update 内容（Hook 的 `show` 返回 `update`）

## 我要反馈/状态提示

| 场景                     | 推荐                                       | 不推荐                          |
| ------------------------ | ------------------------------------------ | ------------------------------- |
| 操作成功/失败轻提示      | **toast.success** / **toast.fail**         | Dialog                          |
| 顶部通知条（带类型图标） | **notify.success** / **notify.warning** 等 | toast（无类型图标）             |
| 异步操作加载遮罩         | **loading.show** / **loading.hide**        | FullpageSpinner（非命令式）     |
| 非阻断加载指示           | **Spinner**                                | loading（loading 是阻断式遮罩） |
| 全屏加载页               | **FullpageSpinner**                        | Spinner（太小）                 |
| 空状态                   | **Empty**                                  | —                               |
| 操作结果页               | **Result**                                 | —                               |
| 进度条                   | **ProgressBar**                            | —                               |

## 我要表单

| 场景               | 推荐                                       | 不推荐                                            |
| ------------------ | ------------------------------------------ | ------------------------------------------------- |
| 表单容器           | **Form** + **Form.Field**                  | Form.Item（不存在）                               |
| 创建表单实例       | **Form.useForm()**                         | useForm().current（返回值本身就是实例，不是数组） |
| 字段校验           | Form.Field 的 `rules` + `field.validate()` | 自行 useState 管理 error                          |
| 字段联动           | Form.Field 的 `watchValue` / `relative`    | 自行 useEffect                                    |
| 非组件环境创建实例 | **Form.createForm()**                      | Form.useForm（Hook 不能在组件外使用）             |

## 我要导航

| 场景       | 推荐                               | 不推荐           |
| ---------- | ---------------------------------- | ---------------- |
| 顶部导航栏 | **NavBar**                         | —                |
| 底部标签栏 | **TabBar** + **TabBar.Item**       | Footer（开发中） |
| 页内选项卡 | **Tabs**（数据驱动，传 data 数组） | —                |

## 我要布局

| 场景                          | 推荐                             | 不推荐 |
| ----------------------------- | -------------------------------- | ------ |
| 列表/设置页                   | **Cell** + **Cell.Group**        | —      |
| 间距排列                      | **Space**                        | —      |
| 宫格                          | **Grid** + **Grid.Item**         | —      |
| 滚动容器（下拉刷新/无限滚动） | **ScrollView**                   | —      |
| 折叠面板                      | **Collapse** + **Collapse.Item** | —      |
| 分割线                        | **Divider**                      | —      |
| 弹性布局                      | **Flex** + **Flex.Item**         | —      |
| 基础容器                      | **View**                         | —      |

## 我要动画/过渡

| 场景         | 推荐                        |
| ------------ | --------------------------- |
| 淡入淡出     | **TransitionFade**          |
| 底部弹出     | **TransitionSlideUp**       |
| 顶部滑入     | **TransitionSlideDown**     |
| 淡入+上滑    | **TransitionFadeSlideUp**   |
| 淡入+下滑    | **TransitionFadeSlideDown** |
| Tab 内容切换 | **TransitionSwitch**        |
| 无动画       | **TransitionNone**          |
| 自定义动画   | **createTransition** 工厂   |

## primitive vs business 组件

@fexd/mobile 中存在两层抽象：

| 前缀 | 层级 | 说明 | 业务使用 |
| --- | --- | --- | --- |
| **Basic\*** | 原始层 | 无样式/最少样式，只提供结构和交互 | 仅构建自定义变体时使用 |
| **Unstyled\*** | IO 原语层 | 有 IO 能力但无视觉风格，通过 `theme` 注入 | 仅构建自定义 IO 组件时使用 |
| **无前缀** / **Line*/Block*/Cell\*** | 业务层 | 完整功能+样式，可直接使用 | 默认选择 |

**规则**：业务代码永远优先选无前缀或 Line/Block/Cell 前缀的组件。Basic* 和 UnstyledIO* 除非你在构建新的组件变体，否则不应出现。
