import React from 'react'
import { GapType } from '../type'

export interface SpaceItemProps {
  border?: boolean
  className?: string
  split?: string | React.ReactNode
  direction?: 'vertical' | 'horizontal'
  last?: boolean
  intervalGap: number
  horizontalGap: number
  wrap?: boolean
  children?: React.ReactNode
}
