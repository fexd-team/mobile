import React from 'react'
import { render } from '@testing-library/react'
import Iconfont from '..'

describe('Iconfont', () => {
  describe('L1 冒烟', () => {
    test('默认非 SVG 模式渲染 i 元素', () => {
      const { container } = render(<Iconfont type="home" />)
      const el = container.querySelector('i')
      expect(el).toBeInTheDocument()
      expect(el).toHaveClass('mc-home')
    })
  })

  describe('L2 属性逐项', () => {
    test('prefix 会参与拼接 type class', () => {
      const { container } = render(<Iconfont type="user" prefix="app" />)
      const el = container.querySelector('i')
      expect(el).toHaveClass('app-user')
    })

    test('svg=true 时渲染 svg 与 use 引用', () => {
      const { container } = render(<Iconfont type="home" prefix="mc" svg />)
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveClass('mc')
      const use = container.querySelector('use')
      expect(use).toHaveAttribute('xlink:href', '#mc-home')
    })

    test('className 合并到根节点', () => {
      const { container } = render(<Iconfont type="x" className="extra" />)
      expect(container.querySelector('i')).toHaveClass('extra')
    })

    test('style 可设置尺寸与颜色', () => {
      const { container } = render(<Iconfont type="home" style={{ fontSize: 24, color: 'red' }} />)
      const el = container.querySelector('i') as HTMLElement
      expect(el.style.fontSize).toBe('24px')
      expect(el.style.color).toBe('red')
    })
  })

  describe('L6 边界', () => {
    test('prefix 为 icon 时附加 iconfont class', () => {
      const { container } = render(<Iconfont type="home" prefix="icon" />)
      expect(container.querySelector('i')).toHaveClass('iconfont')
    })
  })
})
