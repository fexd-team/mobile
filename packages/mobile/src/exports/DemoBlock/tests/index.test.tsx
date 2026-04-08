import React from 'react'
import { render, screen } from '@testing-library/react'
import DemoBlock from '..'

describe('DemoBlock', () => {
  test('冒烟：渲染标题与内容', () => {
    render(
      <DemoBlock title="示例标题">
        <span>块内容</span>
      </DemoBlock>,
    )
    expect(screen.getByText('示例标题')).toBeInTheDocument()
    expect(screen.getByText('块内容')).toBeInTheDocument()
  })

  test('无 title 时不渲染标题段落', () => {
    const { container } = render(
      <DemoBlock>
        <span>仅内容</span>
      </DemoBlock>,
    )
    expect(container.querySelector('.exd-demo-block-title')).not.toBeInTheDocument()
    expect(screen.getByText('仅内容')).toBeInTheDocument()
  })

  test('plain=true 时根节点带 --plain 修饰类', () => {
    const { container } = render(
      <DemoBlock title="p" plain>
        <span>c</span>
      </DemoBlock>,
    )
    expect(container.querySelector('.exd-demo-block')).toHaveClass('exd-demo-block--plain')
  })

  test('plain=false 时无 --plain 类', () => {
    const { container } = render(
      <DemoBlock title="p" plain={false}>
        <span>c</span>
      </DemoBlock>,
    )
    expect(container.querySelector('.exd-demo-block')).not.toHaveClass('exd-demo-block--plain')
  })

  test('inline=true 时内容区 Space 为水平且可换行', () => {
    const { container } = render(
      <DemoBlock title="行内" inline>
        <span>a</span>
        <span>b</span>
      </DemoBlock>,
    )
    const space = container.querySelector('.exd-demo-block-content.exd-space')
    expect(space).toHaveClass('exd-space-horizontal')
    expect(space).toHaveClass('exd-space-wrap')
  })

  test('inline=false 时内容区 Space 为垂直布局', () => {
    const { container } = render(
      <DemoBlock title="块级" inline={false}>
        <span>x</span>
      </DemoBlock>,
    )
    const space = container.querySelector('.exd-demo-block-content.exd-space')
    expect(space).toHaveClass('exd-space-vertical')
    expect(space).not.toHaveClass('exd-space-wrap')
  })

  test('多个子节点均在内容区渲染', () => {
    render(
      <DemoBlock title="多子">
        <button type="button">一</button>
        <button type="button">二</button>
      </DemoBlock>,
    )
    expect(screen.getByText('一')).toBeInTheDocument()
    expect(screen.getByText('二')).toBeInTheDocument()
  })

  test('根节点透传 data-* 等属性（className 由组件内部 classnames 覆盖）', () => {
    const { container } = render(
      <DemoBlock title="t" data-testid="db" id="demo-id">
        <span>z</span>
      </DemoBlock>,
    )
    const root = container.querySelector('.exd-demo-block')
    expect(root).toHaveAttribute('data-testid', 'db')
    expect(root).toHaveAttribute('id', 'demo-id')
  })

  test('ref 转发到根 div', () => {
    const ref = React.createRef<HTMLDivElement>()
    const { container } = render(
      <DemoBlock ref={ref} title="r">
        <span>x</span>
      </DemoBlock>,
    )
    expect(ref.current).toBe(container.querySelector('.exd-demo-block'))
  })

  test('无 children 时仍渲染块与标题', () => {
    const { container } = render(<DemoBlock title="空" />)
    expect(screen.getByText('空')).toBeInTheDocument()
    expect(container.querySelector('.exd-demo-block-content')).toBeInTheDocument()
  })
})
