import { isObject } from '@fexd/tools'
import { createEventBus, objectAssign, isFunction } from './helpers'

const eventBus = createEventBus()
const collection = new Set()
const reactiveMap = new Map()

const depend = (effect: any) => {
  collection.clear()
  const res = isFunction(effect) ? effect() : effect
  const dependKeys = Array.from(collection.values())
  collection.clear()
  // console.log(dependKeys)
  return [res, dependKeys]
}

export const watch = (watcher: any, callback: any, lazy?: any) => {
  let canTrigger = true
  let currentValue: any
  const listenerMap: any = {}
  const updateDependKey = (eventKey: any) => {
    if (listenerMap[eventKey]) {
      return
    }

    listenerMap[eventKey] = eventBus.on(eventKey, () => {
      // console.log('on event', eventKey)
      canTrigger = true
      if (!lazy) {
        trigger()
      }
    })
  }

  function effect() {
    if (reactiveMap.has(watcher)) {
      updateDependKey(reactiveMap.get(watcher))
      currentValue = watcher
      return watcher
    }

    const dependConfig = depend(watcher)
    const value = dependConfig[0]
    const dependKeys = dependConfig[1]
    dependKeys.forEach(updateDependKey)
    currentValue = value
    return value
  }

  function trigger() {
    if (!canTrigger) {
      return currentValue
    }
    // console.log('compute 了')

    const value = effect()
    callback(isObject(value) ? { ...value } : value)
    canTrigger = false
    return value
  }

  function stop() {
    Object.values(listenerMap).forEach((stop: any) => stop())
  }

  effect()

  stop.trigger = trigger

  return stop
}

export const computed = (effect: any, immediate?: any) => {
  let computedValue: any

  const { trigger: compute } = watch(
    effect,
    (value: any) => {
      computedValue = value
    },
    !immediate,
  )

  const reactiveComputed = {}
  Object.defineProperty(reactiveComputed, 'value', {
    get() {
      return compute()
    },
    set() {
      return computedValue
    },
  })

  return reactiveComputed
}

const getRandomEventKey = () => Math.floor(Math.random() * 100000)

export const reactive = (obj: any) => {
  const objEventKey = getRandomEventKey()
  const addEventCollection = (prop: any) => {
    collection.add(`${objEventKey}:${String(prop)}`)
  }
  const emitChangeEvent = (prop: any) => {
    eventBus.emit(`${objEventKey}:${String(prop)}`)
    eventBus.emit(objEventKey)
  }
  const reactiveObj = new Proxy(objectAssign({}, obj), {
    get(obj, prop) {
      // console.log(`get ${prop}`)
      addEventCollection(prop)
      return obj[prop]
    },
    has(obj, prop) {
      // console.log(`check has ${prop}`)
      addEventCollection(prop)
      return prop in obj
    },
    set(obj, prop, value) {
      const changed = value !== obj[prop]
      // console.log(`set ${prop} to ${value}`)

      obj[prop] = value

      if (changed) {
        emitChangeEvent(prop)
      }

      return true
    },
    deleteProperty(obj, prop) {
      const changed = prop in obj
      delete obj[prop]

      if (changed) {
        emitChangeEvent(prop)
      }

      return true
    },
  })
  reactiveMap.set(reactiveObj, objEventKey)
  return reactiveObj
}

// Object.assign(window, {
//   reactive,
//   computed,
//   watch,
// })

// var obj = reactive({ a: 1, b: 1, c: 4, d: 5 })
// var aa = computed(() => obj.a * 10)
// var bb = computed(() => obj.b * 10, true)
// var stopC = watch(
//   () => obj.c,
//   () => {
//     console.log(obj.c)
//   }
// )
// var stop = watch(obj, () => {
// console.log('obj 更新了')
// })
