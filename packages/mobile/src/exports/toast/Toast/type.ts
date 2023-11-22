import React from 'react'
import { ModalProps } from '../../Modal/type'

export interface ToastProps extends Omit<ModalProps, 'type'> {
  touchable?: boolean
  icon?: React.ReactNode
}
