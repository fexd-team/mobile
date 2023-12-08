import React, { useEffect } from 'react'
import { get, classnames } from '@fexd/tools'

import createFC from '../createFC'
import { BasicTextAreaProps } from './type'
import useTextFieldProps, { defaultProps } from '../useTextFieldProps'

const LINE_BREAK = `
`

const LINE_BREAK_REG = new RegExp(`${LINE_BREAK}`, 'g')

const prefix = 'exd-textarea'
const BasicTextArea = createFC<BasicTextAreaProps, any>(function BasicTextArea({ height, className, ...props }, ref) {
  const { onChange, focused, ...textFieldProps } = useTextFieldProps({ ref, ...props })
  const autoHeight = height === 'auto'

  return (
    <div className={`${prefix}-wrapper`}>
      <div className={`${prefix}-jack`} style={autoHeight ? {} : { height }}>
        {textFieldProps.value.split('\n').map((item, idx) => (
          <div key={idx}>.</div>
        ))}
      </div>
      <textarea
        className={classnames(prefix, className)}
        {...(textFieldProps as any)}
        style={{
          ...(autoHeight
            ? {
                overflow: 'hidden',
              }
            : {}),
          ...(textFieldProps.style || {}),
        }}
        onChange={(e) => {
          onChange(get<string>(e, 'target.value', ''))
        }}
      />
    </div>
  )
})

BasicTextArea.defaultProps = {
  ...defaultProps,
  height: 66,
} as BasicTextAreaProps

export default BasicTextArea
