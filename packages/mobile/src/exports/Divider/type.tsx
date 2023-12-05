import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps } from '../../helpers/html.types'

export interface DividerProps extends JSXDivProps {
  children?: React.ReactNode
  ref?: React.Ref<HTMLDivElement>
  vertical?: boolean
}

export default AUTO_API<DividerProps>()
