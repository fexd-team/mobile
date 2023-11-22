import React from 'react'
import { PopupProps } from '../Popup/type'
import { SelectionFieldProps } from '../useSelectionFieldProps/type'

export type BasicPickerRef = HTMLDivElement

export interface BasicPickerProps extends Pick<PopupProps, 'onEnter' | 'onExit' | 'onExited'> {
  popupProps?: Omit<PopupProps, 'visible'>
  headerRight?: React.ReactNode
  headerLeft?: React.ReactNode
}
export interface BasicPickerProps<T = string> extends SelectionFieldProps<T> {
  className?: string
  disabled?: boolean
  ref?: React.Ref<BasicPickerRef>
}
