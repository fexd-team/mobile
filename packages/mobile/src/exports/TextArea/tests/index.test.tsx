import React from 'react'
import { render, screen } from '@testing-library/react'
import { TextArea } from '@fexd/mobile'

describe('TextArea', () => {
  test('should works with `value={null}`', async () => {
    const renderer = render(<TextArea value={null as any} />)
    // expect(renderer.container).toMatchSnapshot()
    expect(renderer.container.getElementsByTagName('textarea').length).toBe(1)
  })
})
