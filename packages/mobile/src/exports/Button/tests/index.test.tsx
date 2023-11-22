import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@fexd/mobile'
import { delay } from '@fexd/tools'

describe('Button', () => {
  afterEach(async () => {
    document.body.innerHTML = ''
  })

  test('应能正常渲染内容', () => {
    render(<Button>Button Test</Button>)
    const linkElement = screen.getByText(/Button Test/i)
    expect(linkElement).toBeInTheDocument()
  })

  // type?: BasicButtonTypes // 类型，可选值为 plain primary success warning danger
  test('type 正常工作', () => {
    render(<Button className="plain-button" />)
    expect(document.querySelector('.plain-button')).toHaveClass('exd-btn-plain')

    render(<Button type="primary" className="primary-button" />)
    expect(document.querySelector('.primary-button')).toHaveClass('exd-btn-primary')

    render(<Button type="success" className="success-button" />)
    expect(document.querySelector('.success-button')).toHaveClass('exd-btn-success')

    render(<Button type="warning" className="warning-button" />)
    expect(document.querySelector('.warning-button')).toHaveClass('exd-btn-warning')

    render(<Button type="danger" className="danger-button" />)
    expect(document.querySelector('.danger-button')).toHaveClass('exd-btn-danger')
  })

  // size?: BasicButtonSizeTypes // 尺寸，可选值为 large normal small mini
  test('size 正常工作', () => {
    render(<Button className="default-button" />)
    expect(document.querySelector('.default-button')).toHaveClass('exd-btn-normal')

    render(<Button size="large" className="large-button" />)
    expect(document.querySelector('.large-button')).toHaveClass('exd-btn-large')

    render(<Button size="normal" className="normal-button" />)
    expect(document.querySelector('.normal-button')).toHaveClass('exd-btn-normal')

    render(<Button size="small" className="small-button" />)
    expect(document.querySelector('.small-button')).toHaveClass('exd-btn-small')

    render(<Button size="mini" className="mini-button" />)
    expect(document.querySelector('.mini-button')).toHaveClass('exd-btn-mini')
  })

  // shape?: BasicButtonShapes // 形状，可选值为 square round unset
  test('shape 正常工作', () => {
    render(<Button className="default-button" />)
    expect(document.querySelector('.default-button')).toHaveClass('exd-btn-square')

    render(<Button shape="square" className="square-button" />)
    expect(document.querySelector('.square-button')).toHaveClass('exd-btn-square')

    render(<Button shape="round" className="round-button" />)
    expect(document.querySelector('.round-button')).toHaveClass('exd-btn-round')

    render(<Button shape="unset" className="unset-button" />)
    expect(document.querySelector('.unset-button')).toHaveClass('exd-btn-unset')
  })

  // fill?: BasicButtonFillTypes // 填充模式 solid outline none
  test('fill 正常工作', () => {
    render(<Button className="default-button" />)
    expect(document.querySelector('.default-button')).toHaveClass('exd-btn-fill-solid')

    render(<Button fill="solid" className="solid-button" />)
    expect(document.querySelector('.solid-button')).toHaveClass('exd-btn-fill-solid')

    render(<Button fill="outline" className="outline-button" />)
    expect(document.querySelector('.outline-button')).toHaveClass('exd-btn-fill-outline')

    render(<Button fill="none" className="none-button" />)
    expect(document.querySelector('.none-button')).toHaveClass('exd-btn-fill-none')
  })

  // block?: boolean // 是否为块级元素
  test('block 正常工作', () => {
    render(<Button className="default-button" />)
    expect(document.querySelector('.default-button')).not.toHaveClass('exd-btn-block')

    render(<Button block={false} className="inline-button" />)
    expect(document.querySelector('.inline-button')).not.toHaveClass('exd-btn-block')

    render(<Button block className="block-button" />)
    expect(document.querySelector('.block-button')).toHaveClass('exd-btn-block')
  })

  // disabled?: boolean // 是否为禁用状态
  test('disabled 正常工作', async () => {
    const event1 = jest.fn()
    render(<Button className="default-button" onClick={event1} />)
    const defaultButton = document.querySelector('.default-button')!
    fireEvent.click(defaultButton)
    await delay(30) // 因为 click 事件执行时会因为默认的 loading="auto" 存在短暂 disabled 时期，故需要异步等待一点时间
    expect(defaultButton).not.toHaveClass('exd-btn-disabled')
    expect(event1).toBeCalled()

    const event2 = jest.fn()
    render(<Button disabled={false} className="normal-button" onClick={event2} />)
    const normalButton = document.querySelector('.normal-button')!
    fireEvent.click(normalButton)
    await delay(30)
    expect(normalButton).not.toHaveClass('exd-btn-disabled')
    expect(event2).toBeCalled()

    const event3 = jest.fn()
    render(<Button disabled className="disabled-button" onClick={event3} />)
    const disabledButton = document.querySelector('.disabled-button')!
    fireEvent.click(disabledButton)
    await delay(30)
    expect(disabledButton).toHaveClass('exd-btn-disabled')
    expect(event3).not.toBeCalled()
  })

  // className?: string // 类名
  // children?: React.ReactNode // 子元素

  // onClick?: React.MouseEventHandler<HTMLElement>
  test('onClick 正常工作', async () => {
    const event1 = jest.fn()
    render(<Button className="default-button" onClick={event1} />)
    const defaultButton = document.querySelector('.default-button')!
    fireEvent.click(defaultButton)
    expect(event1).toBeCalled()
  })

  // loading?: boolean | 'auto' // 是否为加载中状态
  test('loading 正常工作', async () => {
    const event1 = jest.fn()
    render(
      <Button
        className="default-button"
        onClick={async () => {
          event1()
          await delay(100)
          event1()
        }}
      />,
    )
    const defaultButton = document.querySelector('.default-button')!
    expect(defaultButton).not.toHaveClass('exd-btn-disabled')
    expect(defaultButton.querySelector('.exd-spin')).not.toBeInTheDocument()
    fireEvent.click(defaultButton)
    await delay(30)
    expect(defaultButton).toHaveClass('exd-btn-disabled')
    expect(defaultButton.querySelector('.exd-spin')).toBeInTheDocument()
    expect(event1).toBeCalledTimes(1)
    await delay(100)
    expect(defaultButton).not.toHaveClass('exd-btn-disabled')
    expect(defaultButton.querySelector('.exd-spin')).not.toBeInTheDocument()
    expect(event1).toBeCalledTimes(2)

    const event2 = jest.fn()
    render(
      <Button
        loading="auto"
        className="auto-loading-button"
        onClick={async () => {
          event2()
          await delay(100)
          event2()
        }}
      />,
    )
    const autoLoadingButton = document.querySelector('.auto-loading-button')!
    expect(autoLoadingButton).not.toHaveClass('exd-btn-disabled')
    expect(autoLoadingButton.querySelector('.exd-spin')).not.toBeInTheDocument()
    fireEvent.click(autoLoadingButton)
    await delay(30)
    expect(autoLoadingButton).toHaveClass('exd-btn-disabled')
    expect(autoLoadingButton.querySelector('.exd-spin')).toBeInTheDocument()
    expect(event2).toBeCalledTimes(1)
    await delay(100)
    expect(autoLoadingButton).not.toHaveClass('exd-btn-disabled')
    expect(autoLoadingButton.querySelector('.exd-spin')).not.toBeInTheDocument()
    expect(event2).toBeCalledTimes(2)

    const event3 = jest.fn()
    render(
      <Button
        loading
        className="loading-button"
        onClick={async () => {
          event3()
          await delay(100)
          event3()
        }}
      />,
    )
    const loadingButton = document.querySelector('.loading-button')!
    expect(loadingButton).toHaveClass('exd-btn-disabled')
    expect(loadingButton.querySelector('.exd-spin')).toBeInTheDocument()
    fireEvent.click(loadingButton)
    await delay(30)
    expect(loadingButton).toHaveClass('exd-btn-disabled')
    expect(loadingButton.querySelector('.exd-spin')).toBeInTheDocument()
    expect(event3).not.toBeCalled()
    await delay(100)
    expect(loadingButton).toHaveClass('exd-btn-disabled')
    expect(loadingButton.querySelector('.exd-spin')).toBeInTheDocument()
    expect(event3).not.toBeCalled()

    const event4 = jest.fn()
    render(
      <Button
        loading={false}
        className="non-loading-button"
        onClick={async () => {
          event4()
          await delay(100)
          event4()
        }}
      />,
    )
    const nonLoadingButton = document.querySelector('.non-loading-button')!
    expect(nonLoadingButton).not.toHaveClass('exd-btn-disabled')
    expect(nonLoadingButton.querySelector('.exd-spin')).not.toBeInTheDocument()
    fireEvent.click(nonLoadingButton)
    await delay(30)
    expect(nonLoadingButton).not.toHaveClass('exd-btn-disabled')
    expect(nonLoadingButton.querySelector('.exd-spin')).not.toBeInTheDocument()
    expect(event4).toBeCalledTimes(1)
    await delay(100)
    expect(nonLoadingButton).not.toHaveClass('exd-btn-disabled')
    expect(nonLoadingButton.querySelector('.exd-spin')).not.toBeInTheDocument()
    expect(event4).toBeCalledTimes(2)
  })

  // 以下部分暂未覆盖测试用例

  // as?: string | React.ComponentFactory<any, any> | React.FunctionComponentFactory<any>
  // ref?: React.Ref<any>
  // icon?: React.ReactNode // 图标名称或节点
  // iconPosition?: 'left' | 'right' // 图标位置
})
