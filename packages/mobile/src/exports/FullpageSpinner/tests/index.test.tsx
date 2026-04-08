import React from 'react'
import { render } from '@testing-library/react'
import FullpageSpinner from '..'

describe('FullpageSpinner', () => {
  describe('L1 冒烟', () => {
    test('默认渲染不崩溃且包含全屏容器', () => {
      const { container } = render(<FullpageSpinner />)
      expect(container.querySelector('.exd-spin-fullpage')).toBeInTheDocument()
    })
  })

  describe('L2 属性逐项', () => {
    test('className 合并到根节点', () => {
      const { container } = render(<FullpageSpinner className="page-loading" />)
      const root = container.querySelector('.exd-spin-fullpage')
      expect(root).toHaveClass('page-loading')
    })
  })
})
