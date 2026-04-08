import React from 'react'
import { render, screen } from '@testing-library/react'
import Empty, { prefix } from '..'

describe('Empty', () => {
  describe('冒烟', () => {
    test('默认展示默认图标与 No Data 文案', () => {
      render(<Empty />)
      expect(screen.getByText('No Data')).toBeInTheDocument()
      expect(document.querySelector('.exd-result')).toBeInTheDocument()
      expect(document.querySelector(`.${prefix}`)).toBeInTheDocument()
    })
  })

  describe('文案与图标', () => {
    test('text 覆盖默认标题', () => {
      render(<Empty text="暂无内容" />)
      expect(screen.getByText('暂无内容')).toBeInTheDocument()
      expect(screen.queryByText('No Data')).toBeNull()
    })

    test('icon 传入自定义节点', () => {
      render(<Empty icon={<span>自定义图标</span>} text="t" />)
      expect(screen.getByText('自定义图标')).toBeInTheDocument()
    })

    test('text 可为 React 节点', () => {
      render(<Empty text={<strong>富文本</strong>} />)
      expect(screen.getByText('富文本')).toBeInTheDocument()
    })
  })

  describe('children 与透传', () => {
    test('children 渲染在结果区域内', () => {
      render(
        <Empty text="标题">
          <button type="button">去刷新</button>
        </Empty>,
      )
      expect(screen.getByRole('button', { name: '去刷新' })).toBeInTheDocument()
    })

    test('className 合并到根（exd-empty）', () => {
      const { container } = render(<Empty className="my-empty" />)
      const root = container.firstChild as HTMLElement
      expect(root).toHaveClass('my-empty')
      expect(root).toHaveClass(prefix)
    })

    test('style 等其余属性透传到 Result 根节点', () => {
      render(<Empty style={{ opacity: 0.5 }} data-testid="empty-root" />)
      const root = screen.getByTestId('empty-root')
      expect(root).toBeInTheDocument()
      expect(root.style.opacity).toBe('0.5')
    })
  })

  describe('边界', () => {
    test('text 为空字符串时不展示标题区域', () => {
      const { container } = render(<Empty text="" />)
      expect(container.querySelector('.exd-result-title')).toBeNull()
    })

    test('children 为 null 时不崩溃', () => {
      render(<Empty text="t">{null}</Empty>)
      expect(screen.getByText('t')).toBeInTheDocument()
    })
  })
})
