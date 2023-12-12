import React, { useEffect, useState } from 'react'
import { classnames, flatten } from '@fexd/tools'

import useIOControl from '../useIOControl'
import createFC from '../createFC'
import { CollapseProps, CollapseRef, ActiveKeyType } from './type'
import Panel from './Panel'

export const prefix = 'exd-collapse'

interface CollapseType extends React.FC<CollapseProps> {
  Panel: typeof Panel
}

const Collapse = createFC<CollapseProps, CollapseRef>(function Collapse(
  { children, className, accordion, expandIcon, iconRotate, defaultActiveKey, ...props },
  ref,
) {
  const { value, setValue: setActiveKey } = useIOControl<any>(
    {
      defaultActiveKey,
      ...props,
    } as any,
    {
      defaultValuePropName: 'defaultActiveKey',
      valuePropName: 'activeKey',
    },
  )
  const activeKey: ActiveKeyType[] = flatten([value])

  return (
    <div
      {...props}
      onChange={undefined}
      className={classnames(prefix, {
        className,
      })}
      ref={ref}
    >
      {React.Children.map(children as any, (child: React.ReactElement, index: number) => {
        if (!child) return null

        if (typeof child.type === 'string') {
          return child
        }

        const key = child.key || String(index)
        let isActive = false
        if (accordion) {
          isActive = activeKey[0] === key
        } else {
          isActive = activeKey.indexOf(key) > -1
        }

        return React.cloneElement(child, {
          panelKey: key,
          children: child.props.children,
          isActive,
          expandIcon,
          iconRotate,
          onItemClick: (key: React.Key) => {
            let newActiveKey: any[] = []
            if (accordion) {
              newActiveKey = activeKey[0] === key ? [] : [key]
            } else {
              newActiveKey = [...activeKey]
              const index = newActiveKey.indexOf(key)
              const isActive = newActiveKey.indexOf(key) > -1
              if (isActive) {
                newActiveKey.splice(index, 1)
              } else {
                newActiveKey.push(key)
              }
            }
            setActiveKey(newActiveKey)
          },
        })
      })}
    </div>
  )
}) as CollapseType

Collapse.defaultProps = {
  iconRotate: true,
}
Collapse.Panel = Panel
export default Collapse
