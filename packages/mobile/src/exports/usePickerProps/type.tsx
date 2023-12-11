import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'

import { PopupProps, PurePopupProps } from '../Popup/type'
import { SelectionFieldProps } from '../useSelectionFieldProps/type'

export type BasicPickerRef = HTMLDivElement

export interface PureBasicPickerProps extends Pick<PurePopupProps, 'onEnter' | 'onExit' | 'onExited'> {
  /** 弹出层的 props */
  popupProps?: Omit<PopupProps, 'visible'>
  /** 头部右侧内容 */
  headerRight?: React.ReactNode
  /** 头部左侧内容 */
  headerLeft?: React.ReactNode
}

export interface PureBasicPickerProps<T = string> extends SelectionFieldProps<T> {
  /** 弹出层的类名 */
  className?: string
  /**
   * @description 是否禁用
   * @default false
   */
  disabled?: boolean
  ref?: React.Ref<BasicPickerRef>
}

export interface BasicPickerProps extends Pick<PopupProps, 'onEnter' | 'onExit' | 'onExited'> {}
export interface BasicPickerProps<T = string> extends PureBasicPickerProps<T> {}

export default AUTO_API<PureBasicPickerProps>()
