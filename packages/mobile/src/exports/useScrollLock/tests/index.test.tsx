import { renderHook } from '@testing-library/react'

jest.mock('@fexd/tools', () => {
  const actual = jest.requireActual('@fexd/tools') as Record<string, unknown>
  return {
    ...actual,
    run(target: unknown, method?: string, ...args: unknown[]) {
      if (typeof target === 'function' && method === undefined) {
        return (target as () => void)()
      }
      if (method === 'addEventListener' && typeof args[0] === 'function') {
        return (target as HTMLElement).addEventListener(
          'touchmove',
          args[0] as EventListener,
          args[1] as AddEventListenerOptions,
        )
      }
      if (method === 'removeEventListener' && typeof args[0] === 'function') {
        return (target as HTMLElement).removeEventListener(
          'touchmove',
          args[0] as EventListener,
          args[1] as EventListenerOptions,
        )
      }
      return (actual.run as (t: unknown, m?: string, ...r: unknown[]) => unknown)(target, method, ...args)
    },
  }
})

import useScrollLock, { scrollLock } from '..'

describe('useScrollLock', () => {
  test('scrollLock 加锁后元素带有锁定类名，解锁后移除', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const unlock = scrollLock(el)
    expect(el.classList.contains('exd-scroll-lock')).toBe(true)
    unlock()
    expect(el.classList.contains('exd-scroll-lock')).toBe(false)
    el.remove()
  })

  test('同一元素多次 scrollLock：引用计数，首次加锁末次才解锁', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const u1 = scrollLock(el)
    const u2 = scrollLock(el)
    expect(el.classList.contains('exd-scroll-lock')).toBe(true)
    u1()
    expect(el.classList.contains('exd-scroll-lock')).toBe(true)
    u2()
    expect(el.classList.contains('exd-scroll-lock')).toBe(false)
    el.remove()
  })

  test('重复调用 unlock：计数已为零时不再 remove 监听器', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const u = scrollLock(el)
    u()
    expect(el.classList.contains('exd-scroll-lock')).toBe(false)
    u()
    expect(el.classList.contains('exd-scroll-lock')).toBe(false)
    el.remove()
  })

  test('锁定后 touchmove 会执行 lockHandler 并 preventDefault', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const unlock = scrollLock(el)
    const ev = new Event('touchmove', { cancelable: true })
    const spy = jest.spyOn(ev, 'preventDefault')
    el.dispatchEvent(ev)
    expect(spy).toHaveBeenCalled()
    unlock()
    el.remove()
  })

  test('lock 为 true 时挂载对元素加锁，卸载时解锁', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const { unmount } = renderHook(() => useScrollLock({ lock: true, elements: [el] }))
    expect(el.classList.contains('exd-scroll-lock')).toBe(true)
    unmount()
    expect(el.classList.contains('exd-scroll-lock')).toBe(false)
    el.remove()
  })

  test('lock 为 false 时不加锁', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    renderHook(() => useScrollLock({ lock: false, elements: [el] }))
    expect(el.classList.contains('exd-scroll-lock')).toBe(false)
    el.remove()
  })

  test('lock 由 false 切 true 时再执行加锁', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const { rerender } = renderHook(({ lock }) => useScrollLock({ lock, elements: [el] }), {
      initialProps: { lock: false },
    })
    expect(el.classList.contains('exd-scroll-lock')).toBe(false)
    rerender({ lock: true })
    expect(el.classList.contains('exd-scroll-lock')).toBe(true)
    el.remove()
  })

  test('多元素同时加锁', () => {
    const a = document.createElement('div')
    const b = document.createElement('div')
    document.body.append(a, b)
    const { unmount } = renderHook(() => useScrollLock({ lock: true, elements: [a, b] }))
    expect(a.classList.contains('exd-scroll-lock')).toBe(true)
    expect(b.classList.contains('exd-scroll-lock')).toBe(true)
    unmount()
    expect(a.classList.contains('exd-scroll-lock')).toBe(false)
    expect(b.classList.contains('exd-scroll-lock')).toBe(false)
    a.remove()
    b.remove()
  })
})
