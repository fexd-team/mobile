# DatePickerView 测试概要

## 覆盖率

| 指标       | 值     |
| ---------- | ------ |
| Statements | 96.84% |
| Branches   | 83.33% |
| Functions  | 100%   |
| Lines      | 100%   |

验证命令： `npx jest --coverage --testPathPattern='exports/DatePickerView/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/DatePickerView/index.tsx'`

## 测试场景

1. **结构**：根类名 `exd-date-picker-view` 下三列 `PickerView`；`ref` / `style` / `onClick` 透传根节点。
2. **min/max**：`Date` 与时间戳数字生成年列；中间年份整月 1–12；max 年月份上限；非边界年整月；日列在非 min/max 日边界时用自然月天数（如 2 月 29 天）。
3. **标签与外观**：`rows`、`yearLabel` / `monthLabel` / `dayLabel`、`className`。
4. **pickerSort**：`['day','month','year']` 保持顺序；不完整数组回退默认 `year/month/day`。
5. **值与校验**：`defaultValue`；无效 `value`；`value === null`；受控 `value` 变更经 `useDebounceEffect` 同步（fake timers）。
6. **onChange**：无 `format` 时仅 `Date`；有 `format` 时第二参为格式化字符串（debounce 后断言）。
7. **滚动与钳制**：`PickerView` 的 `scroll` + `advanceTimersByTime` 覆盖 `handleYearChange` / `handleMonthChange` / `handleDayChange`；年份切换钳制月份；1 月 31 日切年钳制到 6 月天数；3 月 31 日切到 2 月钳制日期；`pickerSort` 以日优先时仍滚第一列。
8. **边界 — min === max**：单日范围仍可渲染。
9. **边界 — min > max 自动交换**：传入 min 大于 max 时组件自动 swap，不崩溃且年份列正确生成 2020~2025。

## 评分

- 交互覆盖：5/5（年/月/日列滚动 + 受控 value）
- 分支覆盖：4/5（format、pickerSort 回退、min/max 边界月日均覆盖；safeMin/safeMax 归一化分支及部分 years/months/days 空列表保护分支因默认值不易触发未完全覆盖）
- 边界处理：5/5（min > max、min === max、无效 value、null value）
- 场景真实度：5/5（对齐面板内滚轮选日）
- **综合评分：19/20**

## 未覆盖说明

- 行 55-56：`safeMin`/`safeMax` 的 `useMemo` 内 `min`/`max` 为 falsy 时的降级分支（组件有 defaultProps 提供默认值，实际不会走到）。
- 行 75-99：`years`/`months`/`days` 的 `if (len <= 0) return []` 防御分支（safeMin/safeMax 归一化后 len 不会为负）。
- 行 161：`pickerSort` map 中某些条件路径。
