# BasicButton 测试概要

## 覆盖率

| 指标       | 值    |
| ---------- | ----- |
| Statements | 90.9% |
| Branches   | 100%  |
| Functions  | 100%  |
| Lines      | 100%  |

验证命令： `npx jest --coverage --testPathPattern='exports/BasicButton/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/BasicButton/index.tsx'`

## 测试场景

1. **默认渲染**：不崩溃且展示 children。
2. **类名映射**：`type` / `size` / `shape` / `fill` / `block` 正确反映到 className。
3. **disabled 样式态**：`disabled` 时带 `exd-btn-disabled` 类名。
4. **disabled 原生属性**：`disabled` 时设置原生 `disabled` 属性与 `aria-disabled`，`toBeDisabled()` 断言成立。
5. **as 非 button + disabled**：`as="a"` 等非 button 元素时仅设 `aria-disabled`，不设原生 `disabled`。
6. **onClick 阻断**：`disabled` 时 `onClick` 不触发。
7. **as 多态根节点**：`as="a"` 渲染为 `<a>` 标签并透传 `href`。
8. **空 children**：无 children 时仍渲染按钮。
9. **ref 转发**：ref 指向根 DOM 元素。
10. **defaultProps 显式覆盖**：显式传入与 defaultProps 一致的值仍生成完整类名。

## 评分

- 交互覆盖：5/5（点击、disabled 阻断）
- 分支覆盖：5/5（所有 prop 枚举值与条件分支均有覆盖）
- 边界处理：5/5（空 children、ref、as 非 button + disabled）
- 场景真实度：5/5（原生可访问性语义验证）
- **综合评分：20/20**

## 未覆盖说明

- 约 1 条 statement 未命中（`createFC` 包装层内部逻辑），不影响组件自身逻辑覆盖。
