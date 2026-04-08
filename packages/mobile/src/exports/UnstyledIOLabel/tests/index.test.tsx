import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import UnstyledIOLabel from '..'

describe('UnstyledIOLabel', () => {
  test('默认渲染不崩溃', () => {
    const { container } = render(<UnstyledIOLabel />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('classNamePrefix 正确应用', () => {
    const { container } = render(<UnstyledIOLabel />)
    expect(container.querySelector('[class*="exd-io-label"]')).toBeInTheDocument()
  })

  test('自定义 className 透传', () => {
    const { container } = render(<UnstyledIOLabel className="my-custom" />)
    expect(container.querySelector('.my-custom')).toBeInTheDocument()
  })

  test('focused 且 hideErrorWhenFocusing 时忽略 error', () => {
    const { container } = render(<UnstyledIOLabel focused hideErrorWhenFocusing error="e1" helper="h" />)
    expect(container.querySelector('[class*="exd-io-label"]')).toBeInTheDocument()
  })

  test('error 为字符串时作为 helper 展示', () => {
    const { container } = render(<UnstyledIOLabel error="校验失败" />)
    expect(container.textContent).toContain('校验失败')
  })

  test('error 为 React 元素时作为 helper 展示', () => {
    const { container } = render(<UnstyledIOLabel error={<span>节点错误</span>} />)
    expect(container.textContent).toContain('节点错误')
  })

  test('disabled 时展示禁用样式类', () => {
    const { container } = render(<UnstyledIOLabel disabled />)
    expect(container.querySelector('.exd-io-label__label--disabled')).toBeInTheDocument()
  })

  test('prefix 与 children 可渲染', () => {
    const { getByText } = render(<UnstyledIOLabel prefix={() => '前缀'}>{() => '内容'}</UnstyledIOLabel>)
    expect(getByText('前缀')).toBeInTheDocument()
    expect(getByText('内容')).toBeInTheDocument()
  })
})
