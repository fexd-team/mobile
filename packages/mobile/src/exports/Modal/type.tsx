import AUTO_API from '../../helpers/AUTO_API'
import { BasicModalProps, ModalIdType } from '../BasicModal/type'
import { TransitionType, TransitionSpeed } from '../createTransition/type'
import modalStore from '../modalStore'
import { ModalControlEvent, ModalStoreData } from '../modalStore/type'

export interface ModalProps extends Omit<BasicModalProps, 'modalId' | 'storeProps'> {
  modalId?: ModalIdType // 模态框 id，基础模态框必传，用于区分模态框
  shareMask?: boolean // 是否共享蒙层
  contentClassName?: string // 内容容器样式
  contentVisible?: boolean // 内容是否可见
  contentTransition?: TransitionType
  contentTransitionSpeed?: TransitionSpeed
  contentMask?: boolean
  contentMaskTransition?: TransitionType
  onConflict?: ModalConflictHandler | null
}

export interface ModalConflictParams {
  type: 'open' | 'close'
  event: ModalControlEvent
  current: ModalStoreData
  all: ModalStoreData[]
  store: typeof modalStore
}

export type ModalConflictHandler = (conflictParams: ModalConflictParams) => ModalConflictProps

export interface ModalConflictProps
  extends Pick<
    ModalProps,
    | 'className'
    | 'portalClassName'
    | 'maskClassName'
    | 'contentVisible'
    | 'contentTransition'
    | 'contentMask'
    | 'contentMaskTransition'
    | 'style'
  > {}

export default AUTO_API<ModalProps>()
