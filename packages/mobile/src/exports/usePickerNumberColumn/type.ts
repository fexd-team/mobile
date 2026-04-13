import { PickerOption } from '../PickerView/type'

export interface UsePickerNumberColumnOptions {
  /** 初始值（仅首次 render 生效） */
  defaultValue?: number
  /** 可选范围下限 */
  min: number
  /** 可选范围上限 */
  max: number
  /** 数值 → 展示文本 */
  toLabel: (value: number) => string
}

export interface UsePickerNumberColumnResult {
  /** 当前值（始终在 [min, max] 范围内） */
  value: number
  /** 由 [min, max] 生成的选项列表 */
  options: PickerOption[]
  /** 更新值（PickerView onChange 直接使用） */
  onChange: (value: number | string) => void
}
