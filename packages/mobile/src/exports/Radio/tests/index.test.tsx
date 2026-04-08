import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Radio, { defaultIcon, prefix } from '..'
import { radioGroupContext, useRadioGroupContext } from '../Group'

describe('Radio', () => {
  describe('冒烟', () => {
    test('默认渲染不崩溃且结构完整', () => {
      const { container } = render(<Radio>选项</Radio>)
      expect(container.querySelector('.exd-radio-wrapper')).toBeInTheDocument()
      expect(container.querySelector('.exd-radio-label')).toBeInTheDocument()
      expect(container.querySelector('.exd-radio-icon')).toBeInTheDocument()
      expect(container.querySelector('.exd-radio-content')).toBeInTheDocument()
    })

    test('children 文案可见', () => {
      render(<Radio>单选文案</Radio>)
      expect(screen.getByText('单选文案')).toBeInTheDocument()
    })
  })

  describe('命名导出与常量', () => {
    test('prefix 与 defaultIcon 可从入口命名导出使用', () => {
      expect(prefix).toBe('exd-radio')
      const { container } = render(<span>{defaultIcon(true)}</span>)
      expect(container.querySelector('span')).toBeInTheDocument()
    })
  })

  describe('属性', () => {
    test('checked 为 true 时展示选中样式', () => {
      const { container } = render(<Radio checked>选</Radio>)
      const wrap = container.querySelector('.exd-radio-wrapper')
      const icon = container.querySelector('.exd-radio-icon')
      expect(wrap).toHaveClass('exd-radio--active')
      expect(icon).toHaveClass('exd-radio-icon--active')
    })

    test('checked 为 false 时无选中样式', () => {
      const { container } = render(<Radio checked={false}>选</Radio>)
      expect(container.querySelector('.exd-radio-wrapper')).not.toHaveClass('exd-radio--active')
      expect(container.querySelector('.exd-radio-icon')).not.toHaveClass('exd-radio-icon--active')
    })

    test('disabled 时带禁用样式', () => {
      const { container } = render(<Radio disabled>选</Radio>)
      expect(container.querySelector('.exd-radio-wrapper')).toHaveClass('exd-radio-wrapper--disabled')
    })

    test('block 时带块级样式', () => {
      const { container } = render(<Radio block>选</Radio>)
      expect(container.querySelector('.exd-radio-wrapper')).toHaveClass('exd-radio-wrapper--block')
    })

    test('无 description 时不渲染描述节点', () => {
      const { container } = render(<Radio>仅主内容</Radio>)
      expect(container.querySelector('.exd-radio-description')).not.toBeInTheDocument()
    })

    test('description 渲染描述区域', () => {
      const { container } = render(<Radio description="辅助说明">主标题</Radio>)
      const desc = container.querySelector('.exd-radio-description')
      expect(desc).toBeInTheDocument()
      expect(desc).toHaveTextContent('辅助说明')
    })

    test('自定义 icon 为 React 节点', () => {
      const { container } = render(<Radio icon={<span data-testid="custom-icon">ic</span>}>选</Radio>)
      expect(container.querySelector('[data-testid="custom-icon"]')).toBeInTheDocument()
    })

    test('自定义 icon 为函数时按选中态渲染', () => {
      const { container } = render(
        <Radio checked icon={(checked) => <span data-checked={String(checked)}>{checked ? 'on' : 'off'}</span>}>
          选
        </Radio>,
      )
      const el = container.querySelector('[data-checked="true"]')
      expect(el).toBeInTheDocument()
      expect(el).toHaveTextContent('on')
    })

    test('className 合并到 label', () => {
      const { container } = render(<Radio className="my-rd">选</Radio>)
      expect(container.querySelector('.exd-radio-wrapper')).toHaveClass('my-rd')
    })

    test('htmlFor 等 label 属性可透传', () => {
      render(
        <Radio htmlFor="rid" id="lid">
          选
        </Radio>,
      )
      const label = document.getElementById('lid')
      expect(label).toBeInstanceOf(HTMLLabelElement)
      expect(label).toHaveAttribute('for', 'rid')
    })
  })

  describe('点击与 userEvent', () => {
    test('非受控点击切换并触发 onChange', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      const { container } = render(
        <Radio defaultChecked={false} onChange={onChange}>
          选
        </Radio>,
      )
      await user.click(container.querySelector('.exd-radio-wrapper') as HTMLElement)
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(true)
    })

    test('禁用时不触发 onChange', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      const { container } = render(
        <Radio disabled defaultChecked={false} onChange={onChange}>
          选
        </Radio>,
      )
      await user.click(container.querySelector('.exd-radio-wrapper') as HTMLElement)
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('受控与非受控', () => {
    test('非受控：defaultChecked 可来回切换', async () => {
      const user = userEvent.setup()
      const { container } = render(<Radio defaultChecked={false}>选</Radio>)
      const wrap = container.querySelector('.exd-radio-wrapper') as HTMLElement
      await user.click(wrap)
      expect(wrap).toHaveClass('exd-radio--active')
      await user.click(wrap)
      expect(wrap).not.toHaveClass('exd-radio--active')
    })

    test('受控：仅有 checked 时点击不自行改变', async () => {
      const user = userEvent.setup()
      const { container } = render(<Radio checked={false}>选</Radio>)
      const wrap = container.querySelector('.exd-radio-wrapper') as HTMLElement
      await user.click(wrap)
      expect(wrap).not.toHaveClass('exd-radio--active')
    })

    test('受控：onChange 与外部状态联动', async () => {
      const user = userEvent.setup()
      function Wrapper() {
        const [checked, setChecked] = React.useState(false)
        return (
          <Radio checked={checked} onChange={setChecked}>
            选
          </Radio>
        )
      }
      const { container } = render(<Wrapper />)
      const wrap = container.querySelector('.exd-radio-wrapper') as HTMLElement
      await user.click(wrap)
      expect(wrap).toHaveClass('exd-radio--active')
    })
  })

  describe('Radio.Group', () => {
    test('单选互斥：仅一项为 active', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(
        <Radio.Group defaultValue="a" onChange={onChange}>
          <Radio value="a">A</Radio>
          <Radio value="b">B</Radio>
        </Radio.Group>,
      )
      const wrapA = screen.getByText('A').closest('.exd-radio-wrapper')!
      const wrapB = screen.getByText('B').closest('.exd-radio-wrapper')!
      expect(wrapA).toHaveClass('exd-radio--active')
      expect(wrapB).not.toHaveClass('exd-radio--active')

      await user.click(screen.getByText('B'))
      expect(onChange).toHaveBeenLastCalledWith('b')
      expect(wrapA).not.toHaveClass('exd-radio--active')
      expect(wrapB).toHaveClass('exd-radio--active')
    })

    test('再次点击已选项保持选中', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(
        <Radio.Group defaultValue="a" onChange={onChange}>
          <Radio value="a">A</Radio>
        </Radio.Group>,
      )
      const wrapA = screen.getByText('A').closest('.exd-radio-wrapper')!
      expect(wrapA).toHaveClass('exd-radio--active')
      await user.click(screen.getByText('A'))
      expect(wrapA).toHaveClass('exd-radio--active')
    })

    test('Group 层 disabled 阻止切换', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      const { container } = render(
        <Radio.Group defaultValue="a" disabled onChange={onChange}>
          <Radio value="a">A</Radio>
          <Radio value="b">B</Radio>
        </Radio.Group>,
      )
      expect(container.querySelectorAll('.exd-radio-wrapper--disabled').length).toBeGreaterThan(0)
      await user.click(screen.getByText('B'))
      expect(onChange).not.toHaveBeenCalled()
    })

    test('子项 disabled 优先于 Group 可点项', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(
        <Radio.Group defaultValue="a" onChange={onChange}>
          <Radio value="a">A</Radio>
          <Radio value="b" disabled>
            B
          </Radio>
        </Radio.Group>,
      )
      await user.click(screen.getByText('B'))
      expect(onChange).not.toHaveBeenCalled()
      expect(screen.getByText('A').closest('.exd-radio-wrapper')).toHaveClass('exd-radio--active')
    })

    test('Group 继承 block 与 icon 到子 Radio', () => {
      const { container } = render(
        <Radio.Group block icon={<span data-testid="g-icon">g</span>} defaultValue="x">
          <Radio value="x">X</Radio>
        </Radio.Group>,
      )
      expect(screen.getByText('X').closest('.exd-radio-wrapper')).toHaveClass('exd-radio-wrapper--block')
      expect(container.querySelector('[data-testid="g-icon"]')).toBeInTheDocument()
    })

    test('子 Radio 可覆盖 Group 的 block 与 icon', () => {
      const { container } = render(
        <Radio.Group block icon={<span data-testid="g-icon">g</span>} defaultValue="x">
          <Radio value="x" block={false} icon={<span data-testid="r-icon">r</span>}>
            X
          </Radio>
        </Radio.Group>,
      )
      expect(screen.getByText('X').closest('.exd-radio-wrapper')).not.toHaveClass('exd-radio-wrapper--block')
      expect(container.querySelector('[data-testid="r-icon"]')).toBeInTheDocument()
      expect(container.querySelector('[data-testid="g-icon"]')).not.toBeInTheDocument()
    })

    test('options 横向排列（block 默认 false）并可切换', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(
        <Radio.Group
          defaultValue="1"
          onChange={onChange}
          options={[
            { label: '项一', value: '1' },
            { label: '项二', value: '2' },
          ]}
        />,
      )
      expect(screen.getByText('项一')).toBeInTheDocument()
      await user.click(screen.getByText('项二'))
      expect(onChange).toHaveBeenLastCalledWith('2')
      const w1 = screen.getByText('项一').closest('.exd-radio-wrapper')!
      const w2 = screen.getByText('项二').closest('.exd-radio-wrapper')!
      expect(w1).not.toHaveClass('exd-radio--active')
      expect(w2).toHaveClass('exd-radio--active')
    })

    test('options 且 block 为 true 时使用纵向 Space 布局', () => {
      const { container } = render(
        <Radio.Group
          block
          defaultValue="1"
          options={[
            { label: '项一', value: '1' },
            { label: '项二', value: '2' },
          ]}
        />,
      )
      const space = container.querySelector('.exd-space')
      expect(space).toBeInTheDocument()
      expect(space).toHaveClass('exd-space-vertical')
    })

    test('options 单项可带 disabled 等透传属性', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(
        <Radio.Group
          defaultValue="1"
          onChange={onChange}
          options={[
            { label: '项一', value: '1' },
            { label: '项二', value: '2', disabled: true },
          ]}
        />,
      )
      await user.click(screen.getByText('项二'))
      expect(onChange).not.toHaveBeenCalled()
    })

    test('仅 children 无 options 时渲染子节点', () => {
      render(
        <Radio.Group defaultValue="a">
          <Radio value="a">仅子节点</Radio>
        </Radio.Group>,
      )
      expect(screen.getByText('仅子节点')).toBeInTheDocument()
    })

    test('受控 Group：value 驱动选中项', async () => {
      const user = userEvent.setup()
      function Wrapper() {
        const [v, setV] = React.useState<string>('a')
        return (
          <Radio.Group value={v} onChange={(next) => setV(next)}>
            <Radio value="a">A</Radio>
            <Radio value="b">B</Radio>
          </Radio.Group>
        )
      }
      render(<Wrapper />)
      await user.click(screen.getByText('B'))
      expect(screen.getByText('B').closest('.exd-radio-wrapper')).toHaveClass('exd-radio--active')
    })

    test('Group 命名导出：context 与 useRadioGroupContext 可用', () => {
      expect(radioGroupContext).toBeDefined()
      expect(typeof useRadioGroupContext).toBe('function')
    })

    test('Radio.Group 可传入 ref（不崩溃）', () => {
      const ref = React.createRef<HTMLDivElement>()
      const { container } = render(
        <Radio.Group ref={ref as any} defaultValue="a">
          <Radio value="a">A</Radio>
        </Radio.Group>,
      )
      expect(container.querySelector('.exd-radio-wrapper')).toBeInTheDocument()
    })
  })

  describe('ref', () => {
    test('ref 指向 label 元素', () => {
      const ref = React.createRef<HTMLLabelElement>()
      render(
        <Radio ref={ref} defaultChecked={false}>
          选
        </Radio>,
      )
      expect(ref.current?.tagName).toBe('LABEL')
      expect(ref.current?.classList.contains('exd-radio-wrapper')).toBe(true)
    })
  })
})
