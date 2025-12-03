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
  /** 标题栏左侧点击事件 */
  onHeaderLeftClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  /** 标题栏右侧点击事件 */
  onHeaderRightClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  /**
   * @description 是否圆角
   * @default false
   */
  round?: boolean
}

export interface PopupProps extends Omit<ModalProps, 'placement' | 'transition' | 'type'> {}
export interface PopupProps extends PurePopupProps {}

/**
 * Popup 样式变量
 */
export interface PopupStyleVars {
  /**
   * @description 组件样式前缀
   * @default ~'exd-popup'
   */
  '@popup-prefix'?: string
  /**
   * @description 圆角弹窗的圆角值
   * @default 14px
   */
  '@popup-border-radius'?: string
  /**
   * @description 背景色
   * @default #fff
   */
  '@popup-background'?: string
  /**
   * @description 头部边框颜色
   * @default @color-gray-background
   */
  '@popup-header-border-color'?: string
  /**
   * @description 过渡动画时长
   * @default 0.3s
   */
  '@popup-transition-duration'?: string
}

export const DOC_PopupStyleVars = AUTO_API<PopupStyleVars>()

export default AUTO_API<PurePopupProps>()
