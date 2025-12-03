import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIOLabelProps, UnstyledIOLabelRef } from '../UnstyledIOLabel/type'

export type BlockIOLabelRef = UnstyledIOLabelRef

export interface BlockIOLabelProps extends Omit<UnstyledIOLabelProps, 'theme'> {}

export default AUTO_API<BlockIOLabelProps>()

/**
 * BlockIOLabel 样式变量
 */
export interface BlockIOLabelStyleVars {
  /**
   * @description 禁用态文字颜色
   * @default #c2bcbe
   */
  '@block-io-label-disabled-color'?: string
  /**
   * @description 前缀图标行高
   * @default 22px
   */
  '@block-io-label-prefix-line-height'?: string
  /**
   * @description 前缀图标字体大小
   * @default 14px
   */
  '@block-io-label-prefix-font-size'?: string
  /**
   * @description 前缀图标颜色
   * @default #c2bcbe
   */
  '@block-io-label-prefix-color'?: string
}

export const DOC_BlockIOLabelStyleVars = AUTO_API<BlockIOLabelStyleVars>()
