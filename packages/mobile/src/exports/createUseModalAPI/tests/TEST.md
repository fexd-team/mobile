# createUseModalAPI 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | —    |
| Functions  | 100% |
| Lines      | 100% |

（`npx jest --coverage --testPathPattern='packages/mobile/src/exports/createUseModalAPI/tests' --collectCoverageFrom='packages/mobile/src/exports/createUseModalAPI/index.tsx'`）

## 测试场景

1. 工厂返回 Hook 函数。
2. `renderHook` 得到 `[show, station]`；渲染 `station` 后调用 `show`，断言注入 `stationId`。

## 评分

- 交互覆盖：3/5
- 分支覆盖：4/5
- 边界处理：4/5
- 场景真实度：4/5
- **综合评分：15/20**

## 未覆盖说明（如有）

无。
