import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import createFC, { creatorCache } from '../../createFC'
import cloneFC from '..'

describe('cloneFC', () => {
  afterEach(() => {
    cleanup()
  })

  test('克隆得到与源组件不同的组件引用', () => {
    const Source = createFC<{ v?: string }, HTMLSpanElement>(function Source({ v }, ref) {
      return (
        <span ref={ref} data-testid="s">
          {v}
        </span>
      )
    })
    Source.defaultProps = { v: '源' }
    const Cloned = cloneFC(Source)
    expect(Cloned).not.toBe(Source)
  })

  test('克隆组件继承 defaultProps 的取值', () => {
    const Source = createFC<{ mark?: string }, HTMLSpanElement>(function Source({ mark }, ref) {
      return (
        <span ref={ref} data-testid="m">
          {mark}
        </span>
      )
    })
    Source.defaultProps = { mark: '继承' }
    const Cloned = cloneFC(Source)
    const { getByTestId, unmount } = render(<Cloned />)
    expect(getByTestId('m')).toHaveTextContent('继承')
    unmount()
  })

  test('为克隆组件单独指定新的 defaultProps 对象不影响源组件渲染', () => {
    const Source = createFC<{ x?: string }, HTMLSpanElement>(function Source({ x }, ref) {
      return (
        <span ref={ref} data-testid="x">
          {x}
        </span>
      )
    })
    Source.defaultProps = { x: 'a' }
    const Cloned = cloneFC(Source)
    ;(Cloned as { defaultProps?: { x?: string } }).defaultProps = { x: 'b' }
    const { getByTestId: getA, unmount: u1 } = render(<Source />)
    expect(getA('x')).toHaveTextContent('a')
    u1()
    const { getByTestId: getB } = render(<Cloned />)
    expect(getB('x')).toHaveTextContent('b')
  })

  test('源组件上的自定义静态属性会挂到克隆组件上', () => {
    const Source = createFC<Record<string, unknown>, HTMLSpanElement>(function Source(_p, ref) {
      return <span ref={ref} />
    })
    ;(Source as { customFlag?: string }).customFlag = 'hoisted'
    const Cloned = cloneFC(Source)
    expect((Cloned as { customFlag?: string }).customFlag).toBe('hoisted')
  })

  test('源与克隆实例均无 defaultProps 时回退为空对象（覆盖 defaultProps 链式分支）', () => {
    const Source = createFC<{ z?: string }, HTMLSpanElement>(function ZComp({ z }, ref) {
      return (
        <span ref={ref} data-testid="z">
          {z ?? '空'}
        </span>
      )
    })
    const realFactory = creatorCache.get(Source) as () => any
    creatorCache.set(Source, () => {
      const C = realFactory()
      delete (C as { defaultProps?: unknown }).defaultProps
      return C
    })
    try {
      delete (Source as { defaultProps?: unknown }).defaultProps
      const Cloned = cloneFC(Source)
      expect((Cloned as { defaultProps?: Record<string, unknown> }).defaultProps).toEqual({})
      const { getByTestId } = render(<Cloned />)
      expect(getByTestId('z')).toHaveTextContent('空')
    } finally {
      creatorCache.set(Source, realFactory)
    }
  })
})
