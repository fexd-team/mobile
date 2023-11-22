import React, { ReactNode } from 'react'

type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

export interface GridItemProps extends Omit<JSXDivElement, 'children'> {
  icon?: ReactNode | (() => ReactNode)
  text?: string
  children?: ReactNode | (() => ReactNode)
  extra?: ReactNode | (() => ReactNode)
  // ref?: React.Ref<any>
}
