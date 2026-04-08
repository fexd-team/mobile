# loading 测试概要

## 覆盖率

（`npx jest --coverage --testPathPattern='exports/loading/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/loading/index.tsx'`）

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **导出结构**：`show`、`hide`、`getCount`、`defaultConfig`、`getController`。
2. **引用计数**：首次 `show`、`多次 show` 递增、`getController` 一致。
3. **hide 与 debounce**：逐级 `hide` 至计数为 0 后触发关闭；`hide(true)` 强制关闭。
4. **fake timers**：与 `debounce(..., 60)` 配合 `advanceTimersByTime`。
5. **onExited**：`transitionSpeed: 'none'` 下控制器 `close` 后退场触发用户 `onExited`（真实定时器 + `waitFor`）。

## 评分

- 交互覆盖：4/5（计数 + 强制关闭 + 退场回调）
- 分支覆盖：5/5（`loadingCount`、`forced`、`debounce` 分支）
- 边界处理：4/5（多次 show/hide、强制关闭）
- 场景真实度：4/5
- 综合评分：17/20

## 未覆盖说明

无。
