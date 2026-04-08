import { renderHook, act } from '@testing-library/react'
import useIOControl from '..'

describe('useIOControl', () => {
  describe('返回值结构', () => {
    test('包含 value、setValue、getValue、focused、setFocused、getFocused', () => {
      const { result } = renderHook(() => useIOControl({ defaultValue: 0 }))
      expect(result.current).toMatchObject({
        value: 0,
      })
      expect(typeof result.current.setValue).toBe('function')
      expect(typeof result.current.getValue).toBe('function')
      expect(typeof result.current.setFocused).toBe('function')
      expect(typeof result.current.getFocused).toBe('function')
      expect(result.current.focused).toBe(false)
    })
  })

  describe('非受控', () => {
    test('defaultValue 作为初始 value', () => {
      const { result } = renderHook(() => useIOControl({ defaultValue: 'init' }))
      expect(result.current.value).toBe('init')
    })

    test('无 defaultValue 时 value 可能为 undefined', () => {
      const { result } = renderHook(() => useIOControl<string>({}))
      expect(result.current.value).toBeUndefined()
    })
  })

  describe('受控', () => {
    test('value + onChange：setValue 触发 onChange', () => {
      const onChange = jest.fn()
      const { result } = renderHook(() => useIOControl<string>({ value: 'a', onChange }))
      expect(result.current.value).toBe('a')
      act(() => {
        result.current.setValue('b')
      })
      expect(onChange).toHaveBeenCalledWith('b')
    })

    test('外部 value 变更后 hook 内 value 同步', () => {
      const { result, rerender } = renderHook(({ v }) => useIOControl<string>({ value: v, onChange: jest.fn() }), {
        initialProps: { v: 'x' as string },
      })
      expect(result.current.value).toBe('x')
      rerender({ v: 'y' })
      expect(result.current.value).toBe('y')
    })
  })

  describe('聚焦时受控值剥离（内部删除 value 键）', () => {
    test('聚焦后仍可调 setValue；失焦后恢复受控语义', () => {
      const onChange = jest.fn()
      const { result, rerender } = renderHook(({ v }) => useIOControl<string>({ value: v, onChange }), {
        initialProps: { v: 'out' as string },
      })
      act(() => {
        result.current.setFocused(true)
      })
      expect(result.current.focused).toBe(true)
      act(() => {
        result.current.setValue('during')
      })
      expect(onChange).toHaveBeenCalled()
      act(() => {
        result.current.setFocused(false)
      })
      rerender({ v: 'out' })
      expect(result.current.focused).toBe(false)
    })
  })

  describe('setValue / getValue', () => {
    test('函数式更新', () => {
      const { result } = renderHook(() => useIOControl({ defaultValue: 1 }))
      act(() => {
        result.current.setValue((prev: number) => prev + 2)
      })
      expect(result.current.value).toBe(3)
      expect(result.current.getValue()).toBe(3)
    })

    test('与当前值相同则短路不更新', () => {
      const onChange = jest.fn()
      const { result } = renderHook(() => useIOControl({ value: 'same', onChange }))
      act(() => {
        result.current.setValue('same')
      })
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('自定义 valuePropName / trigger（覆盖 useControllableValue 分支）', () => {
    test('使用 checked / onCheckedChange 作为受控字段', () => {
      const onCheckedChange = jest.fn()
      const { result } = renderHook(() =>
        useIOControl<boolean>(
          { checked: false, onCheckedChange },
          {
            valuePropName: 'checked',
            defaultValuePropName: 'defaultChecked',
            trigger: 'onCheckedChange',
          },
        ),
      )
      expect(result.current.value).toBe(false)
      act(() => {
        result.current.setValue(true)
      })
      expect(onCheckedChange).toHaveBeenCalledWith(true)
    })
  })

  describe('filterIOValue（useControllableValue 内联逻辑）', () => {
    test('过滤为 false 时值展示为 undefined', () => {
      const { result } = renderHook(() =>
        useIOControl<string>({
          defaultValue: 'bad',
          filterIOValue: (v) => v !== 'bad',
        }),
      )
      expect(result.current.value).toBeUndefined()
    })

    test('filterIOValue 返回 false 时 setValue 不生效', () => {
      const onChange = jest.fn()
      const { result } = renderHook(() =>
        useIOControl<string>({
          defaultValue: 'ok',
          onChange,
          filterIOValue: (v) => v !== 'reject',
        }),
      )
      act(() => {
        result.current.setValue('reject')
      })
      expect(result.current.getValue()).toBe('ok')
      expect(onChange).not.toHaveBeenCalled()
    })

    test('filterIOValue 未定义时等价于恒可用', () => {
      const { result } = renderHook(() => useIOControl({ defaultValue: 1 }))
      act(() => {
        result.current.setValue(2)
      })
      expect(result.current.value).toBe(2)
    })
  })

  describe('getFocused', () => {
    test('与 focused 状态一致', () => {
      const { result } = renderHook(() => useIOControl({ defaultValue: '' }))
      expect(result.current.getFocused()).toBe(false)
      act(() => {
        result.current.setFocused(true)
      })
      expect(result.current.getFocused()).toBe(true)
    })
  })

  describe('无 value 键（仅 default）', () => {
    test('未传入 value 时 hasValueKey 为 false，不注入受控 value', () => {
      const { result } = renderHook(() => useIOControl({ defaultValue: 'd', onChange: jest.fn() }))
      expect(result.current.value).toBe('d')
    })
  })
})
