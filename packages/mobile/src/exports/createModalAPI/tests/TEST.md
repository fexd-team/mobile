# createModalAPI 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

（`npx jest --coverage --testPathPattern='packages/mobile/src/exports/createModalAPI/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/createModalAPI/index.tsx'`）

测试分两个文件：`index.test.tsx`（驿站集成）与 `defaultStation.test.tsx`（`jest.mock('../../Provider')` 覆盖 `DEFAULT_STATION` 懒加载分支）。

## 测试场景

1. 工厂返回 `show`。
2. `show` 返回 `close` / `update` / `promise`，并在 `ModalStation` 中渲染 `content`。
3. `update` 合并 props；关闭后 `onDestroyed` 与 `promise` resolve。
4. `content` 为静态 ReactNode。
5. 省略 `modalId` 时走 `uniqueId()` 默认解构。
6. `DEFAULT_STATION` 未注册时先调用 `renderGlobalProvider`（mock）。

## 评分

- 交互覆盖：4/5
- 分支覆盖：5/5
- 边界处理：5/5
- 场景真实度：5/5
- **综合评分：19/20**

## 未覆盖说明（如有）

无。
