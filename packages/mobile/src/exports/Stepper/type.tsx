import AUTO_API from '../../helpers/AUTO_API'
import { BasicInputProps, PureBasicInputProps } from '../BasicInput/type'
import { IOProps } from '../useIOControl/type'

export type StepperRef = {
  inputRef: React.RefObject<HTMLInputElement>
  wrapperRef: React.RefObject<HTMLDivElement>
  minus: (value: number) => number
  plus: (value: number) => number
}

export interface PureStepperProps extends Omit<PureBasicInputProps, keyof IOProps | 'size'> {}
export interface PureStepperProps extends IOProps {}
export interface PureStepperProps {
  /**
   * @description 步长，当 step 为数组时，第一个值为减少步长，第二个值为增加步长
   * @default 1
   */
  step?: number | [number, number]
  /** 最小值 */
  min?: number
  /** 最大值 */
  max?: number
  /** 尺寸 */
  size?: 'normal' | 'small' | 'large'
  /** 是否块级元素 */
  block?: boolean
  /** 是否允许为空 */
  allowEmpty?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 输入框是否只读 */
  readOnly?: boolean
  ref?: React.Ref<StepperRef>

  /**
   * @description 增加时的回调
   **/
  onPlus?: (value: number) => number
  /**
   * @description 减少时的回调
   **/
  onMinus?: (value: number) => number
}

export interface StepperProps extends Omit<BasicInputProps, keyof IOProps | 'size' | 'max' | 'min' | 'step' | 'ref'> {}
export interface StepperProps extends PureStepperProps {}

export default AUTO_API<PureStepperProps>()
