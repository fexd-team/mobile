import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'

import { ModalIdType, ModalLevel, BasicModalProps } from '../BasicModal/type'
import { ModalProps } from '../Modal/type'

export interface ModalStoreData {
  modalId: ModalIdType
  zIndex: number
  level: ModalLevel
  type?: string
  props?: ModalProps | BasicModalProps | any
  setVisible: (visible: boolean) => void
  setCreated: (mounted: boolean) => void
  contentRef: React.RefObject<HTMLDivElement>
}
export interface ModalControlInfo extends Omit<ModalStoreData, 'zIndex'> {}
export interface ModalControlEvent extends ModalStoreData {}

export default AUTO_API<any>()
