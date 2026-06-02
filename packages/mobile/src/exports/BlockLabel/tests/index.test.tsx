import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlockLabel from '..'

describe('BlockLabel', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('默认渲染不崩溃', () => {
    const { container } = render(<BlockLabel />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('classNamePrefix 正确应用', () => {
    const { container } = render(<BlockLabel />)
    expect(container.querySelector('[class*="exd-block-label"]')).toBeInTheDocument()
  })

  test('自定义 className 透传', () => {
    const { container } = render(<BlockLabel className="my-custom" />)
    expect(container.querySelector('.my-custom')).toBeInTheDocument()
  })

  test('默认 onClick 点击不抛错', () => {
    const { container } = render(<BlockLabel />)
    expect(() => fireEvent.click(container.firstElementChild as Element)).not.toThrow()
  })

  test('状态 props 会反映到 wrapper、label 与 content className', () => {
    const { container, getByText } = render(
      <BlockLabel active autoHeight disabled type="warn" label="标题" placeholder="请输入标题" helper="警告提示">
        当前值
      </BlockLabel>,
    )

    expect(container.querySelector('.exd-block-label__wrapper')).toHaveClass(
      'exd-block-label__warn',
      'exd-block-label__disabled',
      'exd-block-label__wrapper--auto-height',
    )
    expect(container.querySelector('.exd-block-label__label')).toHaveClass('exd-block-label__label--active')
    expect(container.querySelector('.exd-block-label__content')).toHaveClass('exd-block-label__content--active')
    expect(getByText('请输入标题')).toHaveClass('exd-block-label__placeholder')
    expect(getByText('警告提示')).toHaveClass('exd-block-label__helper')
  })

  test('插槽、wrapperProps、barProps、contentProps 与 style 可合并到对应节点', () => {
    const { container, getByText } = render(
      <BlockLabel
        label="标签"
        prefix={<span>前缀</span>}
        suffix={<span>后缀</span>}
        style={{ color: 'red' }}
        wrapperProps={{ className: 'wrapper-extra' }}
        barProps={{ className: 'bar-extra', style: { backgroundColor: 'blue' } }}
        contentProps={{ className: 'content-extra' }}
        helperProps={{ className: 'helper-extra' }}
        helper="帮助"
      >
        内容
      </BlockLabel>,
    )

    expect(container.querySelector('.exd-block-label__wrapper')).toHaveClass('wrapper-extra')
    const bar = container.querySelector('.exd-block-label__bar') as HTMLElement
    expect(bar).toHaveClass('bar-extra')
    expect(bar.style.color).toBe('red')
    expect(bar.style.backgroundColor).toBe('blue')
    expect(container.querySelector('.exd-block-label__content')).toHaveClass('content-extra')
    expect(container.querySelector('.exd-block-label__helper')).toHaveClass('helper-extra')
    expect(getByText('前缀')).toBeInTheDocument()
    expect(getByText('后缀')).toBeInTheDocument()
    expect(getByText('内容')).toBeInTheDocument()
  })

  test('点击事件与 ref 指向根节点', () => {
    const onClick = jest.fn()
    const ref = React.createRef<HTMLDivElement>()
    const { container } = render(<BlockLabel ref={ref} onClick={onClick} label="标签" />)
    const root = container.firstElementChild as HTMLDivElement

    fireEvent.click(root)
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(ref.current).toBe(root)
  })

  test('labelProps 为函数时使用函数返回值', () => {
    const labelProps = jest.fn(() => ({ className: 'label-from-fn', 'data-testid': 'dynamic-label' }))
    const { getByTestId } = render(<BlockLabel label="标签" labelProps={labelProps} />)

    expect(getByTestId('dynamic-label')).toHaveClass('label-from-fn')
    expect(labelProps).toHaveBeenCalledWith({ prefixWidth: 0 })
  })

  test('prefix 宽度会推动 label 位置', async () => {
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(30)
    const { container } = render(<BlockLabel label="金额" prefix="￥" />)

    await waitFor(() => {
      expect((container.querySelector('.exd-block-label__label') as HTMLElement).style.left).toBe('30px')
    })
  })
})
