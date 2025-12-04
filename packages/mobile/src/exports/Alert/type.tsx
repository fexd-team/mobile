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
   * @default ant-color-blue-1 (#e6f7ff)
   */
  '@alert-info-background'?: string
  /**
   * @description Info 类型文字颜色
   * @default ant-color-blue-9 (#003a8c)
   */
  '@alert-info-color'?: string
  /**
   * @description Info 类型图标颜色
   * @default ant-color-blue-5 (#40a9ff)
   */
  '@alert-info-icon-color'?: string
  /**
   * @description Info 类型描边边框颜色
   * @default ant-color-blue-5 (#40a9ff)
   */
  '@alert-info-outlined-border-color'?: string
  /**
   * @description Info 类型填充背景色
   * @default ant-color-blue-6 (#1890ff)
   */
  '@alert-info-filled-background'?: string
  /**
   * @description Info 类型填充文字颜色
   * @default color-white (#fff)
   */
  '@alert-info-filled-color'?: string
  /**
   * @description Success 类型背景色
   * @default ant-color-green-1 (#f6ffed)
   */
  '@alert-success-background'?: string
  /**
   * @description Success 类型文字颜色
   * @default ant-color-green-9 (#135200)
   */
  '@alert-success-color'?: string
  /**
   * @description Success 类型图标颜色
   * @default ant-color-green-6 (#52c41a)
   */
  '@alert-success-icon-color'?: string
  /**
   * @description Success 类型描边边框颜色
   * @default ant-color-green-6 (#52c41a)
   */
  '@alert-success-outlined-border-color'?: string
  /**
   * @description Success 类型填充背景色
   * @default ant-color-green-7 (#389e0d)
   */
  '@alert-success-filled-background'?: string
  /**
   * @description Success 类型填充文字颜色
   * @default color-white (#fff)
   */
  '@alert-success-filled-color'?: string
  /**
   * @description Warning 类型背景色
   * @default ant-color-orange-1 (#fff7e6)
   */
  '@alert-warning-background'?: string
  /**
   * @description Warning 类型文字颜色
   * @default ant-color-orange-9 (#873800)
   */
  '@alert-warning-color'?: string
  /**
   * @description Warning 类型图标颜色
   * @default ant-color-orange-5 (#ffa940)
   */
  '@alert-warning-icon-color'?: string
  /**
   * @description Warning 类型描边边框颜色
   * @default ant-color-orange-5 (#ffa940)
   */
  '@alert-warning-outlined-border-color'?: string
  /**
   * @description Warning 类型填充背景色
   * @default ant-color-orange-7 (#d46b08)
   */
  '@alert-warning-filled-background'?: string
  /**
   * @description Warning 类型填充文字颜色
   * @default color-white (#fff)
   */
  '@alert-warning-filled-color'?: string
  /**
   * @description Error 类型背景色
   * @default ant-color-red-1 (#fff1f0)
   */
  '@alert-error-background'?: string
  /**
   * @description Error 类型文字颜色
   * @default ant-color-red-9 (#820014)
   */
  '@alert-error-color'?: string
  /**
   * @description Error 类型图标颜色
   * @default ant-color-red-5 (#ff4d4f)
   */
  '@alert-error-icon-color'?: string
  /**
   * @description Error 类型描边边框颜色
   * @default ant-color-red-5 (#ff4d4f)
   */
  '@alert-error-outlined-border-color'?: string
  /**
   * @description Error 类型填充背景色
   * @default ant-color-red-7 (#cf1322)
   */
  '@alert-error-filled-background'?: string
  /**
   * @description Error 类型填充文字颜色
   * @default color-white (#fff)
   */
  '@alert-error-filled-color'?: string
}

export const DOC_AlertStyleVars = AUTO_API<AlertStyleVars>()
