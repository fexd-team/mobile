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
