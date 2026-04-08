# Alert 测试概要

## 覆盖率

（`npx jest --coverage --testPathPattern='exports/Alert/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/Alert/index.tsx'`）

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **冒烟**：默认渲染 `children`、根节点类名。
2. **type**：success / warning / info / error 四类样式类。
3. **variant**：outlined、filled 修饰类。
4. **className**：合并到根节点。
5. **图标**：`showIcon={false}`、自定义 `icon`。
6. **标题**：`title` 与 `exd-alert-has-title`。
7. **可关闭**：`closable` + 默认图标 / `closeText`、`onClose` 回调、无 `onClose` 不抛错。
8. **prefix 导出**：`export const prefix` 常量断言。

## 评分

- 交互覆盖：4/5（关闭区使用 userEvent）
- 分支覆盖：5/5（含各 type 与可选链分支）
- 边界处理：4/5（无 onClose、无图标等）
- 场景真实度：4/5（对齐 demos 常见组合）
- 综合评分：17/20

## 未覆盖说明

无。
