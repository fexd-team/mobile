import React from 'react'
import { classnames, pick, run } from '@fexd/tools'
import { CheckmarkCircle, EllipseOutline } from '@fexd/icons'
import createFC from '../createFC'
import { RadioProps, RadioRef, RadioType } from './type'
import useIOControl from '../useIOControl'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-radio'
const Radio = createFC<RadioProps, RadioRef>(function Radio(
  { className, block, disabled, description, children, icon, ...props },
  ref,
) {
  const { value: checked, setValue: setChecked } = useIOControl<boolean>(
    pick(props, ['checked', 'defaultChecked', 'onChange']),
    {
      valuePropName: 'checked',
      defaultValuePropName: 'defaultChecked',
    },
  )
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
      onClick={() => setChecked((value) => !value)}
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

Radio.defaultProps = {
  block: false,
  icon: (checked) => (checked ? <CheckmarkCircle /> : <EllipseOutline />),
}

export default Radio
