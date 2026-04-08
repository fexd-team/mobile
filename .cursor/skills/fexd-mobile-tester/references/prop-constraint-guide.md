# Prop 约束识别与测试指南

## 什么是 Prop 约束

当组件的两个或多个 prop 之间存在逻辑依赖关系时，称之为 prop 约束。单独测试每个 prop 是不够的——必须测试它们的交互行为。

## 四种约束模式

### 模式一：范围约束（min/max）

**识别标志**：type.tsx 中同时出现 `min` 和 `max` prop。

**典型组件**：DatePickerView、TimePickerView、Slider、Stepper

**测试要点**：

1. min < max 的正常情况
2. min === max 的退化情况
3. value 超出 [min, max] 范围时的 clamp 行为
4. **关键**：高位列变更（年 → 月 → 日）后，低位列是否正确重算范围

```tsx
describe('DatePickerView min/max 约束', () => {
  test('value 小于 min 时 clamp 到 min', () => {
    const minDate = new Date(2024, 5, 15)
    const handleChange = jest.fn()

    render(<DatePickerView min={minDate} value={new Date(2024, 0, 1)} onChange={handleChange} />)

    // 验证组件是否将显示值 clamp 到 min
  })

  test('切换年份后月份范围更新', () => {
    // 场景：min=2024-06-15, 当前选中 2025-03-10
    // 切换年份到 2024 后，月份应从 6 月开始
  })

  test('切换月份后日期范围更新', () => {
    // 场景：选中 2024-01-31，切换到 2 月
    // 日期应 clamp 到 29（2024 是闰年）
  })
})
```

### 模式二：互斥约束

**识别标志**：两个 prop 不应同时生效，或一个 prop 会覆盖另一个。

**典型场景**：

- `accordion` 模式下 `activeKey` 只能是单值
- `disabled` 时 `onClick` 不触发

```tsx
test('accordion 模式下 defaultActiveKey 为数组只取第一个', () => {
  const { container } = render(
    <Collapse accordion defaultActiveKey={['1', '2']}>
      <Panel title="A" key="1">
        内容A
      </Panel>
      <Panel title="B" key="2">
        内容B
      </Panel>
    </Collapse>,
  )

  // 只有第一个面板展开
  const panels = container.querySelectorAll('.exd-collapse-panel')
  expect(panels[0]).toHaveClass('exd-collapse-panel--active')
  expect(panels[1]).not.toHaveClass('exd-collapse-panel--active')
})
```

### 模式三：级联约束

**识别标志**：一个 prop 的取值决定另一个 prop 的可选范围。

**典型组件**：DatePickerView（年决定月范围、月决定日范围）、Picker 多级联动

**测试策略**：按级联深度逐层测试。

```tsx
describe('DatePickerView 级联约束', () => {
  test('第一层级联：年份 → 月份范围', () => {
    // min=2024-06, max=2025-03
    // 选 2024 年时月份 6-12
    // 选 2025 年时月份 1-3
  })

  test('第二层级联：月份 → 日期范围', () => {
    // 选 2024-02 时日期 1-29
    // 选 2024-04 时日期 1-30
  })

  test('级联连锁：年→月→日全链路', () => {
    // min=2024-06-15, max=2024-06-20
    // 年/月固定，日期范围 15-20
  })
})
```

### 模式四：格式约束

**识别标志**：`format`、`pickerSort` 等影响输出/显示格式的 prop。

**典型组件**：DatePickerView（pickerSort 改变列顺序）、DatePicker（format 改变输出字符串）

```tsx
test('pickerSort 改变列的排列顺序', () => {
  const { container } = render(<DatePickerView pickerSort={['month', 'day', 'year']} />)
  const columns = container.querySelectorAll('.exd-picker-view-column')
  // 验证第一列是月份、第二列是日期、第三列是年份
})

test('format 影响 onChange 的格式化输出', () => {
  const handleChange = jest.fn()
  render(<DatePickerView format="YYYY/MM/DD" onChange={handleChange} />)
  // 触发变更后验证 formattedValue 格式
  // expect(handleChange).toHaveBeenCalledWith(expect.any(Date), expect.stringMatching(/\d{4}\/\d{2}\/\d{2}/))
})
```

## 约束识别检查清单

分析 type.tsx 时按此清单逐项排查：

| 检查项                                 | 查找方式                    | 约束类型           |
| -------------------------------------- | --------------------------- | ------------------ |
| 同时有 `min` 和 `max`                  | type.tsx 搜索               | 范围约束           |
| 有 `accordion` / `multiple` 等模式切换 | type.tsx 搜索               | 互斥约束           |
| Picker 类组件的多列                    | 源码中查找 columns 生成逻辑 | 级联约束           |
| 有 `format` / `xxxSort` / `xxxLabel`   | type.tsx 搜索               | 格式约束           |
| `disabled` 与 `onXxx` 的交互           | 所有交互组件                | 互斥约束           |
| 受控 `value` 与 `defaultValue`         | 使用 useIOControl           | 互斥约束（二选一） |

## 编写约束测试的原则

1. **先测正常约束**：min < max 的常规场景
2. **再测退化约束**：min === max、空范围
3. **最后测违反约束**：value 超出范围、冲突 prop 同时传入
4. 每个约束模式至少一个 test case
5. 级联约束按深度展开，每层一个 test case
