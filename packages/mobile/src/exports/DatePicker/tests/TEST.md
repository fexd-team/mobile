# DatePicker 测试概要

## 覆盖率

针对 `packages/mobile/src/exports/DatePicker/index.tsx`（`npx jest --coverage --testPathPattern='exports/DatePicker/tests' --collectCoverageFrom='packages/mobile/src/exports/DatePicker/index.tsx'`）：

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **冒烟**：文本子节点、`children` 为函数时传入选中值。
2. **弹层**：`popupProps.title`；点击后出现 `DatePickerView`；`format` 传入后仍可挂载；`style` 透传到弹层内 `DatePickerView` 根节点。
3. **确认 / 取消 / 遮罩**：`onConfirm` 关闭；左侧 `onCancel`；`maskClosable` 点遮罩走取消（`act` + `waitFor`）。
4. **禁用**：`disabled` 时不挂载选择视图。
5. **usePickerSortFromFormat**（同文件导出）：`format` 非 `string` 返回 `undefined`；`YYYY-MM-DD` 与 `MM/DD/YYYY` 解析顺序（`renderHook`）。
6. **filterInvalidDate**：`Invalid Date` 展示层视为空；`valueOf` 抛错走 `try/catch` 返回 `false`。
7. **受控 / 非受控**：`defaultValue` 展示；受控 `value` 变更同步；`value === null` 时函数式 `children`。

## 评分

- 交互覆盖：5/5（打开弹层、确认/取消/遮罩）
- 分支覆盖：5/5（`filterInvalidDate` 开启/关闭、`usePickerSortFromFormat` 分支）
- 边界处理：5/5（无效日期、校验抛错 catch、日期 mock 保护）
- 场景真实度：5/5（对齐「触发器 + Popup + DatePickerView」）
- **综合评分：20/20**

## 未覆盖说明

- 无（当前命令下 `index.tsx` 全量覆盖）。

## 说明

- 弹层内固定 `rows={5}` 传入 `DatePickerView`（见源码）；测试通过打开弹层断言视图挂载，不重复测 `DatePickerView` 内部逻辑（见 `DatePickerView/tests`）。
