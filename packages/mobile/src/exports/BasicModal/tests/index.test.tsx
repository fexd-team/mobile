import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import BasicModal from '..'
import modalStore from '../../modalStore'
import { cleanupModals } from '../../../tests/testing'

describe('BasicModal', () => {
  afterEach(cleanupModals)

  test('visible 为 true 时渲染门户与内容容器', () => {
    render(
      <BasicModal modalId="bm-smoke" visible transitionSpeed="none" onClose={() => {}}>
        内容区
      </BasicModal>,
    )
    expect(document.querySelector('.exd-modal-portal')).toBeInTheDocument()
    const body = document.querySelector('.exd-modal')
    expect(body).toBeInTheDocument()
    expect(body).toHaveTextContent('内容区')
  })

  test('visible 为 false 时不渲染模态内容；置 true 后显示', () => {
    const { rerender } = render(
      <BasicModal modalId="bm-hidden" visible={false} transitionSpeed="none" onClose={() => {}}>
        x
      </BasicModal>,
    )
    expect(screen.queryByText('x')).not.toBeInTheDocument()
    rerender(
      <BasicModal modalId="bm-hidden" visible transitionSpeed="none" onClose={() => {}}>
        x
      </BasicModal>,
    )
    expect(screen.getByText('x')).toBeInTheDocument()
  })

  test('placement 为 top / bottom / center 时根节点类名正确', () => {
    const { rerender } = render(
      <BasicModal modalId="bm-pl" visible placement="top" transitionSpeed="none" onClose={() => {}}>
        x
      </BasicModal>,
    )
    expect(document.querySelector('.exd-modal-top')).toBeInTheDocument()

    rerender(
      <BasicModal modalId="bm-pl" visible placement="center" transitionSpeed="none" onClose={() => {}}>
        x
      </BasicModal>,
    )
    expect(document.querySelector('.exd-modal-center')).toBeInTheDocument()

    rerender(
      <BasicModal modalId="bm-pl" visible placement="bottom" transitionSpeed="none" onClose={() => {}}>
        x
      </BasicModal>,
    )
    expect(document.querySelector('.exd-modal-bottom')).toBeInTheDocument()
  })

  test('level 为 high 时 Portal 带 exd-modal-level-high', () => {
    render(
      <BasicModal modalId="bm-lv" visible level="high" transitionSpeed="none" onClose={() => {}}>
        x
      </BasicModal>,
    )
    expect(document.querySelector('.exd-modal-portal.exd-modal-level-high')).toBeInTheDocument()
  })

  test('mask 为 false 时不渲染遮罩且不可滚动/不可点遮罩关闭', () => {
    render(
      <BasicModal
        modalId="bm-nomask"
        visible
        mask={false}
        scrollable
        maskClosable
        transitionSpeed="none"
        onClose={() => {}}
      >
        x
      </BasicModal>,
    )
    expect(document.querySelector('.exd-modal-mask')).not.toBeInTheDocument()
    expect(document.querySelector('.exd-modal-scrollable')).not.toBeInTheDocument()
  })

  test('mask 为 true 且 scrollable 时根节点带 exd-modal-scrollable', () => {
    render(
      <BasicModal modalId="bm-sc" visible mask scrollable transitionSpeed="none" onClose={() => {}}>
        x
      </BasicModal>,
    )
    expect(document.querySelector('.exd-modal-scrollable')).toBeInTheDocument()
  })

  test('portalClassName 与 maskClassName 合并到对应节点', () => {
    render(
      <BasicModal
        modalId="bm-cls"
        visible
        transitionSpeed="none"
        onClose={() => {}}
        portalClassName="p-extra"
        maskClassName="m-extra"
      >
        x
      </BasicModal>,
    )
    expect(document.querySelector('.exd-modal-portal.p-extra')).toBeInTheDocument()
    expect(document.querySelector('.exd-modal-mask.m-extra')).toBeInTheDocument()
  })

  test('maskTransparent 为 true 时遮罩带透明类名', () => {
    render(
      <BasicModal modalId="bm-tr" visible maskTransparent transitionSpeed="none" onClose={() => {}}>
        x
      </BasicModal>,
    )
    expect(document.querySelector('.exd-modal-mask.exd-overlay-transparent')).toBeInTheDocument()
  })

  test('maskClosable 为 true 时点击遮罩触发 onClose', async () => {
    const user = userEvent.setup()
    const onClose = jest.fn()
    render(
      <BasicModal modalId="bm-mc1" visible maskClosable transitionSpeed="none" onClose={onClose}>
        b
      </BasicModal>,
    )
    const mask = document.querySelector('.exd-modal-mask')
    expect(mask).toBeInTheDocument()
    await user.click(mask!)
    expect(onClose).toHaveBeenCalled()
  })

  test('maskClosable 为 false 时遮罩点击不触发 onClose', async () => {
    const user = userEvent.setup()
    const onClose = jest.fn()
    render(
      <BasicModal modalId="bm-mc0" visible maskClosable={false} transitionSpeed="none" onClose={onClose}>
        b
      </BasicModal>,
    )
    await user.click(document.querySelector('.exd-modal-mask')!)
    expect(onClose).not.toHaveBeenCalled()
  })

  test('maskClosable 时点内容根节点（非子元素）触发 onClick 与 onClose', async () => {
    const user = userEvent.setup()
    const onClose = jest.fn()
    const onClick = jest.fn()
    render(
      <BasicModal
        modalId="bm-rootclick"
        visible
        maskClosable
        transitionSpeed="none"
        onClose={onClose}
        onClick={onClick}
      >
        {null}
      </BasicModal>,
    )
    const root = document.querySelector('.exd-modal') as HTMLElement
    await user.click(root)
    expect(onClick).toHaveBeenCalled()
    expect(onClose).toHaveBeenCalled()
  })

  test('onClick 中 preventDefault 时不触发 onClose', async () => {
    const user = userEvent.setup()
    const onClose = jest.fn()
    render(
      <BasicModal
        modalId="bm-pe"
        visible
        maskClosable
        transitionSpeed="none"
        onClose={onClose}
        onClick={(e) => e.preventDefault()}
      >
        {null}
      </BasicModal>,
    )
    await user.click(document.querySelector('.exd-modal') as HTMLElement)
    expect(onClose).not.toHaveBeenCalled()
  })

  test('点击子元素不触发内容根关闭逻辑', async () => {
    const user = userEvent.setup()
    const onClose = jest.fn()
    render(
      <BasicModal modalId="bm-child" visible maskClosable transitionSpeed="none" onClose={onClose}>
        <button type="button">内层</button>
      </BasicModal>,
    )
    await user.click(screen.getByRole('button', { name: '内层' }))
    expect(onClose).not.toHaveBeenCalled()
  })

  test('创建后触发 onCreated，卸载时触发 onDestroyed', async () => {
    const onCreated = jest.fn()
    const onDestroyed = jest.fn()
    const { unmount } = render(
      <BasicModal
        modalId="bm-life"
        visible
        transitionSpeed="none"
        onClose={() => {}}
        onCreated={onCreated}
        onDestroyed={onDestroyed}
      >
        c
      </BasicModal>,
    )
    await waitFor(() => expect(onCreated).toHaveBeenCalled())
    unmount()
    expect(onDestroyed).toHaveBeenCalled()
  })

  test('受控打开再关闭：visible 切换触发退场并调用 onExited', async () => {
    const onExited = jest.fn()
    const { rerender } = render(
      <BasicModal modalId="bm-exit" visible transitionSpeed="none" onClose={() => {}} onExited={onExited}>
        x
      </BasicModal>,
    )
    rerender(
      <BasicModal modalId="bm-exit" visible={false} transitionSpeed="none" onClose={() => {}} onExited={onExited}>
        x
      </BasicModal>,
    )
    await waitFor(() => expect(onExited).toHaveBeenCalled())
  })

  test('destroyOnExit 为默认 true 时关闭后 Portal 从文档移除', async () => {
    const { rerender } = render(
      <BasicModal modalId="bm-destroy" visible transitionSpeed="none" onClose={() => {}}>
        body
      </BasicModal>,
    )
    rerender(
      <BasicModal modalId="bm-destroy" visible={false} transitionSpeed="none" onClose={() => {}}>
        body
      </BasicModal>,
    )
    await waitFor(() => expect(document.querySelector('.exd-modal-portal')).not.toBeInTheDocument(), {
      timeout: 3000,
    })
  })

  test('destroyOnExit 为 false 时关闭后 Portal 仍存在', async () => {
    const { rerender } = render(
      <BasicModal modalId="bm-keep" visible destroyOnExit={false} transitionSpeed="none" onClose={() => {}}>
        k
      </BasicModal>,
    )
    expect(document.querySelector('.exd-modal-portal')).toBeInTheDocument()
    rerender(
      <BasicModal modalId="bm-keep" visible={false} destroyOnExit={false} transitionSpeed="none" onClose={() => {}}>
        k
      </BasicModal>,
    )
    await waitFor(() => {
      expect(document.querySelector('.exd-modal-portal')).toBeInTheDocument()
    })
  })

  test('onEnter / onEntered / onExit 在过渡链路中被调用', async () => {
    const onEnter = jest.fn()
    const onEntered = jest.fn()
    const onExit = jest.fn()
    const { rerender } = render(
      <BasicModal
        modalId="bm-trx"
        visible
        transitionSpeed="none"
        onClose={() => {}}
        onEnter={onEnter}
        onEntered={onEntered}
        onExit={onExit}
      >
        t
      </BasicModal>,
    )
    await waitFor(() => expect(onEntered).toHaveBeenCalled())
    expect(onEnter).toHaveBeenCalled()
    rerender(
      <BasicModal
        modalId="bm-trx"
        visible={false}
        transitionSpeed="none"
        onClose={() => {}}
        onEnter={onEnter}
        onEntered={onEntered}
        onExit={onExit}
      >
        t
      </BasicModal>,
    )
    await waitFor(() => expect(onExit).toHaveBeenCalled())
  })

  test('storeProps 写入 modalStore 后再次渲染会更新条目', () => {
    const { rerender } = render(
      <BasicModal
        modalId="bm-store"
        visible
        transitionSpeed="none"
        onClose={() => {}}
        storeProps={{ a: 1 }}
        className="c1"
      >
        s
      </BasicModal>,
    )
    expect(modalStore.getById('bm-store')?.props).toEqual(expect.objectContaining({ a: 1 }))
    rerender(
      <BasicModal
        modalId="bm-store"
        visible
        transitionSpeed="none"
        onClose={() => {}}
        storeProps={{ a: 2 }}
        className="c2"
      >
        s
      </BasicModal>,
    )
    expect(modalStore.getById('bm-store')?.props).toEqual(expect.objectContaining({ a: 2 }))
  })

  test('ref 指向内容根 div', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <BasicModal modalId="bm-ref" visible transitionSpeed="none" onClose={() => {}} ref={ref}>
        r
      </BasicModal>,
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveClass('exd-modal')
  })

  test('点击遮罩触发 onClose 后受控关闭可卸载 Portal', async () => {
    const user = userEvent.setup()
    function Controlled() {
      const [open, setOpen] = React.useState(true)
      return (
        <BasicModal modalId="bm-mask-close" visible={open} transitionSpeed="none" onClose={() => setOpen(false)}>
          body
        </BasicModal>
      )
    }
    render(<Controlled />)
    expect(document.querySelector('.exd-modal')).toBeInTheDocument()
    await user.click(document.querySelector('.exd-modal-mask') as HTMLElement)
    await waitFor(() => expect(document.querySelector('.exd-modal-portal')).not.toBeInTheDocument(), {
      timeout: 3000,
    })
  })

  test('children 为 undefined 时仍渲染模态容器', () => {
    render(<BasicModal modalId="bm-empty" visible transitionSpeed="none" onClose={() => {}} />)
    expect(document.querySelector('.exd-modal')).toBeInTheDocument()
  })
})
