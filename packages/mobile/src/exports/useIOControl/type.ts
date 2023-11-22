export interface IOProps<T = any> {
  defaultValue?: T
  value?: T
  onChange?: (value: T) => void
}
