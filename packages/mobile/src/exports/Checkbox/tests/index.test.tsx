import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Checkbox, { defaultIcon, prefix } from '..'

describe('Checkbox', () => {
  describe('冒烟与导出', () => {
    test('默认渲染结构完整且不崩溃', () => {
      const { container } = render(<Checkbox>选项</Checkbox>)
      expect(container.querySelector('.exd-checkbox-wrapper')).toBeInTheDocument()
      expect(container.querySelector('.exd-checkbox-label')).toBeInTheDocument()
      expect(container.querySelector('.exd-checkbox-icon')).toBeInTheDocument()
      expect(container.querySelector('.exd-checkbox-content')).toBeInTheDocument()
    })

    test('children 文案可见', () => {
      render(<Checkbox>多选文案</Checkbox>)
      expect(screen.getByText('多选文案')).toBeInTheDocument()
    })

    test('命名导出 prefix 与类名前缀一致', () => {
      expect(prefix).toBe('exd-checkbox')
    })

    test('命名导出 defaultIcon 在选中/未选中态均可渲染', () => {
      const { rerender, container } = render(<span>{defaultIcon(false)}</span>)
      expect(container.querySelector('span')?.innerHTML).toBeTruthy()
      rerender(<span>{defaultIcon(true)}</span>)
      expect(container.querySelector('span')?.innerHTML).toBeTruthy()
    })
  })

  describe('Props 展示', () => {
    test('checked 为 true 时展示选中样式', () => {
      const { container } = render(<Checkbox checked>选</Checkbox>)
      const wrap = container.querySelector('.exd-checkbox-wrapper')
      const icon = container.querySelector('.exd-checkbox-icon')
      expect(wrap).toHaveClass('exd-checkbox--active')
      expect(icon).toHaveClass('exd-checkbox-icon--active')
    })

    test('checked 为 false 时无选中样式', () => {
      const { container } = render(<Checkbox checked={false}>选</Checkbox>)
      expect(container.querySelector('.exd-checkbox-wrapper')).not.toHaveClass('exd-checkbox--active')
      expect(container.querySelector('.exd-checkbox-icon')).not.toHaveClass('exd-checkbox-icon--active')
    })

    test('defaultChecked 初始为选中', () => {
      const { container } = render(<Checkbox defaultChecked>选</Checkbox>)
      expect(container.querySelector('.exd-checkbox-wrapper')).toHaveClass('exd-checkbox--active')
    })

    test('disabled 时带禁用样式', () => {
      const { container } = render(<Checkbox disabled>选</Checkbox>)
      expect(container.querySelector('.exd-checkbox-wrapper')).toHaveClass('exd-checkbox-wrapper--disabled')
    })

    test('block 时带块级样式', () => {
      const { container } = render(<Checkbox block>选</Checkbox>)
      expect(container.querySelector('.exd-checkbox-wrapper')).toHaveClass('exd-checkbox-wrapper--block')
    })

    test('description 渲染描述区域（字符串）', () => {
      const { container } = render(<Checkbox description="辅助说明">主标题</Checkbox>)
      const desc = container.querySelector('.exd-checkbox-description')
      expect(desc).toBeInTheDocument()
      expect(desc).toHaveTextContent('辅助说明')
    })

    test('description 支持 React 节点', () => {
      render(<Checkbox description={<em data-testid="desc-node">说明</em>}>主标题</Checkbox>)
      expect(screen.getByTestId('desc-node')).toHaveTextContent('说明')
    })

    test('无 description 时不渲染描述节点', () => {
      const { container } = render(<Checkbox>仅主标题</Checkbox>)
      expect(container.querySelector('.exd-checkbox-description')).not.toBeInTheDocument()
    })

    test('自定义 icon 为 React 节点', () => {
      const { container } = render(<Checkbox icon={<span data-testid="custom-icon">ic</span>}>选</Checkbox>)
      expect(container.querySelector('[data-testid="custom-icon"]')).toBeInTheDocument()
    })

    test('自定义 icon 为函数时接收 checked 状态', () => {
      const { container } = render(
        <Checkbox
          icon={(c) => (
            <span className="fn-icon" data-state={c ? 'on' : 'off'}>
              fn
            </span>
          )}
        >
          选
        </Checkbox>,
      )
      const el = container.querySelector('.fn-icon')
      expect(el).toBeInTheDocument()
      expect(el).toHaveAttribute('data-state', 'off')
    })

    test('className 合并到 label 根节点', () => {
      const { container } = render(<Checkbox className="my-cb">选</Checkbox>)
      expect(container.querySelector('.exd-checkbox-wrapper')).toHaveClass('my-cb')
    })

    test('额外 label 属性可透传', () => {
      render(<Checkbox data-testid="cb-label">选</Checkbox>)
      expect(screen.getByTestId('cb-label')).toBeInTheDocument()
    })
  })

  describe('点击交互（userEvent）', () => {
    test('非受控下点击切换并触发 onChange', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      const { container } = render(
        <Checkbox defaultChecked={false} onChange={onChange}>
          选
        </Checkbox>,
      )
      await user.click(container.querySelector('.exd-checkbox-wrapper') as HTMLElement)
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(true)
    })

    test('禁用时不响应点击且不触发 onChange', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      const { container } = render(
        <Checkbox disabled defaultChecked={false} onChange={onChange}>
          选
        </Checkbox>,
      )
      await user.click(container.querySelector('.exd-checkbox-wrapper') as HTMLElement)
      expect(onChange).not.toHaveBeenCalled()
    })

    test('icon 函数在点击后收到 checked=true', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <Checkbox defaultChecked={false} icon={(c) => <span data-testid="ic" data-c={String(c)} />}>
          选
        </Checkbox>,
      )
      expect(screen.getByTestId('ic')).toHaveAttribute('data-c', 'false')
      await user.click(container.querySelector('.exd-checkbox-wrapper') as HTMLElement)
      expect(screen.getByTestId('ic')).toHaveAttribute('data-c', 'true')
    })
  })

  describe('受控与非受控', () => {
    test('非受控：defaultChecked 可反复点击切换', async () => {
      const user = userEvent.setup()
      const { container } = render(<Checkbox defaultChecked={false}>选</Checkbox>)
      const wrap = container.querySelector('.exd-checkbox-wrapper')
      await user.click(wrap as HTMLElement)
      expect(wrap).toHaveClass('exd-checkbox--active')
      await user.click(wrap as HTMLElement)
      expect(wrap).not.toHaveClass('exd-checkbox--active')
    })

    test('受控：仅 checked 时点击不改变视觉状态', async () => {
      const user = userEvent.setup()
      const { container } = render(<Checkbox checked={false}>选</Checkbox>)
      const wrap = container.querySelector('.exd-checkbox-wrapper') as HTMLElement
      await user.click(wrap)
      expect(wrap).not.toHaveClass('exd-checkbox--active')
    })

    test('受控：onChange 与外部 state 联动', async () => {
      const user = userEvent.setup()
      function Wrapper() {
        const [checked, setChecked] = React.useState(false)
        return (
          <Checkbox checked={checked} onChange={setChecked}>
            选
          </Checkbox>
        )
      }
      const { container } = render(<Wrapper />)
      const wrap = container.querySelector('.exd-checkbox-wrapper') as HTMLElement
      await user.click(wrap)
      expect(wrap).toHaveClass('exd-checkbox--active')
    })
  })

  describe('Checkbox.Group', () => {
    test('多选：点击加入、取消选中并触发 onChange', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(
        <Checkbox.Group defaultValue={[]} onChange={onChange}>
          <Checkbox value="a">A</Checkbox>
          <Checkbox value="b">B</Checkbox>
        </Checkbox.Group>,
      )
      await user.click(screen.getByText('A'))
      expect(onChange).toHaveBeenLastCalledWith(['a'])
      await user.click(screen.getByText('B'))
      expect(onChange).toHaveBeenLastCalledWith(['a', 'b'])
      await user.click(screen.getByText('A'))
      expect(onChange).toHaveBeenLastCalledWith(['b'])
    })

    test('Group disabled 作用于子项且阻止点击', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      const { container } = render(
        <Checkbox.Group defaultValue={[]} disabled onChange={onChange}>
          <Checkbox value="a">A</Checkbox>
        </Checkbox.Group>,
      )
      expect(container.querySelector('.exd-checkbox-wrapper')).toHaveClass('exd-checkbox-wrapper--disabled')
      await user.click(screen.getByText('A'))
      expect(onChange).not.toHaveBeenCalled()
    })

    test('Group block 透传至子项', () => {
      const { container } = render(
        <Checkbox.Group defaultValue={[]} block>
          <Checkbox value="a">A</Checkbox>
        </Checkbox.Group>,
      )
      expect(container.querySelector('.exd-checkbox-wrapper')).toHaveClass('exd-checkbox-wrapper--block')
    })

    test('子项 block 可覆盖 Group 非 block', () => {
      const { container } = render(
        <Checkbox.Group defaultValue={[]}>
          <Checkbox value="a" block>
            A
          </Checkbox>
        </Checkbox.Group>,
      )
      expect(container.querySelector('.exd-checkbox-wrapper')).toHaveClass('exd-checkbox-wrapper--block')
    })

    test('Group 自定义 icon 通过上下文传给子项', () => {
      const { container } = render(
        <Checkbox.Group defaultValue={[]} icon={<i data-testid="g-icon" />}>
          <Checkbox value="x">X</Checkbox>
        </Checkbox.Group>,
      )
      expect(container.querySelector('[data-testid="g-icon"]')).toBeInTheDocument()
    })

    test('options 模式非 block：横向 Space 且可切换', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      const { container } = render(
        <Checkbox.Group
          defaultValue={[]}
          onChange={onChange}
          block={false}
          options={[
            { label: '项一', value: '1' },
            { label: '项二', value: '2' },
          ]}
        />,
      )
      expect(screen.getByText('项一')).toBeInTheDocument()
      const space = container.querySelector('.exd-space')
      expect(space).toHaveClass('exd-space-horizontal')
      expect(space).toHaveClass('exd-space-wrap')
      await user.click(screen.getByText('项一'))
      expect(onChange).toHaveBeenCalledWith(['1'])
    })

    test('options 模式 block：纵向 Space 且 wrap 关闭', () => {
      const { container } = render(
        <Checkbox.Group defaultValue={[]} block options={[{ label: '纵向项', value: 'v' }]} />,
      )
      const space = container.querySelector('.exd-space')
      expect(space).toHaveClass('exd-space-vertical')
      expect(space).not.toHaveClass('exd-space-wrap')
    })

    test('options 单项可单独 disabled', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(
        <Checkbox.Group
          defaultValue={[]}
          onChange={onChange}
          options={[
            { label: '可用', value: 'ok' },
            { label: '禁用', value: 'no', disabled: true },
          ]}
        />,
      )
      await user.click(screen.getByText('禁用'))
      expect(onChange).not.toHaveBeenCalled()
      await user.click(screen.getByText('可用'))
      expect(onChange).toHaveBeenCalledWith(['ok'])
    })

    test('数值 value 在 Group 中可选中', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(
        <Checkbox.Group defaultValue={[]} onChange={onChange}>
          <Checkbox value={1}>一</Checkbox>
        </Checkbox.Group>,
      )
      await user.click(screen.getByText('一'))
      expect(onChange).toHaveBeenCalledWith([1])
    })

    test('受控 Group：value 与 onChange 同步', async () => {
      const user = userEvent.setup()
      function Wrapper() {
        const [val, setVal] = React.useState<(string | number)[]>([])
        return (
          <Checkbox.Group value={val} onChange={setVal}>
            <Checkbox value="x">X</Checkbox>
          </Checkbox.Group>
        )
      }
      render(<Wrapper />)
      await user.click(screen.getByText('X'))
      expect(screen.getByText('X').closest('.exd-checkbox-wrapper')).toHaveClass('exd-checkbox--active')
    })

    test('仅 children 无 options 时渲染子节点', () => {
      render(
        <Checkbox.Group defaultValue={[]}>
          <Checkbox value="only">仅子节点</Checkbox>
        </Checkbox.Group>,
      )
      expect(screen.getByText('仅子节点')).toBeInTheDocument()
    })

    test('options 为空数组时不渲染选项但仍挂载 Group', () => {
      const { container } = render(<Checkbox.Group defaultValue={[]} options={[]} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    test('传入 ref 不抛错', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(
        <Checkbox.Group ref={ref as any} defaultValue={[]}>
          <Checkbox value="r">R</Checkbox>
        </Checkbox.Group>,
      )
      expect(screen.getByText('R')).toBeInTheDocument()
    })
  })

  describe('ref', () => {
    test('Checkbox ref 指向 label 元素', () => {
      const ref = React.createRef<HTMLLabelElement>()
      render(
        <Checkbox ref={ref} defaultChecked={false}>
          选
        </Checkbox>,
      )
      expect(ref.current?.tagName).toBe('LABEL')
      expect(ref.current?.classList.contains('exd-checkbox-wrapper')).toBe(true)
    })
  })
})
