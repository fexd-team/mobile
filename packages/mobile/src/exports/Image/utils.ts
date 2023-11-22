// 合并props
export const mergeProps = (props: Record<string, any>, defaultProps: Record<string, any>) => {
  if (!props || !defaultProps) return props
  const result: Record<string, any> = props
  for (const key in defaultProps) {
    if (Object.prototype.hasOwnProperty.call(defaultProps, key)) {
      const value = defaultProps[key]
      if (!Reflect.has(result, key)) {
        result[key] = value
      }
    }
  }
  return result
}

/**
 *  寻找第一个可以滚动的父元素
 * @param node
 * @returns
 */
export const findScrollParent = (node: HTMLElement): HTMLElement => {
  if (node.parentElement) {
    if (node.parentElement.scrollHeight > node.parentElement.clientHeight) {
      return node.parentElement
    } else {
      return findScrollParent(node.parentElement)
    }
  } else {
    return node
  }
}
