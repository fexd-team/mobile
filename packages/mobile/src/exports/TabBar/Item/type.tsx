import AUTO_API from '../../../helpers/AUTO_API'
import { FC } from '../../createFC/type'

export interface ItemProps {}
export type ItemRef = any
export interface ItemType extends FC<ItemProps> {}

export default AUTO_API<ItemProps>()
