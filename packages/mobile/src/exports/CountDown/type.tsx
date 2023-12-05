import React from 'react'
import AUTO_API from '../../helpers/AUTO_API'

export interface CountDownProps {
  deadline: number
  localOffset?: number
  ref?: React.Ref<any>
}

export default AUTO_API<CountDownProps>()
