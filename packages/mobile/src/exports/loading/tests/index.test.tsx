import React from 'react'
import { render, cleanup, act, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import loading from '..'
import ModalStation from '../../ModalStation'

function flushLoadingDebounce() {
  act(() => {
    jest.advanceTimersByTime(120)
  })
}

describe('loading', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(async () => {
    await act(async () => {
      while (loading.getCount() > 0) {
        loading.hide(true)
      }
      flushLoadingDebounce()
    })
    cleanup()
    document.getElementById('GLOBAL_FEXD_PROVIDER')?.remove()
    delete (globalThis as Record<string, unknown>).GLOBAL_FEXD_PROVIDER
    document.body.innerHTML = ''
    jest.useRealTimers()
  })

  test('导出包含 show、hide、getCount、defaultConfig、getController', () => {
    expect(loading).toMatchObject({
      show: expect.any(Function),
      hide: expect.any(Function),
      getCount: expect.any(Function),
      defaultConfig: expect.any(Object),
      getController: expect.any(Function),
    })
  })

  test('初始 getCount 为 0', () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    expect(loading.getCount()).toBe(0)
  })

  test('首次 show 后 getCount 为 1 且 getController 有值', () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    const ctrl = loading.show({ transitionSpeed: 'none' })
    expect(loading.getCount()).toBe(1)
    expect(loading.getController()).toBe(ctrl)
  })

  test('已在展示时再次 show 仅递增计数并返回同一控制器', () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    const first = loading.show({ transitionSpeed: 'none' })
    const second = loading.show()
    expect(second).toBe(first)
    expect(loading.getCount()).toBe(2)
  })

  test('hide 逐次减计数，计数为 0 后经 debounce 关闭', () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    loading.show({ transitionSpeed: 'none' })
    loading.show()
    loading.show()
    expect(loading.getCount()).toBe(3)
    const ctrl = loading.getController()!
    const closeSpy = jest.spyOn(ctrl, 'close')
    loading.hide()
    expect(loading.getCount()).toBe(2)
    flushLoadingDebounce()
    expect(closeSpy).not.toHaveBeenCalled()
    loading.hide()
    expect(loading.getCount()).toBe(1)
    flushLoadingDebounce()
    expect(closeSpy).not.toHaveBeenCalled()
    loading.hide()
    expect(loading.getCount()).toBe(0)
    flushLoadingDebounce()
    expect(closeSpy).toHaveBeenCalled()
    closeSpy.mockRestore()
  })

  test('hide(true) 强制关闭且计数减一后归零', () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    loading.show({ transitionSpeed: 'none' })
    expect(loading.getCount()).toBe(1)
    const ctrl = loading.getController()!
    const closeSpy = jest.spyOn(ctrl, 'close')
    loading.hide(true)
    flushLoadingDebounce()
    expect(closeSpy).toHaveBeenCalled()
    expect(loading.getCount()).toBe(0)
    closeSpy.mockRestore()
  })

  test('show 与 hide 调用不抛错', () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    expect(() => loading.show({ transitionSpeed: 'none' })).not.toThrow()
    expect(() => loading.hide()).not.toThrow()
  })

  test('传入 onExited 时在控制器 close 后退场会触发', async () => {
    jest.useRealTimers()
    const onExited = jest.fn()
    render(<ModalStation id="DEFAULT_STATION" />)
    loading.show({ transitionSpeed: 'none', onExited })
    await waitFor(() => expect(document.querySelector('.exd-loading')).toBeInTheDocument())
    await act(async () => {
      loading.getController()!.close()
    })
    await waitFor(() => expect(onExited).toHaveBeenCalled(), { timeout: 15000 })
    jest.useFakeTimers()
  }, 20000)
})
