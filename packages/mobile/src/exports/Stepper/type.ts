import { BasicInputProps } from '../BasicInput'
import { IOProps } from '../useIOControl/type'
import { JSXDivElement } from '../../helpers/html.types'

export type StepperRef = any
export interface StepperProps extends Omit<JSXDivElement, keyof IOProps | keyof BasicInputProps> {}
export interface StepperProps extends Omit<BasicInputProps, keyof IOProps> {}
export interface StepperProps extends IOProps {}
export interface StepperProps {
  step?: number
  min?: number
  max?: number
  size?: 'normal' | 'small' | 'large'
  block?: boolean
}
