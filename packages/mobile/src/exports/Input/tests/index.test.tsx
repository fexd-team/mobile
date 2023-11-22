import React from 'react'
import { render, screen } from '@testing-library/react'
import { Input } from '@fexd/mobile'

describe('Input', () => {
  test('should works with `value={null}`', async () => {
    const renderer = render(<Input value={null as any} />)
    // expect(renderer.container).toMatchSnapshot()
    expect(renderer.container.getElementsByTagName('input').length).toBe(1)
  })
})
