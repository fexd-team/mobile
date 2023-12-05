import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps } from '../../helpers/html.types'

export interface RateProps extends Omit<JSXDivProps, 'onChange' | 'style'> {
  allowClear?: boolean
  allowHalf?: boolean
  character?: React.ReactNode
  count?: number
  defaultValue?: number
  readOnly?: boolean
  value?: number
  onChange?: (value: number) => void
  style?: React.CSSProperties & Partial<Record<string, string>>
}

export type RateRef = any

export default AUTO_API<RateProps>()
