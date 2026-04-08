# NotFound 测试概要

## 覆盖率

| 指标       | 值    |
| ---------- | ----- |
| Statements | 90.9% |
| Branches   | 100%  |
| Functions  | 100%  |
| Lines      | 100%  |

## 测试场景

1. **冒烟**：默认 → 展示「404 Not Found」与 `.exd-not-found`。
2. **text**：自定义 `text` → 标题区文案与 `.exd-result-title` 内容一致。
3. **children**：子节点渲染在内容区。
4. **className**：合并到根节点。
5. **边界 text=""**：空字符串 → 不渲染标题节点。

## 评分

- 交互覆盖：3/5
- 分支覆盖：5/5
- 边界处理：4/5
- 场景真实度：4/5
- 综合评分：16/20
