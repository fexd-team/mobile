import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import UnstyledLabel from '..'

describe('UnstyledLabel', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

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

  test('默认 onClick 点击不抛错', () => {
    const { container } = render(<UnstyledLabel />)
    expect(() => fireEvent.click(container.firstElementChild as Element)).not.toThrow()
  })

  test('渲染 label、placeholder、prefix、suffix、children 与 helper 插槽', () => {
    const { getByText, container } = render(
      <UnstyledLabel
        active
        label="姓名"
        placeholder="请输入姓名"
        prefix={() => <span>前缀</span>}
        suffix={<span>后缀</span>}
        helper={() => <span>辅助说明</span>}
      >
        {() => <span>内容</span>}
      </UnstyledLabel>,
    )

    expect(getByText('姓名')).toBeInTheDocument()
    expect(getByText('请输入姓名')).toBeInTheDocument()
    expect(getByText('前缀')).toBeInTheDocument()
    expect(getByText('后缀')).toBeInTheDocument()
    expect(getByText('内容')).toBeInTheDocument()
    expect(getByText('辅助说明')).toBeInTheDocument()
    expect(container.querySelector('label')).toBeInTheDocument()
  })

  test('active=false 或 label 与 placeholder 相同时不额外渲染 placeholder', () => {
    const inactive = render(<UnstyledLabel label="字段" placeholder="占位" />)
    expect(inactive.container.textContent).toBe('字段')
    inactive.unmount()

    const same = render(<UnstyledLabel active label="同文案" placeholder="同文案" />)
    expect(same.container.textContent).toBe('同文案')
  })

  test('keepHelperPlaceholder 为 true 时保留 helper 容器', () => {
    const { container } = render(<UnstyledLabel keepHelperPlaceholder helperProps={{ className: 'helper-slot' }} />)
    const helper = container.querySelector('.helper-slot')
    expect(helper).toBeInTheDocument()
    expect(helper?.textContent).toBe('')
  })

  test('useLabelWrapper=false 时 bar 使用 div 而非 label', () => {
    const { container } = render(<UnstyledLabel useLabelWrapper={false} barProps={{ className: 'bar-slot' }} />)
    expect(container.querySelector('label')).not.toBeInTheDocument()
    expect(container.querySelector('div.bar-slot')).toBeInTheDocument()
  })

  test('onClick、wrapperProps、ref 与 div 属性透传到根节点', () => {
    const onClick = jest.fn()
    const ref = React.createRef<HTMLDivElement>()
    const { getByTestId } = render(
      <UnstyledLabel data-testid="root" ref={ref} onClick={onClick} wrapperProps={{ className: 'wrapper-extra' }} />,
    )

    const root = getByTestId('root')
    expect(root).toHaveClass('exd-label')
    expect(root).toHaveClass('wrapper-extra')
    expect(ref.current).toBe(root)
    fireEvent.click(root)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test('labelProps 函数可拿到 prefixWidth 并驱动 label 属性', async () => {
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(36)
    const labelProps = jest.fn(({ prefixWidth }) => ({
      className: 'dynamic-label',
      'data-prefix-width': String(prefixWidth),
    }))

    const { container } = render(<UnstyledLabel prefix="￥" label="金额" labelProps={labelProps} />)

    await waitFor(() => {
      expect(container.querySelector('.dynamic-label')).toHaveAttribute('data-prefix-width', '36')
    })
    expect(labelProps).toHaveBeenCalledWith({ prefixWidth: 36 })
  })
})
