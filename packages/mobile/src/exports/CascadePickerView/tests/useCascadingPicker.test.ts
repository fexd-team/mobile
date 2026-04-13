import { renderHook, act } from '@testing-library/react'
import useCascadingPicker from '../useCascadingPicker'
import { CascadingColumnDef } from '../type'

function makeRangeColumns(ranges: [number, number][]): CascadingColumnDef[] {
  return ranges.map((r, i) => ({
    key: `col-${i}`,
    getOptions: () =>
      Array.from({ length: r[1] - r[0] + 1 }, (_, idx) => ({
        value: r[0] + idx,
        label: String(r[0] + idx),
      })),
  }))
}

describe('useCascadingPicker', () => {
  test('使用 defaultValue 初始化', () => {
    const columns = makeRangeColumns([
      [1, 3],
      [10, 12],
    ])
    const { result } = renderHook(() => useCascadingPicker({ columns, defaultValue: [2, 11] }))
    expect(result.current.values).toEqual([2, 11])
    expect(result.current.columns.length).toBe(2)
  })

  test('defaultValue 不在选项中时 resolve 到第一项', () => {
    const columns = makeRangeColumns([
      [1, 3],
      [10, 12],
    ])
    const { result } = renderHook(() => useCascadingPicker({ columns, defaultValue: [99, 99] }))
    expect(result.current.values).toEqual([1, 10])
  })

  test('SET_COLUMN 更新目标列并级联后续列', () => {
    const columns: CascadingColumnDef[] = [
      {
        key: 'parent',
        getOptions: () => [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ],
      },
      {
        key: 'child',
        getOptions: ([parent]) =>
          parent === 'a'
            ? [
                { value: 'a1', label: 'A1' },
                { value: 'a2', label: 'A2' },
              ]
            : [
                { value: 'b1', label: 'B1' },
                { value: 'b2', label: 'B2' },
              ],
      },
    ]
    const onChange = jest.fn()
    const { result } = renderHook(() => useCascadingPicker({ columns, defaultValue: ['a', 'a1'], onChange }))
    expect(result.current.values).toEqual(['a', 'a1'])

    act(() => {
      result.current.columns[0].onChange('b')
    })
    expect(result.current.values).toEqual(['b', 'b1'])
    expect(onChange).toHaveBeenCalledWith(['b', 'b1'])
  })

  test('SYNC_ALL 由外部 value 变化触发', () => {
    const columns = makeRangeColumns([
      [1, 5],
      [10, 15],
    ])
    const { result, rerender } = renderHook(({ value }) => useCascadingPicker({ columns, value }), {
      initialProps: { value: [2, 12] as any },
    })
    expect(result.current.values).toEqual([2, 12])

    rerender({ value: [4, 14] })
    expect(result.current.values).toEqual([4, 14])
  })

  test('自定义 resolveValue 被调用', () => {
    const columns: CascadingColumnDef[] = [
      {
        key: 'col',
        getOptions: () => [
          { value: 1, label: '1' },
          { value: 2, label: '2' },
          { value: 3, label: '3' },
        ],
        resolveValue: (_current, options) => options[options.length - 1]?.value,
      },
    ]
    const { result } = renderHook(() => useCascadingPicker({ columns }))
    expect(result.current.values).toEqual([3])
  })

  test('columns 返回正确的 options', () => {
    const columns: CascadingColumnDef[] = [
      {
        key: 'level1',
        getOptions: () => [
          { value: 'x', label: 'X' },
          { value: 'y', label: 'Y' },
        ],
      },
      {
        key: 'level2',
        getOptions: ([v]) =>
          v === 'x'
            ? [{ value: 'x1', label: 'X1' }]
            : [
                { value: 'y1', label: 'Y1' },
                { value: 'y2', label: 'Y2' },
              ],
      },
    ]
    const { result } = renderHook(() => useCascadingPicker({ columns, defaultValue: ['x', 'x1'] }))
    expect(result.current.columns[0].options).toEqual([
      { value: 'x', label: 'X' },
      { value: 'y', label: 'Y' },
    ])
    expect(result.current.columns[1].options).toEqual([{ value: 'x1', label: 'X1' }])
  })

  test('空 columns 返回空 values', () => {
    const { result } = renderHook(() => useCascadingPicker({ columns: [] }))
    expect(result.current.values).toEqual([])
    expect(result.current.columns).toEqual([])
  })

  test('不传 onChange 时不崩溃', () => {
    const columns = makeRangeColumns([[1, 3]])
    const { result } = renderHook(() => useCascadingPicker({ columns, defaultValue: [2] }))
    expect(result.current.values).toEqual([2])
    act(() => {
      result.current.columns[0].onChange(3)
    })
    expect(result.current.values).toEqual([3])
  })

  test('SET_COLUMN 值未变化时不触发多余 onChange', () => {
    const columns = makeRangeColumns([[1, 3]])
    const onChange = jest.fn()
    const { result } = renderHook(() => useCascadingPicker({ columns, defaultValue: [2], onChange }))
    onChange.mockClear()
    act(() => {
      result.current.columns[0].onChange(2)
    })
    expect(onChange).not.toHaveBeenCalled()
  })

  test('SYNC_ALL 值不变时不触发多余 onChange', () => {
    const columns = makeRangeColumns([[1, 5]])
    const onChange = jest.fn()
    const { result, rerender } = renderHook(({ value }) => useCascadingPicker({ columns, value, onChange }), {
      initialProps: { value: [3] as any },
    })
    onChange.mockClear()
    rerender({ value: [3] })
    expect(onChange).not.toHaveBeenCalled()
  })

  test('三列级联完整场景', () => {
    const columns: CascadingColumnDef[] = [
      {
        key: 'province',
        getOptions: () => [
          { value: 'zj', label: '浙江' },
          { value: 'ah', label: '安徽' },
        ],
      },
      {
        key: 'city',
        getOptions: ([prov]) => {
          const map: Record<string, any[]> = {
            zj: [
              { value: 'hz', label: '杭州' },
              { value: 'wz', label: '温州' },
            ],
            ah: [{ value: 'hf', label: '合肥' }],
          }
          return map[prov as string] ?? []
        },
      },
      {
        key: 'district',
        getOptions: ([, city]) => {
          const map: Record<string, any[]> = {
            hz: [{ value: 'xh', label: '西湖' }],
            wz: [{ value: 'lc', label: '鹿城' }],
            hf: [{ value: 'bh', label: '包河' }],
          }
          return map[city as string] ?? []
        },
      },
    ]
    const onChange = jest.fn()
    const { result } = renderHook(() => useCascadingPicker({ columns, defaultValue: ['zj', 'hz', 'xh'], onChange }))
    expect(result.current.values).toEqual(['zj', 'hz', 'xh'])

    act(() => {
      result.current.columns[0].onChange('ah')
    })
    expect(result.current.values).toEqual(['ah', 'hf', 'bh'])
  })
})
