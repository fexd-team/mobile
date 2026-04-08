import React, { createContext, useContext } from 'react'
import { renderHook, act, cleanup, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import useShowDialog from '..'

type ModalTuple = ReturnType<typeof useShowDialog>

const ModalTupleContext = createContext<ModalTuple | null>(null)

function UseShowDialogStationWrapper({ children }: { children: React.ReactNode }) {
  const tuple = useShowDialog()
  return (
    <ModalTupleContext.Provider value={tuple}>
      {tuple[1]}
      {children}
    </ModalTupleContext.Provider>
  )
}

function useModalTupleInTree() {
  const v = useContext(ModalTupleContext)
  if (!v) {
    throw new Error('须在 UseShowDialogStationWrapper 内使用 renderHook')
  }
  return v
}

describe('useShowDialog', () => {
  afterEach(() => {
    cleanup()
    document.getElementById('GLOBAL_FEXD_PROVIDER')?.remove()
    delete (globalThis as Record<string, unknown>).GLOBAL_FEXD_PROVIDER
    document.body.innerHTML = ''
  })

  test('返回 [show, station]：show 为函数，station 为 ModalStation 元素', () => {
    const { result } = renderHook(() => useModalTupleInTree(), {
      wrapper: UseShowDialogStationWrapper,
    })
    const [show, station] = result.current
    expect(result.current).toHaveLength(2)
    expect(typeof show).toBe('function')
    expect(React.isValidElement(station)).toBe(true)
  })

  test('show() 后渲染 Dialog DOM，close() 后从文档移除', async () => {
    const { result } = renderHook(() => useModalTupleInTree(), {
      wrapper: UseShowDialogStationWrapper,
    })
    const [show] = result.current

    let ctrl: { close: () => void }
    await act(async () => {
      ctrl = show({ content: '正文' }) as { close: () => void }
    })

    await waitFor(() => {
      expect(document.querySelector('.exd-dialog-modal')).toBeInTheDocument()
    })

    await act(async () => {
      ctrl!.close()
    })

    await waitFor(() => {
      expect(document.querySelector('.exd-dialog-modal')).not.toBeInTheDocument()
    })
  })
})
