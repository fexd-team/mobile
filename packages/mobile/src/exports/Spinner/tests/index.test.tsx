import React from 'react'
import { render, waitFor } from '@testing-library/react'
import Spinner from '..'

describe('Spinner', () => {
  describe('L1 冒烟', () => {
    test('默认立即展示加载图标', () => {
      const { container } = render(<Spinner />)
      expect(container.querySelector('.exd-spin')).toBeInTheDocument()
      expect(container.querySelector('.exd-spin-circle')).toBeInTheDocument()
    })
  })

  describe('L2 属性逐项', () => {
    test('className 合并到根 span', () => {
      const { container } = render(<Spinner className="spin-custom" />)
      expect(container.querySelector('.exd-spin')).toHaveClass('spin-custom')
    })

    test('style 可设置颜色（currentColor 链路）', () => {
      const { container } = render(<Spinner style={{ color: 'rgb(255, 0, 0)' }} />)
      expect(container.querySelector('.exd-spin')).toHaveStyle({ color: 'rgb(255, 0, 0)' })
    })

    test('style 可设置尺寸', () => {
      const { container } = render(<Spinner style={{ width: '20px', height: '20px' }} />)
      const root = container.querySelector('.exd-spin')
      expect(root).toHaveStyle({ width: '20px', height: '20px' })
    })
  })

  describe('L6 边界', () => {
    test('delay>0 时先不展示，延时后出现', async () => {
      const { container } = render(<Spinner delay={30} />)
      expect(container.querySelector('.exd-spin')).toBeNull()
      await waitFor(
        () => {
          expect(container.querySelector('.exd-spin')).toBeInTheDocument()
        },
        { timeout: 3000 },
      )
    })
  })
})
