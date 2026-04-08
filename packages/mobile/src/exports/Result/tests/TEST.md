# Result 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

（`npx jest --coverage --testPathPattern='exports/Result/tests' --collectCoverageFrom='packages/mobile/src/exports/Result/index.tsx'`）

## 测试场景

1. **冒烟**：根容器。
2. **status**：四种内置状态类 + 图标区、无 status 无状态类。
3. **icon**：覆盖 status、仅 icon。
4. **title/description**：字符串与 React 节点。
5. **children / className / 透传**：按钮子树、`data-*`。
6. **边界**：无图标、空字符串 title/description 不渲染对应块。

## 评分

- 交互覆盖：2/5（展示型）
- 分支覆盖：5/5
- 边界处理：5/5
- 场景真实度：4/5
- **综合评分：16/20**

## 未覆盖说明（如有）

无。
