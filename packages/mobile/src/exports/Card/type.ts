import React, { ReactNode } from 'react'

type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

export interface CardProps extends Omit<JSXDivElement, 'title'> {
  title?: ReactNode
  titleExtra?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  footerExtra?: ReactNode
  after?: ReactNode | (() => ReactNode)
  ref?: React.Ref<any>
}
