# toast 测试概要

## 覆盖率

（`npx jest --coverage --testPathPattern='exports/toast/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/toast/index.tsx'`）

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **导出结构**：`info` / `success` / `fail` / `warn` / `defaultConfig`。
2. **defaultConfig**：各变体携带的 `icon` 等默认项。
3. **调用安全**：四方法均可调用。
4. **控制器**：`close`、`reclock`、`update`、`promise`；渲染 `.exd-toast`。
5. **参数形态**：省略第二参数、`undefined` config。
6. **duration 边界**：`duration: 0`。
7. **transitionSpeed**：具名、数字、`undefined` 与 `reclock`。

## 评分

- 交互覆盖：4/5
- 分支覆盖：5/5
- 边界处理：5/5
- 场景真实度：4/5
- 综合评分：18/20

## 源码调整说明

- `createToastMethod` 去掉未使用的默认参数 `= {}`，与 `notify` 一致，行为不变。

## 未覆盖说明

无。
