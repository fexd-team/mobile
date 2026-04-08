import { act, cleanup, fireEvent } from '@testing-library/react'
import * as store from '../exports/modalStore/store'

/**
 * fake timer 批量推进，解决多层 setTimeout / debounce 嵌套问题。
 * 适用组件：toast / notify / loading / Modal onConflict / PickerView scroll debounce /
 *           Swiper autoplay / Collapse 高度动画 / Portal removeChild / createForm
 */
export async function waitFakeTimers(loops = 10, ms = 1000) {
  for (let i = 0; i < loops; i++) {
    await act(async () => {
      jest.advanceTimersByTime(ms)
    })
  }
}

/**
 * 拖拽模拟：mouseDown → mouseMove × N → mouseUp
 * 适用组件：Slider、Drag
 */
export function mockDrag(el: Element, points: Array<{ clientX: number; clientY: number }>) {
  const [start, ...moves] = points
  fireEvent.mouseDown(el, { buttons: 1, ...start })
  for (const pt of moves) fireEvent.mouseMove(el, { buttons: 1, ...pt })
  fireEvent.mouseUp(el)
}

/**
 * Touch 滑动模拟：touchStart → touchMove × N → touchEnd
 * 适用组件：Rate、Swiper、SwipeAction
 */
export function mockTouch(el: Element, points: Array<{ clientX: number; clientY: number }>) {
  const [start, ...moves] = points
  fireEvent.touchStart(el, { touches: [start] })
  for (const pt of moves) fireEvent.touchMove(el, { touches: [pt] })
  fireEvent.touchEnd(el)
}

/**
 * 弹窗类测试统一清理。
 * 适用：所有使用 Modal / Popup / Dialog / ActionSheet / toast / notify / loading 的测试文件。
 * 用法：afterEach(cleanupModals)
 *
 * 注意：不使用 document.body.innerHTML = ''，因为 Portal 内部 removeChild 有 debounce + throttle，
 * 直接清空 body 会导致延迟执行的 removeChild 触发 NotFoundError 竞态。
 */
export function cleanupModals() {
  store.destroyAll()
  store.map.clear()
  cleanup()
}
