import React from 'react'
import { render, screen } from '@testing-library/react'
import Space from '..'

describe('Space', () => {
  test('默认水平方向冒烟：多个子节点', () => {
    render(
      <Space>
        <span>a</span>
        <span>b</span>
      </Space>,
    )
    expect(screen.getByText('a')).toBeInTheDocument()
    expect(screen.getByText('b')).toBeInTheDocument()
    const items = document.querySelectorAll('.exd-space-item')
    expect(items.length).toBe(2)
  })

  test('direction=vertical 时根节点带 exd-space-vertical', () => {
    const { container } = render(
      <Space direction="vertical">
        <span>x</span>
      </Space>,
    )
    expect(container.querySelector('.exd-space')).toHaveClass('exd-space-vertical')
  })

  test('direction=horizontal 时根节点带 exd-space-horizontal', () => {
    const { container } = render(
      <Space direction="horizontal">
        <span>x</span>
      </Space>,
    )
    expect(container.querySelector('.exd-space')).toHaveClass('exd-space-horizontal')
  })

  test('wrap=true 时根节点带 exd-space-wrap 且 style 含负 marginBottom', () => {
    const { container } = render(
      <Space wrap gap={[8, 16]}>
        <span>x</span>
      </Space>,
    )
    const root = container.querySelector('.exd-space') as HTMLElement
    expect(root).toHaveClass('exd-space-wrap')
    expect(root.style.marginBottom).toBe('-16px')
  })

  test('wrap=false 时无负 marginBottom', () => {
    const { container } = render(
      <Space wrap={false}>
        <span>x</span>
      </Space>,
    )
    const root = container.querySelector('.exd-space') as HTMLElement
    expect(root).not.toHaveClass('exd-space-wrap')
    expect(root.style.marginBottom).toBe('')
  })

  test('水平方向且未指定 align 时默认 align 为 center', () => {
    const { container } = render(
      <Space direction="horizontal">
        <span>x</span>
      </Space>,
    )
    expect(container.querySelector('.exd-space')).toHaveClass('exd-space-align-center')
  })

  test('垂直方向且未指定 align 时不强加 align 类', () => {
    const { container } = render(
      <Space direction="vertical">
        <span>x</span>
      </Space>,
    )
    const root = container.querySelector('.exd-space')
    expect(root).not.toHaveClass('exd-space-align-center')
  })

  test('align=start/end/center/baseline 对应类名', () => {
    ;(['start', 'end', 'center', 'baseline'] as const).forEach((align) => {
      const { container } = render(
        <Space align={align} direction="vertical">
          <span>{align}</span>
        </Space>,
      )
      expect(container.querySelector('.exd-space')).toHaveClass(`exd-space-align-${align}`)
    })
  })

  test('gap 为 small/middle/large 关键字映射间距', () => {
    const { container: c1 } = render(
      <Space gap="middle">
        <span>a</span>
        <span>b</span>
      </Space>,
    )
    const items = c1.querySelectorAll('.exd-space-item')
    expect((items[0] as HTMLElement).style.marginRight).toBe('16px')

    const { container: c2 } = render(
      <Space gap="large" direction="vertical">
        <span>a</span>
        <span>b</span>
      </Space>,
    )
    const vItems = c2.querySelectorAll('.exd-space-item')
    expect((vItems[0] as HTMLElement).style.marginBottom).toBe('24px')
  })

  test('gap 为元组 [水平, 垂直] 且可混用关键字与数字', () => {
    const { container } = render(
      <Space gap={['small', 20]}>
        <span>a</span>
        <span>b</span>
      </Space>,
    )
    const items = container.querySelectorAll('.exd-space-item')
    expect((items[0] as HTMLElement).style.marginRight).toBe('8px')
  })

  test('gap 元组第二项为关键字时映射 vertical 间距（wrap 时负 marginBottom）', () => {
    const { container } = render(
      <Space wrap gap={['small', 'large']}>
        <span>a</span>
      </Space>,
    )
    const root = container.querySelector('.exd-space') as HTMLElement
    expect(root.style.marginBottom).toBe('-24px')
  })

  test('split 在子项之间渲染分隔符', () => {
    render(
      <Space split="|">
        <span>1</span>
        <span>2</span>
      </Space>,
    )
    expect(screen.getAllByText('|').length).toBeGreaterThanOrEqual(1)
  })

  test('className 合并到根节点', () => {
    const { container } = render(
      <Space className="sp-custom">
        <span>x</span>
      </Space>,
    )
    expect(container.querySelector('.exd-space')).toHaveClass('sp-custom')
  })

  test('其余 div 属性透传', () => {
    const { container } = render(
      <Space data-testid="sp" role="group">
        <span>x</span>
      </Space>,
    )
    expect(container.querySelector('[data-testid="sp"]')).toHaveAttribute('role', 'group')
  })

  test('ref 转发到根 div', () => {
    const ref = React.createRef<HTMLDivElement>()
    const { container } = render(
      <Space ref={ref}>
        <span>x</span>
      </Space>,
    )
    expect(ref.current).toBe(container.querySelector('.exd-space'))
  })

  test('单个子节点仍渲染一层 item', () => {
    const { container } = render(
      <Space>
        <span>only</span>
      </Space>,
    )
    expect(container.querySelectorAll('.exd-space-item').length).toBe(1)
    expect(screen.getByText('only')).toBeInTheDocument()
  })

  test('最后一个子项无右侧间距', () => {
    const { container } = render(
      <Space gap={10}>
        <span>one</span>
        <span>two</span>
      </Space>,
    )
    const items = container.querySelectorAll('.exd-space-item')
    expect((items[1] as HTMLElement).style.marginRight).toBe('')
  })

  test('gap 为 null 时间距回退为 0', () => {
    const { container } = render(
      <Space gap={null as any} direction="vertical">
        <span>a</span>
        <span>b</span>
      </Space>,
    )
    const items = container.querySelectorAll('.exd-space-item')
    expect((items[0] as HTMLElement).style.marginBottom).toBe('0px')
  })
})
