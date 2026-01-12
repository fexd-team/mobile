import { EasingFunction } from '@fexd/tools/es/easing'
import AUTO_API from '../../helpers/AUTO_API'
import { FC } from '../createFC/type'
import { JSXDivProps } from '../../helpers/html.types'
import { IOProps } from '../useIOControl/type'
import { UseTouchOption } from '../useTouch'

export interface SwiperProps extends Omit<JSXDivProps, 'defaultValue' | 'value' | 'onChange'> {}
export interface SwiperProps extends IOProps<number> {}
export interface SwiperProps extends Pick<UseTouchOption, 'rate' | 'preventDefault' | 'stopPropagation'> {}
export interface SwiperProps {
  children: React.ReactNode
  interval?: number
  autoplay?: boolean
  loop?: boolean
  swipeable?: boolean
  vertical?: boolean
  speed?: number
  easing?: EasingFunction
  indicator?: (total: number, current: number) => React.ReactNode
  /**
   * 切换阈值（百分比），滑动偏移超过此百分比时触发切换
   * @default 30
   */
  thresholdPercent?: number
  /**
   * 切换阈值（像素），滑动偏移超过此像素值时触发切换
   * @default 200
   */
  thresholdPixel?: number
}

export type SwiperRef = any
export interface SwiperType extends FC<SwiperProps> {}

/**
 * Swiper 样式变量
 */
export interface SwiperStyleVars {
  /**
   * @description 组件样式前缀
   * @default 'exd-swiper'
   */
  '@swiper-prefix'?: string
  /**
   * @description 指示器偏移距离
   * @default 16px
   */
  '@swiper-indicator-offset'?: string
  /**
   * @description 指示器圆点大小
   * @default 8px
   */
  '@swiper-indicator-size'?: string
  /**
   * @description 指示器默认颜色
   * @default rgba(0, 0, 0, 0.2)
   */
  '@swiper-indicator-color'?: string
  /**
   * @description 指示器激活颜色
   * @default #fff
   */
  '@swiper-indicator-active-color'?: string
  /**
   * @description 全局尺寸缩放比例
   * @default 1
   */
  '@size-scale'?: string | number
}

export const DOC_SwiperStyleVars = AUTO_API<SwiperStyleVars>()
