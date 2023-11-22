import React, { ReactNode } from 'react'

import { FC } from '../../helpers/createFC'
import { JSXDivElement } from '../../helpers/html.types'
import { CellGroupType } from './Group/type'

export interface CellProps extends Omit<JSXDivElement, 'prefix' | 'title'> {}
export interface CellProps {
  title?: ReactNode
  value?: ReactNode
  description?: ReactNode
  size?: 'normal' | 'small' | 'large'
  loading?: boolean | 'auto'
  border?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
}

export type CellRef = HTMLDivElement

export interface CellType extends FC<CellProps> {
  Group: CellGroupType
}
