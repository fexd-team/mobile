import modalStore from '..'

describe('modalStore', () => {
  const makeModalInfo = (modalId: string, overrides: Record<string, unknown> = {}) => ({
    modalId,
    level: 'normal' as const,
    setVisible: jest.fn(),
    setCreated: jest.fn(),
    contentRef: { current: document.createElement('div') },
    ...overrides,
  })

  afterEach(() => {
    modalStore.map.clear()
  })

  test('addModal 写入 map 并触发 open 事件', () => {
    const onOpen = jest.fn()
    modalStore.eventBus.on('open', onOpen)
    const info = makeModalInfo('m1')
    modalStore.addModal('m1', info as any)
    expect(modalStore.getById('m1')).toMatchObject({
      level: 'normal',
      zIndex: expect.any(Number),
    })
    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onOpen.mock.calls[0][0]).toMatchObject({ level: 'normal' })
    modalStore.eventBus.off('open', onOpen)
  })

  test('同级多弹层时 zIndex 递增', () => {
    modalStore.addModal('a', makeModalInfo('a') as any)
    const first = modalStore.getById('a')!.zIndex
    modalStore.addModal('b', makeModalInfo('b') as any)
    const second = modalStore.getById('b')!.zIndex
    expect(second).toBeGreaterThan(first)
  })

  test('getAll 返回当前全部条目快照', () => {
    modalStore.addModal('x', makeModalInfo('x') as any)
    modalStore.addModal('y', makeModalInfo('y') as any)
    const all = modalStore.getAll()
    expect(all).toHaveLength(2)
    expect(all.map((d) => d.level)).toEqual(['normal', 'normal'])
  })

  test('removeModal 删除并触发 close；不存在时静默', () => {
    const onClose = jest.fn()
    modalStore.eventBus.on('close', onClose)
    modalStore.addModal('k', makeModalInfo('k') as any)
    modalStore.removeModal('missing')
    expect(onClose).not.toHaveBeenCalled()
    modalStore.removeModal('k')
    expect(modalStore.getById('k')).toBeUndefined()
    expect(onClose).toHaveBeenCalledTimes(1)
    modalStore.eventBus.off('close', onClose)
  })

  test('closeAll 对所有条目调用 setVisible(false)', () => {
    const v1 = jest.fn()
    const v2 = jest.fn()
    modalStore.addModal('1', makeModalInfo('1', { setVisible: v1 }) as any)
    modalStore.addModal('2', makeModalInfo('2', { setVisible: v2 }) as any)
    modalStore.closeAll()
    expect(v1).toHaveBeenCalledWith(false)
    expect(v2).toHaveBeenCalledWith(false)
  })

  test('destroyAll 对所有条目调用 setCreated(false)', () => {
    const c1 = jest.fn()
    modalStore.addModal('1', makeModalInfo('1', { setCreated: c1 }) as any)
    modalStore.destroyAll()
    expect(c1).toHaveBeenCalledWith(false)
  })
})
