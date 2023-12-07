import AUTO_API from '../../helpers/AUTO_API'
import { JSXLabelProps } from '../../helpers/html.types'
import { FC } from '../createFC/type'

export interface PureRadioProps {
  /** 是否选中 */
  checked?: boolean
  /** 携带的标识值，用于 Group 模式 */
  value?: any
  /** 是否默认选中 */
  defaultChecked?: boolean
  /** 复选框选中状态回调函数 */
  onChange?: (checked: boolean, value: any, e?: any) => void
  /** 是否禁用 */
  disabled?: boolean
  /** 自定义 icon 图标 */
  icon?: React.ReactNode | ((checked: boolean) => React.ReactNode)
  /** 大小 */
  size?: 'small' | 'default' | 'large'
  /** 是否垂直排列 */
  block?: boolean
  /** 单选框名称 */
  children?: React.ReactNode
  /** 描述 */
  description?: React.ReactNode
  /** 用于获取组件实例 */
  ref?: React.Ref<RadioRef>
}
export interface RadioProps extends PureRadioProps {}
export interface RadioProps extends Omit<JSXLabelProps, 'ref' | 'onChange'> {}
export type RadioRef = HTMLLabelElement
export interface RadioType extends FC<RadioProps> {}

export default AUTO_API<PureRadioProps>()
