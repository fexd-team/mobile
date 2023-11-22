import { ModalStoreData } from '../modalStore/type'
import { ModalLevel } from '../BasicModal/type'
import { ModalConflictProps } from '../Modal/type'

export interface ConflictParams {
  conflict: boolean
  current: ModalStoreData
  matchedVisibleModal: ModalStoreData[]
  conflictModalList: ModalStoreData[]
}
export interface CreateConfig {
  levels?: ModalLevel[] | ((currentLevel: ModalLevel) => ModalLevel[])
  types?: (string | RegExp)[]
  conflictProps?:
    | ModalConflictProps
    | ((conflictParams: ConflictParams) => ModalConflictProps | Promise<ModalConflictProps>)
  filter?: (current: ModalStoreData, modalData: ModalStoreData) => boolean
}
