import React from 'react'
import { render, screen } from '@testing-library/react'
import { Picker } from '@fexd/mobile'

describe('Picker', () => {
  test('应能正常渲染内容', () => {
    render(<Picker>Picker Test</Picker>)
    const linkElement = screen.getByText(/Picker Test/i)
    expect(linkElement).toBeInTheDocument()
  })
})
