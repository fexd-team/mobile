import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { FC } from '../createFC/type'
import { BasicTextAreaProps, PureBasicTextAreaProps } from '../BasicTextArea/type'

export type TextAreaRef = any
export interface PureTextAreaProps extends PureBasicTextAreaProps {
  ref?: React.Ref<TextAreaRef>
}
export interface TextAreaProps extends PureTextAreaProps {}
export interface TextAreaProps extends BasicTextAreaProps {}
export interface TextAreaType extends FC<TextAreaProps> {}

export default AUTO_API<PureTextAreaProps>()
