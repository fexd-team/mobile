# TimePickerView 测试概要

## 覆盖率

针对 `packages/mobile/src/exports/TimePickerView/index.tsx`：

验证命令： `npx jest --coverage --testPathPattern='exports/TimePickerView/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/TimePickerView/index.tsx'`

| 指标       | 值     |
| ---------- | ------ |
| Statements | 96.42% |
| Branches   | 90%    |
| Functions  | 100%   |
| Lines      | 100%   |

## 测试场景

1. **结构**：根类名 `exd-time-picker-view` 下三列 `PickerView`；`rows` 传入各列。
2. **列标签**：默认 `HH` / `mm` / `ss` 与自定义 `hourLabel` / `minuteLabel` / `secondLabel` 展示。
3. **onChange 形态**：有 `format` 时第二参为格式化字符串；无 `format` 时仅 `Date`、第二参为 `undefined`。
4. **受控 value**：`Date` 变更时高亮同步；可解析字符串（`YYYY-MM-DD HH:mm:ss`）与本地时间一致。
5. **无 value**：小时高亮 `00`，且仍会触发 `onChange`。
6. **列交互**：对时 / 分 / 秒三列的 `scroll` + `jest.advanceTimersByTime(150)` 覆盖三个 `handle*Change` 与 `PickerView` debounce 联动。
7. **根节点**：`ref`、`className`、多余 DOM 属性透传。
8. **min/max 小时约束**：设置 min/max 后，小时列仅渲染范围内选项（如 09~17）。
9. **min/max 分钟级联**：当前小时等于 min 小时时分钟从 min 分钟开始；等于 max 小时时截止到 max 分钟。
10. **min/max 秒级联**：当前时分均等于 min 时秒从 min 秒开始；均等于 max 时截止到 max 秒。
11. **中间时段完整列**：非边界小时时，分/秒列为完整 0~59。
12. **value 低于 min 被 clamp**：value 超出下限时自动 clamp 到 min 边界（09:15:30）。
13. **value 高于 max 被 clamp**：value 超出上限时小时被 clamp 到 max 小时。
14. **无 min/max 完整范围**：不传 min/max 时小时列为完整 0~23。

## 评分

- 交互覆盖：5/5（三列滚动 + 受控切换 + min/max 约束交互）
- 分支覆盖：4/5（`format` 分支、`dateArr` 空短路、`value` 有无、min/max 边界均覆盖；级联 clamp 的 handleHourChange/handleMinuteChange 内部条件分支因 jsdom 滚动限制未完全覆盖）
- 边界处理：5/5（无 `value`、字符串 `value`、value 超出 min/max 范围 clamp）
- 场景真实度：5/5（与面板内三列滚动选时 + 时间范围约束一致）
- **综合评分：19/20**

## 未覆盖说明

- 行 90-104：`handleHourChange` / `handleMinuteChange` 中级联 clamp 条件分支（`if (cMinute !== currentMinute)` / `if (cSecond !== currentSecond)`），需通过滚动操作触发跨列约束，jsdom 环境下难以可靠模拟。
