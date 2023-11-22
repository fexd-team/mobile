import React from 'react'
import { render, screen } from '@testing-library/react'
import { Swiper } from '@fexd/mobile'

describe('Swiper', () => {
  test('应能正常渲染内容', () => {
    render(
      <Swiper>
        <div>Swiper Test</div>
      </Swiper>,
    )
    const linkElement = screen.getByText(/Swiper Test/i)
    expect(linkElement).toBeInTheDocument()
  })
})
