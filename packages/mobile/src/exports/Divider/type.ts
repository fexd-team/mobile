type JSXDivElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

export interface DividerProps extends JSXDivElement {
  children?: React.ReactNode
  ref?: React.Ref<HTMLDivElement>
  vertical?: boolean
}
