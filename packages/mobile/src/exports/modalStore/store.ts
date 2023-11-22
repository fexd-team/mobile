import { EventBus } from '@fexd/tools'

import { ModalIdType } from '../BasicModal/type'
import { ModalControlEvent, ModalStoreData, ModalControlInfo } from './type'

const LEVEL_WEIGHT = {
  low: 999,
  normal: 9999,
  high: 99999,
  highest: 999999,
}

export const eventBus = new EventBus()

export const map = new Map<ModalIdType, ModalStoreData>()

export function getById(modalId: ModalIdType): ModalStoreData | void {
  return map.get(modalId)
}

export function getAll(): ModalStoreData[] {
  return [...map.values()]
}
export function closeAll() {
  getAll().forEach(({ setVisible }) => setVisible(false))
}
export function destroyAll() {
  getAll().forEach(({ setCreated }) => setCreated(false))
}

export function addModal(modalId: ModalIdType, modalInfo: ModalControlInfo) {
  const zIndex =
    Math.max(
      LEVEL_WEIGHT[modalInfo.level],
      ...getAll()
        .filter((data) => data.level === modalInfo.level)
        .map((data) => data.zIndex),
    ) + 1

  const modalData = {
    zIndex,
    ...modalInfo,
  }

  map.set(modalId, modalData)
  eventBus.emit('open', modalData as ModalControlEvent)
}

export function removeModal(modalId: ModalIdType) {
  const modalData = map.get(modalId)

  if (!modalData) {
    return
  }

  map.delete(modalId)
  eventBus.emit('close', modalData as ModalControlEvent)
}
