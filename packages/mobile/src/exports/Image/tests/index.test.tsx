import React from 'react'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Image, { prefix } from '..'

/** 源码中 scroll 监听使用 throttle；测试中改为同步执行以稳定触发懒加载逻辑 */
jest.mock('@fexd/tools', () => {
  const actual = jest.requireActual('@fexd/tools') as Record<string, unknown>
  return {
    ...actual,
    throttle: (fn: (...args: unknown[]) => void) => fn,
  }
})

/** jsdom 下滚动父节点推断不稳定：固定为 documentElement，便于 fireEvent.scroll 触发监听 */
jest.mock('../utils', () => {
  const actual = jest.requireActual('../utils') as typeof import('../utils')
  return {
    ...actual,
    findScrollParent: jest.fn(() => document.documentElement),
  }
})

describe('Image', () => {
  describe('基础渲染与导出', () => {
    test('挂载后存在 img 且带组件类名前缀', () => {
      const { container } = render(<Image src="https://example.com/a.png" />)
      const img = container.querySelector('img')
      expect(img).toBeInTheDocument()
      expect(img).toHaveClass(prefix)
    })

    test('命名导出 prefix 与样式一致', () => {
      expect(prefix).toBe('exd-image')
    })
  })

  describe('加载成功 / 失败', () => {
    test('onLoad 触发后图片 display 为 block', () => {
      const onLoad = jest.fn()
      const { container } = render(<Image src="https://example.com/ok.png" onLoad={onLoad} />)
      const img = container.querySelector('img') as HTMLImageElement
      fireEvent.load(img)
      expect(onLoad).toHaveBeenCalledTimes(1)
      expect(img).toHaveStyle({ display: 'block' })
    })

    test('onError 时展示默认失败占位并调用 onError', () => {
      const onError = jest.fn()
      const { container } = render(<Image src="https://example.com/bad.png" onError={onError} />)
      const img = container.querySelector('img') as HTMLImageElement
      fireEvent.error(img)
      expect(onError).toHaveBeenCalledTimes(1)
      expect(container.querySelector('img')).not.toBeInTheDocument()
      expect(screen.getByText('加载失败')).toBeInTheDocument()
    })

    test('自定义 fallback 与 placeholder', () => {
      const { container, rerender } = render(
        <Image
          src="https://example.com/x.png"
          lazy
          fallback={<div data-testid="fb">失败 UI</div>}
          placeholder={<div data-testid="ph">加载 UI</div>}
        />,
      )
      expect(screen.getByTestId('ph')).toBeInTheDocument()
      const img = container.querySelector('img') as HTMLImageElement
      fireEvent.error(img)
      expect(screen.getByTestId('fb')).toBeInTheDocument()
      expect(screen.queryByTestId('ph')).not.toBeInTheDocument()

      rerender(
        <Image
          src="https://example.com/y.png"
          lazy
          fallback={<div data-testid="fb2">f2</div>}
          placeholder={<div data-testid="ph2">p2</div>}
        />,
      )
      expect(screen.getByTestId('ph2')).toBeInTheDocument()
      const img2 = container.querySelector('img') as HTMLImageElement
      fireEvent.load(img2)
      expect(screen.queryByTestId('ph2')).not.toBeInTheDocument()
    })
  })

  describe('非懒加载', () => {
    test('lazy 为 false 时不展示占位节点', () => {
      const { container } = render(
        <Image src="https://example.com/n.png" lazy={false} placeholder={<span>不应出现</span>} />,
      )
      expect(screen.queryByText('不应出现')).not.toBeInTheDocument()
      const img = container.querySelector('img') as HTMLImageElement
      expect(img.src).toContain('n.png')
    })
  })

  describe('交互与 ref', () => {
    test('onClick 在 img 上触发', async () => {
      const user = userEvent.setup()
      const onClick = jest.fn()
      const { container } = render(<Image src="https://example.com/c.png" onClick={onClick} />)
      const img = container.querySelector('img') as HTMLImageElement
      fireEvent.load(img)
      await user.click(img)
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    test('ref 与 useImperativeHandle 暴露的内部 ref 对象一致，其 current 为 img', () => {
      const ref = React.createRef<{ current: HTMLImageElement | null }>()
      const { container } = render(
        <Image ref={ref as unknown as React.Ref<HTMLImageElement>} src="https://example.com/r.png" />,
      )
      const img = container.querySelector('img')
      expect(ref.current?.current).toBe(img)
    })
  })

  describe('比例 proportion', () => {
    test('加载完成后按 proportion 设置高度', () => {
      const { container } = render(<Image src="https://example.com/p.png" proportion="2:1" width={200} height="auto" />)
      const img = container.querySelector('img') as HTMLImageElement
      Object.defineProperty(img, 'clientWidth', { configurable: true, value: 100 })
      fireEvent.load(img)
      expect(img.style.height).toBe('50px')
    })

    test('proportion 格式非法时不改高度', () => {
      const { container } = render(<Image src="https://example.com/p2.png" proportion="16-9" width={100} />)
      const img = container.querySelector('img') as HTMLImageElement
      Object.defineProperty(img, 'clientWidth', { configurable: true, value: 100 })
      fireEvent.load(img)
      expect(img.style.height).toBe('')
    })
  })

  describe('src 切换重置状态', () => {
    test('更换 src 后重新走加载流程', () => {
      const { container, rerender } = render(<Image src="https://example.com/a.png" />)
      const img = container.querySelector('img') as HTMLImageElement
      fireEvent.load(img)
      expect(img).toHaveStyle({ display: 'block' })

      rerender(<Image src="https://example.com/b.png" />)
      const img2 = container.querySelector('img') as HTMLImageElement
      expect(img2).toHaveStyle({ display: 'none' })
      fireEvent.load(img2)
      expect(img2).toHaveStyle({ display: 'block' })
    })
  })

  describe('懒加载与滚动', () => {
    test('懒加载初始不设置 src，滚动进入视口后设置 src', async () => {
      const viewH = 500
      Object.defineProperty(document.documentElement, 'clientHeight', {
        configurable: true,
        value: viewH,
      })

      const rectBelow = {
        top: 800,
        left: 0,
        right: 100,
        bottom: 900,
        width: 100,
        height: 100,
        x: 0,
        y: 800,
        toJSON: () => {},
      }
      const rectInside = {
        top: 100,
        left: 0,
        right: 100,
        bottom: 200,
        width: 100,
        height: 100,
        x: 0,
        y: 100,
        toJSON: () => {},
      }
      const spy = jest.spyOn(HTMLImageElement.prototype, 'getBoundingClientRect').mockReturnValue(rectBelow as DOMRect)

      const { container } = render(
        <div>
          <Image lazy src="https://example.com/lazy.png" placeholder={<span data-testid="lazy-ph">等</span>} />
        </div>,
      )

      const img = container.querySelector('img') as HTMLImageElement
      expect(img.getAttribute('src')).toBeFalsy()

      spy.mockReturnValue(rectInside as DOMRect)
      await act(async () => {
        fireEvent.scroll(document.documentElement)
      })

      await waitFor(() => {
        expect(img.src).toContain('lazy.png')
      })

      await act(async () => {
        fireEvent.scroll(document.documentElement)
      })

      spy.mockRestore()
    })
  })

  describe('无 src', () => {
    test('src 为空字符串时不崩溃', () => {
      const { container } = render(<Image src={'' as unknown as string} />)
      expect(container.querySelector('img')).toBeInTheDocument()
    })
  })

  describe('样式合并', () => {
    test('width、height、className、style 应用到 img', () => {
      const { container } = render(
        <Image src="https://example.com/s.png" className="pic" style={{ borderRadius: 4 }} width={120} height={80} />,
      )
      const img = container.querySelector('img') as HTMLImageElement
      expect(img).toHaveClass('pic')
      expect(img).toHaveStyle({ width: '120px', height: '80px', borderRadius: '4px' })
    })
  })
})
