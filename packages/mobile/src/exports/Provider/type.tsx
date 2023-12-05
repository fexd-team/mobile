import AUTO_API from '../../helpers/AUTO_API'
import { FC } from '../createFC/type'

export interface ProviderProps {
  children?: any
}
export type ProviderRef = any
export interface ProviderType extends FC<ProviderProps> {}

export default AUTO_API<ProviderProps>()
