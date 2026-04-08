import React from 'react'
import { render, screen } from '@testing-library/react'
import NoticeBar from '..'

describe('NoticeBar', () => {
  describe('跑马灯与静态文案', () => {
    test('animation 为 true 时渲染双份 content 容器（跑马灯结构）', () => {
      const { container } = render(<NoticeBar text="滚动公告" animation />)
      const contents = container.querySelectorAll('.exd-notice-bar-content')
      expect(contents).toHaveLength(2)
      expect(contents[0]).toHaveTextContent('滚动公告')
      expect(contents[1]).toHaveTextContent('滚动公告')
      expect(container.querySelector('.exd-notice-bar-bar')).toHaveClass('exd-notice-bar-scrollable')
    })

    test('animation 为 false 时渲染单份 text 容器', () => {
      const { container } = render(<NoticeBar text="静态提示" animation={false} />)
      expect(container.querySelectorAll('.exd-notice-bar-content')).toHaveLength(0)
      const textEl = container.querySelector('.exd-notice-bar-text')
      expect(textEl).toBeInTheDocument()
      expect(textEl).toHaveTextContent('静态提示')
      expect(container.querySelector('.exd-notice-bar-bar')).not.toHaveClass('exd-notice-bar-scrollable')
    })

    test('默认 animation 为 true（双 content）', () => {
      const { container } = render(<NoticeBar text="默认" />)
      expect(container.querySelectorAll('.exd-notice-bar-content')).toHaveLength(2)
    })
  })

  describe('内容与样式', () => {
    test('text 支持 React 节点', () => {
      render(
        <NoticeBar
          animation={false}
          text={
            <span>
              带<strong>强调</strong>
            </span>
          }
        />,
      )
      expect(screen.getByText('强调')).toBeInTheDocument()
    })

    test('className 合并到根节点', () => {
      const { container } = render(<NoticeBar text="x" className="custom-bar" animation={false} />)
      expect(container.firstChild).toHaveClass('exd-notice-bar-bar')
      expect(container.firstChild).toHaveClass('custom-bar')
    })

    test('默认 text 为空字符串仍可挂载', () => {
      const { container } = render(<NoticeBar animation={false} />)
      expect(container.querySelector('.exd-notice-bar-text')).toHaveTextContent('')
    })
  })

  describe('ref 与属性透传', () => {
    test('ref 指向根 div', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<NoticeBar ref={ref} text="r" animation={false} />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    test('data-* 等 div 属性透传', () => {
      const { container } = render(<NoticeBar text="t" animation={false} role="status" aria-live="polite" />)
      const root = container.firstChild as HTMLElement
      expect(root).toHaveAttribute('role', 'status')
      expect(root).toHaveAttribute('aria-live', 'polite')
    })
  })
})
