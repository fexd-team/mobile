import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'
import { JSXDivProps } from '../../helpers/html.types'

export const BadgeStatus = ['primary', 'success', 'warning', 'danger']
export interface BadgeProps extends Omit<JSXDivProps, 'content'> {
  className?: string
  content?: React.ReactNode
  visible?: boolean
  dot?: boolean
  showZero?: boolean
  color?: string
  bgColor?: string
  offset?: [number | string, number | string]
  overflowCount?: number | string
  // children?: React.ReactNode
  style?: React.CSSProperties & Partial<Record<string, string>>
  type?: 'primary' | 'success' | 'warning' | 'danger'
}

export type BadgeRef = any

export default AUTO_API<BadgeProps>()
