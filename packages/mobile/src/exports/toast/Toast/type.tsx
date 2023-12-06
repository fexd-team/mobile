import React from 'react'
import AUTO_API from '../../../helpers/AUTO_API'
import { ModalProps } from '../../Modal/type'

export interface ToastProps extends Omit<ModalProps, 'type'> {
  touchable?: boolean
  icon?: React.ReactNode
}

export default AUTO_API<ToastProps>()
