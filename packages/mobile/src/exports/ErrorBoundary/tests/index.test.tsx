import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ErrorBoundary from '..'

describe('ErrorBoundary', () => {
  describe('L1 冒烟', () => {
    test('子组件正常时渲染 children', () => {
      render(
        <ErrorBoundary>
          <span>可见内容</span>
        </ErrorBoundary>,
      )
      expect(screen.getByText('可见内容')).toBeInTheDocument()
    })
  })

  describe('L2 属性逐项', () => {
    test('子组件抛错时展示 fallback 并调用 onError', () => {
      const onError = jest.fn()
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      const Boom = () => {
        throw new Error('boom')
      }

      render(
        <ErrorBoundary onError={onError} fallback={(err) => <div>捕获：{err.message}</div>}>
          <Boom />
        </ErrorBoundary>,
      )

      expect(screen.getByText('捕获：boom')).toBeInTheDocument()
      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError.mock.calls[0][0]).toBeInstanceOf(Error)
      expect((onError.mock.calls[0][0] as Error).message).toBe('boom')

      consoleSpy.mockRestore()
    })

    test('使用函数 fallback 时可通过 retry 再次渲染子树', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      const Boom = () => {
        throw new Error('首次渲染失败')
      }

      function RetryHarness() {
        const [shouldFail, setShouldFail] = React.useState(true)
        return (
          <ErrorBoundary
            fallback={(_err, retry) => (
              <button
                type="button"
                onClick={() => {
                  setShouldFail(false)
                  retry()
                }}
              >
                重试
              </button>
            )}
          >
            {shouldFail ? <Boom /> : <span>重试后正常</span>}
          </ErrorBoundary>
        )
      }

      render(<RetryHarness />)

      expect(screen.getByRole('button', { name: '重试' })).toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: '重试' }))
      expect(screen.getByText('重试后正常')).toBeInTheDocument()

      consoleSpy.mockRestore()
    })
  })

  describe('L6 边界', () => {
    test('无自定义 fallback 时使用默认 UI 展示错误信息', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      const Bad = () => {
        throw new Error('默认兜底')
      }

      render(
        <ErrorBoundary>
          <Bad />
        </ErrorBoundary>,
      )

      expect(screen.getByText('默认兜底')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument()

      consoleSpy.mockRestore()
    })
  })
})
