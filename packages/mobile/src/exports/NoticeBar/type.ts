import React, { ReactNode } from 'react'

type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

export interface NoticeBarProps extends JSXDivElement {
  text?: ReactNode
  animation?: boolean
  ref?: React.Ref<any>
}
