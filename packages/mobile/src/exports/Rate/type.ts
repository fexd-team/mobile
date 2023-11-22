type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

export interface RateProps extends Omit<JSXDivElement, 'onChange' | 'style'> {
  allowClear?: boolean
  allowHalf?: boolean
  character?: React.ReactNode
  count?: number
  defaultValue?: number
  readOnly?: boolean
  value?: number
  onChange?: (value: number) => void
  style?: React.CSSProperties & Partial<Record<string, string>>
}

export type RateRef = any
