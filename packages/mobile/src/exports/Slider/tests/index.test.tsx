import React, { createRef } from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Slider from '..'

/** 固定容器尺寸，便于百分比与数值换算（200×200） */
function mockBoundingRect() {
  jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
    return {
      width: 200,
      height: 200,
      top: 0,
      left: 0,
      bottom: 200,
      right: 200,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect
  })
}

/** 水平拖拽：mousedown 在根节点，mousemove/mouseup 在 documentElement（与 useTouch 一致） */
function dragHorizontal(root: Element, path: { x: number; y?: number }[]) {
  const y = path[0].y ?? 100
  fireEvent.mouseDown(root, { clientX: path[0].x, clientY: y })
  for (let i = 1; i < path.length; i++) {
    fireEvent.mouseMove(document.documentElement, { clientX: path[i].x, clientY: path[i].y ?? y })
  }
  const last = path[path.length - 1]
  fireEvent.mouseUp(document.documentElement, { clientX: last.x, clientY: last.y ?? y })
}

/** 垂直拖拽（percent 取自 Y，useTouch 中 vertical 使用 100 - percentY） */
function dragVertical(root: Element, path: { y: number; x?: number }[]) {
  const x = path[0].x ?? 100
  fireEvent.mouseDown(root, { clientX: x, clientY: path[0].y })
  for (let i = 1; i < path.length; i++) {
    fireEvent.mouseMove(document.documentElement, { clientX: path[i].x ?? x, clientY: path[i].y })
  }
  const last = path[path.length - 1]
  fireEvent.mouseUp(document.documentElement, { clientX: last.x ?? x, clientY: last.y })
}

describe('Slider', () => {
  beforeEach(() => {
    mockBoundingRect()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('冒烟与结构', () => {
    test('默认渲染根节点、轨道、滑块与轨道填充', () => {
      const { container } = render(<Slider rate={0} />)
      expect(container.querySelector('.exd-slider')).toBeInTheDocument()
      expect(container.querySelector('.exd-slider-bar')).toBeInTheDocument()
      expect(container.querySelector('.exd-slider-track')).toBeInTheDocument()
      expect(container.querySelector('.exd-slider-node')).toBeInTheDocument()
    })

    test('非垂直时带有横向类名', () => {
      const { container } = render(<Slider rate={0} vertical={false} />)
      expect(container.querySelector('.exd-slider')).toHaveClass('exd-slider-horizontal')
    })

    test('ref 指向根 DOM 元素', () => {
      const ref = createRef<HTMLDivElement>()
      render(<Slider ref={ref} rate={0} />)
      expect(ref.current).toBeTruthy()
      expect(ref.current).toHaveClass('exd-slider')
    })
  })

  describe('Props 展示', () => {
    test('disabled 时根节点带禁用类名', () => {
      const { container } = render(<Slider disabled rate={0} />)
      expect(container.querySelector('.exd-slider')).toHaveClass('exd-slider-disabled')
    })

    test('vertical 为 true 时使用纵向类名且不为横向', () => {
      const { container } = render(<Slider vertical rate={0} />)
      const root = container.querySelector('.exd-slider')!
      expect(root).toHaveClass('exd-slider-vertical')
      expect(root).not.toHaveClass('exd-slider-horizontal')
    })

    test('thumb 为 false 时不渲染滑块节点', () => {
      const { container } = render(<Slider thumb={false} rate={0} />)
      expect(container.querySelector('.exd-slider-node')).toBeNull()
    })

    test('track 为 false 时不渲染轨道填充', () => {
      const { container } = render(<Slider track={false} rate={0} />)
      expect(container.querySelector('.exd-slider-track')).toBeNull()
    })

    test('min/max 与单滑块 defaultValue 数组反映为节点 left 百分比', () => {
      const { container } = render(<Slider min={0} max={200} defaultValue={[0, 100]} rate={0} />)
      const node = container.querySelector('.exd-slider-node') as HTMLElement
      expect(node?.style.left).toBe('50%')
    })

    test('单滑块 inverted 轨道使用反向宽高样式', () => {
      const { container } = render(<Slider defaultValue={[0, 50]} track="inverted" min={0} max={100} rate={0} />)
      const track = container.querySelector('.exd-slider-track') as HTMLElement
      expect(track.style.left).toBe('50%')
      expect(track.style.width).toBe('50%')
    })

    test('垂直且单滑块 inverted 轨道使用 top 与 height', () => {
      const { container } = render(
        <Slider vertical defaultValue={[0, 50]} track="inverted" min={0} max={100} rate={0} />,
      )
      const track = container.querySelector('.exd-slider-track') as HTMLElement
      expect(track.style.top).toBe('50%')
      expect(track.style.height).toBe('50%')
      expect(track.style.left).toBe('')
    })

    test('value 与 defaultValue 均为非数组时渲染双滑块（from=min、to=数字）', () => {
      const { container } = render(<Slider defaultValue={80} min={0} max={100} rate={0} />)
      const nodes = container.querySelectorAll('.exd-slider-node')
      expect(nodes).toHaveLength(2)
      expect((nodes[0] as HTMLElement).style.left).toBe('0%')
      expect((nodes[1] as HTMLElement).style.left).toBe('80%')
    })

    test('垂直模式下节点使用 top 定位', () => {
      const { container } = render(<Slider vertical defaultValue={[0, 50]} min={0} max={100} rate={0} />)
      const node = container.querySelector('.exd-slider-node') as HTMLElement
      expect(node.style.top).toBeTruthy()
      expect(node.style.left).toBe('')
    })
  })

  describe('拖拽交互（水平）', () => {
    test('mouseDown → mouseMove → mouseUp 后 onChange 为对应刻度值', () => {
      const onChange = jest.fn()
      const { container } = render(<Slider defaultValue={[0, 0]} onChange={onChange} min={0} max={100} rate={0} />)
      const root = container.querySelector('.exd-slider')!
      dragHorizontal(root, [{ x: 0 }, { x: 100 }, { x: 100 }])
      expect(onChange).toHaveBeenCalled()
      const last = onChange.mock.calls[onChange.mock.calls.length - 1][0] as number
      expect(last).toBe(50)
    })

    test('onChangeCommitted 在 mouseUp 时触发且值为最终刻度', () => {
      const onChangeCommitted = jest.fn()
      const { container } = render(
        <Slider
          defaultValue={[0, 0]}
          onChange={() => {}}
          onChangeCommitted={onChangeCommitted}
          min={0}
          max={100}
          rate={0}
        />,
      )
      const root = container.querySelector('.exd-slider')!
      dragHorizontal(root, [{ x: 0 }, { x: 200 }, { x: 200 }])
      expect(onChangeCommitted).toHaveBeenCalledWith(100)
    })

    test('step 将取值对齐到步进倍数', () => {
      const onChange = jest.fn()
      const { container } = render(
        <Slider defaultValue={[0, 0]} onChange={onChange} min={0} max={100} step={10} rate={0} />,
      )
      const root = container.querySelector('.exd-slider')!
      fireEvent.mouseDown(root, { clientX: 105, clientY: 100 })
      const v = onChange.mock.calls[onChange.mock.calls.length - 1][0] as number
      expect(v % 10).toBe(0)
    })

    test('超出 max 时钳制为 max', () => {
      const onChange = jest.fn()
      const { container } = render(<Slider defaultValue={[0, 0]} onChange={onChange} min={0} max={100} rate={0} />)
      const root = container.querySelector('.exd-slider')!
      fireEvent.mouseDown(root, { clientX: 300, clientY: 100 })
      const v = onChange.mock.calls[onChange.mock.calls.length - 1][0] as number
      expect(v).toBe(100)
    })

    test('低于 min 时钳制为 min', () => {
      const onChange = jest.fn()
      const { container } = render(<Slider defaultValue={[10, 50]} onChange={onChange} min={10} max={100} rate={0} />)
      const root = container.querySelector('.exd-slider')!
      fireEvent.mouseDown(root, { clientX: 0, clientY: 100 })
      const v = onChange.mock.calls[onChange.mock.calls.length - 1][0] as number
      expect(v).toBe(10)
    })

    test('disabled 时不触发 onChange', () => {
      const onChange = jest.fn()
      const { container } = render(
        <Slider disabled defaultValue={[0, 50]} onChange={onChange} min={0} max={100} rate={0} />,
      )
      const root = container.querySelector('.exd-slider')!
      dragHorizontal(root, [{ x: 0 }, { x: 150 }])
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('垂直拖拽', () => {
    test('垂直拖动改变取值（顶部接近 max）', () => {
      const onChange = jest.fn()
      const { container } = render(
        <Slider vertical defaultValue={[0, 0]} onChange={onChange} min={0} max={100} rate={0} />,
      )
      const root = container.querySelector('.exd-slider')!
      dragVertical(root, [{ y: 200 }, { y: 0 }, { y: 0 }])
      expect(onChange).toHaveBeenCalled()
      const last = onChange.mock.calls[onChange.mock.calls.length - 1][0] as number
      expect(last).toBe(100)
    })

    test('双滑块模式下垂直双触点按下时 onChange 传出排序后的 [from, to]', () => {
      const onChange = jest.fn()
      const { container } = render(
        <Slider vertical defaultValue={100} onChange={onChange} min={0} max={100} rate={0} />,
      )
      const root = container.querySelector('.exd-slider')!
      fireEvent.touchStart(root, {
        touches: [
          { clientX: 100, clientY: 40 } as unknown as Touch,
          { clientX: 100, clientY: 160 } as unknown as Touch,
        ],
      })
      expect(onChange).toHaveBeenCalled()
      const arg = onChange.mock.calls[onChange.mock.calls.length - 1][0] as [number, number]
      expect(Array.isArray(arg)).toBe(true)
      expect(arg[0]).toBeLessThanOrEqual(arg[1])
    })
  })

  describe('双滑块（value/defaultValue 均为非数组）与中间点分支', () => {
    /** 内部区间为 [0, 80]，中点为 40 */
    const range80Props = { defaultValue: 80, min: 0, max: 100, rate: 0 as const }

    test('onChange 传递 [from, to] 元组', () => {
      const onChange = jest.fn()
      const { container } = render(<Slider {...range80Props} onChange={onChange} />)
      const root = container.querySelector('.exd-slider')!
      fireEvent.mouseDown(root, { clientX: 60, clientY: 100 })
      expect(onChange).toHaveBeenCalled()
      const arg = onChange.mock.calls[onChange.mock.calls.length - 1][0]
      expect(Array.isArray(arg)).toBe(true)
      expect((arg as number[]).length).toBe(2)
    })

    test('触点落在中点左侧时更新左端 from', () => {
      const onChange = jest.fn()
      const { container } = render(<Slider {...range80Props} onChange={onChange} />)
      const root = container.querySelector('.exd-slider')!
      fireEvent.mouseDown(root, { clientX: 60, clientY: 100 })
      const arg = onChange.mock.calls[onChange.mock.calls.length - 1][0] as [number, number]
      expect(arg[0]).toBe(30)
      expect(arg[1]).toBe(80)
    })

    test('触点落在中点右侧时更新右端 to', () => {
      const onChange = jest.fn()
      const { container } = render(<Slider {...range80Props} onChange={onChange} />)
      const root = container.querySelector('.exd-slider')!
      fireEvent.mouseDown(root, { clientX: 180, clientY: 100 })
      const arg = onChange.mock.calls[onChange.mock.calls.length - 1][0] as [number, number]
      expect(arg[0]).toBe(0)
      expect(arg[1]).toBe(90)
    })

    test('onChangeCommitted 在双滑块模式下传递完整 [from, to]', () => {
      const onChangeCommitted = jest.fn()
      const { container } = render(
        <Slider {...range80Props} onChange={() => {}} onChangeCommitted={onChangeCommitted} />,
      )
      const root = container.querySelector('.exd-slider')!
      dragHorizontal(root, [{ x: 100 }, { x: 100 }])
      expect(onChangeCommitted).toHaveBeenCalled()
      const arg = onChangeCommitted.mock.calls[onChangeCommitted.mock.calls.length - 1][0] as [number, number]
      expect(Array.isArray(arg)).toBe(true)
      expect(arg.length).toBe(2)
    })

    test('水平双触点同时按下时按左右顺序映射为 from/to（触点右先左后）', () => {
      const onChange = jest.fn()
      const { container } = render(<Slider defaultValue={100} onChange={onChange} min={0} max={100} rate={0} />)
      const root = container.querySelector('.exd-slider')!
      fireEvent.touchStart(root, {
        touches: [
          { clientX: 160, clientY: 100 } as unknown as Touch,
          { clientX: 40, clientY: 100 } as unknown as Touch,
        ],
      })
      const arg = onChange.mock.calls[onChange.mock.calls.length - 1][0] as [number, number]
      expect(arg[0]).toBe(20)
      expect(arg[1]).toBe(80)
    })

    test('水平双触点左先右后时同样得到正确的 [from, to]', () => {
      const onChange = jest.fn()
      const { container } = render(<Slider defaultValue={100} onChange={onChange} min={0} max={100} rate={0} />)
      const root = container.querySelector('.exd-slider')!
      fireEvent.touchStart(root, {
        touches: [
          { clientX: 40, clientY: 100 } as unknown as Touch,
          { clientX: 160, clientY: 100 } as unknown as Touch,
        ],
      })
      const arg = onChange.mock.calls[onChange.mock.calls.length - 1][0] as [number, number]
      expect(arg[0]).toBe(20)
      expect(arg[1]).toBe(80)
    })
  })

  describe('受控与非受控', () => {
    test('非受控 defaultValue 数组决定滑块位置', () => {
      const { container } = render(<Slider defaultValue={[0, 25]} min={0} max={100} rate={0} />)
      const node = container.querySelector('.exd-slider-node') as HTMLElement
      expect(node?.style.left).toBe('25%')
    })

    test('受控 value 数组更新时节点的 left 同步', () => {
      const { container, rerender } = render(<Slider value={[0, 20]} onChange={() => {}} min={0} max={100} rate={0} />)
      expect((container.querySelector('.exd-slider-node') as HTMLElement).style.left).toBe('20%')
      rerender(<Slider value={[0, 80]} onChange={() => {}} min={0} max={100} rate={0} />)
      expect((container.querySelector('.exd-slider-node') as HTMLElement).style.left).toBe('80%')
    })

    test('受控单值 number 时仅渲染单滑块且 onChange 传出 number', () => {
      const onChange = jest.fn()
      const { container } = render(<Slider value={40} onChange={onChange} min={0} max={100} rate={0} />)
      expect(container.querySelectorAll('.exd-slider-node')).toHaveLength(1)
      const root = container.querySelector('.exd-slider')!
      fireEvent.mouseDown(root, { clientX: 200, clientY: 100 })
      expect(onChange).toHaveBeenCalled()
      expect(typeof onChange.mock.calls[onChange.mock.calls.length - 1][0]).toBe('number')
    })
  })

  describe('归一化边界', () => {
    test('defaultValue 既非数字也非数组时退化为 [min, min]', () => {
      const { container } = render(<Slider defaultValue={null as unknown as number} min={5} max={100} rate={0} />)
      const node = container.querySelector('.exd-slider-node') as HTMLElement
      expect(node.style.left).toBe('0%')
    })
  })
})
