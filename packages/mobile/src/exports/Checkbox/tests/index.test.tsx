import React from 'react'
import { render, screen } from '@testing-library/react'
import { Checkbox } from '@fexd/mobile'

describe('Checkbox', () => {
  test('应能正常渲染内容', () => {
    render(<Checkbox>Checkbox Test</Checkbox>)
    const linkElement = screen.getByText(/Checkbox Test/i)
    expect(linkElement).toBeInTheDocument()
  })
})
