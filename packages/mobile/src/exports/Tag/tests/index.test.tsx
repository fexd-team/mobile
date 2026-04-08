import React from 'react'
import { render, screen } from '@testing-library/react'
import Tag, { prefix } from '..'

describe('Tag', () => {
  describe('冒烟与导出', () => {
    test('挂载不崩溃并渲染固定文案 Tag', () => {
      render(<Tag />)
      expect(screen.getByText('Tag')).toBeInTheDocument()
    })

    test('命名导出 prefix 与样式前缀一致', () => {
      expect(prefix).toBe('exd-tag')
    })
  })

  describe('Props 透传', () => {
    test('className 与 data-* 透传到根节点', () => {
      const { container } = render(<Tag className="my-tag" data-testid="tag-root" />)
      const root = container.firstChild as HTMLElement
      expect(root).toHaveClass('my-tag')
      expect(root).toHaveAttribute('data-testid', 'tag-root')
    })

    test('style 透传到根节点', () => {
      const { container } = render(<Tag style={{ marginTop: 8 }} />)
      const root = container.firstChild as HTMLElement
      expect(root).toHaveStyle({ marginTop: '8px' })
    })
  })

  describe('ref', () => {
    test('ref 指向根 div', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<Tag ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
      expect(ref.current?.textContent).toBe('Tag')
    })
  })
})
