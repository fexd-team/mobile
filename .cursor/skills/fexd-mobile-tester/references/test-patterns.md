# 测试模板参考

每层提供完整示例，直接参考编写。本文件覆盖：基础八层 + userEvent + touch/drag 交互序列 + 覆盖率驱动补充。

## L1 冒烟测试

```tsx
import { render, screen } from '@testing-library/react'
import Switch from '..'

describe('Switch', () => {
  test('默认渲染不崩溃', () => {
    const { container } = render(<Switch />)
    expect(container.querySelector('.exd-switch')).toBeInTheDocument()
  })
})
```

复合组件需同时渲染父子：

```tsx
import Collapse from '..'
import Panel from '../Panel'

test('默认渲染不崩溃', () => {
  const { container } = render(
    <Collapse>
      <Panel title="标题" key="1">
        内容
      </Panel>
    </Collapse>,
  )
  expect(container.querySelector('.exd-collapse')).toBeInTheDocument()
})
```

## L2 Prop 逐项

### 布尔 prop

```tsx
test('disabled 属性能正常工作', () => {
  const { container: enabled } = render(<Switch />)
  const { container: disabled } = render(<Switch disabled />)
  expect(enabled.querySelector('.exd-switch')).not.toHaveClass('exd-switch--disabled')
  expect(disabled.querySelector('.exd-switch')).toHaveClass('exd-switch--disabled')
})
```

### 枚举 prop

```tsx
const types = ['primary', 'success', 'warning', 'danger'] as const
types.forEach((type) => {
  test(`type="${type}" 渲染正确`, () => {
    const { container } = render(<Button type={type}>按钮</Button>)
    expect(container.querySelector('.exd-button')).toHaveClass(`exd-button--${type}`)
  })
})
```

### ReactNode prop

```tsx
test('expandIcon 自定义图标', () => {
  const { container } = render(
    <Collapse expandIcon={<span data-testid="custom-icon">▶</span>}>
      <Panel title="标题" key="1">
        内容
      </Panel>
    </Collapse>,
  )
  expect(container.querySelector('[data-testid="custom-icon"]')).toBeInTheDocument()
})
```

## L3 事件回调 — 交互序列模板

### 基础回调（使用 userEvent）

```tsx
import userEvent from '@testing-library/user-event'

test('点击触发 onChange', async () => {
  const user = userEvent.setup()
  const handleChange = jest.fn()
  const { container } = render(<Switch onChange={handleChange} />)

  await user.click(container.querySelector('.exd-switch')!)
  expect(handleChange).toHaveBeenCalledTimes(1)
  expect(handleChange).toHaveBeenCalledWith(true)
})
```

### 多步输入序列

```tsx
test('输入 → blur → 校验联动', async () => {
  const user = userEvent.setup()
  const form = Form.createForm()
  render(
    <Form form={form}>
      <Field name="email" rules={[(v: string) => v.includes('@') || '需要邮箱格式']}>
        {({ value, setValue, error }) => (
          <>
            <input data-testid="inp" value={value ?? ''} onChange={(e) => setValue(e.target.value)} />
            <span data-testid="err">{error || ''}</span>
          </>
        )}
      </Field>
    </Form>,
  )

  const inp = screen.getByTestId('inp')
  await user.type(inp, 'invalid')
  await user.tab() // blur
  await waitFor(() => {
    expect(screen.getByTestId('err')).toHaveTextContent('需要邮箱格式')
  })

  await user.clear(inp)
  await user.type(inp, 'a@b.com')
  await user.tab()
  await waitFor(() => {
    expect(screen.getByTestId('err')).toHaveTextContent('')
  })
})
```

### Checkbox/Radio Group 多步选择

```tsx
test('多选：连续点击加入与取消并触发 Group onChange', async () => {
  const user = userEvent.setup()
  const onChange = jest.fn()
  render(
    <Checkbox.Group defaultValue={[]} onChange={onChange}>
      <Checkbox value="a">A</Checkbox>
      <Checkbox value="b">B</Checkbox>
      <Checkbox value="c">C</Checkbox>
    </Checkbox.Group>,
  )

  await user.click(screen.getByText('A'))
  expect(onChange).toHaveBeenLastCalledWith(['a'])

  await user.click(screen.getByText('C'))
  expect(onChange).toHaveBeenLastCalledWith(['a', 'c'])

  await user.click(screen.getByText('A'))
  expect(onChange).toHaveBeenLastCalledWith(['c'])
})
```

## L3+ Touch 事件序列模板（移动端核心）

touch 事件用 fireEvent（userEvent 不支持 touch API）。

### 标准 touch 滑动

```tsx
test('touch 滑动选择评分', () => {
  jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    width: 200,
    height: 40,
    top: 0,
    left: 0,
    bottom: 40,
    right: 200,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  } as DOMRect)

  const onChange = jest.fn()
  const { container } = render(<Rate defaultValue={0} onChange={onChange} />)
  const root = container.querySelector('.exd-rate')!

  fireEvent.touchStart(root, { touches: [{ clientX: 0, clientY: 20 }] })
  fireEvent.touchMove(root, { touches: [{ clientX: 80, clientY: 20 }] })
  fireEvent.touchEnd(root)

  expect(onChange).toHaveBeenCalled()
  const lastValue = onChange.mock.calls[onChange.mock.calls.length - 1][0]
  expect(lastValue).toBeGreaterThan(0)

  jest.restoreAllMocks()
})
```

### Swiper touch 翻页

```tsx
test('touch 右滑切换到下一张', () => {
  jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    width: 300,
    height: 200,
    top: 0,
    left: 0,
    bottom: 200,
    right: 300,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  } as DOMRect)

  const onChange = jest.fn()
  const { container } = render(
    <Swiper autoplay={false} defaultValue={0} onChange={onChange}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Swiper>,
  )

  const root = container.querySelector('.exd-swiper')!
  fireEvent.touchStart(root, { touches: [{ clientX: 250, clientY: 100 }] })
  fireEvent.touchMove(root, { touches: [{ clientX: 150, clientY: 100 }] })
  fireEvent.touchMove(root, { touches: [{ clientX: 50, clientY: 100 }] })
  fireEvent.touchEnd(root)

  expect(onChange).toHaveBeenCalled()

  jest.restoreAllMocks()
})
```

## L3+ 拖拽序列模板（mouseDown/Move/Up）

### Slider 拖拽

```tsx
test('拖拽滑块从起点到 50% 位置', () => {
  jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    width: 200,
    height: 40,
    top: 0,
    left: 0,
    bottom: 40,
    right: 200,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  } as DOMRect)

  const onChange = jest.fn()
  const { container } = render(<Slider defaultValue={[0, 0]} onChange={onChange} min={0} max={100} />)
  const root = container.querySelector('.exd-slider')!

  fireEvent.mouseDown(root, { clientX: 0, clientY: 20 })
  fireEvent.mouseMove(root, { clientX: 50, clientY: 20 })
  fireEvent.mouseMove(root, { clientX: 100, clientY: 20 })
  fireEvent.mouseUp(root, { clientX: 100, clientY: 20 })

  expect(onChange).toHaveBeenCalled()
  const lastVal = onChange.mock.calls[onChange.mock.calls.length - 1][0]
  expect(lastVal).toBe(50)

  jest.restoreAllMocks()
})
```

### Slider 竖向拖拽

```tsx
test('竖向拖拽滑块', () => {
  jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    width: 40,
    height: 200,
    top: 0,
    left: 0,
    bottom: 200,
    right: 40,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  } as DOMRect)

  const onChange = jest.fn()
  const { container } = render(<Slider vertical defaultValue={[0, 0]} onChange={onChange} min={0} max={100} />)
  const root = container.querySelector('.exd-slider')!

  fireEvent.mouseDown(root, { clientX: 20, clientY: 200 })
  fireEvent.mouseMove(root, { clientX: 20, clientY: 100 })
  fireEvent.mouseUp(root, { clientX: 20, clientY: 100 })

  expect(onChange).toHaveBeenCalled()

  jest.restoreAllMocks()
})
```

## L4 Prop 约束

详细约束识别方法参见 [prop-constraint-guide.md](prop-constraint-guide.md)。

### min/max 约束

```tsx
test('value 超出 max 时被 clamp', () => {
  const { container } = render(<Slider min={0} max={100} defaultValue={[0, 150]} />)
  const node = container.querySelector('.exd-slider-node') as HTMLElement
  expect(node?.style.left).toBe('100%')
})
```

### accordion 互斥约束

```tsx
test('accordion 模式下只有一个面板展开', () => {
  const onChange = jest.fn()
  const { getByText } = render(
    <Collapse accordion onChange={onChange} defaultActiveKey={[]}>
      <Panel title="面板一" key="1">
        内容一
      </Panel>
      <Panel title="面板二" key="2">
        内容二
      </Panel>
    </Collapse>,
  )
  fireEvent.click(getByText('面板一'))
  expect(onChange).toHaveBeenLastCalledWith(['1'])
  fireEvent.click(getByText('面板二'))
  expect(onChange).toHaveBeenLastCalledWith(['2'])
})
```

## L5 受控/非受控

### 非受控模式

```tsx
test('非受控：defaultChecked 设置初始值，交互后自行变化', async () => {
  const user = userEvent.setup()
  const { container } = render(<Switch defaultChecked={true} />)
  const sw = container.querySelector('.exd-switch')!
  expect(sw).toHaveClass('exd-switch-checked')
  await user.click(sw)
  expect(sw).not.toHaveClass('exd-switch-checked')
})
```

### 受控模式

```tsx
test('受控：外部 checked 不变时点击不切换', async () => {
  const user = userEvent.setup()
  const { container } = render(<Switch checked={false} />)
  const sw = container.querySelector('.exd-switch')!
  await user.click(sw)
  expect(sw).not.toHaveClass('exd-switch-checked')
})

test('受控：通过 onChange 更新外部状态', async () => {
  const user = userEvent.setup()
  function Wrapper() {
    const [checked, setChecked] = React.useState(false)
    return <Switch checked={checked} onChange={setChecked} />
  }
  const { container } = render(<Wrapper />)
  const sw = container.querySelector('.exd-switch')!
  await user.click(sw)
  expect(sw).toHaveClass('exd-switch-checked')
})
```

## L6 边界异常

```tsx
test('value 为 null 时不崩溃', () => {
  expect(() => render(<Input value={null as any} />)).not.toThrow()
})

test('children 中包含 null 不崩溃', () => {
  expect(() =>
    render(
      <Collapse>
        {null}
        <Panel title="标题" key="1">
          内容
        </Panel>
      </Collapse>,
    ),
  ).not.toThrow()
})
```

## L7 异步与定时

### waitFakeTimers（推荐）

多层 setTimeout / debounce 嵌套场景（toast duration、loading debounce、Modal onConflict、PickerView scroll 等），使用共享工具 `waitFakeTimers` 批量推进，避免手算精确毫秒：

```tsx
import { waitFakeTimers } from '../../../tests/testing'

test('PickerView scroll debounce 后触发 onChange', async () => {
  jest.useFakeTimers()
  const onChange = jest.fn()
  const { container } = render(<PickerView options={options} onChange={onChange} />)

  const content = container.querySelector('.exd-picker-view-content')!
  content.scrollTop = 100
  fireEvent.scroll(content)

  expect(onChange).not.toHaveBeenCalled()
  await waitFakeTimers(3, 100)
  expect(onChange).toHaveBeenCalled()
  jest.useRealTimers()
})
```

### 精确 timer（知道确切延迟时）

```tsx
test('onChange 通过 debounce 延迟触发', () => {
  jest.useFakeTimers()
  const handleChange = jest.fn()
  render(<DatePickerView onChange={handleChange} />)
  // ...触发滚动变更...
  expect(handleChange).not.toHaveBeenCalled()
  jest.advanceTimersByTime(100)
  expect(handleChange).toHaveBeenCalledTimes(1)
  jest.useRealTimers()
})
```

### autoplay 自动播放

```tsx
test('autoplay 定时切换', () => {
  jest.useFakeTimers()
  const onChange = jest.fn()
  render(
    <Swiper autoplay interval={3000} onChange={onChange}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Swiper>,
  )
  jest.advanceTimersByTime(3000)
  expect(onChange).toHaveBeenCalled()
  jest.useRealTimers()
})
```

### 日期组件 mock 当前时间

DatePicker / DatePickerView / TimePicker 内部依赖当前日期计算默认值和列数据，不 mock 会因执行日期不同导致 flaky：

```tsx
test('DatePickerView 默认显示指定年月', () => {
  jest.useFakeTimers({ now: new Date('2025-06-15') })
  const { container } = render(<DatePickerView />)
  // 断言默认选中的年/月/日
  jest.useRealTimers()
})
```

## L8 复合与 Portal

### 命令式 API（完整生命周期）

基于 createModalAPI 的 toast/notify/loading 需测试完整四步：show → 验证 → close → 验证移除。

```tsx
import { render, act, waitFor } from '@testing-library/react'
import { cleanupModals } from '../../../tests/testing'
import ModalStation from '../../ModalStation'
import toast from '..'

afterEach(cleanupModals)

test('toast 完整生命周期：show → 验证 DOM → close → 验证移除', async () => {
  render(<ModalStation />)

  let controller: any
  await act(async () => {
    controller = toast.info('消息内容')
  })
  expect(document.body.textContent).toContain('消息内容')

  await act(async () => {
    controller.close()
  })
  await waitFor(() => {
    expect(document.body.textContent).not.toContain('消息内容')
  })
})
```

### 命令式 API 自动关闭（waitFakeTimers）

toast/notify 的 `duration` 使用 setTimeout 自动关闭，需配合 fake timer 测试：

```tsx
import { waitFakeTimers, cleanupModals } from '../../../tests/testing'

afterEach(() => {
  jest.useRealTimers()
  return cleanupModals()
})

test('toast 在 duration 后自动关闭', async () => {
  jest.useFakeTimers()
  render(<ModalStation />)
  await act(async () => {
    toast.info('自动消失', { duration: 2000 })
  })
  expect(document.body.textContent).toContain('自动消失')

  await waitFakeTimers()
  await waitFor(() => {
    expect(document.body.textContent).not.toContain('自动消失')
  })
})
```

## L9 Hooks 测试（renderHook）

```tsx
import { renderHook, act } from '@testing-library/react'
import useThrottleFn from '..'

test('节流函数在 wait 期间只执行一次', () => {
  jest.useFakeTimers()
  const fn = jest.fn()
  const { result } = renderHook(() => useThrottleFn(fn, 200))

  act(() => {
    result.current()
    result.current()
    result.current()
  })
  expect(fn).toHaveBeenCalledTimes(1)

  jest.advanceTimersByTime(200)
  act(() => {
    result.current()
  })
  expect(fn).toHaveBeenCalledTimes(3)

  jest.useRealTimers()
})
```

## L10 工厂函数测试

```tsx
import createFC from '..'

test('createFC 返回可渲染的组件', () => {
  const Comp = createFC<{ label: string }>((props) => <span>{props.label}</span>)
  const { getByText } = render(<Comp label="hello" />)
  expect(getByText('hello')).toBeInTheDocument()
})

test('支持 ref 转发', () => {
  const Comp = createFC<{}, HTMLDivElement>((_, ref) => <div ref={ref}>test</div>)
  const ref = React.createRef<HTMLDivElement>()
  render(<Comp ref={ref} />)
  expect(ref.current).toBeInstanceOf(HTMLDivElement)
})
```

## L11 命令式 API 测试

### 导出结构验证

```tsx
test('loading 导出 show/hide/getCount 方法', () => {
  expect(typeof loading.show).toBe('function')
  expect(typeof loading.hide).toBe('function')
  expect(typeof loading.getCount).toBe('function')
})
```

### loading 引用计数（debounce 场景）

loading.close 内部使用 60ms debounce，需 fake timer：

```tsx
import { waitFakeTimers, cleanupModals } from '../../../tests/testing'

afterEach(() => {
  jest.useRealTimers()
  return cleanupModals()
})

test('多次 show 后单次 hide 不会立即关闭', async () => {
  jest.useFakeTimers()
  render(<ModalStation />)
  await act(async () => {
    loading.show()
    loading.show()
  })
  expect(loading.getCount()).toBe(2)

  await act(async () => {
    loading.hide()
  })
  await waitFakeTimers(3, 100)
  expect(loading.getCount()).toBe(1)
})
```

## L12 IO 分层变体测试

```tsx
import BlockInput from '..'

test('默认渲染不崩溃', () => {
  const { container } = render(<BlockInput />)
  expect(container.firstChild).toBeInTheDocument()
})

test('classNamePrefix 正确应用', () => {
  const { container } = render(<BlockInput />)
  expect(container.querySelector('[class*="exd-block-input"]')).toBeInTheDocument()
})

test('自定义 className 透传', () => {
  const { container } = render(<BlockInput className="my-custom" />)
  expect(container.querySelector('.my-custom')).toBeInTheDocument()
})
```

## 覆盖率驱动补充模板

运行覆盖率后根据未覆盖行补充测试：

```bash
npx jest --coverage --testPathPattern='exports/Slider/tests' --no-silent 2>&1 | grep -A 3 'Slider'
```

输出示例：

```
 Slider    | 85.71 | 60.00 | 90.00 | 87.50 | 45-52,78
```

含义：行 45-52 和 78 未被覆盖。回到源码查看这些行的逻辑，编写对应测试：

```tsx
// 源码行 45-52 是 vertical 模式的 touch 计算分支
test('竖向模式下 touch 滑动计算正确', () => {
  // mock getBoundingClientRect
  // render <Slider vertical ... />
  // fireEvent.mouseDown → mouseMove → mouseUp
  // 断言 onChange 参数
})
```
