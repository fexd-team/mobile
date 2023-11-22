import { ModalProps } from '../Modal/type'

export interface ToastProps extends Omit<ModalProps, 'type'> {
  // placement?: 'bottom' | 'top'
}
