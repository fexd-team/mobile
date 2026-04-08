import React from 'react'
import { render, waitFor } from '@testing-library/react'
import TransitionSwitch from '..'

describe('TransitionSwitch', () => {
  test('L1：提供 animateKey 时渲染子节点', () => {
    const { getByText } = render(
      <TransitionSwitch animateKey="a" speed="none">
        <span>切换内容</span>
      </TransitionSwitch>,
    )
    expect(getByText('切换内容')).toBeInTheDocument()
  })

  test('L2：TransitionGroup className 包含 exd-transition-switch__transition-group', () => {
    const { container } = render(
      <TransitionSwitch animateKey={1} speed="none">
        <span>x</span>
      </TransitionSwitch>,
    )
    expect(container.querySelector('.exd-transition-switch__transition-group')).toBeInTheDocument()
  })

  test('L6：animateKey 切换后旧子节点卸载（unmountOnExit）', async () => {
    const { rerender, queryByText } = render(
      <TransitionSwitch animateKey={1} speed="none">
        <span>第一屏</span>
      </TransitionSwitch>,
    )
    expect(queryByText('第一屏')).toBeInTheDocument()

    rerender(
      <TransitionSwitch animateKey={2} speed="none">
        <span>第二屏</span>
      </TransitionSwitch>,
    )

    await waitFor(() => {
      expect(queryByText('第一屏')).not.toBeInTheDocument()
    })
    expect(queryByText('第二屏')).toBeInTheDocument()
  })
})
