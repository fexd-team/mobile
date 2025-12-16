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

export interface ErrorBoundaryStyleVars {
  /**
   * 重试按钮最小宽度
   * @default 160px
   */
  '@error-boundary-retry-button-min-width'?: string
}

export const DOC_ErrorBoundaryStyleVars: ErrorBoundaryStyleVars = {}

export default AUTO_API<ErrorBoundaryProps>()
