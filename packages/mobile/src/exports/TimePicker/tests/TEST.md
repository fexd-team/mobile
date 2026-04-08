# TimePicker 测试概要

## 覆盖率

针对 `packages/mobile/src/exports/TimePicker/index.tsx`（`npx jest --coverage --testPathPattern='exports/TimePicker/tests' --collectCoverageFrom='packages/mobile/src/exports/TimePicker/index.tsx'`）：

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **冒烟**：纯文本子节点作为触发区渲染。
2. **弹层**：`popupProps.title` 打开后可见；点击后出现 `TimePickerView` 根节点。
3. **确认 / 取消**：右侧确认调用 `onConfirm` 并关闭；左侧取消调用 `onCancel`（`act` + `waitFor` 等待异步 `run`）。
4. **展示**：非受控 `defaultValue` + 函数式 `children`；受控 `value` 变更时触发区同步。
5. **禁用**：`disabled` 时点击不挂载选择面板。
6. **提交**：弹层内滚动「时」列后确认，外部 `onChange` 收到与初始不同的时间。
7. **拦截关闭**：`onConfirm` / `onCancel` 返回 `false` 时不关弹层且不提交（确认场景不调用 `onChange`）。
8. **触发器 API**：`ref` 与 `className` 落在带 `.tp-trigger` 的触发器根节点上。
9. **生命周期**：关闭弹层后调用 `onExited`。

## 评分

- 交互覆盖：5/5（打开弹层 → 滚动 PickerView → 确认 / 取消 / 拦截关闭）
- 分支覆盖：5/5（与 `usePickerProps` 组合的确认、取消、禁用路径均有用例）
- 边界处理：4/5（含异步回调与 `false` 拦截；未单独测 `onEnter`/`onExit`）
- 场景真实度：5/5（对齐典型「点触发器 → 选时间 → 确认」流程）
- **综合评分：19/20**

## 未覆盖说明

- 无（当前指标下 `index.tsx` 全量覆盖）。

## 说明

- `type.tsx` 中与 `TimePickerView` 重合的 props（如 `format`、列标签）**未**传入弹层内 `TimePickerView`（见 `index.tsx` 仅传 `rows`/`value`/`onChange`）；测试不假设这些 prop 在弹层内生效。
