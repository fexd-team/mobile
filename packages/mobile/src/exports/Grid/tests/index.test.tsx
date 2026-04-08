jest.mock('../../../helpers/styleChecker', () => ({
  ...jest.requireActual('../../../helpers/styleChecker'),
  detectFlexGapSupported: jest.fn(() => false),
}))

import React from 'react'
import { render, screen, act } from '@testing-library/react'
import * as styleChecker from '../../../helpers/styleChecker'
import Grid from '..'

describe('Grid', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('默认渲染冒烟：根节点与 Grid.Item', () => {
    const { container } = render(
      <Grid>
        <Grid.Item text="格" icon={<span data-testid="ico" />} />
      </Grid>,
    )
    expect(container.querySelector('.exd-grid')).toBeInTheDocument()
    expect(screen.getByText('格')).toBeInTheDocument()
  })

  test('columns 反映到 Item 的 flexBasis', () => {
    const { container } = render(
      <Grid columns={3}>
        <Grid.Item text="a" icon={<span />} />
        <Grid.Item text="b" icon={<span />} />
      </Grid>,
    )
    const items = container.querySelectorAll('.exd-grid-item')
    expect((items[0] as HTMLElement).style.flexBasis).toBe(`${100 / 3}%`)
  })

  test('gutter[0]>0 时为根节点设置 paddingLeft', () => {
    const { container } = render(
      <Grid gutter={[8, 0]}>
        <Grid.Item text="x" icon={<span />} />
      </Grid>,
    )
    const root = container.querySelector('.exd-grid') as HTMLElement
    expect(root.style.paddingLeft).toBe('8px')
  })

  test('border 且 gutter 仅一侧非零时根节点带 line-top', () => {
    const { container } = render(
      <Grid border gutter={[8, 0]}>
        <Grid.Item text="t" icon={<span />} />
      </Grid>,
    )
    expect(container.querySelector('.exd-grid')).toHaveClass('exd-grid-line-top')
  })

  test('border 且 gutter 两侧均>0 时无 line-top', () => {
    const { container } = render(
      <Grid border gutter={[8, 8]}>
        <Grid.Item text="t" icon={<span />} />
      </Grid>,
    )
    const root = container.querySelector('.exd-grid')
    expect(root).toHaveClass('exd-grid-line')
    expect(root).not.toHaveClass('exd-grid-line-top')
  })

  test('detectFlexGapSupported=true 且 gutter[1]>0 时根节点 style 含 rowGap', async () => {
    ;(styleChecker.detectFlexGapSupported as jest.Mock).mockReturnValue(true)
    const { container } = render(
      <Grid gutter={[4, 12]}>
        <Grid.Item text="g" icon={<span />} />
      </Grid>,
    )
    await act(async () => {
      await Promise.resolve()
    })
    const root = container.querySelector('.exd-grid') as HTMLElement
    expect(root.style.rowGap).toBe('12px')
  })

  test('detectFlexGapSupported=false 时根节点不设 rowGap', async () => {
    ;(styleChecker.detectFlexGapSupported as jest.Mock).mockReturnValue(false)
    const { container } = render(
      <Grid gutter={[4, 12]}>
        <Grid.Item text="g" icon={<span />} />
      </Grid>,
    )
    await act(async () => {
      await Promise.resolve()
    })
    const root = container.querySelector('.exd-grid') as HTMLElement
    expect(root.style.rowGap).toBe('')
  })

  test('vertical=false 时根节点无 vertical 修饰类', () => {
    const { container } = render(
      <Grid vertical={false}>
        <Grid.Item text="t" icon={<span />} />
      </Grid>,
    )
    expect(container.querySelector('.exd-grid')).not.toHaveClass('exd-grid-vertical')
  })

  test('vertical 默认 true 时根节点带 vertical 类', () => {
    const { container } = render(
      <Grid>
        <Grid.Item text="t" icon={<span />} />
      </Grid>,
    )
    expect(container.querySelector('.exd-grid')).toHaveClass('exd-grid-vertical')
  })

  test('border=false 时根节点无 line 类', () => {
    const { container } = render(
      <Grid border={false}>
        <Grid.Item text="t" icon={<span />} />
      </Grid>,
    )
    expect(container.querySelector('.exd-grid')).not.toHaveClass('exd-grid-line')
  })

  test('square=true 时 Item 带 square 相关样式', () => {
    const { container } = render(
      <Grid columns={2} square>
        <Grid.Item text="s" icon={<span />} />
      </Grid>,
    )
    const item = container.querySelector('.exd-grid-item') as HTMLElement
    expect(item).toHaveClass('exd-grid-item-square')
    expect(item.style.paddingTop).toBe('50%')
  })

  test('className 合并到根节点', () => {
    const { container } = render(
      <Grid className="my-grid">
        <Grid.Item text="t" icon={<span />} />
      </Grid>,
    )
    expect(container.querySelector('.exd-grid')).toHaveClass('my-grid')
  })

  test('data-* 等 restProps 透传到根节点', () => {
    const { container } = render(
      <Grid data-testid="grid-root" id="gid">
        <Grid.Item text="t" icon={<span />} />
      </Grid>,
    )
    const root = container.querySelector('.exd-grid')
    expect(root).toHaveAttribute('data-testid', 'grid-root')
    expect(root).toHaveAttribute('id', 'gid')
  })

  test('ref 转发到根 div', () => {
    const ref = React.createRef<HTMLDivElement>()
    const { container } = render(
      <Grid ref={ref}>
        <Grid.Item text="r" icon={<span />} />
      </Grid>,
    )
    expect(ref.current).toBe(container.querySelector('.exd-grid'))
  })

  test('无子项时仅渲染空网格容器', () => {
    const { container } = render(<Grid />)
    const root = container.querySelector('.exd-grid')
    expect(root).toBeInTheDocument()
    expect(root?.querySelector('.exd-grid-item')).not.toBeInTheDocument()
  })

  test('单个子项仍可渲染', () => {
    render(
      <Grid columns={4}>
        <Grid.Item text="唯一" icon={<span />} />
      </Grid>,
    )
    expect(screen.getByText('唯一')).toBeInTheDocument()
  })
})
