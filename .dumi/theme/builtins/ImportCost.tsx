import React from 'react'
// @ts-ignore
import Badge from 'dumi-theme-default/es/builtins/Badge'
import { isString, run } from '@fexd/tools'

import './ImportCost.less'

let reports: any = {
  esm: [],
  cjs: [],
}

try {
  reports = require('@root/public/size.json')
} catch (err) {
  // development 下可能不存在 size.json 文件
}

export const getSizeInfo = (name: string, type = 'esm') => {
  const reg = new RegExp(`/${name}/`)
  return reports?.[type].find((item: any) => reg.test(item.name))
}

export interface ImportCostProps {
  type?: 'esm' | 'cjs'
  name?: string
}

export default function ImportCost({ type = 'esm', name }: ImportCostProps) {
  const [info, setInfo] = React.useState(() => getSizeInfo(name!, type))

  React.useEffect(() => {
    setInfo(getSizeInfo(name!, type))
  }, [type, name])

  const badgeType = run(() => {
    if (!info) {
      return 'unknown'
    }

    const gzip = info?.rawGzip

    if (gzip > 20 * 1000) {
      return 'error'
    }

    if (gzip > 12 * 1000) {
      return 'warning'
    }

    if (gzip > 6 * 1000) {
      return 'info'
    }

    return 'success'
  })

  return (
    <div className="import-cost">
      <div className="import-cost-badge">
        <Badge type={badgeType}>{info?.gzip ?? '???'} gzipped</Badge>
      </div>
    </div>
  )
}
