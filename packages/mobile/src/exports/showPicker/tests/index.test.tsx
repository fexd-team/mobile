import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import showPicker from '..'
import ModalStation, { stationMap } from '../../ModalStation'
import modalStore from '../../modalStore'
import { cleanupModals } from '../../../tests/testing'

async function readyStation() {
  await waitFor(() => {
    expect(stationMap.DEFAULT_STATION).toBeDefined()
  })
}

function clickPickerConfirm(user: ReturnType<typeof userEvent.setup>) {
  const span = document.querySelector('.exd-nav-bar-right span') as HTMLElement
  expect(span).toBeTruthy()
  return user.click(span)
}

function clickPickerCancel(user: ReturnType<typeof userEvent.setup>) {
  const span = document.querySelector('.exd-nav-bar-left span') as HTMLElement
  expect(span).toBeTruthy()
  return user.click(span)
}

describe('showPicker', () => {
  afterEach(() => {
    cleanupModals()
    delete stationMap.DEFAULT_STATION
  })

  test('调用 showPicker 需挂载 ModalStation，确认后返回当前选中值', async () => {
    const user = userEvent.setup()
    render(<ModalStation id="DEFAULT_STATION" />)
    await readyStation()

    const p = showPicker({
      defaultValue: 'a',
      options: [
        { label: '选项甲', value: 'a' },
        { label: '选项乙', value: 'b' },
      ],
      popupProps: { transitionSpeed: 'none' },
    })

    await waitFor(() => {
      expect(document.querySelector('.exd-popup')).toBeInTheDocument()
    })

    await clickPickerConfirm(user)

    await expect(p).resolves.toBe('a')
  })

  test('点击左侧关闭不提交选择，返回原 defaultValue', async () => {
    const user = userEvent.setup()
    render(<ModalStation id="DEFAULT_STATION" />)
    await readyStation()

    const p = showPicker({
      defaultValue: 'x',
      options: [{ label: '仅一项', value: 'x' }],
      popupProps: { transitionSpeed: 'none' },
    })

    await waitFor(() => expect(document.querySelector('.exd-popup')).toBeInTheDocument())

    await clickPickerCancel(user)

    await expect(p).resolves.toBe('x')
  })

  test('clearable 为 false 时不注入「---」清除项', async () => {
    const user = userEvent.setup()
    render(<ModalStation id="DEFAULT_STATION" />)
    await readyStation()

    const p = showPicker({
      clearable: false,
      defaultValue: 'a',
      options: [{ label: '甲', value: 'a' }],
      popupProps: { transitionSpeed: 'none' },
    })

    await waitFor(() => expect(document.querySelector('.exd-picker-view')).toBeInTheDocument())
    expect(screen.queryByText('---')).not.toBeInTheDocument()

    await clickPickerConfirm(user)
    await expect(p).resolves.toBe('a')
  })

  test('popupProps 可覆盖头部左右侧展示', async () => {
    const user = userEvent.setup()
    render(<ModalStation id="DEFAULT_STATION" />)
    await readyStation()

    const p = showPicker({
      options: [{ label: 'L', value: 'l' }],
      popupProps: {
        transitionSpeed: 'none',
        headerLeft: <span>关</span>,
        headerRight: <span>好</span>,
      },
    })

    await waitFor(() => {
      expect(screen.getByText('好')).toBeInTheDocument()
      expect(screen.getByText('关')).toBeInTheDocument()
    })

    await user.click(screen.getByText('好'))
    await expect(p).resolves.toBeUndefined()
  })
})
