import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Avatar, { prefix } from '..'

describe('Avatar', () => {
  describe('冒烟', () => {
    test('默认渲染根容器', () => {
      const { container } = render(<Avatar />)
      const root = container.firstChild as HTMLElement
      expect(root).toBeInTheDocument()
      expect(root).toHaveClass(prefix)
    })
  })

  describe('尺寸与形状', () => {
    test.each([
      ['small', `${prefix}-small`],
      ['normal', `${prefix}-normal`],
      ['large', `${prefix}-large`],
    ] as const)('size=%s 时带对应 class', (size, cls) => {
      const { container } = render(<Avatar size={size} />)
      expect(container.firstChild).toHaveClass(cls)
    })

    test.each([
      ['circle', `${prefix}-circle`],
      ['square', `${prefix}-square`],
    ] as const)('shape=%s 时带对应 class', (shape, cls) => {
      const { container } = render(<Avatar shape={shape} />)
      expect(container.firstChild).toHaveClass(cls)
    })

    test('非法 size 不附加尺寸修饰类', () => {
      const { container } = render(<Avatar size={'huge' as any} />)
      const root = container.firstChild as HTMLElement
      expect(root.className).not.toMatch(/exd-avatar-(small|normal|large)/)
    })

    test('非法 shape 不附加形状修饰类', () => {
      const { container } = render(<Avatar shape={'round' as any} />)
      const root = container.firstChild as HTMLElement
      expect(root.className).not.toMatch(/exd-avatar-(circle|square)/)
    })
  })

  describe('内容与展示优先级', () => {
    test('有 src 时渲染图片', () => {
      render(<Avatar src="https://example.com/a.png" />)
      const img = screen.getByRole('img', { name: '头像图片' })
      expect(img).toHaveAttribute('src', 'https://example.com/a.png')
    })

    test('无 src 有 alt 时展示首字符', () => {
      render(<Avatar alt="张三" />)
      expect(screen.getByText('张')).toBeInTheDocument()
    })

    test('无 src 无 alt 时渲染 children', () => {
      render(<Avatar>XY</Avatar>)
      expect(screen.getByText('XY')).toBeInTheDocument()
    })

    test('src 与 alt 同时存在时优先图片', () => {
      render(<Avatar src="https://example.com/a.png" alt="张" />)
      expect(screen.getByRole('img', { name: '头像图片' })).toBeInTheDocument()
      expect(screen.queryByText('张')).toBeNull()
    })
  })

  describe('样式与属性透传', () => {
    test('color 与 backgroundColor 合并到 style', () => {
      const { container } = render(<Avatar color="#abc" backgroundColor="#def" />)
      const root = container.firstChild as HTMLElement
      expect(root.style.color).toBe('rgb(170, 187, 204)')
      expect(root.style.backgroundColor).toBe('rgb(221, 238, 255)')
    })

    test('className 合并到根节点', () => {
      const { container } = render(<Avatar className="custom-avatar" />)
      expect(container.firstChild).toHaveClass('custom-avatar')
      expect(container.firstChild).toHaveClass(prefix)
    })

    test('额外 div 属性透传到根节点', () => {
      render(<Avatar data-testid="av" aria-label="用户" />)
      expect(screen.getByTestId('av')).toHaveAttribute('aria-label', '用户')
    })
  })

  describe('图片加载', () => {
    test('加载成功时触发 onLoad', () => {
      const onLoad = jest.fn()
      render(<Avatar src="https://example.com/a.png" onLoad={onLoad} />)
      fireEvent.load(screen.getByRole('img', { name: '头像图片' }))
      expect(onLoad).toHaveBeenCalled()
    })

    test('加载失败时进入 fallback、带 error 类并触发 onError', () => {
      const onError = jest.fn()
      const { container } = render(<Avatar src="https://invalid.invalid/bad.png" onError={onError} alt="备" />)
      const img = screen.getByRole('img', { name: '头像图片' })
      fireEvent.error(img)
      expect(onError).toHaveBeenCalled()
      expect(screen.queryByRole('img', { name: '头像图片' })).toBeNull()
      expect(screen.getByText('备')).toBeInTheDocument()
      expect(container.firstChild).toHaveClass(`${prefix}-error`)
    })
  })

  describe('边界', () => {
    test('无 src 无 alt 无 children 时内容为空', () => {
      const { container } = render(<Avatar />)
      const root = container.firstChild as HTMLElement
      expect(root).toBeInTheDocument()
      expect(root.textContent).toBe('')
    })

    test('children 为空字符串仍渲染', () => {
      render(<Avatar>{''}</Avatar>)
      expect(document.querySelector(`.${prefix}`)).toBeInTheDocument()
    })
  })
})
