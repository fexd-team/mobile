export interface WatchOptions {
  debounce?: number | boolean | false
}

export interface Field {
  name: string
  defaultValue?: any
  rules?: Rule[]
}

export type Rule = (value: any, values: any, field: Field) => Promise<any> | any

interface OverridedField {
  name?: string
  defaultValue?: any
  rules?: Rule[]
}

export interface FormOptions {
  fields?: Field[]
  relatives?: {
    [key: string]: (values: any, errors: any) => any
  }
}

export type StopWatch = () => void
export type RemoveRelative = () => void
export type Value = any
export type Values = Record<string, Value>
export type Error = any
export type Errors = Record<string, Error>
export type Relative = any
export type Relatives = Record<string, Relative>
export type ComputeRelative = (values: Values, errors: Errors) => Relative

export interface Form {
  getValue: (name: string) => Value
  getValues: () => Values
  setValue: (name: string, value: Value) => void
  setValues: (values: Values) => void
  watchValues: (listener: (values: Values) => void, options?: WatchOptions) => StopWatch
  watchValue: (name: string, listener: (value: Value) => void, options?: WatchOptions) => StopWatch
  getError: (name: string) => Error
  getErrors: () => Errors
  setError: (name: string) => void
  setErrors: (errors: Errors) => void
  watchErrors: (listener: (errors: Errors) => void, options?: WatchOptions) => StopWatch
  watchError: (name: string, listener: (value: Value) => void, options?: WatchOptions) => StopWatch
  getFields: () => FormOptions['fields']
  setFields: (nextFields: FormOptions['fields']) => void
  removeField: (fieldName: string) => void
  addField: (field: Field) => () => void
  getField: (fieldName: string) => Field | void
  setField: (fieldName: string, field: OverridedField) => void
  hasField: (fieldName: string) => boolean
  // setFieldValues: (values: Values) => void;
  getRelative: (name: string) => Relative
  getRelatives: () => Relatives
  setRelatives: (configs: Record<string, ComputeRelative>) => void
  removeRelative: (name: string) => void
  addRelative: (name: string, compute: ComputeRelative) => RemoveRelative
  watchRelatives: (listener: (relatives: Relatives) => void, options?: WatchOptions) => StopWatch
  watchRelative: (name: string, listener: (relative: Relative) => void, options?: WatchOptions) => StopWatch
  watch: (listener: () => void) => StopWatch
  validate: (filedNames?: string[] | string) => Promise<boolean>
  reset: () => void
}
