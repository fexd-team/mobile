# useSize 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **Ref 目标**与**裸 DOM 元素**：`observe(target?.current ?? target)` 两路。
2. **`ResizeObserver` mock**：`observe` 微任务触发回调、`getBoundingClientRect` 取宽高。
3. **`target` 引用变更**：effect 重跑。
4. **卸载**：`disconnect` 被调用。

## 评分

- 交互覆盖：3/5
- 分支覆盖：5/5
- 边界处理：4/5
- 场景真实度：4/5
- 综合评分：16/20

## 未覆盖说明

无。
