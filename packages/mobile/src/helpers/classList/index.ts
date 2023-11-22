import { get, isString, isFunction, classnames } from '@fexd/tools'

export interface ClassListMethods {
  add: (className: string) => void
  remove: (className: string) => void
  contains: (className: string) => boolean
  toggle: (className: string) => void
}

export default function classList(node: HTMLElement | any): ClassListMethods {
  if (isFunction(get(node, 'classList.add'))) {
    return {
      add: (className: string) => (node as HTMLElement).classList.add(className),
      remove: (className: string) => (node as HTMLElement).classList.remove(className),
      contains: (className: string) => (node as HTMLElement).classList.contains(className),
      toggle: (className: string) => (node as HTMLElement).classList.toggle(className),
    }
  }

  if (isString(get(node, 'className'))) {
    const add = (className: string) => {
      node.className = classnames(node.className, className)
    }
    const remove = (className: string) => {
      node.className = node.className.replace(className, '')
    }
    const contains = (className: string) => node.className.indexOf(className) > -1
    return {
      add,
      remove,
      contains,
      toggle: (className: string) => (contains(className) ? remove(className) : add(className)),
    }
  }

  return {
    add: (className: string) => undefined,
    remove: (className: string) => undefined,
    contains: (className: string) => false,
    toggle: (className: string) => undefined,
  }
}
