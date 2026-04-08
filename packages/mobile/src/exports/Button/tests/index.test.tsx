import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '..'

const prefix = 'exd-btn'

describe('Button', () => {
  // L1 冒烟
  test('默认渲染不崩溃', () => {
    const { container } = render(<Button>按钮</Button>)
    expect(container.querySelector(`.${prefix}`)).toBeInTheDocument()
    expect(screen.getByText('按钮')).toBeInTheDocument()
  })

  // L2 Prop 逐项 — type
  describe('type 枚举', () => {
    const types = ['plain', 'primary', 'info', 'success', 'warning', 'danger'] as const
    types.forEach((type) => {
      test(`type="${type}" 渲染对应 class`, () => {
        const { container } = render(<Button type={type}>按钮</Button>)
        expect(container.querySelector(`.${prefix}`)).toHaveClass(`${prefix}-${type}`)
      })
    })

    test('默认 type 为 plain', () => {
      const { container } = render(<Button>按钮</Button>)
      expect(container.querySelector(`.${prefix}`)).toHaveClass(`${prefix}-plain`)
    })
  })

  // L2 — size
  describe('size 枚举', () => {
    const sizes = ['large', 'normal', 'small', 'mini'] as const
    sizes.forEach((size) => {
      test(`size="${size}" 渲染对应 class`, () => {
        const { container } = render(<Button size={size}>按钮</Button>)
        expect(container.querySelector(`.${prefix}`)).toHaveClass(`${prefix}-${size}`)
      })
    })

    test('默认 size 为 normal', () => {
      const { container } = render(<Button>按钮</Button>)
      expect(container.querySelector(`.${prefix}`)).toHaveClass(`${prefix}-normal`)
    })
  })

  // L2 — shape
  describe('shape 枚举', () => {
    const shapes = ['square', 'round', 'unset'] as const
    shapes.forEach((shape) => {
      test(`shape="${shape}" 渲染对应 class`, () => {
        const { container } = render(<Button shape={shape}>按钮</Button>)
        expect(container.querySelector(`.${prefix}`)).toHaveClass(`${prefix}-${shape}`)
      })
    })

    test('默认 shape 为 square', () => {
      const { container } = render(<Button>按钮</Button>)
      expect(container.querySelector(`.${prefix}`)).toHaveClass(`${prefix}-square`)
    })
  })

  // L2 — fill
  describe('fill 枚举', () => {
    const fills = ['solid', 'outline', 'none'] as const
    fills.forEach((fill) => {
      test(`fill="${fill}" 渲染对应 class`, () => {
        const { container } = render(<Button fill={fill}>按钮</Button>)
        expect(container.querySelector(`.${prefix}`)).toHaveClass(`${prefix}-fill-${fill}`)
      })
    })

    test('默认 fill 为 solid', () => {
      const { container } = render(<Button>按钮</Button>)
      expect(container.querySelector(`.${prefix}`)).toHaveClass(`${prefix}-fill-solid`)
    })
  })

  // L2 — block
  describe('block 属性', () => {
    test('默认不含 block class', () => {
      const { container } = render(<Button>按钮</Button>)
      expect(container.querySelector(`.${prefix}`)).not.toHaveClass(`${prefix}-block`)
    })

    test('block=true 添加 block class', () => {
      const { container } = render(<Button block>按钮</Button>)
      expect(container.querySelector(`.${prefix}`)).toHaveClass(`${prefix}-block`)
    })
  })

  // L2 — disabled
  describe('disabled 属性', () => {
    test('默认不含 disabled class', () => {
      const { container } = render(<Button>按钮</Button>)
      expect(container.querySelector(`.${prefix}`)).not.toHaveClass(`${prefix}-disabled`)
    })

    test('disabled=true 添加 disabled class', () => {
      const { container } = render(<Button disabled>按钮</Button>)
      expect(container.querySelector(`.${prefix}`)).toHaveClass(`${prefix}-disabled`)
    })
  })

  // L2 — as
  test('as="a" 渲染为 a 标签', () => {
    const { container } = render(<Button as="a">链接</Button>)
    expect(container.querySelector('a')).toBeInTheDocument()
    expect(container.querySelector('button')).not.toBeInTheDocument()
  })

  // L2 — ref
  test('ref 正确转发到 DOM 元素', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>按钮</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  // L2 — icon + iconPosition
  describe('icon 属性', () => {
    test('icon 渲染在内容左侧（默认 iconPosition）', () => {
      const { container } = render(<Button icon={<span data-testid="ico">★</span>}>文字</Button>)
      expect(container.querySelector('[data-testid="ico"]')).toBeInTheDocument()
      const containerEl = container.querySelector(`.${prefix}-container`)!
      const children = Array.from(containerEl.children)
      const iconIdx = children.findIndex((el) => el.querySelector('[data-testid="ico"]'))
      const textIdx = children.findIndex((el) => el.textContent === '文字')
      expect(iconIdx).toBeLessThan(textIdx)
    })

    test('iconPosition="right" 时 icon 在文字右侧', () => {
      const { container } = render(
        <Button icon={<span data-testid="ico">★</span>} iconPosition="right">
          文字
        </Button>,
      )
      const containerEl = container.querySelector(`.${prefix}-container`)!
      const children = Array.from(containerEl.children)
      const iconIdx = children.findIndex((el) => el.querySelector('[data-testid="ico"]'))
      const textIdx = children.findIndex((el) => el.textContent === '文字')
      expect(iconIdx).toBeGreaterThan(textIdx)
    })
  })

  // L3 事件
  describe('onClick 回调', () => {
    test('点击触发 onClick', async () => {
      const user = userEvent.setup()
      const onClick = jest.fn()
      render(<Button onClick={onClick}>按钮</Button>)
      await user.click(screen.getByRole('button'))
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    test('disabled 时点击不触发 onClick', async () => {
      const user = userEvent.setup()
      const onClick = jest.fn()
      render(
        <Button disabled onClick={onClick}>
          按钮
        </Button>,
      )
      await user.click(screen.getByText('按钮'))
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  // L3 — loading 场景
  describe('loading 属性', () => {
    test('loading=true 时显示 Spinner 并阻止点击', async () => {
      const user = userEvent.setup()
      const onClick = jest.fn()
      const { container } = render(
        <Button loading onClick={onClick}>
          按钮
        </Button>,
      )
      const btn = container.querySelector(`.${prefix}`)!
      expect(btn).toHaveClass(`${prefix}-disabled`)
      expect(btn.querySelector('.exd-spin')).toBeInTheDocument()
      await user.click(screen.getByText('按钮'))
      expect(onClick).not.toHaveBeenCalled()
    })

    test('loading=false 时不显示 Spinner 且可正常点击', async () => {
      const user = userEvent.setup()
      const onClick = jest.fn()
      const { container } = render(
        <Button loading={false} onClick={onClick}>
          按钮
        </Button>,
      )
      const btn = container.querySelector(`.${prefix}`)!
      expect(btn).not.toHaveClass(`${prefix}-disabled`)
      expect(btn.querySelector('.exd-spin')).not.toBeInTheDocument()
      await user.click(screen.getByRole('button'))
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    test('loading="auto" 时 onClick 返回 Promise 期间自动进入 loading', async () => {
      let resolveClick: () => void
      const clickPromise = new Promise<void>((resolve) => {
        resolveClick = resolve
      })
      const onClick = jest.fn(() => clickPromise)

      const { container } = render(
        <Button loading="auto" onClick={onClick}>
          按钮
        </Button>,
      )
      const btn = container.querySelector(`.${prefix}`)!

      expect(btn).not.toHaveClass(`${prefix}-disabled`)
      expect(btn.querySelector('.exd-spin')).not.toBeInTheDocument()

      const user = userEvent.setup()
      await user.click(screen.getByRole('button'))
      expect(onClick).toHaveBeenCalledTimes(1)

      await waitFor(() => {
        expect(btn).toHaveClass(`${prefix}-disabled`)
        expect(btn.querySelector('.exd-spin')).toBeInTheDocument()
      })

      resolveClick!()

      await waitFor(() => {
        expect(btn).not.toHaveClass(`${prefix}-disabled`)
        expect(btn.querySelector('.exd-spin')).not.toBeInTheDocument()
      })
    })
  })

  // L6 边界
  test('children 为空时不崩溃', () => {
    expect(() => render(<Button />)).not.toThrow()
  })
})
