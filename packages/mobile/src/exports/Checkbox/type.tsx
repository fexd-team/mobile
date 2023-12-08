import AUTO_API from '../../helpers/AUTO_API'
import { JSXLabelProps } from '../../helpers/html.types'
import { FC } from '../createFC/type'
import { CheckboxGroupType } from './Group/type'

export interface PureCheckboxProps {
  /** 是否选中 */
  checked?: boolean
  /** 携带的标识值，用于 Group 模式 */
  value?: string | number
  /** 是否默认选中 */
  defaultChecked?: boolean
  /** 多选框选中状态回调函数 */
  onChange?: (checked: boolean) => void
  /** 是否禁用 */
  disabled?: boolean
  /** 自定义 icon 图标 */
  icon?: React.ReactNode | ((checked: boolean) => React.ReactNode)
  /**
   * @description 是否垂直排列
   * @default false
   */
  block?: boolean
  /** 多选框名称 */
  children?: React.ReactNode
  /** 描述 */
  description?: React.ReactNode
  /** 用于获取组件实例 */
  ref?: React.Ref<CheckboxRef>
}
export interface CheckboxProps extends PureCheckboxProps {}
export interface CheckboxProps extends Omit<JSXLabelProps, 'ref' | 'onChange'> {}
export type CheckboxRef = HTMLLabelElement
export interface CheckboxType extends FC<CheckboxProps> {
  Group: CheckboxGroupType
}

export default AUTO_API<PureCheckboxProps>()
export interface CheckboxStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-checkbox'
   */
  '@checkbox-prefix'?: string
  /**
   * @description 图标默认颜色
   * @default color-gray
   */
  '@checkbox-default-color'?: string
  /**
   * @description 图标选中颜色
   * @default color-primary
   */
  '@checkbox-active-color'?: string
  /**
   * @description 图标区域宽度
   * @default 36px
   */
  '@checkbox-icon-area-width'?: string
  /**
   * @description 图标尺寸
   * @default 24px
   */
  '@checkbox-icon-size'?: string
  /**
   * @description 禁用颜色
   * @default ant-color-gray-5
   */
  '@checkbox-disabled-color'?: string
  /**
   * @description 描述颜色
   * @default ant-color-gray-7
   */
  '@checkbox-description-color'?: string
  /**
   * @description 内容字体大小
   * @default 15px
   */
  '@checkbox-content-font-size'?: string
  /**
   * @description 描述字体大小
   * @default 12px
   */
  '@checkbox-description-font-size'?: string
  /**
   * @description 描述上边距
   * @default 8px
   */
  '@checkbox-description-margin-top'?: string
}

export const DOC_CheckboxStyleVars = AUTO_API<CheckboxStyleVars>()
