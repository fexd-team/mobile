type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

export interface GridProps extends JSXDivElement {
  children?: React.ReactNode
  // ref?: React.Ref<HTMLDivElement>
  vertical?: boolean
  gutter?: [number, number]
  columns?: number
  border?: boolean
  center?: boolean
  square?: boolean
}
