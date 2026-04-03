# 工具函数

## Hooks — 推荐业务使用

### useSize

元素尺寸监听，基于 ResizeObserver。

```jsx
import { useSize } from '@fexd/mobile'

const ref = useRef(null)
const { width, height } = useSize(ref)
```

→ [references/useSize.md](references/useSize.md)

### useThrottleFn

函数节流 Hook。

```jsx
import { useThrottleFn } from '@fexd/mobile'

const throttledScroll = useThrottleFn((e) => {
  console.log(e.target.scrollTop)
}, 100)
```

→ [references/useThrottleFn.md](references/useThrottleFn.md)

### useIOControl

受控/非受控值管理，带焦点感知。自定义输入组件时很有用。

```jsx
import { useIOControl } from '@fexd/mobile'

const { value, setValue, focused, setFocused } = useIOControl({
  defaultValue: '',
  value: props.value,
  onChange: props.onChange,
  filterIOValue: (v) => v.length <= 100,
})
```

焦点期间自动切换为非受控模式，避免输入中途被外部 value 覆盖。

→ [references/useIOControl.md](references/useIOControl.md)

### useTween

数值动画，基于 `@fexd/tools` 的 Tween。

```jsx
import { useTween } from '@fexd/mobile'

const { value, run, stop, to } = useTween(targetValue, {
  duration: 300,
  ease: 'easeOutQuad',
})
```

→ [references/useTween.md](references/useTween.md)

### useTouch ⚡ 进阶

触摸/鼠标事件标准化，提供位置、增量、偏移、轨迹追踪。适用于自定义手势场景（滑块、拖拽），学习曲线较高。

```jsx
import { useTouch } from '@fexd/mobile'

const ref = useRef(null)
const { main, touches } = useTouch(ref, {
  rate: 16,
  preventDefault: true,
  onStart: (touches) => {},
  onMove: (touches) => {},
  onEnd: (touches) => {},
})
```

→ [references/useTouch.md](references/useTouch.md)

## Hooks — 内部使用（不建议业务直接调用）

以下 hooks 是 IO 分层体系的内部构件，与库内组件强耦合，业务代码不应直接使用：

| Hook | 说明 | 参考 |
| --- | --- | --- |
| useTextFieldProps | 文本输入字段属性组装，强耦合 IO 系统 | [references/useTextFieldProps.md](references/useTextFieldProps.md) |
| useSelectionFieldProps | 选择字段属性组装，强耦合 IO 系统 | [references/useSelectionFieldProps.md](references/useSelectionFieldProps.md) |
| usePickerProps | Picker 属性组装，绑定 Popup + 图标 | [references/usePickerProps.md](references/usePickerProps.md) |
| useScrollLock | 滚动锁定，依赖库内 CSS 类名 | [references/useScrollLock.md](references/useScrollLock.md) |
| useForcedUpdate | 强制重渲染，反模式 | [references/useForcedUpdate.md](references/useForcedUpdate.md) |

## 工厂函数

### 业务常用

| 工厂 | 说明 | 参考 |
| --- | --- | --- |
| createForm | 创建表单实例，支持验证/监听/strict 模式 | [references/createForm.md](references/createForm.md) |
| createModalAPI | 声明式组件转命令式 API（返回 `{ close, update, promise }`） | [references/createModalAPI.md](references/createModalAPI.md) |
| createUseModalAPI | 命令式 API 转 Hook 版本 | [references/createUseModalAPI.md](references/createUseModalAPI.md) |
| createTransition | 动画组件工厂（CSS class + 速度预设） | [references/createTransition.md](references/createTransition.md) |

### 内部 / 进阶

| 工厂 | 说明 | 参考 |
| --- | --- | --- |
| createFC | 创建 memo+forwardRef+defaultProps 组件，所有 @fexd/mobile 组件均通过此函数创建 | [references/createFC.md](references/createFC.md) |
| cloneFC | 克隆 createFC 组件并覆盖 defaultProps，IO 分层核心机制 | [references/cloneFC.md](references/cloneFC.md) |

## 命令式 API

详细用法和配置见各自 references 文档。

| API | 说明 | 参考 |
| --- | --- | --- |
| toast | 轻提示（info/success/warn/fail），默认 1800ms | [references/toast.md](references/toast.md) |
| notify | 通知条（info/success/warning/error），默认 2600ms | [references/notify.md](references/notify.md) |
| loading | 加载指示器，引用计数机制 | [references/loading.md](references/loading.md) |
| showModal | 命令式打开 Modal | [references/showModal.md](references/showModal.md) |
| showDialog | 命令式打开 Dialog | [references/showDialog.md](references/showDialog.md) |
| showPopup | 命令式打开 Popup | [references/showPopup.md](references/showPopup.md) |
| showActionSheet | 命令式打开 ActionSheet | [references/showActionSheet.md](references/showActionSheet.md) |
| showPicker | 命令式选择器，await 返回选中值 | [references/showPicker.md](references/showPicker.md) |
| useShowModal | showModal 的 Hook 版 | [references/useShowModal.md](references/useShowModal.md) |
| useShowDialog | showDialog 的 Hook 版 | [references/useShowDialog.md](references/useShowDialog.md) |
| useShowPopup | showPopup 的 Hook 版 | [references/useShowPopup.md](references/useShowPopup.md) |
| useShowActionSheet | showActionSheet 的 Hook 版 | [references/useShowActionSheet.md](references/useShowActionSheet.md) |

## 工具

| 工具          | 说明                                | 参考                                                       |
| ------------- | ----------------------------------- | ---------------------------------------------------------- |
| uniqueId      | 生成唯一 ID                         | [references/uniqueId.md](references/uniqueId.md)           |
| modalConflict | 弹层互斥控制器                      | [references/modalConflict.md](references/modalConflict.md) |
| modalStore    | 全局弹层状态管理                    | [references/modalStore.md](references/modalStore.md)       |
| Hook          | 匿名组件作用域，在 JSX 中内联 hooks | [references/Hook.md](references/Hook.md)                   |
