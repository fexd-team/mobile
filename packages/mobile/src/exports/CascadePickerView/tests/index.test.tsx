import React from 'react'
import { render, fireEvent, act, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import CascadePickerView from '..'

const treeData = [
  {
    label: '浙江',
    value: '浙江',
    children: [
      {
        label: '杭州',
        value: '杭州',
        children: [
          { label: '西湖区', value: '西湖区' },
          { label: '上城区', value: '上城区' },
          { label: '余杭区', value: '余杭区', disabled: true },
        ],
      },
      {
        label: '温州',
        value: '温州',
        children: [
          { label: '鹿城区', value: '鹿城区' },
          { label: '龙湾区', value: '龙湾区', disabled: true },
          { label: '瓯海区', value: '瓯海区' },
        ],
      },
      {
        label: '宁波',
        value: '宁波',
        children: [
          { label: '海曙区', value: '海曙区' },
          { label: '江北区', value: '江北区' },
          { label: '镇海区', value: '镇海区' },
        ],
      },
    ],
  },
  {
    label: '安徽',
    value: '安徽',
    children: [
      {
        label: '合肥',
        value: '合肥',
        children: [
          { label: '包河区', value: '包河区' },
          { label: '蜀山区', value: '蜀山区' },
          { label: '瑶海区', value: '瑶海区' },
        ],
      },
      {
        label: '芜湖',
        value: '芜湖',
        children: [
          { label: '镜湖区', value: '镜湖区' },
          { label: '弋江区', value: '弋江区' },
          { label: '湾沚区', value: '湾沚区' },
        ],
      },
    ],
  },
  {
    label: '江苏',
    value: '江苏',
    children: [
      {
        label: '南京',
        value: '南京',
        children: [
          { label: '玄武区', value: '玄武区' },
          { label: '秦淮区', value: '秦淮区' },
          { label: '建邺区', value: '建邺区' },
        ],
      },
      {
        label: '苏州',
        value: '苏州',
        children: [
          { label: '虎丘区', value: '虎丘区' },
          { label: '吴中区', value: '吴中区' },
          { label: '相城区', value: '相城区' },
        ],
      },
    ],
  },
]

function getColumnLabels(container: HTMLElement, colIndex: number) {
  const cols = container.querySelectorAll('.exd-cascade-picker-view > .exd-picker-view')
  return Array.from(cols[colIndex]?.querySelectorAll('.exd-picker-view-item') ?? [])
    .map((el) => el.textContent ?? '')
    .filter((t) => t !== '')
}

function getActiveLabel(container: HTMLElement, colIndex: number) {
  const cols = container.querySelectorAll('.exd-cascade-picker-view > .exd-picker-view')
  return cols[colIndex]?.querySelector('.exd-picker-view-item--active')?.textContent ?? ''
}

function scrollColumn(container: HTMLElement, columnIndex: number, scrollTop: number) {
  const cols = container.querySelectorAll('.exd-cascade-picker-view > .exd-picker-view')
  const content = cols[columnIndex]?.querySelector('.exd-picker-view-content') as HTMLDivElement
  expect(content).toBeTruthy()
  fireEvent.scroll(content, { target: { scrollTop } })
  act(() => {
    jest.advanceTimersByTime(200)
  })
}

describe('CascadePickerView', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  test('渲染根容器与三列 PickerView', () => {
    const { container } = render(<CascadePickerView options={treeData} />)
    expect(container.querySelector('.exd-cascade-picker-view')).toBeInTheDocument()
    expect(container.querySelectorAll('.exd-cascade-picker-view > .exd-picker-view').length).toBe(3)
  })

  test('第一列展示省份选项', () => {
    const { container } = render(<CascadePickerView options={treeData} />)
    const labels = getColumnLabels(container, 0)
    expect(labels).toEqual(expect.arrayContaining(['浙江', '安徽', '江苏']))
  })

  test('默认选中第一条路径', () => {
    const onChange = jest.fn()
    render(<CascadePickerView options={treeData} onChange={onChange} />)
    expect(onChange).toHaveBeenCalled()
    const [values, selectedOptions] = onChange.mock.calls[onChange.mock.calls.length - 1]
    expect(values).toEqual(['浙江', '杭州', '西湖区'])
    expect(selectedOptions.map((o: any) => o.label)).toEqual(['浙江', '杭州', '西湖区'])
  })

  test('受控 value 设定初始选中', () => {
    const onChange = jest.fn()
    render(<CascadePickerView options={treeData} value={['安徽', '芜湖', '弋江区']} onChange={onChange} />)
    expect(onChange).toHaveBeenCalled()
    const [values] = onChange.mock.calls[onChange.mock.calls.length - 1]
    expect(values).toEqual(['安徽', '芜湖', '弋江区'])
  })

  test('defaultValue 设定初始选中', () => {
    const onChange = jest.fn()
    render(<CascadePickerView options={treeData} defaultValue={['江苏', '苏州', '吴中区']} onChange={onChange} />)
    expect(onChange).toHaveBeenCalled()
    const [values] = onChange.mock.calls[onChange.mock.calls.length - 1]
    expect(values).toEqual(['江苏', '苏州', '吴中区'])
  })

  test('切换省份时市和区联动更新', () => {
    jest.useFakeTimers()
    const onChange = jest.fn()
    const { container } = render(
      <CascadePickerView options={treeData} defaultValue={['浙江', '杭州', '西湖区']} onChange={onChange} />,
    )
    onChange.mockClear()
    scrollColumn(container, 0, 50)
    expect(onChange).toHaveBeenCalled()
    const [values, selectedOptions] = onChange.mock.calls[onChange.mock.calls.length - 1]
    expect(values[0]).not.toBe('浙江')
    expect(selectedOptions.length).toBe(3)
  })

  test('disabled 项不被自动选中（resolveValue 跳过）', () => {
    const dataWithDisabledFirst = [
      {
        label: '测试省',
        value: '测试省',
        children: [
          {
            label: '测试市',
            value: '测试市',
            children: [
              { label: '禁用区', value: '禁用区', disabled: true },
              { label: '可用区', value: '可用区' },
            ],
          },
        ],
      },
    ]
    const onChange = jest.fn()
    render(<CascadePickerView options={dataWithDisabledFirst} onChange={onChange} />)
    expect(onChange).toHaveBeenCalled()
    const [values] = onChange.mock.calls[onChange.mock.calls.length - 1]
    expect(values[2]).toBe('可用区')
  })

  test('ref 和 className 正确传递', () => {
    const ref = React.createRef<HTMLDivElement>()
    const { container } = render(<CascadePickerView ref={ref} className="custom-cls" options={treeData} />)
    const root = container.querySelector('.exd-cascade-picker-view')
    expect(root).toBe(ref.current)
    expect(root).toHaveClass('custom-cls')
  })

  test('空数据不渲染列', () => {
    const { container } = render(<CascadePickerView options={[]} />)
    expect(container.querySelectorAll('.exd-picker-view').length).toBe(0)
  })

  test('两层数据正确渲染两列', () => {
    const twoLevelData = [
      {
        label: '水果',
        value: 'fruit',
        children: [
          { label: '苹果', value: 'apple' },
          { label: '香蕉', value: 'banana' },
        ],
      },
      {
        label: '蔬菜',
        value: 'veggie',
        children: [{ label: '白菜', value: 'cabbage' }],
      },
    ]
    const { container } = render(<CascadePickerView options={twoLevelData} />)
    expect(container.querySelectorAll('.exd-cascade-picker-view > .exd-picker-view').length).toBe(2)
  })

  test('所有区全部 disabled 时回退选第一项', () => {
    const allDisabled = [
      {
        label: '省',
        value: '省',
        children: [
          {
            label: '市',
            value: '市',
            children: [
              { label: '区A', value: 'a', disabled: true },
              { label: '区B', value: 'b', disabled: true },
            ],
          },
        ],
      },
    ]
    const onChange = jest.fn()
    render(<CascadePickerView options={allDisabled} onChange={onChange} />)
    expect(onChange).toHaveBeenCalled()
    const [values] = onChange.mock.calls[onChange.mock.calls.length - 1]
    expect(values[2]).toBe('a')
  })

  test('value 中有不匹配项时回退到默认首项', () => {
    const onChange = jest.fn()
    render(<CascadePickerView options={treeData} value={['浙江', '不存在的市', '不存在的区']} onChange={onChange} />)
    expect(onChange).toHaveBeenCalled()
    const [values] = onChange.mock.calls[onChange.mock.calls.length - 1]
    expect(values[0]).toBe('浙江')
    expect(values[1]).toBe('杭州')
  })

  test('current 值存在且非 disabled 时保持不变', () => {
    const onChange = jest.fn()
    render(<CascadePickerView options={treeData} defaultValue={['浙江', '温州', '瓯海区']} onChange={onChange} />)
    expect(onChange).toHaveBeenCalled()
    const [values] = onChange.mock.calls[onChange.mock.calls.length - 1]
    expect(values).toEqual(['浙江', '温州', '瓯海区'])
  })

  test('current 值为 disabled 项时跳到第一个可用项', () => {
    const onChange = jest.fn()
    render(<CascadePickerView options={treeData} defaultValue={['浙江', '温州', '龙湾区']} onChange={onChange} />)
    const [values] = onChange.mock.calls[onChange.mock.calls.length - 1]
    expect(values[2]).toBe('鹿城区')
  })

  test('受控 value 变化后更新选中', async () => {
    const onChange = jest.fn()
    function Wrapper() {
      const [v, setV] = React.useState<(string | number)[]>(['浙江', '杭州', '西湖区'])
      return (
        <>
          <button type="button" onClick={() => setV(['安徽', '合肥', '蜀山区'])}>
            切换
          </button>
          <CascadePickerView options={treeData} value={v} onChange={onChange} />
        </>
      )
    }
    const { getByText } = render(<Wrapper />)
    onChange.mockClear()
    fireEvent.click(getByText('切换'))
    await waitFor(() => {
      const last = onChange.mock.calls[onChange.mock.calls.length - 1]
      expect(last[0]).toEqual(['安徽', '合肥', '蜀山区'])
    })
  })
})
