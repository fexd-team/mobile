import React, { useRef } from 'react'
import { Flex, DemoBlock } from '@fexd/mobile'

import './style.module.less'

export default () => {
  const Demo = useRef<any>()
  const style: any = { background: '#3d62d2', padding: '8px 0', color: '#ffffff', textAlign: 'center' }
  const DemoBox = (props: any) => <p style={{ ...style, height: props.value + 'px' }}>{props.children}</p>
  return (
    <div className="demo">
      <DemoBlock title="基础布局">
        <Flex>
          <Flex.Item style={style} span={3}>
            item-3
          </Flex.Item>
          <Flex.Item style={style} span={3}>
            item-3
          </Flex.Item>
          <Flex.Item style={style} span={3}>
            item-3
          </Flex.Item>
          <Flex.Item style={style} span={3}>
            item-3
          </Flex.Item>
        </Flex>
      </DemoBlock>

      <DemoBlock title="左右偏移：使用offset进行左右偏移">
        <Flex>
          <Flex.Item style={style} span={3}>
            item-3
          </Flex.Item>
          <Flex.Item style={style} span={3} offset={6}>
            item-offset-6
          </Flex.Item>
        </Flex>
        <Flex>
          <Flex.Item style={style} span={3} offset={3}>
            item-offset-3
          </Flex.Item>
          <Flex.Item style={style} span={3} offset={3}>
            item-offset-3
          </Flex.Item>
        </Flex>
      </DemoBlock>

      <DemoBlock title="排序：使用push或者order进行排序">
        <Flex>
          <Flex.Item style={style} span={9} push={3}>
            item-push-3
          </Flex.Item>
          <Flex.Item style={style} span={3} pull={9}>
            item-push-9
          </Flex.Item>
        </Flex>
        <Flex>
          <Flex.Item style={style} span={3} order={4}>
            item-order-4
          </Flex.Item>
          <Flex.Item style={style} span={3} order={3}>
            item-order-3
          </Flex.Item>
          <Flex.Item style={style} span={3} order={2}>
            item-order-2
          </Flex.Item>
          <Flex.Item style={style} span={3} order={1}>
            item-order-1
          </Flex.Item>
        </Flex>
      </DemoBlock>

      <DemoBlock title="排版">
        <Flex justify="start">
          <Flex.Item style={style} span={2}>
            item-2
          </Flex.Item>
          <Flex.Item style={style} span={2}>
            item-2
          </Flex.Item>
          <Flex.Item style={style} span={2}>
            item-2
          </Flex.Item>
          <Flex.Item style={style} span={2}>
            item-2
          </Flex.Item>
        </Flex>
        <Flex justify="center">
          <Flex.Item style={style} span={2}>
            item-2
          </Flex.Item>
          <Flex.Item style={style} span={2}>
            item-2
          </Flex.Item>
          <Flex.Item style={style} span={2}>
            item-2
          </Flex.Item>
          <Flex.Item style={style} span={2}>
            item-2
          </Flex.Item>
        </Flex>
        <Flex justify="end">
          <Flex.Item style={style} span={2}>
            item-2
          </Flex.Item>
          <Flex.Item style={style} span={2}>
            item-2
          </Flex.Item>
          <Flex.Item style={style} span={2}>
            item-2
          </Flex.Item>
          <Flex.Item style={style} span={2}>
            item-2
          </Flex.Item>
        </Flex>
        <Flex justify="space-between">
          <Flex.Item style={style} span={2}>
            item-2
          </Flex.Item>
          <Flex.Item style={style} span={2}>
            item-2
          </Flex.Item>
          <Flex.Item style={style} span={2}>
            item-2
          </Flex.Item>
          <Flex.Item style={style} span={2}>
            item-2
          </Flex.Item>
        </Flex>
        <Flex justify="space-around">
          <Flex.Item style={style} span={2}>
            item-2
          </Flex.Item>
          <Flex.Item style={style} span={2}>
            item-2
          </Flex.Item>
          <Flex.Item style={style} span={2}>
            item-2
          </Flex.Item>
          <Flex.Item style={style} span={2}>
            item-2
          </Flex.Item>
        </Flex>
      </DemoBlock>

      <DemoBlock title="对齐">
        <Flex justify="center" align="top">
          <Flex.Item span={2}>
            <DemoBox value={50}>item-2</DemoBox>
          </Flex.Item>
          <Flex.Item span={2}>
            <DemoBox value={30}>item-2</DemoBox>
          </Flex.Item>
          <Flex.Item span={2}>
            <DemoBox value={80}>item-2</DemoBox>
          </Flex.Item>
          <Flex.Item span={2}>
            <DemoBox value={40}>item-2</DemoBox>
          </Flex.Item>
        </Flex>
        <Flex justify="center" align="middle">
          <Flex.Item span={2}>
            <DemoBox value={50}>item-2</DemoBox>
          </Flex.Item>
          <Flex.Item span={2}>
            <DemoBox value={30}>item-2</DemoBox>
          </Flex.Item>
          <Flex.Item span={2}>
            <DemoBox value={80}>item-2</DemoBox>
          </Flex.Item>
          <Flex.Item span={2}>
            <DemoBox value={40}>item-2</DemoBox>
          </Flex.Item>
        </Flex>
        <Flex justify="center" align="bottom">
          <Flex.Item span={2}>
            <DemoBox value={50}>item-2</DemoBox>
          </Flex.Item>
          <Flex.Item span={2}>
            <DemoBox value={30}>item-2</DemoBox>
          </Flex.Item>
          <Flex.Item span={2}>
            <DemoBox value={80}>item-2</DemoBox>
          </Flex.Item>
          <Flex.Item span={2}>
            <DemoBox value={40}>item-2</DemoBox>
          </Flex.Item>
        </Flex>
      </DemoBlock>

      <DemoBlock title="响应式布局" ref={Demo}>
        <Flex>
          <Flex.Item style={style} xs={2} sm={3} md={4} lg={5}>
            item
          </Flex.Item>
          <Flex.Item
            style={style}
            xs={{ span: 5, offset: 2 }}
            sm={{ span: 4, pull: 2 }}
            md={{ span: 3, push: 2 }}
            lg={{ span: 2, order: 1 }}
          >
            item
          </Flex.Item>
        </Flex>

        <Flex targetRef={Demo}>
          <Flex.Item style={style} xs={2} sm={3} md={4} lg={5}>
            item
          </Flex.Item>
          <Flex.Item
            style={style}
            xs={{ span: 5, offset: 2 }}
            sm={{ span: 4, pull: 2 }}
            md={{ span: 3, push: 2 }}
            lg={{ span: 2, order: 1 }}
          >
            item
          </Flex.Item>
        </Flex>

        <Flex smValue={500} mdValue={800} lgValue={1000}>
          <Flex.Item style={style} xs={2} sm={3} md={4} lg={5}>
            item
          </Flex.Item>
          <Flex.Item
            style={style}
            xs={{ span: 5, offset: 2 }}
            sm={{ span: 4, pull: 2 }}
            md={{ span: 3, push: 2 }}
            lg={{ span: 2, order: 1 }}
          >
            item
          </Flex.Item>
        </Flex>
      </DemoBlock>
    </div>
  )
}
