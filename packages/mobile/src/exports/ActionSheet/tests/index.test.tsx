import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import ActionSheet, { prefix as actionSheetPrefix } from '..'
import modalStore from '../../modalStore'
import { cleanupModals } from '../../../tests/testing'

describe('ActionSheet', () => {
  afterEach(cleanupModals)

  test('不传 modalId 时内部生成 id 并注册 modalStore', () => {
    render(<ActionSheet visible transitionSpeed="none" onClose={() => {}} actions={[]} />)
    expect(modalStore.getAll().length).toBeGreaterThanOrEqual(1)
  })

  test('prefix 导出与样式前缀一致', () => {
    expect(actionSheetPrefix).toBe('exd-action-sheet')
  })

  test('visible 为 true 时渲染动作区与按钮', () => {
    render(<ActionSheet visible transitionSpeed="none" onClose={() => {}} actions={[{ content: '项A' }]} />)
    expect(document.querySelector('.exd-action-sheet-popup')).toBeInTheDocument()
    expect(document.querySelector('.exd-action-sheet-actions')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '项A' })).toBeInTheDocument()
  })

  test('visible 为 false 时不渲染动作按钮文案', () => {
    render(<ActionSheet visible={false} transitionSpeed="none" onClose={() => {}} actions={[{ content: 'x' }]} />)
    expect(screen.queryByRole('button', { name: 'x' })).not.toBeInTheDocument()
  })

  test('title 通过 Popup 展示在头部', () => {
    render(<ActionSheet visible title="动作面板" transitionSpeed="none" onClose={() => {}} actions={[]} />)
    expect(document.querySelector('.exd-popup-header')).toHaveTextContent('动作面板')
  })

  test('多个对象 action 渲染且带 action-content', () => {
    render(
      <ActionSheet
        visible
        transitionSpeed="none"
        onClose={() => {}}
        actions={[{ content: '一' }, { content: '二' }]}
      />,
    )
    const contents = document.querySelectorAll('.exd-action-sheet-action-content')
    expect(contents).toHaveLength(2)
    expect(contents[0]).toHaveTextContent('一')
    expect(contents[1]).toHaveTextContent('二')
  })

  test('actions 项为 React 元素时原样渲染（isValidElement 分支）', () => {
    render(
      <ActionSheet
        visible
        transitionSpeed="none"
        onClose={() => {}}
        actions={[
          <div key={0} data-testid="raw-node">
            自定义节点
          </div>,
        ]}
      />,
    )
    expect(screen.getByTestId('raw-node')).toHaveTextContent('自定义节点')
    expect(document.querySelector('.exd-action-sheet-action')).not.toBeInTheDocument()
  })

  test('同一 actions 数组可混合 React 元素与对象项', () => {
    render(
      <ActionSheet
        visible
        transitionSpeed="none"
        onClose={() => {}}
        actions={[<span key={0}>节点</span>, { content: '按钮' }]}
      />,
    )
    expect(screen.getByText('节点')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '按钮' })).toBeInTheDocument()
  })

  test('点击带 onClick 的 action 只触发 onClick', async () => {
    const user = userEvent.setup()
    const onSelect = jest.fn()
    render(
      <ActionSheet
        visible
        transitionSpeed="none"
        onClose={() => {}}
        actions={[{ content: '选择我', onClick: onSelect }]}
      />,
    )
    await user.click(screen.getByRole('button', { name: '选择我' }))
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  test('无 onClick 的 action 点击触发 onClose', async () => {
    const user = userEvent.setup()
    const onClose = jest.fn()
    render(<ActionSheet visible transitionSpeed="none" onClose={onClose} actions={[{ content: '取消' }]} />)
    await user.click(screen.getByRole('button', { name: '取消' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('content 为函数时渲染 run 结果', () => {
    render(<ActionSheet visible transitionSpeed="none" onClose={() => {}} actions={[{ content: () => '函数文案' }]} />)
    expect(screen.getByRole('button', { name: '函数文案' })).toBeInTheDocument()
  })

  test('buttonFactory 可替换为自定义按钮', async () => {
    const user = userEvent.setup()
    const CustomBtn: React.FC<any> = ({ children, onClick, ...rest }) => (
      <button type="button" data-testid="as-custom" onClick={onClick} {...rest}>
        {children}
      </button>
    )
    render(
      <ActionSheet
        visible
        transitionSpeed="none"
        onClose={() => {}}
        buttonFactory={CustomBtn as any}
        actions={[{ content: '自定义' }]}
      />,
    )
    await user.click(screen.getByTestId('as-custom'))
  })

  test('action 的 className 合并到 exd-action-sheet-action', () => {
    render(
      <ActionSheet
        visible
        transitionSpeed="none"
        onClose={() => {}}
        actions={[{ content: '带类名', className: 'row-a' }]}
      />,
    )
    expect(document.querySelector('.exd-action-sheet-action.row-a')).toBeInTheDocument()
  })

  test('className 合并到 Popup 根（exd-action-sheet-popup）', () => {
    render(<ActionSheet visible className="sheet-extra" transitionSpeed="none" onClose={() => {}} actions={[]} />)
    expect(document.querySelector('.exd-action-sheet-popup.sheet-extra')).toBeInTheDocument()
  })

  test('maskClosable 点击遮罩触发 onClose', async () => {
    const user = userEvent.setup()
    const onClose = jest.fn()
    render(<ActionSheet visible transitionSpeed="none" onClose={onClose} maskClosable actions={[{ content: 'OK' }]} />)
    await user.click(document.querySelector('.exd-modal-mask') as HTMLElement)
    expect(onClose).toHaveBeenCalled()
  })

  test('actions 为空数组时不渲染动作按钮', () => {
    render(<ActionSheet visible transitionSpeed="none" onClose={() => {}} actions={[]} />)
    expect(document.querySelector('.exd-action-sheet-actions')).toBeInTheDocument()
    expect(document.querySelector('.exd-action-sheet-action')).not.toBeInTheDocument()
  })

  test('modalId 固定时可从 modalStore 读取', () => {
    render(<ActionSheet visible modalId="as-1" transitionSpeed="none" onClose={() => {}} actions={[]} />)
    expect(modalStore.getById('as-1')).toBeTruthy()
  })

  test('受控关闭触发 onExited', async () => {
    const onExited = jest.fn()
    const { rerender } = render(
      <ActionSheet
        visible
        transitionSpeed="none"
        onClose={() => {}}
        onExited={onExited}
        actions={[{ content: 'x' }]}
      />,
    )
    rerender(
      <ActionSheet
        visible={false}
        transitionSpeed="none"
        onClose={() => {}}
        onExited={onExited}
        actions={[{ content: 'x' }]}
      />,
    )
    await waitFor(() => expect(onExited).toHaveBeenCalled())
  })
})
