/**
 * inline: true
 */
import React, { useMemo } from 'react'
import { groupBy, flatten, memoize } from '@fexd/tools'
import { useDebounce } from 'ahooks'

import './index.scss'

// source.css('https://bundlephobia.com/_next/static/css/92720c07f6756c10.css')

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

function Size({ libName, version }: { libName: keyof typeof sizeInfo; version?: string }) {
  const [reports] = React.useState(() => getSizeInfo(libName))
  const [search, setSearch] = React.useState('')
  const debouncedSearch = useDebounce(search, { wait: 300 })
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const bigestExports = useMemo(() => getBiggestExports(), [])
  console.log('bigestExports', bigestExports)
  const packages = useMemo(
    () =>
      reports.esm
        .filter(
          libName === '@fexd/mobile'
            ? (item) => Number(item?.rawGzip) < 660 || Number(item?.rawGzip) > 700
            : () => true,
        )
        .filter((item) => item.exportName?.toLowerCase?.()?.includes?.(debouncedSearch?.toLowerCase?.()))
        .map((item: any) => ({
          // ...item,
          name: item.exportName,
          // rawGzip: item.rawGzip,
          gzip: Number(item.rawGzip),
        })),
    [libName, reports, debouncedSearch],
  )
  const { groups, totalSize } = useMemo(() => {
    const totalSize = Number(reports.total?.[0]?.rawGzip)

    const groups = groupBy((item) => item?.name?.[0]?.toLowerCase?.(), packages)

    return {
      groups,
      totalSize,
    }
  }, [reports, packages])

  const shouldShowLabels = packages.length > 20

  return (
    <div>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>
        <span>
          {libName}
          <span style={{ color: '#9ca3af', marginLeft: 8, fontSize: 18 }}>{version ? `@${version}` : ''}</span>
        </span>
      </h1>
      <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          总包体积：{formatSize(totalSize).size.toFixed(1)}
          <span className="export-analysis-section__pill-size-unit">{formatSize(totalSize).unit}</span>
        </div>

        <div
          className="export-analysis-section__filter-input-container"
          style={{ position: 'relative', marginRight: 0 }}
        >
          <input
            placeholder="Filter methods"
            className="export-analysis-section__filter-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e?.target?.value)}
          />
          <svg
            width="90"
            height="90"
            viewBox="0 0 90 90"
            xmlns="http://www.w3.org/2000/svg"
            className="export-analysis-section__filter-input-search-icon"
          >
            <path d="M89.32 86.5L64.25 61.4C77.2 47 76.75 24.72 62.87 10.87 55.93 3.92 46.7.1 36.87.1s-19.06 3.82-26 10.77C3.92 17.8.1 27.05.1 36.87s3.82 19.06 10.77 26c6.94 6.95 16.18 10.77 26 10.77 9.15 0 17.8-3.32 24.55-9.4l25.08 25.1c.38.4.9.57 1.4.57.52 0 1.03-.2 1.42-.56.78-.78.78-2.05 0-2.83zM36.87 69.63c-8.75 0-16.98-3.4-23.17-9.6-6.2-6.2-9.6-14.42-9.6-23.17 0-8.75 3.4-16.98 9.6-23.17 6.2-6.2 14.42-9.6 23.17-9.6 8.75 0 16.98 3.4 23.18 9.6 12.77 12.75 12.77 33.55 0 46.33-6.2 6.2-14.43 9.6-23.18 9.6z"></path>
          </svg>
        </div>
      </h3>
      <ul className="export-analysis-section__list" style={{ border: 'solid 1px #f0f0f0', padding: '6px 12px 6px' }}>
        {Object.entries(groups)
          .sort((prev, next) => (prev?.[0] > next?.[0] ? 1 : -1))
          .map(([groupName, list]) => (
            <div key={groupName} className="export-analysis-section__letter-group">
              {shouldShowLabels && (
                <div className="export-analysis-section__dont-break">
                  <h3 className="export-analysis-section__letter-heading">{groupName?.toUpperCase?.()}</h3>
                </div>
              )}

              {list.map((item: any) => (
                <li key={item?.name} className="export-analysis-section__pill export-analysis-section__dont-break">
                  <div
                    className={`export-analysis-section__pill-fill ${`export-analysis-section__pill-fill--${getBGClass(
                      item?.gzip / bigestExports?.rawGzip,
                    )}`}`}
                    style={{ transform: `scaleX(${Math.min((item?.gzip || 0) / bigestExports?.rawGzip, 1)})` }}
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
    </div>
  )
}

const fexdPackageJson = require('@root/packages/mobile/package.json')
const antdPackageJson = require('antd-mobile/package.json')
const arcoPackageJson = require('@arco-design/mobile-react/package.json')
const zarmPackageJson = require('zarm/package.json')

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
    <Size libName="@fexd/mobile" version={fexdPackageJson?.version} />
    <Size libName="antd-mobile" version={antdPackageJson?.version} />
    <Size libName="@arco-design/mobile-react" version={arcoPackageJson?.version} />
    <Size libName="zarm" version={zarmPackageJson?.version} />
  </div>
)

let sizeInfo = {
  '@fexd/mobile': {},
  'antd-mobile': {},
  '@arco-design/mobile-react': {},
  zarm: {},
}

try {
  sizeInfo = {
    '@fexd/mobile': require('@root/public/size.json'),
    'antd-mobile': require('@root/public/antd-size.json'),
    '@arco-design/mobile-react': require('@root/public/arco-size.json'),
    zarm: require('@root/public/zarm-size.json'),
  }
} catch (err) {
  // development 下可能不存在 size.json 文件
}

const getBiggestExports = memoize(() => {
  return flatten(Object.values(sizeInfo).map((pkg: any) => pkg.esm)).sort((prev: any, next: any) =>
    prev?.rawGzip > next?.rawGzip ? -1 : 1,
  )?.[0]
})

function getSizeInfo(packageName: keyof typeof sizeInfo) {
  return sizeInfo?.[packageName] as any as {
    esm: any[]
    total: any[]
  }
}
