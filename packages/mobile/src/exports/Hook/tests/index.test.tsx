import React from 'react'
import { render, screen } from '@testing-library/react'
import Hook from '..'

describe('Hook', () => {
  test('hook 属性优先级高于 children：渲染 hook 返回值', () => {
    render(<Hook hook={() => <span>from-hook</span>}>{() => <span>from-child</span>}</Hook>)
    expect(screen.getByText('from-hook')).toBeInTheDocument()
    expect(screen.queryByText('from-child')).not.toBeInTheDocument()
  })

  test('无 hook 时用 children 函数并传入其余 props', () => {
    render(<Hook title="t1">{({ title }: { title?: string }) => <span>{title}</span>}</Hook>)
    expect(screen.getByText('t1')).toBeInTheDocument()
  })

  test('hook 返回普通对象（非 ReactElement）时渲染 null', () => {
    const { container } = render(<Hook hook={() => ({ plain: 1 } as any)} />)
    expect(container.firstChild).toBeNull()
  })

  test('hook 返回 null 时渲染为空', () => {
    const { container } = render(<Hook hook={() => null} />)
    expect(container.firstChild).toBeNull()
  })

  test('hook 返回合法 React 元素', () => {
    render(<Hook hook={() => <em>ok</em>} />)
    expect(screen.getByText('ok')).toBeInTheDocument()
  })
})
