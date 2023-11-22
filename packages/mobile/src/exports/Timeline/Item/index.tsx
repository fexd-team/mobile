import React from 'react'
import { run, classnames } from '@fexd/tools'

import { TimelineItemProps } from './type'
import createFC from '../../../helpers/createFC'

const TimelineItem = createFC<TimelineItemProps, HTMLDivElement>(function (
  { title, time, dot, children, className, ...props },
  ref,
) {
  return (
    <div className={classnames('exd-timeline-item', className)} {...props} ref={ref}>
      {/* 线/轴 */}
      <div className="exd-timeline-line">
        {/* 结点 */}
        <div className="exd-timeline-dot">{run(dot)}</div>
      </div>
      <div className="exd-timeline-content">
        {/* 标题 */}
        <div className="exd-timeline-content-title">{title}</div>
        {/* 内容 */}
        {children && <div className="exd-timeline-content-main">{run(children)}</div>}
        {/* 时间戳 */}
        <div className="exd-timeline-content-time">{time}</div>
      </div>
    </div>
  )
})

TimelineItem.defaultProps = {
  title: '',
  time: '',
  dot: <div className="exd-timeline-dot-default" />,
}

export default TimelineItem
