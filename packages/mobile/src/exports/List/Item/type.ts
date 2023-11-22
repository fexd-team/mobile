import React, { ReactNode } from 'react'

type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

export interface ListItemProps extends Omit<JSXDivElement, 'children'> {
  border?: boolean
  children?: ReactNode | (() => ReactNode)
  extra?: ReactNode | (() => ReactNode)
  ref?: React.Ref<any>
}
