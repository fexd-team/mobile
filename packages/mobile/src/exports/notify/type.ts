import { ModalProps } from '../Modal/type'

export interface NotifyProps extends Omit<ModalProps, 'type'> {
  // placement?: 'bottom' | 'top'
}
