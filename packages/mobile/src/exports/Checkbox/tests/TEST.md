# Checkbox 测试概要

## 覆盖率

以下数据来自定向采集（仅统计 `Checkbox/index.tsx` 与 `Checkbox/Group/index.tsx`，避免全量 `collectCoverageFrom` 下未加载文件显示为 0% 的干扰）。

```bash
npx jest --coverage --testPathPattern='exports/Checkbox/tests' --no-silent \
  --collectCoverageFrom='packages/mobile/src/exports/Checkbox/index.tsx' \
  --collectCoverageFrom='packages/mobile/src/exports/Checkbox/Group/index.tsx'
```

### 合并（上述双文件）

| 指标       | 值               |
| ---------- | ---------------- |
| Statements | **98%** (49/50)  |
| Branches   | **100%** (22/22) |
| Functions  | **100%** (8/8)   |
| Lines      | **100%** (42/42) |

### 分文件

| 文件                               | Statements     | Branches     | Functions  | Lines        |
| ---------------------------------- | -------------- | ------------ | ---------- | ------------ |
| `exports/Checkbox/index.tsx`       | 100% (29/29)   | 100% (16/16) | 100% (4/4) | 100% (25/25) |
| `exports/Checkbox/Group/index.tsx` | 95.23% (20/21) | 100% (6/6)   | 100% (4/4) | 100% (17/17) |

单文件仅采集（与上同测套件，仅改 `collectCoverageFrom`）时，`index.tsx` 与 `Group/index.tsx` 的百分比与上表一致。

## 源码与类型要点

- **Checkbox（type.tsx）**：`checked` / `defaultChecked` / `onChange(checked)`、`value`（Group 用）、`disabled`、`block`、`description`、`icon`（节点或 `(checked) => node`）、`children`、`className` 及 label 透传等。
- **Checkbox 实现分支**：Group 上下文与独立模式；`checked` 来自 `ctxValue.includes(value)` 或 `useIOControl`；点击时 `disabled` 短路、Group 下 `setCtxValue`（增删数组项）或 `setIOChecked` 取反；`description` 条件渲染；`run(icon, …)` 支持函数 icon。
- **Group**：`useIOControl` 管 `value`；`options` 为数组时用 `Space`（`block` 决定 `wrap` 与 `direction`），否则渲染 `children`；上下文下发 `icon` / `block` / `disabled`。

## 测试场景

1. **冒烟与导出**：结构类名、`prefix`、`defaultIcon` 选中/未选中渲染。
2. **Props**：`checked` / `defaultChecked` / `disabled` / `block` / `description`（字符串与节点）/ 无 description / `icon` 节点与函数 / `className` / label 透传 `data-testid`。
3. **userEvent**：非受控点击 `onChange`；禁用不触发；icon 函数随点击更新 `checked`。
4. **受控与非受控**：`defaultChecked` 双次点击；仅 `checked` 不自切；`checked` + `onChange` 联动。
5. **Group**：多选增删与 `onChange`；Group `disabled`；`block` 透传；子项 `block` 覆盖；Group 级 `icon`；`options` 横向+`wrap` / 纵向无 `wrap`；option 单项 `disabled`；数值 `value`；受控 `value`；仅 children；`options={[]}`；传入 `ref` 不抛错。
6. **ref**：Checkbox 指向 `label`。

## 评分

- 交互覆盖：5/5（`userEvent` 主路径，Group 多选）
- 分支覆盖：5/5（options / block、禁用、受控路径均有覆盖）
- 边界处理：4/5（空 options、ref、描述节点；Istanbul 在 Group 上仍记 1 条未覆盖 statement，见下）
- 场景真实度：5/5（与表单多选、选项列表一致）
- **综合评分：19/20**

## 未覆盖说明（如有）

- `Group/index.tsx` 在 Istanbul 下仍显示 **1/21 条 statement 未覆盖**（行级已为 100%），合并口径 statements 为 **98%**；已满足「Statements ≥ 90% / Branches ≥ 85%」目标。
- 全仓库默认 `jest --coverage` 的 summary 为聚合结果；评估 Checkbox 请以本文「定向 collectCoverageFrom」为准。
