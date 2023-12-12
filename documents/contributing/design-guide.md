---
nav:
  title: 共建指南

title: 如何设计一个组件？
order: 40
---

## 组件规范

- **兼容性要求**：`Android 4.0+`、`iOS 7+`
- 组件一律使用 `React.FC` (函数式组件) + `hooks` 开发，特定功能要求如 `componentDidCatch` 等除外
- 样式文件中的尺寸，一律使用 `@size-scale` 变量进行控制，边框线宽 `1px` 或其他特定场景除外

  如：

  ```less
  /* mobile/src/theme/vars.less */
  @import '../../theme/vars';

  .exd-button {
    line-height: 38px * @size-scale;
    height: 38px * @size-scale;
    padding: 0 14px * @size-scale;
    font-size: 14px * @size-scale;
    border-width: 1px;
  }
  ```

- 组件属性中的时间一律以 `ms` 为单位
- 组件间的依赖顺序需要保持**单向依赖**，避免依赖交叉
- 组件实现体积应尽可能小（10kb gzipped 左右）
- 新增第三方依赖前需从**体积、兼容性、性能**上多做考量

## 组件的场景

- **单个组件不要承担太多功能，应克制**
- 业务场景是什么？
- 是基础组件，还是拓展组件？如 [Picker](/documents/exports/data/picker) 与 [PickerView](/documents/exports/data/picker-view) 的关系
- 泛用性如何，是否与特定场景强关联？如 SKU 选择器

## 组件的命名

- 结合场景与用途，命名应**简单明了、通俗易懂**
- 组件命名与类型声明遵循大驼峰命名，非组件、非类型定义遵循小驼峰命名，`hook` 类型遵循 `useXxx` 格式
- IO 类组件中，`XxxSelect` 为列表点选类选择器、`XxxPicker` 为滑动选择器
- 存在依赖关系的组件（父子、拓展关系等）该怎么命名？

  1. 父子组件：有强关联的、需要成对使用的

     写入同一个 `exports` 文件夹中，并按父子顺序关系命名

     如 [List](/documents/exports/display/list) 与 `List.Item`，其中 `List.Item` 的函数命名为 `ListItem`

  2. 拓展组件：无强关联，不需要成对使用，但存在依赖关系的组件

     分别写入不同 `exports` 文件夹中，按组件功能或场景命名

     如 [Input](/documents/exports/data/input) 与 `InputTrim`

- 参考[组件规划](https://www.processon.com/view/link/655eb550d1fe402d6d1a995a)进行命名

## 属性设计

- 在尽可能保持组件**体积小、功能多**的前提下，围绕场景与用途进行属性设计
- 注意属性命名的被动式，如 `disabled` 而非 `disable`
- 生命周期类属性命名应遵循 `onXxx` 格式
- 参考借鉴其他组件库
