import React from 'react'
import { classnames } from '@fexd/tools'
import { Star } from '@fexd/icons'

import useIOControl from '../useIOControl'
import createFC from '../../helpers/createFC'
import { RateProps } from './type'

export const prefix = 'exd-rate'
const Rate = createFC<RateProps, HTMLDivElement>(function Rate(
  { count, readOnly, allowClear, character, className, allowHalf, ...props },
  forwardedRef,
) {
  /* 组件逻辑实现 */
  const { value: currentValue, setValue } = useIOControl(props)
  const characterList = Array(count).fill(null)

  const renderCharacter = (value: number, half: boolean) => {
    return (
      <div
        className={classnames(`${prefix}-character`, {
          [`${prefix}-character-active`]: currentValue >= value,
          [`${prefix}-character-half`]: half,
          [`${prefix}-character-readonly`]: readOnly,
        })}
        onClick={() => {
          if (readOnly) return
          if (allowClear && currentValue === value) {
            setValue(0)
          } else {
            setValue(value)
          }
        }}
      >
        {character}
      </div>
    )
  }

  return (
    <div {...props} className={classnames(`${prefix}`, className)} ref={forwardedRef} onChange={undefined}>
      {characterList.map((_, i) => (
        <div key={i} className={classnames(`${prefix}-box`)}>
          {allowHalf && renderCharacter(i + 0.5, true)}
          {renderCharacter(i + 1, false)}
        </div>
      ))}
    </div>
  )
})

Rate.defaultProps = {
  defaultValue: 0,
  count: 5,
  character: <Star />,
}

export default Rate
