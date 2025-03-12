import React, { useState, useEffect } from 'react'
import { random } from '@fexd/tools'
import { Form, BlockInput, Button, DemoBlock, Hook } from '@fexd/mobile'

export default () => (
  <>
    <DemoBlock title="严格模式（默认）">
      <Form strict>
        <Form.Field name="input1">
          {({ value, setValue }) => (
            <BlockInput label="input1" placeholder="请输入" value={value} onChange={setValue} />
          )}
        </Form.Field>
        <Form.Field name="input2">
          {({ value, setValue }) => (
            <BlockInput label="input2" placeholder="请输入" value={value} onChange={setValue} />
          )}
        </Form.Field>

        <Hook>
          {() => {
            const form = Form.useContextForm()

            return (
              <div className="flex gap-2">
                <Button
                  block
                  type="danger"
                  fill="outline"
                  onClick={() => {
                    form?.setValue(`_randomKey`, random(0, 9999))
                  }}
                >
                  随机赋值未声明 Field 的属性（不成功）
                </Button>
              </div>
            )
          }}
        </Hook>

        <Hook>
          {() => {
            const form = Form.useContextForm()
            const [values, setValues] = useState(form.getValues)

            useEffect(() => {
              const stop = form?.watchValues((values) => {
                console.log(values)
                setValues(values)
              })

              return stop
            }, [])

            console.log('render', values)

            return (
              <>
                <div>values:</div>
                <div>{JSON.stringify(values)}</div>
              </>
            )
          }}
        </Hook>
      </Form>
    </DemoBlock>

    <DemoBlock title="非严格模式，可以随意设置 _randomKey">
      <Form strict={false}>
        <Form.Field name="input1">
          {({ value, setValue }) => (
            <BlockInput label="input1" placeholder="请输入" value={value} onChange={setValue} />
          )}
        </Form.Field>
        <Form.Field name="input2">
          {({ value, setValue }) => {
            console.log('input2', value)

            return <BlockInput label="input2" placeholder="请输入" value={value} onChange={setValue} />
          }}
        </Form.Field>

        <Hook>
          {() => {
            const form = Form.useContextForm()

            return (
              <div className="flex gap-2">
                <Button
                  block
                  type="success"
                  fill="outline"
                  onClick={() => {
                    form?.setValue(`_randomKey`, random(0, 9999))
                  }}
                >
                  随机赋值未声明 Field 的属性（成功）
                </Button>
              </div>
            )
          }}
        </Hook>

        <Hook>
          {() => {
            const form = Form.useContextForm()
            const [values, setValues] = useState(form.getValues)

            useEffect(() => {
              const stop = form?.watchValues((values) => {
                console.log(values)
                setValues(values)
              })

              return stop
            }, [])

            console.log('render', values)

            return (
              <>
                <div>values: </div>
                <div>{JSON.stringify(values)}</div>
              </>
            )
          }}
        </Hook>
      </Form>
    </DemoBlock>
  </>
)
