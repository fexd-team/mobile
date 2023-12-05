import AUTO_API from '../../helpers/AUTO_API'
export interface HookProps {
  [key: string]: any
  hook?: (...args: any) => React.ReactNode
  children?: React.ReactNode | ((...args: any) => React.ReactNode)
}

export default AUTO_API<HookProps>()
