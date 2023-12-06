import AUTO_API from '../../helpers/AUTO_API'
export interface IOProps<T = any> {
  defaultValue?: T
  value?: T
  onChange?: (value: T) => void
}

export default AUTO_API<any>()
