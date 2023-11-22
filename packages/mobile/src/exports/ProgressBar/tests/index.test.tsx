import React from 'react'
import { render, screen } from '@testing-library/react'
import { ProgressBar } from '@fexd/mobile'

describe('ProgressBar', () => {
  test('ProgressBar 应能正常渲染内容', () => {
    render(
      <>
        <ProgressBar value={50} />
        <div>ProgressBar Test</div>
      </>,
    )
    const linkElement = screen.getByText(/ProgressBar Test/i)
    expect(linkElement).toBeInTheDocument()
  })
})
