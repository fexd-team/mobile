import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import UnstyledLabel from '..'

describe('UnstyledLabel', () => {
  test('默认渲染不崩溃', () => {
    const { container } = render(<UnstyledLabel />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('根节点样式前缀（exd-label）正确应用', () => {
    const { container } = render(<UnstyledLabel />)
    expect(container.querySelector('.exd-label')).toBeInTheDocument()
  })

  test('自定义 className 透传', () => {
    const { container } = render(<UnstyledLabel className="my-custom" />)
    expect(container.querySelector('.my-custom')).toBeInTheDocument()
  })
})
