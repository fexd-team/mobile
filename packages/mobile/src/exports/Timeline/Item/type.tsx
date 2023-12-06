import AUTO_API from '../../../helpers/AUTO_API'
import React, { ReactNode } from 'react'
import { JSXDivProps } from '../../../helpers/html.types'

export interface TimelineItemProps extends Omit<JSXDivProps, 'title' | 'children'> {
  title?: ReactNode
  time?: ReactNode
  dot?: ReactNode | (() => ReactNode)
  children?: ReactNode | (() => ReactNode)
  ref?: React.Ref<any>
}

export default AUTO_API<TimelineItemProps>()
