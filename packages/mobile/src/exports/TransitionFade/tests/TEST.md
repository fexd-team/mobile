# TransitionFade 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | —    |
| Functions  | —    |
| Lines      | 100% |

（`npx jest --coverage --testPathPattern='packages/mobile/src/exports/TransitionFade/tests' --collectCoverageFrom='packages/mobile/src/exports/TransitionFade/index.ts'`）

## 测试场景

1. `in` 为 true 时子节点挂载。
2. 透传到 `CSSTransition` 的 `classNames` 含 `exd-fade` 与 `exd-transition`（经 mock 读取）。
3. `in={false}` 时子节点不挂载（`mountOnEnter` / `unmountOnExit`）。

## 评分

- 交互覆盖：2/5
- 分支覆盖：4/5
- 边界处理：4/5
- 场景真实度：4/5
- **综合评分：14/20**

## 未覆盖说明（如有）

无（针对 `index.ts` 薄封装）。
