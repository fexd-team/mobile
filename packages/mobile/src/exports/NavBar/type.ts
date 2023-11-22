import React, { createContext } from 'react'

export type ModalIdType = string
export type ModalLevel = 'low' | 'normal' | 'high' | 'highest'

type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

export interface NavBarProps extends JSXDivElement {
  alignCenter?: boolean
  children: React.ReactNode
  left?: React.ReactNode | (() => React.ReactNode)
  right?: React.ReactNode | (() => React.ReactNode)
  contentClassName?: string
  ref?: React.Ref<HTMLDivElement>
}
