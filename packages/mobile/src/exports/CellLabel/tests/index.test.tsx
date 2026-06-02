import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import CellLabel from '..'

describe('CellLabel', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('默认渲染不崩溃', () => {
    const { container } = render(<CellLabel />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('classNamePrefix 正确应用', () => {
    const { container } = render(<CellLabel />)
    expect(container.querySelector('[class*="exd-cell-label"]')).toBeInTheDocument()
  })

  test('自定义 className 透传', () => {
    const { container } = render(<CellLabel className="my-custom" />)
    expect(container.querySelector('.my-custom')).toBeInTheDocument()
  })

  test('默认 onClick 点击不抛错', () => {
    const { container } = render(<CellLabel />)
    expect(() => fireEvent.click(container.firstElementChild as Element)).not.toThrow()
  })

  test('状态 props 会反映到 wrapper、label 与 content className', () => {
    const { container, getByText } = render(
      <CellLabel active autoHeight disabled type="success" label="标题" placeholder="请输入标题" helper="成功提示">
        当前值
      </CellLabel>,
    )

    expect(container.querySelector('.exd-cell-label__wrapper')).toHaveClass(
      'exd-cell-label__success',
      'exd-cell-label__disabled',
      'exd-cell-label__wrapper--auto-height',
    )
    expect(container.querySelector('.exd-cell-label__label')).toHaveClass('exd-cell-label__label--active')
    expect(container.querySelector('.exd-cell-label__content')).toHaveClass('exd-cell-label__content--active')
    expect(getByText('请输入标题')).toHaveClass('exd-cell-label__placeholder')
    expect(getByText('成功提示')).toHaveClass('exd-cell-label__helper')
  })

  test('插槽、barProps、contentProps 与 style 可合并到对应节点', () => {
    const { container, getByText } = render(
      <CellLabel
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
      </CellLabel>,
    )

    const bar = container.querySelector('.exd-cell-label__bar') as HTMLElement
    expect(bar).toHaveClass('bar-extra')
    expect(bar.style.color).toBe('red')
    expect(bar.style.backgroundColor).toBe('blue')
    expect(container.querySelector('.exd-cell-label__content')).toHaveClass('content-extra')
    expect(container.querySelector('.exd-cell-label__helper')).toHaveClass('helper-extra')
    expect(getByText('前缀')).toBeInTheDocument()
    expect(getByText('后缀')).toBeInTheDocument()
    expect(getByText('内容')).toBeInTheDocument()
  })

  test('点击事件与 ref 指向根节点', () => {
    const onClick = jest.fn()
    const ref = React.createRef<HTMLDivElement>()
    const { container } = render(<CellLabel ref={ref} onClick={onClick} label="标签" />)
    const root = container.firstElementChild as HTMLDivElement

    fireEvent.click(root)
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(ref.current).toBe(root)
  })

  test('labelProps 为函数时使用函数返回值', () => {
    const labelProps = jest.fn(() => ({ className: 'label-from-fn', 'data-testid': 'dynamic-label' }))
    const { getByTestId } = render(<CellLabel label="标签" labelProps={labelProps} />)

    expect(getByTestId('dynamic-label')).toHaveClass('label-from-fn')
    expect(labelProps).toHaveBeenCalledWith({ prefixWidth: 0 })
  })

  test('未激活时 prefix 宽度会推动 label 位置', async () => {
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(28)
    const { container } = render(<CellLabel label="金额" prefix="￥" />)

    await waitFor(() => {
      expect((container.querySelector('.exd-cell-label__label') as HTMLElement).style.left).toBe('28px')
    })
  })
})
