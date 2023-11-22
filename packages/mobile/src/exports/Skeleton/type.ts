import React, { ReactNode } from 'react'

type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

export interface SkeletonProps extends JSXDivElement {
  round?: boolean
  ref?: React.Ref<any>
}
