import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Dialog from '..'
import modalStore from '../../modalStore'
import { cleanupModals } from '../../../tests/testing'

describe('Dialog', () => {
  afterEach(cleanupModals)

  test('visible 为 true 时渲染对话框结构与正文', () => {
    render(
      <Dialog visible transitionSpeed="none" onClose={() => {}}>
        正文
      </Dialog>,
    )
    expect(document.querySelector('.exd-dialog-modal')).toBeInTheDocument()
    expect(document.querySelector('.exd-dialog-content')).toHaveTextContent('正文')
  })

  test('visible 为 false 时不渲染正文', () => {
    render(
      <Dialog visible={false} transitionSpeed="none" onClose={() => {}}>
        隐藏
      </Dialog>,
    )
    expect(screen.queryByText('隐藏')).not.toBeInTheDocument()
  })

  test('title 存在时渲染 exd-dialog-title', () => {
    render(
      <Dialog visible title="对话框标题" transitionSpeed="none" onClose={() => {}}>
        内文
      </Dialog>,
    )
    const title = document.querySelector('.exd-dialog-title')
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('对话框标题')
  })

  test('无 title 时不渲染标题节点', () => {
    render(
      <Dialog visible transitionSpeed="none" onClose={() => {}}>
        仅内容
      </Dialog>,
    )
    expect(document.querySelector('.exd-dialog-title')).not.toBeInTheDocument()
  })

  test('prefix / suffix 渲染在内容区外侧', () => {
    render(
      <Dialog visible transitionSpeed="none" onClose={() => {}} prefix={<span>pfx</span>} suffix={<span>sfx</span>}>
        mid
      </Dialog>,
    )
    expect(document.querySelector('.exd-dialog-prefix')).toHaveTextContent('pfx')
    expect(document.querySelector('.exd-dialog-suffix')).toHaveTextContent('sfx')
  })

  test('theme 为 iOS 时根带 exd-dialog-iOS', () => {
    render(
      <Dialog visible theme="iOS" transitionSpeed="none" onClose={() => {}}>
        t
      </Dialog>,
    )
    expect(document.querySelector('.exd-dialog-modal.exd-dialog-iOS')).toBeInTheDocument()
  })

  test('theme 为 Android 时根带 exd-dialog-Android', () => {
    render(
      <Dialog visible theme="Android" transitionSpeed="none" onClose={() => {}}>
        t
      </Dialog>,
    )
    expect(document.querySelector('.exd-dialog-modal.exd-dialog-Android')).toBeInTheDocument()
  })

  test('单个 action 时为横向操作区（无 vertical 类）', () => {
    render(
      <Dialog visible transitionSpeed="none" onClose={() => {}} actions={[{ content: '确定' }]}>
        c
      </Dialog>,
    )
    expect(document.querySelector('.exd-dialog-actions-vertical')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: '确定' })).toBeInTheDocument()
  })

  test('两个 action 时操作区带 exd-dialog-actions-vertical', () => {
    render(
      <Dialog
        visible
        transitionSpeed="none"
        onClose={() => {}}
        actions={[
          { content: '取消', onClick: () => {} },
          { content: '确认', onClick: () => {} },
        ]}
      >
        c
      </Dialog>,
    )
    expect(document.querySelector('.exd-dialog-actions-vertical')).toBeInTheDocument()
  })

  test('无自定义 onClick 的 action 点击触发 onClose', async () => {
    const user = userEvent.setup()
    const onClose = jest.fn()
    render(
      <Dialog visible transitionSpeed="none" onClose={onClose} actions={[{ content: '知道了' }]}>
        c
      </Dialog>,
    )
    await user.click(screen.getByRole('button', { name: '知道了' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('action 带 onClick 时不走默认 onClose', async () => {
    const user = userEvent.setup()
    const onClose = jest.fn()
    const onOk = jest.fn()
    render(
      <Dialog visible transitionSpeed="none" onClose={onClose} actions={[{ content: '确定', onClick: onOk }]}>
        c
      </Dialog>,
    )
    await user.click(screen.getByRole('button', { name: '确定' }))
    expect(onOk).toHaveBeenCalledTimes(1)
    expect(onClose).not.toHaveBeenCalled()
  })

  test('action 的 content 为函数时正常展示', () => {
    render(
      <Dialog visible transitionSpeed="none" onClose={() => {}} actions={[{ content: () => '动态文案' }]}>
        c
      </Dialog>,
    )
    expect(screen.getByRole('button', { name: '动态文案' })).toBeInTheDocument()
  })

  test('buttonFactory 可替换为自定义按钮', async () => {
    const user = userEvent.setup()
    const CustomBtn: React.FC<any> = ({ children, onClick, ...rest }) => (
      <button type="button" data-testid="custom" onClick={onClick} {...rest}>
        {children}
      </button>
    )
    render(
      <Dialog
        visible
        transitionSpeed="none"
        onClose={() => {}}
        buttonFactory={CustomBtn as any}
        actions={[{ content: '自绘' }]}
      >
        c
      </Dialog>,
    )
    expect(screen.getByTestId('custom')).toHaveTextContent('自绘')
    await user.click(screen.getByTestId('custom'))
  })

  test('action 上 className 合并到 exd-dialog-action', () => {
    render(
      <Dialog visible transitionSpeed="none" onClose={() => {}} actions={[{ content: 'A', className: 'act-x' }]}>
        c
      </Dialog>,
    )
    expect(document.querySelector('.exd-dialog-action.act-x')).toBeInTheDocument()
  })

  test('点击遮罩在 maskClosable 时触发 onClose', async () => {
    const user = userEvent.setup()
    const onClose = jest.fn()
    render(
      <Dialog visible transitionSpeed="none" onClose={onClose} maskClosable>
        c
      </Dialog>,
    )
    await user.click(document.querySelector('.exd-modal-mask') as HTMLElement)
    expect(onClose).toHaveBeenCalled()
  })

  test('className 合并到 exd-dialog-modal', () => {
    render(
      <Dialog visible className="dlg-extra" transitionSpeed="none" onClose={() => {}}>
        c
      </Dialog>,
    )
    expect(document.querySelector('.exd-dialog-modal.dlg-extra')).toBeInTheDocument()
  })

  test('modalId 固定时可从 modalStore 读取', () => {
    render(
      <Dialog visible modalId="dlg-1" transitionSpeed="none" onClose={() => {}}>
        x
      </Dialog>,
    )
    expect(modalStore.getById('dlg-1')).toBeTruthy()
  })

  test('受控关闭调用 onExited', async () => {
    const onExited = jest.fn()
    const { rerender } = render(
      <Dialog visible transitionSpeed="none" onClose={() => {}} onExited={onExited}>
        e
      </Dialog>,
    )
    rerender(
      <Dialog visible={false} transitionSpeed="none" onClose={() => {}} onExited={onExited}>
        e
      </Dialog>,
    )
    await waitFor(() => expect(onExited).toHaveBeenCalled())
  })
})
