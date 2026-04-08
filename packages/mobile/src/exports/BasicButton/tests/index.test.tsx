import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import BasicButton from '..'

describe('BasicButton', () => {
  afterEach(() => {
    cleanup()
  })

  test('默认渲染不崩溃且展示子节点', () => {
    const { getByRole } = render(<BasicButton>提交</BasicButton>)
    expect(getByRole('button', { name: '提交' })).toBeInTheDocument()
  })

  test('type 与 size 反映到 className', () => {
    const { getByRole } = render(
      <BasicButton type="primary" size="large">
        主按钮
      </BasicButton>,
    )
    const btn = getByRole('button')
    expect(btn).toHaveClass('exd-btn-primary')
    expect(btn).toHaveClass('exd-btn-large')
  })

  test('shape 与 fill 反映到 className', () => {
    const { getByRole } = render(
      <BasicButton shape="round" fill="outline">
        圆角描边
      </BasicButton>,
    )
    const btn = getByRole('button')
    expect(btn).toHaveClass('exd-btn-round')
    expect(btn).toHaveClass('exd-btn-fill-outline')
  })

  test('block 为 true 时带块级类名', () => {
    const { getByRole } = render(<BasicButton block>块级</BasicButton>)
    expect(getByRole('button')).toHaveClass('exd-btn-block')
  })

  test('disabled 为 true 时带禁用类名（样式态）', () => {
    const { getByRole } = render(<BasicButton disabled>禁用</BasicButton>)
    const btn = getByRole('button')
    expect(btn).toHaveClass('exd-btn-disabled')
  })

  test('as 可渲染为自定义元素（如 a）', () => {
    const { container } = render(
      <BasicButton as="a" href="#x">
        链接
      </BasicButton>,
    )
    const link = container.querySelector('a.exd-btn')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '#x')
  })

  test('点击时触发 onClick', () => {
    const onClick = jest.fn()
    const { getByRole } = render(<BasicButton onClick={onClick}>点我</BasicButton>)
    fireEvent.click(getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test('disabled 时不触发 onClick', () => {
    const onClick = jest.fn()
    const { getByRole } = render(
      <BasicButton disabled onClick={onClick}>
        不可点
      </BasicButton>,
    )
    fireEvent.click(getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  test('disabled 时设置原生 disabled 属性与 aria-disabled', () => {
    const { getByRole } = render(<BasicButton disabled>禁用按钮</BasicButton>)
    const btn = getByRole('button')
    expect(btn).toBeDisabled()
    expect(btn).toHaveAttribute('aria-disabled', 'true')
    expect(btn).toHaveClass('exd-btn-disabled')
  })

  test('as 非 button 时 disabled 仅设 aria-disabled 不设原生 disabled', () => {
    const { container } = render(
      <BasicButton as="a" disabled href="#x">
        禁用链接
      </BasicButton>,
    )
    const link = container.querySelector('a.exd-btn')!
    expect(link).not.toHaveAttribute('disabled')
    expect(link).toHaveAttribute('aria-disabled', 'true')
  })

  test('children 为空时仍渲染按钮', () => {
    const { getByRole } = render(<BasicButton />)
    expect(getByRole('button')).toBeInTheDocument()
  })

  test('ref 转发到根 DOM 元素', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<BasicButton ref={ref}>r</BasicButton>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  test('与 defaultProps 一致的显式 props 仍可生成完整类名', () => {
    const { getByRole } = render(
      <BasicButton type="plain" size="normal" shape="square" fill="solid">
        默认组合
      </BasicButton>,
    )
    const btn = getByRole('button')
    expect(btn).toHaveClass('exd-btn-plain')
    expect(btn).toHaveClass('exd-btn-fill-solid')
  })
})
