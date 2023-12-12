import AUTO_API from '../../helpers/AUTO_API'
import { FC } from '../createFC/type'

export interface PureProviderProps {
  /** 内容 */
  children?: any
}

export interface ProviderProps extends PureProviderProps {
  /** 是否全局 Provider */
  __global?: boolean
}
export type ProviderRef = any
export interface ProviderType extends FC<ProviderProps> {}

export default AUTO_API<PureProviderProps>()
