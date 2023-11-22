import React from 'react'

type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

export interface BadgeStampProps extends JSXDivElement {
  className?: string
  text?: React.ReactNode
  color?: string
  bgColor?: string
  // children?: React.ReactNode
  style?: React.CSSProperties & Partial<Record<string, string>>
}
