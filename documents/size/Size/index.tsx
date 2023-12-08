/**
 * inline: true
 */
import React from 'react'
import { groupBy, source } from '@fexd/tools'
import { Space } from 'antd'

source.css('https://bundlephobia.com/_next/static/css/92720c07f6756c10.css')

const requirePublicSize = (fileName) => {
  let reports: any = {
    esm: [],
    cjs: [],
    total: [],
  }

  try {
    reports = require(`@root/public/${fileName}`)
  } catch (err) {
    // development 下可能不存在 size.json 文件
  }

  return reports
}

function getBGClass(ratio) {
  if (ratio < 0.05) {
    return 'low-1'
  } else if (ratio < 0.15) {
    return 'low-2'
  } else if (ratio < 0.25) {
    return 'med-1'
  } else if (ratio < 0.4) {
    return 'med-2'
  } else if (ratio < 0.5) {
    return 'med-3'
  } else if (ratio < 0.7) {
    return 'high-1'
  } else {
    return 'high-2'
  }
}

const formatSize = (value) => {
  let unit, size
  if (Math.log10(value) < 3) {
    unit = 'B'
    size = value
  } else if (Math.log10(value) < 6) {
    unit = 'kB'
    size = value / 1024
  } else {
    unit = 'MB'
    size = value / 1024 / 1024
  }

  return { unit, size }
}

function Size({ fileName }: { fileName: string }) {
  const [reports] = React.useState(() => requirePublicSize(fileName))
  const totalSize = Number(reports.total?.[0]?.rawGzip)
  const options = reports.esm.map((item: any) => ({
    // ...item,
    name: item.exportName,
    // rawGzip: item.rawGzip,
    gzip: Number(item.rawGzip),
  }))

  const groups = groupBy((item) => item?.name?.[0]?.toLowerCase?.(), options)

  return (
    <ul className="export-analysis-section__list" style={{ border: 'solid 1px #f0f0f0', padding: 20 }}>
      {Object.entries(groups)
        .sort((prev, next) => (prev?.[0] > next?.[0] ? 1 : -1))
        .map(([groupName, list]) => (
          <div key={groupName} className="export-analysis-section__letter-group">
            <div className="export-analysis-section__dont-break">
              <h3 className="export-analysis-section__letter-heading">{groupName}</h3>
            </div>

            {list.map((item: any) => (
              <li key={item?.name} className="export-analysis-section__pill export-analysis-section__dont-break">
                <div
                  className={`export-analysis-section__pill-fill ${`export-analysis-section__pill-fill--${getBGClass(
                    item?.gzip / totalSize,
                  )}`}`}
                  style={{ transform: `scaleX(${Math.min((item?.gzip || 0) / totalSize, 1)})` }}
                />
                <div className="export-analysis-section__pill-name"> {item?.name} </div>
                <div className="export-analysis-section__pill-size">
                  {formatSize(item?.gzip).size.toFixed(1)}
                  <span className="export-analysis-section__pill-size-unit">{formatSize(item?.gzip).unit}</span>
                </div>
              </li>
            ))}
          </div>
        ))}
    </ul>
  )
}

export default () => (
  <Space direction="vertical" size={60}>
    <div>
      <h1>@fexd/mobile</h1>
      <Size fileName="size.json" />
    </div>
    <div>
      <h1>antd-mobile</h1>
      <Size fileName="antd-size.json" />
    </div>
    <div>
      <h1>@arco-design/mobile-react</h1>
      <Size fileName="arco-size.json" />
    </div>
    <div>
      <h1>zarm</h1>
      <Size fileName="zarm-size.json" />
    </div>
  </Space>
)
