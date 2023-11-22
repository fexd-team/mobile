import { WatermarkComponentProps } from '@pansy/react-watermark'

export interface WatermarkProps extends Omit<WatermarkComponentProps, 'isBody'> {
  fullpage?: boolean
}
export type WatermarkRef = any
