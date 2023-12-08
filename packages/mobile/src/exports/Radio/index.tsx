import React from 'react'
import { classnames, run } from '@fexd/tools'
import { CheckmarkCircle, EllipseOutline } from '@fexd/icons'

import createFC from '../createFC'
import { RadioProps, RadioRef, RadioType } from './type'
import useIOControl from '../useIOControl'
import RadioGroup, { useRadioGroupContext } from './Group'
// 此处不引入 style.less，目的是实现按需引用

export const defaultIcon = (checked) => (checked ? <CheckmarkCircle /> : <EllipseOutline />)
export const prefix = 'exd-radio'
const Radio = createFC<RadioProps, RadioRef>(function Radio(
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
  const groupContext = useRadioGroupContext()
  const { icon: ctxIcon, block: ctxBlock, disabled: ctxDisabled, value: ctxValue, setValue: setCtxValue } = groupContext
  const block = propBlock ?? ctxBlock ?? false
  const disabled = propDisabled ?? ctxDisabled
  const icon = propIcon ?? ctxIcon ?? defaultIcon
  const { value: ioChecked, setValue: setIOChecked } = useIOControl<boolean>(props as any, {
    valuePropName: 'checked',
    defaultValuePropName: 'defaultChecked',
  })

  const checked = ctxValue ? ctxValue === propValue : ioChecked

  /* 组件逻辑实现 */
  return (
    <label
      {...props}
      className={classnames(
        `${prefix}-wrapper`,
        {
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
          setCtxValue(propValue)
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
}) as RadioType

Radio.defaultProps = {}
Radio.Group = RadioGroup

export default Radio
