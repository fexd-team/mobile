import React from 'react'
import { Form, LineInput, LinePicker, Button, toast, DOC_FormProps } from '@fexd/mobile'

function Demo() {
  const form = Form.useForm()

  return (
    <Form form={form}>
      <Form.Field name="input1" rules={[(value) => (!value ? '请输入内容' : undefined)]}>
        {(field) => (
          <LineInput
            label={
              <>
                输入框<span style={{ marginLeft: 4, color: 'red' }}>*</span>
              </>
            }
            placeholder="请输入内容"
            value={field.value}
            onChange={(value) => {
              field.setValue(value)
              field.validate()
            }}
            onBlur={field.validate}
            error={field.error}
          />
        )}
      </Form.Field>
      <Form.Field name="picker1" rules={[(value) => (!value ? '请选择内容' : undefined)]}>
        {(field) => (
          <LinePicker
            label={
              <>
                选择器<span style={{ marginLeft: 4, color: 'red' }}>*</span>
              </>
            }
            placeholder="请选择内容"
            value={field.value}
            onChange={(value) => {
              field.setValue(value)
              field.validate()
            }}
            options={[
              { label: '选项1', value: '1' },
              { label: '选项2', value: '2' },
              { label: '选项3', value: '3' },
            ]}
            error={field.error}
          />
        )}
      </Form.Field>
      <Button
        style={{ marginTop: 8 }}
        type="primary"
        block
        onClick={async () => {
          const valid = await form.validate()

          if (!valid) {
            const errors = form.getErrors()
            console.error(errors)
            toast.fail('校验失败')

            return
          }

          const values = form.getValues()
          console.log(values)
          toast.success(`校验成功, values: ${JSON.stringify(values)}`)
        }}
      >
        校验
      </Button>
    </Form>
  )
}

export default () => (
  <div style={{ padding: 16, background: '#fff' }}>
    <Demo />
  </div>
)
