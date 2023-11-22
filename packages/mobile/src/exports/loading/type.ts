import { ModalProps } from '../Modal/type'

export interface LoadingProps extends Omit<ModalProps, 'transition' | 'type'> {
  // placement?: 'bottom' | 'top'
}
