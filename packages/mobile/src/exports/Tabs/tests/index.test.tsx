import React from 'react'
import { render, screen } from '@testing-library/react'
import { Tabs } from '@fexd/mobile'

describe('Tabs', () => {
  test('应能正常渲染内容', () => {
    render(
      <Tabs
        data={[
          {
            label: 'First option',
            value: 'first',
          },
          {
            label: 'Second option',
            value: 'second',
          },
        ]}
        defaultValue="first"
      />,
    )
    const linkElement = screen.getByText(/First option/i)
    expect(linkElement).toBeInTheDocument()
  })
})
