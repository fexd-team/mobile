import AUTO_API from '../../helpers/AUTO_API'
import { JSXLabelProps } from '../../helpers/html.types'
import { FC } from '../createFC/type'
import { RadioGroupType } from './Group/type'

export interface PureRadioProps {
  /** 是否选中 */
  checked?: boolean
  /** 携带的标识值，用于 Group 模式 */
  value?: any
  /** 是否默认选中 */
  defaultChecked?: boolean
  /** 单选框选中状态回调函数 */
  onChange?: (checked: boolean, value: any, e?: any) => void
  /** 是否禁用 */
  disabled?: boolean
  /** 自定义 icon 图标 */
  icon?: React.ReactNode | ((checked: boolean) => React.ReactNode)
  /**
   * @description 是否垂直排列
   * @default false
   */
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
export interface RadioType extends FC<RadioProps> {
  Group: RadioGroupType
}

export default AUTO_API<PureRadioProps>()

export interface RadioStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-radio'
   */
  '@radio-prefix'?: string
  /**
   * @description 图标默认颜色
   * @default color-gray
   */
  '@radio-default-color'?: string
  /**
   * @description 图标选中颜色
   * @default color-primary
   */
  '@radio-active-color'?: string
  /**
   * @description 图标区域宽度
   * @default 36px
   */
  '@radio-icon-area-width'?: string
  /**
   * @description 图标尺寸
   * @default 24px
   */
  '@radio-icon-size'?: string
  /**
   * @description 禁用颜色
   * @default ant-color-gray-5
   */
  '@radio-disabled-color'?: string
  /**
   * @description 描述颜色
   * @default ant-color-gray-7
   */
  '@radio-description-color'?: string
  /**
   * @description 内容字体大小
   * @default 15px
   */
  '@radio-content-font-size'?: string
  /**
   * @description 描述字体大小
   * @default 12px
   */
  '@radio-description-font-size'?: string
  /**
   * @description 描述上边距
   * @default 8px
   */
  '@radio-description-margin-top'?: string
}

export const DOC_RadioStyleVars = AUTO_API<RadioStyleVars>()
