import modalConflict from '..'
import type { ModalStoreData } from '../../modalStore/type'

function data(p: Partial<ModalStoreData> & Pick<ModalStoreData, 'modalId' | 'zIndex' | 'level'>): ModalStoreData {
  return {
    setVisible: jest.fn(),
    setCreated: jest.fn(),
    contentRef: { current: document.createElement('div') },
    props: {},
    ...p,
  } as ModalStoreData
}

describe('modalConflict', () => {
  test('create：仅当存在更高 zIndex 的同级候选时视为冲突', () => {
    const handler = modalConflict.create({
      conflictProps: { hit: true },
    })
    const noConflict = handler({
      current: data({ modalId: 'c', zIndex: 30, level: 'normal' }),
      store: {
        getAll: () => [data({ modalId: 'h', zIndex: 10, level: 'normal' })],
      },
    } as any)
    expect(noConflict).toEqual({})

    const yes = handler({
      current: data({ modalId: 'c', zIndex: 5, level: 'normal' }),
      store: {
        getAll: () => [data({ modalId: 'h', zIndex: 20, level: 'normal' })],
      },
    } as any)
    expect(yes).toEqual({ hit: true })
  })

  test('create 冲突时执行 conflictProps 对象', () => {
    const handler = modalConflict.create({
      conflictProps: { contentMask: true },
    })
    const r = handler({
      current: data({ modalId: 'c', zIndex: 1, level: 'normal' }),
      store: {
        getAll: () => [data({ modalId: 'h', zIndex: 50, level: 'normal' })],
      },
    } as any)
    expect(r).toEqual({ contentMask: true })
  })

  test('create 冲突时 conflictProps 为函数则传入 conflict 信息', () => {
    const fn = jest.fn(() => ({ ok: 1 }))
    const handler = modalConflict.create({ conflictProps: fn as any })
    handler({
      current: data({ modalId: 'c', zIndex: 1, level: 'normal' }),
      store: {
        getAll: () => [data({ modalId: 'h', zIndex: 10, level: 'normal' })],
      },
    } as any)
    expect(fn).toHaveBeenCalledWith(
      expect.objectContaining({
        conflict: true,
        current: expect.any(Object),
        conflictModalList: expect.any(Array),
      }),
    )
  })

  test('levels 返回 undefined 时不按层级过滤（高等级弹层仍参与互斥）', () => {
    const handler = modalConflict.create({
      levels: () => undefined as any,
      types: ['t1'],
      conflictProps: { layered: true },
    })
    const r = handler({
      current: data({ modalId: 'c', zIndex: 1, level: 'normal', type: 't1' }),
      store: {
        getAll: () => [data({ modalId: 'h', zIndex: 20, level: 'high', type: 't1' })],
      },
    } as any)
    expect(r).toEqual({ layered: true })
  })

  test('types 用字符串与正则匹配 type', () => {
    const h1 = modalConflict.create({ types: ['foo'] })
    expect(
      h1({
        current: data({ modalId: 'c', zIndex: 1, level: 'normal', type: 'foo' }),
        store: {
          getAll: () => [data({ modalId: 'h', zIndex: 30, level: 'normal', type: 'foo' })],
        },
      } as any),
    ).toEqual({})

    const h2 = modalConflict.create({ types: [/^f/] })
    expect(
      h2({
        current: data({ modalId: 'c', zIndex: 1, level: 'normal', type: 'foo' }),
        store: {
          getAll: () => [data({ modalId: 'h', zIndex: 30, level: 'normal', type: 'foo' })],
        },
      } as any),
    ).toEqual({})
  })

  test('types 含非字符串非正则时 typeMatcher 默认视为匹配', () => {
    const handler = modalConflict.create({ types: [123 as any] })
    const r = handler({
      current: data({ modalId: 'c', zIndex: 1, level: 'normal', type: 'any' }),
      store: {
        getAll: () => [data({ modalId: 'h', zIndex: 40, level: 'normal', type: 'x' })],
      },
    } as any)
    expect(r).toEqual({})
  })

  test('filter 可排除候选弹层', () => {
    const handler = modalConflict.create({
      filter: () => false,
      conflictProps: { x: 1 },
    })
    const r = handler({
      current: data({ modalId: 'c', zIndex: 1, level: 'normal' }),
      store: {
        getAll: () => [data({ modalId: 'h', zIndex: 50, level: 'normal' })],
      },
    } as any)
    expect(r).toEqual({})
  })

  test('merge 合并多个 handler 的返回值', () => {
    const h = modalConflict.merge(
      modalConflict.create({ conflictProps: { a: 1 } }),
      modalConflict.create({ conflictProps: { b: 2 } }),
    )
    const r = h({
      current: data({ modalId: 'c', zIndex: 1, level: 'normal' }),
      store: {
        getAll: () => [data({ modalId: 'h', zIndex: 20, level: 'normal' })],
      },
    } as any)
    expect(r).toMatchObject({ a: 1, b: 2 })
    expect(Array.isArray((h as any).config)).toBe(true)
  })

  test('extend 在已有 handler 配置上浅合并', () => {
    const base = modalConflict.create({ types: ['k'] })
    const ext = modalConflict.extend(base, { types: ['z'] })
    expect((ext as any).config.types).toEqual(['z'])
  })

  test('handlers.mask 在冲突时带上 contentMask', () => {
    const r = modalConflict.handlers.mask({
      current: data({ modalId: 'c', zIndex: 1, level: 'normal' }),
      store: {
        getAll: () => [data({ modalId: 'h', zIndex: 15, level: 'normal' })],
      },
    } as any)
    expect(r).toEqual({ contentMask: true })
  })

  test('handlers.hidden 在冲突时隐藏 content', () => {
    const r = modalConflict.handlers.hidden({
      current: data({ modalId: 'c', zIndex: 1, level: 'normal' }),
      store: {
        getAll: () => [data({ modalId: 'h', zIndex: 15, level: 'normal' })],
      },
    } as any)
    expect(r).toEqual({ contentVisible: false })
  })

  test('handlers.offsetByPlacement：无匹配冲突时返回空对象', () => {
    const h = modalConflict.handlers.offsetByPlacement
    expect(
      h({
        current: data({
          modalId: 'c',
          zIndex: 99,
          level: 'normal',
          props: { placement: 'center' },
        }),
        store: { getAll: () => [] },
      } as any),
    ).toEqual({})
  })

  test('handlers.offsetByPlacement：center 且存在更高 zIndex 同 placement 时隐藏 content', () => {
    const h = modalConflict.handlers.offsetByPlacement
    const yes = h({
      current: data({
        modalId: 'c',
        zIndex: 1,
        level: 'normal',
        props: { placement: 'center' },
      }),
      store: {
        getAll: () => [
          data({
            modalId: 'h',
            zIndex: 10,
            level: 'normal',
            props: { placement: 'center' },
          }),
        ],
      },
    } as any)
    expect(yes).toEqual({ contentVisible: false })
  })

  test('handlers.offsetByPlacement：非 center 冲突时 delay 后用 contentRef 高度累加偏移', async () => {
    jest.useFakeTimers()
    const h = modalConflict.handlers.offsetByPlacement
    const div = document.createElement('div')
    Object.defineProperty(div, 'offsetHeight', { value: 12, configurable: true })

    const pTop = h({
      current: data({
        modalId: 'c',
        zIndex: 1,
        level: 'normal',
        props: { placement: 'top' },
      }),
      store: {
        getAll: () => [
          data({
            modalId: 'h',
            zIndex: 50,
            level: 'normal',
            props: { placement: 'top', contentVisible: true },
            contentRef: { current: div },
          }),
        ],
      },
    } as any)
    expect(pTop).toBeInstanceOf(Promise)
    jest.advanceTimersByTime(20)
    await Promise.resolve()
    const resolvedTop = await pTop
    expect(resolvedTop.style).toMatchObject({ transition: 'all 0.2s', top: 12 })

    const pBottom = h({
      current: data({
        modalId: 'c2',
        zIndex: 1,
        level: 'normal',
        props: { placement: 'bottom' },
      }),
      store: {
        getAll: () => [
          data({
            modalId: 'h2',
            zIndex: 50,
            level: 'normal',
            props: { placement: 'bottom', contentVisible: true },
            contentRef: { current: div },
          }),
        ],
      },
    } as any)
    jest.advanceTimersByTime(20)
    await Promise.resolve()
    const resolvedBottom = await pBottom
    expect(resolvedBottom.style).toMatchObject({ transition: 'all 0.2s', bottom: 12 })

    jest.useRealTimers()
  })
})
