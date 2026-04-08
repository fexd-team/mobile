# useShowDialog 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

（`npx jest --coverage --testPathPattern='exports/useShowDialog/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/useShowDialog/index.{ts,tsx}'`）

## 测试场景

1. **元组结构**：Wrapper 内挂载 `useShowDialog` 返回的 station，`renderHook` 通过 Context 断言 `[show, station]` 形态正确。
2. **show → DOM → close**：`show({ content })` 后 `.exd-dialog-modal` 进入文档，`close()` 后移除。

## 评分

- 交互覆盖：4/5
- 分支覆盖：5/5
- 边界处理：3/5
- 场景真实度：4/5
- **综合评分：16/20**

## 未覆盖说明（如有）

无。
