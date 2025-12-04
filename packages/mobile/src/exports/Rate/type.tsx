import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps } from '../../helpers/html.types'

interface PureRateProps {
  /**
   * @description 当前选中的值
   * @default
   */
  value?: number
  /**
   * @description 默认值
   * @default 0
   */
  defaultValue?: number
  /**
   * @description 当选中的值发生变化时触发的回调函数
   * @default
   */
  onChange?: (value: number) => void
  /**
   * @description 禁用
   * @default false
   */
  disabled?: boolean
  /**
   * @description 是否允许半颗星
   * @default false
   */
  allowHalf?: boolean
  /**
   * @description 展示字符
   * @default <CollectFill />
   */
  character?: React.ReactNode
  /**
   * @description 展示字符总数
   * @default 5
   */
  count?: number
  /**
   * @description 只读
   * @default false
   */
  readOnly?: boolean
  /**
   * @description 尺寸
   * @default default
   */
  size?: 'small' | 'default' | 'large'
}
export interface RateProps extends PureRateProps {}
export interface RateProps extends Omit<JSXDivProps, 'value' | 'defaultValue' | 'onChange'> {}

export type RateRef = any

export default AUTO_API<PureRateProps>()

export interface RateStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-rate'
   */
  '@rate-prefix'?: string
  /**
   * @description 激活态颜色
   * @default color-yellow
   */
  '@rate-active-color'?: string
  /**
   * @description 默认颜色
   * @default ant-color-gray-4
   */
  '@rate-default-color'?: string
  /**
   * @description 禁用态颜色
   * @default ant-color-gray-7
   */
  '@rate-disabled-color'?: string
  /**
   * @description 小尺寸图标大小
   * @default 18px
   */
  '@rate-small-size'?: string
  /**
   * @description 默认尺寸图标大小
   * @default 24px
   */
  '@rate-default-size'?: string
  /**
   * @description 大尺寸图标大小
   * @default 30px
   */
  '@rate-large-size'?: string
  /**
   * @description 字符内边距
   * @default 3px
   */
  '@rate-character-padding'?: string
}

export const DOC_RateStyleVars = AUTO_API<RateStyleVars>()
