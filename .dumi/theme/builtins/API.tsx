import React, { useContext, useEffect, useState } from 'react'
import type { IApiComponentProps } from 'dumi/theme'
import { context, useApiData } from 'dumi/theme'
import { get } from '@fexd/tools'
import Table from 'dumi-theme-default/src/builtins/Table'

const LOCALE_TEXTS = {
  'zh-CN': {
    name: '属性名',
    description: '描述',
    type: '类型',
    default: '默认值',
    required: '(必选)',
  },
  'en-US': {
    name: 'Name',
    description: 'Description',
    type: 'Type',
    default: 'Default',
    required: '(required)',
  },
}

interface EnhancedIApiComponentProps extends IApiComponentProps {
  hidedefaultcolumn?: any
  hiderequiredmark?: any
  src?: string
  nameprefix?: string
}
export default ({ identifier, export: expt, ...props }: EnhancedIApiComponentProps) => {
  const data = useApiData(identifier)
  const { locale } = useContext(context)
  const texts = /^zh|cn$/i.test(locale as any) ? LOCALE_TEXTS['zh-CN'] : LOCALE_TEXTS['en-US']
  const hideDefaultColumn = props?.hidedefaultcolumn === ''
  const hideRequiredMark = props?.hiderequiredmark === ''
  const namePrefix = props?.nameprefix || ''

  console.log('expt', expt, data, props)

  return (
    <>
      {data && (
        // @ts-ignore
        <Table>
          <thead>
            <tr>
              <th>{texts.name}</th>
              <th>{texts.description}</th>
              <th>{texts.type}</th>
              {!hideDefaultColumn && <th>{texts.default}</th>}
            </tr>
          </thead>
          <tbody>
            {get(data, expt, []).map((row) => (
              <tr key={row.identifier}>
                <td>
                  {namePrefix}
                  {row.identifier}
                  {!hideRequiredMark && row.required && <span style={{ color: 'red', marginLeft: 4 }}>*</span>}
                </td>
                <td>{row.description || '--'}</td>
                <td>
                  <code>{row.type}</code>
                </td>
                {!hideDefaultColumn && (
                  <td>
                    <code>{row.default || (row.required && texts.required) || '--'}</code>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
