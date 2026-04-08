# useShowPopup 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

（`npx jest --coverage --testPathPattern='exports/useShowPopup/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/useShowPopup/index.{ts,tsx}'`）

## 测试场景

1. **元组结构**：Context + Wrapper 保证单次 `useShowPopup` 调用与 ModalStation 同树，断言 `[show, station]`。
2. **show → DOM → close**：`show({ content })` 后 `.exd-popup` 出现，`close()` 后消失。

## 评分

- 交互覆盖：4/5
- 分支覆盖：5/5
- 边界处理：3/5
- 场景真实度：4/5
- **综合评分：16/20**

## 未覆盖说明（如有）

无。
