import AUTO_API from '../../../helpers/AUTO_API'
import { FC } from '../../createFC/type'
import { CheckboxProps, PureCheckboxProps } from '../type'

export interface PureCheckboxGroupOption
  extends Omit<PureCheckboxProps, 'children' | 'checked' | 'defaultChecked' | 'onChange'> {
  /** 多选框名称，同 CheckboxProps['children'] */
  label: CheckboxProps['children']
  value: CheckboxProps['value']
}
export interface CheckboxGroupOption extends PureCheckboxGroupOption {}
export interface CheckboxGroupOption
  extends Omit<CheckboxProps, 'value' | 'children' | 'checked' | 'defaultChecked' | 'onChange'> {}
export interface CheckboxGroupSharedProps extends Pick<PureCheckboxProps, 'icon' | 'block' | 'size' | 'disabled'> {}
export interface PureCheckboxGroupProps extends CheckboxGroupSharedProps {
  /** 多选框组的当前值 */
  value?: CheckboxProps['value'][]
  /** 默认值 */
  defaultValue?: CheckboxProps['value'][]
  /** 单选组选中内容改变时的回调 */
  onChange?: (value: CheckboxProps['value'][]) => void
  /** 上下文包裹的内容 */
  children?: React.ReactNode
  /** 用于获取组件实例 */
  ref?: React.Ref<CheckboxGroupRef>
  /** 选项列表 */
  options?: CheckboxGroupOption[]
}
export interface CheckboxGroupProps extends PureCheckboxGroupProps {}
export type CheckboxGroupRef = any
export interface CheckboxGroupType extends FC<CheckboxGroupProps> {}

export default AUTO_API<PureCheckboxGroupProps>()
export const DOC_PureCheckboxGroupOption = AUTO_API<PureCheckboxGroupOption>()
