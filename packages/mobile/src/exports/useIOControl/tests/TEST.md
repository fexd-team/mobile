# useIOControl 测试概要

含同目录内 **`useControllableValue.tsx`**（`filterIOValue` 包装逻辑）的联合覆盖率。

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

> 命令：`npx jest --coverage --testPathPattern='exports/useIOControl/tests' --collectCoverageFrom='packages/mobile/src/exports/useIOControl/index.ts' --collectCoverageFrom='packages/mobile/src/exports/useIOControl/useControllableValue.tsx'`

## 测试场景

1. **返回值**：`value` / `setValue` / `getValue` / `focused` / `setFocused` / `getFocused`。
2. **非受控**：`defaultValue`、无 `defaultValue` 时 `undefined`。
3. **受控**：`value` + `onChange`，`setValue` 触发回调；外部 `value` 变更同步。
4. **聚焦**：聚焦后受控 `value` 键剥离链路仍可 `setValue` 与失焦恢复。
5. **setValue**：函数式更新、与当前值相同则短路。
6. **自定义 IO 名**：`checked` / `onCheckedChange` 等 `valuePropName` 选项。
7. **filterIOValue**：过滤为 `false` 时展示与 `setValue` 短路；未定义时恒可用。

## 评分

- 交互覆盖：4/5（以 `renderHook` + `act` 为主）
- 分支覆盖：5/5
- 边界处理：4/5
- 场景真实度：4/5
- 综合评分：17/20

## 未覆盖说明

无（当前联合收集下四项均为 100%）。
