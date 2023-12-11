import AUTO_API from '../../helpers/AUTO_API'
import { FC } from '../createFC/type'

export type IStationMap = Record<string, unknown>
export interface ModalStationProps {
  /** 驿站 id */
  id: string
  /**
   * @description 卸载后删除在 stationMap 上的 key
   * @default true
   */
  deleteStationMapKeyAfterUnmount?: boolean
}
export type ModalStationRef = any
export interface ModalStationType extends FC<ModalStationProps> {}

export default AUTO_API<ModalStationProps>()
