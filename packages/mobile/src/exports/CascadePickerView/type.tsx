import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps } from '../../helpers/html.types'
import { PickerOption, PickerOptionValue } from '../PickerView/type'

export interface CascadeOption {
  /** 选项展示文本 */
  label: string
  /** 选项值 */
  value: string | number
  /**
   * @description 是否禁用
   * @default false
   */
  disabled?: boolean
  /** 子级选项 */
  children?: CascadeOption[]
}

export type CascadePickerViewValue = (string | number)[]

export interface PureCascadePickerViewProps {
  /** 树形级联数据 */
  options: CascadeOption[]
  /** 受控值，各级选中值的数组 */
  value?: CascadePickerViewValue
  /** 默认值 */
  defaultValue?: CascadePickerViewValue
  /** 值变化回调 */
  onChange?: (values: CascadePickerViewValue, selectedOptions: CascadeOption[]) => void
  /**
   * @description PickerView 一次显示几行
   * @default 3
   */
  rows?: number
  /** 自定义类名 */
  className?: string
}

export interface CascadePickerViewProps extends Omit<JSXDivProps, 'onChange' | 'defaultValue'> {}
export interface CascadePickerViewProps extends PureCascadePickerViewProps {}

export default AUTO_API<PureCascadePickerViewProps>()
export const DOC_CascadeOption = AUTO_API<CascadeOption>()

// --- useCascadingPicker types (internal) ---

export interface CascadingColumnDef {
  key: string
  getOptions: (parentValues: PickerOptionValue[]) => PickerOption[]
  resolveValue?: (current: PickerOptionValue | undefined, options: PickerOption[]) => PickerOptionValue | undefined
}

export interface UseCascadingPickerConfig {
  columns: CascadingColumnDef[]
  value?: PickerOptionValue[]
  defaultValue?: PickerOptionValue[]
  onChange?: (values: PickerOptionValue[]) => void
}

export interface CascadingColumnResult {
  key: string
  options: PickerOption[]
  value: PickerOptionValue | undefined
  onChange: (v: PickerOptionValue) => void
}

export interface UseCascadingPickerReturn {
  values: PickerOptionValue[]
  columns: CascadingColumnResult[]
}
