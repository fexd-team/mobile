import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIOLabelProps, UnstyledIOLabelRef } from '../UnstyledIOLabel/type'

export type LineIOLabelRef = UnstyledIOLabelRef

export interface LineIOLabelProps extends Omit<UnstyledIOLabelProps, 'theme'> {}

export default AUTO_API<LineIOLabelProps>()

/**
 * LineIOLabel 样式变量
 */
export interface LineIOLabelStyleVars {
  /**
   * @description 禁用态文字颜色
   * @default #c2bcbe
   */
  '@line-io-label-disabled-color'?: string
  /**
   * @description 前缀图标行高
   * @default 22px
   */
  '@line-io-label-prefix-line-height'?: string
  /**
   * @description 前缀图标字体大小
   * @default 14px
   */
  '@line-io-label-prefix-font-size'?: string
  /**
   * @description 前缀图标颜色
   * @default #c2bcbe
   */
  '@line-io-label-prefix-color'?: string
}

export const DOC_LineIOLabelStyleVars = AUTO_API<LineIOLabelStyleVars>()
