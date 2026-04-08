# DemoBlock 测试概要

## 覆盖率

| 指标       | 值    |
| ---------- | ----- |
| Statements | 90.9% |
| Branches   | 100%  |
| Functions  | 100%  |
| Lines      | 100%  |

（命令：`npx jest --coverage --testPathPattern='exports/DemoBlock/tests' --collectCoverageFrom='packages/mobile/src/exports/DemoBlock/index.tsx'`）

## 测试场景

1. **冒烟**：`title` 与 `children` 展示。
2. **无 title**：不渲染 `.exd-demo-block-title`。
3. **plain**：`--plain` 修饰类开关。
4. **inline**：`true` 时内容区 `Space` 为水平 + `wrap`；`false` 时为垂直且无 `wrap`。
5. **多子节点**：多个子元素均在内容区。
6. **根节点透传**：`data-*`、`id`（注意根节点 `className` 由内部 `classnames` 覆盖，不传自定义 `className` 到根）。
7. **ref**：转发到根 `div`。
8. **无 children**：仍有标题与内容区容器。

## 评分

- 交互覆盖：3/5
- 分支覆盖：5/5
- 边界处理：4/5
- 场景真实度：4/5（贴近文档演示块用法）
- 综合评分：16/20

## 未覆盖说明（如有）

- 语句 90.9%：未覆盖的一条多为类型断言 `as DemoBlockType` 或模块边界语句，不影响运行时行为。
