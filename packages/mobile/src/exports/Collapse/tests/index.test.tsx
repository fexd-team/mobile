import React from 'react'
import { render, screen } from '@testing-library/react'
import { Collapse } from '@fexd/mobile'

describe('Collapse', () => {
  test('应能正常渲染内容', () => {
    render(
      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel title="第一项" key="1">
          <div>Collapse Test 1</div>
        </Collapse.Panel>
        <Collapse.Panel title="第二项" key="2">
          <div>Collapse Test 2</div>
        </Collapse.Panel>
        <Collapse.Panel title="第三项" key="3">
          <div>Collapse Test 3</div>
        </Collapse.Panel>
      </Collapse>,
    )
    const linkElement = screen.getByText(/Collapse Test 1/i)
    expect(linkElement).toBeInTheDocument()
  })
})
