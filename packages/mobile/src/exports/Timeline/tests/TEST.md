# Timeline 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **空数据**：仅 `.exd-timeline` 容器，无子项。
2. **data 驱动**：多条 `data`，含无 `content` 字段项以覆盖解构分支。
3. **children**：无 `data` 时用 `Timeline.Item`。
4. **children 为函数**：`run(children)` 路径。
5. **data 优先**：同时传 `data` 与 `children` 时仅渲染 `data`。
6. **样式与 ref**：`className`、根 `ref`。
7. **Item**：无 `children` 无 `content-main`；自定义 `dot` / 函数 `dot`；函数 `children`；`className` 与属性透传。

## 评分

- 交互覆盖：3/5（结构型组件）
- 分支覆盖：5/5（`data.length`、`run`、Item 条件渲染）
- 边界处理：5/5（空、函数子节点、缺 content）
- 场景真实度：5/5（与类型定义一致）
- 综合评分：18/20

## 未覆盖说明（如有）

`Timeline/Item/index.tsx` 不在根目录 `collectCoverageFrom`（`exports/*/index.tsx`）内；本报告仅统计 `Timeline/index.tsx`。
