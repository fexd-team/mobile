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
   * @description 大小
   * @default default
   */
  size?: 'small' | 'default' | 'large'
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
