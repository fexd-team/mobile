import React from 'react'
import { CheckmarkOutline, CloseOutline } from '@fexd/icons'
import { run } from '@fexd/tools'

import Button from '../Button'
import PickerView from '../PickerView'
import { PickerOptionValue } from '../PickerView/type'
import showPopup from '../showPopup'
import { ShowPickerConfig } from './type'

const showPicker = async ({
  clearable = true,
  popupProps = {} as ShowPickerConfig['popupProps'],
  headerRight = (popupProps?.headerRight ?? <CheckmarkOutline />) as any,
  headerLeft = (popupProps?.headerLeft ?? <CloseOutline />) as any,
  options = [],
  ...config
}: ShowPickerConfig) => {
  let value: PickerOptionValue | undefined = config?.defaultValue
  let tempValue: any = value

  const { close, promise } = showPopup({
    title: ' ',
    ...popupProps,
    headerRight: () => (
      <span
        onClick={() => {
          value = tempValue
          close()
        }}
      >
        {run(headerRight)}
      </span>
    ),
    headerLeft: () => <span onClick={() => close()}>{run(headerLeft)}</span>,
    content: (
      <PickerView
        defaultValue={value}
        options={[
          (clearable
            ? {
                label: '---',
                value: undefined,
              }
            : undefined) as any,
          ...options,
        ].filter(Boolean)}
        onChange={(selectedValue) => {
          tempValue = selectedValue
        }}
      />
    ),
  })

  await promise

  return value
}

export default showPicker
