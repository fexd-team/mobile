import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Cell from '..'

describe('Cell', () => {
  describe('L1 冒烟', () => {
    test('默认渲染不崩溃', () => {
      const { container } = render(<Cell />)
      expect(container.querySelector('.exd-cell')).toBeInTheDocument()
    })

    test('仅 children 时展示为值区内容', () => {
      render(<Cell>正文</Cell>)
      expect(screen.getByText('正文')).toBeInTheDocument()
      expect(document.querySelector('.exd-cell-value-content')).toHaveTextContent('正文')
    })
  })

  describe('L2 属性逐项', () => {
    test('title 渲染标题区域', () => {
      const { container } = render(<Cell title="标题行" />)
      const title = container.querySelector('.exd-cell-title')
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('标题行')
    })

    test('description 渲染描述', () => {
      const { container } = render(<Cell title="主" description="副文案" />)
      const desc = container.querySelector('.exd-cell-description')
      expect(desc).toBeInTheDocument()
      expect(desc).toHaveTextContent('副文案')
    })

    test('prefix 渲染前缀区', () => {
      const { container } = render(<Cell title="主" prefix={<span data-testid="pre">图标</span>} />)
      expect(container.querySelector('[data-testid="pre"]')).toBeInTheDocument()
      expect(container.querySelector('.exd-cell-prefix')).toBeInTheDocument()
    })

    test('有 onClick 时展示箭头且可点击态', () => {
      const { container } = render(<Cell title="行" onClick={() => {}} />)
      expect(container.querySelector('.exd-cell')).toHaveClass('exd-cell-tapable')
      expect(container.querySelector('.exd-cell-arrow')).toBeInTheDocument()
    })

    test('无 onClick 时不展示箭头', () => {
      const { container } = render(<Cell title="行" />)
      expect(container.querySelector('.exd-cell')).not.toHaveClass('exd-cell-tapable')
      expect(container.querySelector('.exd-cell-arrow')).toBeNull()
    })

    test('loading=true 时展示加载占位而非箭头', () => {
      const { container } = render(<Cell title="行" onClick={() => {}} loading />)
      expect(container.querySelector('.exd-cell-loading')).toBeInTheDocument()
      expect(container.querySelector('.exd-cell-arrow')).toBeNull()
    })

    test('border=false 不出现默认边框类', () => {
      const { container } = render(<Cell title="行" border={false} />)
      expect(container.querySelector('.exd-cell')).not.toHaveClass('exd-cell-border')
    })

    test('border=always 使用始终边框类', () => {
      const { container } = render(<Cell title="行" border="always" />)
      expect(container.querySelector('.exd-cell')).toHaveClass('exd-cell-border-always')
    })

    test('size=small 应用尺寸类名', () => {
      const { container } = render(<Cell title="行" size="small" />)
      expect(container.querySelector('.exd-cell')).toHaveClass('exd-cell-small')
    })

    test('suffix 自定义后缀', () => {
      const { container } = render(<Cell title="行" suffix={<span data-testid="suf">尾</span>} />)
      expect(container.querySelector('[data-testid="suf"]')).toBeInTheDocument()
    })

    test('value 与 children 同时存在时 children 优先', () => {
      render(<Cell value="prop值">子内容</Cell>)
      expect(screen.getByText('子内容')).toBeInTheDocument()
      expect(screen.queryByText('prop值')).toBeNull()
    })

    test('className 合并至根节点', () => {
      const { container } = render(<Cell className="mine" title="t" />)
      expect(container.querySelector('.exd-cell')).toHaveClass('mine')
    })
  })

  describe('L3 事件', () => {
    test('点击触发 onClick', () => {
      const onClick = jest.fn()
      const { container } = render(<Cell title="行" onClick={onClick} />)
      fireEvent.click(container.querySelector('.exd-cell')!)
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('L6 边界与空属性', () => {
    test('无任何内容时仍渲染根容器', () => {
      const { container } = render(<Cell />)
      const root = container.querySelector('.exd-cell')
      expect(root).toBeInTheDocument()
      expect(root?.querySelector('.exd-cell-label')).toBeNull()
      expect(root?.querySelector('.exd-cell-value')).toBeNull()
    })

    test('title 与 value 均为空时无文案节点', () => {
      const { container } = render(<Cell title="" value="" />)
      expect(container.querySelector('.exd-cell-title')).toBeNull()
      expect(container.querySelector('.exd-cell-value-content')).toBeNull()
    })
  })

  describe('ref', () => {
    test('ref 指向根 div', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<Cell ref={ref} title="行" />)
      expect(ref.current?.tagName).toBe('DIV')
      expect(ref.current?.classList.contains('exd-cell')).toBe(true)
    })
  })
})
