import React from 'react'
import { delay, run } from '@fexd/tools'
import { Add } from '@fexd/icons'
import { Button, Iconfont, toast, DemoBlock } from '@fexd/mobile'
import './style.module.less'

const Demo = () => (
  <>
    <DemoBlock inline title="按钮类型">
      <Button>朴素按钮</Button>
      <Button type="primary">主要按钮</Button>
      <Button type="success">成功按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="danger">危险按钮</Button>
      <Button type="info">信息按钮</Button>
    </DemoBlock>

    <DemoBlock inline title="填充类型">
      <Button fill="solid" type="primary">
        实心（默认）
      </Button>
      <Button fill="outline" type="primary">
        描边
      </Button>
      <Button fill="none" type="primary">
        无填充
      </Button>
    </DemoBlock>

    <DemoBlock inline title="禁用状态">
      <Button disabled>默认按钮</Button>
      <Button disabled type="primary">
        实心按钮
      </Button>
      <Button disabled fill="outline" type="primary">
        描边按钮
      </Button>
    </DemoBlock>

    <DemoBlock inline title="按钮形状">
      <Button type="primary">默认</Button>
      <Button type="success" shape="unset">
        unset
      </Button>
      <Button type="warning" shape="round">
        圆角
      </Button>
    </DemoBlock>

    <DemoBlock inline title="图标按钮">
      <Button type="primary" icon={<Iconfont type="add" />} />
      <Button type="success" icon={<Iconfont type="add" />}>
        按钮
      </Button>
      <Button type="warning" icon={<Iconfont type="add" />} iconPosition="right">
        右置图标
      </Button>
    </DemoBlock>

    <DemoBlock inline title="加载中状态">
      <Button loading type="primary" icon={<Iconfont type="add" />} />
      <Button
        loading="auto"
        type="primary"
        icon={<Iconfont type="add" />}
        onClick={async () => {
          let count = 3
          const { update, promise, close } = toast.info(`等我消失再说 ${count}s`, {
            duration: 99999,
          })

          run(async () => {
            while (count > 0) {
              update({
                content: `等我消失再说 ${count}s`,
              })
              count--
              await delay(1000)
            }

            close()
          })

          await promise
        }}
      >
        自动
      </Button>
      <Button loading type="success" icon={<Iconfont type="add" />}>
        按钮
      </Button>
      <Button loading type="warning" icon={<Iconfont type="add" />} iconPosition="right">
        右置图标
      </Button>
    </DemoBlock>

    <DemoBlock inline title="按钮尺寸">
      <Button type="success" size="large">
        大按钮
      </Button>
      <Button type="primary" size="normal">
        普通
      </Button>
      <Button type="warning" size="small">
        小按钮
      </Button>
      <Button type="danger" size="mini">
        迷你
      </Button>
    </DemoBlock>

    <DemoBlock title="块级元素">
      <Button fill="outline" type="success" block size="large">
        大按钮
      </Button>
      <Button fill="outline" type="primary" block size="normal">
        普通
      </Button>
      <Button fill="outline" type="warning" block size="small">
        小按钮
      </Button>
      <Button fill="outline" type="danger" block size="mini">
        迷你
      </Button>
    </DemoBlock>

    <DemoBlock inline title="元素类型">
      <Button as="a" type="primary">
        {'<a>'} 标签
      </Button>
      <Button as="div" type="warning">
        {'<div>'} 标签
      </Button>
      <Button type="success">默认 {'<button>'} 标签</Button>
    </DemoBlock>
  </>
)

export default () => (
  <div className="btn-demo">
    <Demo />
  </div>
)
