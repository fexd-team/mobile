import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Collapse from '..'
import Panel from '../Panel'

describe('Collapse', () => {
  // L1 冒烟
  test('默认渲染不崩溃', () => {
    const { container } = render(
      <Collapse>
        <Panel title="标题一" key="1">
          内容一
        </Panel>
      </Collapse>,
    )
    expect(container.querySelector('.exd-collapse')).toBeInTheDocument()
  })

  test('渲染多个 Panel', () => {
    const { container } = render(
      <Collapse>
        <Panel title="面板一" key="1">
          内容一
        </Panel>
        <Panel title="面板二" key="2">
          内容二
        </Panel>
        <Panel title="面板三" key="3">
          内容三
        </Panel>
      </Collapse>,
    )
    const panels = container.querySelectorAll('.exd-collapse-panel')
    expect(panels.length).toBe(3)
  })

  // L2 Prop 逐项
  test('accordion 模式下点击切换只展开一个面板', () => {
    const handleChange = jest.fn()
    const { getByText } = render(
      <Collapse accordion onChange={handleChange}>
        <Panel title="面板一" key="1">
          内容一
        </Panel>
        <Panel title="面板二" key="2">
          内容二
        </Panel>
      </Collapse>,
    )

    fireEvent.click(getByText('面板一'))
    expect(handleChange).toHaveBeenCalledWith(['1'])

    fireEvent.click(getByText('面板二'))
    expect(handleChange).toHaveBeenCalledWith(['2'])
  })

  test('accordion 模式下再次点击同一面板可收起', () => {
    const handleChange = jest.fn()
    const { getByText } = render(
      <Collapse accordion onChange={handleChange}>
        <Panel title="面板一" key="1">
          内容一
        </Panel>
      </Collapse>,
    )

    fireEvent.click(getByText('面板一'))
    expect(handleChange).toHaveBeenCalledWith(['1'])

    fireEvent.click(getByText('面板一'))
    expect(handleChange).toHaveBeenLastCalledWith([])
  })

  test('非 accordion 模式下可同时展开多个面板', () => {
    const handleChange = jest.fn()
    const { getByText } = render(
      <Collapse defaultActiveKey={[]} onChange={handleChange}>
        <Panel title="面板一" key="1">
          内容一
        </Panel>
        <Panel title="面板二" key="2">
          内容二
        </Panel>
      </Collapse>,
    )

    fireEvent.click(getByText('面板一'))
    expect(handleChange).toHaveBeenCalledWith(['1'])

    fireEvent.click(getByText('面板二'))
    expect(handleChange).toHaveBeenCalledWith(['1', '2'])
  })

  test('iconRotate 默认为 true', () => {
    const { container } = render(
      <Collapse defaultActiveKey={['1']}>
        <Panel title="面板一" key="1">
          内容一
        </Panel>
      </Collapse>,
    )
    const icon = container.querySelector('.exd-collapse-panel-icon')
    expect(icon).toHaveClass('exd-collapse-panel-icon-active')
  })

  test('iconRotate=false 时图标不旋转', () => {
    const { container } = render(
      <Collapse iconRotate={false} defaultActiveKey={['1']}>
        <Panel title="面板一" key="1">
          内容一
        </Panel>
      </Collapse>,
    )
    const icon = container.querySelector('.exd-collapse-panel-icon')
    expect(icon).not.toHaveClass('exd-collapse-panel-icon-active')
  })

  test('expandIcon 自定义图标', () => {
    const { container } = render(
      <Collapse expandIcon={<span data-testid="custom-icon">▶</span>}>
        <Panel title="面板一" key="1">
          内容一
        </Panel>
      </Collapse>,
    )
    expect(container.querySelector('[data-testid="custom-icon"]')).toBeInTheDocument()
  })

  // L3 事件回调
  test('onChange 在面板展开/收起时触发', () => {
    const handleChange = jest.fn()
    const { getByText } = render(
      <Collapse defaultActiveKey={[]} onChange={handleChange}>
        <Panel title="面板一" key="1">
          内容一
        </Panel>
      </Collapse>,
    )

    fireEvent.click(getByText('面板一'))
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(['1'])
  })

  test('Panel 的 onClick 事件正常触发', () => {
    const handleClick = jest.fn()
    const { getByText } = render(
      <Collapse>
        <Panel title="面板一" key="1" onClick={handleClick}>
          内容一
        </Panel>
      </Collapse>,
    )

    fireEvent.click(getByText('面板一'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  // L4 Prop 约束
  test('非 accordion 模式下收起单个面板不影响其他面板', () => {
    const handleChange = jest.fn()
    const { getByText } = render(
      <Collapse defaultActiveKey={['1', '2']} onChange={handleChange}>
        <Panel title="面板一" key="1">
          内容一
        </Panel>
        <Panel title="面板二" key="2">
          内容二
        </Panel>
      </Collapse>,
    )

    fireEvent.click(getByText('面板一'))
    expect(handleChange).toHaveBeenCalledWith(['2'])
  })

  // L5 受控/非受控
  test('非受控模式：defaultActiveKey 设置初始展开', () => {
    const { container } = render(
      <Collapse defaultActiveKey={['1']}>
        <Panel title="面板一" key="1">
          内容一
        </Panel>
        <Panel title="面板二" key="2">
          内容二
        </Panel>
      </Collapse>,
    )

    const icons = container.querySelectorAll('.exd-collapse-panel-icon')
    expect(icons[0]).toHaveClass('exd-collapse-panel-icon-active')
    expect(icons[1]).not.toHaveClass('exd-collapse-panel-icon-active')
  })

  test('受控模式：activeKey 由外部控制', () => {
    const { container, rerender } = render(
      <Collapse activeKey={['1']}>
        <Panel title="面板一" key="1">
          内容一
        </Panel>
        <Panel title="面板二" key="2">
          内容二
        </Panel>
      </Collapse>,
    )

    let icons = container.querySelectorAll('.exd-collapse-panel-icon')
    expect(icons[0]).toHaveClass('exd-collapse-panel-icon-active')

    rerender(
      <Collapse activeKey={['2']}>
        <Panel title="面板一" key="1">
          内容一
        </Panel>
        <Panel title="面板二" key="2">
          内容二
        </Panel>
      </Collapse>,
    )

    icons = container.querySelectorAll('.exd-collapse-panel-icon')
    expect(icons[0]).not.toHaveClass('exd-collapse-panel-icon-active')
    expect(icons[1]).toHaveClass('exd-collapse-panel-icon-active')
  })

  // L6 边界
  test('无 children 渲染不崩溃', () => {
    expect(() => {
      render(<Collapse />)
    }).not.toThrow()
  })

  test('children 包含 null/undefined 不崩溃', () => {
    expect(() => {
      render(
        <Collapse>
          {null}
          <Panel title="面板一" key="1">
            内容一
          </Panel>
          {undefined}
        </Collapse>,
      )
    }).not.toThrow()
  })

  test('children 包含普通 HTML 元素不崩溃', () => {
    expect(() => {
      render(
        <Collapse>
          <div>普通元素</div>
          <Panel title="面板一" key="1">
            内容一
          </Panel>
        </Collapse>,
      )
    }).not.toThrow()
  })

  // L8 复合组件
  test('Panel 的 disabled 阻止展开', () => {
    const handleChange = jest.fn()
    const { getByText } = render(
      <Collapse defaultActiveKey={[]} onChange={handleChange}>
        <Panel title="正常面板" key="1">
          内容一
        </Panel>
        <Panel title="禁用面板" key="2" disabled>
          内容二
        </Panel>
      </Collapse>,
    )

    fireEvent.click(getByText('禁用面板'))
    expect(handleChange).not.toHaveBeenCalled()

    fireEvent.click(getByText('正常面板'))
    expect(handleChange).toHaveBeenCalledWith(['1'])
  })

  test('Panel 的 disabled 显示对应样式', () => {
    const { container } = render(
      <Collapse>
        <Panel title="禁用面板" key="1" disabled>
          内容
        </Panel>
      </Collapse>,
    )
    expect(container.querySelector('.exd-collapse-panel-disabled')).toBeInTheDocument()
  })

  test('Panel 的 title 支持 ReactNode', () => {
    const { container } = render(
      <Collapse>
        <Panel title={<span data-testid="custom-title">自定义标题</span>} key="1">
          内容
        </Panel>
      </Collapse>,
    )
    expect(container.querySelector('[data-testid="custom-title"]')).toBeInTheDocument()
  })

  test('ref 正确转发', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <Collapse ref={ref}>
        <Panel title="面板" key="1">
          内容
        </Panel>
      </Collapse>,
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
