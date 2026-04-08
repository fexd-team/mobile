import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import createTransition from '../../createTransition'
import Overlay from '..'

describe('Overlay', () => {
  afterEach(() => {
    cleanup()
  })

  test('visible 为 true 时渲染遮罩根节点', () => {
    const { container } = render(<Overlay visible />)
    expect(container.querySelector('.exd-overlay')).toBeInTheDocument()
  })

  test('className 合并到遮罩根节点', () => {
    const { container } = render(<Overlay visible className="my-mask" />)
    expect(container.querySelector('.exd-overlay')).toHaveClass('my-mask')
  })

  test('transparent 为 true 时带有 exd-overlay-transparent', () => {
    const { container } = render(<Overlay visible transparent />)
    expect(container.querySelector('.exd-overlay')).toHaveClass('exd-overlay-transparent')
  })

  test('absolute 为 true 时带有 exd-overlay-absolute', () => {
    const { container } = render(<Overlay visible absolute />)
    expect(container.querySelector('.exd-overlay')).toHaveClass('exd-overlay-absolute')
  })

  test('点击遮罩触发 onClick', () => {
    const onClick = jest.fn()
    const { container } = render(<Overlay visible onClick={onClick} />)
    fireEvent.click(container.querySelector('.exd-overlay')!)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test('visible 为 false 时遮罩根节点不在文档中', () => {
    const { container } = render(<Overlay visible={false} />)
    expect(container.querySelector('.exd-overlay')).not.toBeInTheDocument()
  })

  test('visible 由 false 切为 true 时完成挂载', () => {
    const { container, rerender } = render(<Overlay visible={false} />)
    expect(container.querySelector('.exd-overlay')).not.toBeInTheDocument()
    rerender(<Overlay visible />)
    expect(container.querySelector('.exd-overlay')).toBeInTheDocument()
  })

  test('ref 通过 useImperativeHandle 指向遮罩 div', () => {
    const ref = React.createRef<HTMLDivElement>()
    const { container } = render(<Overlay visible ref={ref} />)
    const node = container.querySelector('.exd-overlay')
    expect(ref.current).toBe(node)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  test('可传入自定义 transition 与 transitionSpeed', () => {
    const CustomT = createTransition('overlay-test-t')
    const { container } = render(
      <Overlay visible transition={CustomT} transitionSpeed="fast" data-testid="ov">
        <span data-testid="inner-ch">里</span>
      </Overlay>,
    )
    expect(container.querySelector('.exd-overlay')).toHaveAttribute('data-testid', 'ov')
    expect(container.querySelector('[data-testid="inner-ch"]')).toHaveTextContent('里')
  })
})
