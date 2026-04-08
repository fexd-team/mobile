import React from 'react'
import { render, screen } from '@testing-library/react'
import View from '..'

describe('View', () => {
  test('默认渲染冒烟', () => {
    const { container } = render(
      <View>
        <span>内容</span>
      </View>,
    )
    expect(container.querySelector('.exd-view')).toBeInTheDocument()
    expect(screen.getByText('内容')).toBeInTheDocument()
  })

  test('默认 direction 为 column 时带 exd-view-column', () => {
    const { container } = render(<View>默认列</View>)
    expect(container.querySelector('.exd-view')).toHaveClass('exd-view-column')
    expect(screen.getByText('默认列')).toBeInTheDocument()
  })

  test('未设置 center 时不加居中修饰类', () => {
    const { container } = render(
      <View>
        <span />
      </View>,
    )
    const root = container.querySelector('.exd-view')
    expect(root).not.toHaveClass('exd-view-horizontal')
    expect(root).not.toHaveClass('exd-view-vertical')
  })

  test('无子节点时仍渲染容器', () => {
    const { container } = render(<View />)
    expect(container.querySelector('.exd-view')).toBeInTheDocument()
  })

  test('direction=column/row/column-reverse/row-reverse 对应修饰类', () => {
    ;(['column', 'row', 'column-reverse', 'row-reverse'] as const).forEach((direction) => {
      const { container } = render(
        <View direction={direction}>
          <span />
        </View>,
      )
      expect(container.querySelector('.exd-view')).toHaveClass(`exd-view-${direction}`)
    })
  })

  test('auto=true 时带 exd-view-auto', () => {
    const { container } = render(
      <View auto>
        <span />
      </View>,
    )
    expect(container.querySelector('.exd-view')).toHaveClass('exd-view-auto')
  })

  test('auto=false 时不带 exd-view-auto', () => {
    const { container } = render(
      <View auto={false}>
        <span />
      </View>,
    )
    expect(container.querySelector('.exd-view')).not.toHaveClass('exd-view-auto')
  })

  test('center=true 时同时带水平与垂直居中类', () => {
    const { container } = render(
      <View center>
        <span />
      </View>,
    )
    const root = container.querySelector('.exd-view')
    expect(root).toHaveClass('exd-view-horizontal')
    expect(root).toHaveClass('exd-view-vertical')
  })

  test('center=horizontal 仅带水平居中类', () => {
    const { container } = render(
      <View center="horizontal">
        <span />
      </View>,
    )
    const root = container.querySelector('.exd-view')
    expect(root).toHaveClass('exd-view-horizontal')
    expect(root).not.toHaveClass('exd-view-vertical')
  })

  test('center=vertical 仅带垂直居中类', () => {
    const { container } = render(
      <View center="vertical">
        <span />
      </View>,
    )
    const root = container.querySelector('.exd-view')
    expect(root).toHaveClass('exd-view-vertical')
    expect(root).not.toHaveClass('exd-view-horizontal')
  })

  test('width 与 height 合并到 style', () => {
    const { container } = render(
      <View width={320} height={240}>
        <span />
      </View>,
    )
    const el = container.querySelector('.exd-view') as HTMLElement
    expect(el.style.width).toBe('320px')
    expect(el.style.height).toBe('240px')
  })

  test('自定义 style 与 width/height 合并', () => {
    const { container } = render(
      <View style={{ color: 'red' }} width={100}>
        <span />
      </View>,
    )
    const el = container.querySelector('.exd-view') as HTMLElement
    expect(el.style.color).toBe('red')
    expect(el.style.width).toBe('100px')
  })

  test('className 透传', () => {
    const { container } = render(
      <View className="block">
        <span />
      </View>,
    )
    expect(container.querySelector('.exd-view')).toHaveClass('block')
  })

  test('其余 div 属性透传', () => {
    const { container } = render(
      <View data-testid="v-root" role="region">
        <span />
      </View>,
    )
    expect(container.querySelector('[data-testid="v-root"]')).toHaveAttribute('role', 'region')
  })

  test('ref 转发到根 div', () => {
    const ref = React.createRef<HTMLDivElement>()
    const { container } = render(
      <View ref={ref}>
        <span />
      </View>,
    )
    expect(ref.current).toBe(container.querySelector('.exd-view'))
  })
})
