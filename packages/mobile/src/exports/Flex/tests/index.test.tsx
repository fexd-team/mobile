import React from 'react'
import { render, screen } from '@testing-library/react'
import Flex from '..'

describe('Flex', () => {
  test('默认渲染冒烟：根节点与子节点', () => {
    const { container } = render(
      <Flex>
        <span>子节点</span>
      </Flex>,
    )
    expect(container.querySelector('.exd-flex')).toBeInTheDocument()
    expect(screen.getByText('子节点')).toBeInTheDocument()
  })

  test('无子节点时仍渲染容器', () => {
    const { container } = render(<Flex />)
    expect(container.querySelector('.exd-flex')).toBeInTheDocument()
  })

  test('多个子节点均渲染', () => {
    render(
      <Flex>
        <span>a</span>
        <span>b</span>
        <span>c</span>
      </Flex>,
    )
    expect(screen.getByText('a')).toBeInTheDocument()
    expect(screen.getByText('b')).toBeInTheDocument()
    expect(screen.getByText('c')).toBeInTheDocument()
  })

  test('wrap=false 时根节点带 exd-flex-no-wrap', () => {
    const { container } = render(
      <Flex wrap={false}>
        <span />
      </Flex>,
    )
    expect(container.querySelector('.exd-flex')).toHaveClass('exd-flex-no-wrap')
  })

  test('wrap 默认 true 时不带 no-wrap 类', () => {
    const { container } = render(
      <Flex>
        <span />
      </Flex>,
    )
    expect(container.querySelector('.exd-flex')).not.toHaveClass('exd-flex-no-wrap')
  })

  test('align=top/middle/bottom 分别对应修饰类', () => {
    ;(['top', 'middle', 'bottom'] as const).forEach((align) => {
      const { container } = render(
        <Flex align={align}>
          <span />
        </Flex>,
      )
      expect(container.querySelector('.exd-flex')).toHaveClass(`exd-flex-${align}`)
    })
  })

  test('justify=start/end/center/space-around/space-between 分别对应修饰类', () => {
    ;(['start', 'end', 'center', 'space-around', 'space-between'] as const).forEach((justify) => {
      const { container } = render(
        <Flex justify={justify}>
          <span />
        </Flex>,
      )
      expect(container.querySelector('.exd-flex')).toHaveClass(`exd-flex-${justify}`)
    })
  })

  test('className 合并到根节点', () => {
    const { container } = render(
      <Flex className="my-flex">
        <span />
      </Flex>,
    )
    expect(container.querySelector('.exd-flex')).toHaveClass('my-flex')
  })

  test('ref 转发到根 div', () => {
    const ref = React.createRef<HTMLDivElement>()
    const { container } = render(
      <Flex ref={ref}>
        <span />
      </Flex>,
    )
    expect(ref.current).toBe(container.querySelector('.exd-flex'))
  })

  test('Flex.Item 与子内容可渲染', () => {
    render(
      <Flex>
        <Flex.Item>
          <span>格子项</span>
        </Flex.Item>
      </Flex>,
    )
    expect(screen.getByText('格子项')).toBeInTheDocument()
  })

  test('targetRef/sm/md/lg 传入不崩溃（Context 提供给 Item）', () => {
    const targetRef = React.createRef<HTMLDivElement>()
    const { container } = render(
      <Flex targetRef={targetRef} smValue={100} mdValue={200} lgValue={300}>
        <Flex.Item xs={1}>
          <span>ctx</span>
        </Flex.Item>
      </Flex>,
    )
    expect(container.querySelector('.exd-flex')).toBeInTheDocument()
    expect(screen.getByText('ctx')).toBeInTheDocument()
  })
})
