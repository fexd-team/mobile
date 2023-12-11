import AUTO_API from '../../helpers/AUTO_API'
import { PureBasicModalProps, BasicModalProps, ModalIdType } from '../BasicModal/type'
import { TransitionType, TransitionSpeed } from '../createTransition/type'
import modalStore from '../modalStore'
import { ModalControlEvent, ModalStoreData } from '../modalStore/type'

export interface PureModalProps extends Omit<PureBasicModalProps, 'modalId' | 'storeProps'> {
  /**
   * @description 模态框 id，基础模态框必传，用于区分模态框
   * @default 随机生成
   */
  modalId?: ModalIdType
  /**
   * @description 是否使用共享遮罩
   * @default false
   */
  shareMask?: boolean
  /** 内容容器样式 */
  contentClassName?: string
  /**
   * @description 内容是否可见
   * @default true
   */
  contentVisible?: boolean
  /**
   * @description 内容动画的渐变效果
   * @default TransitionFade
   */
  contentTransition?: TransitionType
  /**
   * @description 内容动画速度
   * @default fast
   */
  contentTransitionSpeed?: TransitionSpeed
  /**
   * @description 内容是否使用遮罩
   * @default false
   */
  contentMask?: boolean
  /**
   * @description 内容遮罩动画的渐变效果
   * @default TransitionFade
   */
  contentMaskTransition?: TransitionType
  /**
   * @description 多个弹出层冲突（同时存在）时的行为处理
   */
  onConflict?: ModalConflictHandler | null
}

export interface ModalProps extends Omit<BasicModalProps, 'modalId' | 'storeProps'> {}
export interface ModalProps extends PureModalProps {}

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

export default AUTO_API<PureModalProps>()
export const DOC_ModalConflictProps = AUTO_API<ModalConflictProps>()
export const DOC_ModalConflictParams = AUTO_API<ModalConflictParams>()
