# Spinner 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **冒烟**：默认 → 立即展示 `.exd-spin` 与 `.exd-spin-circle`。
2. **className**：合并到根 `span`。
3. **style 颜色**：`color` → 根节点样式链路正确。
4. **style 尺寸**：`width`/`height` → 根节点样式正确。
5. **delay**：`delay>0` → 初始无节点，延时后出现 spin。

## 评分

- 交互覆盖：4/5
- 分支覆盖：5/5
- 边界处理：5/5
- 场景真实度：5/5
- 综合评分：19/20
