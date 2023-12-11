import React from 'react'
// import createForm from 'formini'
import { first, pickBy, isExist } from '@fexd/tools'
import { Form, LineInput, LinePicker, Button, toast, DemoBlock } from '@fexd/mobile'

import './style.module.less'

const options = [
  {
    label: '是',
    value: 1,
  },
  {
    label: '否',
    value: 0,
  },
]

const { Field } = Form

// import React, { useState } from 'react'
function useTestHook() {
  console.log('hi this is test hook')
  const [apple, setApple] = React.useState('apple')
  return {
    apple: apple,
    setApple,
  }
}
export default () => {
  const form = Form.useForm()
  // @ts-ignore
  window.form = form

  return (
    <div className="demo">
      <DemoBlock title="基本用法">
        <Form form={form}>
          <Field
            name="input1"
            // defaultValue={'aaa'}
            rules={[
              (value) => (!value ? '请输入input1' : undefined),
              (value) => (/\d/.test(value) ? <>不能输入数字</> : undefined),
            ]}
          >
            {({ value, setValue, error, validate }) => (
              <LineInput
                // active
                label="Input - 1"
                placeholder="Please input"
                value={value}
                onChange={(value) => {
                  setValue(value)
                  validate()
                }}
                onBlur={validate}
                error={error}
              />
            )}
          </Field>
          <Field
            name="input1"
            // defaultValue={'aaa'}
            rules={[
              (value) => (!value ? '请输入input1' : undefined),
              (value) => (value !== 'aaa' ? <>只能aaa</> : undefined),
            ]}
            relative={(values) => {
              const show = values.picker1 === 1 ? true : false

              return { show }
            }}
          >
            {({ value, setValue, error, validate, relative }) =>
              relative?.show && (
                <LineInput
                  // active
                  label="Input - 1"
                  placeholder="Please input"
                  value={value}
                  onChange={(value) => {
                    setValue(value)
                    validate()
                  }}
                  onBlur={validate}
                  error={error}
                />
              )
            }
          </Field>
          <Field
            name="picker1"
            // defaultValue={1}
            rules={[(value) => (!isExist(value) ? '请选择是否显示 Input - 2' : undefined)]}
          >
            {({ value, setValue, error, validate }) => (
              <LinePicker
                // active
                label="是否显示 Input - 2"
                placeholder='Please select "是" or "否"'
                options={options}
                value={value}
                onChange={(value) => {
                  setValue(value)
                  validate()
                }}
                error={error}
              />
            )}
          </Field>
          <Field
            name="input2"
            // defaultValue="3333"
            rules={[(value) => (!value ? '请输入input2' : undefined)]}
            relative={(values) => {
              const show = values.picker1 === 1 ? true : false

              return { show }
            }}
          >
            {({ value, setValue, error, validate, relative: { show } }) =>
              show && (
                <LineInput
                  // active
                  label="Input - 2"
                  placeholder="Please input"
                  value={value}
                  onChange={(value) => {
                    setValue(value)
                    validate()
                  }}
                  error={error}
                />
              )
            }
          </Field>
          <Button
            type="primary"
            style={{ marginTop: 16 }}
            block
            onClick={async () => {
              const valid = await form.validate()
              const errors = form.getErrors()
              // console.log(errors)

              if (valid) {
                toast.success(`校验成功, values: ${JSON.stringify(form.getValues())}`)
                // console.log(form.getValues())
              } else {
                const firstError = first(first(pickBy(errors))) as any
                console.log(firstError)

                toast.fail(firstError?.error, {
                  placement: 'top',
                })
              }
            }}
          >
            校验
          </Button>
          <Button
            type="primary"
            fill="outline"
            style={{ marginTop: 12 }}
            block
            onClick={() => {
              form.reset()
            }}
          >
            重置
          </Button>
        </Form>
      </DemoBlock>

      {/* <DemoBlock title="进阶">
        <Form />
      </DemoBlock> */}
    </div>
  )
}
