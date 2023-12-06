import AUTO_API from '../../helpers/AUTO_API'
import { ModalProps } from '../Modal/type'

export interface LoadingProps extends Omit<ModalProps, 'transition' | 'type'> {
  // placement?: 'bottom' | 'top'
}

export default AUTO_API<any>()
