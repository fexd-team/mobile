import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { PopupProps } from '../Popup/type'
import { ButtonProps } from '../Button/type'

export interface Action extends Omit<ButtonProps, 'content'> {
  content: React.ReactNode | (() => React.ReactNode)
  onClick?: () => void
}

export type ActionSheetRef = any

export interface ActionSheetProps extends Omit<PopupProps, 'placement' | 'transition' | 'type'> {
  title?: string
  actions?: Action[]
  buttonFactory?: React.FC<ButtonProps>
}

export default AUTO_API<ActionSheetProps>()
