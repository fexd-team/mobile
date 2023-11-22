import React, { ReactNode } from 'react'
import { TimelineItemProps } from './Item/type'

type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

interface ActivityConfig extends Omit<TimelineItemProps, 'children'> {
  content?: TimelineItemProps['children']
}

export interface TimelineProps extends Omit<JSXDivElement, 'children' | 'content'> {
  children?: ReactNode | (() => ReactNode)
  data?: ActivityConfig[]
  ref?: React.Ref<any>
}
