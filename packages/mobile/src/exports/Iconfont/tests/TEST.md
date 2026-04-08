# Iconfont 测试概要

## 覆盖率

| 指标       | 值     |
| ---------- | ------ |
| Statements | 84.61% |
| Branches   | 50%    |
| Functions  | 50%    |
| Lines      | 83.33% |

## 测试场景

1. **非 SVG 模式**：默认 → 渲染 `i` 且含 `mc-{type}` 类。
2. **prefix**：自定义前缀 → class 为 `{prefix}-{type}`。
3. **svg 模式**：`svg` → 渲染 `svg`/`use`，`xlink:href` 与根 class 正确。
4. **className**：合并到根节点。
5. **style**：`fontSize`/`color` → 内联样式生效。
6. **边界 prefix=icon**：附加 `iconfont` 类。

## 评分

- 交互覆盖：3/5
- 分支覆盖：3/5
- 边界处理：3/5
- 场景真实度：4/5
- 综合评分：13/20
