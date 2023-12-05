import React from 'react'
import { classnames } from '@fexd/tools'
import useIOControl from '../useIOControl'
import createFC from '../createFC'
import { SwitchProps, SwitchRef } from './type'

export const prefix = 'exd-switch'

const Switch = createFC<SwitchProps, SwitchRef>(function Switch({ className, children, ...props }, forwardedRef) {
  const { value: checked, setValue } = useIOControl<boolean>(props, {
    valuePropName: 'checked',
    defaultValuePropName: 'defaultChecked',
  })

  return (
    <label ref={forwardedRef} className={classnames(prefix, className)} {...props} onChange={undefined}>
      <input
        type="checkbox"
        className={`${prefix}__checkbox`}
        checked={checked}
        onChange={(e) => {
          const value = e.target.checked
          setValue(value)
        }}
      />
      <div
        className={classnames(`${prefix}__container`, {
          [`${prefix}__container--checked`]: checked,
        })}
      />
    </label>
  )
})

export default Switch
