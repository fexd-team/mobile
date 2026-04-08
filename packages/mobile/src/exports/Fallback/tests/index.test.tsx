import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import Fallback from '..'

jest.mock('@fexd/tools', () => {
  const actual = jest.requireActual('@fexd/tools') as Record<string, unknown>
  return {
    ...actual,
    source: {
      js: jest.fn(() => Promise.resolve({ init: jest.fn(), show: jest.fn() })),
    },
  }
})

const { source } = jest.requireMock('@fexd/tools') as {
  source: { js: jest.Mock }
}

describe('Fallback', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
    delete (window.navigator as { onLine?: boolean }).onLine
  })

  test('默认渲染：结构、子节点与默认图标', () => {
    const { container } = render(<Fallback>提示内容</Fallback>)
    expect(container.querySelector('.exd-fallback')).toBeInTheDocument()
    expect(screen.getByText('提示内容')).toBeInTheDocument()
    expect(container.querySelector('.exd-fallback-icon')).toBeTruthy()
  })

  test('error.stack 含 OFFLINE 或 navigator.onLine 为 false 时标记离线错误', () => {
    const err = new Error('x')
    err.stack = 'OFFLINE somewhere'
    render(
      <Fallback error={err}>
        {(info) => <span data-testid="flag">{info.isOfflineError ? 'offline' : 'no'}</span>}
      </Fallback>,
    )
    expect(screen.getByTestId('flag')).toHaveTextContent('offline')

    const err2 = new Error('y')
    Object.defineProperty(window.navigator, 'onLine', { value: false, configurable: true })
    render(
      <Fallback error={err2}>
        {(info) => <span data-testid="flag2">{info.isOfflineError ? 'offline' : 'no'}</span>}
      </Fallback>,
    )
    expect(screen.getByTestId('flag2')).toHaveTextContent('offline')
  })

  test('error.stack 以 TypeError / SyntaxError 开头时标记系统错误', () => {
    const err = new Error('oops')
    err.stack = 'TypeError: bad'
    render(
      <Fallback error={err}>{(info) => <span data-testid="sys">{info.isSystemError ? 'sys' : 'no'}</span>}</Fallback>,
    )
    expect(screen.getByTestId('sys')).toHaveTextContent('sys')
  })

  test('icon / children / footer 支持函数注入 errorInfo', () => {
    const err = new Error('业务失败')
    render(
      <Fallback error={err} footer={(info) => <button type="button">尾{String(info.error)}</button>}>
        {(info) => <span>{info.error instanceof Error ? info.error.message : ''}</span>}
      </Fallback>,
    )
    expect(screen.getByText('业务失败')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /尾/ })).toBeInTheDocument()
  })

  test('icon 为 React 节点时展示在图标区域', () => {
    const { container } = render(<Fallback icon={<span aria-label="自定义图标">IC</span>}>内容</Fallback>)
    expect(container.querySelector('.exd-fallback-icon')).toContainElement(screen.getByLabelText('自定义图标'))
  })

  test('console 为 true 时展示入口并加载 eruda', async () => {
    const err = new Error('e')
    render(
      <Fallback error={err} console>
        正文
      </Fallback>,
    )
    const link = document.querySelector('.exd-fallback-console')
    expect(link).toBeInTheDocument()
    fireEvent.click(link!)
    await Promise.resolve()
    expect(source.js).toHaveBeenCalled()
  })

  test('ref 转发到根 div', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Fallback ref={ref}>r</Fallback>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveClass('exd-fallback')
  })
})
