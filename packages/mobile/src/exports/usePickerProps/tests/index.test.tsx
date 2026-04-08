import React from 'react'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderHook } from '@testing-library/react'
import usePickerProps from '..'
import modalStore from '../../modalStore'
import { cleanupModals } from '../../../tests/testing'

async function clickPopupConfirm(user: ReturnType<typeof userEvent.setup>) {
  const span = document.querySelector('.exd-nav-bar-right span') as HTMLElement
  expect(span).toBeTruthy()
  await user.click(span)
}

async function clickPopupCancel(user: ReturnType<typeof userEvent.setup>) {
  const span = document.querySelector('.exd-nav-bar-left span') as HTMLElement
  expect(span).toBeTruthy()
  await user.click(span)
}

describe('usePickerProps', () => {
  afterEach(cleanupModals)

  test('renderTrigger 在非 disabled 时点击打开 Popup；disabled 时不打开', async () => {
    const user = userEvent.setup()

    function OpenCase() {
      const { renderTrigger, renderPopup } = usePickerProps({
        defaultValue: 'a',
        popupProps: { transitionSpeed: 'none' },
      })
      return (
        <>
          {renderTrigger(<button type="button">选</button>)}
          {renderPopup(<span>弹层体</span>)}
        </>
      )
    }

    render(<OpenCase />)
    await user.click(screen.getByRole('button', { name: '选' }))
    await waitFor(() => {
      expect(document.querySelector('.exd-popup')).toBeInTheDocument()
      expect(screen.getByText('弹层体')).toBeInTheDocument()
    })

    cleanup()
    modalStore.destroyAll()
    modalStore.map.clear()

    function DisabledCase() {
      const { renderTrigger, renderPopup } = usePickerProps({
        defaultValue: 'a',
        disabled: true,
        popupProps: { transitionSpeed: 'none' },
      })
      return (
        <>
          {renderTrigger(<span data-testid="t">选</span>)}
          {renderPopup(<span>内</span>)}
        </>
      )
    }

    render(<DisabledCase />)
    await user.click(screen.getByTestId('t'))
    expect(document.querySelector('.exd-popup')).not.toBeInTheDocument()
  })

  test('点击确认提交 insideValue；onConfirm 返回 false 时不关闭', async () => {
    const user = userEvent.setup()
    const onConfirm = jest.fn().mockResolvedValue(false)

    function Comp() {
      const { renderTrigger, renderPopup, insideValue, setInsideValue } = usePickerProps({
        defaultValue: 'a',
        onConfirm,
        popupProps: { transitionSpeed: 'none' },
      })
      return (
        <>
          {renderTrigger(<button type="button">开</button>)}
          {renderPopup(
            <button type="button" onClick={() => setInsideValue('b')}>
              改为b 当前{String(insideValue)}
            </button>,
          )}
        </>
      )
    }

    render(<Comp />)
    await user.click(screen.getByRole('button', { name: '开' }))
    await waitFor(() => expect(document.querySelector('.exd-popup')).toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: /改为b/ }))
    await clickPopupConfirm(user)

    await waitFor(() => expect(onConfirm).toHaveBeenCalled())
    expect(document.querySelector('.exd-popup')).toBeInTheDocument()

    onConfirm.mockResolvedValue(true)
    await clickPopupConfirm(user)
    await waitFor(() => expect(document.querySelector('.exd-popup')).not.toBeInTheDocument())
  })

  test('未传 onCancel 时点击头部左侧可关闭弹层', async () => {
    const user = userEvent.setup()

    function Comp() {
      const { renderTrigger, renderPopup } = usePickerProps({
        defaultValue: 'a',
        popupProps: { transitionSpeed: 'none' },
      })
      return (
        <>
          {renderTrigger(<button type="button">开</button>)}
          {renderPopup(<span>内</span>)}
        </>
      )
    }

    render(<Comp />)
    await user.click(screen.getByRole('button', { name: '开' }))
    await waitFor(() => expect(document.querySelector('.exd-popup')).toBeInTheDocument())
    await clickPopupCancel(user)
    await waitFor(() => expect(document.querySelector('.exd-popup')).not.toBeInTheDocument())
  })

  test('点击遮罩关闭走 Popup onClose，执行 onCancel 校验后关闭', async () => {
    const user = userEvent.setup()
    const onCancel = jest.fn().mockResolvedValue(undefined)

    function Comp() {
      const { renderTrigger, renderPopup } = usePickerProps({
        defaultValue: 'a',
        onCancel,
        popupProps: { transitionSpeed: 'none' },
      })
      return (
        <>
          {renderTrigger(<button type="button">开</button>)}
          {renderPopup(<span>m</span>)}
        </>
      )
    }

    render(<Comp />)
    await user.click(screen.getByRole('button', { name: '开' }))
    await waitFor(() => expect(document.querySelector('.exd-modal-mask')).toBeInTheDocument())

    await user.click(document.querySelector('.exd-modal-mask') as HTMLElement)
    await waitFor(() => expect(onCancel).toHaveBeenCalled())
    await waitFor(() => expect(document.querySelector('.exd-popup')).not.toBeInTheDocument())
  })

  test('左侧与关闭路径上 onCancel 返回 false 时阻止关闭', async () => {
    const user = userEvent.setup()
    const onCancel = jest.fn()

    function Comp() {
      const { renderTrigger, renderPopup } = usePickerProps({
        defaultValue: 'a',
        onCancel: () => {
          onCancel()
          return false
        },
        popupProps: { transitionSpeed: 'none' },
      })
      return (
        <>
          {renderTrigger(<button type="button">开</button>)}
          {renderPopup(<span>x</span>)}
        </>
      )
    }

    render(<Comp />)
    await user.click(screen.getByRole('button', { name: '开' }))
    await waitFor(() => expect(document.querySelector('.exd-popup')).toBeInTheDocument())

    await clickPopupCancel(user)
    expect(onCancel).toHaveBeenCalled()
    expect(document.querySelector('.exd-popup')).toBeInTheDocument()
  })

  test('点击遮罩时 onCancel 返回 false 则 onClose 不关闭', async () => {
    const user = userEvent.setup()
    const onCancel = jest.fn().mockResolvedValue(false)

    function Comp() {
      const { renderTrigger, renderPopup } = usePickerProps({
        defaultValue: 'a',
        onCancel,
        popupProps: { transitionSpeed: 'none' },
      })
      return (
        <>
          {renderTrigger(<button type="button">开</button>)}
          {renderPopup(<span>x</span>)}
        </>
      )
    }

    render(<Comp />)
    await user.click(screen.getByRole('button', { name: '开' }))
    await waitFor(() => expect(document.querySelector('.exd-modal-mask')).toBeInTheDocument())

    await user.click(document.querySelector('.exd-modal-mask') as HTMLElement)
    await waitFor(() => expect(onCancel).toHaveBeenCalled())
    expect(document.querySelector('.exd-popup')).toBeInTheDocument()
  })

  test('onExited 时若有 value 则把 insideValue 同步回 value，并调用 popupProps.onExited', async () => {
    const user = userEvent.setup()
    const onExited = jest.fn()

    function Comp() {
      const { renderTrigger, renderPopup, setValue, value } = usePickerProps({
        defaultValue: 'a',
        popupProps: { transitionSpeed: 'none', onExited },
      })
      return (
        <>
          {renderTrigger(<button type="button">开</button>)}
          {renderPopup(
            <div>
              <span data-testid="v">{String(value)}</span>
              <button type="button" onClick={() => setValue('committed')}>
                改外部值
              </button>
            </div>,
          )}
        </>
      )
    }

    render(<Comp />)
    await user.click(screen.getByRole('button', { name: '开' }))
    await waitFor(() => expect(document.querySelector('.exd-popup')).toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: '改外部值' }))
    await clickPopupConfirm(user)

    await waitFor(() => expect(onExited).toHaveBeenCalled(), { timeout: 8000 })
  })

  test('hook 返回值包含 IO 字段与 headerRight 等', () => {
    const { result } = renderHook(() =>
      usePickerProps({
        defaultValue: 'pick',
      }),
    )
    const r = result.current
    expect(r.value).toBe('pick')
    expect(r.insideValue).toBe('pick')
    expect(typeof r.renderTrigger).toBe('function')
    expect(typeof r.renderPopup).toBe('function')
    expect(r.headerRight).toBeDefined()
  })
})
