import React, { memo } from 'react'
import { classnames, run } from '@fexd/tools'

import createFC from '../../helpers/createFC'
import { TimelineProps } from './type'
import TimelineItem from './Item'

type BasicTimelineType = React.FC<TimelineProps>
interface TimelineType extends BasicTimelineType {
  Item: typeof TimelineItem
}

const Timeline: TimelineType = createFC<TimelineProps, HTMLDivElement>(
  ({ data = [], children, className, ...props }, ref) => {
    return (
      <div className={classnames('exd-timeline', className)} {...props} ref={ref}>
        {data.length > 0
          ? data.map(({ content, ...props }, index) => (
              <TimelineItem key={index} {...props}>
                {content}
              </TimelineItem>
            ))
          : run(children)}
      </div>
    )
  },
) as TimelineType

Timeline.Item = TimelineItem
Timeline.defaultProps = {
  data: [],
}

export default Timeline
