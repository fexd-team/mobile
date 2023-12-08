import AUTO_API from '../../helpers/AUTO_API'
export interface IOProps<T = any> {
  /** 默认值 */
  defaultValue?: T
  /** 受控值 */
  value?: T
  /** 值变化时的回调 */
  onChange?: (value: T) => void
}

export default AUTO_API<IOProps>()
