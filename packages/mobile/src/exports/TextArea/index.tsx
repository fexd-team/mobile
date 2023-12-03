import React, { useEffect } from 'react'
import { get, classnames } from '@fexd/tools'

import createFC from '../../helpers/createFC'
import { TextAreaProps } from './type'
import useTextFieldProps, { TextFieldProps, defaultProps } from '../useTextFieldProps'

const LINE_BREAK = `
`

const LINE_BREAK_REG = new RegExp(`${LINE_BREAK}`, 'g')

const prefix = 'exd-textarea'
const TextArea = createFC<TextAreaProps, any>(function TextArea({ height, className, ...props }, ref) {
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

TextArea.defaultProps = {
  ...defaultProps,
  height: 66,
} as TextAreaProps

export default TextArea
