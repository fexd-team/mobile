import React from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import TextArea from '..'

describe('TextArea', () => {
  afterEach(() => {
    cleanup()
  })

  test('冒烟：默认渲染不崩溃且存在 textarea 与包装结构', () => {
    const { container } = render(<TextArea defaultValue="" />)
    expect(container.querySelector('.exd-textarea-wrapper')).toBeInTheDocument()
    expect(container.querySelector('.exd-textarea-jack')).toBeInTheDocument()
    expect(container.querySelector('textarea.exd-textarea')).toBeInTheDocument()
  })

  test('placeholder 反映到 textarea', () => {
    const { container } = render(<TextArea defaultValue="" placeholder="请输入多行内容" />)
    expect(container.querySelector('textarea')).toHaveAttribute('placeholder', '请输入多行内容')
  })

  test('disabled 时 textarea 禁用', () => {
    const { container } = render(<TextArea defaultValue="" disabled />)
    expect(container.querySelector('textarea')).toBeDisabled()
  })

  test('readOnly 时 textarea 只读', () => {
    const { container } = render(<TextArea defaultValue="只读" readOnly />)
    expect(container.querySelector('textarea')).toHaveAttribute('readOnly')
  })

  test('maxLength 透传到 textarea', () => {
    const { container } = render(<TextArea defaultValue="" maxLength={100} />)
    expect(container.querySelector('textarea')).toHaveAttribute('maxLength', '100')
  })

  test('rows 透传到 textarea', () => {
    const { container } = render(<TextArea defaultValue="" rows={6} />)
    expect(container.querySelector('textarea')).toHaveAttribute('rows', '6')
  })

  test('height 为固定数值时 jack 容器使用该高度', () => {
    const { container } = render(<TextArea defaultValue="" height={88} />)
    const jack = container.querySelector('.exd-textarea-jack') as HTMLElement
    expect(jack.style.height).toBe('88px')
  })

  test('height 为 auto 时 textarea overflow 为 hidden 且 jack 不强制高度', () => {
    const { container } = render(<TextArea defaultValue="a\nb" height="auto" />)
    const ta = container.querySelector('textarea') as HTMLTextAreaElement
    const jack = container.querySelector('.exd-textarea-jack') as HTMLElement
    expect(ta.style.overflow).toBe('hidden')
    expect(jack.style.height).toBe('')
  })

  test('className 合并到 textarea', () => {
    const { container } = render(<TextArea defaultValue="" className="custom-ta" />)
    expect(container.querySelector('textarea')).toHaveClass('exd-textarea', 'custom-ta')
  })

  test('style 与 auto 高度样式合并到 textarea', () => {
    const { container } = render(<TextArea defaultValue="" height="auto" style={{ color: 'rgb(255, 0, 0)' }} />)
    const ta = container.querySelector('textarea') as HTMLTextAreaElement
    expect(ta.style.overflow).toBe('hidden')
    expect(ta.style.color).toBe('rgb(255, 0, 0)')
  })

  test('用户通过 userEvent 输入文本并触发 onChange（字符串参数）', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { container } = render(<TextArea defaultValue="" onChange={onChange} />)
    const ta = container.querySelector('textarea') as HTMLTextAreaElement
    await user.click(ta)
    await user.type(ta, 'hi')
    expect(onChange).toHaveBeenCalled()
    const last = onChange.mock.calls[onChange.mock.calls.length - 1][0]
    expect(last).toBe('hi')
    expect(ta.value).toBe('hi')
  })

  test('聚焦与失焦触发 onFocus / onBlur', async () => {
    const user = userEvent.setup()
    const onFocus = jest.fn()
    const onBlur = jest.fn()
    const { container } = render(<TextArea defaultValue="" onFocus={onFocus} onBlur={onBlur} />)
    const ta = container.querySelector('textarea') as HTMLTextAreaElement
    await user.click(ta)
    expect(onFocus).toHaveBeenCalledTimes(1)
    await user.tab()
    expect(onBlur).toHaveBeenCalledTimes(1)
  })

  test('受控模式：value 由外部 state 驱动', async () => {
    const user = userEvent.setup()
    function Controlled() {
      const [v, setV] = React.useState('x')
      return <TextArea value={v} onChange={setV} />
    }
    const { container } = render(<Controlled />)
    const ta = container.querySelector('textarea') as HTMLTextAreaElement
    expect(ta.value).toBe('x')
    await user.clear(ta)
    await user.type(ta, 'y')
    await waitFor(() => expect(ta.value).toBe('y'))
  })

  test('非受控模式：defaultValue 可编辑', async () => {
    const user = userEvent.setup()
    const { container } = render(<TextArea defaultValue="初始" />)
    const ta = container.querySelector('textarea') as HTMLTextAreaElement
    expect(ta.value).toBe('初始')
    await user.clear(ta)
    await user.type(ta, '新内容')
    expect(ta.value).toBe('新内容')
  })

  test('受控空字符串时展示为空', () => {
    const { container } = render(<TextArea value="" onChange={() => {}} />)
    expect((container.querySelector('textarea') as HTMLTextAreaElement).value).toBe('')
  })

  test('value 为 null 时按空字符串展示', () => {
    const { container } = render(<TextArea value={null as any} onChange={() => {}} />)
    expect((container.querySelector('textarea') as HTMLTextAreaElement).value).toBe('')
  })

  test('无 value 与 defaultValue 时初始为空', () => {
    const { container } = render(<TextArea />)
    expect((container.querySelector('textarea') as HTMLTextAreaElement).value).toBe('')
  })

  test('format 影响展示值', () => {
    const { container } = render(<TextArea value="12" onChange={() => {}} format={(v) => `￥${v}`} />)
    expect((container.querySelector('textarea') as HTMLTextAreaElement).value).toBe('￥12')
  })

  test('normalize 在 onChange 时改写写入值（默认 normalizeTrigger）', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { container } = render(
      <TextArea defaultValue="" onChange={onChange} normalize={(v) => v.replace(/\D/g, '')} />,
    )
    const ta = container.querySelector('textarea') as HTMLTextAreaElement
    await user.type(ta, 'a1b2c3')
    expect(onChange).toHaveBeenCalled()
    expect(ta.value).toBe('123')
  })

  test('normalizeTrigger 为 onBlur 时在失焦时规范化', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const { container } = render(
      <TextArea
        defaultValue=""
        onChange={onChange}
        normalize={(v) => v.replace(/\D/g, '')}
        normalizeTrigger="onBlur"
      />,
    )
    const ta = container.querySelector('textarea') as HTMLTextAreaElement
    await user.type(ta, '99xx')
    expect(ta.value).toBe('99xx')
    await user.tab()
    await waitFor(() => expect(ta.value).toBe('99'))
  })

  test('多行文本时 jack 内占位行数与换行一致', () => {
    const { container } = render(<TextArea defaultValue={'第一行\n第二行\n第三行'} />)
    const dots = container.querySelectorAll('.exd-textarea-jack > div')
    expect(dots.length).toBe(3)
  })

  test('ref 转发到 textarea 元素', () => {
    const ref = React.createRef<HTMLTextAreaElement>()
    render(<TextArea ref={ref} defaultValue="" />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  test('showCount、autoSize 传入时可渲染（会透传到 textarea，开发环境 React 对未知 DOM 属性告警）', () => {
    const origErr = console.error
    const spy = jest.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
      const text = args.map(String).join(' ')
      if (text.includes('showCount') || text.includes('autoSize')) return
      origErr.apply(console, args as Parameters<typeof console.error>)
    })
    try {
      const { container } = render(
        <TextArea
          defaultValue=""
          {...({ showCount: true, autoSize: { minRows: 2, maxRows: 4 } } as Record<string, unknown>)}
        />,
      )
      expect(container.querySelector('textarea')).toBeInTheDocument()
    } finally {
      spy.mockRestore()
    }
  })
})
