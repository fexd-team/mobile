# Stepper 测试概要

## 覆盖率

定向命令：`npx jest --coverage --testPathPattern='exports/Stepper/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/Stepper/index.tsx'`

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

（以上针对 `packages/mobile/src/exports/Stepper/index.tsx` 单文件收集。）

## 测试场景

1. **冒烟**：根节点、wrapper、输入框存在；`prefix` 常量与设计一致。
2. **min/max 边界**：最小时减号禁用、最大时加号禁用；边界上继续点击不触发 `onChange`。
3. **step 数字**：加减按步长变化；**step 数组**：加减不同步长。
4. **step 异常**：`step={null}` 时回退步长 1（覆盖 `step?.[n] ?? step ?? 1`）。
5. **自定义 onPlus/onMinus**：覆盖默认步进实现。
6. **样式与布局**：`className`、`size`、`block`、`style`。
7. **点击与回调**：加减触发 `onChange` 且数值正确。
8. **非整数步长边界**：加号 clamp 到 max、减号 clamp 到 min。
9. **受控/非受控**：`defaultValue`、受控 `value`+`onChange`、仅 `value` 无 `onChange` 不更新。
10. **disabled**：按钮类禁用、输入 `disabled`、点击不触发 `onChange`。
11. **手动输入**：合法值、超 max clamp；**默认 normalize**：非法字符回退、中间态 `-`。
12. **allowEmpty**：清空得 `''` 与 `onChange('')`；非 allowEmpty 清空回到 0；空值加减走 `min`/`max` 或 `min ?? 0` / `max ?? 0`。
13. **初始 defaultValue**：无 `defaultValue` 时用 `min`；无 `min` 时用 `0`（`min ?? 0`）；数字 `defaultValue` 超出范围时先经 clamp。
14. **聚焦**：非 `readOnly` 时 `select`；`readOnly` 不 `select`；`onFocus`/`onBlur` 透传。
15. **ref**：`inputRef`、`wrapperRef`、`minus`/`plus`；空值时默认 `minus`/`plus` 分支。
16. **自定义 normalize**：覆盖 `normalize ??` 右侧默认实现之外的路径。

## 评分

- 交互覆盖：5/5（`userEvent` 点击/输入/清空为主，`fireEvent.blur` 补全失焦）
- 分支覆盖：5/5（含 `allowEmpty`、边界 clamp、`step` 回退、`prefix` 导出语句）
- 边界处理：5/5（空值、无 min/max、`step` null、只读/禁用）
- 场景真实度：5/5（步进器典型：点击步进、手输、受控、可空）
- **综合评分：20/20**

## 未覆盖说明

无。当前单文件收集下语句/分支/函数/行均为 100%。
