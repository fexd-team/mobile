import AUTO_API from '../../helpers/AUTO_API'
import { UnstyledIOInputRef, UnstyledIOInputProps, PureUnstyledIOInputProps } from '../UnstyledIOInput/type'

export type LineInputRef = UnstyledIOInputRef
export interface PureLineInputProps extends PureUnstyledIOInputProps {}
export interface LineInputProps extends PureLineInputProps {}
export interface LineInputProps extends Omit<UnstyledIOInputProps, 'theme'> {}

export default AUTO_API<PureLineInputProps>()

/**
 * LineInput 样式变量
 */
export interface LineInputStyleVars {
  /**
   * @description 输入框文字大小
   * @default 14px
   */
  '@line-input-font-size'?: string
  /**
   * @description 输入框文字颜色
   * @default ant-color-gray-10
   */
  '@line-input-color'?: string
  /**
   * @description 占位符文字颜色
   * @default ant-color-gray-6
   */
  '@line-input-placeholder-color'?: string
  /**
   * @description 禁用态文字颜色
   * @default ant-color-gray-5
   */
  '@line-input-disabled-color'?: string
  /**
   * @description 前缀图标行高
   * @default 22px
   */
  '@line-input-prefix-line-height'?: string
  /**
   * @description 清除按钮大小
   * @default 17px
   */
  '@line-input-clear-size'?: string
  /**
   * @description 清除按钮颜色
   * @default ant-color-gray-6
   */
  '@line-input-clear-color'?: string
  /**
   * @description 后缀元素左边距
   * @default 6px
   */
  '@line-input-suffix-margin-left'?: string
}

export const DOC_LineInputStyleVars = AUTO_API<LineInputStyleVars>()
