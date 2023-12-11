import React from 'react'
import { Timeline, Iconfont as Icon, DemoBlock } from '@fexd/mobile'
import { source } from '@fexd/tools'

import './style.module.less'

source.css('https://at.alicdn.com/t/font_622014_wkh62u19ggs.css')

export default () => {
  // 时间线的数据
  const data = [
    {
      title: 'Place the order and successful payment',
      content: '',
      time: 'Today',
      dot: <Icon type="amicon-round_like_fill" style={{ color: 'pink' }} />,
    },
    {
      title: 'Place the order and successful payment',
      content: '',
      time: '2021-01-01',
      dot: <Icon type="amicon-time" />,
    },
    {
      title: 'Calculate Interest, you can apply withdrawal with flexibility',
      content: () => (
        <>
          {'The funding amount '}
          <span style={{ color: '#FF7D0F' }}>Rp 1.000.000</span>, expected daily earnings{' '}
          <span style={{ color: '#FF7D0F' }}>Rp10.000</span>
        </>
      ),
      time: '2018-04-13',
    },
  ]

  return (
    <div className="demo">
      <DemoBlock title="配置式：通过 data 属性来定义多个信息">
        <Timeline data={data} />
      </DemoBlock>

      <DemoBlock title="组件式：时间流信息">
        <Timeline>
          <Timeline.Item title="Place the order and successful payment" time="Today" />
          <Timeline.Item title="Place the order and successful payment" time="2021-01-01" />
          <Timeline.Item title="Calculate Interest, you can apply withdrawal with flexibility" time="2018-04-13">
            <>
              {'The funding amount '}
              <span style={{ color: '#FF7D0F' }}>Rp 1.000.000</span>, expected daily earnings{' '}
              <span style={{ color: '#FF7D0F' }}>Rp10.000</span>
            </>
          </Timeline.Item>
        </Timeline>
      </DemoBlock>

      <DemoBlock title="组件式：自定义节点">
        <Timeline>
          <Timeline.Item
            title="1"
            time="Today"
            dot={<Icon type="amicon-round_like_fill" style={{ color: 'pink' }} />}
          />
          <Timeline.Item title="2" time="2021-01-01" dot={<Icon type="amicon-time" />} />
          <Timeline.Item title="3" time="2018-04-13" />
        </Timeline>
      </DemoBlock>
    </div>
  )
}
