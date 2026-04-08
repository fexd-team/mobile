# TransitionNone 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **L1 in=true**：`in` 为真 → 子节点挂载并可见。
2. **L2 classNames**：传给 `CSSTransition` 的 `classNames` → 同时包含 `exd-none` 与 `exd-speed-none`。
3. **L6 in=false**：`in` 为假 → 子节点不挂载。

## 评分

- 交互覆盖：3/5
- 分支覆盖：4/5
- 边界处理：3/5
- 场景真实度：4/5
- 综合评分：14/20
