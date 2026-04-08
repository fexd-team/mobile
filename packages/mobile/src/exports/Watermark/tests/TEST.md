# Watermark 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **Canvas mock**：`beforeAll` 对 `HTMLCanvasElement.prototype.getContext` 提供最小 2d 上下文，避免 `@pansy/react-watermark` 在 jsdom 下报错。
2. **冒烟**：传入 `text` 挂载得到根 `div`。
3. **Props**：`rotate`、`opacity`、`gap`、`width`、`height`、`className`、`fullpage`（映射 `isBody`）等组合挂载不崩溃。
4. **边界**：`text` 为空字符串仍可挂载。

## 评分

- 交互覆盖：2/5（第三方水印绘制，以挂载与属性为主）
- 分支覆盖：5/5（封装层分支全覆盖）
- 边界处理：4/5（空文案、全页模式）
- 场景真实度：4/5（贴近典型水印参数）
- 综合评分：15/20

## 未覆盖说明（如有）

底层 `@pansy/react-watermark` 内部 Canvas 绘制细节由库自身保证；本仓库仅覆盖封装层。
