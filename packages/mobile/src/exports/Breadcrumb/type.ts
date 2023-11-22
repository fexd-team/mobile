import React from 'react'

type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

export interface BreadcrumbProps extends Omit<JSXDivElement, 'onClick'> {
  data: React.ReactNode[]
  onClick?: (idx: number, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  ref?: React.Ref<any>
}
