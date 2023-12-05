import AUTO_API from '../../helpers/AUTO_API'
import React, { ReactNode } from 'react'
import { JSXDivProps } from '../../helpers/html.types'

interface StepItemConfig {
  title?: ReactNode | (() => ReactNode)
  description?: ReactNode | (() => ReactNode)
  icon?: ReactNode | (() => ReactNode)
  error?: boolean
}

export interface StepsProps extends Omit<JSXDivProps, 'children'> {
  value?: number
  data?: StepItemConfig[]
  type?: 'flex'
  checked?: boolean
  children?: ReactNode | (() => ReactNode)
  ref?: React.Ref<any>
}

export default AUTO_API<StepsProps>()
