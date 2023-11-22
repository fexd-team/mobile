import React from 'react'

type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

export const BadgeStatus = ['primary', 'success', 'warning', 'danger']
export interface BadgeProps extends Omit<JSXDivElement, 'content'> {
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
