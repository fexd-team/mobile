import React from 'react'
import DemoBlock from '@documents/components/DemoBlock'
import { useUpdateEffect } from 'ahooks'
import { source, run, isAndroid, isDesktop } from '@fexd/tools'
import { View, ScrollView, Slider, toast, Space, notify } from '@fexd/mobile'

import './style.module.less'

if (isAndroid() && !isDesktop()) {
  source.js('//cdn.jsdelivr.net/npm/eruda', 'eruda').then((eruda) => {
    run(eruda, 'init')
  })
}

export default () => {
  const toastRef = React.useRef<any>()
  const [value, setVallue] = React.useState<[number, number]>([20, 60])
  const log = React.useCallback((value: any) => {
    if (toastRef.current) {
      toastRef.current!.update({
        content: JSON.stringify(value),
      })
      toastRef.current!.reclock()
      return
    }
    toastRef.current = toast.info(JSON.stringify(value), {
      placement: 'bottom',
      onExited() {
        toastRef.current = null
      },
    })
  }, [])

  useUpdateEffect(() => {
    log(value)
  }, [value])

  return (
    <>
      <DemoBlock title="基础（支持多指滑动）">
        <Slider
          value={value[0]}
          onChange={(valueFrom) => {
            setVallue([valueFrom, value[1]].sort((prev, next) => prev - next) as [number, number])
          }}
          onChangeCommitted={(value) => {
            notify.info(JSON.stringify(value))
          }}
        />
        <Slider
          ref={(dom) => {}}
          value={value}
          onChange={(value) => {
            setVallue(value)
          }}
          onChangeCommitted={(value) => {
            notify.info(JSON.stringify(value))
          }}
        />
        <Slider
          track="inverted"
          value={value[1]}
          onChange={(valueTo) => {
            setVallue([value[0], valueTo].sort((prev, next) => prev - next) as [number, number])
          }}
          onChangeCommitted={(value) => {
            notify.info(JSON.stringify(value))
          }}
        />
      </DemoBlock>

      <DemoBlock title="纵向" inline>
        <Slider
          value={value[0]}
          step={20}
          vertical
          onChange={(valueFrom) => {
            setVallue([valueFrom, value[1]].sort((prev, next) => prev - next) as [number, number])
          }}
          onChangeCommitted={(value) => {
            notify.info(JSON.stringify(value))
          }}
        />
        <Slider
          value={value}
          step={20}
          vertical
          onChange={(value) => {
            setVallue(value)
          }}
          onChangeCommitted={(value) => {
            notify.info(JSON.stringify(value))
          }}
        />
        <Slider
          track="inverted"
          value={value[1]}
          step={20}
          vertical
          onChange={(valueTo) => {
            setVallue([value[0], valueTo].sort((prev, next) => prev - next) as [number, number])
          }}
          onChangeCommitted={(value) => {
            notify.info(JSON.stringify(value))
          }}
        />
      </DemoBlock>

      <DemoBlock title="限定范围">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          -100
          <div style={{ flex: 1 }}>
            <Slider
              defaultValue={[-75, 25]}
              min={-100}
              onChange={(value) => {
                log(value)
              }}
              onChangeCommitted={(value) => {
                notify.info(JSON.stringify(value))
              }}
            />
          </div>
          100
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          100
          <div style={{ flex: 1 }}>
            <Slider
              defaultValue={[0, 600]}
              min={100}
              max={1000}
              onChange={(value) => {
                log(value)
              }}
              onChangeCommitted={(value) => {
                notify.info(JSON.stringify(value))
              }}
            />
          </div>
          1000
        </div>
      </DemoBlock>

      <DemoBlock title="步长（25）">
        <Slider
          step={25}
          defaultValue={25}
          onChange={(value) => {
            log(value)
          }}
          onChangeCommitted={(value) => {
            notify.info(JSON.stringify(value))
          }}
        />
      </DemoBlock>

      <DemoBlock title="禁用">
        <Slider
          disabled
          defaultValue={25}
          onChange={(value) => {
            log(value)
          }}
          onChangeCommitted={(value) => {
            notify.info(JSON.stringify(value))
          }}
        />
      </DemoBlock>

      <DemoBlock title="无滑块">
        <Slider
          thumb={false}
          defaultValue={25}
          onChange={(value) => {
            log(value)
          }}
          onChangeCommitted={(value) => {
            notify.info(JSON.stringify(value))
          }}
        />
      </DemoBlock>

      <DemoBlock title="无轨道">
        <Slider
          track={false}
          defaultValue={25}
          onChange={(value) => {
            log(value)
          }}
          onChangeCommitted={(value) => {
            notify.info(JSON.stringify(value))
          }}
        />
      </DemoBlock>
    </>
  )
}
