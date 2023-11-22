type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

export interface FlexProps extends JSXDivElement {
  children?: React.ReactNode | any
  targetRef?: React.Ref<HTMLDivElement>
  vertical?: boolean
  align?: 'top' | 'middle' | 'bottom'
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
  wrap?: boolean
  gutter?: [number, number]
  columns?: number
  border?: boolean
  center?: boolean
  square?: boolean
  smValue?: number
  mdValue?: number
  lgValue?: number
}
