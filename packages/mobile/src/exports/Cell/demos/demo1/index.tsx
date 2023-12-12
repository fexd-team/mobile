import React from 'react'
import { run, delay } from '@fexd/tools'
import { Cell, toast, Avatar, DemoBlock } from '@fexd/mobile'
import { ImageOutline } from '@fexd/icons'

export default () => {
  return (
    <>
      <DemoBlock title="基础用法" plain>
        <Cell.Group>
          <Cell>内容</Cell>
          <Cell title="标题" value="内容" />
          <Cell title="标题" value="内容" description="描述" />
          <Cell
            title="标题"
            value="很长的内容很长的内容很长的内容很长的内容很长的内容很长的内容"
            description="很长的描述很长的描述很长的描述很长的描述很长的描述"
          />
        </Cell.Group>
      </DemoBlock>

      <DemoBlock title="点击事件" plain>
        <Cell.Group>
          <Cell title="标题" value="内容" onClick={() => toast.info('点击了单元格')} />
          <Cell
            value="点击事件异步自动 loading"
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
          />
        </Cell.Group>
      </DemoBlock>

      <DemoBlock title="前缀" plain>
        <Cell.Group>
          <Cell title="功能一" prefix={<ImageOutline />} onClick={() => {}} />
          <Cell title="功能二" prefix={<ImageOutline />} onClick={() => {}} />
          <Cell title="余额" value="0.5元" prefix={<ImageOutline />} onClick={() => {}} />
          <Cell title="标题" prefix={<Avatar>A</Avatar>} />
          <Cell title="随便一个标题" description="随便两句描述" prefix={<Avatar>A</Avatar>} />
          <Cell title="随便一个标题" description="随便两句描述" prefix={<Avatar>B</Avatar>} />
          <Cell
            title="随便一个标题"
            description="很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述很长的描述"
            prefix={<Avatar>C</Avatar>}
          />
        </Cell.Group>
      </DemoBlock>

      <DemoBlock title="后缀" plain>
        <Cell.Group>
          <Cell title="标题" value="内容" suffix={<ImageOutline />} />
          <Cell title="标题" value="内容" suffix={<span style={{ color: 'green' }}>自定义内容</span>} />
          <Cell title="标题" value="内容" loading />
        </Cell.Group>
      </DemoBlock>

      <DemoBlock title="尺寸" plain>
        <Cell.Group>
          <Cell title="标题" value="small" size="small" />
          <Cell title="标题" value="default" />
          <Cell title="标题" value="large" size="large" />
        </Cell.Group>
      </DemoBlock>

      <DemoBlock title="卡片" plain>
        <Cell.Group inset>
          <Cell title="标题" value="内容" />
          <Cell title="标题" value="内容" description="描述" />
        </Cell.Group>
      </DemoBlock>

      <DemoBlock title="禁用边框" plain>
        <Cell.Group border={false}>
          <Cell title="标题" value="内容" />
          <Cell title="标题" value="内容" />
          <Cell title="标题" value="内容" />
        </Cell.Group>
      </DemoBlock>

      <DemoBlock title="不使用分组" plain>
        <div>
          <Cell title="标题" value="内容" />
          <Cell title="标题" value="内容" />
        </div>
      </DemoBlock>

      <DemoBlock title="分组" plain>
        <div>
          <Cell.Group title="分组1">
            <Cell title="标题" value="内容" />
          </Cell.Group>
          <Cell.Group title="分组2">
            <Cell title="标题" value="内容" />
          </Cell.Group>
        </div>
      </DemoBlock>

      <DemoBlock title="各个部分说明" plain>
        <Cell prefix="prefix" title="title" description="description" value="value" suffix="suffix" />
      </DemoBlock>
    </>
  )
}
