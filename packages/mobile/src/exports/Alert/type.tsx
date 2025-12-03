import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps } from '../../helpers/html.types'

export const types = ['success', 'warning', 'info', 'error'] as const
type Type = (typeof types)[number]

export const variantTypes = ['outlined', 'filled'] as const
type VariantType = (typeof variantTypes)[number]
export interface AlertProps extends Omit<JSXDivProps, 'title'> {
  type?: Type
  showIcon?: boolean
  closable?: boolean
  closeText?: React.ReactNode
  variant?: VariantType
  icon?: React.ReactNode
  title?: React.ReactNode
  children: React.ReactNode
  onClose?: React.MouseEventHandler
}
export type AlertRef = any

export default AUTO_API<AlertProps>()

export interface AlertStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-alert'
   */
  '@alert-prefix'?: string
  /**
   * @description 垂直内边距
   * @default 6px
   */
  '@alert-padding-vertical'?: string
  /**
   * @description 水平内边距
   * @default 14px
   */
  '@alert-padding-horizontal'?: string
  /**
   * @description 圆角大小
   * @default 4px
   */
  '@alert-border-radius'?: string
  /**
   * @description 边框宽度
   * @default 1px
   */
  '@alert-border-width'?: string
  /**
   * @description 图标右侧间距
   * @default 6px
   */
  '@alert-icon-margin-right'?: string
  /**
   * @description 图标垂直内边距
   * @default 4px
   */
  '@alert-icon-padding-vertical'?: string
  /**
   * @description 图标字体大小
   * @default 22px
   */
  '@alert-icon-font-size'?: string
  /**
   * @description 图标透明度
   * @default 0.9
   */
  '@alert-icon-opacity'?: number
  /**
   * @description 内容区域内边距
   * @default 4px
   */
  '@alert-content-padding'?: string
  /**
   * @description 内容字体大小
   * @default 14px
   */
  '@alert-content-font-size'?: string
  /**
   * @description 标题字体大小
   * @default 15px
   */
  '@alert-content-title-font-size'?: string
  /**
   * @description 标题字体粗细
   * @default 500
   */
  '@alert-content-title-font-weight'?: number | string
  /**
   * @description 关闭按钮内边距
   * @default 2px
   */
  '@alert-close-padding'?: string
  /**
   * @description 关闭按钮字体大小
   * @default 16px
   */
  '@alert-close-font-size'?: string
  /**
   * @description Info 类型背景色
   * @default rgb(229, 246, 253)
   */
  '@alert-info-background'?: string
  /**
   * @description Info 类型文字颜色
   * @default rgb(1, 67, 97)
   */
  '@alert-info-color'?: string
  /**
   * @description Info 类型图标颜色
   * @default rgb(3, 169, 244)
   */
  '@alert-info-icon-color'?: string
  /**
   * @description Info 类型描边边框颜色
   * @default rgb(3, 169, 244)
   */
  '@alert-info-outlined-border-color'?: string
  /**
   * @description Info 类型填充背景色
   * @default rgb(2, 136, 209)
   */
  '@alert-info-filled-background'?: string
  /**
   * @description Info 类型填充文字颜色
   * @default rgb(255, 255, 255)
   */
  '@alert-info-filled-color'?: string
  /**
   * @description Success 类型背景色
   * @default rgb(237, 247, 237)
   */
  '@alert-success-background'?: string
  /**
   * @description Success 类型文字颜色
   * @default rgb(30, 70, 32)
   */
  '@alert-success-color'?: string
  /**
   * @description Success 类型图标颜色
   * @default rgb(76, 175, 80)
   */
  '@alert-success-icon-color'?: string
  /**
   * @description Success 类型描边边框颜色
   * @default rgb(76, 175, 80)
   */
  '@alert-success-outlined-border-color'?: string
  /**
   * @description Success 类型填充背景色
   * @default rgb(46, 125, 50)
   */
  '@alert-success-filled-background'?: string
  /**
   * @description Success 类型填充文字颜色
   * @default rgb(255, 255, 255)
   */
  '@alert-success-filled-color'?: string
  /**
   * @description Warning 类型背景色
   * @default rgb(255, 244, 229)
   */
  '@alert-warning-background'?: string
  /**
   * @description Warning 类型文字颜色
   * @default rgb(102, 60, 0)
   */
  '@alert-warning-color'?: string
  /**
   * @description Warning 类型图标颜色
   * @default rgb(255, 152, 0)
   */
  '@alert-warning-icon-color'?: string
  /**
   * @description Warning 类型描边边框颜色
   * @default rgb(255, 152, 0)
   */
  '@alert-warning-outlined-border-color'?: string
  /**
   * @description Warning 类型填充背景色
   * @default rgb(237, 108, 2)
   */
  '@alert-warning-filled-background'?: string
  /**
   * @description Warning 类型填充文字颜色
   * @default rgb(255, 255, 255)
   */
  '@alert-warning-filled-color'?: string
  /**
   * @description Error 类型背景色
   * @default rgb(253, 237, 237)
   */
  '@alert-error-background'?: string
  /**
   * @description Error 类型文字颜色
   * @default rgb(95, 33, 32)
   */
  '@alert-error-color'?: string
  /**
   * @description Error 类型图标颜色
   * @default rgb(239, 83, 80)
   */
  '@alert-error-icon-color'?: string
  /**
   * @description Error 类型描边边框颜色
   * @default rgb(239, 83, 80)
   */
  '@alert-error-outlined-border-color'?: string
  /**
   * @description Error 类型填充背景色
   * @default rgb(211, 47, 47)
   */
  '@alert-error-filled-background'?: string
  /**
   * @description Error 类型填充文字颜色
   * @default rgb(255, 255, 255)
   */
  '@alert-error-filled-color'?: string
}

export const DOC_AlertStyleVars = AUTO_API<AlertStyleVars>()
