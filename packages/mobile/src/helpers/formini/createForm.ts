/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { flatten, isUndefined, globalThis } from '@fexd/tools'
// @ts-ignore
import getProxyPolyfill from 'proxy-polyfill/src/proxy'
import { reactive, computed, watch as watchReactivity } from './reactivity'
import {
  debounce,
  createEventBus,
  mapObject,
  getFieldsData,
  getEventListener,
  isFunction,
  objectAssign,
  objectEntries,
  defineProperty,
  concat,
} from './helpers'
import { FormOptions, Form, WatchOptions } from './types'

const RELATIVE_CHANGE = 'rc'
const supportProxy = () => !isUndefined(globalThis.Proxy)
const ProxyPolyfill = getProxyPolyfill()

export default function createForm(formOptions: FormOptions = {}): Form {
  // formOptions = formOptions || {}
  const initalFields = formOptions.fields || []
  const initialRelativeConfigs = formOptions.relatives || {}
  const initialFieldsData = getFieldsData(initalFields)
  let { keys } = initialFieldsData

  // 创建响应式数据相关函数
  const buildReactivityData = (sourceData: any) => {
    const values: any = supportProxy() ? reactive(sourceData) : { ...sourceData }
    const getValue = (key: any) => {
      if (!keys.includes(key)) {
        return undefined
      }

      return (values || {})[key]
    }
    const getValues = () => {
      const data = objectAssign({}, values)

      // 过滤掉未在 fields 内声明的数据
      Object.keys(data).forEach((key) => {
        if (!keys.includes(key)) {
          delete data[key]
        }
      })

      return data
    }
    const eventBus = createEventBus()
    const setReactivityData = (data: any, update: any) => {
      if (!supportProxy()) {
        Object.keys(update).map((key) => {
          if (update[key] !== data[key]) {
            eventBus.emit(`UPDATE-${key}`, update[key])
          }
        })
      }

      objectAssign(data, update)
    }
    const setValue = (key: any, value: any) => setReactivityData(values, defineProperty({}, key, value))
    const setValues = (update: any) => {
      if (!supportProxy()) {
        eventBus.emit('UPDATE-ALL', values)
      }

      return setReactivityData(values, update || {})
    }
    const watchValues = (listener: any, options?: WatchOptions) => {
      const debouncedListener = getEventListener(listener, (options || {}).debounce)
      if (!supportProxy()) {
        return eventBus.on('UPDATE-ALL', debouncedListener)
      }
      return watchReactivity(values, getEventListener(listener, (options || {}).debounce))
    }
    const watchValue = (key: any, listener: any, options?: WatchOptions) => {
      const debouncedListener = getEventListener(listener, (options || {}).debounce)
      if (!supportProxy()) {
        eventBus.on(`UPDATE-${key}`, debouncedListener)
      }
      return watchReactivity(() => values[key], debouncedListener)
    }
    return [values, getValue, getValues, setValue, setValues, watchValues, watchValue]
  }

  // +++++++++++++++++++++++ values 相关 begin ++++++++++++++++++++++++++++
  const [values, getValue, getValues, setValue, setValues, watchValues, watchValue] = buildReactivityData(
    initialFieldsData.values,
  )
  // ----------------------- values 相关 end ------------------------------

  // +++++++++++++++++++++++ errors 相关 begin ++++++++++++++++++++++++++++
  const [errors, getError, getErrors, setError, setErrors, watchErrors, watchError] = buildReactivityData(
    initialFieldsData.errors,
  )
  // ----------------------- errors 相关 end ------------------------------

  // +++++++++++++++++++++++ fields 相关 begin ++++++++++++++++++++++++++++
  let fields = concat(initalFields)
  const getFields = () => concat(fields)
  const setFields = (nextFields: any) => {
    fields = concat(nextFields || [])
    const fieldsData = getFieldsData(fields)

    keys = fieldsData.keys
    // allRules = fieldsData.allRules

    setValues(objectAssign({}, fieldsData.values, values))
    setErrors(objectAssign({}, fieldsData.errors, errors))
  }
  const removeField = (targetField: any) => {
    if (typeof targetField === 'string') {
      const fieldName = targetField
      setFields(getFields().filter((field: any) => field.name !== fieldName))
    }

    setFields(getFields().filter((field: any) => field !== targetField))
  }
  const addField = (field: any) => {
    setFields(concat(getFields(), field))
    return () => removeField(field)
  }
  const getField = (fieldName: any) => {
    const fields = getFields()
    const field = fields?.find((field: any) => field.name === fieldName)
    return field
  }
  const setField = (fieldName: any, fieldConfig: any) => {
    const field = getField(fieldName)
    if (!!field) {
      objectAssign(field, fieldConfig)
      setFields(fields)
    } else {
      addField(objectAssign({ name: fieldName }, fieldConfig))
    }
  }
  const hasField = (fieldName: any) => !!getField(fieldName)
  // ----------------------- fields 相关 end ------------------------------

  // +++++++++++++++++++++++ relatives 相关 begin ++++++++++++++++++++++++++++
  const eventBus = createEventBus()
  const triggerRelativesChange = debounce(() => eventBus.emit(RELATIVE_CHANGE, getRelatives()))
  const currentRelatives: any = {}
  const relativeProxyPolyfillRecord = {} as Record<
    string,
    { values: { dependencies: string[]; stopList: any[] }; errors: { dependencies: string[]; stopList: any[] } }
  >
  const buildRelatives = (configs: any) =>
    mapObject(configs, (key, compute) => {
      if (!supportProxy()) {
        const computeRelative = () => {
          const currentRelative = currentRelatives[key]
          const valueDependencies: string[] = []
          const errorDependencies: string[] = []

          const nextValue = compute(
            new ProxyPolyfill(
              { ...values },
              {
                get(obj: any, key: any) {
                  valueDependencies.push(key)
                  return values[key]
                },
              },
            ),
            new ProxyPolyfill(
              { ...errors },
              {
                get(obj: any, key: any) {
                  errorDependencies.push(key)
                  return errors[key]
                },
              },
            ),
          )
          if (nextValue !== currentRelative) {
            eventBus.emit(`${RELATIVE_CHANGE}:${key}`, nextValue)
            triggerRelativesChange()
          }

          const currentRecord = relativeProxyPolyfillRecord[key] || {
            values: { dependencies: [], stopList: [] },
            errors: { dependencies: [], stopList: [] },
          }

          if (valueDependencies.join(',') !== currentRecord.values.dependencies.join(',')) {
            currentRecord.values.stopList.forEach((stop: any) => stop())
            currentRecord.values.dependencies = valueDependencies
            currentRecord.values.stopList = [
              ...valueDependencies.map((dependent) =>
                watchValue(dependent, () => {
                  computeRelative()
                }),
              ),
            ]
          }

          if (errorDependencies.join(',') !== currentRecord.errors.dependencies.join(',')) {
            currentRecord.errors.stopList.forEach((stop: any) => stop())
            currentRecord.errors.dependencies = errorDependencies
            currentRecord.errors.stopList = [
              ...errorDependencies.map((dependent) =>
                watchValue(dependent, () => {
                  computeRelative()
                }),
              ),
            ]
          }

          currentRelatives[key] = nextValue

          return nextValue
        }

        const value = computeRelative()

        return defineProperty({}, key, { value })
      }

      return defineProperty(
        {},
        key,
        computed(() => {
          //
          const currentRelative = currentRelatives[key]
          const nextValue = compute(values, errors)
          if (nextValue !== currentRelative) {
            eventBus.emit(`${RELATIVE_CHANGE}:${key}`, nextValue)
            triggerRelativesChange()
          }
          currentRelatives[key] = nextValue

          return nextValue
        }, true),
      )
    }) || {}
  let currentRelativeConfigs = objectAssign({}, initialRelativeConfigs)
  let relatives = buildRelatives(currentRelativeConfigs)
  const getRelative = (key: any) => (relatives[key] || {}).value
  const getRelatives = () => mapObject(relatives, (key, relative) => defineProperty({}, key, relative.value))
  const setRelatives = (configs: any) => {
    currentRelativeConfigs = objectAssign({}, configs)
    relatives = buildRelatives(configs)
  }
  const removeRelative = (name: any) => {
    delete currentRelativeConfigs[name]
    const currentRecord = relativeProxyPolyfillRecord[name]
    if (currentRecord) {
      flatten([Object.values(currentRecord.values.stopList), Object.values(currentRecord.errors.stopList)]).forEach(
        (stop: any) => stop(),
      )
      delete relativeProxyPolyfillRecord[name]
    }

    setRelatives(currentRelativeConfigs)
  }
  const addRelative = (name: any, compute: any) => {
    setRelatives(objectAssign({}, currentRelativeConfigs, defineProperty({}, name, compute)))

    return () => removeRelative(name)
  }
  const triggerRelativeWatcher = (eventName: any, listener: any, options?: WatchOptions) => {
    const eventListener = getEventListener(listener, (options || {}).debounce)
    return eventBus.on(eventName, eventListener)
  }
  const watchRelatives = (listener: any, options?: WatchOptions) =>
    triggerRelativeWatcher(RELATIVE_CHANGE, listener, options)
  const watchRelative = (key: any, listener: any, options?: WatchOptions) =>
    triggerRelativeWatcher(`${RELATIVE_CHANGE}:${key}`, listener, options)

  // ----------------------- relatives 相关 end ------------------------------

  // +++++++++++++++++++++++ 其他 ++++++++++++++++++++++++++++
  const watch = (listener: any) => {
    const eventListender = getEventListener(listener)
    const debounceConfig = { debounce: false }
    const stopValuesListener = watchValues(eventListender, debounceConfig)
    const stopErrorsListener = watchValues(eventListender, debounceConfig)
    const stopRelativesListener = watchRelatives(eventListender, debounceConfig)

    return () => {
      stopValuesListener()
      stopErrorsListener()
      stopRelativesListener()
    }
  }

  const validate = (filedKeys: any = keys) => {
    // filedKeys = filedKeys || keys
    if (typeof filedKeys === 'string') {
      filedKeys = [filedKeys]
    }

    const fields = getFields().filter((field: any) => filedKeys.includes(field.name))

    // 多个 fields 并行校验
    // 单个 field 的多个 rules 串行校验
    return Promise.all(
      fields.map((field: any) => {
        const key = field.name
        const rules = field.rules || []
        const value = values[key]
        setError(key, undefined)

        const applyRule = (rule: any) =>
          Promise.resolve(rule(value, values, field)).then((result) =>
            // 利用 reject 中断 Promise 串行链条
            typeof result !== 'undefined' ? Promise.reject({ error: result, field }) : undefined,
          )

        return rules
          .filter(isFunction)
          .reduce((task: any, rule: any) => task.then(() => applyRule(rule)), Promise.resolve())
          .catch((error: any) => {
            setError(key, [...(errors[key] || []), error])
            return error
          })
          .then((error: any) => !!error)
      }),
    ).then((result) => {
      const valid = !result.some(Boolean)
      return valid
    })
  }

  const reset = () => {
    const fieldsData = getFieldsData(fields)
    setValues(fieldsData.values)
    setErrors(fieldsData.errors)
  }
  // ----------------------- 其他 ----------------------------

  return {
    getValue,
    getValues,
    setValue,
    setValues,
    watchValues,
    watchValue,

    getError,
    getErrors,
    setError,
    setErrors,
    watchErrors,
    watchError,

    getFields,
    setFields,
    removeField,
    addField,
    getField,
    setField,
    hasField,
    // setFieldValues,

    getRelative,
    getRelatives,
    setRelatives,
    removeRelative,
    addRelative,
    watchRelatives,
    watchRelative,

    watch,
    validate,
    reset,
  }
}
