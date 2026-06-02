import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import LineLabel from '..'

describe('LineLabel', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('默认渲染不崩溃', () => {
    const { container } = render(<LineLabel />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('classNamePrefix 正确应用', () => {
    const { container } = render(<LineLabel />)
    expect(container.querySelector('[class*="exd-line-label"]')).toBeInTheDocument()
  })

  test('自定义 className 透传', () => {
    const { container } = render(<LineLabel className="my-custom" />)
    expect(container.querySelector('.my-custom')).toBeInTheDocument()
  })

  test('默认 onClick 点击不抛错', () => {
    const { container } = render(<LineLabel />)
    expect(() => fireEvent.click(container.firstElementChild as Element)).not.toThrow()
  })

  test('状态 props 会反映到 wrapper、label 与 content className', () => {
    const { container, getByText } = render(
      <LineLabel active autoHeight disabled type="error" label="姓名" placeholder="请输入姓名" helper="错误提示">
        当前值
      </LineLabel>,
    )

    expect(container.querySelector('.exd-line-label__wrapper')).toHaveClass(
      'exd-line-label__error',
      'exd-line-label__disabled',
      'exd-line-label__wrapper--auto-height',
    )
    expect(container.querySelector('.exd-line-label__label')).toHaveClass('exd-line-label__label--active')
    expect(container.querySelector('.exd-line-label__content')).toHaveClass('exd-line-label__content--active')
    expect(getByText('请输入姓名')).toHaveClass('exd-line-label__placeholder')
    expect(getByText('错误提示')).toHaveClass('exd-line-label__helper')
  })

  test('插槽、barProps、contentProps 与 style 可合并到对应节点', () => {
    const { container, getByText } = render(
      <LineLabel
        label="标签"
        prefix={<span>前缀</span>}
        suffix={<span>后缀</span>}
        style={{ color: 'red' }}
        barProps={{ className: 'bar-extra', style: { backgroundColor: 'blue' } }}
        contentProps={{ className: 'content-extra' }}
        helperProps={{ className: 'helper-extra' }}
        helper="帮助"
      >
        内容
      </LineLabel>,
    )

    const bar = container.querySelector('.exd-line-label__bar') as HTMLElement
    expect(bar).toHaveClass('bar-extra')
    expect(bar.style.color).toBe('red')
    expect(bar.style.backgroundColor).toBe('blue')
    expect(container.querySelector('.exd-line-label__content')).toHaveClass('content-extra')
    expect(container.querySelector('.exd-line-label__helper')).toHaveClass('helper-extra')
    expect(getByText('前缀')).toBeInTheDocument()
    expect(getByText('后缀')).toBeInTheDocument()
    expect(getByText('内容')).toBeInTheDocument()
  })

  test('点击事件与 ref 指向根节点', () => {
    const onClick = jest.fn()
    const ref = React.createRef<HTMLDivElement>()
    const { container } = render(<LineLabel ref={ref} onClick={onClick} label="标签" />)
    const root = container.firstElementChild as HTMLDivElement

    fireEvent.click(root)
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(ref.current).toBe(root)
  })

  test('labelProps 为函数时使用函数返回值', () => {
    const labelProps = jest.fn(() => ({ className: 'label-from-fn', 'data-testid': 'dynamic-label' }))
    const { getByTestId } = render(<LineLabel label="标签" labelProps={labelProps} />)

    expect(getByTestId('dynamic-label')).toHaveClass('label-from-fn')
    expect(labelProps).toHaveBeenCalledWith({ prefixWidth: 0 })
  })

  test('未激活时 prefix 宽度会推动 label 位置', async () => {
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(24)
    const { container } = render(<LineLabel label="金额" prefix="￥" />)

    await waitFor(() => {
      expect((container.querySelector('.exd-line-label__label') as HTMLElement).style.left).toBe('24px')
    })
  })
})
