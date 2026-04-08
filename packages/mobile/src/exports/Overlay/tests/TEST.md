# Overlay 测试概要

## 覆盖率

| 指标       | 值     |
| ---------- | ------ |
| Statements | 94.73% |
| Branches   | 100%   |
| Functions  | 100%   |
| Lines      | 100%   |

（`npx jest --coverage --testPathPattern='packages/mobile/src/exports/Overlay/tests' --collectCoverageFrom='packages/mobile/src/exports/Overlay/index.tsx'`）

## 测试场景

1. `visible` 显示/隐藏与 `TransitionFade` 默认动画。
2. `className`、`transparent`、`absolute` 类名。
3. `onClick`。
4. `ref` 与 `useImperativeHandle` 指向遮罩 div。
5. 自定义 `createTransition` 产物 + `transitionSpeed` + 子节点透传。
6. `visible` 由 `false` 切 `true` 的挂载过程。

## 评分

- 交互覆盖：4/5
- 分支覆盖：5/5
- 边界处理：4/5
- 场景真实度：5/5
- **综合评分：18/20**

## 未覆盖说明（如有）

- 约 1 条 statement 未命中（与 `useScrollLock` / 动态元素列表相关），不影响达标 90% statements。
