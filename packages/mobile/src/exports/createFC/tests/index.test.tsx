import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import createFC from '..'

describe('createFC', () => {
  afterEach(() => {
    cleanup()
  })

  test('返回可正常挂载的 React 组件', () => {
    const Demo = createFC<{ title?: string }, HTMLSpanElement>(function Demo({ title }, ref) {
      return (
        <span ref={ref} data-testid="demo">
          {title}
        </span>
      )
    })
    const { getByTestId } = render(<Demo title="hi" />)
    expect(getByTestId('demo')).toHaveTextContent('hi')
  })

  test('forwardRef：ref 指向内部 DOM', () => {
    const Box = createFC<Record<string, unknown>, HTMLDivElement>(function Box(_p, ref) {
      return <div ref={ref} className="box-inner" />
    })
    const ref = React.createRef<HTMLDivElement>()
    render(<Box ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveClass('box-inner')
  })

  test('可为组件赋值 defaultProps 且渲染生效', () => {
    const Labeled = createFC<{ label?: string }, HTMLSpanElement>(function Labeled({ label }, ref) {
      return (
        <span ref={ref} data-testid="lab">
          {label}
        </span>
      )
    })
    Labeled.defaultProps = { label: '默认文案' }
    const { getByTestId } = render(<Labeled />)
    expect(getByTestId('lab')).toHaveTextContent('默认文案')
  })

  test('memo：相同 props 重复渲染时不重复调用 render 函数', () => {
    const renderInner = jest.fn(function Inner({ n }: { n: number }, _ref: React.Ref<HTMLSpanElement>) {
      return <span data-testid="n">{n}</span>
    })
    const Memoed = createFC<{ n: number }, HTMLSpanElement>(renderInner)
    const { rerender, getByTestId } = render(<Memoed n={1} />)
    expect(getByTestId('n')).toHaveTextContent('1')
    expect(renderInner).toHaveBeenCalledTimes(1)
    rerender(<Memoed n={1} />)
    expect(renderInner).toHaveBeenCalledTimes(1)
    rerender(<Memoed n={2} />)
    expect(renderInner).toHaveBeenCalledTimes(2)
  })

  test('render 形参少于 2 个时会修补 length，仍可配合 forwardRef 使用', () => {
    const ShortInner = ((props: { t?: string }) => (
      <span data-testid="short">{props.t}</span>
    )) as React.ForwardRefRenderFunction<HTMLSpanElement, { t?: string }>
    expect(ShortInner.length).toBeLessThan(2)
    const Short = createFC(ShortInner)
    const { getByTestId } = render(<Short t="补长度" />)
    expect(getByTestId('short')).toHaveTextContent('补长度')
  })

  test('传入 propsAreEqual 时由自定义比较控制是否重渲染', () => {
    const inner = jest.fn(function Deep({ box }: { box: { x: number } }, _ref: React.Ref<HTMLSpanElement>) {
      return <span data-testid="deep">{box.x}</span>
    })
    const DeepMemo = createFC<{ box: { x: number } }, HTMLSpanElement>(inner, (a, b) => a.box.x === b.box.x)
    const { rerender, getByTestId } = render(<DeepMemo box={{ x: 1 }} />)
    expect(getByTestId('deep')).toHaveTextContent('1')
    expect(inner).toHaveBeenCalledTimes(1)
    rerender(<DeepMemo box={{ x: 1 }} />)
    expect(inner).toHaveBeenCalledTimes(1)
    rerender(<DeepMemo box={{ x: 2 }} />)
    expect(inner).toHaveBeenCalledTimes(2)
  })

  test('产物组件可设置 displayName 供调试识别', () => {
    function BrandRow(props: { name?: string }, ref: React.Ref<HTMLDivElement>) {
      return (
        <div ref={ref} data-testid="brand">
          {props.name}
        </div>
      )
    }
    const Row = createFC(BrandRow)
    Row.displayName = 'BrandRowExport'
    expect(Row.displayName).toBe('BrandRowExport')
  })
})
