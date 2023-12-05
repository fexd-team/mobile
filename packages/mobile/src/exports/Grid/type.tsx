import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps } from '../../helpers/html.types'

export interface GridProps extends JSXDivProps {
  children?: React.ReactNode
  // ref?: React.Ref<HTMLDivElement>
  vertical?: boolean
  gutter?: [number, number]
  columns?: number
  border?: boolean
  center?: boolean
  square?: boolean
}

export default AUTO_API<GridProps>()
