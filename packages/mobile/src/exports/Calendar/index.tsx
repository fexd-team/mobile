import React from 'react'
import createFC from '../createFC'
import { CalendarProps, CalendarRef } from './type'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-calendar'
const Calendar = createFC<CalendarProps, CalendarRef>(function Calendar(props, ref) {
  /* 组件逻辑实现 */
  return (
    <div {...props} ref={ref}>
      Calendar
    </div>
  )
})

Calendar.defaultProps = {}

export default Calendar
