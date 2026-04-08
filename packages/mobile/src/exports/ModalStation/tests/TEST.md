# ModalStation 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

（`npx jest --coverage --testPathPattern='packages/mobile/src/exports/ModalStation/tests' --collectCoverageFrom='packages/mobile/src/exports/ModalStation/index.tsx'`）

## 测试场景

1. 挂载不崩溃。
2. `deleteStationMapKeyAfterUnmount={false}` 卸载后仍保留 `stationMap[id]`。
3. `stationMap[id].add` / `remove` 驱动子项渲染与移除（`act` + `isFunction` 过滤分支）。

## 评分

- 交互覆盖：4/5
- 分支覆盖：5/5
- 边界处理：5/5
- 场景真实度：5/5
- **综合评分：19/20**

## 未覆盖说明（如有）

无。
