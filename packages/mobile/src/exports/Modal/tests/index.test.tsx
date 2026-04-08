import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Modal from '..'
import modalStore from '../../modalStore'
import { cleanupModals } from '../../../tests/testing'

describe('Modal', () => {
  afterEach(cleanupModals)

  test('visible 为 true 时渲染内容与 exd-modal-content', () => {
    render(
      <Modal visible transitionSpeed="none" onClose={() => {}}>
        模态正文
      </Modal>,
    )
    expect(screen.getByText('模态正文')).toBeInTheDocument()
    expect(document.querySelector('.exd-modal-content')).toBeInTheDocument()
  })

  test('visible 为 false 时不渲染模态正文', () => {
    render(
      <Modal visible={false} transitionSpeed="none" onClose={() => {}}>
        隐藏
      </Modal>,
    )
    expect(screen.queryByText('隐藏')).not.toBeInTheDocument()
  })

  test('点击遮罩触发 onClose；点击 exd-modal-content 不触发', async () => {
    const user = userEvent.setup()
    const onClose = jest.fn()
    render(
      <Modal visible transitionSpeed="none" onClose={onClose} maskClosable>
        c
      </Modal>,
    )
    await user.click(document.querySelector('.exd-modal-content') as HTMLElement)
    expect(onClose).not.toHaveBeenCalled()
    await user.click(document.querySelector('.exd-modal-mask') as HTMLElement)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('maskClosable 为 false 时点击遮罩不关闭', async () => {
    const user = userEvent.setup()
    const onClose = jest.fn()
    render(
      <Modal visible transitionSpeed="none" onClose={onClose} maskClosable={false} maskClassName="mc-off">
        c
      </Modal>,
    )
    await user.click(document.querySelector('.mc-off') as HTMLElement)
    expect(onClose).not.toHaveBeenCalled()
  })

  test('mask 为 false 时不渲染外层遮罩', () => {
    render(
      <Modal visible mask={false} transitionSpeed="none" onClose={() => {}}>
        x
      </Modal>,
    )
    expect(document.querySelector('.exd-modal-mask')).not.toBeInTheDocument()
  })

  test('maskClassName 与 maskTransparent 作用于遮罩', () => {
    render(
      <Modal visible transitionSpeed="none" onClose={() => {}} maskClassName="m1" maskTransparent>
        x
      </Modal>,
    )
    const m = document.querySelector('.m1')
    expect(m).toBeInTheDocument()
    expect(m).toHaveClass('exd-overlay-transparent')
  })

  test('placement 与 scrollable 透传至 BasicModal 根节点', () => {
    render(
      <Modal visible placement="top" scrollable transitionSpeed="none" onClose={() => {}}>
        x
      </Modal>,
    )
    expect(document.querySelector('.exd-modal-top.exd-modal-scrollable')).toBeInTheDocument()
  })

  test('contentClassName 合并到内容容器', () => {
    render(
      <Modal visible transitionSpeed="none" onClose={() => {}} contentClassName="extra-c">
        x
      </Modal>,
    )
    expect(document.querySelector('.exd-modal-content.extra-c')).toBeInTheDocument()
  })

  test('contentVisible 由 true 切 false 后内容区仍保留于 DOM（unmountOnExit=false）', async () => {
    const { rerender } = render(
      <Modal visible contentVisible transitionSpeed="none" contentTransitionSpeed="none" onClose={() => {}}>
        inner
      </Modal>,
    )
    expect(document.querySelector('.exd-modal-content')).toBeInTheDocument()
    rerender(
      <Modal visible contentVisible={false} transitionSpeed="none" contentTransitionSpeed="none" onClose={() => {}}>
        inner
      </Modal>,
    )
    await waitFor(() => expect(document.querySelector('.exd-modal-content')).toBeInTheDocument())
  })

  test('contentMask 为 true 时内容区出现绝对定位遮罩层', () => {
    render(
      <Modal visible transitionSpeed="none" contentTransitionSpeed="none" onClose={() => {}} contentMask>
        x
      </Modal>,
    )
    expect(document.querySelector('.exd-overlay-absolute')).toBeInTheDocument()
  })

  test('shareMask 为 true 时使用共享遮罩且主遮罩透明', () => {
    render(
      <Modal visible shareMask transitionSpeed="none" onClose={() => {}} maskClassName="shared-m">
        x
      </Modal>,
    )
    expect(document.querySelector('.exd-modal-mask.shared-m')).toHaveClass('exd-overlay-transparent')
  })

  test('modalId 传入时稳定复用该 id', () => {
    render(
      <Modal visible modalId="fixed-modal" transitionSpeed="none" onClose={() => {}}>
        x
      </Modal>,
    )
    expect(modalStore.getById('fixed-modal')).toBeTruthy()
  })

  test('ref 指向 BasicModal 内容根', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <Modal visible transitionSpeed="none" onClose={() => {}} ref={ref}>
        r
      </Modal>,
    )
    expect(ref.current).toHaveClass('exd-modal')
  })

  test('onConflict：其他弹窗 open 时异步合并返回的冲突 props', async () => {
    jest.useFakeTimers()
    const onConflict = jest.fn(() => Promise.resolve({ portalClassName: 'from-conflict' }))
    render(
      <Modal visible modalId="modal-a" transitionSpeed="none" onClose={() => {}} onConflict={onConflict}>
        a
      </Modal>,
    )
    act(() => {
      modalStore.eventBus.emit('open', {
        modalId: 'modal-b',
        level: 'normal',
        type: 'x',
        props: {},
        setCreated: () => {},
        setVisible: () => {},
        contentRef: { current: null },
        zIndex: 1,
      } as any)
    })
    await act(async () => {
      jest.runAllTimers()
    })
    expect(onConflict).toHaveBeenCalled()
    await waitFor(() => {
      expect(document.querySelector('.exd-modal-portal.from-conflict')).toBeInTheDocument()
    })
    jest.useRealTimers()
  })

  test('onConflict：其他弹窗 close 事件走 close 分支', async () => {
    jest.useFakeTimers()
    const onConflict = jest.fn(() => Promise.resolve({ className: 'after-close' }))
    render(
      <Modal
        visible
        modalId="modal-c1"
        transitionSpeed="none"
        onClose={() => {}}
        onConflict={onConflict}
        className="before"
      >
        c
      </Modal>,
    )
    act(() => {
      modalStore.eventBus.emit('close', {
        modalId: 'modal-c2',
        level: 'normal',
        type: 'x',
        props: {},
        setCreated: () => {},
        setVisible: () => {},
        contentRef: { current: null },
        zIndex: 1,
      } as any)
    })
    await act(async () => {
      jest.runAllTimers()
    })
    expect(onConflict).toHaveBeenCalled()
    await waitFor(() => {
      expect(document.querySelector('.exd-modal.after-close')).toBeInTheDocument()
    })
    jest.useRealTimers()
  })

  test('onConflict 返回 undefined 时仍可安全合并', async () => {
    jest.useFakeTimers()
    const onConflict = jest.fn(() => Promise.resolve(undefined))
    render(
      <Modal visible modalId="undef-c" transitionSpeed="none" onClose={() => {}} onConflict={onConflict}>
        u
      </Modal>,
    )
    act(() => {
      modalStore.eventBus.emit('open', {
        modalId: 'other-u',
        level: 'normal',
        type: 'x',
        props: {},
        setCreated: () => {},
        setVisible: () => {},
        contentRef: { current: null },
        zIndex: 1,
      } as any)
    })
    await act(async () => {
      jest.runAllTimers()
    })
    expect(onConflict).toHaveBeenCalled()
    expect(screen.getByText('u')).toBeInTheDocument()
    jest.useRealTimers()
  })

  test('onConflict 非函数时不注册监听', () => {
    render(
      <Modal visible modalId="no-cb" transitionSpeed="none" onClose={() => {}} onConflict={null as any}>
        x
      </Modal>,
    )
    expect(() =>
      modalStore.eventBus.emit('open', {
        modalId: 'other',
        level: 'normal',
        type: 'x',
        props: {},
        setCreated: () => {},
        setVisible: () => {},
        contentRef: { current: null },
        zIndex: 1,
      } as any),
    ).not.toThrow()
  })

  test('自身 modal 的 open/close 事件不会触发 onConflict', async () => {
    jest.useFakeTimers()
    const onConflict = jest.fn()
    render(
      <Modal visible modalId="self-only" transitionSpeed="none" onClose={() => {}} onConflict={onConflict}>
        s
      </Modal>,
    )
    const self = modalStore.getById('self-only')
    act(() => {
      modalStore.eventBus.emit('open', self as any)
    })
    await act(async () => {
      jest.runAllTimers()
    })
    expect(onConflict).not.toHaveBeenCalled()
    jest.useRealTimers()
  })

  test('受控关闭触发 onExited', async () => {
    const onExited = jest.fn()
    const { rerender } = render(
      <Modal visible transitionSpeed="none" onClose={() => {}} onExited={onExited}>
        e
      </Modal>,
    )
    rerender(
      <Modal visible={false} transitionSpeed="none" onClose={() => {}} onExited={onExited}>
        e
      </Modal>,
    )
    await waitFor(() => expect(onExited).toHaveBeenCalled())
  })

  test('onCreated 在挂载后调用', async () => {
    const onCreated = jest.fn()
    render(
      <Modal visible transitionSpeed="none" onClose={() => {}} onCreated={onCreated}>
        x
      </Modal>,
    )
    await waitFor(() => expect(onCreated).toHaveBeenCalled())
  })
})
