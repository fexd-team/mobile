import AUTO_API from '../../../helpers/AUTO_API'
import React, { ReactNode } from 'react'
import { JSXLiProps } from '../../../helpers/html.types'

export interface StepItemProps extends Omit<JSXLiProps, 'title' | 'children'> {
  step?: number
  title?: ReactNode | (() => ReactNode)
  children?: ReactNode | (() => ReactNode)
  type?: 'default' | 'process' | 'completed' | 'error'
  icon?: ReactNode | (() => ReactNode)
  ref?: React.Ref<any>
}

export default AUTO_API<StepItemProps>()
