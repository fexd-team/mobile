# useScrollLock 测试概要

## 覆盖率

| 指标       | 值     |
| ---------- | ------ |
| Statements | 100%   |
| Branches   | 85.71% |
| Functions  | 100%   |
| Lines      | 100%   |

## 测试场景

1. **`scrollLock`**：加锁 / 解锁、类名与监听器。
2. **引用计数**：同元素两次加锁、两次解锁；重复 `unlock` 在计数为零时不再移除。
3. **`useScrollLock`**：`lock` true/false、卸载清理、`false → true` 切换。
4. **多元素**：数组内多个节点同时加锁与释放。
5. **`lockHandler`**：对 `@fexd/tools` 的 `run` 做局部 mock，将 `addEventListener` 映射为 `touchmove`，断言 `preventDefault` 被调用。

## 评分

- 交互覆盖：4/5
- 分支覆盖：4/5（Branches 85.71%，已达 ≥85%）
- 边界处理：5/5
- 场景真实度：4/5
- 综合评分：17/20

## 未覆盖说明

- **Branches 85.71%**：余下分支为 `counter.get(element) ?? 0` 等极少出现的空 Map 读路径；对行为无影响。
