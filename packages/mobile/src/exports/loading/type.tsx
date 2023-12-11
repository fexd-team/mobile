import AUTO_API from '../../helpers/AUTO_API'
import { ModalProps, PureModalProps } from '../Modal/type'

export interface PureLoadingProps extends Omit<PureModalProps, 'transition' | 'type'> {}
export interface LoadingProps extends Omit<ModalProps, 'transition' | 'type'> {}
export interface LoadingProps extends PureLoadingProps {}

export interface PureLoadingMethodConfig extends Omit<PureLoadingProps, 'visible' | 'children'> {
  content?: React.ReactNode
}
export interface LoadingMethodConfig extends PureLoadingMethodConfig {}
export interface LoadingMethodConfig extends Omit<LoadingProps, 'visible' | 'children'> {
  content?: React.ReactNode
}

export default AUTO_API<PureLoadingProps>()
export const DOC_PureLoadingMethodConfig = AUTO_API<PureLoadingMethodConfig>()
