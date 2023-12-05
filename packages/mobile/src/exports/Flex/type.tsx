import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps } from '../../helpers/html.types'

export interface FlexProps extends JSXDivProps {
  children?: React.ReactNode | any
  targetRef?: React.Ref<HTMLDivElement>
  vertical?: boolean
  align?: 'top' | 'middle' | 'bottom'
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
  wrap?: boolean
  gutter?: [number, number]
  columns?: number
  border?: boolean
  center?: boolean
  square?: boolean
  smValue?: number
  mdValue?: number
  lgValue?: number
}

export default AUTO_API<FlexProps>()
