# notify 测试概要

## 覆盖率

（`npx jest --coverage --testPathPattern='exports/notify/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/notify/index.tsx'`）

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **导出结构**：`info` / `success` / `warning` / `error` / `defaultConfig`。
2. **defaultConfig**：各方法挂载的 `defaultConfig` 与变体 `notifyType`。
3. **调用安全**：四方法均可调用。
4. **控制器**：`close`、`reclock`、`update`、`promise`；渲染 `.exd-notify`。
5. **参数形态**：省略第二参数、`config` 为 `undefined`。
6. **duration 边界**：`duration: 0` 仍可展示并手动关闭。
7. **transitionSpeed**：具名速度、数字、`undefined` 与 `reclock`。
8. **onExited**：主动 `close` 后用户 `onExited` 被调用。

## 评分

- 交互覆盖：4/5（ModalStation + 关闭链）
- 分支覆盖：5/5（含 `SPEED_MAP` / 数字 / `??` 与包装 `onExited`）
- 边界处理：5/5（0 duration、可选 config）
- 场景真实度：4/5（对齐命令式通知用法）
- 综合评分：18/20

## 源码调整说明

- `createNotifyMethod` 去掉未使用的默认参数 `= {}`（所有调用处均显式传入配置对象），消除无法覆盖的死分支，行为不变。

## 未覆盖说明

无。
