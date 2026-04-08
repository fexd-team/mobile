import React from 'react'
import { render, screen } from '@testing-library/react'
import NotFound from '..'

describe('NotFound', () => {
  describe('L1 冒烟', () => {
    test('默认渲染不崩溃并展示默认文案', () => {
      const { container } = render(<NotFound />)
      expect(screen.getByText('404 Not Found')).toBeInTheDocument()
      expect(container.querySelector('.exd-not-found')).toBeInTheDocument()
    })
  })

  describe('L2 属性逐项', () => {
    test('text 映射为标题区域文案', () => {
      render(<NotFound text="自定义未找到" />)
      expect(screen.getByText('自定义未找到')).toBeInTheDocument()
      expect(document.querySelector('.exd-result-title')).toHaveTextContent('自定义未找到')
    })

    test('children 会渲染在内容区', () => {
      render(
        <NotFound>
          <span>子内容</span>
        </NotFound>,
      )
      expect(screen.getByText('子内容')).toBeInTheDocument()
    })

    test('className 合并到根节点', () => {
      const { container } = render(<NotFound className="nf-custom" />)
      const root = container.querySelector('.exd-not-found')
      expect(root).toHaveClass('nf-custom')
    })
  })

  describe('L6 边界', () => {
    test('text 为空字符串时不渲染标题节点', () => {
      const { container } = render(<NotFound text="" />)
      expect(container.querySelector('.exd-result-title')).toBeNull()
    })
  })
})
