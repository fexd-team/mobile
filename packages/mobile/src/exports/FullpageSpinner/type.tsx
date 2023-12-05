import AUTO_API from '../../helpers/AUTO_API'
import { FC } from '../createFC/type'
import { SpinnerProps } from '../Spinner/type'

export interface FullpageSpinnerProps extends SpinnerProps {
  ref?: React.Ref<HTMLDivElement>
}
export type FullpageSpinnerRef = any
export interface FullpageSpinnerType extends FC<FullpageSpinnerProps> {}

export default AUTO_API<FullpageSpinnerProps>()
