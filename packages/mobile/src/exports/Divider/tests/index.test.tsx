import React from 'react'
import { render, screen } from '@testing-library/react'
import { Divider } from '@fexd/mobile'

describe('Divider', () => {
  afterEach(async () => {
    document.body.innerHTML = ''
  })

  test('内容能正常渲染', () => {
    render(<Divider>Divider Test</Divider>)
    const linkElement = screen.getByText(/Divider Test/i)
    expect(linkElement).toBeInTheDocument()
  })

  test('vertical 属性能正常工作', () => {
    const { container: verticalContainer } = render(<Divider vertical={true} />)
    // 当 vertical 属性为 true ，类名为 exd-divider-vertical
    expect(verticalContainer.querySelector('.exd-divider')).toBeNull()
    expect(verticalContainer.querySelector('.exd-divider-vertical')).not.toBeNull()

    const { container } = render(<Divider />)
    // 当 vertical 属性为 false ，类名为 exd-divider
    expect(container.querySelector('.exd-divider')).not.toBeNull()
    expect(container.querySelector('.exd-divider-vertical')).toBeNull()
  })
})
