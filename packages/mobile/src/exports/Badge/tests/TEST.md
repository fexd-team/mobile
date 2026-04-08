# Badge 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

（`npx jest --coverage --testPathPattern='exports/Badge/tests' --collectCoverageFrom='packages/mobile/src/exports/Badge/index.tsx'`）

## 测试场景

1. **冒烟**：仅 `content` 渲染数字徽标。
2. **类型与颜色**：四种 `type`、非法 `type`、`color`/`bgColor` 内联样式。
3. **圆点**：`dot` 独立与 `dot + children` 的 fixed 布局。
4. **overflowCount**：超出显示 `n+`、未超出、非数字 content/overflow 不走溢出逻辑。
5. **showZero**：字符串 `0` 在 `showZero` 开/关下的展示。
6. **offset**：数组百分比、`NaN` 轴跳过、非数组不传位。
7. **显隐与结构**：`visible`、`wrap`、独立徽标、无徽标。
8. **边界**：`content` 为 `null`、空白 `span` children。

## 评分

- 交互覆盖：3/5（展示型组件，无复杂操作链）
- 分支覆盖：5/5
- 边界处理：5/5
- 场景真实度：4/5
- **综合评分：17/20**

## 未覆盖说明（如有）

无。
