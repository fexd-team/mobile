import React, { ReactNode } from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { PopupProps, PurePopupProps } from '../Popup/type'
import { ButtonProps, PureButtonProps } from '../Button/type'

export interface PureActionSheetAction extends Omit<PureButtonProps, 'children' | 'onClick'> {
  content: React.ReactNode | (() => React.ReactNode)
  onClick?: () => void
}
export interface ActionSheetAction extends Omit<ButtonProps, 'content' | 'onClick'> {}
export interface ActionSheetAction extends PureActionSheetAction {}

export type ActionSheetRef = any

export interface PureActionSheetProps extends Omit<PurePopupProps, 'placement' | 'transition' | 'type' | 'children'> {
  /**
   * @description 动作定义
   * @default [{ content: 'OK' }]
   */
  actions?: (ActionSheetAction | ReactNode)[]
  /**
   * @description 自定义按钮组件
   * @default Button
   */
  buttonFactory?: React.FC<ButtonProps>
}

export interface ActionSheetProps extends Omit<PopupProps, 'placement' | 'transition' | 'type'> {}
export interface ActionSheetProps extends PureActionSheetProps {}
export default AUTO_API<PureActionSheetProps>()
export const DOC_PureActionSheetAction = AUTO_API<PureActionSheetAction>()
