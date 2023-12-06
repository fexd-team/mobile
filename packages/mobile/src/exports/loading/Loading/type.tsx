import AUTO_API from '../../../helpers/AUTO_API'
import { ModalProps } from '../../Modal/type'

export interface LoadingProps extends Omit<ModalProps, 'placement' | 'transition' | 'type'> {
  // type?: 'info' | 'success' | 'warning' | 'error'
  // placement?: 'bottom' | 'top'
}

export default AUTO_API<LoadingProps>()
