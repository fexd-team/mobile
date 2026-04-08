# Space 测试概要

## 覆盖率

| 指标       | 值     |
| ---------- | ------ |
| Statements | 94.44% |
| Branches   | 100%   |
| Functions  | 100%   |
| Lines      | 100%   |

（命令：`npx jest --coverage --testPathPattern='exports/Space/tests' --collectCoverageFrom='packages/mobile/src/exports/Space/index.tsx'`）

## 测试场景

1. **冒烟**：水平方向多子节点与 `.exd-space-item` 数量。
2. **direction**：`vertical` / `horizontal` 修饰类。
3. **wrap**：`wrap` 时负 `marginBottom` 与 `exd-space-wrap`；关闭 wrap 时无负边距。
4. **align**：水平默认 `center`；垂直不强制 align；`start` / `end` / `center` / `baseline`。
5. **gap**：关键字 `middle` / `large`、元组混用、元组第二项关键字、`null` 回退间距。
6. **split**：分隔符渲染。
7. **className / data-\* / ref**：透传与 ref。
8. **间距边界**：最后一项无右侧间距。

## 评分

- 交互覆盖：3/5
- 分支覆盖：5/5（分支指标 100%，语句尚有 1 条未计满）
- 边界处理：5/5
- 场景真实度：4/5
- 综合评分：17/20

## 未覆盖说明（如有）

- 语句覆盖率 94.44%（17/18）：剩余 1 条语句为 Istanbul 对单行内表达式的切分，对运行时行为影响可忽略；若需凑满 100%，可再针对 `gap` / `childrenLength` 极端形态补充用例。
