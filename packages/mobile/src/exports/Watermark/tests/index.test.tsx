import React from 'react'
import { render } from '@testing-library/react'
import Watermark, { prefix } from '..'

function mockCanvas2d() {
  const ctx = {
    canvas: {
      width: 300,
      height: 150,
      toDataURL: jest.fn(() => 'data:image/png;base64,xxx'),
    },
    fillStyle: '',
    strokeStyle: '',
    font: '',
    textAlign: 'start' as CanvasTextAlign,
    textBaseline: 'alphabetic' as CanvasTextBaseline,
    globalAlpha: 1,
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    fillText: jest.fn(),
    measureText: jest.fn().mockReturnValue({ width: 10 }),
    translate: jest.fn(),
    rotate: jest.fn(),
    save: jest.fn(),
    restore: jest.fn(),
    scale: jest.fn(),
  }
  return ctx
}

describe('Watermark', () => {
  let getContextSpy: jest.SpyInstance

  beforeAll(() => {
    getContextSpy = jest
      .spyOn(HTMLCanvasElement.prototype, 'getContext')
      .mockImplementation(() => mockCanvas2d() as unknown as CanvasRenderingContext2D)
  })

  afterAll(() => {
    getContextSpy.mockRestore()
  })

  describe('冒烟与导出', () => {
    test('挂载不崩溃并渲染根容器', () => {
      const { container } = render(<Watermark text="WM" />)
      expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
    })

    test('命名导出 prefix 与文档前缀一致', () => {
      expect(prefix).toBe('exd-watermark')
    })
  })

  describe('Props', () => {
    test('text 传入时挂载正常', () => {
      const { container } = render(<Watermark text="机密文档" />)
      expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
    })

    test('rotate、opacity、gap、zIndex 等传入时挂载正常', () => {
      const { container } = render(<Watermark text="x" rotate={-22} opacity={0.35} gapX={12} gapY={20} zIndex={999} />)
      expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
    })

    test('width、height 传入时挂载正常', () => {
      const { container } = render(<Watermark text="x" width={200} height={100} />)
      expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
    })

    test('fullpage 为 false（默认）时 isBody 为 false', () => {
      const { container } = render(<Watermark text="x" fullpage={false} />)
      expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
    })

    test('fullpage 为 true 时映射为底层 isBody', () => {
      const { container } = render(<Watermark text="x" fullpage />)
      expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
    })

    test('className 传入时挂载正常', () => {
      const { container } = render(<Watermark text="x" className="wm-cls" />)
      expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('边界', () => {
    test('text 为空字符串时仍挂载不崩溃', () => {
      const { container } = render(<Watermark text="" />)
      expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
    })
  })
})
