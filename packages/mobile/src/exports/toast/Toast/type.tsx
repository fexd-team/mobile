import React from 'react'
import AUTO_API from '../../../helpers/AUTO_API'
import { ModalProps } from '../../Modal/type'

export interface ToastProps extends Omit<ModalProps, 'type'> {
  touchable?: boolean
  icon?: React.ReactNode
}

export interface ToastStyleVars {
  /**
   * Toast 内边距
   * @default 16px
   */
  '@toast-padding'?: string
  /**
   * Toast 偏移量
   * @default 16px
   */
  '@toast-offset'?: string
  /**
   * Toast 顶部偏移量
   * @default @toast-offset
   */
  '@toast-offset-top'?: string
  /**
   * Toast 底部偏移量
   * @default @toast-offset
   */
  '@toast-offset-bottom'?: string
  /**
   * 内容水平内边距
   * @default 16px
   */
  '@toast-content-padding-x'?: string
  /**
   * 内容垂直内边距
   * @default 8px
   */
  '@toast-content-padding-y'?: string
  /**
   * 内容背景色
   * @default rgba(0, 0, 0, 0.8)
   */
  '@toast-content-background'?: string
  /**
   * 内容文字颜色
   * @default #fff
   */
  '@toast-content-color'?: string
  /**
   * 内容字体大小
   * @default 14px
   */
  '@toast-content-font-size'?: string
  /**
   * 内容圆角
   * @default 4px
   */
  '@toast-content-border-radius'?: string
  /**
   * 中间位置图标大小
   * @default 38px
   */
  '@toast-icon-size-center'?: string
  /**
   * 顶部/底部位置图标大小
   * @default 18px
   */
  '@toast-icon-size-edge'?: string
  /**
   * 中间位置图标下边距
   * @default 6px
   */
  '@toast-icon-margin-bottom'?: string
  /**
   * 顶部/底部位置图标右边距
   * @default 6px
   */
  '@toast-icon-margin-right'?: string
}

export const DOC_ToastStyleVars: ToastStyleVars = {}

export default AUTO_API<ToastProps>()
