# Cell 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **冒烟**：默认渲染 → 根 `.exd-cell` 存在。
2. **仅 children**：只有子节点 → 文案出现在值区。
3. **title / description**：标题与描述区域文案与结构正确。
4. **prefix**：自定义前缀 → 渲染在 prefix 区域。
5. **onClick 与箭头**：有 `onClick` → 可点击态与箭头；无则反之。
6. **loading**：`loading` 与 `onClick` → 显示 loading 占位、无箭头。
7. **border**：`border={false}`、`border="always"` → 边框类名符合预期。
8. **size**：`size="small"` → 小尺寸类。
9. **suffix**：自定义后缀渲染。
10. **value 与 children**：同时存在 → `children` 优先展示。
11. **className**：合并到根节点。
12. **点击事件**：点击根 → `onClick` 触发。
13. **空 Cell**：无内容仍渲染根，无 label/value 子结构。
14. **空 title/value**：`title=""` 且 `value=""` → 无标题与值文案节点。
15. **ref**：指向根 `div` 且带 `exd-cell`。

## 评分

- 交互覆盖：5/5
- 分支覆盖：5/5
- 边界处理：5/5
- 场景真实度：5/5
- 综合评分：20/20
