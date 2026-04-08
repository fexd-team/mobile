import React from 'react'
import { render, screen, cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import createFC from '../../createFC'
import cloneFC from '../../cloneFC'
import useTextFieldProps, { identity } from '../../useTextFieldProps'
import Input from '..'

describe('Input', () => {
  afterEach(() => {
    cleanup()
  })

  describe('冒烟与 DOM 属性', () => {
    test('默认渲染不崩溃且存在 input', () => {
      const { container } = render(<Input defaultValue="" />)
      expect(container.querySelector('input')).toBeInTheDocument()
    })

    test('placeholder、className、type、maxLength、readOnly 透传至原生 input', () => {
      const { container } = render(
        <Input defaultValue="" placeholder="请输入" className="my-input" type="search" maxLength={8} readOnly />,
      )
      const input = container.querySelector('input')!
      expect(input).toHaveAttribute('placeholder', '请输入')
      expect(input).toHaveClass('my-input')
      expect(input).toHaveAttribute('type', 'search')
      expect(input).toHaveAttribute('maxLength', '8')
      expect(input).toHaveAttribute('readOnly')
    })

    test('disabled 时 input 禁用', () => {
      render(<Input defaultValue="" disabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })

    test('password 类型仍可通过 input 选择器访问', () => {
      const { container } = render(<Input defaultValue="secret" type="password" />)
      const input = container.querySelector('input[type="password"]') as HTMLInputElement
      expect(input).toBeInTheDocument()
      expect(input.value).toBe('secret')
    })
  })

  describe('交互与回调', () => {
    test('用户输入后 onChange 收到字符串', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<Input defaultValue="" onChange={onChange} />)
      const input = screen.getByRole('textbox')
      await user.type(input, 'hi')
      expect(onChange.mock.calls.every((c) => typeof c[0] === 'string')).toBe(true)
      expect(onChange).toHaveBeenCalled()
      expect(input).toHaveValue('hi')
    })

    test('聚焦触发 onFocus，失焦触发 onBlur', async () => {
      const user = userEvent.setup()
      const onFocus = jest.fn()
      const onBlur = jest.fn()
      render(<Input defaultValue="" onFocus={onFocus} onBlur={onBlur} />)
      const input = screen.getByRole('textbox')
      await user.click(input)
      expect(onFocus).toHaveBeenCalledTimes(1)
      await user.tab()
      expect(onBlur).toHaveBeenCalledTimes(1)
    })
  })

  describe('受控与非受控（useIOControl）', () => {
    test('受控：value 与 onChange 联动', async () => {
      const user = userEvent.setup()
      function Wrapper() {
        const [v, setV] = React.useState('a')
        return <Input value={v} onChange={setV} />
      }
      render(<Wrapper />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('a')
      await user.clear(input)
      await user.type(input, 'b')
      expect(input).toHaveValue('b')
    })

    test('非受控：defaultValue 初始化并可继续输入', async () => {
      const user = userEvent.setup()
      render(<Input defaultValue="init" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('init')
      await user.type(input, '2')
      expect(input).toHaveValue('init2')
    })

    test('filterIOValue 返回 false 时拒绝写入', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<Input defaultValue="" onChange={onChange} filterIOValue={(v) => !v.includes('!')} />)
      const input = screen.getByRole('textbox')
      await user.type(input, 'ok')
      expect(input).toHaveValue('ok')
      await user.type(input, '!')
      expect(input).toHaveValue('ok')
    })
  })

  describe('normalize / format', () => {
    test('默认 normalizeTrigger=onChange 时输入过程即归一化', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<Input defaultValue="" onChange={onChange} normalize={(v) => v.replace(/\D/g, '')} />)
      const input = screen.getByRole('textbox')
      await user.type(input, 'a1b2c')
      expect(input).toHaveValue('12')
    })

    test('normalizeTrigger=onBlur 时在失焦时归一化', async () => {
      const user = userEvent.setup()
      render(<Input defaultValue="  spaced  " normalize={(v) => v.trim()} normalizeTrigger="onBlur" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('  spaced  ')
      await user.click(input)
      await user.tab()
      await waitFor(() => {
        expect(input).toHaveValue('spaced')
      })
    })

    test('format 仅影响展示字符串', () => {
      render(<Input value="ab" onChange={() => {}} format={(v) => v.toUpperCase()} />)
      expect(screen.getByRole('textbox')).toHaveValue('AB')
    })
  })

  describe('边界值', () => {
    test('value 为 null 时展示为空字符串', () => {
      render(<Input value={null as any} onChange={() => {}} />)
      expect(screen.getByRole('textbox')).toHaveValue('')
    })

    test('value 为 undefined 且无 defaultValue 时展示为空', () => {
      render(<Input />)
      expect(screen.getByRole('textbox')).toHaveValue('')
    })

    test('defaultValue 为 null 时不崩溃', () => {
      render(<Input defaultValue={null as any} />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })
  })

  describe('ref 与工具函数', () => {
    test('ref 转发到 input 元素', () => {
      const ref = React.createRef<HTMLInputElement>()
      render(<Input ref={ref} defaultValue="" />)
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })

    test('identity 保持值不变（覆盖 useTextFieldProps 默认归一化路径）', () => {
      expect(identity('x')).toBe('x')
      expect(identity('')).toBe('')
    })
  })

  describe('扩展说明：clearable / prefix / suffix', () => {
    test('Input 为 BasicInput 克隆体，类型上无 clearable/prefix/suffix；可安全透传 data-*', () => {
      render(<Input defaultValue="" data-icon-prefix="p" data-icon-suffix="s" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('data-icon-prefix', 'p')
      expect(input).toHaveAttribute('data-icon-suffix', 's')
    })
  })
})

describe('Input 依赖链：createFC / cloneFC 分支补充', () => {
  afterEach(() => {
    cleanup()
  })

  test('createFC 对 length<2 的 render 进行修补且可渲染', () => {
    const Short = ((props: React.InputHTMLAttributes<HTMLInputElement>) => (
      <input data-testid="short-input" {...props} readOnly />
    )) as React.ForwardRefRenderFunction<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>
    const Comp = createFC(Short)
    render(<Comp defaultValue="ok" />)
    expect(screen.getByTestId('short-input')).toHaveValue('ok')
  })

  test('cloneFC 在源组件无 defaultProps 时使用克隆体 defaultProps', () => {
    const Source = createFC<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>(function Source(props, ref) {
      return <input ref={ref} data-testid="clone-inp" {...props} readOnly />
    })
    delete (Source as any).defaultProps
    const Cloned = cloneFC(Source)
    render(<Cloned defaultValue="from-clone" />)
    expect(screen.getByTestId('clone-inp')).toHaveValue('from-clone')
  })

  test('cloneFC 在源 defaultProps 为 null 时回退到克隆体 defaultProps', () => {
    const Source = createFC<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>(function Source(props, ref) {
      return <input ref={ref} data-testid="clone-null" {...props} readOnly />
    })
    ;(Source as any).defaultProps = null
    const Cloned = cloneFC(Source)
    render(<Cloned defaultValue="fallback" />)
    expect(screen.getByTestId('clone-null')).toHaveValue('fallback')
  })
})

describe('useTextFieldProps 分支（与 Input / BasicInput 同源）', () => {
  afterEach(() => {
    cleanup()
  })

  test('noFormat 为 true 时启用专用合并与返回分支', async () => {
    const user = userEvent.setup()
    function NoFormatInput(props: React.ComponentProps<typeof Input>) {
      const p = useTextFieldProps(props as Parameters<typeof useTextFieldProps>[0], { noFormat: true })
      return <input {...p} onChange={(e) => p.onChange(e.target.value)} />
    }
    render(<NoFormatInput defaultValue="" format={(v) => v.toUpperCase()} normalize={(v) => v.replace(/-/g, '')} />)
    const input = screen.getByRole('textbox')
    await user.type(input, 'a')
    expect(input).toHaveValue('a')
  })

  test('onChange 入参非字符串时从 nativeEvent.text 取值', async () => {
    const user = userEvent.setup()
    function NativeTextBridge() {
      const p = useTextFieldProps({ defaultValue: '' } as Parameters<typeof useTextFieldProps>[0])
      return (
        <>
          <input data-testid="real" {...p} onChange={(e) => p.onChange(e.target.value)} />
          <button
            type="button"
            data-testid="sim-native"
            onClick={() => p.onChange({ nativeEvent: { text: 'native' } } as any)}
          >
            sim
          </button>
        </>
      )
    }
    render(<NativeTextBridge />)
    await user.click(screen.getByTestId('sim-native'))
    expect(screen.getByTestId('real')).toHaveValue('native')
  })
})
