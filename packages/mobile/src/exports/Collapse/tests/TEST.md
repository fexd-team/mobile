# Collapse 测试概要

## 覆盖率

| 指标       | 值     |
| ---------- | ------ |
| Statements | 100%   |
| Branches   | 91.66% |
| Functions  | 100%   |
| Lines      | 100%   |

## 测试场景

1. **冒烟**：单 Panel → `.exd-collapse` 存在。
2. **多 Panel**：三个 Panel → 三个 `.exd-collapse-panel`。
3. **accordion**：点击切换 → `onChange` 仅保留当前 key。
4. **accordion 收起**：再次点击同一标题 → `activeKey` 变为空数组。
5. **非 accordion 多开**：依次展开 → `onChange` 累积多个 key。
6. **iconRotate 默认**：展开态下图标带 active 类。
7. **iconRotate=false**：展开下图标无 active 类。
8. **expandIcon**：自定义图标节点出现在结构中。
9. **onChange 回调**：展开时次数与参数正确。
10. **Panel onClick**：点击标题 → Panel 的 `onClick` 触发。
11. **非 accordion 单独收起**：双开状态下收起其一 → 另一 key 保留。
12. **defaultActiveKey**：初始展开态与图标类一致。
13. **受控 activeKey**：`rerender` 切换 → 展开态随 props 变化。
14. **边界无 children**：渲染不抛错。
15. **边界 null/undefined children**：与 Panel 混排不抛错。
16. **边界普通元素 children**：与 Panel 混排不抛错。
17. **Panel disabled**：禁用面板点击不触发 `onChange`，正常面板可展开。
18. **disabled 样式**：禁用 Panel → `.exd-collapse-panel-disabled`。
19. **title ReactNode**：`title` 为自定义节点 → 能查询到。
20. **ref**：转发到外层 `div`。

## 评分

- 交互覆盖：5/5
- 分支覆盖：4/5
- 边界处理：5/5
- 场景真实度：5/5
- 综合评分：19/20
