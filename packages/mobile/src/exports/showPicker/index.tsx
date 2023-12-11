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
    headerRight: (
      <Button
        type="primary"
        fill="none"
        onClick={() => {
          value = tempValue
          close()
        }}
        // size="large"
        icon={run(headerRight) as any}
      />
    ),
    headerLeft: (
      <Button
        type="primary"
        fill="none"
        // size="large"
        onClick={() => close()}
        icon={run(headerLeft) as any}
      />
    ),
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
