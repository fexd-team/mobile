import React, { useState, useEffect, createContext, Fragment } from 'react'
import { run, pick } from '@fexd/tools'

import useIOControl from '../../useIOControl'
import createFC from '../../../helpers/createFC'
import { Value } from '../../Checkbox/type'
import { CheckboxGroupProps, CheckboxContentProps } from './type'
import Checkbox from '../../Checkbox/index'

export const prefix = 'exd-checkbox-group'
export const CheckboxContent = createContext<CheckboxContentProps>({})

const CheckboxGroup = createFC<CheckboxGroupProps, HTMLLabelElement>(function CheckboxGroup(
  { className, disabled = false, name, options = [], children, ...props },
  forwardedRef,
) {
  // const [checkedValue, setCheckedValue] = useState<any[]>(value)
  const { value: checkedValue, setValue: setCheckedValue } = useIOControl<Value[]>(
    pick(props, ['value', 'defaultValue', 'onChange']),
  )

  const onItemChange = (value: any, checked: boolean) => {
    let result
    if (checked) {
      result = [...checkedValue, value]
    } else {
      result = checkedValue.filter((item) => item !== value)
    }
    setCheckedValue(result)
    // run(onChange, undefined, result)
  }

  // useEffect(() => {
  //   setCheckedValue(value)
  // }, [value])

  return (
    <CheckboxContent.Provider {...props} value={{ checkedValue, onItemChange }}>
      <section ref={forwardedRef}>
        {options.map((item, index) => (
          <Fragment key={typeof item.value === 'boolean' ? index : item.value}>
            <Checkbox value={item.value} block={item.block} disabled={disabled || item.disabled} name={name}>
              {item.label}
            </Checkbox>
          </Fragment>
        ))}
        {run(children)}
      </section>
    </CheckboxContent.Provider>
  )
})

CheckboxGroup.defaultProps = {
  disabled: false,
  options: [],
}

export default CheckboxGroup
