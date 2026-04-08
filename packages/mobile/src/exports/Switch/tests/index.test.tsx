import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Switch, { prefix } from '..'

describe('Switch', () => {
  describe('冒烟与结构', () => {
    test('导出 prefix 与根节点类名前缀一致', () => {
      expect(prefix).toBe('exd-switch')
    })

    test('无额外 props 时渲染不崩溃', () => {
      const { container } = render(<Switch defaultChecked={false} />)
      expect(container.querySelector('.exd-switch')).toBeInTheDocument()
    })

    test('渲染内部 checkbox 与轨道容器', () => {
      const { container } = render(<Switch defaultChecked={false} />)
      expect(container.querySelector('input[type="checkbox"]')).toBeInTheDocument()
      expect(container.querySelector('.exd-switch__container')).toBeInTheDocument()
    })
  })

  describe('Props 与展示', () => {
    test('checked=true 时 checkbox 选中且容器带选中样式类', () => {
      const { container } = render(<Switch checked onChange={() => {}} />)
      expect(container.querySelector('input[type="checkbox"]')).toBeChecked()
      expect(container.querySelector('.exd-switch__container')).toHaveClass('exd-switch__container--checked')
    })

    test('checked=false 时未选中且容器无选中样式类', () => {
      const { container } = render(<Switch checked={false} onChange={() => {}} />)
      expect(container.querySelector('input[type="checkbox"]')).not.toBeChecked()
      expect(container.querySelector('.exd-switch__container')).not.toHaveClass('exd-switch__container--checked')
    })

    test('非受控 defaultChecked 初始为真', () => {
      const { container } = render(<Switch defaultChecked />)
      expect(container.querySelector('input[type="checkbox"]')).toBeChecked()
      expect(container.querySelector('.exd-switch__container')).toHaveClass('exd-switch__container--checked')
    })

    test('非受控 defaultChecked 初始为假', () => {
      const { container } = render(<Switch defaultChecked={false} />)
      expect(container.querySelector('input[type="checkbox"]')).not.toBeChecked()
    })

    test('className 与基础前缀类名合并', () => {
      const { container } = render(<Switch defaultChecked={false} className="my-switch" />)
      expect(container.querySelector('.exd-switch')).toHaveClass('exd-switch', 'my-switch')
    })

    test('显式传入 className 为 undefined 时不额外合并 undefined 字符串', () => {
      const { container } = render(<Switch defaultChecked={false} className={undefined} />)
      expect(container.querySelector('.exd-switch')).toHaveClass('exd-switch')
    })

    test('额外 label 属性透传（如 data-testid）', () => {
      render(<Switch defaultChecked={false} data-testid="switch-root" />)
      expect(screen.getByTestId('switch-root')).toBeInTheDocument()
    })

    test('disabled 透传到外层 label', () => {
      const { container } = render(<Switch defaultChecked={false} disabled />)
      expect(container.querySelector('.exd-switch')).toHaveAttribute('disabled')
    })

    test('传入 children 不抛错（当前实现不将 children 渲染进 label）', () => {
      const { container } = render(
        <Switch defaultChecked={false}>
          <span>extra</span>
        </Switch>,
      )
      expect(container.querySelector('.exd-switch')).toBeInTheDocument()
      expect(container.querySelector('.exd-switch')?.textContent).toBe('')
    })
  })

  describe('交互（userEvent）', () => {
    test('点击后 onChange 收到 true', async () => {
      const user = userEvent.setup()
      const handleChange = jest.fn()
      const { container } = render(<Switch defaultChecked={false} onChange={handleChange} />)
      await user.click(container.querySelector('.exd-switch') as HTMLElement)
      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith(true)
    })

    test('从选中到未选中再次点击 onChange 收到 false', async () => {
      const user = userEvent.setup()
      const handleChange = jest.fn()
      const { container } = render(<Switch defaultChecked onChange={handleChange} />)
      await user.click(container.querySelector('.exd-switch') as HTMLElement)
      expect(handleChange).toHaveBeenCalledWith(false)
    })

    test('直接点击隐藏 checkbox 同样触发变更', async () => {
      const user = userEvent.setup()
      const handleChange = jest.fn()
      render(<Switch defaultChecked={false} onChange={handleChange} />)
      const checkbox = screen.getByRole('checkbox')
      await user.click(checkbox)
      expect(handleChange).toHaveBeenCalledWith(true)
    })

    test('input 上设置 disabled 后点击不触发 onChange', async () => {
      const user = userEvent.setup()
      const handleChange = jest.fn()
      const { container } = render(<Switch defaultChecked={false} onChange={handleChange} />)
      const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement
      input.disabled = true
      await user.click(input)
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('受控与非受控', () => {
    test('受控：仅 checked 无 onChange 时点击不改变选中态', async () => {
      const user = userEvent.setup()
      const { container } = render(<Switch checked={false} />)
      const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement
      expect(checkbox).not.toBeChecked()
      await user.click(container.querySelector('.exd-switch') as HTMLElement)
      expect(checkbox).not.toBeChecked()
    })

    test('受控：checked 与 onChange 联动更新', async () => {
      const user = userEvent.setup()
      function ControlledSwitch() {
        const [checked, setChecked] = React.useState(false)
        return <Switch checked={checked} onChange={setChecked} />
      }
      const { container } = render(<ControlledSwitch />)
      const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement
      expect(checkbox).not.toBeChecked()
      await user.click(container.querySelector('.exd-switch') as HTMLElement)
      expect(checkbox).toBeChecked()
      await user.click(container.querySelector('.exd-switch') as HTMLElement)
      expect(checkbox).not.toBeChecked()
    })

    test('非受控：defaultChecked 与点击切换', async () => {
      const user = userEvent.setup()
      const { container } = render(<Switch defaultChecked={false} />)
      const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement
      await user.click(container.querySelector('.exd-switch') as HTMLElement)
      expect(checkbox).toBeChecked()
      await user.click(container.querySelector('.exd-switch') as HTMLElement)
      expect(checkbox).not.toBeChecked()
    })

    test('受控：外部仅通过 checked 驱动，忽略 defaultChecked', () => {
      const { container } = render(<Switch checked={false} defaultChecked />)
      expect(container.querySelector('input[type="checkbox"]')).not.toBeChecked()
    })
  })

  describe('原生事件路径', () => {
    test('fireEvent.click 作用于 checkbox 时触发 onChange', () => {
      const handleChange = jest.fn()
      const { container } = render(<Switch defaultChecked={false} onChange={handleChange} />)
      const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement
      fireEvent.click(input)
      expect(handleChange).toHaveBeenCalledWith(true)
      expect(input).toBeChecked()
    })
  })

  describe('边界与 ref', () => {
    test('透传 id 到 label 元素', () => {
      const { container } = render(<Switch id="switch-label" defaultChecked={false} />)
      expect(container.querySelector('label#switch-label')).toBeInTheDocument()
    })

    test('className 传入 null 时不抛错', () => {
      const { container } = render(<Switch defaultChecked={false} className={null as unknown as string} />)
      expect(container.querySelector('.exd-switch')).toBeInTheDocument()
    })

    test('ref 转发到 label 元素', () => {
      const ref = React.createRef<HTMLLabelElement>()
      render(<Switch ref={ref} defaultChecked={false} />)
      expect(ref.current).toBeInstanceOf(HTMLLabelElement)
      expect(ref.current?.classList.contains('exd-switch')).toBe(true)
    })
  })
})
