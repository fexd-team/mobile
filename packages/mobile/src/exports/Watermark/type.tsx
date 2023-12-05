import AUTO_API from '../../helpers/AUTO_API'
import { WatermarkComponentProps } from '@pansy/react-watermark'

export interface WatermarkProps extends Omit<WatermarkComponentProps, 'isBody'> {
  fullpage?: boolean
}
export type WatermarkRef = any

export default AUTO_API<WatermarkProps>()
