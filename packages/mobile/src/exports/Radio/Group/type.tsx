import AUTO_API from '../../../helpers/AUTO_API'
import { JSXLabelProps } from '../../../helpers/html.types'
import { FC } from '../../createFC/type'
import { RadioProps, PureRadioProps } from '../type'

export interface PureRadioGroupOption
  extends Omit<PureRadioProps, 'children' | 'checked' | 'defaultChecked' | 'onChange'> {
  /** 单选框名称，同 RadioProps['children'] */
  label: RadioProps['children']
  value: RadioProps['value']
}
export interface RadioGroupOption extends PureRadioGroupOption {}
export interface RadioGroupOption
  extends Omit<RadioProps, 'value' | 'children' | 'checked' | 'defaultChecked' | 'onChange'> {}
export interface RadioGroupSharedProps extends Pick<PureRadioProps, 'icon' | 'block' | 'size' | 'disabled'> {}
export interface PureRadioGroupProps extends RadioGroupSharedProps {
  /** 单选框组的当前值 */
  value?: any
  /** 默认值 */
  defaultValue?: any
  /** 单选组选中内容改变时的回调 */
  onChange?: (value: any) => void
  /** 上下文包裹的内容 */
  children?: React.ReactNode
  /** 用于获取组件实例 */
  ref?: React.Ref<RadioGroupRef>
  /** 选项列表 */
  options?: RadioGroupOption[]
}
export interface RadioGroupProps extends PureRadioGroupProps {}
export type RadioGroupRef = any
export interface RadioGroupType extends FC<RadioGroupProps> {}

export default AUTO_API<PureRadioGroupProps>()
export const DOC_PureRadioGroupOption = AUTO_API<PureRadioGroupOption>()
