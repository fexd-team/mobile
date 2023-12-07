import React, { useEffect, useContext } from 'react'
import { run, classnames, pick } from '@fexd/tools'
import { CheckmarkRound, CheckmarkSharp } from '@fexd/icons'

import useIOControl from '../useIOControl'
import createFC from '../createFC'
import { CheckboxProps } from './type'
import CheckboxGroup from './Group'
import { CheckboxContent } from './Group'

type BasicCheckboxType = React.FC<CheckboxProps>
interface CheckboxType extends BasicCheckboxType {
  Group: typeof CheckboxGroup
}

export const prefix = 'exd-checkbox'

const Checkbox: CheckboxType = createFC<CheckboxProps, HTMLLabelElement>(function Checkbox(
  { className, disabled = false, block = false, value, name, children, ...props },
  forwardedRef,
) {
  const { checkedValue, onItemChange } = useContext(CheckboxContent)
  const { value: isChecked, setValue: setIsChecked } = useIOControl<boolean>(
    pick(props, ['checked', 'defaultChecked', 'onChange']),
    {
      valuePropName: 'checked',
      defaultValuePropName: 'defaultChecked',
    },
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setIsChecked(checked)
    if (value) {
      run(onItemChange, undefined, value, checked)
    }
  }

  useEffect(() => {
    if (!value) {
      return
    }
    const checked = !!checkedValue?.includes?.(value)
    setIsChecked(checked)
  }, [value, checkedValue])

  return (
    <label
      ref={forwardedRef}
      className={classnames(
        `${prefix}-wrapper`,
        {
          [`${prefix}-wrapper--block`]: block,
          [`${prefix}-wrapper--disabled`]: disabled,
        },
        className,
      )}
      {...props}
      onChange={undefined}
    >
      <span className={classnames(prefix, className)}>
        <input
          type="checkbox"
          disabled={disabled}
          checked={isChecked}
          onChange={handleInputChange}
          name={name}
          className={classnames(`${prefix}-input`, {})}
        />
        <span
          className={classnames(`${prefix}-inner`, {
            [`${prefix}-inner--checked`]: isChecked,
            [`${prefix}-inner--disabled`]: disabled,
          })}
        >
          {isChecked && <CheckmarkSharp />}
        </span>
      </span>
      <span>{run(children)}</span>
    </label>
  )
}) as CheckboxType

Checkbox.defaultProps = {
  disabled: false,
  block: false,
}

Checkbox.Group = CheckboxGroup

export default Checkbox
