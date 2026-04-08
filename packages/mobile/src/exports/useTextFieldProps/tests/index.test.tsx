import React from 'react'
import { render, renderHook, act, screen } from '@testing-library/react'
import useTextFieldProps, { identity, defaultProps } from '..'

describe('useTextFieldProps', () => {
  describe('工具导出', () => {
    test('identity 原样返回', () => {
      expect(identity('x')).toBe('x')
      expect(identity(null)).toBe(null)
    })

    test('defaultProps 含 normalizeTrigger', () => {
      expect(defaultProps.normalizeTrigger).toBe('onChange')
    })
  })

  describe('返回值结构', () => {
    test('包含 ref、value、focused、onChange、onFocus、onBlur', () => {
      const { result } = renderHook(() =>
        useTextFieldProps({
          defaultValue: 'hello',
        }),
      )
      const r = result.current
      expect(r.value).toBe('hello')
      expect(r.focused).toBe(false)
      expect(r.ref).toBeDefined()
      expect(typeof r.onChange).toBe('function')
      expect(typeof r.onFocus).toBe('function')
      expect(typeof r.onBlur).toBe('function')
    })

    test('空值展示为空字符串', () => {
      const { result } = renderHook(() =>
        useTextFieldProps({
          defaultValue: '',
        }),
      )
      expect(result.current.value).toBe('')
    })
  })

  describe('onChange', () => {
    test('字符串入参直接写入', () => {
      const { result } = renderHook(() =>
        useTextFieldProps({
          defaultValue: '',
        }),
      )
      act(() => {
        result.current.onChange('next')
      })
      expect(result.current.value).toBe('next')
    })

    test('normalizeTrigger 为 onChange 时先 normalize 再 setValue', () => {
      const normalize = jest.fn((v: string) => v.toUpperCase())
      const { result } = renderHook(() =>
        useTextFieldProps({
          defaultValue: 'a',
          normalize,
          normalizeTrigger: 'onChange',
        }),
      )
      act(() => {
        result.current.onChange('bc')
      })
      expect(normalize).toHaveBeenCalledWith('bc', 'a')
      expect(result.current.value).toBe('BC')
    })

    test('事件对象含 nativeEvent.text 时取文本（RN 风格）', () => {
      const { result } = renderHook(() =>
        useTextFieldProps({
          defaultValue: '',
        }),
      )
      const ev = {
        nativeEvent: { text: 'from-native' },
      } as any
      act(() => {
        result.current.onChange(ev)
      })
      expect(result.current.value).toBe('from-native')
    })
  })

  describe('format 展示', () => {
    test('非空 value 经 format 展示', () => {
      const format = jest.fn((s: string) => `|${s}|`)
      const { result } = renderHook(() =>
        useTextFieldProps({
          defaultValue: 'x',
          format,
        }),
      )
      expect(format).toHaveBeenCalled()
      expect(result.current.value).toBe('|x|')
    })
  })

  describe('onFocus / onBlur', () => {
    test('onFocus 置 focused 并透传外部 onFocus', () => {
      const onFocus = jest.fn()
      const { result } = renderHook(() =>
        useTextFieldProps({
          defaultValue: '',
          onFocus,
        }),
      )
      const e = {} as any
      act(() => {
        result.current.onFocus(e)
      })
      expect(result.current.focused).toBe(true)
      expect(onFocus).toHaveBeenCalledWith(e)
    })

    test('onBlur 置 focused 为 false 并透传 onBlur', () => {
      const onBlur = jest.fn()
      const { result } = renderHook(() =>
        useTextFieldProps({
          defaultValue: '',
          onBlur,
        }),
      )
      act(() => {
        result.current.onFocus({} as any)
      })
      const e = {} as any
      act(() => {
        result.current.onBlur(e)
      })
      expect(result.current.focused).toBe(false)
      expect(onBlur).toHaveBeenCalledWith(e)
    })

    test('normalizeTrigger 为 onBlur 时在 blur 时 normalize', () => {
      const normalize = jest.fn((v: string) => v.trim())
      const { result } = renderHook(() =>
        useTextFieldProps({
          defaultValue: '  hi  ',
          normalize,
          normalizeTrigger: 'onBlur',
        }),
      )
      act(() => {
        result.current.onBlur({} as any)
      })
      expect(normalize).toHaveBeenCalled()
      expect(result.current.value).toBe('hi')
    })
  })

  describe('noFormat 选项', () => {
    test('noFormat 时仍用 identity 逻辑，但返回体附带原始 format/normalize 引用', () => {
      const format = jest.fn((s: string) => s)
      const normalize = jest.fn((s: string) => s)
      const { result } = renderHook(() =>
        useTextFieldProps(
          {
            defaultValue: 'abc',
            format,
            normalize,
            normalizeTrigger: 'onChange',
          },
          { noFormat: true },
        ),
      )
      expect(result.current.format).toBe(format)
      expect(result.current.normalize).toBe(normalize)
      act(() => {
        result.current.onChange('x')
      })
      expect(result.current.value).toBe('x')
    })
  })

  describe('ref', () => {
    test('外部 ref 与内部 input 节点对齐（useImperativeHandle）', () => {
      const outer = React.createRef<HTMLInputElement>()
      function Harness() {
        const p = useTextFieldProps({
          ref: outer,
          defaultValue: '',
        })
        const { focused: _f, ...inputProps } = p
        void _f
        return <input data-testid="inner-input" {...inputProps} />
      }
      render(<Harness />)
      const el = screen.getByTestId('inner-input')
      expect(outer.current).toBe(el)
    })
  })

  describe('受控', () => {
    test('value + onChange 受控更新', () => {
      const onChange = jest.fn()
      const { result, rerender } = renderHook(
        ({ v }) =>
          useTextFieldProps({
            value: v,
            onChange,
          }),
        { initialProps: { v: 'a' } },
      )
      expect(result.current.value).toBe('a')
      rerender({ v: 'b' })
      expect(result.current.value).toBe('b')
    })
  })

  describe('展示分支', () => {
    test('truthy 非字符串 value 仍走 format(String(value ?? ""))', () => {
      const format = jest.fn((s: string) => s)
      const { result } = renderHook(() =>
        useTextFieldProps({
          value: {} as any,
          onChange: jest.fn(),
          format,
        }),
      )
      expect(format).toHaveBeenCalled()
      expect(typeof result.current.value).toBe('string')
    })
  })
})
