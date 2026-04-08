# useThrottleFn 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. `wait > 0`：窗口内合并、`advanceTimersByTime` 后 trailing。
2. `wait <= 0`：直接透传 `useMemoizedFn`。
3. **`wait` 变化**：`useMemo` 依赖变更生成新节流函数。
4. **回调更新**：`fn` 引用替换后仍调用最新实现。

## 评分

- 交互覆盖：3/5
- 分支覆盖：5/5
- 边界处理：4/5
- 场景真实度：4/5
- 综合评分：16/20

## 未覆盖说明

无。
