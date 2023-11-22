import { FC } from '../../helpers/createFC'
import { JSXDivElement } from '../../helpers/html.types'
import { IOProps } from '../useIOControl/type'

export type SliderValueType = number | [number, number]
export interface SliderProps<T> extends Omit<JSXDivElement, 'value' | 'defaultValue' | 'onChange'> {}

type ChangeValueType<T> = T extends [number, number] ? [number, number] : number
export interface SliderProps<T extends SliderValueType = [number, number]> extends Omit<IOProps<T>, 'onChange'> {
  onChange?: (value: ChangeValueType<T>) => void
  onChangeCommitted?: (value: ChangeValueType<T>) => void
}
export interface SliderProps<T> {
  disabled?: boolean
  min?: number
  max?: number
  step?: number
  rate?: number
  vertical?: boolean
  track?: 'inverted' | boolean
  thumb?: boolean
}
export type SliderRef = HTMLDivElement

export interface SliderType extends FC<SliderProps> {
  <T extends SliderValueType = [number, number]>(props: SliderProps<T>, ref: React.Ref<SliderRef>): JSX.Element
}
