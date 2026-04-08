import React from 'react'
import { render, screen } from '@testing-library/react'
import Badge, { prefix } from '..'

describe('Badge', () => {
  describe('冒烟', () => {
    test('仅传入 content 时渲染徽标数字', () => {
      render(<Badge content={3} />)
      expect(screen.getByText('3')).toBeInTheDocument()
    })
  })

  describe('视觉与类型', () => {
    test.each([
      ['primary', 'exd-badge-status-primary'],
      ['success', 'exd-badge-status-success'],
      ['warning', 'exd-badge-status-warning'],
      ['danger', 'exd-badge-status-danger'],
    ] as const)('type=%s 时根节点带对应状态类', (type, cls) => {
      const { container } = render(<Badge content={1} type={type} />)
      expect(container.querySelector(`.${cls}`)).toBeInTheDocument()
    })

    test('非法 type 不附加 status 修饰类', () => {
      const { container } = render(<Badge content={1} type={'other' as any} />)
      const el = container.querySelector(`.${prefix}`)
      expect(el).toBeInTheDocument()
      expect(el?.className).not.toMatch(/exd-badge-status-/)
    })

    test('color 与 bgColor 写入内联样式', () => {
      const { container } = render(<Badge content="!" color="#111" bgColor="#222" />)
      const el = container.querySelector(`.${prefix}`) as HTMLElement
      expect(el.style.color).toBe('rgb(17, 17, 17)')
      expect(el.style.backgroundColor).toBe('rgb(34, 34, 34)')
    })
  })

  describe('圆点模式', () => {
    test('dot=true 时带圆点类且不占数字', () => {
      const { container } = render(<Badge dot />)
      const badge = container.querySelector(`.${prefix}`)
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveClass(`${prefix}-dot`)
    })

    test('dot 与 children 组合时为 fixed 布局', () => {
      const { container } = render(
        <Badge dot>
          <span>铃铛</span>
        </Badge>,
      )
      expect(screen.getByText('铃铛')).toBeInTheDocument()
      expect(container.querySelector(`.${prefix}-fixed`)).toBeInTheDocument()
    })
  })

  describe('overflowCount', () => {
    test('数字大于 overflowCount 时显示 overflowCount+', () => {
      render(<Badge content={100} overflowCount={99} />)
      expect(screen.getByText('99+')).toBeInTheDocument()
    })

    test('未超出时不使用溢出文案', () => {
      render(<Badge content={50} overflowCount={99} />)
      expect(screen.getByText('50')).toBeInTheDocument()
      expect(screen.queryByText('99+')).toBeNull()
    })

    test('content 非数字时不走溢出逻辑', () => {
      render(<Badge content="many" overflowCount={9} />)
      expect(screen.getByText('many')).toBeInTheDocument()
    })

    test('overflowCount 非数字时不走溢出逻辑', () => {
      render(<Badge content={200} overflowCount={'x' as any} />)
      expect(screen.getByText('200')).toBeInTheDocument()
    })
  })

  describe('showZero 与数字 0', () => {
    test('showZero 为 false 且 content 为字符串 0 时内部文本为空', () => {
      const { container } = render(<Badge content="0" showZero={false} />)
      const el = container.querySelector(`.${prefix}`)
      expect(el).toBeInTheDocument()
      expect(el).toHaveTextContent('')
    })

    test('showZero 为 true 且 content 为数字字符串 0 时展示 0', () => {
      render(<Badge content="0" showZero />)
      expect(screen.getByText('0')).toBeInTheDocument()
    })
  })

  describe('offset', () => {
    test('offset 为二元数组时转为百分比 right/top', () => {
      const { container } = render(<Badge content={1} offset={[10, 20]} />)
      const badge = container.querySelector(`.${prefix}`) as HTMLElement
      expect(badge.style.right).toBe('10%')
      expect(badge.style.top).toBe('20%')
    })

    test('offset 元素为字符串数字时同样生效', () => {
      const { container } = render(<Badge content={1} offset={['5', '15'] as any} />)
      const badge = container.querySelector(`.${prefix}`) as HTMLElement
      expect(badge.style.right).toBe('5%')
      expect(badge.style.top).toBe('15%')
    })

    test('非数组或无 offset 时不写入定位', () => {
      const { container } = render(<Badge content={1} style={{ margin: 4 }} />)
      const badge = container.querySelector(`.${prefix}`) as HTMLElement
      expect(badge.style.right).toBe('')
      expect(badge.style.top).toBe('')
      expect(badge.style.margin).toBe('4px')
    })

    test('offset 含 NaN 时跳过对应轴', () => {
      const { container } = render(<Badge content={1} offset={['bad', 8] as any} />)
      const badge = container.querySelector(`.${prefix}`) as HTMLElement
      expect(badge.style.right).toBe('')
      expect(badge.style.top).toBe('8%')
    })
  })

  describe('显隐与结构', () => {
    test('visible=false 时徽标带 hidden 类', () => {
      const { container } = render(<Badge content={1} visible={false} />)
      expect(container.querySelector(`.${prefix}-hidden`)).toBeInTheDocument()
    })

    test('无 dot 无 content 时不渲染徽标节点', () => {
      const { container } = render(
        <Badge>
          <span>仅子元素</span>
        </Badge>,
      )
      expect(screen.getByText('仅子元素')).toBeInTheDocument()
      expect(container.querySelector(`.${prefix}`)).toBeNull()
    })

    test('有 children 时用 wrap 包裹并保留徽标', () => {
      render(
        <Badge content={5}>
          <span>消息</span>
        </Badge>,
      )
      expect(screen.getByText('消息')).toBeInTheDocument()
      expect(document.querySelector(`.${prefix}-wrap`)).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    test('无 children 时独立渲染徽标', () => {
      const { container } = render(<Badge content="x" />)
      expect(container.querySelector(`.${prefix}-wrap`)).toBeNull()
      expect(screen.getByText('x')).toBeInTheDocument()
    })
  })

  describe('className 透传', () => {
    test('className 合并到徽标节点', () => {
      const { container } = render(<Badge content={2} className="my-badge" />)
      expect(container.querySelector('.my-badge')).toBeInTheDocument()
    })
  })

  describe('边界', () => {
    test('content 为 null 且无 dot 时不渲染徽标元素', () => {
      const { container } = render(<Badge content={null as any} />)
      expect(container.querySelector(`.${prefix}`)).toBeNull()
    })

    test('children 为空白 span 时仍包一层 wrap', () => {
      const { container } = render(
        <Badge content={1}>
          <span />
        </Badge>,
      )
      expect(container.querySelector(`.${prefix}-wrap`)).toBeInTheDocument()
    })
  })
})
