import React from 'react'
import { renderHook, cleanup, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import createUseModalAPI from '..'

describe('createUseModalAPI', () => {
  afterEach(() => {
    cleanup()
  })

  test('返回值为可调用的 Hook 工厂函数', () => {
    const mockShow = jest.fn(() => ({
      close: jest.fn(),
      update: jest.fn(),
      promise: Promise.resolve(),
    }))
    const useShowModal = createUseModalAPI(mockShow)
    expect(typeof useShowModal).toBe('function')
  })

  test('调用 Hook 得到 [show, stationElement]，show 会注入 stationId', async () => {
    const mockShow = jest.fn(() => ({
      close: jest.fn(),
      update: jest.fn(),
      promise: Promise.resolve(),
    }))
    const useShowModal = createUseModalAPI(mockShow)
    const { result } = renderHook(() => useShowModal())
    expect(result.current).toHaveLength(2)
    const [show, station] = result.current
    expect(typeof show).toBe('function')
    expect(React.isValidElement(station)).toBe(true)

    render(<>{station}</>)
    show({ modalId: 'hook-m', content: () => null } as any)

    await waitFor(() => expect(mockShow).toHaveBeenCalled())
    const arg = mockShow.mock.calls[0][0] as { stationId?: string }
    expect(arg.stationId).toEqual(expect.any(String))
    expect(arg.modalId).toBe('hook-m')
  })
})
