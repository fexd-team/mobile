import React, { useRef, useCallback } from 'react'
import { run } from '@fexd/tools'

import usePickerProps from '../usePickerProps'
import CascadePickerView from '../CascadePickerView'
import { CascadeOption } from '../CascadePickerView/type'
import createFC from '../createFC'
import { CascadePickerProps, CascadePickerRef, CascadePickerType } from './type'

function findOptionPath(options: CascadeOption[], values: any[]): CascadeOption[] {
  const result: CascadeOption[] = []
  let nodes = options
  for (const val of values ?? []) {
    const found = nodes.find((n) => n.value === val)
    if (!found) break
    result.push(found)
    nodes = found.children ?? []
  }
  return result
}

const CascadePicker = createFC<CascadePickerProps, CascadePickerRef>(function CascadePicker(props, ref) {
  const { children, options = [], ...restProps } = props
  const selectedOptionsRef = useRef<CascadeOption[]>([])

  const { value, insideValue, setInsideValue, renderTrigger, renderPopup } = usePickerProps({
    ref,
    ...restProps,
    onChange: (val: any) => {
      const path = findOptionPath(options, val)
      selectedOptionsRef.current = path
      run(restProps, 'onChange', val, path)
    },
  })

  const handleChildRender = useCallback(
    (val: any) => run(children, undefined, val, selectedOptionsRef.current),
    [children],
  )

  return (
    <>
      {renderTrigger(handleChildRender(value))}
      {renderPopup(
        <CascadePickerView
          rows={5}
          options={options}
          value={insideValue as any}
          onChange={(values, selectedOptions) => {
            selectedOptionsRef.current = selectedOptions
            setInsideValue(values as any)
          }}
        />,
      )}
    </>
  )
}) as CascadePickerType

CascadePicker.defaultProps = {
  disabled: false,
}

export default CascadePicker
