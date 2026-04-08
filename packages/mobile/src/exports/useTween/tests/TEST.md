# useTween 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. 返回 API：`value`、`setValue`、`getValue`、`run`、`to`、`stop`、`core`。
2. **`config.from`**：显式指定、省略、`useTween(x)` 单参默认 `config`。
3. **`followValue` 驱动动画**：`waitFor` 断言中间值，`stop` 收尾。
4. **`run()` / `run(undefined)` / `to()`**：默认参数与合并配置分支。
5. **`loop`** 传入 `Tween` 构造；卸载清理 `tween.off`。

## 评分

- 交互覆盖：4/5
- 分支覆盖：5/5
- 边界处理：4/5
- 场景真实度：4/5
- 综合评分：17/20

## 未覆盖说明

无。
