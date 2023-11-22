import React from 'react'
import { render, screen } from '@testing-library/react'
import { Cell } from '@fexd/mobile'

describe('Cell', () => {
  test('应能正常渲染内容', () => {
    render(<Cell>Cell Test</Cell>)
    const linkElement = screen.getByText(/Cell Test/i)
    expect(linkElement).toBeInTheDocument()
  })
})
