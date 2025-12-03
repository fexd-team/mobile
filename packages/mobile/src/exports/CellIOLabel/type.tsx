import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIOLabelProps, UnstyledIOLabelRef } from '../UnstyledIOLabel/type'

export type CellIOLabelRef = UnstyledIOLabelRef

export interface CellIOLabelProps extends Omit<UnstyledIOLabelProps, 'theme'> {}

export default AUTO_API<CellIOLabelProps>()

/**
 * CellIOLabel 样式变量
 */
export interface CellIOLabelStyleVars {
  /**
   * @description 禁用态文字颜色
   * @default #c2bcbe
   */
  '@cell-io-label-disabled-color'?: string
  /**
   * @description 前缀图标行高
   * @default 22px
   */
  '@cell-io-label-prefix-line-height'?: string
  /**
   * @description 前缀图标字体大小
   * @default 14px
   */
  '@cell-io-label-prefix-font-size'?: string
  /**
   * @description 前缀图标颜色
   * @default #c2bcbe
   */
  '@cell-io-label-prefix-color'?: string
}

export const DOC_CellIOLabelStyleVars = AUTO_API<CellIOLabelStyleVars>()
