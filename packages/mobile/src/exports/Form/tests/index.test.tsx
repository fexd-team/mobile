import React, { useState } from 'react'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Hook from '../../Hook'
import Form, { prefix } from '..'

const { Field } = Form

describe('Form', () => {
  afterEach(() => {
    cleanup()
    delete (window as any).__vals
  })

  test('导出 prefix 常量', () => {
    expect(prefix).toBe('exd-form')
  })

  test('冒烟：Form 与 Field 组合渲染不崩溃', async () => {
    const user = userEvent.setup()
    const form = Form.createForm()
    render(
      <Form form={form}>
        <Field name="n1" defaultValue="">
          {({ value, setValue }) => (
            <input data-testid="n1" aria-label="n1" value={value ?? ''} onChange={(e) => setValue(e.target.value)} />
          )}
        </Field>
      </Form>,
    )
    expect(screen.getByTestId('n1')).toHaveValue('')
    await user.type(screen.getByLabelText('n1'), 'hi')
    expect(form.getValue('n1')).toBe('hi')
  })

  test('不传 form 时内部创建表单实例并可写入', async () => {
    const user = userEvent.setup()
    render(
      <Form>
        <Field name="inner" defaultValue="0">
          {({ value, setValue }) => (
            <input
              data-testid="inner"
              aria-label="inner"
              value={value ?? ''}
              onChange={(e) => setValue(e.target.value)}
            />
          )}
        </Field>
      </Form>,
    )
    await user.clear(screen.getByTestId('inner'))
    await user.type(screen.getByTestId('inner'), '99')
    expect(screen.getByTestId('inner')).toHaveValue('99')
  })

  test('validateOnChange 为默认 true 时改值会自动触发校验并展示错误', async () => {
    const user = userEvent.setup()
    const form = Form.createForm()
    render(
      <Form form={form}>
        <Field name="x" defaultValue="" rules={[(v: string) => (!v ? '必填' : undefined)]}>
          {({ value, setValue, error }) => (
            <>
              <input
                data-testid="auto-val"
                aria-label="auto-val"
                value={value ?? ''}
                onChange={(e) => setValue(e.target.value)}
              />
              <span data-testid="auto-err">{error ? String(error) : ''}</span>
            </>
          )}
        </Field>
      </Form>,
    )
    await user.type(screen.getByTestId('auto-val'), 'a')
    await user.clear(screen.getByTestId('auto-val'))
    await waitFor(() => {
      expect(screen.getByTestId('auto-err')).toHaveTextContent('必填')
    })
  })

  test('validateOnChange={false} 时改值不会自动写入校验错误（需手动 validate）', async () => {
    const user = userEvent.setup()
    const form = Form.createForm()
    render(
      <Form form={form} validateOnChange={false}>
        <Field name="x" defaultValue="" rules={[(v: string) => (!v ? '必填' : undefined)]}>
          {({ value, setValue, error, validate }) => (
            <>
              <input
                data-testid="inp"
                aria-label="inp"
                value={value ?? ''}
                onChange={(e) => setValue(e.target.value)}
              />
              <span data-testid="err">{error ? String(error) : ''}</span>
              <button type="button" onClick={() => validate()}>
                校验
              </button>
            </>
          )}
        </Field>
      </Form>,
    )
    await user.clear(screen.getByTestId('inp'))
    expect(screen.getByTestId('err')).toHaveTextContent('')
    await user.click(screen.getByRole('button', { name: '校验' }))
    await waitFor(() => {
      expect(screen.getByTestId('err')).toHaveTextContent('必填')
    })
  })

  test('切换 validateOnChange 后上下文行为随之更新', async () => {
    const user = userEvent.setup()
    const form = Form.createForm()

    function Wrapper() {
      const [voc, setVoc] = useState(true)
      return (
        <>
          <button type="button" data-testid="toggle-voc" onClick={() => setVoc((v) => !v)}>
            toggle
          </button>
          <Form form={form} validateOnChange={voc}>
            <Field name="t" defaultValue="" rules={[(v: string) => (!v ? '必填' : undefined)]}>
              {({ value, setValue, error }) => (
                <>
                  <input
                    data-testid="toggle-inp"
                    aria-label="toggle-inp"
                    value={value ?? ''}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <span data-testid="toggle-err">{error ? String(error) : ''}</span>
                </>
              )}
            </Field>
          </Form>
        </>
      )
    }

    render(<Wrapper />)
    await user.type(screen.getByTestId('toggle-inp'), 'x')
    await user.clear(screen.getByTestId('toggle-inp'))
    await waitFor(() => expect(screen.getByTestId('toggle-err')).toHaveTextContent('必填'))

    await user.type(screen.getByTestId('toggle-inp'), 'ok')
    await waitFor(() => expect(screen.getByTestId('toggle-err')).toHaveTextContent(''))

    await user.click(screen.getByTestId('toggle-voc'))
    await user.clear(screen.getByTestId('toggle-inp'))
    await waitFor(() => {
      expect(screen.getByTestId('toggle-err')).toHaveTextContent('')
    })
  })

  test('Field 上 validateOnChange={false} 可覆盖表单级 validateOnChange', async () => {
    const user = userEvent.setup()
    const form = Form.createForm()
    render(
      <Form form={form} validateOnChange>
        <Field name="f" defaultValue="" validateOnChange={false} rules={[(v: string) => (!v ? 'err' : undefined)]}>
          {({ value, setValue, error, validate }) => (
            <>
              <input data-testid="fo" aria-label="fo" value={value ?? ''} onChange={(e) => setValue(e.target.value)} />
              <span data-testid="foe">{error ? String(error) : ''}</span>
              <button type="button" onClick={() => validate()}>
                点校验
              </button>
            </>
          )}
        </Field>
      </Form>,
    )
    await user.clear(screen.getByTestId('fo'))
    expect(screen.getByTestId('foe')).toHaveTextContent('')
    await user.click(screen.getByRole('button', { name: '点校验' }))
    await waitFor(() => expect(screen.getByTestId('foe')).toHaveTextContent('err'))
  })

  test('strict={true} 时 getValues 仅包含已注册字段', async () => {
    const user = userEvent.setup()
    const form = Form.createForm({ defaultValues: { orphan: 1 }, strict: true })
    function Inner() {
      const ctx = Form.useContextForm()
      return (
        <>
          <Field name="only">{({ value }) => <span data-testid="only">{value ?? ''}</span>}</Field>
          <button
            type="button"
            data-testid="dump"
            onClick={() => {
              ;(window as any).__vals = ctx.getValues()
            }}
          >
            dump
          </button>
        </>
      )
    }
    render(
      <Form form={form} strict>
        <Inner />
      </Form>,
    )
    await user.click(screen.getByTestId('dump'))
    expect((window as any).__vals).toEqual({ only: undefined })
  })

  test('strict={false} 时 getValues 可保留 defaultValues 中的未注册键', async () => {
    const user = userEvent.setup()
    const form = Form.createForm({ defaultValues: { orphan: 1 }, strict: false })
    function Inner() {
      const ctx = Form.useContextForm()
      return (
        <>
          <Field name="only">{({ value }) => <span data-testid="only2">{value ?? ''}</span>}</Field>
          <button
            type="button"
            data-testid="dump2"
            onClick={() => {
              ;(window as any).__vals = ctx.getValues()
            }}
          >
            dump
          </button>
        </>
      )
    }
    render(
      <Form form={form} strict={false}>
        <Inner />
      </Form>,
    )
    await user.click(screen.getByTestId('dump2'))
    expect((window as any).__vals).toMatchObject({ orphan: 1, only: undefined })
  })

  test('Form.useContextForm 返回的实例可读写表单值', async () => {
    const user = userEvent.setup()
    const form = Form.createForm()
    function Toolbar() {
      const f = Form.useContextForm()
      return (
        <button type="button" data-testid="ctx-set" onClick={() => f.setValue('a', 'ctx')}>
          设值
        </button>
      )
    }
    render(
      <Form form={form}>
        <Toolbar />
        <Field name="a" defaultValue="init">
          {({ value }) => <span data-testid="ctx-v">{value ?? ''}</span>}
        </Field>
      </Form>,
    )
    expect(screen.getByTestId('ctx-v')).toHaveTextContent('init')
    await user.click(screen.getByTestId('ctx-set'))
    await waitFor(() => expect(screen.getByTestId('ctx-v')).toHaveTextContent('ctx'))
    expect(form.getValue('a')).toBe('ctx')
  })

  test('外部 form.setValue 会同步到 Field 展示（由 form 驱动）', async () => {
    const user = userEvent.setup()
    const form = Form.createForm()
    render(
      <Form form={form}>
        <Field name="a" defaultValue="init">
          {({ value }) => <span data-testid="ext-v">{value ?? ''}</span>}
        </Field>
        <button type="button" data-testid="ext-btn" onClick={() => form.setValue('a', 'outside')}>
          外部设值
        </button>
      </Form>,
    )
    await user.click(screen.getByTestId('ext-btn'))
    await waitFor(() => expect(screen.getByTestId('ext-v')).toHaveTextContent('outside'))
  })

  test('Field 内 setValue 后 getValues 立即同步', async () => {
    const user = userEvent.setup()
    const form = Form.createForm()
    render(
      <Form form={form}>
        <Field name="a" defaultValue="init">
          {({ value, setValue }) => (
            <input
              data-testid="inp-a"
              aria-label="inp-a"
              value={value ?? ''}
              onChange={(e) => setValue(e.target.value)}
            />
          )}
        </Field>
      </Form>,
    )
    await user.clear(screen.getByTestId('inp-a'))
    await user.type(screen.getByTestId('inp-a'), 'next')
    expect(form.getValues()).toEqual({ a: 'next' })
  })

  test('多字段同时存在且 getValues 包含全部', async () => {
    const user = userEvent.setup()
    const form = Form.createForm()
    render(
      <Form form={form}>
        <Field name="a" defaultValue="1">
          {({ value, setValue }) => (
            <input data-testid="ma" aria-label="ma" value={value ?? ''} onChange={(e) => setValue(e.target.value)} />
          )}
        </Field>
        <Field name="b" defaultValue="2">
          {({ value, setValue }) => (
            <input data-testid="mb" aria-label="mb" value={value ?? ''} onChange={(e) => setValue(e.target.value)} />
          )}
        </Field>
      </Form>,
    )
    await user.type(screen.getByTestId('ma'), 'x')
    await user.type(screen.getByTestId('mb'), 'y')
    expect(form.getValues()).toEqual({ a: '1x', b: '2y' })
  })

  test('点号字段名作为独立键参与注册与取值', async () => {
    const user = userEvent.setup()
    const form = Form.createForm()
    render(
      <Form form={form}>
        <Field name="user.name" defaultValue="n">
          {({ value, setValue }) => (
            <input
              data-testid="dot1"
              aria-label="dot1"
              value={value ?? ''}
              onChange={(e) => setValue(e.target.value)}
            />
          )}
        </Field>
        <Field name="user.age" defaultValue="18">
          {({ value, setValue }) => (
            <input
              data-testid="dot2"
              aria-label="dot2"
              value={value ?? ''}
              onChange={(e) => setValue(e.target.value)}
            />
          )}
        </Field>
      </Form>,
    )
    await user.type(screen.getByTestId('dot1'), '1')
    expect(form.getValues()).toEqual({
      'user.name': 'n1',
      'user.age': '18',
    })
  })

  test('条件卸载 Field 后界面不再展示该字段（注册由 Field 生命周期管理）', async () => {
    const user = userEvent.setup()
    function Toggle() {
      const [show, setShow] = useState(true)
      return (
        <>
          <button type="button" data-testid="hide-field" onClick={() => setShow(false)}>
            隐藏
          </button>
          <Form>
            {show && (
              <Field name="temp" defaultValue="a">
                {({ value }) => <span data-testid="temp">{value ?? ''}</span>}
              </Field>
            )}
          </Form>
        </>
      )
    }
    render(<Toggle />)
    expect(screen.getByTestId('temp')).toHaveTextContent('a')
    await user.click(screen.getByTestId('hide-field'))
    await waitFor(() => expect(screen.queryByTestId('temp')).not.toBeInTheDocument())
  })

  test('Field 子节点从有内容变为无内容时会触发注销逻辑', async () => {
    const user = userEvent.setup()
    const form = Form.createForm()
    function Inner() {
      const [show, setShow] = useState(true)
      return (
        <>
          <button type="button" data-testid="hide-render" onClick={() => setShow(false)}>
            无子
          </button>
          <Form form={form}>
            <Field name="ghost" defaultValue="1">
              {() => (show ? <span data-testid="ghost">x</span> : null)}
            </Field>
          </Form>
        </>
      )
    }
    render(<Inner />)
    expect(form.hasField('ghost')).toBe(true)
    await user.click(screen.getByTestId('hide-render'))
    await waitFor(() => expect(screen.queryByTestId('ghost')).not.toBeInTheDocument())
  })

  test('reset 将字段恢复为默认值', async () => {
    const user = userEvent.setup()
    const form = Form.createForm()
    render(
      <Form form={form}>
        <Field name="a" defaultValue="init">
          {({ value, setValue }) => (
            <>
              <input
                data-testid="rst-inp"
                aria-label="rst-inp"
                value={value ?? ''}
                onChange={(e) => setValue(e.target.value)}
              />
              <button type="button" data-testid="rst" onClick={() => form.reset()}>
                重置
              </button>
            </>
          )}
        </Field>
      </Form>,
    )
    await user.clear(screen.getByTestId('rst-inp'))
    await user.type(screen.getByTestId('rst-inp'), 'changed')
    expect(form.getValue('a')).toBe('changed')
    await user.click(screen.getByTestId('rst'))
    expect(form.getValue('a')).toBe('init')
    await waitFor(() => {
      expect((screen.getByTestId('rst-inp') as HTMLInputElement).value).toBe('init')
    })
  })

  test('同步校验规则失败时 Field 展示错误', async () => {
    const user = userEvent.setup()
    const form = Form.createForm()
    render(
      <Form form={form} validateOnChange={false}>
        <Field name="a" defaultValue="" rules={[(v: string) => (!v ? 'bad' : undefined)]}>
          {({ value, setValue, error, validate }) => (
            <>
              <input
                data-testid="sync-inp"
                aria-label="sync-inp"
                value={value ?? ''}
                onChange={(e) => setValue(e.target.value)}
              />
              <span data-testid="sync-err">{error ? 'has-error' : 'ok'}</span>
              <button type="button" onClick={() => validate()}>
                校验同步
              </button>
            </>
          )}
        </Field>
      </Form>,
    )
    await user.click(screen.getByRole('button', { name: '校验同步' }))
    await waitFor(() => {
      expect(screen.getByTestId('sync-err')).toHaveTextContent('has-error')
    })
  })

  test('异步校验规则失败时 Field 展示错误', async () => {
    const user = userEvent.setup()
    const form = Form.createForm()
    render(
      <Form form={form} validateOnChange={false}>
        <Field
          name="async"
          defaultValue=""
          rules={[
            (v: string) =>
              new Promise<string | undefined>((resolve) => {
                setTimeout(() => resolve(v ? undefined : '异步必填'), 5)
              }),
          ]}
        >
          {({ value, setValue, error, validate }) => (
            <>
              <input
                data-testid="asy-inp"
                aria-label="asy-inp"
                value={value ?? ''}
                onChange={(e) => setValue(e.target.value)}
              />
              <span data-testid="asy-err">{error ? String(error) : ''}</span>
              <button type="button" onClick={() => validate()}>
                校验异步
              </button>
            </>
          )}
        </Field>
      </Form>,
    )
    await user.click(screen.getByRole('button', { name: '校验异步' }))
    await waitFor(() => {
      expect(screen.getByTestId('asy-err')).toHaveTextContent('异步必填')
    })
  })

  test('watchValue 在其他字段变化时触发本字段指定规则校验', async () => {
    const user = userEvent.setup()
    render(
      <Form>
        <Field
          name="input1"
          defaultValue=""
          rules={{
            eq: (value: string, values: Record<string, string>) =>
              value && value === values?.input2 ? '不能相同' : undefined,
          }}
          watchValue={{
            input2: (_v, { validate }) => validate(['eq']),
          }}
        >
          {({ value, setValue, error }) => (
            <>
              <input data-testid="w1" aria-label="w1" value={value ?? ''} onChange={(e) => setValue(e.target.value)} />
              <span data-testid="w1e">{error ? String(error) : ''}</span>
            </>
          )}
        </Field>
        <Field name="input2" defaultValue="">
          {({ value, setValue }) => (
            <input data-testid="w2" aria-label="w2" value={value ?? ''} onChange={(e) => setValue(e.target.value)} />
          )}
        </Field>
      </Form>,
    )
    await user.type(screen.getByTestId('w1'), 'x')
    await user.type(screen.getByTestId('w2'), 'x')
    await waitFor(() => {
      expect(screen.getByTestId('w1e')).toHaveTextContent('不能相同')
    })
  })

  test('Form.useRelative 随字段值变化更新计算结果', async () => {
    const user = userEvent.setup()
    render(
      <Form>
        <Field name="a" defaultValue="1">
          {({ value, setValue }) => (
            <input
              data-testid="rel-a"
              aria-label="rel-a"
              value={value ?? ''}
              onChange={(e) => setValue(e.target.value)}
            />
          )}
        </Field>
        <Field name="b" defaultValue="2">
          {({ value, setValue }) => (
            <input
              data-testid="rel-b"
              aria-label="rel-b"
              value={value ?? ''}
              onChange={(e) => setValue(e.target.value)}
            />
          )}
        </Field>
        <Hook>
          {() => {
            const joined = Form.useRelative((values: Record<string, string>) => `${values.a ?? ''}+${values.b ?? ''}`)
            return <span data-testid="rel-tip">{joined}</span>
          }}
        </Hook>
      </Form>,
    )
    await waitFor(() => expect(screen.getByTestId('rel-tip')).toHaveTextContent('1+2'))
    await user.clear(screen.getByTestId('rel-b'))
    await user.type(screen.getByTestId('rel-b'), '9')
    await waitFor(() => expect(screen.getByTestId('rel-tip')).toHaveTextContent('1+9'))
  })

  test('无 name 的 Field 渲染不抛错', () => {
    const form = Form.createForm()
    expect(() =>
      render(
        <Form form={form}>
          <Field>{() => <span data-testid="noname">ok</span>}</Field>
        </Form>,
      ),
    ).not.toThrow()
    expect(screen.getByTestId('noname')).toHaveTextContent('ok')
  })
})
