import React from 'react'
import { render, cleanup, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import notify from '..'
import ModalStation from '../../ModalStation'

describe('notify', () => {
  afterEach(async () => {
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0))
    })
    cleanup()
    document.getElementById('GLOBAL_FEXD_PROVIDER')?.remove()
    delete (globalThis as Record<string, unknown>).GLOBAL_FEXD_PROVIDER
    document.body.innerHTML = ''
  })

  test('导出对象包含 info、success、warning、error、defaultConfig', () => {
    expect(notify).toMatchObject({
      info: expect.any(Function),
      success: expect.any(Function),
      warning: expect.any(Function),
      error: expect.any(Function),
      defaultConfig: expect.any(Object),
    })
  })

  test('各方法带 defaultConfig 属性', () => {
    expect(notify.info.defaultConfig).toEqual({})
    expect(notify.success.defaultConfig).toMatchObject({ notifyType: 'success' })
    expect(notify.warning.defaultConfig).toMatchObject({ notifyType: 'warning' })
    expect(notify.error.defaultConfig).toMatchObject({ notifyType: 'error' })
  })

  test('info / success / warning / error 调用不抛错', () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    expect(() => notify.info('i')).not.toThrow()
    expect(() => notify.success('s')).not.toThrow()
    expect(() => notify.warning('w')).not.toThrow()
    expect(() => notify.error('e')).not.toThrow()
  })

  test('第二参数可省略或显式 undefined', async () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    const a = notify.info('省略 config')
    await waitFor(() => expect(document.querySelector('.exd-notify')).toBeInTheDocument())
    a.close()
    const b = notify.warning('undefined config', undefined)
    await waitFor(() => expect(document.querySelector('.exd-notify')).toBeInTheDocument())
    b.close()
  })

  test('duration 为 0 时仍可打开并关闭', async () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    const c = notify.error('瞬时', { duration: 0, transitionSpeed: 'none' })
    await waitFor(() => expect(document.querySelector('.exd-notify')).toBeInTheDocument())
    c.close()
  })

  test('调用后返回 close、reclock、update、promise', async () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    const c = notify.info('通知', { duration: 5000, transitionSpeed: 'none' })
    expect(c).toEqual(
      expect.objectContaining({
        close: expect.any(Function),
        reclock: expect.any(Function),
        update: expect.any(Function),
        promise: expect.any(Promise),
      }),
    )
    expect(() => c.close()).not.toThrow()
    await waitFor(() => {
      expect(document.querySelector('.exd-notify')).toBeInTheDocument()
    })
  })

  test('transitionSpeed 为具名速度、数字或显式 undefined（回退 0）时均可调用', async () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    const a = notify.info('a', { duration: 60000, transitionSpeed: 'fast' })
    await waitFor(() => expect(document.querySelector('.exd-notify')).toBeInTheDocument())
    expect(() => a.close()).not.toThrow()
    const b = notify.info('b', { duration: 60000, transitionSpeed: 88 })
    await waitFor(() => expect(document.querySelector('.exd-notify')).toBeInTheDocument())
    expect(() => b.close()).not.toThrow()
    const c = notify.info('c', { duration: 60000, transitionSpeed: 'none' })
    await waitFor(() => expect(document.querySelector('.exd-notify')).toBeInTheDocument())
    expect(() => c.close()).not.toThrow()
    const d = notify.info('d', { duration: 60000, transitionSpeed: undefined })
    await waitFor(() => expect(document.querySelector('.exd-notify')).toBeInTheDocument())
    expect(() => d.close()).not.toThrow()
  })

  test('reclock 可调用且不抛错', async () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    const ctrl = notify.info('reclock', { duration: 60000, transitionSpeed: 'none' })
    await waitFor(() => expect(document.querySelector('.exd-notify')).toBeInTheDocument())
    expect(() => ctrl.reclock()).not.toThrow()
    expect(() => ctrl.close()).not.toThrow()
  })

  test('传入 onExited 时在主动关闭流程中会被调用', async () => {
    const onExited = jest.fn()
    render(<ModalStation id="DEFAULT_STATION" />)
    const ctrl = notify.info('退出回调', {
      duration: 99999,
      transitionSpeed: 'none',
      onExited,
    })
    await waitFor(() => expect(document.querySelector('.exd-notify')).toBeInTheDocument())
    await act(async () => {
      ctrl.close()
    })
    await waitFor(() => expect(onExited).toHaveBeenCalled(), { timeout: 4000 })
  })
})
