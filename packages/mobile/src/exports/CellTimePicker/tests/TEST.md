# CellTimePicker 测试概要

## 覆盖率

定向采集：`packages/mobile/src/exports/CellTimePicker/index.tsx`。

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **默认渲染**：无额外 props → 根节点在文档中且不崩溃。
2. **样式前缀**：默认渲染 → DOM 中存在带 `exd-cell-time-picker` 的类名。
3. **className 透传**：传入 `className="my-custom"` → 展示区域出现 `.my-custom`。

## 评分

- 交互覆盖：2/5
- 分支覆盖：4/5
- 边界处理：2/5
- 场景真实度：3/5
- 综合评分：11/20
