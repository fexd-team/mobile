import React from 'react'
import { render, cleanup, waitFor, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import showDialog from '..'
import ModalStation, { stationMap } from '../../ModalStation'

describe('showDialog 命令式 API', () => {
  afterEach(() => {
    cleanup()
    document.body.innerHTML = ''
  })

  test('默认导出为可调用的函数', () => {
    expect(typeof showDialog).toBe('function')
  })

  test('调用返回包含 close、update、promise 的控制器对象', async () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    await waitFor(() => expect(stationMap['DEFAULT_STATION']).toBeDefined())

    const ctrl = showDialog({
      content: '结构校验',
      title: '标题',
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
    await waitFor(() => expect(document.querySelector('.exd-dialog-modal')).not.toBeInTheDocument())
  })

  test('调用后 Dialog 出现在文档中；close 后 DOM 移除且 promise 决议', async () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    await waitFor(() => expect(stationMap['DEFAULT_STATION']).toBeDefined())

    const ctrl = showDialog({
      title: '对话框标题',
      content: '对话框正文',
      transitionSpeed: 'none',
      mask: false,
    })

    await waitFor(() => {
      expect(document.querySelector('.exd-dialog-modal')).toBeInTheDocument()
      expect(screen.getByText('对话框标题')).toBeInTheDocument()
      expect(screen.getByText('对话框正文')).toBeInTheDocument()
    })

    await act(async () => {
      ctrl.close()
    })

    await expect(ctrl.promise).resolves.toBeUndefined()

    await waitFor(() => {
      expect(document.querySelector('.exd-dialog-modal')).not.toBeInTheDocument()
    })
  })

  test('update 可更新标题与正文', async () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    await waitFor(() => expect(stationMap['DEFAULT_STATION']).toBeDefined())

    const ctrl = showDialog({
      title: '旧标题',
      content: '旧正文',
      transitionSpeed: 'none',
      mask: false,
    })

    await waitFor(() => {
      expect(screen.getByText('旧标题')).toBeInTheDocument()
      expect(screen.getByText('旧正文')).toBeInTheDocument()
    })

    await act(async () => {
      ctrl.update({ title: '新标题', content: '新正文' })
    })

    await waitFor(() => {
      expect(screen.getByText('新标题')).toBeInTheDocument()
      expect(screen.getByText('新正文')).toBeInTheDocument()
      expect(screen.queryByText('旧标题')).not.toBeInTheDocument()
      expect(screen.queryByText('旧正文')).not.toBeInTheDocument()
    })

    await act(async () => {
      ctrl.close()
    })
    await expect(ctrl.promise).resolves.toBeUndefined()
  })
})
