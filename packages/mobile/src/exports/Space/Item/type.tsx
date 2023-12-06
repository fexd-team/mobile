import React from 'react'
import AUTO_API from '../../../helpers/AUTO_API'
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

export default AUTO_API<SpaceItemProps>()
