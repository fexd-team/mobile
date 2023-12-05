import React from 'react'
import { JSXDivProps } from '../../../helpers/html.types'

export interface BadgeStampProps extends JSXDivProps {
  className?: string
  text?: React.ReactNode
  color?: string
  bgColor?: string
  // children?: React.ReactNode
  style?: React.CSSProperties & Partial<Record<string, string>>
}
