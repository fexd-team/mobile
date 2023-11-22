type JSXElement = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'content'>

export interface AvatarGroupProps extends JSXElement {
  max?: number
  total?: number
}
export type AvatarGroupRef = any
