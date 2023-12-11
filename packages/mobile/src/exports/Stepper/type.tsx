import AUTO_API from '../../helpers/AUTO_API'
import { BasicInputProps, PureBasicInputProps } from '../BasicInput/type'
import { IOProps } from '../useIOControl/type'

export type StepperRef = any

export interface PureStepperProps extends Omit<PureBasicInputProps, keyof IOProps | 'size'> {}
export interface PureStepperProps extends IOProps {}
export interface PureStepperProps {
  /**
   * @description 步长
   * @default 1
   */
  step?: number
  /** 最小值 */
  min?: number
  /** 最大值 */
  max?: number
  /** 尺寸 */
  size?: 'normal' | 'small' | 'large'
  /** 是否块级元素 */
  block?: boolean
  ref?: React.Ref<StepperRef>
}

export interface StepperProps extends Omit<BasicInputProps, keyof IOProps | 'size' | 'max' | 'min' | 'step'> {}
export interface StepperProps extends PureStepperProps {}

export default AUTO_API<PureStepperProps>()
