import React from 'react'
import { render, screen } from '@testing-library/react'
import Timeline from '..'

describe('Timeline', () => {
  test('data 为空且无语子节点时仅渲染容器', () => {
    const { container } = render(<Timeline />)
    const root = container.querySelector('.exd-timeline')
    expect(root).toBeInTheDocument()
    expect(root?.querySelectorAll('.exd-timeline-item')).toHaveLength(0)
  })

  test('通过 data 渲染多条时间线项', () => {
    const { container } = render(
      <Timeline
        data={[
          { title: '步骤一', time: '09:00', content: '开始' },
          { title: '步骤二', time: '10:00', content: '结束' },
          { title: '无 content 字段', time: '11:00' },
        ]}
      />,
    )
    const items = container.querySelectorAll('.exd-timeline-item')
    expect(items).toHaveLength(3)
    expect(screen.getByText('步骤一')).toBeInTheDocument()
    expect(screen.getByText('步骤二')).toBeInTheDocument()
    expect(screen.getByText('开始')).toBeInTheDocument()
    expect(screen.getByText('结束')).toBeInTheDocument()
    expect(screen.getByText('09:00')).toBeInTheDocument()
    expect(screen.getByText('10:00')).toBeInTheDocument()
    expect(screen.getByText('无 content 字段')).toBeInTheDocument()
    expect(screen.getByText('11:00')).toBeInTheDocument()
  })

  test('无 data 时使用 children 渲染', () => {
    render(
      <Timeline>
        <Timeline.Item title="子项" time="12:00">
          子内容
        </Timeline.Item>
      </Timeline>,
    )
    expect(screen.getByText('子项')).toBeInTheDocument()
    expect(screen.getByText('子内容')).toBeInTheDocument()
    expect(screen.getByText('12:00')).toBeInTheDocument()
  })

  test('children 为函数时通过 run 执行', () => {
    render(
      <Timeline>
        {() => (
          <Timeline.Item title="函数子节点" time="now">
            inner
          </Timeline.Item>
        )}
      </Timeline>,
    )
    expect(screen.getByText('函数子节点')).toBeInTheDocument()
    expect(screen.getByText('inner')).toBeInTheDocument()
  })

  test('data 与 children 并存时优先使用 data', () => {
    render(
      <Timeline data={[{ title: '来自 data', time: 't', content: 'c' }]}>
        <Timeline.Item title="来自 children" time="x">
          y
        </Timeline.Item>
      </Timeline>,
    )
    expect(screen.getByText('来自 data')).toBeInTheDocument()
    expect(screen.queryByText('来自 children')).not.toBeInTheDocument()
  })

  test('className 合并到根节点', () => {
    const { container } = render(<Timeline className="my-tl" />)
    expect(container.querySelector('.exd-timeline')).toHaveClass('my-tl')
  })

  test('ref 指向根 div', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Timeline ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveClass('exd-timeline')
  })
})

describe('Timeline.Item', () => {
  test('无 children 时不渲染 content-main 区域', () => {
    const { container } = render(
      <Timeline>
        <Timeline.Item title="仅标题" time="t" />
      </Timeline>,
    )
    expect(container.querySelector('.exd-timeline-content-main')).not.toBeInTheDocument()
  })

  test('dot 为自定义节点时渲染', () => {
    const { container } = render(
      <Timeline>
        <Timeline.Item title="d" time="t" dot={<span data-testid="dot">●</span>} />
      </Timeline>,
    )
    expect(screen.getByTestId('dot')).toHaveTextContent('●')
  })

  test('dot 为函数时渲染其返回值', () => {
    render(
      <Timeline>
        <Timeline.Item title="d" time="t" dot={() => <i data-testid="dot-fn">fn</i>} />
      </Timeline>,
    )
    expect(screen.getByTestId('dot-fn')).toHaveTextContent('fn')
  })

  test('children 为函数时渲染执行结果', () => {
    render(
      <Timeline>
        <Timeline.Item title="t" time="tm">
          {() => <span data-testid="ch-fn">动态</span>}
        </Timeline.Item>
      </Timeline>,
    )
    expect(screen.getByTestId('ch-fn')).toHaveTextContent('动态')
  })

  test('Item className 与属性透传', () => {
    const { container } = render(
      <Timeline>
        <Timeline.Item title="" time="" className="item-x" data-item="1" />
      </Timeline>,
    )
    const item = container.querySelector('.exd-timeline-item')
    expect(item).toHaveClass('item-x')
    expect(item).toHaveAttribute('data-item', '1')
  })
})
