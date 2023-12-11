import AUTO_API from '../../helpers/AUTO_API'
import { ReactNode } from 'react'
import { ModalProps, PureModalProps } from '../Modal/type'

export interface PurePopupProps extends Omit<PureModalProps, 'placement' | 'transition' | 'type'> {
  /** 标题 */
  title?: string | ReactNode
  /**
   * @description 标题栏
   * @default <NavBar />
   */
  header?: React.ReactNode | (() => React.ReactNode)
  /**
   * @description 标题栏右侧
   * @default <CloseOutline />
   */
  headerRight?: React.ReactNode | (() => React.ReactNode)
  /** 标题栏右侧 */
  headerLeft?: React.ReactNode | (() => React.ReactNode)
  /**
   * @description 是否圆角
   * @default false
   */
  round?: boolean
}

export interface PopupProps extends Omit<ModalProps, 'placement' | 'transition' | 'type'> {}
export interface PopupProps extends PurePopupProps {}

export default AUTO_API<PurePopupProps>()
