import React from 'react'
import { Form, BlockInput, BlockPicker, DemoBlock, Hook } from '@fexd/mobile'

export default () => (
  <>
    <DemoBlock title="关联 Field">
      <Form>
        <Form.Field
          name="input"
          relative={(values) => {
            const show = values.picker === 1 ? true : false

            return { show }
          }}
        >
          {({ value, setValue, relative: { show } }) =>
            show && <BlockInput label="输入框" placeholder="请输入" value={value} onChange={setValue} />
          }
        </Form.Field>
        <Form.Field name="picker">
          {({ value, setValue }) => (
            <BlockPicker
              label="是否显示输入框"
              placeholder="请选择"
              options={[
                { label: '是', value: 1 },
                { label: '否', value: 0 },
              ]}
              value={value}
              onChange={setValue}
            />
          )}
        </Form.Field>
      </Form>
    </DemoBlock>

    <DemoBlock title="关联 rules">
      <Form>
        <Form.Field
          name="input1"
          relative={(values) => [values?.input2]}
          rules={[
            (value, values) => (value?.length > 0 && value === values?.input2 ? '不能和 input2 相等' : undefined),
          ]}
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
          relative={(values) => [values?.input1]}
          rules={[
            (value, values) => (value?.length > 0 && value === values?.input1 ? '不能和 input1 相等' : undefined),
          ]}
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
      </Form>
    </DemoBlock>

    <DemoBlock title="关联 hook">
      <Form>
        <Form.Field name="input">
          {({ value, setValue }) => (
            <BlockInput label="输入框" placeholder="请输入" value={value} onChange={setValue} />
          )}
        </Form.Field>
        <Hook>
          {() => {
            const input = Form.useValue('input')
            const relative = Form.useRelative((values) => {
              return `当前输入: ${values.input}`
            })

            return (
              <>
                <div>input: {input} </div>
                <div>relative: {relative}</div>
              </>
            )
          }}
        </Hook>
      </Form>
    </DemoBlock>
  </>
)
