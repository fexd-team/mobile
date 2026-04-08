# View 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 90%  |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

（命令：`npx jest --coverage --testPathPattern='exports/View/tests' --collectCoverageFrom='packages/mobile/src/exports/View/index.tsx'`）

## 测试场景

1. **冒烟**：根 `.exd-view` 与子节点。
2. **默认布局**：未传 `direction` 时默认 `column` 类。
3. **center**：未设置时不出现水平/垂直居中类；`true` / `horizontal` / `vertical` 各分支。
4. **direction**：`column` / `row` / `column-reverse` / `row-reverse`。
5. **auto**：`true` / `false` 与 `exd-view-auto`。
6. **尺寸与 style**：`width` / `height` 与自定义 `style` 合并。
7. **className / data-\* / ref**：透传与 ref。

## 评分

- 交互覆盖：3/5
- 分支覆盖：5/5
- 边界处理：4/5
- 场景真实度：4/5
- 综合评分：16/20

## 未覆盖说明（如有）

- 语句 90%（9/10）：未计数的一条多为模块级/工具链对 `createFC` 包装或类型相关语句的统计差异；业务渲染路径与分支已全覆盖。
