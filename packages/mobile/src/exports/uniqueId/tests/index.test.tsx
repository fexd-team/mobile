import uniqueId from '..'

describe('uniqueId', () => {
  test('返回非空字符串', () => {
    expect(typeof uniqueId()).toBe('string')
    expect(uniqueId().length).toBeGreaterThan(0)
  })

  test('结果包含传入的前缀', () => {
    const prefix = 'myForm'
    expect(uniqueId(prefix).startsWith(`${prefix}_`)).toBe(true)
  })

  test('连续生成大量 id 无碰撞', () => {
    const set = new Set<string>()
    const n = 2000
    for (let i = 0; i < n; i += 1) {
      set.add(uniqueId('p'))
    }
    expect(set.size).toBe(n)
  })
})
