import React, { useMemo, useCallback } from 'react'
import { classnames } from '@fexd/tools'

import PickerView from '../PickerView'
import useCascadingPicker from './useCascadingPicker'
import { CascadingColumnDef } from './type'
import { CascadePickerViewProps, CascadeOption } from './type'
import createFC from '../createFC'

const prefix = 'exd-cascade-picker-view'

function getTreeDepth(options: CascadeOption[]): number {
  if (!options?.length) return 0
  let depth = 1
  let nodes = options
  while (nodes.length > 0) {
    const first = nodes.find((n) => n.children?.length) ?? nodes[0]
    if (!first?.children?.length) break
    nodes = first.children
    depth++
  }
  return depth
}

function findOptionPath(options: CascadeOption[], values: (string | number)[]): CascadeOption[] {
  const result: CascadeOption[] = []
  let nodes = options
  for (const val of values) {
    const found = nodes.find((n) => n.value === val)
    if (!found) break
    result.push(found)
    nodes = found.children ?? []
  }
  return result
}

const CascadePickerView = createFC<CascadePickerViewProps, HTMLDivElement>(function CascadePickerView(
  { options = [], value, defaultValue, onChange, rows = 3, className, ...props },
  forwardedRef,
) {
  const depth = useMemo(() => getTreeDepth(options), [options])

  const columns = useMemo<CascadingColumnDef[]>(
    () =>
      Array.from({ length: depth }, (_, level) => ({
        key: `level-${level}`,
        getOptions: (parentValues) => {
          let nodes = options
          for (let i = 0; i < level; i++) {
            const selected = nodes.find((n) => n.value === parentValues[i])
            nodes = selected?.children ?? []
          }
          return nodes.map((n) => ({
            label: n.label,
            value: n.value,
            disabled: n.disabled,
          }))
        },
        resolveValue: (current: any, opts: any[]) => {
          if (current !== undefined) {
            const found = opts.find((o: any) => o.value === current)
            if (found && !found.disabled) return current
          }
          const firstEnabled = opts.find((o: any) => !o.disabled)
          return firstEnabled?.value ?? opts[0]?.value
        },
      })),
    [options, depth],
  )

  const handleChange = useCallback(
    (values: any[]) => {
      const path = findOptionPath(options, values)
      onChange?.(values, path)
    },
    [options, onChange],
  )

  const { columns: cols } = useCascadingPicker({
    columns,
    value,
    defaultValue,
    onChange: handleChange,
  })

  return (
    <div {...props} className={classnames(prefix, className)} ref={forwardedRef}>
      {cols.map((col) => (
        <PickerView key={col.key} options={col.options} rows={rows} value={col.value} onChange={col.onChange} />
      ))}
    </div>
  )
})

CascadePickerView.defaultProps = {
  rows: 3,
}

export default CascadePickerView
