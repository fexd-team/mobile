# Slider 测试概要

## 覆盖率

以下数据来自命令：

`npx jest --coverage --testPathPattern='exports/Slider/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/Slider/index.tsx'`

| 指标       | 值     |
| ---------- | ------ |
| Statements | 98.63% |
| Branches   | 95.34% |
| Functions  | 100%   |
| Lines      | 100%   |

（目标：Statements ≥ 90%、Branches ≥ 85%，已满足。）

## 测试场景

1. **冒烟**：默认渲染根节点、bar、track、thumb；横向类名；`ref` 指向根 DOM。
2. **Props**：`disabled`、`vertical`、`thumb={false}`、`track={false}`、`min`/`max` 与数组 `defaultValue`、`track="inverted"`（水平/垂直）、双滑块（`defaultValue` 为数字时 `value`/`defaultValue` 均非数组）。
3. **水平拖拽**：`mouseDown` → `mouseMove` → `mouseUp`，校验 `onChange` / `onChangeCommitted`、`step` 对齐、超出 `min`/`max` 钳制；`rate={0}` 关闭节流保证确定性。
4. **垂直拖拽**：纵向移动与 `100 - percentY` 映射；双触点 `touchStart` 与排序后的 `[from, to]`。
5. **双滑块与中间点**：`defaultValue={80}` 得到内部 `[0,80]`，触点在中点左/右分别更新 `from` / `to`；`onChange` 与 `onChangeCommitted` 传出元组。
6. **双触点顺序**：水平双触点左右顺序两种，`firstPercent` 与 `secondPercent` 交换分支均被覆盖。
7. **受控/非受控**：数组 `defaultValue` / `value`；受控 `value` 为 `number` 时单滑块与 `onChange` 为标量。
8. **归一化**：`defaultValue` 为 `null` 时退化为 `[min, min]`。
9. **禁用**：`disabled` 时拖拽不触发 `onChange`。

## 评分

- **交互覆盖**：5/5（完整鼠标拖拽链、垂直拖拽、双触点触摸）
- **分支覆盖**：5/5（单/双滑块、`inverted` 纵横、`applyValue` 中间点与双指分支）
- **边界处理**：4/5（钳制、步进、异常 `defaultValue`；见下方未覆盖说明）
- **场景真实度**：5/5（对齐 `useTouch` 的 document 级 mousemove/mouseup 与固定 `getBoundingClientRect`）
- **综合评分**：19/20

## 未覆盖说明

- **第 71 行**：`useIOControl` 解构中的 `value = []` 默认值；在现有 `defaultProps` 与归一化逻辑下，`value` 始终为合法二元组，该默认分支不可达。
- **第 96 行**：`setValue` 回调形参 `[valueFrom, valueTo] = [min, min]` 的默认值；`useIOControl` 传入的上一次值始终为已归一化的数组，回调几乎不会收到需触发该默认的入参。
