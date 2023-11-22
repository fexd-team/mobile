import { ModalProps } from '../../Modal/type'

export interface LoadingProps extends Omit<ModalProps, 'placement' | 'transition' | 'type'> {
  // type?: 'info' | 'success' | 'warning' | 'error'
  // placement?: 'bottom' | 'top'
}
