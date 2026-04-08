import React from 'react'
import { render, screen } from '@testing-library/react'
import Divider from '..'

const prefix = 'exd-divider'

describe('Divider', () => {
  describe('冒烟', () => {
    test('水平方向默认渲染轨道', () => {
      const { container } = render(<Divider />)
      expect(container.querySelector(`.${prefix}`)).toBeInTheDocument()
    })

    test('有 children 时展示中间文案', () => {
      render(<Divider>中间文案</Divider>)
      expect(screen.getByText('中间文案')).toBeInTheDocument()
      expect(document.querySelector(`.${prefix}-text`)).toHaveTextContent('中间文案')
    })
  })

  describe('方向与结构', () => {
    test('vertical=true 时渲染为竖线 span', () => {
      const { container } = render(<Divider vertical />)
      expect(container.querySelector(`.${prefix}`)).toBeNull()
      const span = container.querySelector(`.${prefix}-vertical`)
      expect(span).toBeInTheDocument()
      expect(span?.tagName).toBe('SPAN')
    })

    test('vertical=false 时根为水平 div', () => {
      const { container } = render(<Divider vertical={false} />)
      const root = container.querySelector(`.${prefix}`)
      expect(root).toBeInTheDocument()
      expect(root?.tagName).toBe('DIV')
      expect(root).not.toHaveClass(`${prefix}-vertical`)
    })

    test('垂直模式下不渲染 children 文本', () => {
      const { container } = render(<Divider vertical>不应出现</Divider>)
      expect(screen.queryByText('不应出现')).toBeNull()
      expect(container.querySelector(`.${prefix}-text`)).toBeNull()
    })
  })

  describe('children 与 run', () => {
    test('children 为函数时执行并展示返回值', () => {
      render(<Divider>{() => '函数子节点'}</Divider>)
      expect(screen.getByText('函数子节点')).toBeInTheDocument()
    })
  })

  describe('className 与属性透传', () => {
    test('水平模式 className 合并', () => {
      const { container } = render(<Divider className="sep" />)
      expect(container.querySelector(`.${prefix}`)).toHaveClass('sep')
    })

    test('竖线模式 className 合并', () => {
      const { container } = render(<Divider vertical className="vsep" />)
      expect(container.querySelector(`.${prefix}-vertical`)).toHaveClass('vsep')
    })

    test('data-* 等属性透传到根节点', () => {
      const { container } = render(<Divider data-testid="div-line" role="separator" />)
      const root = container.querySelector('[data-testid="div-line"]')
      expect(root).toHaveClass(prefix)
      expect(root).toHaveAttribute('role', 'separator')
    })
  })

  describe('边界', () => {
    test('无 children 时不渲染 exd-divider-text', () => {
      const { container } = render(<Divider />)
      expect(container.querySelector(`.${prefix}-text`)).toBeNull()
    })

    test('children 为 null 时不渲染文本节点', () => {
      const { container } = render(<Divider>{null}</Divider>)
      expect(container.querySelector(`.${prefix}-text`)).toBeNull()
    })

    test('children 为 false 时不渲染文本节点', () => {
      const { container } = render(<Divider>{false}</Divider>)
      expect(container.querySelector(`.${prefix}-text`)).toBeNull()
    })
  })

  describe('ref', () => {
    test('水平模式 ref 指向根 div', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<Divider ref={ref} />)
      expect(ref.current?.tagName).toBe('DIV')
      expect(ref.current?.classList.contains(prefix)).toBe(true)
    })

    test('垂直模式 ref 指向 span', () => {
      const ref = React.createRef<HTMLSpanElement>()
      render(<Divider vertical ref={ref} />)
      expect(ref.current?.tagName).toBe('SPAN')
      expect(ref.current?.classList.contains(`${prefix}-vertical`)).toBe(true)
    })
  })
})
