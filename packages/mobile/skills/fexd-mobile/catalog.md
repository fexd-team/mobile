# 组件目录

@fexd/mobile 共 127 个公开导出。按"我需要什么"组织，帮助快速找到正确组件。

> 选型不确定时 → [decision-map.md](decision-map.md) 理解组件家族 → [families/](families/) 复杂子系统 → [systems/](systems/) 业务场景模式 → [recipes/](recipes/)

---

## 我要按钮

| 需求 | 推荐 | 替代 | 不推荐 | 文档 |
| --- | --- | --- | --- | --- |
| 业务操作按钮 | **Button** | — | BasicButton（太底层） | [references/Button.md](references/Button.md) |
| 自定义按钮底层 | **BasicButton** | Button | — | [references/BasicButton.md](references/BasicButton.md) |
| 提交按钮 | **Button** `type="primary"` + `loading="auto"` | — | — | [references/Button.md](references/Button.md) |

## 我要文本输入

| 需求 | 推荐 | 替代 | 不推荐 | 文档 |
| --- | --- | --- | --- | --- |
| 默认文本输入 | **Input** (= LineInput) | LineInput | BasicInput（太底层） | [references/Input.md](references/Input.md) |
| 底部线条风格输入 | **LineInput** | Input | — | [references/LineInput.md](references/LineInput.md) |
| 块级填充风格输入 | **BlockInput** | — | — | [references/BlockInput.md](references/BlockInput.md) |
| 列表/Cell 风格输入 | **CellInput** | — | — | [references/CellInput.md](references/CellInput.md) |
| 多行文本 | **TextArea** | — | BasicTextArea（太底层） | [references/TextArea.md](references/TextArea.md) |
| 密码输入 | **Input** `type="password"` | LineInput `type="password"` | — | [references/Input.md](references/Input.md) |
| 数值输入 | **Stepper** 或 LineInput `inputMode="decimal"` | — | — | [references/Stepper.md](references/Stepper.md) |
| 自定义 IO 输入 | **UnstyledIOInput** | — | BasicInput | [references/UnstyledIOInput.md](references/UnstyledIOInput.md) |
| 完全自定义输入 | **BasicInput** | — | — | [references/BasicInput.md](references/BasicInput.md) |

## 我要选择器

| 需求 | 推荐 | 替代 | 不推荐 | 文档 |
| --- | --- | --- | --- | --- |
| 单列选择（表单内） | **LinePicker** / **CellPicker** / **BlockPicker** | — | PickerView（需自管弹层） | [references/Picker.md](references/Picker.md) |
| 级联选择（省市区） | **LineCascadePicker** / **CellCascadePicker** | — | Cascader（开发中） | [references/CascadePicker.md](references/CascadePicker.md) |
| 日期选择（表单内） | **LineDatePicker** / **CellDatePicker** | — | Calendar（开发中） | [references/DatePicker.md](references/DatePicker.md) |
| 时间选择（表单内） | **LineTimePicker** / **CellTimePicker** | — | — | [references/TimePicker.md](references/TimePicker.md) |
| 嵌入式选择面板 | **PickerView** | — | Picker（含弹层） | [references/PickerView.md](references/PickerView.md) |
| 嵌入式日期面板 | **DatePickerView** | — | — | [references/DatePickerView.md](references/DatePickerView.md) |
| 嵌入式时间面板 | **TimePickerView** | — | — | [references/TimePickerView.md](references/TimePickerView.md) |
| 嵌入式级联面板 | **CascadePickerView** | — | — | [references/CascadePickerView.md](references/CascadePickerView.md) |
| 一次性选择 | **showPicker** | — | 手动 Popup+PickerView | [references/showPicker.md](references/showPicker.md) |

## 我要弹窗/弹层

| 需求 | 推荐 | 替代 | 不推荐 | 文档 |
| --- | --- | --- | --- | --- |
| 确认/取消操作 | **showDialog** | — | showModal（太底层） | [references/Dialog.md](references/Dialog.md) |
| 底部内容面板 | **showPopup** | — | showDialog（居中，不适合大内容） | [references/Popup.md](references/Popup.md) |
| 多选项操作菜单 | **showActionSheet** | — | showPopup | [references/ActionSheet.md](references/ActionSheet.md) |
| 完全自定义弹层 | **showModal** | — | — | [references/Modal.md](references/Modal.md) |
| 持久弹层（声明式） | **Modal** / **Dialog** / **Popup** + `visible` | — | — | [references/Modal.md](references/Modal.md) |
| 绑定特定容器 | **useShowXxx** Hook | — | — | [references/useShowModal.md](references/useShowModal.md) |

## 我要反馈提示

| 需求 | 推荐 | 替代 | 不推荐 | 文档 |
| --- | --- | --- | --- | --- |
| 轻提示，自动消失 | **toast** | — | Dialog | [references/toast.md](references/toast.md) |
| 带类型图标的通知 | **notify** | — | toast（无类型图标） | [references/notify.md](references/notify.md) |
| 阻断式加载遮罩 | **loading** | — | toast | [references/loading.md](references/loading.md) |
| 非阻断加载指示 | **Spinner** | — | loading | [references/Spinner.md](references/Spinner.md) |
| 全屏加载 | **FullpageSpinner** | — | Spinner | [references/FullpageSpinner.md](references/FullpageSpinner.md) |
| 空状态 | **Empty** | — | — | [references/Empty.md](references/Empty.md) |
| 结果页 | **Result** | — | — | [references/Result.md](references/Result.md) |
| 进度条 | **ProgressBar** | — | — | [references/ProgressBar.md](references/ProgressBar.md) |
| 警告提示条 | **Alert** | — | — | [references/Alert.md](references/Alert.md) |
| 徽标/角标 | **Badge** | — | — | [references/Badge.md](references/Badge.md) |

## 我要表单

| 需求 | 推荐 | 替代 | 不推荐 | 文档 |
| --- | --- | --- | --- | --- |
| 表单容器 | **Form** + **Form.Field** | — | Form.Item（不存在） | [references/Form.md](references/Form.md) |
| 创建表单实例 | **Form.useForm()** | — | `Form.useForm()[0]`（返回值直接是实例） | [references/Form.md](references/Form.md) |
| 字段校验 | Form.Field `rules` + `field.validate()` | — | 手动 useState 管理 error | [references/Form.md](references/Form.md) |
| 字段联动 | Form.Field `watchValue` / `relative` | — | 手动 useEffect | [references/Form-advanced.md](references/Form-advanced.md) |
| 复选 | **Checkbox** | — | — | [references/Checkbox.md](references/Checkbox.md) |
| 单选 | **Radio** | — | — | [references/Radio.md](references/Radio.md) |
| 开关 | **Switch** | — | — | [references/Switch.md](references/Switch.md) |
| 滑动输入 | **Slider** | — | — | [references/Slider.md](references/Slider.md) |
| 评分 | **Rate** | — | — | [references/Rate.md](references/Rate.md) |
| 步进器 | **Stepper** | — | — | [references/Stepper.md](references/Stepper.md) |

## 我要布局

| 需求 | 推荐 | 替代 | 不推荐 | 文档 |
| --- | --- | --- | --- | --- |
| 列表/设置页 | **Cell** + **Cell.Group** | — | List（开发中） | [references/Cell.md](references/Cell.md) |
| 间距排列 | **Space** | — | — | [references/Space.md](references/Space.md) |
| 宫格布局 | **Grid** + **Grid.Item** | — | — | [references/Grid.md](references/Grid.md) |
| 滚动容器 | **ScrollView** | — | — | [references/ScrollView.md](references/ScrollView.md) |
| 折叠面板 | **Collapse** + **Collapse.Item** | — | — | [references/Collapse.md](references/Collapse.md) |
| 分割线 | **Divider** | — | — | [references/Divider.md](references/Divider.md) |
| 弹性布局 | **Flex** + **Flex.Item**（实验性） | — | — | [references/Flex.md](references/Flex.md) |
| 基础容器 | **View**（实验性） | — | — | [references/View.md](references/View.md) |
| 水印 | **Watermark** | — | — | [references/Watermark.md](references/Watermark.md) |

## 我要展示

| 需求     | 推荐                   | 替代 | 不推荐 | 文档                                             |
| -------- | ---------------------- | ---- | ------ | ------------------------------------------------ |
| 头像     | **Avatar**             | —    | —      | [references/Avatar.md](references/Avatar.md)     |
| 图标     | **Iconfont**           | —    | —      | [references/Iconfont.md](references/Iconfont.md) |
| 图片     | **Image**（实验性）    | —    | —      | [references/Image.md](references/Image.md)       |
| 轮播     | **Swiper**             | —    | —      | [references/Swiper.md](references/Swiper.md)     |
| 步骤条   | **Steps**              | —    | —      | [references/Steps.md](references/Steps.md)       |
| 时间线   | **Timeline**（实验性） | —    | —      | [references/Timeline.md](references/Timeline.md) |
| 404 页面 | **NotFound**           | —    | —      | [references/NotFound.md](references/NotFound.md) |

## 我要导航

| 需求 | 推荐 | 替代 | 不推荐 | 文档 |
| --- | --- | --- | --- | --- |
| 顶部导航栏 | **NavBar** | — | — | [references/NavBar.md](references/NavBar.md) |
| 底部标签栏 | **TabBar** + **TabBar.Item** | — | Footer（开发中） | [references/TabBar.md](references/TabBar.md) |
| 页内选项卡 | **Tabs** | — | SegmentedControl（开发中） | [references/Tabs.md](references/Tabs.md) |

## 我要动画

| 需求 | 推荐 | 替代 | 不推荐 | 文档 |
| --- | --- | --- | --- | --- |
| 淡入淡出 | **TransitionFade** | — | — | [references/TransitionFade.md](references/TransitionFade.md) |
| 底部弹出 | **TransitionSlideUp** | — | — | [references/TransitionSlideUp.md](references/TransitionSlideUp.md) |
| 顶部滑入 | **TransitionSlideDown** | — | — | [references/TransitionSlideDown.md](references/TransitionSlideDown.md) |
| 淡入+滑动 | **TransitionFadeSlideUp** / **TransitionFadeSlideDown** | — | — | [references/TransitionFadeSlideUp.md](references/TransitionFadeSlideUp.md) |
| Tab 切换 | **TransitionSwitch** | — | — | [references/TransitionSwitch.md](references/TransitionSwitch.md) |
| 无动画 | **TransitionNone** | — | — | [references/TransitionNone.md](references/TransitionNone.md) |
| 自定义动画 | **createTransition** | — | — | [references/createTransition.md](references/createTransition.md) |

## 我要基础/工具

| 需求          | 推荐              | 文档                                                       |
| ------------- | ----------------- | ---------------------------------------------------------- |
| 全局配置      | **Provider**      | [references/Provider.md](references/Provider.md)           |
| DOM 传送门    | **Portal**        | [references/Portal.md](references/Portal.md)               |
| 错误边界      | **ErrorBoundary** | [references/ErrorBoundary.md](references/ErrorBoundary.md) |
| Suspense 降级 | **Fallback**      | [references/Fallback.md](references/Fallback.md)           |
| JSX 内联 Hook | **Hook**          | [references/Hook.md](references/Hook.md)                   |
| 唯一 ID       | **uniqueId**      | [references/uniqueId.md](references/uniqueId.md)           |

## Hooks

详见 [utilities.md](utilities.md)。

| Hook               | 说明                    | 文档                                                                 |
| ------------------ | ----------------------- | -------------------------------------------------------------------- |
| useIOControl       | 受控/非受控值管理       | [references/useIOControl.md](references/useIOControl.md)             |
| useTouch           | 触摸/鼠标事件标准化     | [references/useTouch.md](references/useTouch.md)                     |
| useTween           | 数值动画                | [references/useTween.md](references/useTween.md)                     |
| useSize            | 元素尺寸监听            | [references/useSize.md](references/useSize.md)                       |
| useThrottleFn      | 函数节流                | [references/useThrottleFn.md](references/useThrottleFn.md)           |
| useShowModal       | showModal Hook 版       | [references/useShowModal.md](references/useShowModal.md)             |
| useShowDialog      | showDialog Hook 版      | [references/useShowDialog.md](references/useShowDialog.md)           |
| useShowPopup       | showPopup Hook 版       | [references/useShowPopup.md](references/useShowPopup.md)             |
| useShowActionSheet | showActionSheet Hook 版 | [references/useShowActionSheet.md](references/useShowActionSheet.md) |

## 工厂函数

详见 [utilities.md](utilities.md)。

| 工厂              | 说明                        | 文档                                                               |
| ----------------- | --------------------------- | ------------------------------------------------------------------ |
| createForm        | 创建表单实例                | [references/createForm.md](references/createForm.md)               |
| createModalAPI    | 声明式组件转命令式 API      | [references/createModalAPI.md](references/createModalAPI.md)       |
| createUseModalAPI | 命令式 API 转 Hook          | [references/createUseModalAPI.md](references/createUseModalAPI.md) |
| createTransition  | 动画组件工厂                | [references/createTransition.md](references/createTransition.md)   |
| createFC          | 创建 memo+forwardRef 组件   | [references/createFC.md](references/createFC.md)                   |
| cloneFC           | 克隆组件并覆盖 defaultProps | [references/cloneFC.md](references/cloneFC.md)                     |

---

## 开发中组件（不可使用）

以下 31 个组件处于开发阶段，API 不稳定，未从 `@fexd/mobile` 导出，**禁止使用**：

Breadcrumb, Calendar, Card, Cascader, CountDown, CountTo, Drag, Drawer, Dropdown, Elevator, Footer, Gallery, ImagePicker, List, Marquee, Menu, NoticeBar, NumberKeyboard, Pagination, Search, SegmentedControl, ShareSheet, Skeleton, Sticky, SwipeAction, Table, Tag, Tips, TreeSelect, Video, Waterfall
