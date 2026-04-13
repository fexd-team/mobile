# CellCascadePicker 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **冒烟渲染**：默认渲染不崩溃
2. **classNamePrefix**：默认前缀 exd-cell-cascade-picker 正确应用
3. **className 透传**：自定义 className 合并到根节点

## 评分

- 交互覆盖：2/5（cloneFC 变体，核心交互由 UnstyledIO 层覆盖）
- 分支覆盖：5/5（100%）
- 边界处理：3/5（cloneFC 源码极短，主要验证 defaultProps 注入）
- 场景真实度：3/5（IO 变体的标准验证模式）
- 综合评分：13/20
