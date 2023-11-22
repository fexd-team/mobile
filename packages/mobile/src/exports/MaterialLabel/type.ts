import React from 'react'

export interface MaterialLabelProps {
  className?: string
  label?: React.ReactNode
  placeholder?: React.ReactNode
  autoHeight?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  helper?: React.ReactNode
  active?: boolean
  type?: 'warn' | 'error' | 'info'
  disabled?: boolean
  children?: React.ReactNode
  onClick?: (e: any) => void
}
