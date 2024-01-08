import React from 'react'
import { classnames, run } from '@fexd/tools'
import { Checkbox as IconCheckbox, SquareOutline } from '@fexd/icons'
import createFC from '../createFC'
import { CheckboxProps, CheckboxRef, CheckboxType } from './type'
import useIOControl from '../useIOControl'
import CheckboxGroup, { useCheckboxGroupContext } from './Group'

// 此处不引入 style.less，目的是实现按需引用
export const defaultIcon = (checked) => (checked ? <IconCheckbox /> : <SquareOutline />)
export const prefix = 'exd-checkbox'
const Checkbox = createFC<CheckboxProps, CheckboxRef>(function Checkbox(
  {
    className,
    block: propBlock,
    disabled: propDisabled,
    description,
    children,
    icon: propIcon,
    value: propValue,
    ...props
  },
  ref,
) {
  const groupContext = useCheckboxGroupContext()
  const { icon: ctxIcon, block: ctxBlock, disabled: ctxDisabled, value: ctxValue, setValue: setCtxValue } = groupContext
  const block = propBlock ?? ctxBlock ?? false
  const disabled = propDisabled ?? ctxDisabled
  const icon = propIcon ?? ctxIcon ?? defaultIcon
  const { value: ioChecked, setValue: setIOChecked } = useIOControl<boolean>(props as any, {
    valuePropName: 'checked',
    defaultValuePropName: 'defaultChecked',
  })

  const checked = ctxValue ? ctxValue?.includes?.(propValue) : ioChecked

  /* 组件逻辑实现 */
  return (
    <label
      {...props}
      className={classnames(
        `${prefix}-wrapper`,
        {
          [`${prefix}--active`]: checked,
          [`${prefix}-wrapper--block`]: block,
          [`${prefix}-wrapper--disabled`]: disabled,
        },
        className,
      )}
      onChange={undefined}
      ref={ref}
      onClick={() => {
        if (disabled) {
          return
        }
        if (setCtxValue) {
          setCtxValue(checked ? ctxValue?.filter?.((item) => item !== propValue) : [...ctxValue, propValue])
          return
        }

        setIOChecked((value) => !value)
      }}
    >
      <div className={`${prefix}-label`}>
        <div
          className={classnames(`${prefix}-icon`, {
            [`${prefix}-icon--active`]: checked,
          })}
        >
          {run(icon, undefined, checked)}
        </div>
        <div className={`${prefix}-content`}>{children}</div>
      </div>
      {description && <div className={`${prefix}-description`}>{description}</div>}
    </label>
  )
}) as CheckboxType

Checkbox.defaultProps = {}
Checkbox.Group = CheckboxGroup

export default Checkbox
