import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps } from '../../helpers/html.types'
import { FC } from '../createFC/type'

export type ResultStatus = 'success' | 'warning' | 'error' | 'info'

export type ResultRef = HTMLDivElement
export interface ResultProps extends Omit<JSXDivProps, 'title'> {
  status?: ResultStatus
  icon?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
}

export interface ResultType extends FC<ResultProps> {}

export default AUTO_API<ResultProps>()

export interface ResultStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-result'
   */
  '@result-prefix'?: string
  /**
   * @description Result 容器内边距
   * @default 32px
   */
  '@result-padding'?: string
  /**
   * @description Result 图标尺寸
   * @default 60px
   */
  '@result-icon-size'?: string
  /**
   * @description Result 图标下边距
   * @default 12px
   */
  '@result-icon-margin-bottom'?: string
  /**
   * @description Result 标题颜色
   * @default @ant-color-gray-9 (#434343)
   */
  '@result-title-color'?: string
  /**
   * @description Result 标题字体大小
   * @default 16px
   */
  '@result-title-font-size'?: string
  /**
   * @description Result 标题下边距
   * @default 8px
   */
  '@result-title-margin-bottom'?: string
  /**
   * @description Result 描述文字颜色
   * @default @color-gray-secondary (#8c8c8c)
   */
  '@result-description-color'?: string
  /**
   * @description Result 描述文字字体大小
   * @default 14px
   */
  '@result-description-font-size'?: string
  /**
   * @description Result 描述文字下边距
   * @default 16px
   */
  '@result-description-margin-bottom'?: string
  /**
   * @description Result 成功状态图标颜色
   * @default @color-success
   */
  '@result-icon-color-success'?: string
  /**
   * @description Result 警告状态图标颜色
   * @default @color-warning
   */
  '@result-icon-color-warning'?: string
  /**
   * @description Result 错误状态图标颜色
   * @default @color-danger
   */
  '@result-icon-color-error'?: string
  /**
   * @description Result 信息状态图标颜色
   * @default @color-info
   */
  '@result-icon-color-info'?: string
}

export const DOC_ResultStyleVars = AUTO_API<ResultStyleVars>()
