import AUTO_API from '../../helpers/AUTO_API'
export interface HookProps {
  [key: string]: any
  /** 组件内容 */
  children?: React.ReactNode | ((...args: any) => React.ReactNode)
  /** 组件内容，优先级最高 */
  hook?: (...args: any) => React.ReactNode
}

export default AUTO_API<HookProps>()
