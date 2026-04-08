/**
 * 独立文件：jest.mock 提升后仅在此文件内 createModalAPI 使用 mock 的 Provider。
 */
import React from 'react'
import { stationMap } from '../../ModalStation'

const renderGlobalProviderMock = jest.fn(() => Promise.resolve(true))

jest.mock('../../Provider', () => {
  const actual = jest.requireActual('../../Provider') as typeof import('../../Provider')
  return {
    __esModule: true,
    ...actual,
    renderGlobalProvider: (...args: unknown[]) => renderGlobalProviderMock(...args),
  }
})

import createModalAPI from '..'

function TinyModal({ visible, children }: { visible?: boolean; children?: React.ReactNode }) {
  if (!visible) return null
  return <div data-testid="tiny">{children}</div>
}

describe('createModalAPI（DEFAULT_STATION 分支）', () => {
  afterEach(() => {
    renderGlobalProviderMock.mockClear()
    delete stationMap.DEFAULT_STATION
    document.getElementById('GLOBAL_FEXD_PROVIDER')?.remove()
    delete (globalThis as { GLOBAL_FEXD_PROVIDER?: boolean }).GLOBAL_FEXD_PROVIDER
  })

  test('stationId 默认且尚未注册 DEFAULT_STATION 时会先调用 renderGlobalProvider', async () => {
    delete stationMap.DEFAULT_STATION

    const show = createModalAPI(TinyModal, {})
    show({
      modalId: 'branch-only',
      content: () => 'x',
    })

    await new Promise((r) => setTimeout(r, 0))
    expect(renderGlobalProviderMock).toHaveBeenCalled()
  })
})
