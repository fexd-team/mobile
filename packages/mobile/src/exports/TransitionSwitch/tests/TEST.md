# TransitionSwitch 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 50%  |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **L1 animateKey**：提供 `animateKey` → 子节点渲染。
2. **L2 TransitionGroup**：根下存在 `.exd-transition-switch__transition-group`。
3. **L6 key 切换**：`animateKey` 变更 → `waitFor` 后旧子节点卸载、新内容保留（`speed="none"` 路径）。

## 评分

- 交互覆盖：4/5
- 分支覆盖：2/5
- 边界处理：3/5
- 场景真实度：4/5
- 综合评分：13/20
