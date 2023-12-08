import { FC } from 'react'
import React, { useState, useContext, useEffect } from 'react'
import QRCode from 'qrcode.react'
import { isString } from '@fexd/tools'
import { context, usePrefersColor } from 'dumi/theme'
import IThemeConfig from '../typings/config'
import './Device.less'

interface IDeviceProps {
  className?: string
  url: string
  fixed?: boolean
}

const Device: FC<IDeviceProps> = ({ fixed = true, url: rawUrl, className = '' }) => {
  const [renderKey, setRenderKey] = useState(Math.random())
  const [color] = usePrefersColor()
  const {
    config: { mode, title = 'dumi', theme = {} },
  } = useContext(context)
  const { deviceTitle = title } = theme as IThemeConfig

  // re-render iframe if prefers color changed
  useEffect(() => {
    setRenderKey(Math.random())
  }, [color])

  /**
   *  用正则去除多余的路径，但要保留 /mobile/
   * xxx.com/export#/~demos/xxx => xxx.com/~demos/xxx
   * xxx.com/export/test#/~demos/xxx => xxx.com/~demos/xxx
   * xxx.com/mobile/export#/~demos/xxx => xxx.com/mobile/~demos/xxx
   * xxx.com/mobile/export/test#/~demos/xxx => xxx.com/~demos/xxx
   */
  const url = /#/.test(rawUrl) ? rawUrl.replace(/\/\w{0,}#\/\~demos\//, '/~demos/') : rawUrl

  return (
    <div
      className={['__dumi-default-device', fixed ? '__dumi-default-device-fixed' : ''].concat(className).join(' ')}
      data-device-type="iOS"
      data-mode={mode}
    >
      {true && (
        <div className="__dumi-default-device-status">
          <span>FEXD</span>
          <span>10:24</span>
        </div>
      )}
      <iframe title="dumi-previewer" src={url} key={renderKey} />
      <div className="__dumi-default-device-action">
        <button className="__dumi-default-icon" role="refresh" onClick={() => setRenderKey(Math.random())} />
        {isString(url) && url.length > 0 && (
          <button className="__dumi-default-icon" role="qrcode">
            <QRCode value={url} size={96} />
          </button>
        )}
        <a href={url} target="_blank" rel="noreferrer" className="__dumi-default-icon" role="open-demo" />
      </div>
    </div>
  )
}

export default Device
