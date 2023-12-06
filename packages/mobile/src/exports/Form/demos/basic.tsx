import React from 'react'
import {
  Form,
  LineIOLabel,
  LineInput,
  LinePicker,
  LineDatePicker,
  LineTimePicker,
  Button,
  Checkbox,
  Switch,
  Stepper,
  Slider,
  toast,
} from '@fexd/mobile'

function Demo() {
  const form = Form.useForm()

  return (
    <Form form={form}>
      <Form.Field name="input" rules={[(value) => (!value ? '请输入内容' : undefined)]}>
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

      <Form.Field name="textarea">
        {(field) => (
          <LineInput
            multipleLines
            label="文本域"
            placeholder="回车自动换行"
            value={field.value}
            onChange={field.setValue}
            onBlur={field.validate}
            error={field.error}
          />
        )}
      </Form.Field>

      <Form.Field name="picker">
        {(field) => (
          <LinePicker
            label="选择器"
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

      <Form.Field name="checkbox">
        {(field) => (
          <LineIOLabel contentProps={{ style: { height: 36 } }} active label="多选框" error={field.error}>
            <Checkbox.Group
              options={[
                { label: '选项1', value: '1' },
                { label: '选项2', value: '2' },
                { label: '选项3', value: '3' },
              ]}
              value={field.value}
              onChange={field.setValue}
            />
          </LineIOLabel>
        )}
      </Form.Field>

      <div style={{ display: 'flex', width: '100%', gap: 8 }}>
        <Form.Field name="switch">
          {(field) => (
            <LineIOLabel
              wrapperProps={{ style: { flex: 1 } }}
              contentProps={{ style: { height: 36 } }}
              active
              label="开关"
              error={field.error}
            >
              <Switch checked={field.value} onChange={field.setValue} />
            </LineIOLabel>
          )}
        </Form.Field>
        <Form.Field name="stepper" defaultValue={0}>
          {(field) => (
            <LineIOLabel
              wrapperProps={{ style: { flex: 1 } }}
              contentProps={{ style: { height: 36 } }}
              active
              label="步进器"
              error={field.error}
            >
              <Stepper value={field.value} onChange={field.setValue} />
            </LineIOLabel>
          )}
        </Form.Field>
      </div>

      <Form.Field name="slider">
        {(field) => (
          <LineIOLabel active label="滑块" error={field.error}>
            <div style={{ padding: '0 7px', width: '100%' }}>
              <Slider value={field.value} onChange={field.setValue} />
            </div>
          </LineIOLabel>
        )}
      </Form.Field>

      <Form.Field name="datePicker">
        {(field) => (
          <LineDatePicker
            label="日期选择器"
            placeholder="YYYY-MM-DD"
            value={field.value}
            onChange={field.setValue}
            error={field.error}
          />
        )}
      </Form.Field>

      <Form.Field name="timePicker">
        {(field) => (
          <LineTimePicker
            label="时间选择器"
            placeholder="HH:mm:ss"
            value={field.value}
            onChange={field.setValue}
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
          toast.success(`校验成功, values: ${JSON.stringify(values, null, 2)}`)
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
