import AUTO_API from '../../helpers/AUTO_API'
import React, { ReactNode } from 'react'

import { FC } from '../createFC/type'
import { JSXDivProps } from '../../helpers/html.types'
import { CellGroupType } from './Group/type'

export interface CellProps extends Omit<JSXDivProps, 'prefix' | 'title'> {}
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

export default AUTO_API<CellProps>()
