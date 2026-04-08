import React from 'react'
import { render, cleanup, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import toast from '..'
import ModalStation from '../../ModalStation'

describe('toast', () => {
  afterEach(async () => {
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0))
    })
    cleanup()
    document.getElementById('GLOBAL_FEXD_PROVIDER')?.remove()
    delete (globalThis as Record<string, unknown>).GLOBAL_FEXD_PROVIDER
    document.body.innerHTML = ''
  })

  test('导出对象包含 info、success、fail、warn、defaultConfig', () => {
    expect(toast).toMatchObject({
      info: expect.any(Function),
      success: expect.any(Function),
      fail: expect.any(Function),
      warn: expect.any(Function),
      defaultConfig: expect.any(Object),
    })
  })

  test('各变体方法挂载独立 defaultConfig', () => {
    expect(toast.info.defaultConfig).toEqual({})
    expect(toast.success.defaultConfig).toEqual(
      expect.objectContaining({
        icon: expect.anything(),
      }),
    )
    expect(toast.fail.defaultConfig).toEqual(
      expect.objectContaining({
        icon: expect.anything(),
      }),
    )
    expect(toast.warn.defaultConfig).toEqual(
      expect.objectContaining({
        icon: expect.anything(),
      }),
    )
  })

  test('info / success / fail / warn 调用不抛错', () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    expect(() => toast.info('i')).not.toThrow()
    expect(() => toast.success('s')).not.toThrow()
    expect(() => toast.fail('f')).not.toThrow()
    expect(() => toast.warn('w')).not.toThrow()
  })

  test('第二参数可省略或显式 undefined', async () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    const a = toast.success('省略')
    await waitFor(() => expect(document.querySelector('.exd-toast')).toBeInTheDocument())
    a.close()
    const b = toast.info('undef', undefined)
    await waitFor(() => expect(document.querySelector('.exd-toast')).toBeInTheDocument())
    b.close()
  })

  test('duration 为 0 时可打开并关闭', async () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    const c = toast.fail('零时长', { duration: 0, transitionSpeed: 'none' })
    await waitFor(() => expect(document.querySelector('.exd-toast')).toBeInTheDocument())
    c.close()
  })

  test('调用后返回 close、reclock、update、promise', async () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    const c = toast.info('内容', { duration: 8000, transitionSpeed: 'none' })
    expect(c).toEqual(
      expect.objectContaining({
        close: expect.any(Function),
        reclock: expect.any(Function),
        update: expect.any(Function),
        promise: expect.any(Promise),
      }),
    )
    expect(() => c.close()).not.toThrow()
    expect(() => c.reclock()).not.toThrow()
    await waitFor(() => {
      expect(document.querySelector('.exd-toast')).toBeInTheDocument()
    })
  })

  test('transitionSpeed 为具名速度、数字或显式 undefined 时均可调用并手动关闭', async () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    const a = toast.info('a', { duration: 60000, transitionSpeed: 'normal' })
    await waitFor(() => expect(document.querySelector('.exd-toast')).toBeInTheDocument())
    a.close()
    const b = toast.fail('b', { duration: 60000, transitionSpeed: 55 })
    await waitFor(() => expect(document.querySelector('.exd-toast')).toBeInTheDocument())
    b.close()
    const c = toast.info('c', { duration: 60000, transitionSpeed: undefined })
    await waitFor(() => expect(document.querySelector('.exd-toast')).toBeInTheDocument())
    c.close()
  })

  test('reclock 可调用', async () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    const ctrl = toast.warn('w', { duration: 60000, transitionSpeed: 'none' })
    await waitFor(() => expect(document.querySelector('.exd-toast')).toBeInTheDocument())
    expect(() => ctrl.reclock()).not.toThrow()
    ctrl.close()
  })
})
