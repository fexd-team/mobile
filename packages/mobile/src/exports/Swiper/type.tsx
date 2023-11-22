import { EasingFunction } from '@fexd/tools/es/easing'

import { FC } from '../../helpers/createFC'
import { JSXDivElement } from '../../helpers/html.types'
import { IOProps } from '../useIOControl/type'
import { UseTouchOption } from '../useTouch'

export interface SwiperProps extends Omit<JSXDivElement, 'defaultValue' | 'value' | 'onChange'> {}
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
}

export type SwiperRef = any
export interface SwiperType extends FC<SwiperProps> {}
