import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { source } from '@fexd/tools'
import Iconfont from '..'

describe('Iconfont', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

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

    test('onClick 与 ref 透传到非 SVG 根节点', () => {
      const onClick = jest.fn()
      const ref = React.createRef<HTMLElement>()
      const { container } = render(<Iconfont ref={ref} type="home" onClick={onClick} />)
      const el = container.querySelector('i') as HTMLElement

      fireEvent.click(el)
      expect(onClick).toHaveBeenCalledTimes(1)
      expect(ref.current).toBe(el)
    })

    test('ref 透传到 SVG 根节点', () => {
      const ref = React.createRef<SVGSVGElement>()
      const { container } = render(<Iconfont ref={ref} type="home" svg />)
      expect(ref.current).toBe(container.querySelector('svg'))
    })
  })

  describe('L6 边界', () => {
    test('prefix 为 icon 时附加 iconfont class', () => {
      const { container } = render(<Iconfont type="home" prefix="icon" />)
      expect(container.querySelector('i')).toHaveClass('iconfont')
    })

    test('loadIconfont 注入 CSS 与 JS 资源', () => {
      const cssSpy = jest.spyOn(source, 'css').mockImplementation(() => undefined as any)
      const jsSpy = jest.spyOn(source, 'js').mockImplementation(() => undefined as any)

      Iconfont.loadIconfont()

      expect(cssSpy).toHaveBeenCalledWith('https://at.alicdn.com/t/c/font_3629196_pifvlm76us.css')
      expect(jsSpy).toHaveBeenCalledWith('https://at.alicdn.com/t/c/font_3629196_pifvlm76us.js')
    })
  })
})
