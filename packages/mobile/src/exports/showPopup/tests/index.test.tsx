import React from 'react'
import { render, cleanup, waitFor, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import showPopup from '..'
import ModalStation, { stationMap } from '../../ModalStation'

describe('showPopup 命令式 API', () => {
  afterEach(() => {
    cleanup()
    document.body.innerHTML = ''
  })

  test('默认导出为可调用的函数', () => {
    expect(typeof showPopup).toBe('function')
  })

  test('调用返回包含 close、update、promise 的控制器对象', async () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    await waitFor(() => expect(stationMap['DEFAULT_STATION']).toBeDefined())

    const ctrl = showPopup({
      title: '结构',
      content: '校验',
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
    await waitFor(() => expect(document.querySelector('.exd-popup')).not.toBeInTheDocument())
  })

  test('调用后 Popup 出现在文档中；close 后 DOM 移除且 promise 决议', async () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    await waitFor(() => expect(stationMap['DEFAULT_STATION']).toBeDefined())

    const ctrl = showPopup({
      title: '弹层标题',
      content: '弹层正文区域',
      transitionSpeed: 'none',
      mask: false,
    })

    await waitFor(() => {
      expect(document.querySelector('.exd-popup')).toBeInTheDocument()
      expect(screen.getByText('弹层标题')).toBeInTheDocument()
      expect(screen.getByText('弹层正文区域')).toBeInTheDocument()
    })

    await act(async () => {
      ctrl.close()
    })

    await expect(ctrl.promise).resolves.toBeUndefined()

    await waitFor(() => {
      expect(document.querySelector('.exd-popup')).not.toBeInTheDocument()
    })
  })

  test('update 可更新标题与正文', async () => {
    render(<ModalStation id="DEFAULT_STATION" />)
    await waitFor(() => expect(stationMap['DEFAULT_STATION']).toBeDefined())

    const ctrl = showPopup({
      title: '旧题',
      content: '旧内容',
      transitionSpeed: 'none',
      mask: false,
    })

    await waitFor(() => {
      expect(screen.getByText('旧题')).toBeInTheDocument()
      expect(screen.getByText('旧内容')).toBeInTheDocument()
    })

    await act(async () => {
      ctrl.update({ title: '新题', content: '新内容' })
    })

    await waitFor(() => {
      expect(screen.getByText('新题')).toBeInTheDocument()
      expect(screen.getByText('新内容')).toBeInTheDocument()
      expect(screen.queryByText('旧题')).not.toBeInTheDocument()
      expect(screen.queryByText('旧内容')).not.toBeInTheDocument()
    })

    await act(async () => {
      ctrl.close()
    })
    await expect(ctrl.promise).resolves.toBeUndefined()
  })
})
