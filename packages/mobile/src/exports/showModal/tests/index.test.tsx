import React from 'react'
import { render, cleanup, waitFor, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import showModal from '..'
import ModalStation, { stationMap } from '../../ModalStation'

describe('showModal 命令式 API', () => {
  afterEach(() => {
    cleanup()
    document.body.innerHTML = ''
  })

  test('默认导出为可调用的函数', () => {
    expect(typeof showModal).toBe('function')
  })

  test('调用返回包含 close、update、promise 的控制器对象', async () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    await waitFor(() => expect(stationMap['DEFAULT_STATION']).toBeDefined())

    const ctrl = showModal({
      content: '结构校验',
      transitionSpeed: 'none',
      mask: false,
    })

    expect(ctrl).toEqual(
      expect.objectContaining({
        close: expect.any(Function),
        update: expect.any(Function),
        promise: expect.any(Promise),
      }),
    )

    await act(async () => {
      ctrl.close()
    })
    await waitFor(() => expect(document.querySelector('.exd-modal')).not.toBeInTheDocument())
  })

  test('调用后 Modal 出现在文档中；close 后 DOM 移除且 promise 决议', async () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    await waitFor(() => expect(stationMap['DEFAULT_STATION']).toBeDefined())

    const ctrl = showModal({
      content: '关闭链路正文',
      transitionSpeed: 'none',
      mask: false,
    })

    await waitFor(() => {
      expect(document.querySelector('.exd-modal')).toBeInTheDocument()
      expect(screen.getByText('关闭链路正文')).toBeInTheDocument()
    })

    await act(async () => {
      ctrl.close()
    })

    await expect(ctrl.promise).resolves.toBeUndefined()

    await waitFor(() => {
      expect(document.querySelector('.exd-modal')).not.toBeInTheDocument()
    })
  })

  test('update 可合并更新 content', async () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    await waitFor(() => expect(stationMap['DEFAULT_STATION']).toBeDefined())

    const ctrl = showModal({
      content: '初始正文',
      transitionSpeed: 'none',
      mask: false,
    })

    await waitFor(() => expect(screen.getByText('初始正文')).toBeInTheDocument())

    await act(async () => {
      ctrl.update({ content: '合并后的正文' })
    })

    await waitFor(() => {
      expect(screen.queryByText('初始正文')).not.toBeInTheDocument()
      expect(screen.getByText('合并后的正文')).toBeInTheDocument()
    })

    await act(async () => {
      ctrl.close()
    })
    await expect(ctrl.promise).resolves.toBeUndefined()
  })

  test('content 支持渲染函数并接收 controller', async () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    await waitFor(() => expect(stationMap['DEFAULT_STATION']).toBeDefined())

    const ctrl = showModal({
      transitionSpeed: 'none',
      mask: false,
      content: ({ close: c }) => (
        <button type="button" onClick={c}>
          由内层关闭
        </button>
      ),
    })

    await waitFor(() => expect(screen.getByRole('button', { name: '由内层关闭' })).toBeInTheDocument())

    await act(async () => {
      screen.getByRole('button', { name: '由内层关闭' }).click()
    })

    await expect(ctrl.promise).resolves.toBeUndefined()
  })
})
