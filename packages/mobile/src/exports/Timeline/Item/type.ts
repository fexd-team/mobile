import React, { ReactNode } from 'react'

type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

export interface TimelineItemProps extends Omit<JSXDivElement, 'title' | 'children'> {
  title?: ReactNode
  time?: ReactNode
  dot?: ReactNode | (() => ReactNode)
  children?: ReactNode | (() => ReactNode)
  ref?: React.Ref<any>
}
