import rawCreateForm from '../createForm'
import { FormOptions, Form } from '../createForm/type'
import { FormInstance } from './type'
import { createUseRelative } from './useRelative'
import { createUseValue } from './useValue'
import { createUseError } from './useError'
import { createUseWatchValue } from './useWatchValue'
// 此处不引入 style.less，目的是实现按需引用

export default function createForm(formOptions?: FormOptions) {
  const form = rawCreateForm(formOptions)
  const useValue = createUseValue(form)
  const useError = createUseError(form)
  const useRelative = createUseRelative(form)
  const useWatchValue = createUseWatchValue(form)

  return Object.assign(form, {
    useValue,
    useError,
    useRelative,
    useWatchValue,
  }) as FormInstance
}
