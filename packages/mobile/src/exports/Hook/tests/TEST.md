# Hook 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **`hook` 优先于 `children`**。
2. **无 `hook` 时**：`children` 为函数并接收其余 props（如 `title`）。
3. **`hook` 返回普通对象**：`isObject && !isValidElement` → `null`。
4. **`hook` 返回 `null`**、返回合法元素。

## 评分

- 交互覆盖：4/5
- 分支覆盖：5/5
- 边界处理：5/5
- 场景真实度：4/5
- 综合评分：18/20

## 未覆盖说明

无。
