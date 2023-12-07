import React, { useState } from 'react'
import { run } from '@fexd/tools'
import { CheckmarkOutline, CloseOutline } from '@fexd/icons'

import useSelectionFieldProps from '../useSelectionFieldProps'
import Popup from '../Popup'
import { BasicPickerProps } from './type'

export default function usePickerProps<T = string>(props: BasicPickerProps<T>) {
  const {
    className,
    onEnter,
    onExit,
    onExited,
    disabled = false,
    popupProps = {} as BasicPickerProps['popupProps'],
    headerRight = popupProps?.headerRight ?? <CheckmarkOutline />,
    headerLeft = popupProps?.headerLeft ?? <CloseOutline />,
    ref,
    ...restProps
  } = props
  const { value, setValue, insideValue, setInsideValue, ...restSelectionFieldProps } = useSelectionFieldProps(props)
  const [visible, setVisible] = useState(false)

  const renderTrigger = (content: React.ReactNode): JSX.Element => (
    <div
      ref={ref}
      className={className}
      onClick={() => {
        if (disabled) {
          return
        }
        setVisible(true)
      }}
    >
      {content}
    </div>
  )

  const renderPopup = (content: React.ReactNode): JSX.Element => (
    <Popup
      onEnter={onEnter}
      onExit={onExit}
      title=""
      {...popupProps}
      visible={visible}
      onClose={() => setVisible(false)}
      onExited={() => {
        setVisible(false)
        if (value) {
          setInsideValue(value)
        }
        run(onExited ?? popupProps?.onExited)
      }}
      headerRight={() => (
        <span
          onClick={() => {
            setValue(insideValue)
            setVisible(false)
          }}
        >
          {run(headerRight)}
        </span>
      )}
      headerLeft={() => (
        <span
          onClick={() => {
            setVisible(false)
          }}
        >
          {run(headerLeft)}
        </span>
      )}
    >
      {content}
    </Popup>
  )

  return {
    ...restProps,
    ...restSelectionFieldProps,
    value,
    setValue,
    insideValue,
    setInsideValue,
    renderTrigger,
    renderPopup,
    headerRight,
  }
}
