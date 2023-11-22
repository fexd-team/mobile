import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { Grid, toast } from '@fexd/mobile'
import { ImageOutline } from '@fexd/icons'

import './style.module.less'

function ImgDemo() {
  return (
    <div className="demo-grid-item">
      <img src="https://img01.yzcdn.cn/vant/apple-2.jpg" />
      <span>自定义内容</span>
    </div>
  )
}

export default () => {
  return (
    <>
      <DemoBlock plain title="基础用法">
        <Grid>
          {[...Array(4).keys()].map((item) => (
            <Grid.Item key={item} icon={<ImageOutline />} text="示例文字" />
          ))}
        </Grid>
      </DemoBlock>

      <DemoBlock plain title="自定义列数">
        <Grid columns={3}>
          {[...Array(6).keys()].map((item) => (
            <Grid.Item key={item} icon={<ImageOutline />} text="示例文字" />
          ))}
        </Grid>
      </DemoBlock>

      <DemoBlock plain title="格子间距">
        <Grid columns={3} gutter={[10, 10]}>
          {[...Array(6).keys()].map((item) => (
            <Grid.Item key={item} icon={<ImageOutline />} text="示例文字" />
          ))}
        </Grid>
      </DemoBlock>

      <DemoBlock plain title="内容横排">
        <Grid columns={3} vertical={false}>
          {[...Array(3).keys()].map((item) => (
            <Grid.Item key={item} icon={<ImageOutline />} text="示例文字" />
          ))}
        </Grid>
      </DemoBlock>

      <DemoBlock plain title="自定义内容">
        <Grid>
          <Grid.Item>
            <ImgDemo />
          </Grid.Item>
          <Grid.Item>
            <ImgDemo />
          </Grid.Item>
          <Grid.Item>
            <ImgDemo />
          </Grid.Item>
          <Grid.Item>
            <ImgDemo />
          </Grid.Item>
        </Grid>
      </DemoBlock>

      <DemoBlock plain title="正方形格子">
        <Grid square>
          {[...Array(8).keys()].map((item) => (
            <Grid.Item key={item} icon={<ImageOutline />} text="示例文字" />
          ))}
        </Grid>
      </DemoBlock>

      <DemoBlock plain title="点击事件">
        <Grid columns={3}>
          {[...Array(3).keys()].map((item) => (
            <Grid.Item
              key={item}
              icon={<ImageOutline />}
              text="示例文字"
              onClick={() => toast.info(`点击了第${item + 1}个格子`)}
            />
          ))}
        </Grid>
      </DemoBlock>
    </>
  )
}
