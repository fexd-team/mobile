export interface FormWatchOptions {
  debounce?: number | boolean | false
}

export interface FormField {
  name: string
  defaultValue?: any
  rules?: FormRule[]
}

export type FormRule = (value: any, values: any, field: FormField) => Promise<any> | any

interface FormOverridedField {
  name?: string
  defaultValue?: any
  rules?: FormRule[]
}

export interface FormOptions {
  fields?: FormField[]
  relatives?: {
    [key: string]: (values: any, errors: any) => any
  }
}

export type FormStopWatch = () => void
export type FormRemoveRelative = () => void
export type FormValue = any
export type FormValues = Record<string, FormValue>
export type FormError = any
export type FormErrors = Record<string, FormError>
export type FormRelative = any
export type FormRelatives = Record<string, FormRelative>
export type FormComputeRelative = (values: FormValues, errors: FormErrors) => FormRelative

export interface Form {
  getValue: (name: string) => FormValue
  getValues: () => FormValues
  setValue: (name: string, value: FormValue) => void
  setValues: (values: FormValues) => void
  watchValues: (listener: (values: FormValues) => void, options?: FormWatchOptions) => FormStopWatch
  watchValue: (name: string, listener: (value: FormValue) => void, options?: FormWatchOptions) => FormStopWatch
  getError: (name: string) => FormError
  getErrors: () => FormErrors
  setError: (name: string) => void
  setErrors: (errors: FormErrors) => void
  watchErrors: (listener: (errors: FormErrors) => void, options?: FormWatchOptions) => FormStopWatch
  watchError: (name: string, listener: (value: FormValue) => void, options?: FormWatchOptions) => FormStopWatch
  getFields: () => FormOptions['fields']
  setFields: (nextFields: FormOptions['fields']) => void
  removeField: (fieldName: string) => void
  addField: (field: FormField) => () => void
  getField: (fieldName: string) => FormField | void
  setField: (fieldName: string, field: FormOverridedField) => void
  hasField: (fieldName: string) => boolean
  // setFieldValues: (values: Values) => void;
  getRelative: (name: string) => FormRelative
  getRelatives: () => FormRelatives
  setRelatives: (configs: Record<string, FormComputeRelative>) => void
  removeRelative: (name: string) => void
  addRelative: (name: string, compute: FormComputeRelative) => FormRemoveRelative
  watchRelatives: (listener: (relatives: FormRelatives) => void, options?: FormWatchOptions) => FormStopWatch
  watchRelative: (name: string, listener: (relative: FormRelative) => void, options?: FormWatchOptions) => FormStopWatch
  watch: (listener: () => void) => FormStopWatch
  validate: (filedNames?: string[] | string) => Promise<boolean>
  reset: () => void
}
