import AUTO_API from '../../helpers/AUTO_API'
import { FC } from '../createFC/type'

export interface ErrorBoundaryProps {
  console?: boolean
  onError?: (error: Error) => void
  children?: React.ReactNode
  fallback?: ((error: Error, retry: () => void) => React.ReactNode) | React.ReactNode
}

export interface ErrorBoundaryState {
  error?: Error
}
export type ErrorBoundaryRef = any
export interface ErrorBoundaryType extends FC<ErrorBoundaryProps> {}

export default AUTO_API<ErrorBoundaryProps>()
