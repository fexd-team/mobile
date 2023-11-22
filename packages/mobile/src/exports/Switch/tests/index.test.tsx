import React, { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Switch } from '@fexd/mobile'

describe('Switch', () => {
  test('checked 属性能正常工作', () => {
    // 1. 当传给 checked 值为 true 时
    const { container } = render(<Switch checked={true} />)
    // <input /> 的 checked 也为 true
    expect(container.querySelector('input[type="checkbox"]')).toBeChecked()
    // 组件里有类名为 exd-switch__container--checked 的元素
    expect(container.querySelector('.exd-switch__container')).toHaveClass('exd-switch__container--checked')

    // 2. 当传给 checked 值为 false 时
    const { container: falseContainer } = render(<Switch checked={false} />)
    // <input /> 的 checked 也为 false
    expect(falseContainer.querySelector('input[type="checkbox"]')).not.toBeChecked()
    // 组件里没有类名为 switch-container-checked 的元素
    expect(falseContainer.querySelector('.exd-switch__container')).not.toHaveClass('exd-switch__container--checked')
  })

  test('onChange 属性能正常工作', () => {
    function SwitchWithLabel({ labelOn, labelOff }: { labelOn: string; labelOff: string }) {
      const [isChecked, setIsChecked] = useState(false)
      const onChange = (value: boolean) => {
        setIsChecked(value)
      }

      return (
        <label>
          <Switch checked={isChecked} onChange={onChange} />
          {isChecked ? labelOn : labelOff}
        </label>
      )
    }

    const { queryByLabelText, getByLabelText } = render(<SwitchWithLabel labelOn="On" labelOff="Off" />)

    // 默认为 fasle
    expect(queryByLabelText(/off/i)).toBeTruthy()

    // 点击后为true
    fireEvent.click(getByLabelText(/off/i))
    expect(queryByLabelText(/on/i)).toBeTruthy()
  })
})
