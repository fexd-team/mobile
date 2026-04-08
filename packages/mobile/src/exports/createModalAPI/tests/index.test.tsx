import React from 'react'
import { render, waitFor, cleanup, act, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ModalStation, { stationMap } from '../../ModalStation'
import createModalAPI from '..'

function TestModal({
  visible,
  children,
  onClose,
  onDestroyed,
  title,
}: {
  visible?: boolean
  children?: React.ReactNode
  onClose?: () => void
  onDestroyed?: (...args: unknown[]) => void
  title?: string
}) {
  const prev = React.useRef(!!visible)
  React.useLayoutEffect(() => {
    if (prev.current && !visible) {
      queueMicrotask(() => onDestroyed?.())
    }
    prev.current = !!visible
  }, [visible, onDestroyed])
  if (!visible) return null
  return (
    <div data-testid="test-modal">
      {title != null ? <span data-testid="modal-title">{title}</span> : null}
      {children}
      <button type="button" data-testid="modal-close" onClick={onClose}>
        关闭
      </button>
    </div>
  )
}

describe('createModalAPI', () => {
  const stationId = 'test-station-create-modal-api'

  afterEach(() => {
    cleanup()
    document.body.innerHTML = ''
    delete stationMap[stationId]
    document.getElementById('GLOBAL_FEXD_PROVIDER')?.remove()
    delete (globalThis as { GLOBAL_FEXD_PROVIDER?: boolean }).GLOBAL_FEXD_PROVIDER
  })

  test('工厂返回可调用的 show 方法', () => {
    const show = createModalAPI(TestModal, {})
    expect(typeof show).toBe('function')
  })

  test('show 返回 close、update、promise，并在驿站中渲染 content', async () => {
    render(<ModalStation id={stationId} />)
    await waitFor(() => expect(stationMap[stationId]).toBeDefined())

    const show = createModalAPI(TestModal, { title: '初始标题' })
    const ctrl = show({
      stationId,
      modalId: 'api-m1',
      content: () => <span data-testid="inner">内部</span>,
    })

    expect(ctrl).toEqual(
      expect.objectContaining({
        close: expect.any(Function),
        update: expect.any(Function),
        promise: expect.any(Promise),
      }),
    )

    await waitFor(() => {
      expect(document.querySelector('[data-testid="test-modal"]')).toBeInTheDocument()
      expect(document.querySelector('[data-testid="inner"]')).toHaveTextContent('内部')
      expect(document.querySelector('[data-testid="modal-title"]')).toHaveTextContent('初始标题')
    })
  })

  test('update 会合并 modal 属性；close 后 onDestroyed 触发且 promise resolve', async () => {
    render(<ModalStation id={stationId} />)
    await waitFor(() => expect(stationMap[stationId]).toBeDefined())

    const onDestroyed = jest.fn()
    const show = createModalAPI(TestModal, { title: 'A' })
    let resolved = false
    const ctrl = show({
      stationId,
      modalId: 'm2',
      content: ({ update }) => (
        <button type="button" data-testid="do-upd" onClick={() => update({ title: 'B' })}>
          更新
        </button>
      ),
      onDestroyed,
    })
    ctrl.promise.then(() => {
      resolved = true
    })

    await waitFor(() => expect(document.querySelector('[data-testid="modal-title"]')).toHaveTextContent('A'))

    await act(async () => {
      fireEvent.click(document.querySelector('[data-testid="do-upd"]')!)
    })
    await waitFor(() => expect(document.querySelector('[data-testid="modal-title"]')).toHaveTextContent('B'))

    await act(async () => {
      fireEvent.click(document.querySelector('[data-testid="modal-close"]')!)
    })

    await waitFor(() => expect(resolved).toBe(true))
    expect(onDestroyed).toHaveBeenCalled()
  })

  test('content 可为静态 ReactNode', async () => {
    render(<ModalStation id={stationId} />)
    await waitFor(() => expect(stationMap[stationId]).toBeDefined())
    const show = createModalAPI(TestModal, {})
    show({
      stationId,
      modalId: 'm3',
      content: <em data-testid="static-node">静态</em>,
    })
    await waitFor(() => expect(document.querySelector('[data-testid="static-node"]')).toHaveTextContent('静态'))
  })

  test('省略 modalId 时解构默认值 uniqueId 生效', async () => {
    render(<ModalStation id={stationId} />)
    await waitFor(() => expect(stationMap[stationId]).toBeDefined())
    const show = createModalAPI(TestModal, {})
    show({
      stationId,
      content: () => <span data-testid="auto-id">自动生成</span>,
    } as Parameters<typeof show>[0])
    await waitFor(() => expect(document.querySelector('[data-testid="auto-id"]')).toHaveTextContent('自动生成'))
  })
})
