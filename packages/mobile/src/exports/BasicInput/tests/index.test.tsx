import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import BasicInput from '..'

describe('BasicInput', () => {
  afterEach(() => {
    cleanup()
  })

  // L1 冒烟
  test('默认渲染不崩溃且存在 input', () => {
    const { container } = render(<BasicInput defaultValue="" />)
    expect(container.querySelector('input')).toBeInTheDocument()
  })

  // L2 关键 props
  test('placeholder 正确反映到 DOM', () => {
    const { container } = render(<BasicInput defaultValue="" placeholder="请输入" />)
    expect(container.querySelector('input')).toHaveAttribute('placeholder', '请输入')
  })

  test('disabled 时 input 禁用', () => {
    const { container } = render(<BasicInput defaultValue="" disabled />)
    expect(container.querySelector('input')).toBeDisabled()
  })

  test('className 透传到 input', () => {
    const { container } = render(<BasicInput defaultValue="" className="my-inp" />)
    expect(container.querySelector('input')).toHaveClass('my-inp')
  })

  // L3 事件
  test('输入时触发 onChange 且参数为字符串', () => {
    const onChange = jest.fn()
    const { container } = render(<BasicInput defaultValue="" onChange={onChange} />)
    const input = container.querySelector('input')!
    fireEvent.change(input, { target: { value: 'hello' } })
    expect(onChange).toHaveBeenCalledWith('hello')
  })

  test('聚焦与失焦触发 onFocus / onBlur', () => {
    const onFocus = jest.fn()
    const onBlur = jest.fn()
    const { container } = render(<BasicInput defaultValue="" onFocus={onFocus} onBlur={onBlur} />)
    const input = container.querySelector('input')!
    fireEvent.focus(input)
    fireEvent.blur(input)
    expect(onFocus).toHaveBeenCalledTimes(1)
    expect(onBlur).toHaveBeenCalledTimes(1)
  })

  // L6 边界
  test('value 为 null 时展示为空字符串', () => {
    const { container } = render(<BasicInput value={null as any} onChange={() => {}} />)
    expect((container.querySelector('input') as HTMLInputElement).value).toBe('')
  })

  test('无 value 与 defaultValue 时 input 值为空', () => {
    const { container } = render(<BasicInput />)
    expect((container.querySelector('input') as HTMLInputElement).value).toBe('')
  })

  test('ref 转发到 input 元素', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<BasicInput ref={ref} defaultValue="" />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})
