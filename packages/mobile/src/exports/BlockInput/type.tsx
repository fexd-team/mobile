import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIOInputRef, UnstyledIOInputProps, PureUnstyledIOInputProps } from '../UnstyledIOInput/type'

export type BlockInputRef = UnstyledIOInputRef
export interface PureBlockInputProps extends PureUnstyledIOInputProps {}
export interface BlockInputProps extends PureBlockInputProps {}
export interface BlockInputProps extends Omit<UnstyledIOInputProps, 'theme'> {}

export default AUTO_API<PureBlockInputProps>()

/**
 * BlockInput 样式变量
 */
export interface BlockInputStyleVars {
  /**
   * @description 输入框文字大小
   * @default 14px
   */
  '@block-input-font-size'?: string
  /**
   * @description 输入框文字颜色
   * @default #333
   */
  '@block-input-color'?: string
  /**
   * @description 占位符文字颜色
   * @default #999
   */
  '@block-input-placeholder-color'?: string
  /**
   * @description 禁用态文字颜色
   * @default #c2bcbe
   */
  '@block-input-disabled-color'?: string
  /**
   * @description 前缀图标行高
   * @default 22px
   */
  '@block-input-prefix-line-height'?: string
  /**
   * @description 清除按钮大小
   * @default 17px
   */
  '@block-input-clear-size'?: string
  /**
   * @description 清除按钮颜色
   * @default #bbb
   */
  '@block-input-clear-color'?: string
  /**
   * @description 后缀元素左边距
   * @default 6px
   */
  '@block-input-suffix-margin-left'?: string
  /**
   * @description 无标签时的上下内边距
   * @default 8px
   */
  '@block-input-no-label-padding-y'?: string
}

export const DOC_BlockInputStyleVars = AUTO_API<BlockInputStyleVars>()
