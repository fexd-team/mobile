import AUTO_API from '../../../helpers/AUTO_API'
import { ModalProps } from '../../Modal/type'

export interface NotifyProps extends Omit<ModalProps, 'placement' | 'type'> {
  notifyType?: 'info' | 'success' | 'warning' | 'error'
  touchable?: boolean
}

export default AUTO_API<NotifyProps>()
