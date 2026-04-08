# Picker 测试概要

## 覆盖率

| 指标       | 值    |
| ---------- | ----- |
| Statements | 100%  |
| Branches   | 87.5% |
| Functions  | 100%  |
| Lines      | 100%  |

（命令：`npx jest --coverage --testPathPattern='exports/Picker/tests' --collectCoverageFrom='packages/mobile/src/exports/Picker/index.tsx'`）

## 测试场景

1. **模块导出**：`prefix` 常量。
2. **解构默认值**：不传 `options`（`React.createElement`）时使用默认 `[]`。
3. **冒烟**：静态 `children` 渲染。
4. **函数式 children**：接收 `label`、`value`。
5. **Popup**：`popupProps.title` 打开后可见；打开后出现 `PickerView`。
6. **确认 / 取消**：右侧确认触发 `onChange` 并关闭；左侧取消触发 `onCancel`。
7. **defaultValue / 受控 value**：展示与切换。
8. **空 options**：触发区可点、打开不崩溃。
9. **disabled**：不打开弹层。
10. **clearable**：首项 `---`；滚到首项后确认 → `onChange(undefined, undefined)`（`getItem` 在 `isExist` 为 false 分支）。
11. **弹层内滚动**：假计时器 + `scrollTop` 改选项，确认前父级 `onChange` 不触发，确认后提交新值（覆盖 `PickerView` 的 `onChange` → `setInsideValue`）。
12. **挂载无初始值**：`insideValue === undefined` 时 effect 将内部值置为首项。
13. **onConfirm / onCancel 返回 false**：不关闭、不提交。
14. **自定义 headerRight**：确认区展示「完成」。

## 评分

- 交互覆盖：5/5（userEvent 打开弹层 + fireEvent 滚动/debounce + 确认链）
- 分支覆盖：4/5（`clearable`、受控链、`isExist` 等均覆盖；`getItem` 内 `options ?? []` 的右操作数在传入 `options: null` 时会令 `PickerView` 对 `null` 调用 `map` 崩溃，未构造该反模式用例）
- 边界处理：5/5（空列表、disabled、清空、拦截确认/取消）
- 场景真实度：5/5（与业务「打开 → 滚轮改值 → 确认/取消」一致）
- **综合评分：19/20**

## 未覆盖说明

- **`(options ?? [])` 的「左值为 null」分支**：与当前实现中 `PickerView` 直接使用同一 `options` 引用相矛盾；若 `options` 为 `null`，弹层内会异常，属无效用法，故不在单测中模拟。
