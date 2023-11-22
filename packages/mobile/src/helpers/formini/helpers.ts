/* eslint-disable prefer-spread */
/* eslint-disable prefer-rest-params */
const defaultMapper = () => ({})

type Mapper = (...args: any[]) => {
  [key: string]: any
}

export const concat = Array.prototype.concat.bind([])
export const objectAssign = Object.assign
export const objectEntries = Object.entries
export const defineProperty = (obj: any, key: any, value: any) => {
  obj[key] = value
  return obj
}
export const applyFunction = (func: any, args: any) => func.apply(undefined, args)

export const debounce = (func: any, wait?: any) => {
  let timeout: any

  return function () {
    const args = arguments
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      applyFunction(func, args)
    }, wait)

    return timeout
  }
}

export const arr2map = (arr: any, mapper?: Mapper) =>
  applyFunction(objectAssign, concat({}, (arr || []).map(mapper || defaultMapper)))

export const mapObject = (obj: any, mapper?: Mapper) =>
  applyFunction(
    objectAssign,
    concat(
      {},
      Object.entries(obj || {}).map((args, idx) => (mapper || defaultMapper).apply(undefined, concat(args, idx))),
    ),
  )

export const fields2map = (fields: any, getFieldValue: any) =>
  arr2map(fields, (field) => defineProperty({}, field.name, getFieldValue(field)))

export const getFieldsData = (fields: any) => ({
  keys: fields.map((field: any) => field.name),
  // allRules: fields.reduce(
  //   (allRules: any, field: any) =>
  //     defineProperty(
  //       allRules,
  //       field.name,
  //       concat(
  //         allRules[field.name] || [],
  //         field.rules.map((rule: any) => objectAssign(rule, { field })),
  //       ),
  //     ),
  //   {},
  // ),
  values: fields2map(fields, (field: any) => field.defaultValue),
  errors: fields2map(fields, () => undefined),
})

export const getEventListener = (listener: any, debounceDelay?: any) => {
  const debouncedListener = debounce(listener, debounceDelay)
  return debounceDelay !== false ? debouncedListener : listener
}

export const createEventBus = () => {
  const listenerMap: any = {}
  const getCollection = (event: any) => {
    listenerMap[event] = listenerMap[event] || new Set()
    return listenerMap[event]
  }

  return {
    on(event: any, listener: any) {
      const collection = getCollection(event)
      collection.add(listener)
      return () => collection.delete(listener)
    },
    emit(event: any, value?: any) {
      const collection = getCollection(event)
      Array.from(collection.values()).forEach((listener: any) => listener(value))
    },
  }
}

export const isFunction = (val: any): val is Function => typeof val === 'function'
