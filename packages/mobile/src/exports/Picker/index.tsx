import React, { useEffect } from 'react'
import { run, first, isExist } from '@fexd/tools'

import usePickerProps from '../usePickerProps'
import PickerView from '../PickerView'
import createFC from '../createFC'
import { PickerProps, PickerRef } from './type'

export const prefix = 'exd-picker'
const Picker = createFC<PickerProps, PickerRef>(function Picker(props, ref) {
  const { children, clearable, options = [], ...restProps } = props
  const getItem = (value: any) =>
    isExist(value) ? (options ?? []).find((item: any) => String(item.value) === String(value)) : undefined
  const { value, insideValue, setInsideValue, renderTrigger, renderPopup } = usePickerProps({
    ref,
    ...restProps,
    onChange: (value) => run(restProps, 'onChange', value, getItem(value)),
  })
  const selectedItem = getItem(value)

  useEffect(() => {
    setInsideValue(first<any>(options)?.value)
  }, [])

  return (
    <>
      {renderTrigger(run(children, undefined, selectedItem?.label, value, selectedItem))}
      {renderPopup(
        <PickerView
          rows={5}
          options={
            clearable
              ? [
                  {
                    label: <span className={`${prefix}__clear`}>---</span>,
                    value: null,
                  } as any,
                  ...options,
                ]
              : options
          }
          value={insideValue}
          onChange={(value) => {
            setInsideValue(value)
          }}
        />,
      )}
    </>
  )
})

export default Picker
