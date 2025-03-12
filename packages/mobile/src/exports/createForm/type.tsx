import AUTO_API from '../../helpers/AUTO_API'
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
  rules?: FormRule[] | Record<string, FormRule>
}

export interface FormOptions {
  strict?: boolean
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
export type FormRelative<T = any> = T
export type FormRelatives = Record<string, FormRelative>
export type FormComputeRelative<T = any> = (values: FormValues, errors: FormErrors) => FormRelative<T>

export interface Form {
  /** 获取对应字段名的值 */
  getValue: (name: string) => FormValue
  /** 获取一组字段名对应的值，会按照对应结构返回 */
  getValues: () => FormValues
  /** 设置对应字段名的值 */
  setValue: (name: string, value: FormValue) => void
  /** 批量设置表单的值 */
  setValues: (values: FormValues) => void
  /** 监听任意字段值的变化 */
  watchValues: (listener: (values: FormValues) => void, options?: FormWatchOptions) => FormStopWatch
  /** 监听对应字段值的变化 */
  watchValue: (name: string, listener: (value: FormValue) => void, options?: FormWatchOptions) => FormStopWatch
  /** 获取对应字段名的错误信息 */
  getError: (name: string) => FormError
  /** 获取一组字段名对应的错误信息，返回为对象形式 */
  getErrors: () => FormErrors
  /** 设置对应字段名的错误信息 */
  setError: (name: string, error: FormError) => void
  /** 批量设置表单的错误信息 */
  setErrors: (errors: FormErrors) => void
  /** 监听任意字段错误的变化 */
  watchErrors: (listener: (errors: FormErrors) => void, options?: FormWatchOptions) => FormStopWatch
  /** 监听对应字段错误的变化 */
  watchError: (name: string, listener: (value: FormValue) => void, options?: FormWatchOptions) => FormStopWatch
  /** 获取所有字段配置 */
  getFields: () => FormOptions['fields']
  /** 获取特定字段配置 */
  getField: (fieldName: string) => FormField | void
  /** 批量设置字段配置 */
  setFields: (nextFields: FormOptions['fields']) => void
  /** 设置特定字段配置 */
  setField: (fieldName: string, field: FormOverridedField) => void
  /** 移除特定字段配置 */
  removeField: (fieldName: string) => void
  /** 添加字段配置 */
  addField: (field: FormField) => () => void
  /** 判断是否存在特定字段 */
  hasField: (fieldName: string) => boolean
  /** 获取对应字段名的关联关系 */
  getRelative: (name: string) => FormRelative
  /** 获取所有关联关系 */
  getRelatives: () => FormRelatives
  /** 批量设置关联关系 */
  setRelatives: (configs: Record<string, FormComputeRelative>) => void
  /** 移除关联关系 */
  removeRelative: (name: string) => void
  /** 添加关联关系 */
  addRelative: (name: string, compute: FormComputeRelative) => FormRemoveRelative
  /** 监听任意关联关系变化 */
  watchRelatives: (listener: (relatives: FormRelatives) => void, options?: FormWatchOptions) => FormStopWatch
  /** 监听特定关联关系变化 */
  watchRelative: (name: string, listener: (relative: FormRelative) => void, options?: FormWatchOptions) => FormStopWatch
  /** 监听表单的所有变化，包括关联关系、值、错误的变化 */
  watch: (listener: () => void) => FormStopWatch
  /** 触发表单验证，默认触发全部表单验证，可以指定触发的字段 */
  validate: (filedNames?: string[] | string, ruleNames?: (number | string)[]) => Promise<boolean>
  /** 重置表单 */
  reset: () => void
  /** 调整严格模式 */
  setStrict: (strict: boolean) => void
}

export default AUTO_API<Form>()
