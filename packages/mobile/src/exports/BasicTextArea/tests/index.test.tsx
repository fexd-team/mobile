import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import BasicTextArea from '..'

describe('BasicTextArea', () => {
  afterEach(() => {
    cleanup()
  })

  // L1 冒烟
  test('默认渲染不崩溃且存在 textarea 与包装结构', () => {
    const { container } = render(<BasicTextArea defaultValue="" />)
    expect(container.querySelector('.exd-textarea-wrapper')).toBeInTheDocument()
    expect(container.querySelector('textarea.exd-textarea')).toBeInTheDocument()
  })

  // L2 关键 props
  test('placeholder 反映到 textarea', () => {
    const { container } = render(<BasicTextArea defaultValue="" placeholder="多行" />)
    expect(container.querySelector('textarea')).toHaveAttribute('placeholder', '多行')
  })

  test('height 为固定数值时 jack 容器使用该高度', () => {
    const { container } = render(<BasicTextArea defaultValue="" height={80} />)
    const jack = container.querySelector('.exd-textarea-jack') as HTMLElement
    expect(jack.style.height).toBe('80px')
  })

  test('height 为 auto 时不强制 jack 高度', () => {
    const { container } = render(<BasicTextArea defaultValue="" height="auto" />)
    const jack = container.querySelector('.exd-textarea-jack') as HTMLElement
    expect(jack.style.height).toBe('')
  })

  // L3 事件
  test('输入时 onChange 收到字符串', () => {
    const onChange = jest.fn()
    const { container } = render(<BasicTextArea defaultValue="" onChange={onChange} />)
    const ta = container.querySelector('textarea')!
    fireEvent.change(ta, { target: { value: '第一行\n第二行' } })
    expect(onChange).toHaveBeenCalledWith('第一行\n第二行')
  })

  // L6 边界
  test('无 value 与 defaultValue 时不崩溃且 textarea 为空', () => {
    const { container } = render(<BasicTextArea />)
    expect(container.querySelector('textarea')).toBeInTheDocument()
    expect((container.querySelector('textarea') as HTMLTextAreaElement).value).toBe('')
  })

  test('value 为 null 时按空字符串展示', () => {
    const { container } = render(<BasicTextArea value={null as any} onChange={() => {}} />)
    expect((container.querySelector('textarea') as HTMLTextAreaElement).value).toBe('')
  })

  test('ref 转发到 textarea', () => {
    const ref = React.createRef<HTMLTextAreaElement>()
    render(<BasicTextArea ref={ref} defaultValue="" />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })
})
