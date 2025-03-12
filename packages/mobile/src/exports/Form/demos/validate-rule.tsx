import React from 'react'
import { Form, BlockInput, Button, DemoBlock, Hook } from '@fexd/mobile'

export default () => (
  <>
    <DemoBlock title="校验特定 rules">
      <Form validateOnChange={false}>
        <Form.Field
          name="input1"
          rules={{
            required: (value) => (!value ? '不能为空' : undefined),
            equal: (value, values) =>
              value?.length > 0 && value === values?.input2 ? '不能和 input2 相等' : undefined,
          }}
        >
          {({ value, setValue, error }) => (
            <BlockInput
              label="input1"
              placeholder="请输入，不能和 input2 相等"
              value={value}
              onChange={setValue}
              error={error}
            />
          )}
        </Form.Field>
        <Form.Field
          name="input2"
          rules={{
            required: (value) => (!value ? '不能为空' : undefined),
            equal: (value, values) =>
              value?.length > 0 && value === values?.input1 ? '不能和 input1 相等' : undefined,
          }}
        >
          {({ value, setValue, error }) => (
            <BlockInput
              label="input2"
              placeholder="请输入，不能和 input1 相等"
              value={value}
              onChange={setValue}
              error={error}
            />
          )}
        </Form.Field>

        <Hook>
          {() => {
            const form = Form.useContextForm()

            // form.useWatchValue

            // form.useWatchValue('input1', (value) => {
            //   console.log('input1', value)
            // })

            return (
              <div className="flex gap-2">
                <Button
                  block
                  onClick={() => {
                    form?.validate(undefined, ['required'])
                  }}
                >
                  非空校验
                </Button>

                <Button
                  block
                  onClick={() => {
                    form?.validate(undefined, ['equal'])
                  }}
                >
                  相等校验
                </Button>
              </div>
            )
          }}
        </Hook>
      </Form>
    </DemoBlock>
  </>
)
