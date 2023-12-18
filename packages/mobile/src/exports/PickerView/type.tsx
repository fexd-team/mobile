import AUTO_API from '../../helpers/AUTO_API'
export type PickerOptionValue = string | number

export interface PickerOption {
  [key: string]: any
  /** 选项的值，类型为 string | number */
  value: PickerOptionValue
  /** 选项的名称 */
  label: string
}
export interface PickerViewProps {
  /**
   * @description 选项列表
   * @default []
   */
  options?: PickerOption[]
  /**
   * @description PickerView 一次显示几行
   * @default 3
   */
  rows?: number
  /** 默认值 */
  defaultValue?: PickerOptionValue
  /** 受控值 */
  value?: PickerOptionValue
  /** 选中内容改变时的回调，一旦改变立即触发 */
  onChange?: (value: PickerOptionValue, index?: number) => void
  /**
   * @description 选中项是否放大
   * @default true
   */
  scaleSelected?: boolean
  /** 类名 */
  className?: string
}

export default AUTO_API<PickerViewProps>()
export const DOC_PickerOption = AUTO_API<PickerOption>()
