# TransitionSlideUp 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | —    |
| Functions  | —    |
| Lines      | 100% |

（`npx jest --coverage --testPathPattern='packages/mobile/src/exports/TransitionSlideUp/tests' --collectCoverageFrom='packages/mobile/src/exports/TransitionSlideUp/index.ts'`）

## 测试场景

1. `in` 为 true 时子节点挂载。
2. `classNames` 含 `exd-slide-up`。
3. `in={false}` 时不挂载子节点。

## 评分

- 交互覆盖：2/5
- 分支覆盖：4/5
- 边界处理：4/5
- 场景真实度：4/5
- **综合评分：14/20**

## 未覆盖说明（如有）

无。
