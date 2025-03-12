import React from 'react'
import { Form, BlockInput, Button, DemoBlock, Hook } from '@fexd/mobile'

export default () => (
  <>
    <DemoBlock title="通过 watchValue 实现关联校验">
      <div className="text-sm text-gray-400">当 input2 变化时，触发 input1 自身的 equal 校验</div>
      <div className="text-sm text-gray-400">当 input1 变化时，触发 input2 自身的 equal 校验</div>
    </DemoBlock>
    <DemoBlock>
      <Form>
        <Form.Field
          name="input1"
          rules={{
            required: (value) => (!value ? '不能为空' : undefined),
            equal: (value, values) =>
              value?.length > 0 && value === values?.input2 ? '不能和 input2 相等' : undefined,
          }}
          watchValue={{
            // 当 input2 变化时，触发 input1 自身的 equal 校验
            input2: (input2, fieldController) => fieldController?.validate(['equal']),
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
          watchValue={{
            // 当 input1 变化时，触发 input2 自身的 equal 校验
            input1: (input1, fieldController) => fieldController?.validate(['equal']),
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
      </Form>
    </DemoBlock>
  </>
)
