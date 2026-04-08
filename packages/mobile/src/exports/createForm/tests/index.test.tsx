import createFormDefault from '..'
import * as FormBarrel from '..'

describe('createForm', () => {
  test('命名导出 createForm 与默认导出一致', () => {
    expect(FormBarrel.createForm).toBe(createFormDefault)
    expect(FormBarrel.default).toBe(createFormDefault)
  })

  test('返回对象包含表单 API 方法与 __isFormInstance 标记', () => {
    const form = createFormDefault({
      fields: [{ name: 'a', defaultValue: '1' }],
    })
    expect(form.__isFormInstance).toBe(true)
    expect(typeof form.getValue).toBe('function')
    expect(typeof form.getValues).toBe('function')
    expect(typeof form.setValue).toBe('function')
    expect(typeof form.setValues).toBe('function')
    expect(typeof form.watchValues).toBe('function')
    expect(typeof form.watchValue).toBe('function')
    expect(typeof form.getError).toBe('function')
    expect(typeof form.getErrors).toBe('function')
    expect(typeof form.setError).toBe('function')
    expect(typeof form.setErrors).toBe('function')
    expect(typeof form.watchErrors).toBe('function')
    expect(typeof form.watchError).toBe('function')
    expect(typeof form.getFields).toBe('function')
    expect(typeof form.getField).toBe('function')
    expect(typeof form.setFields).toBe('function')
    expect(typeof form.setField).toBe('function')
    expect(typeof form.removeField).toBe('function')
    expect(typeof form.addField).toBe('function')
    expect(typeof form.hasField).toBe('function')
    expect(typeof form.getRelative).toBe('function')
    expect(typeof form.getRelatives).toBe('function')
    expect(typeof form.setRelatives).toBe('function')
    expect(typeof form.removeRelative).toBe('function')
    expect(typeof form.addRelative).toBe('function')
    expect(typeof form.watchRelatives).toBe('function')
    expect(typeof form.watchRelative).toBe('function')
    expect(typeof form.watch).toBe('function')
    expect(typeof form.validate).toBe('function')
    expect(typeof form.reset).toBe('function')
    expect(typeof form.setStrict).toBe('function')
  })

  test('getValues / setValue / reset 行为符合预期', async () => {
    const form = createFormDefault({
      fields: [{ name: 'x', defaultValue: 'init' }],
    })
    expect(form.getValues()).toEqual({ x: 'init' })
    form.setValue('x', 'next')
    expect(form.getValue('x')).toBe('next')
    form.reset()
    expect(form.getValue('x')).toBe('init')
  })

  test('validate 对无 rules 字段返回 true', async () => {
    const form = createFormDefault({
      fields: [{ name: 'only', defaultValue: '' }],
    })
    await expect(form.validate()).resolves.toBe(true)
  })

  test('setValues / getField / hasField / removeField / addField', () => {
    const form = createFormDefault({
      fields: [{ name: 'a', defaultValue: '1' }],
    })
    form.setValues({ a: '2', b: '3' })
    expect(form.getValues().a).toBe('2')
    expect(form.getField('a')).toMatchObject({ name: 'a' })
    expect(form.hasField('a')).toBe(true)
    form.removeField('a')
    expect(form.hasField('a')).toBe(false)
    const undo = form.addField({ name: 'c', defaultValue: 'x' })
    expect(form.hasField('c')).toBe(true)
    undo()
    expect(form.hasField('c')).toBe(false)
  })

  test('错误与监听：setError、watchValues、watchErrors', async () => {
    const form = createFormDefault({
      fields: [
        { name: 'u', defaultValue: '' },
        { name: 'v', defaultValue: '' },
      ],
    })
    form.setError('u', 'bad')
    expect(form.getError('u')).toBe('bad')
    form.setErrors({ u: 'e1', v: 'e2' })
    expect(form.getErrors()).toMatchObject({ u: 'e1', v: 'e2' })

    let lastVals = form.getValues()
    const stop = form.watchValues(
      (v) => {
        lastVals = v
      },
      { debounce: false },
    )
    form.setValue('u', 'hello')
    expect(lastVals.u).toBe('hello')
    stop()

    let lastErr = form.getErrors()
    const stopE = form.watchErrors(
      (e) => {
        lastErr = e
      },
      { debounce: false },
    )
    form.setError('v', 'nv')
    expect(lastErr.v).toBe('nv')
    stopE()
  })
})
