import AUTO_API from '../../helpers/AUTO_API'
import { ModalProps } from '../Modal/type'

export interface NotifyProps extends Omit<ModalProps, 'type'> {
  // placement?: 'bottom' | 'top'
}

export default AUTO_API<any>()
