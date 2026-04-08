import React from 'react'
import { render, cleanup, act, waitFor } from '@testing-library/react'
import ModalStation, { stationMap } from '..'

describe('ModalStation', () => {
  afterEach(() => {
    cleanup()
    delete stationMap.station_test
    delete stationMap.station_persist
    document.body.innerHTML = ''
  })

  test('挂载不崩溃', () => {
    const { container } = render(<ModalStation id="station_test" />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('deleteStationMapKeyAfterUnmount 为 false 时卸载后仍保留 stationMap 键', async () => {
    const { unmount } = render(<ModalStation id="station_persist" deleteStationMapKeyAfterUnmount={false} />)
    await waitFor(() => expect(stationMap.station_persist).toBeDefined())
    unmount()
    expect(stationMap.station_persist).toBeDefined()
    delete stationMap.station_persist
  })

  test('stationMap 暴露 add / remove，可增删渲染项', async () => {
    render(<ModalStation id="station_test" />)
    const api = stationMap.station_test as {
      add: (id: string, r: () => React.ReactElement) => void
      remove: (id: string) => void
    }
    expect(api).toEqual(
      expect.objectContaining({
        add: expect.any(Function),
        remove: expect.any(Function),
      }),
    )

    await act(async () => {
      api.add('m1', () => <span data-testid="m1">驿站项</span>)
    })
    expect(document.querySelector('[data-testid="m1"]')).toBeInTheDocument()

    await act(async () => {
      api.remove('m1')
    })
    expect(document.querySelector('[data-testid="m1"]')).not.toBeInTheDocument()
  })
})
