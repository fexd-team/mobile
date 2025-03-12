import { ReactNode } from 'react'

import AUTO_API from '../../helpers/AUTO_API'
import { Form } from '../createForm/type'
import { useContextForm } from './context'
import createForm from './createForm'
import Field from './Field'
import useRelative from './useRelative'
import useValue from './useValue'
import useError from './useError'
import useForm from './useForm'
import useWatchValue from './useWatchValue'

export interface FormProps {
  /**
   * @description 严格模式：只处理注册了 field 的值
   * @default true
   */
  strict?: boolean
  /** form 实例 */
  form?: Form
  /** 表单控制区域的内容，<Form.Field> 必须被 <Form> 包裹 */
  children?: ReactNode
  /**
   * @description 当值变化时，是否自动校验
   * @default true
   */
  validateOnChange?: boolean
}
export type FormRef = any

export type BasicFormType = React.FC<FormProps>

export interface FormInstanceHookMethods {
  /**
   * @description 创建一个表单的关联值
   * @default --
   */
  useRelative: typeof useRelative
  /**
   * @description 获取当前表单上下文内的某个 value
   * @default --
   */
  useValue: typeof useValue
  /**
   * @description 获取当前表单上下文内的某个 value
   * @default --
   */
  useError: typeof useError
  /**
   * @description 创建一个 value 的监听器
   * @default --
   */
  useWatchValue: typeof useWatchValue
}

export interface FormInstance extends Form {}
export interface FormInstance extends FormInstanceHookMethods {}

export interface FormStaticMethods extends FormInstanceHookMethods {
  /**
   * @description 用来创建一个表单的作用域
   * @default --
   */
  Field: typeof Field
  /**
   * @description 创建一个 react 组件内的表单 form 控制器实例
   * @default --
   */
  useForm: typeof useForm
  /**
   * @description 获取当前表单上下文内的 form 控制器实例
   * @default --
   */
  useContextForm: typeof useContextForm
  /**
   * @description 创建一个的表单 form 控制器实例（非 react 环境）
   * @default --
   */
  createForm: typeof createForm
}
export interface FormType extends BasicFormType {}
export interface FormType extends FormStaticMethods {}

export default AUTO_API<FormProps>()
export const DOC_FormStaticMethods = AUTO_API<FormStaticMethods>()
export const DOC_FormInstance = AUTO_API<FormInstance>()
// export const DOC_FormProps = AUTO_API<FormProps>()
