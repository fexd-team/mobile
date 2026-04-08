import React from 'react'
import { render, screen } from '@testing-library/react'
import Steps from '..'

describe('Steps', () => {
  test('冒烟：默认渲染不崩溃', () => {
    const { container } = render(<Steps />)
    expect(container.querySelector('.exd-steps')).toBeInTheDocument()
    expect(container.querySelector('.exd-steps-container')).toBeInTheDocument()
  })

  test('未传 value 时默认从第 1 步开始', () => {
    const data = [{ title: '仅一步' }]
    const { container } = render(<Steps data={data} />)
    expect(container.querySelector('.exd-step--process')).toBeInTheDocument()
  })

  test('data 少于 5 项时逐项渲染标题与描述', () => {
    const data = [
      { title: '第一步', description: '描述一' },
      { title: '第二步', description: '描述二' },
      { title: '第三步' },
    ]
    render(<Steps data={data} value={2} />)
    expect(screen.getByText('第一步')).toBeInTheDocument()
    expect(screen.getByText('描述一')).toBeInTheDocument()
    expect(screen.getByText('第二步')).toBeInTheDocument()
  })

  test('value=1 时仅第一步为 process，其余为 default', () => {
    const data = [{ title: 'A' }, { title: 'B' }, { title: 'C' }]
    const { container } = render(<Steps data={data} value={1} checked={false} />)
    const items = container.querySelectorAll('.exd-step')
    expect(items[0]).toHaveClass('exd-step--process')
    expect(items[1]).not.toHaveClass('exd-step--process')
    expect(items[2]).not.toHaveClass('exd-step--process')
  })

  test('checked 为 true 时已走过步骤为 completed', () => {
    const data = [{ title: 'A' }, { title: 'B' }, { title: 'C' }]
    const { container } = render(<Steps data={data} value={3} checked />)
    const items = container.querySelectorAll('.exd-step')
    expect(items[0]).toHaveClass('exd-step--completed')
    expect(items[1]).toHaveClass('exd-step--completed')
    expect(items[2]).toHaveClass('exd-step--process')
  })

  test('任一步 error 时该步为 error 类型', () => {
    const data = [{ title: 'A' }, { title: 'B', error: true }, { title: 'C' }]
    const { container } = render(<Steps data={data} value={2} />)
    const items = container.querySelectorAll('.exd-step')
    expect(items[1]).toHaveClass('exd-step--error')
  })

  test('type 为 flex 时容器带 flex 修饰类名', () => {
    const data = [{ title: '一' }, { title: '二' }, { title: '三' }]
    const { container } = render(<Steps data={data} type="flex" value={1} />)
    expect(container.querySelector('.exd-steps-container')).toHaveClass('exd-steps-container-flex')
  })

  test('data 少于 3 项时即使未传 type 也使用 flex 容器', () => {
    const data = [{ title: '仅一' }, { title: '仅二' }]
    const { container } = render(<Steps data={data} value={1} />)
    expect(container.querySelector('.exd-steps-container')).toHaveClass('exd-steps-container-flex')
  })

  test('自定义 className 生效', () => {
    const { container } = render(<Steps className="my-steps" />)
    expect(container.querySelector('.exd-steps')).toHaveClass('my-steps')
  })

  test('data 为空时渲染 children', () => {
    render(
      <Steps data={[]}>
        <Steps.Item title="自定义" step={1} type="process">
          说明
        </Steps.Item>
      </Steps>,
    )
    expect(screen.getByText('自定义')).toBeInTheDocument()
    expect(screen.getByText('说明')).toBeInTheDocument()
  })

  test('data 为空且 children 为函数时执行函数', () => {
    render(<Steps data={[]}>{() => <li className="exd-step">函数子节点</li>}</Steps>)
    expect(screen.getByText('函数子节点')).toBeInTheDocument()
  })

  test('value 大于步骤数时全部视为已完成（process/completed 依 checked）', () => {
    const data = [{ title: 'S1' }, { title: 'S2' }]
    const { container } = render(<Steps data={data} value={99} checked={false} />)
    const items = container.querySelectorAll('.exd-step')
    expect(items.length).toBe(2)
    expect(items[0]).toHaveClass('exd-step--process')
    expect(items[1]).toHaveClass('exd-step--process')
  })

  test('五步及以上且当前靠后：PassBeforeSteps 含 error、icon 与 checked=false 的 process', () => {
    const data = [
      { title: 'S0', error: true },
      { title: 'S1' },
      { title: 'S2' },
      { title: 'S3', icon: <span data-testid="s3icon">i</span>, description: '尾前描述' },
      { title: 'S4' },
    ]
    const { container } = render(<Steps data={data} value={5} checked={false} />)
    expect(container.querySelectorAll('.exd-step').length).toBeGreaterThanOrEqual(4)
    expect(screen.getByText('S0')).toBeInTheDocument()
    expect(screen.getByText('S3')).toBeInTheDocument()
    expect(screen.getByText('S4')).toBeInTheDocument()
    expect(screen.getByText('尾前描述')).toBeInTheDocument()
    expect(screen.getByTestId('s3icon')).toBeInTheDocument()
    expect(container.querySelector('.exd-step--error')).toBeInTheDocument()
  })

  test('五步及以上且当前为倒数第三步：使用 PassAllBeforeSteps', () => {
    const data = [{ title: 'A' }, { title: 'B' }, { title: 'C' }, { title: 'D' }, { title: 'E' }]
    const { container } = render(<Steps data={data} value={3} />)
    expect(container.querySelectorAll('.exd-step').length).toBeGreaterThanOrEqual(4)
    expect(screen.getByText('C')).toBeInTheDocument()
    expect(screen.getByText('D')).toBeInTheDocument()
    expect(screen.getByText('E')).toBeInTheDocument()
  })

  test('五步及以上且当前靠前：PassAfterSteps 在 current<=0 时取前两步', () => {
    const data = [{ title: 'P0' }, { title: 'P1' }, { title: 'P2' }, { title: 'P3' }, { title: 'P4' }]
    const { container } = render(<Steps data={data} value={1} />)
    expect(container.querySelectorAll('.exd-step').length).toBeGreaterThanOrEqual(4)
    expect(screen.getByText('P0')).toBeInTheDocument()
    expect(screen.getByText('P1')).toBeInTheDocument()
    expect(screen.getByText('P4')).toBeInTheDocument()
  })

  test('五步及以上且 PassAfterSteps 在 current>0 时取当前与下一步', () => {
    const data = [{ title: 'Q0' }, { title: 'Q1' }, { title: 'Q2' }, { title: 'Q3' }, { title: 'Q4' }]
    const { container } = render(<Steps data={data} value={2} />)
    expect(container.querySelectorAll('.exd-step').length).toBeGreaterThanOrEqual(4)
    expect(screen.getByText('Q1')).toBeInTheDocument()
    expect(screen.getByText('Q2')).toBeInTheDocument()
    expect(screen.getByText('Q4')).toBeInTheDocument()
  })

  test('title 为函数时渲染', () => {
    const data = [{ title: () => <span data-testid="tfn">fn标题</span> }, { title: '二' }]
    render(<Steps data={data} value={1} />)
    expect(screen.getByTestId('tfn')).toBeInTheDocument()
  })

  test('ref 转发到根节点', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Steps ref={ref} data={[{ title: 'a' }]} value={1} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
