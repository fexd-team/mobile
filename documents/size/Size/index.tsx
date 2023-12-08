/**
 * inline: true
 */
import React from 'react'
import { groupBy } from '@fexd/tools'

let reports: any = {
  esm: [],
  cjs: [],
}

try {
  reports = require('@root/public/size.json')
} catch (err) {
  // development 下可能不存在 size.json 文件
}

export default () => {
  const options = reports.esm.map((item: any) => ({
    // ...item,
    name: item.name.replace('@fexd/mobile/es/exports/', '').replace('/index.js', ''),
    rawGzip: item.rawGzip,
    gzip: item.gzip,
  }))

  const groups = groupBy((item) => item?.name?.[0]?.toLowerCase?.(), options)
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {Object.entries(groups)
        .sort((prev, next) => (prev?.[0] > next?.[0] ? 1 : -1))
        .map(([groupName, list]) => (
          <div key={groupName} style={{ width: 300 }}>
            <h3>{groupName}</h3>
            {list.map((item: any) => (
              <div key={item.name}>
                <span>{item.name}</span>
                {/* <span>{item.gzip}</span> */}
                <span>{item.rawGzip}</span>
              </div>
            ))}
          </div>
        ))}
    </div>
  )
}
