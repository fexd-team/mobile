import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'

import { IOProps } from '../useIOControl/type'
import { JSXInputProps } from '../../helpers/html.types'

export interface PureTextFieldProps<T> extends IOProps<string> {
  /** 对值进行序列化 */
  normalize?: (value: string, prevValue?: string) => string
  /**
   * @description 序列化值的触发时机
   * @default 'onChange'
   */
  normalizeTrigger?: 'onChange' | 'onBlur'
  /** 展示到输入框上的格式化 */
  format?: (value: string) => string
}
export interface TextFieldProps<T = any> extends Omit<JSXInputProps, keyof IOProps<string> | 'ref'> {
  ref?: React.Ref<T>
}
export interface TextFieldProps<T = any> extends PureTextFieldProps<T> {}

export default AUTO_API<PureTextFieldProps<any>>()
