import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Popup from '..'
import modalStore from '../../modalStore'
import { cleanupModals } from '../../../tests/testing'

describe('Popup', () => {
  afterEach(cleanupModals)

  test('visible 为 true 时渲染 Portal、exd-popup 与内容区', () => {
    render(
      <Popup visible transitionSpeed="none" onClose={() => {}}>
        <span>popup-body</span>
      </Popup>,
    )
    expect(document.querySelector('.exd-modal-portal')).toBeInTheDocument()
    expect(document.querySelector('.exd-popup')).toBeInTheDocument()
    expect(document.querySelector('.exd-popup-content')).toHaveTextContent('popup-body')
  })

  test('visible 为 false 时不渲染弹层正文', () => {
    render(
      <Popup visible={false} transitionSpeed="none" onClose={() => {}}>
        x
      </Popup>,
    )
    expect(screen.queryByText('x')).not.toBeInTheDocument()
  })

  test('placement 固定为 bottom，根上存在 exd-modal-bottom', () => {
    render(
      <Popup visible transitionSpeed="none" onClose={() => {}}>
        x
      </Popup>,
    )
    expect(document.querySelector('.exd-modal-bottom')).toBeInTheDocument()
  })

  test('mask 为 false 时不渲染 exd-modal-mask', () => {
    render(
      <Popup visible mask={false} transitionSpeed="none" onClose={() => {}}>
        x
      </Popup>,
    )
    expect(document.querySelector('.exd-modal-mask')).not.toBeInTheDocument()
  })

  test('maskClosable 为 false 时点击遮罩不触发 onClose', async () => {
    const user = userEvent.setup()
    const onClose = jest.fn()
    render(
      <Popup visible maskClosable={false} transitionSpeed="none" onClose={onClose}>
        x
      </Popup>,
    )
    await user.click(document.querySelector('.exd-modal-mask') as HTMLElement)
    expect(onClose).not.toHaveBeenCalled()
  })

  test('maskClosable 为 true 时点击遮罩触发 onClose', async () => {
    const user = userEvent.setup()
    const onClose = jest.fn()
    render(
      <Popup visible transitionSpeed="none" onClose={onClose}>
        x
      </Popup>,
    )
    await user.click(document.querySelector('.exd-modal-mask') as HTMLElement)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('maskTransparent 为 true 时遮罩带透明类名', () => {
    render(
      <Popup visible maskTransparent transitionSpeed="none" onClose={() => {}}>
        x
      </Popup>,
    )
    expect(document.querySelector('.exd-modal-mask.exd-overlay-transparent')).toBeInTheDocument()
  })

  test('scrollable 为 true 时 exd-modal 根带 exd-modal-scrollable', () => {
    render(
      <Popup visible scrollable transitionSpeed="none" onClose={() => {}}>
        x
      </Popup>,
    )
    expect(document.querySelector('.exd-modal-scrollable')).toBeInTheDocument()
  })

  test('round 为 true 时 exd-popup 带 exd-popup-round', () => {
    render(
      <Popup visible round transitionSpeed="none" onClose={() => {}}>
        x
      </Popup>,
    )
    expect(document.querySelector('.exd-popup-round')).toBeInTheDocument()
  })

  test('className 合并到 exd-popup 根容器', () => {
    render(
      <Popup visible className="my-popup" transitionSpeed="none" onClose={() => {}}>
        x
      </Popup>,
    )
    expect(document.querySelector('.exd-popup.my-popup')).toBeInTheDocument()
  })

  test('title 为字符串时渲染 exd-popup-header 与标题文案', () => {
    render(
      <Popup visible title="标题" transitionSpeed="none" onClose={() => {}}>
        c
      </Popup>,
    )
    expect(document.querySelector('.exd-popup-header')).toBeInTheDocument()
    expect(document.querySelector('.exd-popup-header')).toHaveTextContent('标题')
  })

  test('title 为 ReactNode 时头部仍可展示', () => {
    render(
      <Popup visible title={<em>富文本</em>} transitionSpeed="none" onClose={() => {}}>
        c
      </Popup>,
    )
    expect(screen.getByText('富文本')).toBeInTheDocument()
  })

  test('headerLeft / headerRight 为函数时正常渲染', () => {
    render(
      <Popup
        visible
        title="T"
        transitionSpeed="none"
        onClose={() => {}}
        headerLeft={() => <span>左</span>}
        headerRight={() => <span>右</span>}
      >
        c
      </Popup>,
    )
    expect(screen.getByText('左')).toBeInTheDocument()
    expect(screen.getByText('右')).toBeInTheDocument()
  })

  test('自定义 header 覆盖默认 NavBar', () => {
    render(
      <Popup visible header={<div className="custom-h">自定义头</div>} transitionSpeed="none" onClose={() => {}}>
        c
      </Popup>,
    )
    expect(document.querySelector('.custom-h')).toHaveTextContent('自定义头')
    expect(document.querySelector('.exd-popup-header')).not.toBeInTheDocument()
  })

  test('onHeaderLeftClick / onHeaderRightClick 在 NavBar 点击时触发', async () => {
    const user = userEvent.setup()
    const onHeaderLeftClick = jest.fn()
    const onHeaderRightClick = jest.fn()
    render(
      <Popup
        visible
        title="T"
        transitionSpeed="none"
        onClose={() => {}}
        headerLeft={<span>左区</span>}
        headerRight={<span>右区</span>}
        onHeaderLeftClick={onHeaderLeftClick}
        onHeaderRightClick={onHeaderRightClick}
      >
        c
      </Popup>,
    )
    await user.click(document.querySelector('.exd-nav-bar-left') as HTMLElement)
    await user.click(document.querySelector('.exd-nav-bar-right') as HTMLElement)
    expect(onHeaderLeftClick).toHaveBeenCalledTimes(1)
    expect(onHeaderRightClick).toHaveBeenCalledTimes(1)
  })

  test('contentClassName 合并到 exd-popup-content', () => {
    render(
      <Popup visible transitionSpeed="none" onClose={() => {}} contentClassName="extra-content">
        c
      </Popup>,
    )
    expect(document.querySelector('.exd-popup-content.extra-content')).toBeInTheDocument()
  })

  test('modalId 传入后可在 modalStore 中查到', () => {
    render(
      <Popup visible modalId="my-popup" transitionSpeed="none" onClose={() => {}}>
        x
      </Popup>,
    )
    expect(modalStore.getById('my-popup')).toBeTruthy()
  })

  test('ref 指向 Modal/BasicModal 内容根', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <Popup visible transitionSpeed="none" onClose={() => {}} ref={ref}>
        r
      </Popup>,
    )
    expect(ref.current).toHaveClass('exd-modal')
  })

  test('受控关闭后触发 onExited', async () => {
    const onExited = jest.fn()
    const { rerender } = render(
      <Popup visible transitionSpeed="none" onClose={() => {}} onExited={onExited}>
        e
      </Popup>,
    )
    rerender(
      <Popup visible={false} transitionSpeed="none" onClose={() => {}} onExited={onExited}>
        e
      </Popup>,
    )
    await waitFor(() => expect(onExited).toHaveBeenCalled())
  })
})
