import React from 'react'
import { render, screen, cleanup, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Provider, { renderGlobalProvider } from '..'
import { stationMap } from '../../ModalStation'

const G = globalThis as { GLOBAL_FEXD_PROVIDER?: boolean; document?: Document }

describe('Provider', () => {
  afterEach(() => {
    cleanup()
    document.getElementById('GLOBAL_FEXD_PROVIDER')?.remove()
    delete G.GLOBAL_FEXD_PROVIDER
    delete stationMap.DEFAULT_STATION
  })

  test('渲染子节点并注册 DEFAULT_STATION 驿站', async () => {
    render(
      <Provider>
        <span data-testid="kid">子内容</span>
      </Provider>,
    )
    expect(screen.getByTestId('kid')).toHaveTextContent('子内容')
    await waitFor(() => expect(stationMap.DEFAULT_STATION).toBeDefined())
  })

  test('__global 为 true 时不移除已存在的 GLOBAL_FEXD_PROVIDER 容器', () => {
    const hole = document.createElement('div')
    hole.id = 'GLOBAL_FEXD_PROVIDER'
    document.body.appendChild(hole)
    G.GLOBAL_FEXD_PROVIDER = true
    render(<Provider __global>全局</Provider>)
    expect(document.getElementById('GLOBAL_FEXD_PROVIDER')).toBe(hole)
    document.body.removeChild(hole)
    delete G.GLOBAL_FEXD_PROVIDER
  })

  test('非 __global 时会卸载并移除遗留的全局 Provider 容器', () => {
    const hole = document.createElement('div')
    hole.id = 'GLOBAL_FEXD_PROVIDER'
    document.body.appendChild(hole)
    G.GLOBAL_FEXD_PROVIDER = true
    render(<Provider>局部</Provider>)
    expect(document.getElementById('GLOBAL_FEXD_PROVIDER')).toBeNull()
    expect(G.GLOBAL_FEXD_PROVIDER).toBeUndefined()
  })

  test('renderGlobalProvider：已存在 GLOBAL_FEXD_PROVIDER 标记时短路', async () => {
    G.GLOBAL_FEXD_PROVIDER = true
    await expect(renderGlobalProvider()).resolves.toBe(true)
    delete G.GLOBAL_FEXD_PROVIDER
  })

  test('renderGlobalProvider：挂载全局容器并注册驿站', async () => {
    delete G.GLOBAL_FEXD_PROVIDER
    document.getElementById('GLOBAL_FEXD_PROVIDER')?.remove()
    await renderGlobalProvider()
    expect(document.getElementById('GLOBAL_FEXD_PROVIDER')).toBeTruthy()
    await waitFor(() => expect(stationMap.DEFAULT_STATION).toBeDefined())
  })
})
