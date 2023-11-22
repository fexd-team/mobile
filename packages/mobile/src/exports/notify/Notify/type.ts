import { ModalProps } from '../../Modal/type'

export interface NotifyProps extends Omit<ModalProps, 'placement' | 'type'> {
  notifyType?: 'info' | 'success' | 'warning' | 'error'
  touchable?: boolean
}
