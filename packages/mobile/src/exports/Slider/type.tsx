import AUTO_API from '../../helpers/AUTO_API'
import { FC } from '../createFC/type'
import { JSXDivProps } from '../../helpers/html.types'
import { IOProps } from '../useIOControl/type'

export type SliderValueType = number | [number, number]
export interface SliderProps<T> extends Omit<JSXDivProps, 'value' | 'defaultValue' | 'onChange'> {}

type ChangeValueType<T> = T extends [number, number] ? [number, number] : number
export interface SliderProps<T extends SliderValueType = [number, number]> extends Omit<IOProps<T>, 'onChange'> {
  onChange?: (value: ChangeValueType<T>) => void
  onChangeCommitted?: (value: ChangeValueType<T>) => void
}
export interface SliderProps<T> {
  disabled?: boolean
  min?: number
  max?: number
  step?: number
  rate?: number
  vertical?: boolean
  track?: 'inverted' | boolean
  thumb?: boolean
}
export type SliderRef = HTMLDivElement

export interface SliderType extends FC<SliderProps> {
  <T extends SliderValueType = [number, number]>(props: SliderProps<T>, ref: React.Ref<SliderRef>): JSX.Element
}

export interface SliderStyleVars {
  /**
   * @description 组件的 className 前缀
   * @default 'exd-slider'
   */
  '@slider-prefix'?: string
  /**
   * @description 轨道大小
   * @default 4px
   */
  '@slider-track-size'?: string
  /**
   * @description 过渡动画时长
   * @default 0.06s
   */
  '@slider-transition-duration'?: string
  /**
   * @description 轨道背景颜色
   * @default #e6e6e6
   */
  '@slider-bar-background-color'?: string
  /**
   * @description 滑块节点大小
   * @default 14px
   */
  '@slider-node-size'?: string
  /**
   * @description 滑块节点颜色
   * @default @color-primary
   */
  '@slider-node-color'?: string
  /**
   * @description 激活轨道颜色
   * @default @color-primary
   */
  '@slider-track-color'?: string
  /**
   * @description 水平方向内边距
   * @default 16px
   */
  '@slider-horizontal-padding'?: string
  /**
   * @description 垂直方向内边距
   * @default 16px
   */
  '@slider-vertical-padding'?: string
  /**
   * @description 垂直方向默认高度
   * @default 160px
   */
  '@slider-vertical-height'?: string
  /**
   * @description 禁用态透明度
   * @default 0.5
   */
  '@slider-disabled-opacity'?: number
}

export const DOC_SliderStyleVars = AUTO_API<SliderStyleVars>()
