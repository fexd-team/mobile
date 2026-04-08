import React from 'react'
import { render } from '@testing-library/react'
import Cascader, { prefix } from '..'

describe('Cascader', () => {
  test('默认渲染不崩溃', () => {
    const { container } = render(<Cascader />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('渲染文本内容 Cascader', () => {
    const { container } = render(<Cascader />)
    expect(container.textContent).toContain('Cascader')
  })

  test('prefix 导出正确', () => {
    expect(prefix).toBe('exd-cascader')
  })

  test('自定义 className 透传', () => {
    const { container } = render(<Cascader className="my-cascader" />)
    expect(container.querySelector('.my-cascader')).toBeInTheDocument()
  })

  test('ref 转发到 DOM', () => {
    const ref = React.createRef<any>()
    render(<Cascader ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
