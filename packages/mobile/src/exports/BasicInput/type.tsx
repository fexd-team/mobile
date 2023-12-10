import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { FC } from '../createFC/type'
import { PureTextFieldProps, TextFieldProps } from '../useTextFieldProps/type'
import { JSXInputProps } from '../../helpers/html.types'

export type BasicInputRef = any

export interface PureExtendFromJSXInput
  extends Pick<
    JSXInputProps,
    | 'maxLength'
    | 'minLength'
    | 'autoComplete'
    | 'autoFocus'
    | 'enterKeyHint'
    | 'pattern'
    | 'inputMode'
    | 'type'
    | 'onFocus'
    | 'onBlur'
    | 'autoCapitalize'
    | 'autoCorrect'
    | 'onKeyDown'
    | 'onKeyUp'
    | 'onCompositionStart'
    | 'onCompositionEnd'
    | 'onClick'
    | 'step'
  > {}
export interface PureBasicInputProps extends PureTextFieldProps<any> {
  ref?: React.Ref<BasicInputRef>
}

export interface BasicInputProps extends Omit<JSXInputProps, 'value' | 'defaultValue' | 'onChange' | 'ref'> {}
export interface BasicInputProps extends PureBasicInputProps {}
export interface BasicInputProps extends TextFieldProps<any> {}
export interface BasicInputType extends FC<BasicInputProps> {}

export default AUTO_API<PureBasicInputProps>()
export const DOC_PureExtendFromJSXInput = AUTO_API<PureExtendFromJSXInput>()
