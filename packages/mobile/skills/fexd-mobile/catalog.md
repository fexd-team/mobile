# 组件目录

@fexd/mobile 共 128 个稳定导出，按功能分为 6 大类。每个组件的详细用法见 `references/{NAME}.md`。

## 输入类（/data）

### UI 组件

| 名称 | 类型 | 说明 | 关联 | 坑点/建议 | 文档 |
| --- | --- | --- | --- | --- | --- |
| Button | 组件 | 按钮，支持 5 种类型、4 种尺寸、loading 状态 | BasicButton（底层） | `loading="auto"` 需 onClick 返回 Promise | [references/Button.md](references/Button.md) |
| BasicButton | 组件 | 无样式按钮底层，仅结构和交互 | Button | 优先用 Button，仅完全自定义时用 | [references/BasicButton.md](references/BasicButton.md) |
| Input | 组件 | 文本输入框（LineInput 的别名） | LineInput, BasicInput, TextArea | 实际是 IO 分层的顶层组件 | [references/Input.md](references/Input.md) |
| BasicInput | 组件 | 无样式输入框底层 | Input | 仅完全自定义时使用 | [references/BasicInput.md](references/BasicInput.md) |
| TextArea | 组件 | 多行文本输入 | BasicTextArea, Input | 自动高度需设 autoSize | [references/TextArea.md](references/TextArea.md) |
| BasicTextArea | 组件 | 无样式多行输入底层 | TextArea | 仅完全自定义时使用 | [references/BasicTextArea.md](references/BasicTextArea.md) |
| Checkbox | 组件 | 复选框 | Radio | — | [references/Checkbox.md](references/Checkbox.md) |
| Radio | 组件 | 单选框 | Checkbox | — | [references/Radio.md](references/Radio.md) |
| Switch | 组件 | 开关切换 | — | — | [references/Switch.md](references/Switch.md) |
| Slider | 组件 | 滑动输入条 | — | — | [references/Slider.md](references/Slider.md) |
| Rate | 组件 | 评分 | — | — | [references/Rate.md](references/Rate.md) |
| Stepper | 组件 | 步进器（加减输入） | — | — | [references/Stepper.md](references/Stepper.md) |
| Form | 组件 | 表单容器 | Form.Field, createForm | strict 模式默认开启 | [references/Form.md](references/Form.md) |
| DatePicker | 组件 | 日期选择器弹层 | DatePickerView, Line/Block/CellDatePicker | — | [references/DatePicker.md](references/DatePicker.md) |
| DatePickerView | 组件 | 日期选择器面板（无弹层） | DatePicker | 嵌入式场景使用 | [references/DatePickerView.md](references/DatePickerView.md) |
| TimePicker | 组件 | 时间选择器弹层 | TimePickerView, Line/Block/CellTimePicker | — | [references/TimePicker.md](references/TimePicker.md) |
| TimePickerView | 组件 | 时间选择器面板（无弹层） | TimePicker | 嵌入式场景使用 | [references/TimePickerView.md](references/TimePickerView.md) |
| Picker | 组件 | 通用选择器弹层 | PickerView, Line/Block/CellPicker, showPicker | — | [references/Picker.md](references/Picker.md) |
| PickerView | 组件 | 选择器面板（无弹层） | Picker | 嵌入式场景使用 | [references/PickerView.md](references/PickerView.md) |
| CascadePicker | 组件 | 级联选择器弹层 | CascadePickerView, Line/Block/CellCascadePicker | 多级联动数据选择（如省市区） | [references/CascadePicker.md](references/CascadePicker.md) |
| CascadePickerView | 组件 | 级联选择器面板（无弹层） | CascadePicker | 嵌入式场景使用 | [references/CascadePickerView.md](references/CascadePickerView.md) |

### IO 分层变体（Line / Block / Cell 三种布局风格）

| 名称 | 布局风格 | 能力 | 对应 Unstyled | 文档 |
| --- | --- | --- | --- | --- |
| LineInput | 底部线条 | 文本输入 | UnstyledIOInput | [references/LineInput.md](references/LineInput.md) |
| BlockInput | 块级填充 | 文本输入 | UnstyledIOInput | [references/BlockInput.md](references/BlockInput.md) |
| CellInput | 列表单元格 | 文本输入 | UnstyledIOInput | [references/CellInput.md](references/CellInput.md) |
| LinePicker | 底部线条 | 选择器 | UnstyledIOPicker | [references/LinePicker.md](references/LinePicker.md) |
| BlockPicker | 块级填充 | 选择器 | UnstyledIOPicker | [references/BlockPicker.md](references/BlockPicker.md) |
| CellPicker | 列表单元格 | 选择器 | UnstyledIOPicker | [references/CellPicker.md](references/CellPicker.md) |
| LineDatePicker | 底部线条 | 日期选择 | UnstyledIODatePicker | [references/LineDatePicker.md](references/LineDatePicker.md) |
| BlockDatePicker | 块级填充 | 日期选择 | UnstyledIODatePicker | [references/BlockDatePicker.md](references/BlockDatePicker.md) |
| CellDatePicker | 列表单元格 | 日期选择 | UnstyledIODatePicker | [references/CellDatePicker.md](references/CellDatePicker.md) |
| LineTimePicker | 底部线条 | 时间选择 | UnstyledIOTimePicker | [references/LineTimePicker.md](references/LineTimePicker.md) |
| BlockTimePicker | 块级填充 | 时间选择 | UnstyledIOTimePicker | [references/BlockTimePicker.md](references/BlockTimePicker.md) |
| CellTimePicker | 列表单元格 | 时间选择 | UnstyledIOTimePicker | [references/CellTimePicker.md](references/CellTimePicker.md) |
| LineCascadePicker | 底部线条 | 级联选择 | UnstyledIOCascadePicker | [references/LineCascadePicker.md](references/LineCascadePicker.md) |
| BlockCascadePicker | 块级填充 | 级联选择 | UnstyledIOCascadePicker | [references/BlockCascadePicker.md](references/BlockCascadePicker.md) |
| CellCascadePicker | 列表单元格 | 级联选择 | UnstyledIOCascadePicker | [references/CellCascadePicker.md](references/CellCascadePicker.md) |

### IO 分层底层组件

| 名称 | 层级 | 说明 | 文档 |
| --- | --- | --- | --- |
| UnstyledLabel | Label 层 | 无样式标签 | [references/UnstyledLabel.md](references/UnstyledLabel.md) |
| LineLabel | Label 层 | 线条风格标签 | [references/LineLabel.md](references/LineLabel.md) |
| BlockLabel | Label 层 | 块级风格标签 | [references/BlockLabel.md](references/BlockLabel.md) |
| CellLabel | Label 层 | 单元格风格标签 | [references/CellLabel.md](references/CellLabel.md) |
| LineIOLabel | IOLabel 层 | 线条风格表单字段标签 | [references/LineIOLabel.md](references/LineIOLabel.md) |
| BlockIOLabel | IOLabel 层 | 块级风格表单字段标签 | [references/BlockIOLabel.md](references/BlockIOLabel.md) |
| CellIOLabel | IOLabel 层 | 单元格风格表单字段标签 | [references/CellIOLabel.md](references/CellIOLabel.md) |
| UnstyledIOLabel | IOLabel 层 | 无样式表单字段标签 | [references/UnstyledIOLabel.md](references/UnstyledIOLabel.md) |
| UnstyledIOInput | Unstyled IO 层 | 无样式文本输入 | [references/UnstyledIOInput.md](references/UnstyledIOInput.md) |
| UnstyledIOPicker | Unstyled IO 层 | 无样式选择器 | [references/UnstyledIOPicker.md](references/UnstyledIOPicker.md) |
| UnstyledIODatePicker | Unstyled IO 层 | 无样式日期选择 | [references/UnstyledIODatePicker.md](references/UnstyledIODatePicker.md) |
| UnstyledIOTimePicker | Unstyled IO 层 | 无样式时间选择 | [references/UnstyledIOTimePicker.md](references/UnstyledIOTimePicker.md) |
| UnstyledIOCascadePicker | Unstyled IO 层 | 无样式级联选择 | [references/UnstyledIOCascadePicker.md](references/UnstyledIOCascadePicker.md) |

## 反馈组件选型速查

| 场景                 | 推荐            | 不推荐                  |
| -------------------- | --------------- | ----------------------- |
| 简单确认/取消        | showDialog      | showModal               |
| 底部面板（复杂内容） | showPopup       | showDialog              |
| 操作菜单（多个选项） | showActionSheet | showPopup               |
| 轻提示（不阻断交互） | toast           | notify                  |
| 通知条（带类型图标） | notify          | toast                   |
| 全屏加载遮罩         | loading         | toast                   |
| 命令式选择器         | showPicker      | 手动弹 Popup+PickerView |

## 反馈类（/feedback）

| 名称 | 类型 | 说明 | 命令式 API | 坑点/建议 | 文档 |
| --- | --- | --- | --- | --- | --- |
| Modal | 组件 | 模态框，支持互斥控制 | showModal / useShowModal | 声明式需自行管理 visible | [references/Modal.md](references/Modal.md) |
| BasicModal | 组件 | 基础模态框，不含互斥 | — | 一般不直接使用 | [references/BasicModal.md](references/BasicModal.md) |
| Dialog | 组件 | 对话框（居中，含标题/按钮） | showDialog / useShowDialog | — | [references/Dialog.md](references/Dialog.md) |
| Popup | 组件 | 底部弹出面板 | showPopup / useShowPopup | — | [references/Popup.md](references/Popup.md) |
| ActionSheet | 组件 | 操作菜单 | showActionSheet / useShowActionSheet | — | [references/ActionSheet.md](references/ActionSheet.md) |
| Overlay | 组件 | 遮罩层 | — | 一般不直接使用，被 Modal 内部使用 | [references/Overlay.md](references/Overlay.md) |
| toast | 命令式 API | 轻提示 | toast.info/success/warn/fail | 默认不阻断交互，1800ms 后消失 | [references/toast.md](references/toast.md) |
| notify | 命令式 API | 通知条 | notify.info/success/warning/error | 默认 2600ms，注意方法名与 toast 不同 | [references/notify.md](references/notify.md) |
| loading | 命令式 API | 加载指示器 | loading.show/hide | show/hide 引用计数，必须成对调用 | [references/loading.md](references/loading.md) |
| showModal | 命令式 API | 命令式打开 Modal | — | 返回 { close, update, promise } | [references/showModal.md](references/showModal.md) |
| showDialog | 命令式 API | 命令式打开 Dialog | — | 同上 | [references/showDialog.md](references/showDialog.md) |
| showPopup | 命令式 API | 命令式打开 Popup | — | 同上 | [references/showPopup.md](references/showPopup.md) |
| showActionSheet | 命令式 API | 命令式打开 ActionSheet | — | 同上 | [references/showActionSheet.md](references/showActionSheet.md) |
| showPicker | 命令式 API | 命令式选择器 | — | await 返回选中值 | [references/showPicker.md](references/showPicker.md) |
| useShowModal | Hook | showModal 的 Hook 版 | — | 返回 [show, stationNode] | [references/useShowModal.md](references/useShowModal.md) |
| useShowDialog | Hook | showDialog 的 Hook 版 | — | 同上 | [references/useShowDialog.md](references/useShowDialog.md) |
| useShowPopup | Hook | showPopup 的 Hook 版 | — | 同上 | [references/useShowPopup.md](references/useShowPopup.md) |
| useShowActionSheet | Hook | showActionSheet 的 Hook 版 | — | 同上 | [references/useShowActionSheet.md](references/useShowActionSheet.md) |
| modalConflict | 工具 | 弹层互斥控制器 | — | handlers: mask/hidden/offsetByPlacement | [references/modalConflict.md](references/modalConflict.md) |
| modalStore | 工具 | 全局弹层状态管理 | — | eventBus 监听中不要调命令式 API | [references/modalStore.md](references/modalStore.md) |
| ModalStation | 组件 | 命令式弹层渲染容器 | — | 一般不直接使用，Provider 已包含 | [references/ModalStation.md](references/ModalStation.md) |

## 布局类（/layout）

| 名称 | 类型 | 说明 | 子组件 | 坑点/建议 | 文档 |
| --- | --- | --- | --- | --- | --- |
| Cell | 组件 | 列表单元格 | Cell.Group | — | [references/Cell.md](references/Cell.md) |
| Collapse | 组件 | 折叠面板 | Collapse.Item | — | [references/Collapse.md](references/Collapse.md) |
| Divider | 组件 | 分割线 | — | — | [references/Divider.md](references/Divider.md) |
| Grid | 组件 | 宫格布局 | Grid.Item | — | [references/Grid.md](references/Grid.md) |
| ScrollView | 组件 | 滚动容器 | — | — | [references/ScrollView.md](references/ScrollView.md) |
| Space | 组件 | 间距容器 | — | — | [references/Space.md](references/Space.md) |
| Watermark | 组件 | 水印（收录 @pansy/react-watermark） | — | — | [references/Watermark.md](references/Watermark.md) |
| Flex | 组件 | 栅格布局（实验性） | Flex.Item | 12 栅格 + 响应式，API 可能变化 | [references/Flex.md](references/Flex.md) |
| View | 组件 | 基础容器（实验性） | — | 自带 display:flex + box-sizing | [references/View.md](references/View.md) |

## 展示类（/display）

| 名称 | 类型 | 说明 | 坑点/建议 | 文档 |
| --- | --- | --- | --- | --- | --- |
| Alert | 组件 | 警告提示条 | 4 种 type：info/success/warning/error | [references/Alert.md](references/Alert.md) |
| Avatar | 组件 | 头像 | — | [references/Avatar.md](references/Avatar.md) |
| Badge | 组件 | 徽标/角标 | 含 Badge.Stamp 子组件 | [references/Badge.md](references/Badge.md) |
| Empty | 组件 | 空状态 | — | [references/Empty.md](references/Empty.md) |
| Iconfont | 组件 | 图标字体组件 | 图标资源已内置，通过 type 指定 | [references/Iconfont.md](references/Iconfont.md) |
| Image | 组件 | 图片（实验性） | API 可能变化 | [references/Image.md](references/Image.md) |
| NotFound | 组件 | 404 页面 | — | [references/NotFound.md](references/NotFound.md) |
| ProgressBar | 组件 | 进度条 | — | [references/ProgressBar.md](references/ProgressBar.md) |
| Result | 组件 | 结果页 | — | [references/Result.md](references/Result.md) |
| Spinner | 组件 | 加载指示器 | — | [references/Spinner.md](references/Spinner.md) |
| Steps | 组件 | 步骤条 | Steps.Item | 数据驱动，传入 data 数组 | [references/Steps.md](references/Steps.md) |
| Swiper | 组件 | 轮播/滑动 | — | — | [references/Swiper.md](references/Swiper.md) |
| Timeline | 组件 | 时间线（实验性） | — | 数据驱动 | [references/Timeline.md](references/Timeline.md) |
| DemoBlock | 组件 | Demo 展示容器 | 开发文档用 | [references/DemoBlock.md](references/DemoBlock.md) |

### 过渡动画组件

| 名称 | 效果 | 典型场景 | 文档 |
| --- | --- | --- | --- |
| TransitionFade | 淡入淡出 | Modal 默认 | [references/TransitionFade.md](references/TransitionFade.md) |
| TransitionSlideUp | 从下往上 | Popup、底部面板 | [references/TransitionSlideUp.md](references/TransitionSlideUp.md) |
| TransitionSlideDown | 从上往下 | 顶部通知 | [references/TransitionSlideDown.md](references/TransitionSlideDown.md) |
| TransitionFadeSlideUp | 淡入+上滑 | 组合效果 | [references/TransitionFadeSlideUp.md](references/TransitionFadeSlideUp.md) |
| TransitionFadeSlideDown | 淡入+下滑 | 组合效果 | [references/TransitionFadeSlideDown.md](references/TransitionFadeSlideDown.md) |
| TransitionNone | 无动画 | 性能优先 | [references/TransitionNone.md](references/TransitionNone.md) |
| TransitionSwitch | 内容切换 | Tab 切换 | [references/TransitionSwitch.md](references/TransitionSwitch.md) |

## 导航类（/navigation）

| 名称 | 类型 | 说明 | 子组件 | 坑点/建议 | 文档 |
| --- | --- | --- | --- | --- | --- |
| NavBar | 组件 | 顶部导航栏 | — | — | [references/NavBar.md](references/NavBar.md) |
| TabBar | 组件 | 底部标签栏 | TabBar.Item | — | [references/TabBar.md](references/TabBar.md) |
| Tabs | 组件 | 标签页/选项卡 | Tabs.Item | 数据驱动，传入 data 数组 | [references/Tabs.md](references/Tabs.md) |

## 其他/基础（/other）

| 名称 | 类型 | 说明 | 坑点/建议 | 文档 |
| --- | --- | --- | --- | --- |
| Provider | 组件 | 全局配置提供者 | 推荐在应用根组件使用，提供默认 ModalStation | [references/Provider.md](references/Provider.md) |
| Portal | 组件 | DOM 传送门 | 默认渲染到 document.body | [references/Portal.md](references/Portal.md) |
| ErrorBoundary | 组件 | 错误边界 | — | [references/ErrorBoundary.md](references/ErrorBoundary.md) |
| Fallback | 组件 | 加载降级 | — | [references/Fallback.md](references/Fallback.md) |
| FullpageSpinner | 组件 | 全屏加载指示器 | — | [references/FullpageSpinner.md](references/FullpageSpinner.md) |
| Hook | 组件 | 匿名组件作用域 | 在 JSX 中内联使用 hooks | [references/Hook.md](references/Hook.md) |

### 工具函数（详见 [utilities.md](utilities.md)）

| 名称 | 类型 | 说明 | 文档 |
| --- | --- | --- | --- |
| createFC | 工厂函数 | 创建 memo+forwardRef 组件 | [references/createFC.md](references/createFC.md) |
| cloneFC | 工厂函数 | 克隆 createFC 组件并覆盖 defaultProps | [references/cloneFC.md](references/cloneFC.md) |
| createForm | 工厂函数 | 创建表单实例 | [references/createForm.md](references/createForm.md) |
| createModalAPI | 工厂函数 | 声明式组件转命令式 API | [references/createModalAPI.md](references/createModalAPI.md) |
| createUseModalAPI | 工厂函数 | 命令式 API 转 Hook | [references/createUseModalAPI.md](references/createUseModalAPI.md) |
| createTransition | 工厂函数 | 动画组件工厂 | [references/createTransition.md](references/createTransition.md) |
| uniqueId | 工具 | 生成唯一 ID | [references/uniqueId.md](references/uniqueId.md) |

### Hooks（详见 [utilities.md](utilities.md)）

| 名称 | 说明 | 文档 |
| --- | --- | --- |
| useTouch | 触摸/鼠标事件标准化 | [references/useTouch.md](references/useTouch.md) |
| useIOControl | 受控/非受控值管理 | [references/useIOControl.md](references/useIOControl.md) |
| useTextFieldProps | 文本输入字段属性组装 | [references/useTextFieldProps.md](references/useTextFieldProps.md) |
| useSelectionFieldProps | 选择字段属性组装 | [references/useSelectionFieldProps.md](references/useSelectionFieldProps.md) |
| usePickerProps | Picker 属性组装 | [references/usePickerProps.md](references/usePickerProps.md) |
| useSize | 元素尺寸监听 | [references/useSize.md](references/useSize.md) |
| useScrollLock | 滚动锁定 | [references/useScrollLock.md](references/useScrollLock.md) |
| useForcedUpdate | 强制重渲染 | [references/useForcedUpdate.md](references/useForcedUpdate.md) |
| useTween | 数值动画 | [references/useTween.md](references/useTween.md) |
| useThrottleFn | 函数节流 | [references/useThrottleFn.md](references/useThrottleFn.md) |
| usePickerNumberColumn | 数值范围列生成 | [references/usePickerNumberColumn.md](references/usePickerNumberColumn.md) |

---

## 开发中组件（不可使用）

以下 31 个组件处于开发阶段，API 不稳定，未从 `@fexd/mobile` 导出，**禁止使用**：

Breadcrumb, Calendar, Card, Cascader, CountDown, CountTo, Drag, Drawer, Dropdown, Elevator, Footer, Gallery, ImagePicker, List, Marquee, Menu, NoticeBar, NumberKeyboard, Pagination, Search, SegmentedControl, ShareSheet, Skeleton, Sticky, SwipeAction, Table, Tag, Tips, TreeSelect, Video, Waterfall
