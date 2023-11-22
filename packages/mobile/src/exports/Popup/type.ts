import { ReactNode } from 'react'
import { ModalProps } from '../Modal/type'

export interface PopupProps extends Omit<ModalProps, 'placement' | 'transition' | 'type'> {
  title?: string | ReactNode
  header?: React.ReactNode | (() => React.ReactNode)
  headerRight?: React.ReactNode | (() => React.ReactNode)
  headerLeft?: React.ReactNode | (() => React.ReactNode)
  round?: boolean
}
