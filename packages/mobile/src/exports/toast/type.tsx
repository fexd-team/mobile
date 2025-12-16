import AUTO_API from '../../helpers/AUTO_API'
import { ModalProps } from '../Modal/type'

import { ToastStyleVars as RawToastStyleVars } from './Toast/type'

export interface ToastProps extends Omit<ModalProps, 'type'> {
  // placement?: 'bottom' | 'top'
}

export default AUTO_API<any>()

export interface ToastStyleVars extends RawToastStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-toast'
   */
  '@toast-prefix'?: string
  /**
   * @description Toast 容器内边距
   * @default 16px
   */
  '@toast-padding'?: string
  /**
   * @description Toast 距离边缘的偏移量
   * @default 16px
   */
  '@toast-offset'?: string
  /**
   * @description Toast 距离顶部的偏移量
   * @default 16px
   */
  '@toast-offset-top'?: string
  /**
   * @description Toast 距离底部的偏移量
   * @default 16px
   */
  '@toast-offset-bottom'?: string
  /**
   * @description Toast 内容区域水平内边距
   * @default 16px
   */
  '@toast-content-padding-x'?: string
  /**
   * @description Toast 内容区域垂直内边距
   * @default 8px
   */
  '@toast-content-padding-y'?: string
  /**
   * @description Toast 内容区域背景色
   * @default rgba(0, 0, 0, 0.8)
   */
  '@toast-content-background'?: string
  /**
   * @description Toast 内容区域文字颜色
   * @default #fff
   */
  '@toast-content-color'?: string
  /**
   * @description Toast 内容区域字体大小
   * @default 14px
   */
  '@toast-content-font-size'?: string
  /**
   * @description Toast 内容区域圆角大小
   * @default 4px
   */
  '@toast-content-border-radius'?: string
  /**
   * @description Toast 居中位置图标大小
   * @default 38px
   */
  '@toast-icon-size-center'?: string
  /**
   * @description Toast 顶部/底部位置图标大小
   * @default 18px
   */
  '@toast-icon-size-edge'?: string
}

export const DOC_ToastStyleVars = AUTO_API<ToastStyleVars>()
