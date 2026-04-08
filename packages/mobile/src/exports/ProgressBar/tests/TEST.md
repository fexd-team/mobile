# ProgressBar 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

（`npx jest --coverage --testPathPattern='exports/ProgressBar/tests' --collectCoverageFrom='packages/mobile/src/exports/ProgressBar/index.tsx'`）

## 测试场景

1. **冒烟**：轨道与内层 `value` 条。
2. **进度**：中间值、0/100、负值与超 100 的 `clamp`。
3. **speed / 动画**：`none`、`slowest`、数字毫秒、`SPEED_MAP` 未命中的字符串回退。
4. **其它**：`className`、children 不渲染、根节点属性透传、`ref`。

## 评分

- 交互覆盖：2/5（依赖 `waitFor` 与节流后的样式）
- 分支覆盖：5/5
- 边界处理：5/5
- 场景真实度：4/5
- **综合评分：16/20**

## 未覆盖说明（如有）

无。

## 实现备注

- 已去掉形参 `speed = 0`（与 `defaultProps.speed` 互斥导致 Istanbul 不可达分支）；行为仍由 `defaultProps` 保证。
