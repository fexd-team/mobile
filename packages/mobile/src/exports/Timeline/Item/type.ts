import React, { ReactNode } from 'react'
import { JSXDivProps } from '../../helpers/html.types'

export interface TimelineItemProps extends Omit<JSXDivProps, 'title' | 'children'> {
  title?: ReactNode
  time?: ReactNode
  dot?: ReactNode | (() => ReactNode)
  children?: ReactNode | (() => ReactNode)
  ref?: React.Ref<any>
}
