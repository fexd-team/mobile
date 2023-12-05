import AUTO_API from '../../helpers/AUTO_API'
import { BasicInputProps } from '../BasicInput'
import { IOProps } from '../useIOControl/type'

export type StepperRef = any
export interface StepperProps extends Omit<BasicInputProps, keyof IOProps | 'size'> {}
export interface StepperProps extends IOProps {}
export interface StepperProps {
  step?: number
  min?: number
  max?: number
  size?: 'normal' | 'small' | 'large'
  block?: boolean
}

export default AUTO_API<StepperProps>()
