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

/**
 * PickerView 样式变量
 */
export interface PickerViewStyleVars {
  /**
   * @description 选项高度
   * @default 50px
   */
  '@picker-view-item-height'?: string
  /**
   * @description 背景颜色
   * @default #fff
   */
  '@picker-view-bg-color'?: string
  /**
   * @description 遮罩背景颜色
   * @default rgba(255, 255, 255, 0.5)
   */
  '@picker-view-mask-bg-color'?: string
  /**
   * @description 指示器边框颜色
   * @default #ddd
   */
  '@picker-view-indicator-border-color'?: string
  /**
   * @description 指示器边框宽度
   * @default 1px
   */
  '@picker-view-indicator-border-width'?: string
  /**
   * @description 选项字体大小
   * @default 14px
   */
  '@picker-view-item-font-size'?: string
  /**
   * @description 选项内边距
   * @default 14px
   */
  '@picker-view-item-padding'?: string
  /**
   * @description 选中项字体大小
   * @default 16px
   */
  '@picker-view-item-active-font-size'?: string
  /**
   * @description 选中项字体粗细
   * @default 500
   */
  '@picker-view-item-active-font-weight'?: string
}

export const DOC_PickerViewStyleVars = AUTO_API<PickerViewStyleVars>()

export default AUTO_API<PickerViewProps>()
export const DOC_PickerOption = AUTO_API<PickerOption>()
