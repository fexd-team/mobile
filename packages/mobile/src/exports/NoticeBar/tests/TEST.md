# NoticeBar 测试概要

> **注意**：该组件未从 `@fexd/mobile` 主入口导出，属于开发中/内部组件。

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **跑马灯**：`animation` 为 `true`（默认）时双 `.exd-notice-bar-content` 与 `scrollable` 类。
2. **静态**：`animation` 为 `false` 时单 `.exd-notice-bar-text`，无 `scrollable`。
3. **内容**：`text` 支持 React 节点；默认空字符串。
4. **样式与 a11y**：`className` 合并；`role` / `aria-live` 透传。
5. **ref**：转发到根 `div`。

## 评分

- 交互覆盖：3/5（展示为主，无滚动动画断言）
- 分支覆盖：5/5（`animation` 两分支均覆盖）
- 边界处理：4/5（空文案、节点文案）
- 场景真实度：5/5（跑马灯/静态与文档一致）
- 综合评分：17/20

## 未覆盖说明（如有）

未对 CSS 动画/实际横向滚动做端到端断言（依赖浏览器布局）。
