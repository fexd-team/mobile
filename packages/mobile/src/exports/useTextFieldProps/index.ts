import React, { useRef, useImperativeHandle } from 'react'
import { isString, run } from '@fexd/tools'
import { useMemoizedFn, usePrevious } from 'ahooks'

import { JSXInputProps } from '../../helpers/html.types'
import useIOControl from '../useIOControl'
import { IOProps } from '../useIOControl/type'

export interface TextFieldProps<T = any> extends Omit<JSXInputProps, keyof IOProps<string> | 'ref'> {
  ref?: React.Ref<T>
}
export interface TextFieldProps<T> extends IOProps<string> {
  ref?: React.Ref<T>
  normalize?: (value: string, prevValue?: string) => string
  normalizeTrigger?: 'onChange' | 'onBlur'
  format?: (value: string) => string
}

export function identity<T>(value: T): T {
  return value
}

export const defaultProps = {
  normalize: identity,
  normalizeTrigger: 'onChange',
  format: identity,
}

// /**
//  * 计算合理的光标位置（用于 input 输入框发生 format/normalize 行为后修正光标后跳的问题）
//  * @param rawValue 原始值
//  * @param currentValue 实际当前值
//  * @param currentCursorPosition 当前光标位置
//  * @returns 修正后的光标位置
//  */
// function getNextCursorPosition(rawValue: string, currentValue: string, currentCursorPosition: number) {
//   /**
//    * 示例：
//    * rawValue: '123|456'   “|” 为光标模拟
//    * currentValue: '1,234,567'
//    * currentCursorPosition: 3
//    *
//    * 以下注释为示例计算过程
//    */

//   // 截取原始值 '123456' 中光标位置 3 前的内容，得到 '123'
//   const matchValueRange = rawValue.slice(0, currentCursorPosition)

//   // 使用截取段生成匹配正则，得到 /^1?.*2?.*3/
//   const matchRegExp = new RegExp(`^${matchValueRange.split('').join('?.*')}`)

//   // 在当前值 '1,234,567' 中查找匹配正则，得到 '1,23'
//   const matchCurrentValueRange = currentValue.match(matchRegExp)?.[0]

//   console.log(currentValue, matchValueRange, matchCurrentValueRange)

//   // 修正后的光标位置则为当前值匹配段的长度，如果找不到，就是用当前值长度（光标后跳）
//   return matchCurrentValueRange?.length ?? currentValue.length
// }

export default function useTextFieldProps<T>(props: TextFieldProps<T>, { noFormat = false } = {}) {
  const {
    ref: targetRef,
    format = identity,
    normalize = identity,
    normalizeTrigger,
    ...restProps
  } = {
    ...props,
    ...(noFormat
      ? {
          format: identity,
          normalize: identity,
        }
      : {}),
  }
  const inputRef = useRef<T>(null)
  const { value, setValue, getValue, focused, setFocused } = useIOControl(props)
  const prevValue = usePrevious(value)
  const prevValueRef = useRef(prevValue)
  prevValueRef.current = prevValue

  useImperativeHandle(targetRef, () => inputRef.current as T, [inputRef.current])

  const onChange = useMemoizedFn((e: string | React.ChangeEvent<T & HTMLInputElement>) => {
    const prevValue = getValue()
    const rawNextValue = (isString(e) ? e : (e as any)?.nativeEvent?.text) as string
    let nextValue = rawNextValue

    if (normalizeTrigger === 'onChange') {
      nextValue = normalize(rawNextValue, prevValue)

      // const cursorPosition = e.target?.selectionStart!
      // const cursorAtEnd = cursorPosition === nextValue.length
      // if (!cursorAtEnd) {
      //   setTimeout(() => {
      //     const rawValue = nextValue
      //     const currentValue = inputRef?.current!.value
      //     const nextCursorPosition = getNextCursorPosition(rawValue, currentValue, cursorPosition)
      //     inputRef?.current?.setSelectionRange(nextCursorPosition, nextCursorPosition)
      //   }, 1)
      // }
    }

    setValue(nextValue)
  })

  const onFocus = useMemoizedFn((e) => {
    setFocused(true)

    run(restProps, 'onFocus', e)
  })

  const onBlur = useMemoizedFn((e) => {
    setFocused(false)

    if (normalizeTrigger === 'onBlur') {
      setValue((currentValue: any) => normalize(String(currentValue), prevValueRef.current))
    }

    run(restProps, 'onBlur', e)
  })

  return {
    ...restProps,
    ...(noFormat
      ? {
          format: props?.format,
          normalize: props?.normalize,
        }
      : {}),
    ref: inputRef,
    value: !value ? '' : format(String(value ?? '')),
    focused,
    onChange,
    onFocus,
    onBlur,
  }
}
