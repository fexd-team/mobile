import React, { ReactNode } from 'react'

type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

export interface ListProps extends JSXDivElement {
  headerBorder?: boolean
  header?: ReactNode | (() => ReactNode)
  children?: ReactNode
  borderless?: boolean
  ref?: React.Ref<any>
}
