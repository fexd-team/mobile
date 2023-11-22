import React from 'react'
import { render, screen } from '@testing-library/react'
import { DatePicker } from '@fexd/mobile'

describe('DatePicker', () => {
  test('应能正常渲染内容', () => {
    render(<DatePicker>DatePicker Test</DatePicker>)
    const linkElement = screen.getByText(/DatePicker Test/i)
    expect(linkElement).toBeInTheDocument()
  })
})
