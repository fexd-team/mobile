import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useSetState, usePrevious } from 'ahooks'
import DemoBlock from '@documents/components/DemoBlock'
import { copy, run, pick, isFunction, memoize } from '@fexd/tools'
import {
  Grid,
  ScrollView,
  View,
  Checkbox,
  Empty,
  FullpageSpinner,
  notify,
  TransitionSwitch,
  Tabs,
  Input,
  TextArea,
  MaterialInput,
  toast,
} from '@fexd/mobile'
import * as MobileIonicIcons from '@fexd/icons'
import * as MobileAntdIcons from '@fexd/icons-antd'
// import * as MobileBootstrapIcons from '@fexd/icons-bootstrap'
// import * as MobileMonoIcons from '@fexd/icons-mono'
// import * as MobileBytesizeIcons from '@fexd/icons-bytesize'

import './style.module.less'

const getIcons = memoize(({ ...Icons }) => {
  delete Icons.Icon
  delete Icons.default
  return Object.entries(Icons).filter(([, IconComponent]) => !!IconComponent)
})

function IconLib({ icons = [], defaultFilter = () => true, filters = {}, suffix, singleCheck = false }: any) {
  const scrollViewRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [page, setPage] = useState(1)
  const [types, setTypes] = useSetState<any>(pick(filters, []))
  const filteredIcons = useMemo(
    () =>
      icons
        .filter(([name]: any) =>
          Object.values(types).filter(isFunction)?.length > 0
            ? Object.values(types)
                .filter(isFunction)
                .every((filter) => run(filter, undefined, name))
            : defaultFilter(name),
        )
        .slice(0, page * 32),
    [types, page],
  )

  useEffect(() => {
    setTimeout(() => {
      setReady(true)
    }, 500)
  }, [])

  useEffect(() => {
    if (!scrollViewRef.current) {
      return
    }
    setPage(1)
    scrollViewRef.current!.scrollTop = 0
  }, [types])

  // return null

  return (
    <View>
      <View auto={false}>
        <DemoBlock title={`@fexd/icons${suffix ? `-${suffix}` : ''}（点击复制）`}>
          {Object.entries(filters)?.length > 0 && (
            <div>
              {Object.entries(filters).map(([label, filter]) => (
                <Checkbox
                  key={label}
                  checked={isFunction(types[label])}
                  onChange={(checked) => {
                    setTypes({
                      ...(singleCheck
                        ? Object.fromEntries(Object.entries(filters).map(([name, filter]) => [name, null]))
                        : {}),
                      [label]: checked ? filter : null,
                    })
                  }}
                >
                  {label}
                </Checkbox>
              ))}
            </div>
          )}
        </DemoBlock>
      </View>
      <View className="icons">
        {ready ? (
          <ScrollView
            ref={scrollViewRef}
            shadow={[true, false]}
            onEndReached={(done) => {
              setPage((page) => page + 1)
              done()
            }}
          >
            {filteredIcons?.length > 0 ? (
              <Grid square>
                {filteredIcons.map(([name, IconComponent]: any) => (
                  <Grid.Item
                    key={name}
                    className="demo-icon-content"
                    onClick={() => {
                      copy(name)
                      notify.success(`已复制 "${name}"`)
                    }}
                  >
                    {/* @ts-ignore */}
                    <IconComponent />
                    <div className="demo-icon-tag">{name}</div>
                  </Grid.Item>
                ))}
              </Grid>
            ) : (
              <Empty />
            )}
          </ScrollView>
        ) : (
          <FullpageSpinner />
        )}
      </View>
    </View>
  )
}

const tabs = [
  {
    label: 'Ionic',
    render: () => {
      const filters = {
        描边: (name: string) => name.endsWith('Outline'),
        锐利: (name: string) => name.endsWith('Sharp'),
        // 安卓: (name: string) => name.startsWith('Android'),
        iOS: (name: string) => name.startsWith('Ios'),
        // MD: (name: string) => name.startsWith('Md'),
        Logo: (name: string) => name.startsWith('Logo'),
      }

      return (
        <IconLib
          defaultFilter={(name: any) => !Object.values(filters).some((filter) => run(filter, undefined, name))}
          filters={filters}
          icons={getIcons(MobileIonicIcons)}
        />
      )
    },
  },
  {
    label: 'Antd',
    render: () => (
      <IconLib
        singleCheck
        suffix="antd"
        filters={{
          填充: (name: string) => name.endsWith('Filled'),
          描边: (name: string) => name.endsWith('Outlined'),
          双色: (name: string) => name.endsWith('Twotone'),
        }}
        icons={getIcons(MobileAntdIcons)}
      />
    ),
  },
  // {
  //   label: 'Bootstrap',
  //   render: () => {
  //     const filters = {
  //       填充: (name: string) => name.endsWith('Fill'),
  //     }

  //     return (
  //       <IconLib
  //         suffix="bootstrap"
  //         defaultFilter={(name: any) => !Object.values(filters).some(filter => run(filter, undefined, name))}
  //         filters={filters}
  //         icons={getIcons(MobileBootstrapIcons)}
  //       />
  //     )
  //   },
  // },
  // {
  //   label: 'Mono',
  //   render: () => (
  //     <IconLib
  //       // singleCheck
  //       suffix="mono"
  //       // filters={{
  //       //   填充: (name: string) => name.endsWith('Filled'),
  //       //   描边: (name: string) => name.endsWith('Outlined'),
  //       //   双色: (name: string) => name.endsWith('Twotone'),
  //       // }}
  //       icons={getIcons(MobileMonoIcons)}
  //     />
  //   ),
  // },
  // {
  //   label: 'Bytesize',
  //   render: () => (
  //     <IconLib
  //       // singleCheck
  //       suffix="bytesize"
  //       // filters={{
  //       //   填充: (name: string) => name.endsWith('Filled'),
  //       //   描边: (name: string) => name.endsWith('Outlined'),
  //       //   双色: (name: string) => name.endsWith('Twotone'),
  //       // }}
  //       icons={getIcons(MobileBytesizeIcons)}
  //     />
  //   ),
  // },
].map((tab, idx) => ({
  ...tab,
  value: idx,
}))

export default () => {
  const [tabIdx, setTabIdx] = useState(0)
  const prevTabIdx = usePrevious(tabIdx)
  const currentTab = tabs[tabIdx]

  return (
    <View className="demo">
      <Tabs data={tabs} value={tabIdx} onChange={(tabIdx) => setTabIdx(Number(tabIdx))} />
      <View>
        <TransitionSwitch animateKey={tabIdx} direction={prevTabIdx! > tabIdx ? 'back' : 'forward'}>
          {run(currentTab, 'render')}
        </TransitionSwitch>
      </View>
    </View>
  )
}
