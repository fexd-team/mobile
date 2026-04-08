import React from 'react'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Alert, { prefix } from '..'

describe('Alert', () => {
  afterEach(() => {
    cleanup()
    document.body.innerHTML = ''
  })

  describe('冒烟与结构', () => {
    test('无额外 props 时渲染 children', () => {
      render(<Alert>提示内容</Alert>)
      expect(screen.getByText('提示内容')).toBeInTheDocument()
      expect(document.querySelector('.exd-alert')).toBeInTheDocument()
    })

    test('导出 prefix 常量', () => {
      expect(prefix).toBe('exd-alert')
    })
  })

  describe('type 与样式类', () => {
    test.each([
      ['success', 'exd-alert-success'],
      ['warning', 'exd-alert-warning'],
      ['info', 'exd-alert-info'],
      ['error', 'exd-alert-error'],
    ] as const)('type=%s 时根节点带 %s', (type, cls) => {
      const { container } = render(<Alert type={type}>{type}</Alert>)
      expect(container.querySelector('.exd-alert')).toHaveClass(cls)
    })
  })

  describe('variant 与 className', () => {
    test('variant=outlined / filled 时附加对应修饰类', () => {
      const { container, rerender } = render(<Alert variant="outlined">o</Alert>)
      expect(container.querySelector('.exd-alert')).toHaveClass('exd-alert-outlined')
      rerender(<Alert variant="filled">f</Alert>)
      expect(container.querySelector('.exd-alert')).toHaveClass('exd-alert-filled')
    })

    test('className 合并到根节点', () => {
      const { container } = render(<Alert className="al-c">m</Alert>)
      expect(container.querySelector('.exd-alert')).toHaveClass('al-c')
    })
  })

  describe('图标', () => {
    test('showIcon=false 时图标容器内无 svg', () => {
      const { container } = render(
        <Alert showIcon={false} type="info">
          无图标
        </Alert>,
      )
      expect(container.querySelector('.exd-alert-icon')?.querySelector('svg')).toBeNull()
    })

    test('传入 icon 时优先渲染自定义图标', () => {
      const { container } = render(
        <Alert icon={<span data-testid="custom-icon">★</span>} type="info">
          自定义
        </Alert>,
      )
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
      expect(container.querySelector('.exd-alert-icon')).toContainElement(screen.getByTestId('custom-icon'))
    })
  })

  describe('标题与可关闭', () => {
    test('title 存在时渲染标题区并带 has-title 类', () => {
      const { container } = render(<Alert title="标题">正文</Alert>)
      expect(screen.getByText('标题')).toBeInTheDocument()
      expect(container.querySelector('.exd-alert')).toHaveClass('exd-alert-has-title')
    })

    test('closable 时关闭区展示默认图标，点击触发 onClose 并退场', async () => {
      const user = userEvent.setup()
      const onClose = jest.fn()
      const { container } = render(
        <Alert closable onClose={onClose}>
          可关
        </Alert>,
      )
      const close = container.querySelector('.exd-alert-close')
      expect(close).toBeInTheDocument()
      expect(close?.querySelector('svg')).toBeInTheDocument()
      await user.click(close!)
      await waitFor(() => {
        expect(onClose).toHaveBeenCalledTimes(1)
      })
    })

    test('closable 且 closeText 时使用自定义关闭内容', () => {
      const { container } = render(
        <Alert closable closeText={<span data-testid="ct">关闭</span>}>
          x
        </Alert>,
      )
      expect(screen.getByTestId('ct')).toBeInTheDocument()
      expect(container.querySelector('.exd-alert-close svg')).toBeNull()
    })

    test('closable=false 时关闭区无关闭可视内容', () => {
      const { container } = render(<Alert closable={false}>x</Alert>)
      const close = container.querySelector('.exd-alert-close')
      expect(close?.querySelector('svg')).toBeNull()
      expect(close?.textContent).toBe('')
    })

    test('点击关闭区在未传入 onClose 时不抛错', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <Alert closable type="info">
          无回调
        </Alert>,
      )
      await expect(user.click(container.querySelector('.exd-alert-close')!)).resolves.toBeUndefined()
    })
  })
})
