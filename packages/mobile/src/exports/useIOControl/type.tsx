import AUTO_API from '../../helpers/AUTO_API'
export interface IOProps<T = any> {
  /** 默认值 */
  defaultValue?: T
  /** 受控值 */
  value?: T
  /** 值变化时的回调 */
  onChange?: (value: T) => void
  /** 值过滤，返回 false 时，值无效，不触发 onChange */
  filterIOValue?: (value: any) => boolean
}

export default AUTO_API<IOProps>()
