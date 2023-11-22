import React from 'react'
import { ValueType } from '../type'

type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

export interface TabItemProps<T = ValueType> extends Omit<JSXDivElement, 'onClick'> {
  display?: 'scroll' | 'flex'
  value?: T
  disabled?: boolean
  tabIndex?: number
  isActive?: boolean
  onClick?: (value: T, index: number) => void
  onOffsetChange?: (offsetLeft: number, offsetWidth: number) => void
  ellipsis?: boolean
}
