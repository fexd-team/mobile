import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Stepper, { prefix } from '..'
import type { StepperRef } from '../type'

describe('Stepper', () => {
  const getMinus = (container: HTMLElement) => container.querySelectorAll('.exd-stepper-btn')[0] as HTMLElement
  const getPlus = (container: HTMLElement) => container.querySelectorAll('.exd-stepper-btn')[1] as HTMLElement
  const getInput = (container: HTMLElement) => container.querySelector('.exd-stepper-input') as HTMLInputElement

  /** BasicButton 禁用时使用样式类，不设置原生 disabled 属性 */
  const expectStepperBtnDisabled = (el: HTMLElement) => {
    expect(el).toHaveClass('exd-btn-disabled')
  }
  const expectStepperBtnEnabled = (el: HTMLElement) => {
    expect(el).not.toHaveClass('exd-btn-disabled')
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  // —— L1 冒烟 ——
  test('冒烟：默认渲染不崩溃且结构完整', () => {
    const { container } = render(<Stepper defaultValue={0} />)
    expect(container.querySelector('.exd-stepper')).toBeInTheDocument()
    expect(container.querySelector('.exd-stepper-wrapper')).toBeInTheDocument()
    expect(getInput(container)).toBeInTheDocument()
    expect(prefix).toBe('exd-stepper')
  })

  // —— L2 Props ——
  test('min/max：减号在最小值时禁用，加号可用', () => {
    const { container } = render(<Stepper defaultValue={2} min={2} max={10} />)
    expectStepperBtnDisabled(getMinus(container))
    expectStepperBtnEnabled(getPlus(container))
  })

  test('min/max：加号在最大值时禁用，减号可用', () => {
    const { container } = render(<Stepper defaultValue={10} min={0} max={10} />)
    expectStepperBtnDisabled(getPlus(container))
    expectStepperBtnEnabled(getMinus(container))
  })

  test('step 为数字时加减按步长变化', async () => {
    const user = userEvent.setup()
    const { container } = render(<Stepper defaultValue={5} min={0} max={100} step={3} />)
    await user.click(getPlus(container))
    expect(getInput(container).value).toBe('8')
    await user.click(getMinus(container))
    expect(getInput(container).value).toBe('5')
  })

  test('step 为数组时加减使用不同步长', async () => {
    const user = userEvent.setup()
    const { container } = render(<Stepper defaultValue={10} min={0} max={20} step={[2, 3]} />)
    await user.click(getMinus(container))
    expect(getInput(container).value).toBe('8')
    await user.click(getPlus(container))
    expect(getInput(container).value).toBe('11')
  })

  test('自定义 onPlus / onMinus 覆盖默认步进逻辑', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Stepper defaultValue={5} min={0} max={100} onPlus={(v) => v + 10} onMinus={(v) => v - 10} />,
    )
    await user.click(getPlus(container))
    expect(getInput(container).value).toBe('15')
    await user.click(getMinus(container))
    expect(getInput(container).value).toBe('5')
  })

  test('className 合并到根节点', () => {
    const { container } = render(<Stepper defaultValue={0} className="my-stepper" />)
    expect(container.querySelector('.exd-stepper')).toHaveClass('my-stepper')
  })

  test('size 对应尺寸类名', () => {
    const { container } = render(<Stepper defaultValue={0} size="small" />)
    expect(container.querySelector('.exd-stepper')).toHaveClass('exd-stepper-small')
  })

  test('block 为 true 时根节点带块级类名', () => {
    const { container } = render(<Stepper defaultValue={0} block />)
    expect(container.querySelector('.exd-stepper')).toHaveClass('exd-stepper-block')
  })

  test('style 透传到根节点', () => {
    const { container } = render(<Stepper defaultValue={0} style={{ marginTop: 12 }} />)
    const root = container.querySelector('.exd-stepper') as HTMLElement
    expect(root.style.marginTop).toBe('12px')
  })

  // —— L3 点击与 onChange ——
  test('点击加号数值增加且 onChange 传入新值', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    const { container } = render(<Stepper defaultValue={1} min={0} max={10} onChange={handleChange} />)
    await user.click(getPlus(container))
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(2)
  })

  test('点击减号数值减少且 onChange 传入新值', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    const { container } = render(<Stepper defaultValue={3} min={0} max={10} onChange={handleChange} />)
    await user.click(getMinus(container))
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(2)
  })

  // —— L4 边界 ——
  test('已在最小时继续点减号不触发 onChange 且值不变', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    const { container } = render(<Stepper defaultValue={0} min={0} max={10} onChange={handleChange} />)
    await user.click(getMinus(container))
    expect(getInput(container).value).toBe('0')
    expect(handleChange).not.toHaveBeenCalled()
  })

  test('已在最大时继续点加号不触发 onChange 且值不变', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    const { container } = render(<Stepper defaultValue={10} min={0} max={10} onChange={handleChange} />)
    await user.click(getPlus(container))
    expect(getInput(container).value).toBe('10')
    expect(handleChange).not.toHaveBeenCalled()
  })

  test('非整数步长：加号在边界处 clamp 到 max', async () => {
    const user = userEvent.setup()
    const { container } = render(<Stepper defaultValue={9} min={0} max={10} step={5} />)
    await user.click(getPlus(container))
    expect(getInput(container).value).toBe('10')
  })

  test('非整数步长：减号在边界处 clamp 到 min', async () => {
    const user = userEvent.setup()
    const { container } = render(<Stepper defaultValue={3} min={0} max={20} step={5} />)
    await user.click(getMinus(container))
    expect(getInput(container).value).toBe('0')
  })

  // —— L5 受控 / 非受控 ——
  test('非受控：defaultValue 初始化，点击加减更新', async () => {
    const user = userEvent.setup()
    const { container } = render(<Stepper defaultValue={4} min={0} max={10} />)
    expect(getInput(container).value).toBe('4')
    await user.click(getPlus(container))
    expect(getInput(container).value).toBe('5')
  })

  test('受控：value 与 onChange 联动', async () => {
    const user = userEvent.setup()
    function Wrapper() {
      const [v, setV] = React.useState(2)
      return <Stepper value={v} onChange={setV} min={0} max={10} />
    }
    const { container } = render(<Wrapper />)
    expect(getInput(container).value).toBe('2')
    await user.click(getPlus(container))
    expect(getInput(container).value).toBe('3')
  })

  test('受控：仅传 value 不传 onChange 时点加号不更新显示', async () => {
    const user = userEvent.setup()
    const { container } = render(<Stepper value={1} min={0} max={10} />)
    await user.click(getPlus(container))
    expect(getInput(container).value).toBe('1')
  })

  // —— disabled ——
  test('disabled 时加减与输入均不可用且点击不改动', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    const { container } = render(<Stepper defaultValue={5} min={0} max={10} disabled onChange={handleChange} />)
    expectStepperBtnDisabled(getMinus(container))
    expectStepperBtnDisabled(getPlus(container))
    expect(getInput(container)).toBeDisabled()
    await user.click(getPlus(container))
    expect(handleChange).not.toHaveBeenCalled()
  })

  // —— 手动输入 ——
  test('手动输入合法数字并失焦后 onChange 为 clamp 后的数值', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    const { container } = render(<Stepper defaultValue={1} min={0} max={10} onChange={handleChange} />)
    const input = getInput(container)
    await user.clear(input)
    await user.type(input, '7')
    fireEvent.blur(input)
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled()
    })
    expect(getInput(container).value).toBe('7')
  })

  test('手动输入超出 max 时 clamp 到 max', async () => {
    const user = userEvent.setup()
    const { container } = render(<Stepper defaultValue={1} min={0} max={10} />)
    const input = getInput(container)
    await user.clear(input)
    await user.type(input, '99')
    fireEvent.blur(input)
    await waitFor(() => {
      expect(getInput(container).value).toBe('10')
    })
  })

  test('默认 normalize：非法字符保留上一有效值', async () => {
    const user = userEvent.setup()
    const { container } = render(<Stepper defaultValue={5} min={0} max={100} />)
    const input = getInput(container)
    await user.type(input, 'x')
    expect(input.value).toBe('5')
  })

  test('默认 normalize：仅允许中间态 "-" 显示为空串', async () => {
    const user = userEvent.setup()
    const { container } = render(<Stepper defaultValue={5} min={-10} max={10} />)
    const input = getInput(container)
    await user.clear(input)
    await user.type(input, '-')
    expect(input.value).toBe('')
  })

  test('allowEmpty：清空输入时值为空且 onChange 收到空串', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    const { container } = render(<Stepper defaultValue={3} allowEmpty onChange={handleChange} />)
    const input = getInput(container)
    await user.clear(input)
    fireEvent.blur(input)
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith('')
    })
    expect(getInput(container).value).toBe('')
  })

  test('非 allowEmpty：清空输入后内部回到 0', async () => {
    const user = userEvent.setup()
    const { container } = render(<Stepper defaultValue={3} min={0} max={10} />)
    const input = getInput(container)
    await user.clear(input)
    fireEvent.blur(input)
    await waitFor(() => {
      expect(getInput(container).value).toBe('0')
    })
  })

  test('allowEmpty 且无有效 defaultValue 时初始为空', () => {
    const { container } = render(<Stepper allowEmpty defaultValue={undefined as unknown as number} />)
    expect(getInput(container).value).toBe('')
  })

  test('allowEmpty 且值为空时点加号跳到 max 默认路径', async () => {
    const user = userEvent.setup()
    const { container } = render(<Stepper allowEmpty min={0} max={7} defaultValue={undefined as unknown as number} />)
    expect(getInput(container).value).toBe('')
    await user.click(getPlus(container))
    expect(getInput(container).value).toBe('7')
  })

  test('allowEmpty 且值为空时点减号落到 min 默认路径', async () => {
    const user = userEvent.setup()
    const { container } = render(<Stepper allowEmpty min={2} max={10} defaultValue={undefined as unknown as number} />)
    await user.click(getMinus(container))
    expect(getInput(container).value).toBe('2')
  })

  test('allowEmpty 且无 max 时空值点加号落到 max ?? 0', async () => {
    const user = userEvent.setup()
    const { container } = render(<Stepper allowEmpty defaultValue={undefined as unknown as number} />)
    await user.click(getPlus(container))
    expect(getInput(container).value).toBe('0')
  })

  test('allowEmpty 且无 min 时空值点减号落到 min ?? 0', async () => {
    const user = userEvent.setup()
    const { container } = render(<Stepper allowEmpty defaultValue={undefined as unknown as number} />)
    await user.click(getMinus(container))
    expect(getInput(container).value).toBe('0')
  })

  test('无 defaultValue 且非 allowEmpty 时初始值为 min', () => {
    const { container } = render(<Stepper min={4} max={10} />)
    expect(getInput(container).value).toBe('4')
  })

  test('无 defaultValue、无 min 时初始值为 0（min ?? 0）', () => {
    const { container } = render(<Stepper max={10} />)
    expect(getInput(container).value).toBe('0')
  })

  test('step 为 null 时加减回退到步长 1（step?.[n] ?? step ?? 1）', async () => {
    const user = userEvent.setup()
    const { container } = render(<Stepper defaultValue={5} min={0} max={10} step={null as unknown as number} />)
    await user.click(getMinus(container))
    expect(getInput(container).value).toBe('4')
    await user.click(getPlus(container))
    expect(getInput(container).value).toBe('5')
  })

  test('defaultValue 为数字时先经 min/max clamp', () => {
    const { container } = render(<Stepper defaultValue={99} min={0} max={10} />)
    expect(getInput(container).value).toBe('10')
  })

  // —— onFocus / onBlur / 聚焦选中 ——
  test('聚焦且非 readOnly 时调用 input.select', async () => {
    const user = userEvent.setup()
    const selectSpy = jest.spyOn(HTMLInputElement.prototype, 'select').mockImplementation(() => {})
    const { container } = render(<Stepper defaultValue={1} min={0} max={10} />)
    await user.click(getInput(container))
    expect(selectSpy).toHaveBeenCalled()
  })

  test('readOnly 时聚焦不调用 select', async () => {
    const user = userEvent.setup()
    const selectSpy = jest.spyOn(HTMLInputElement.prototype, 'select').mockImplementation(() => {})
    const { container } = render(<Stepper defaultValue={1} min={0} max={10} readOnly />)
    await user.click(getInput(container))
    expect(selectSpy).not.toHaveBeenCalled()
  })

  test('onFocus / onBlur 透传触发', async () => {
    const user = userEvent.setup()
    const onFocus = jest.fn()
    const onBlur = jest.fn()
    const { container } = render(<Stepper defaultValue={0} min={0} max={10} onFocus={onFocus} onBlur={onBlur} />)
    const input = getInput(container)
    await user.click(input)
    expect(onFocus).toHaveBeenCalled()
    fireEvent.blur(input)
    expect(onBlur).toHaveBeenCalled()
  })

  // —— ref ——
  test('ref 暴露 inputRef、wrapperRef、minus、plus', () => {
    const ref = React.createRef<StepperRef>()
    const { container } = render(<Stepper ref={ref} defaultValue={5} min={0} max={10} />)
    expect(ref.current?.inputRef?.current).toBe(getInput(container))
    expect(ref.current?.wrapperRef?.current).toBe(container.querySelector('.exd-stepper'))
    expect(typeof ref.current?.minus).toBe('function')
    expect(typeof ref.current?.plus).toBe('function')
    expect(ref.current?.minus?.(8)).toBe(7)
    expect(ref.current?.plus?.(2)).toBe(3)
  })

  test('ref.minus / ref.plus 在值为空时走 min ?? 0 与 max ?? 0 默认分支', () => {
    const ref = React.createRef<StepperRef>()
    render(<Stepper ref={ref} allowEmpty defaultValue={undefined as unknown as number} />)
    expect(ref.current!.minus(undefined as unknown as number)).toBe(0)
    expect(ref.current!.plus(undefined as unknown as number)).toBe(0)
  })

  test('自定义 normalize 覆盖默认数字过滤', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Stepper defaultValue={1} min={0} max={10} normalize={(v) => (v === 'custom' ? '5' : v)} />,
    )
    const input = getInput(container)
    await user.clear(input)
    await user.type(input, 'custom')
    expect(input.value).toBe('5')
  })
})
