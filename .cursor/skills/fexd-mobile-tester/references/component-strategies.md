# 组件类型测试策略

不同类型的组件有不同的测试侧重点。先识别组件所属类型，再据此选择层级权重和必测场景。

## 类型一：表单输入

**代表组件**：Input、TextArea、Switch、Stepper、Slider、Rate

**特征识别**：

- type.tsx 中有 `value` / `defaultValue` / `onChange`
- 使用 `useIOControl`
- 有 `disabled` / `readOnly` prop

**层级权重**：

| 层级           | 权重  | 说明                                     |
| -------------- | ----- | ---------------------------------------- |
| L1 冒烟        | ★★★   | 基础                                     |
| L2 Prop        | ★★★   | disabled/readOnly/placeholder 等         |
| L3 事件        | ★★★★★ | **核心**：多步操作序列                   |
| L5 受控/非受控 | ★★★★★ | **核心**：value/onChange vs defaultValue |
| L6 边界        | ★★★   | null/undefined value、超长文本           |

**必测场景**（每个表单组件都要覆盖）：

1. **输入 → 值变更 → 回调验证**：用户操作 → 检查 onChange 参数类型和值
2. **disabled 阻断**：disabled 状态下操作无效果（click/type/drag 均不触发 onChange）
3. **受控模式锁定**：仅传 value 不传 onChange → 操作后值不变
4. **受控模式联动**：value + onChange → 操作后通过外部 state 驱动更新
5. **非受控自由变更**：defaultValue → 操作后内部自行维护值

**Slider/Rate 额外必测**：

- 拖拽/滑动全流程：mouseDown → mouseMove(多步) → mouseUp
- touch 序列：touchStart → touchMove(多步) → touchEnd
- step 对齐：拖拽到非 step 倍数位置时值自动对齐

## 类型二：选择器

**代表组件**：Picker、DatePicker、DatePickerView、TimePicker、Checkbox、Radio

**特征识别**：

- type.tsx 中有 `value` / `onChange` / `options`
- 可能有 `min` / `max` / `format` 等限制 prop
- 可能有 `Group` 子组件

**层级权重**：

| 层级           | 权重  | 说明                                 |
| -------------- | ----- | ------------------------------------ |
| L1 冒烟        | ★★★   | 基础                                 |
| L2 Prop        | ★★★   | options 格式、label 自定义           |
| L4 约束        | ★★★★★ | **核心**：min/max 交叉约束、日期范围 |
| L5 受控/非受控 | ★★★★  | value vs defaultValue                |
| L7 异步        | ★★★   | debounce 延迟（DatePickerView 等）   |

**必测场景**：

1. **选择 → 值变更 → 回调**：点击选项 → onChange 被正确参数调用
2. **多选/单选互斥**：Group 内选择/取消逻辑正确
3. **min/max 约束**：超出范围值被 clamp
4. **联动列变更**：高位列变更时低位列自动重算（DatePicker 年 → 月 → 日）
5. **空 options 不崩溃**

**DatePicker / DatePickerView / TimePicker 额外必测**：

- **必须 mock 当前时间**：`jest.useFakeTimers({ now: new Date('2025-06-15') })`，避免因执行日期不同导致 flaky
- PickerView scroll debounce 需配合 `waitFakeTimers` 或 `jest.advanceTimersByTime`

**Checkbox/Radio 额外必测**：

- Group disabled 透传子项
- Group 受控 value 驱动子项选中状态
- options 模式 vs children 模式

## 类型三：弹窗 & 反馈

**代表组件**：Modal、Popup、Dialog、ActionSheet、Toast、Loading

**特征识别**：

- type.tsx 中有 `visible` / `onClose`
- 有 `mask` / `maskClosable` / `placement` 等弹层 prop
- 可能有命令式 API（`showModal()`、`toast()`）

**层级权重**：

| 层级      | 权重  | 说明                                   |
| --------- | ----- | -------------------------------------- |
| L1 冒烟   | ★★★   | visible=true 时渲染                    |
| L2 Prop   | ★★★★  | placement/mask/scrollable 等           |
| L3 事件   | ★★★★  | onClose 触发时机                       |
| L7 异步   | ★★★★  | 入场/出场动画时序                      |
| L8 Portal | ★★★★★ | **核心**：命令式 API + Portal 渲染位置 |

**必测场景**：

1. **打开 → 渲染内容 → 关闭 → 内容消失**：完整生命周期
2. **遮罩点击关闭**：maskClosable=true → 点击遮罩 → onClose；maskClosable=false → 点击无效
3. **按钮交互关闭**：action/按钮的 onClick 与 onClose 的优先级
4. **visible=false 不渲染**：Portal 不挂载
5. **命令式 API 调用 →DOM 出现 →close→DOM 移除**（如有）

**测试基础设施**：

- **统一清理**：所有弹窗类测试必须 `afterEach(cleanupModals)`（从 `tests/testing` 导入）
- **禁用动画**：声明式组件传 `transitionSpeed="none"` 跳过 CSSTransition
- **timer 控制**：toast/notify 的 duration 自动关闭、loading 的 debounce close 需配合 `waitFakeTimers`
- **命令式 API 完整测试**：不仅测 show → DOM 出现，还要测 close → DOM 移除（四步生命周期）

## 类型四：展示组件

**代表组件**：Badge、Avatar、Divider、Empty、Result、ProgressBar、Steps、Timeline

**特征识别**：

- 主要是纯渲染，少量或无交互
- prop 控制外观（颜色、大小、方向）
- 无 `useIOControl`

**层级权重**：

| 层级    | 权重  | 说明                             |
| ------- | ----- | -------------------------------- |
| L1 冒烟 | ★★★   | 基础                             |
| L2 Prop | ★★★★★ | **核心**：所有视觉 prop 逐一验证 |
| L6 边界 | ★★★   | children 为空/null、极端值       |

**必测场景**：

1. **各 prop 值的 className/DOM 映射**：size/type/status 等枚举值
2. **children 内容渲染**：文本/ReactNode 正确显示
3. **空/null children 不崩溃**

**Avatar 额外必测**：

- 图片加载失败 fallback（onError → 显示首字符/默认图标）

**Badge 额外必测**：

- overflowCount 截断显示（99+）
- dot 模式

## 类型五：导航组件

**代表组件**：Tabs、TabBar、NavBar、Steps（可交互型）

**特征识别**：

- 有 `activeKey` / `defaultActiveKey` / `onChange`
- 使用 `useIOControl`

**层级权重**：

| 层级           | 权重  | 说明                                    |
| -------------- | ----- | --------------------------------------- |
| L1 冒烟        | ★★★   | 基础                                    |
| L2 Prop        | ★★★   | tabPosition/title 等                    |
| L3 事件        | ★★★★  | onTabChange/onClick                     |
| L5 受控/非受控 | ★★★★★ | **核心**：activeKey vs defaultActiveKey |
| L8 复合        | ★★★★  | 子 Tab 的激活状态联动                   |

**必测场景**：

1. **点击 tab 切换**：点击 → activeKey 变更 → 对应内容显示
2. **受控/非受控模式**：activeKey vs defaultActiveKey 行为差异
3. **disabled tab 点击无反应**
4. **多 tab 切换序列**：A → B → C → A 回环

## 类型六：布局组件

**代表组件**：Flex、Grid、Space、View、ScrollView

**特征识别**：

- 主要控制子元素排列方式
- prop 为方向/间距/对齐等布局属性

**层级权重**：

| 层级    | 权重  | 说明                               |
| ------- | ----- | ---------------------------------- |
| L1 冒烟 | ★★★   | 基础                               |
| L2 Prop | ★★★★★ | **核心**：direction/wrap/gap/align |
| L6 边界 | ★★★   | 空 children、单个 child            |

**必测场景**：

1. **各方向的 className**：row/column 等
2. **children 数量 0/1/多**
3. **自定义 className 不被覆盖**

## 类型七：Hooks

**代表导出**：useIOControl、useThrottleFn、useTouch、useTween 等

**特征识别**：

- 导出函数，参数为 props/options，返回对象或函数
- 无 JSX

**测试方式**：`renderHook` + `act`

**层级权重**：

| 层级    | 权重  | 说明                                   |
| ------- | ----- | -------------------------------------- |
| L1 冒烟 | ★★★   | renderHook 不崩溃                      |
| L3 事件 | ★★★★★ | **核心**：调用返回的函数，验证状态变更 |
| L6 边界 | ★★★★  | 空参数、极端值、快速连续调用           |

**必测场景**：

1. **返回值结构正确**：包含预期的 key/方法
2. **状态更新**：调用 setter → value 变更
3. **参数变化**：hook 参数变更时重新计算
4. **清理副作用**：组件卸载后 timer/listener 被移除
5. **节流/防抖**（如适用）：快速调用只执行 N 次，等待后再次可用

**useTouch 额外必测**：

- touch 事件序列（需要 mock DOM element + getBoundingClientRect）
- disabled 时不响应
- onStart/onMove/onEnd 回调参数结构

## 类型八：工厂函数

**代表导出**：createFC、cloneFC、createForm、createModalAPI、createTransition

**特征识别**：

- 导出普通函数（非 hook、非组件）
- 输入组件/配置 → 输出新组件或新函数

**层级权重**：

| 层级    | 权重  | 说明                         |
| ------- | ----- | ---------------------------- |
| L1 冒烟 | ★★★★★ | **核心**：工厂输出是有效组件 |
| L2 Prop | ★★★   | defaultProps 继承            |
| L6 边界 | ★★★   | 空参数                       |

**必测场景**：

1. **产物可渲染**：工厂返回的组件能正常 render
2. **ref 转发**：createFC 的 ref 正确到达内部 DOM
3. **defaultProps 继承与覆盖**
4. **cloneFC 独立性**：修改 clone 的 defaultProps 不影响原组件

## 类型九：命令式 API

**代表导出**：toast、loading、notify、showModal 等

**特征识别**：

- 导出函数/对象（含 show/hide 方法）
- 调用后在 DOM 中创建弹层
- 依赖 ModalStation

**层级权重**：

| 层级      | 权重  | 说明                        |
| --------- | ----- | --------------------------- |
| L1 冒烟   | ★★★★  | 调用不崩溃                  |
| L3 事件   | ★★★★  | controller.close 能关闭     |
| L7 异步   | ★★★★★ | **核心**：duration 自动关闭 |
| L8 Portal | ★★★★★ | **核心**：DOM 挂载位置      |

**必测场景**：

1. **调用 →DOM 出现**：toast.info('msg') → document.body 包含 'msg'
2. **close→DOM 移除**
3. **loading 引用计数**：多次 show 对应多次 hide
4. **函数导出结构正确**：typeof === 'function'

## 类型十：IO 分层变体

**代表导出**：BlockInput、CellInput、LineInput 等（24 个）

**特征识别**：

- 源码极短（< 15 行），使用 `cloneFC(BaseComponent)` + defaultProps

**层级权重**：

| 层级    | 权重  | 说明                                 |
| ------- | ----- | ------------------------------------ |
| L1 冒烟 | ★★★★★ | **核心**：克隆产物可正常渲染         |
| L2 Prop | ★★★   | classNamePrefix 正确、className 透传 |

**必测场景**：

1. **渲染不崩溃**
2. **CSS 类名包含正确 prefix**
3. **自定义 className 不被吞掉**
4. 不需要重复测试基础组件已覆盖的交互逻辑
