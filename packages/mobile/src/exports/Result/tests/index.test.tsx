import React from 'react'
import { render, screen } from '@testing-library/react'
import Result, { prefix } from '..'

describe('Result', () => {
  describe('冒烟', () => {
    test('无额外属性时渲染根容器', () => {
      const { container } = render(<Result />)
      expect(container.querySelector(`.${prefix}`)).toBeInTheDocument()
    })
  })

  describe('status 与内置图标', () => {
    test.each([
      ['success', `${prefix}-success`],
      ['warning', `${prefix}-warning`],
      ['error', `${prefix}-error`],
      ['info', `${prefix}-info`],
    ] as const)('status=%s 时根带状态类并展示图标区', (status, cls) => {
      const { container } = render(<Result status={status} />)
      const root = container.querySelector(`.${prefix}`)
      expect(root).toHaveClass(cls)
      expect(container.querySelector(`.${prefix}-icon`)).toBeInTheDocument()
    })

    test('未传 status 时根节点无状态修饰类', () => {
      const { container } = render(<Result />)
      const root = container.querySelector(`.${prefix}`)
      expect(root).not.toHaveClass(`${prefix}-success`)
      expect(root).not.toHaveClass(`${prefix}-error`)
    })
  })

  describe('自定义 icon', () => {
    test('传入 icon 时优先使用自定义图标', () => {
      render(<Result status="success" icon={<span data-testid="custom">自定义</span>} title="t" />)
      expect(screen.getByTestId('custom')).toBeInTheDocument()
    })

    test('仅 icon 无 status 时仍展示图标', () => {
      const { container } = render(<Result icon={<i data-testid="only" />} />)
      expect(screen.getByTestId('only')).toBeInTheDocument()
      expect(container.querySelector(`.${prefix}-icon`)).toBeInTheDocument()
    })
  })

  describe('标题与描述', () => {
    test('title 渲染在标题区', () => {
      render(<Result title="标题文案" />)
      expect(document.querySelector(`.${prefix}-title`)).toHaveTextContent('标题文案')
    })

    test('description 渲染在描述区', () => {
      render(<Result description="描述文案" />)
      expect(document.querySelector(`.${prefix}-description`)).toHaveTextContent('描述文案')
    })

    test('title 与 description 均为节点', () => {
      render(<Result title={<b>粗标题</b>} description={<em>斜描述</em>} />)
      expect(screen.getByText('粗标题')).toBeInTheDocument()
      expect(screen.getByText('斜描述')).toBeInTheDocument()
    })
  })

  describe('children 与 className', () => {
    test('children 正常展示', () => {
      render(
        <Result>
          <button type="button">操作</button>
        </Result>,
      )
      expect(screen.getByRole('button', { name: '操作' })).toBeInTheDocument()
    })

    test('className 合并到根节点', () => {
      const { container } = render(<Result className="rs-extra" />)
      expect(container.querySelector(`.${prefix}`)).toHaveClass('rs-extra')
    })

    test('其余 div 属性透传', () => {
      render(<Result data-testid="res" aria-live="polite" />)
      expect(screen.getByTestId('res')).toHaveAttribute('aria-live', 'polite')
    })
  })

  describe('边界', () => {
    test('无 icon 且无 status 时不渲染图标容器', () => {
      const { container } = render(<Result title="仅标题" />)
      expect(container.querySelector(`.${prefix}-icon`)).toBeNull()
    })

    test('title 为空字符串时不渲染标题节点', () => {
      const { container } = render(<Result title="" />)
      expect(container.querySelector(`.${prefix}-title`)).toBeNull()
    })

    test('description 为空字符串时不渲染描述节点', () => {
      const { container } = render(<Result description="" />)
      expect(container.querySelector(`.${prefix}-description`)).toBeNull()
    })
  })
})
