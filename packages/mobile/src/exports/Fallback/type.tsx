import AUTO_API from '../../helpers/AUTO_API'
import { FC } from '../createFC/type'
import { JSXDivProps } from '../../helpers/html.types'

export interface ErrorInfoType {
  error?: Error | unknown
  isOfflineError?: boolean
  isSystemError?: boolean
}

export interface FallbackProps extends Omit<JSXDivProps, 'children'> {
  error?: Error | unknown
  icon?: ((errorInfo: ErrorInfoType) => React.ReactNode) | React.ReactNode
  children?: ((errorInfo: ErrorInfoType) => React.ReactNode) | React.ReactNode
  footer?: ((errorInfo: ErrorInfoType) => React.ReactNode) | React.ReactNode
  console?: boolean
}
export type FallbackRef = any
export interface FallbackType extends FC<FallbackProps> {}

export default AUTO_API<FallbackProps>()
