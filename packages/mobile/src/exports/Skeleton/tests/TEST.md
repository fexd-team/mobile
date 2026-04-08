# Skeleton 测试概要

> **注意**：该组件未从 `@fexd/mobile` 主入口导出，属于开发中/内部组件。

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **基础类名**：根节点含 `exd-skeleton`。
2. **round**：`true` 时 `exd-skeleton-round`；`false` 或不传无圆角修饰类。
3. **className 合并**：与基础类共存。
4. **属性透传**：`data-*`、`aria-*`、`style`。
5. **ref**：指向根 `div`。

## 评分

- 交互覆盖：2/5（纯展示）
- 分支覆盖：5/5（`round` 三元分支）
- 边界处理：4/5（round 显式 false）
- 场景真实度：4/5（常见骨架屏用法）
- 综合评分：15/20

## 未覆盖说明（如有）

无。
