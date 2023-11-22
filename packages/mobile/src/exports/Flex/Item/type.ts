import React, { ReactNode } from 'react'

type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

export interface FlexItemProps extends Omit<JSXDivElement, 'children'> {
  children?: ReactNode | (() => ReactNode)
  style?: React.CSSProperties
  span?: number
  pull?: number
  push?: number
  offset?: number
  order?: number
  xs?: number | itemSize
  sm?: number | itemSize
  md?: number | itemSize
  lg?: number | itemSize
}

export interface itemSize {
  span?: number
  pull?: number
  push?: number
  offset?: number
  order?: number
}

export interface itemType {
  type?: number | object
  value?: string
}
