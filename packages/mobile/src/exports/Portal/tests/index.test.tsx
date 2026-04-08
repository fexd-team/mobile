import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Portal from '..'

describe('Portal', () => {
  afterEach(() => {
    cleanup()
    document.body.innerHTML = ''
  })

  test('子节点通过 Portal 挂载到 document.body', () => {
    const text = 'portal-子节点'
    render(
      <Portal>
        <span>{text}</span>
      </Portal>,
    )
    const inBody = Array.from(document.body.querySelectorAll('span')).some((el) => el.textContent === text)
    expect(inBody).toBe(true)
  })

  test('className 会应用到 Portal 容器元素', () => {
    const cn = 'portal-test-cls'
    render(
      <Portal className={cn}>
        <span>内</span>
      </Portal>,
    )
    expect(document.body.querySelector(`.${cn}`)).toBeInTheDocument()
  })
})
