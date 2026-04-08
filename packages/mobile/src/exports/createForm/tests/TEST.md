# createForm 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | —    |
| Functions  | —    |
| Lines      | 100% |

（`npx jest --coverage --testPathPattern='packages/mobile/src/exports/createForm/tests' --collectCoverageFrom='packages/mobile/src/exports/createForm/index.ts'`）

> 注：仅统计 `index.ts` 重导出入口；表单实现见 `createForm.ts`。

## 测试场景

1. 命名导出与默认导出一致。
2. 实例 API 齐全与 `__isFormInstance`。
3. `getValues` / `setValue` / `reset`。
4. `validate` 无 rules。
5. `setValues`、`getField`、`hasField`、`removeField`、`addField`。
6. `setError` / `setErrors`、`watchValues` / `watchErrors`（`debounce: false`）。

## 评分

- 交互覆盖：3/5
- 分支覆盖：4/5（实现不在本文件）
- 边界处理：4/5
- 场景真实度：4/5
- **综合评分：15/20**

## 未覆盖说明（如有）

无（针对 `index.ts`）。
