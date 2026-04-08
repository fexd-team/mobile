import React from 'react'
import { render, cleanup, waitFor, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import showActionSheet from '..'
import ModalStation, { stationMap } from '../../ModalStation'

describe('showActionSheet 命令式 API', () => {
  afterEach(() => {
    cleanup()
    document.body.innerHTML = ''
  })

  test('默认导出为可调用的函数', () => {
    expect(typeof showActionSheet).toBe('function')
  })

  test('调用返回包含 close、update、promise 的控制器对象', async () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    await waitFor(() => expect(stationMap['DEFAULT_STATION']).toBeDefined())

    const ctrl = showActionSheet({
      actions: [{ content: '项' }],
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
    await waitFor(() => expect(document.querySelector('.exd-action-sheet-popup')).not.toBeInTheDocument())
  })

  test('调用后 ActionSheet 出现在文档中；close 后 DOM 移除且 promise 决议', async () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    await waitFor(() => expect(stationMap['DEFAULT_STATION']).toBeDefined())

    const ctrl = showActionSheet({
      actions: [{ content: '操作甲' }, { content: '操作乙' }],
      transitionSpeed: 'none',
      mask: false,
    })

    await waitFor(() => {
      expect(document.querySelector('.exd-action-sheet-popup')).toBeInTheDocument()
      expect(screen.getByText('操作甲')).toBeInTheDocument()
      expect(screen.getByText('操作乙')).toBeInTheDocument()
    })

    await act(async () => {
      ctrl.close()
    })

    await expect(ctrl.promise).resolves.toBeUndefined()

    await waitFor(() => {
      expect(document.querySelector('.exd-action-sheet-popup')).not.toBeInTheDocument()
    })
  })

  test('update 可替换 actions 列表', async () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    await waitFor(() => expect(stationMap['DEFAULT_STATION']).toBeDefined())

    const ctrl = showActionSheet({
      actions: [{ content: '第一行' }],
      transitionSpeed: 'none',
      mask: false,
    })

    await waitFor(() => expect(screen.getByText('第一行')).toBeInTheDocument())

    await act(async () => {
      ctrl.update({ actions: [{ content: '更新后选项' }] })
    })

    await waitFor(() => {
      expect(screen.queryByText('第一行')).not.toBeInTheDocument()
      expect(screen.getByText('更新后选项')).toBeInTheDocument()
    })

    await act(async () => {
      ctrl.close()
    })
    await expect(ctrl.promise).resolves.toBeUndefined()
  })
})
