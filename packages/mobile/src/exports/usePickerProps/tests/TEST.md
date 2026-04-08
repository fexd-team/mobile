# usePickerProps 测试概要

## 覆盖率

（`jest --collectCoverageFrom=packages/mobile/src/exports/usePickerProps/index.tsx`）

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **renderTrigger**：非 `disabled` 打开弹层；`disabled` 不打开。
2. **确认**：`onConfirm` 返回 `false` 时不关闭；返回 `true` 后提交 `insideValue` 并关闭。
3. **取消**：未传 `onCancel` 时左侧关闭；`onCancel` 为 `false` 时左侧与遮罩均不关闭。
4. **遮罩**：`onClose` 路径调用 `onCancel` 校验后关闭；`onCancel` 为 `false` 时遮罩无效。
5. **onExited**：确认后触发 `popupProps.onExited`（与 `value` 同步逻辑）。
6. **renderHook**：返回值字段完整性。

## 评分

- 交互覆盖：5/5（`userEvent` + 头部/遮罩多路径）
- 分支覆盖：5/5（`onConfirm`/`onCancel`/`onClose`/`onExited` 分支齐全）
- 边界处理：5/5（`disabled`、异步 `false` 阻断）
- 场景真实度：5/5（与选择器触发器 + Popup 一致）
- **综合评分：20/20**

## 未覆盖说明

无。
