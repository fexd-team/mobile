import AUTO_API from '../../helpers/AUTO_API'
import { ModalProps } from '../Modal/type'

export interface NotifyProps extends Omit<ModalProps, 'type'> {
  // placement?: 'bottom' | 'top'
}

export default AUTO_API<any>()

export interface NotifyStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-notify'
   */
  '@notify-prefix'?: string
  /**
   * @description Notify 透明度
   * @default 0.92
   */
  '@notify-opacity'?: number
  /**
   * @description Notify 字体大小
   * @default 14px
   */
  '@notify-font-size'?: string
  /**
   * @description Notify 水平内边距
   * @default 16px
   */
  '@notify-padding-x'?: string
  /**
   * @description Notify 垂直内边距
   * @default 12px
   */
  '@notify-padding-y'?: string
  /**
   * @description Notify 文字颜色
   * @default #fff
   */
  '@notify-color'?: string
}

export const DOC_NotifyStyleVars = AUTO_API<NotifyStyleVars>()
