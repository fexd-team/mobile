export interface HookProps {
  [key: string]: any
  hook?: (...args: any) => React.ReactNode
  children?: React.ReactNode | ((...args: any) => React.ReactNode)
}
