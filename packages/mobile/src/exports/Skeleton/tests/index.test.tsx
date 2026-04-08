import React from 'react'
import { render } from '@testing-library/react'
import Skeleton from '..'

describe('Skeleton', () => {
  test('挂载不崩溃并带基础类名', () => {
    const { container } = render(<Skeleton />)
    const root = container.firstChild as HTMLElement
    expect(root).toHaveClass('exd-skeleton')
  })

  test('round 为 true 时增加圆角修饰类', () => {
    const { container } = render(<Skeleton round />)
    expect(container.firstChild).toHaveClass('exd-skeleton-round')
  })

  test('round 为 false 或不传时不带圆角修饰类', () => {
    const { container } = render(<Skeleton round={false} />)
    expect(container.firstChild).not.toHaveClass('exd-skeleton-round')
  })

  test('className 与基础类合并', () => {
    const { container } = render(<Skeleton className="block w-full" />)
    const root = container.firstChild as HTMLElement
    expect(root).toHaveClass('exd-skeleton')
    expect(root).toHaveClass('block')
    expect(root).toHaveClass('w-full')
  })

  test('其余 div 属性透传', () => {
    const { container } = render(<Skeleton data-testid="sk" aria-hidden style={{ width: 120 }} />)
    const root = container.firstChild as HTMLElement
    expect(root).toHaveAttribute('data-testid', 'sk')
    expect(root).toHaveAttribute('aria-hidden', 'true')
    expect(root).toHaveStyle({ width: '120px' })
  })

  test('ref 指向根元素', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Skeleton ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveClass('exd-skeleton')
  })
})
