import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIOInputRef, UnstyledIOInputProps, PureUnstyledIOInputProps } from '../UnstyledIOInput/type'

export type CellInputRef = UnstyledIOInputRef
export interface PureCellInputProps extends PureUnstyledIOInputProps {}
export interface CellInputProps extends PureCellInputProps {}
export interface CellInputProps extends Omit<UnstyledIOInputProps, 'theme'> {}

export default AUTO_API<PureCellInputProps>()

/**
 * CellInput 样式变量
 */
export interface CellInputStyleVars {
  /**
   * @description 输入框文字大小
   * @default 14px
   */
  '@cell-input-font-size'?: string
  /**
   * @description 输入框文字颜色
   * @default ant-color-gray-10
   */
  '@cell-input-color'?: string
  /**
   * @description 占位符文字颜色
   * @default ant-color-gray-6
   */
  '@cell-input-placeholder-color'?: string
  /**
   * @description 禁用态文字颜色
   * @default ant-color-gray-5
   */
  '@cell-input-disabled-color'?: string
  /**
   * @description 前缀图标行高
   * @default 22px
   */
  '@cell-input-prefix-line-height'?: string
  /**
   * @description 清除按钮大小
   * @default 17px
   */
  '@cell-input-clear-size'?: string
  /**
   * @description 清除按钮颜色
   * @default ant-color-gray-6
   */
  '@cell-input-clear-color'?: string
  /**
   * @description 后缀元素左边距
   * @default 6px
   */
  '@cell-input-suffix-margin-left'?: string
}

export const DOC_CellInputStyleVars = AUTO_API<CellInputStyleVars>()
