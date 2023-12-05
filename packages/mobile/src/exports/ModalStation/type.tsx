import AUTO_API from '../../helpers/AUTO_API'
import { FC } from '../createFC/type'

export type IStationMap = Record<string, unknown>
export interface ModalStationProps {
  id: string
}
export type ModalStationRef = any
export interface ModalStationType extends FC<ModalStationProps> {}

export default AUTO_API<ModalStationProps>()
