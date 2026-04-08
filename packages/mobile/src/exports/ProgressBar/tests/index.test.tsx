import React from 'react'
import { render, waitFor } from '@testing-library/react'
import ProgressBar, { prefix } from '..'

describe('ProgressBar', () => {
  describe('冒烟', () => {
    test('默认渲染轨道与进度层', () => {
      const { container } = render(<ProgressBar />)
      expect(container.querySelector(`.${prefix}`)).toBeInTheDocument()
      expect(container.querySelector(`.${prefix}-value`)).toBeInTheDocument()
    })
  })

  describe('进度与夹取', () => {
    test('value 映射为内层宽度百分比', async () => {
      const { container } = render(<ProgressBar value={50} />)
      const inner = container.querySelector(`.${prefix}-value`) as HTMLElement
      await waitFor(() => {
        expect(inner).toHaveStyle({ width: '50%' })
      })
    })

    test('value=0 与 value=100', async () => {
      const { container, rerender } = render(<ProgressBar value={0} />)
      let inner = container.querySelector(`.${prefix}-value`) as HTMLElement
      await waitFor(() => expect(inner).toHaveStyle({ width: '0%' }))
      rerender(<ProgressBar value={100} />)
      inner = container.querySelector(`.${prefix}-value`) as HTMLElement
      await waitFor(() => expect(inner).toHaveStyle({ width: '100%' }))
    })

    test('负值按 0 夹取', async () => {
      const { container } = render(<ProgressBar value={-20} />)
      const inner = container.querySelector(`.${prefix}-value`) as HTMLElement
      await waitFor(() => expect(inner).toHaveStyle({ width: '0%' }))
    })

    test('超过 100 按 100 夹取', async () => {
      const { container } = render(<ProgressBar value={130} />)
      const inner = container.querySelector(`.${prefix}-value`) as HTMLElement
      await waitFor(() => expect(inner).toHaveStyle({ width: '100%' }))
    })
  })

  describe('动画 speed', () => {
    test('speed=none 时 transition 为 0ms', async () => {
      const { container } = render(<ProgressBar value={40} speed="none" />)
      const inner = container.querySelector(`.${prefix}-value`) as HTMLElement
      await waitFor(() => {
        expect(inner.style.transition).toContain('0ms')
      })
    })

    test('speed=slowest 使用内置时长', async () => {
      const { container } = render(<ProgressBar value={40} speed="slowest" />)
      const inner = container.querySelector(`.${prefix}-value`) as HTMLElement
      await waitFor(() => {
        expect(inner.style.transition).toContain('700ms')
      })
    })

    test('speed 为数字时使用自定义毫秒', async () => {
      const { container } = render(<ProgressBar value={40} speed={2000} />)
      const inner = container.querySelector(`.${prefix}-value`) as HTMLElement
      await waitFor(() => {
        expect(inner.style.transition).toContain('2000ms')
      })
    })

    test('speed 为映射表外的字符串时回退为该字符串（transition 拼接）', async () => {
      const { container } = render(<ProgressBar value={40} speed={'custom' as any} />)
      const inner = container.querySelector(`.${prefix}-value`) as HTMLElement
      await waitFor(() => {
        expect(inner.style.transition).toBe('width customms')
      })
    })
  })

  describe('className 与子节点', () => {
    test('className 合并到根节点', () => {
      const { container } = render(<ProgressBar value={30} className="my-bar" />)
      expect(container.querySelector(`.${prefix}`)).toHaveClass('my-bar')
    })

    test('children 不参与渲染（仍不崩溃）', () => {
      const { container } = render(
        <ProgressBar value={10}>
          <span data-testid="ch">子</span>
        </ProgressBar>,
      )
      expect(container.querySelector('[data-testid="ch"]')).toBeNull()
    })

    test('其余属性透传到根 div', () => {
      const { container } = render(<ProgressBar value={5} role="progressbar" aria-valuenow={5} />)
      expect(container.querySelector(`.${prefix}`)).toHaveAttribute('role', 'progressbar')
    })
  })

  describe('ref', () => {
    test('ref 指向轨道根 div', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<ProgressBar ref={ref} value={40} />)
      expect(ref.current?.classList.contains(prefix)).toBe(true)
    })
  })
})
