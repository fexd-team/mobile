import React from 'react'
import { ValueType } from '../type'
import { JSXDivProps } from '../../../helpers/html.types'

export interface TabItemProps<T = ValueType> extends Omit<JSXDivProps, 'onClick'> {
  display?: 'scroll' | 'flex'
  value?: T
  disabled?: boolean
  tabIndex?: number
  isActive?: boolean
  onClick?: (value: T, index: number) => void
  onOffsetChange?: (offsetLeft: number, offsetWidth: number) => void
  ellipsis?: boolean
}
