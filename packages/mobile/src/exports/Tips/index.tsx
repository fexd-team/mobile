import React, { useEffect, useState, useRef, useCallback } from 'react'
import createFC from '../createFC'
import Portal from '../Portal'
import { TipsProps, TipsRef, TipsType } from './type'
import { classnames, run } from '@fexd/tools'
// 此处不引入 style.less，目的是实现按需引用

export const prefix = 'exd-tips'
const Tips = createFC<TipsProps, TipsRef>(function Tips(props, ref) {
  /* 组件逻辑实现 */
  const divRef = useRef<HTMLDivElement>(null)
  const styleRef = useRef('')
  const [styles, setStyles] = useState({})
  const [subStyles, setSubStyles] = useState({})
  const [placementWay, setPlacementWay] = useState([])
  const [tipVisible, setTipVisible] = useState(false)

  const {
    title,
    placement = 'topLeft',
    children,
    visible,
    modal = false,
    zIndex = 10,
    theme = 'black',
    // autoAdjustOverflow,
    onVisibleChange,
  } = props

  useEffect(() => {
    if (divRef.current && placement) {
      const domRect = divRef.current!.getBoundingClientRect()
      const str = placement.replace(/([A-Z])/g, '-$1').toLowerCase()
      const arr = str.split('-')

      setPlacementWay(arr as any)

      let obj = {}
      let subStyle = {}

      switch (str) {
        case 'top-left':
          obj = {
            top: domRect.top - 6 + 'px',
            left: domRect.left + 'px',
            transform: 'rotateX(180deg)',
            transformOrigin: 'top',
          }
          subStyle = {
            transform: 'rotateX(180deg)',
          }
          break

        case 'top':
          obj = {
            top: domRect.top - 6 + 'px',
            left: domRect.left + domRect.width / 2 + 'px',
            transform: 'translateX(-50%) rotateX(180deg)',
            transformOrigin: 'top',
          }
          subStyle = {
            transform: 'rotateX(180deg)',
          }
          break

        case 'top-right':
          obj = {
            top: domRect.top - 6 + 'px',
            left: domRect.right + 'px',
            transform: 'rotateX(180deg) rotateY(180deg)',
            transformOrigin: 'top left',
          }
          subStyle = {
            transform: 'rotateX(180deg) rotateY(180deg)',
          }
          break

        case 'left-top':
          obj = {
            top: domRect.top + 'px',
            left: domRect.left - 6 + 'px',
            transform: 'rotateY(180deg)',
            transformOrigin: 'left',
          }
          subStyle = {
            transform: 'rotateY(180deg)',
          }
          break

        case 'left':
          obj = {
            top: domRect.top + domRect.height / 2 + 'px',
            left: domRect.left - 6 + 'px',
            transform: 'rotateY(180deg) translateY(-50%)',
            transformOrigin: 'left',
          }
          subStyle = {
            transform: 'rotateY(180deg)',
          }
          break

        case 'left-bottom':
          obj = {
            top: domRect.bottom + 'px',
            left: domRect.left - 6 + 'px',
            transform: 'rotateX(180deg) rotateY(180deg)',
            transformOrigin: 'left top',
          }
          subStyle = {
            transform: 'rotateX(180deg) rotateY(180deg)',
          }
          break

        case 'bottom-left':
          obj = {
            top: domRect.bottom + 6 + 'px',
            left: domRect.left + 'px',
          }
          break

        case 'bottom':
          obj = {
            top: domRect.bottom + 6 + 'px',
            left: domRect.left + domRect.width / 2 + 'px',
            transform: 'translateX(-50%)',
          }
          break

        case 'bottom-right':
          obj = {
            top: domRect.bottom + 6 + 'px',
            left: domRect.right + 'px',
            transform: 'rotateY(180deg)',
            transformOrigin: 'left',
          }
          subStyle = {
            transform: 'rotateY(180deg)',
          }
          break

        case 'right-top':
          obj = {
            top: domRect.top + 'px',
            left: domRect.right + 6 + 'px',
          }
          break

        case 'right':
          obj = {
            top: domRect.top + domRect.height / 2 + 'px',
            left: domRect.right + 6 + 'px',
            transform: 'translateY(-50%)',
          }
          break

        case 'right-bottom':
          obj = {
            top: domRect.bottom + 'px',
            left: domRect.right + 6 + 'px',
            transform: 'rotateX(180deg)',
            transformOrigin: 'top',
          }
          subStyle = {
            transform: 'rotateX(180deg)',
          }
          break
      }

      setStyles({
        ...obj,
        padding: '6px 8px',
        color: theme && theme === 'white' ? '#000' : '#fff',
        boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.09)',
        backgroundColor: theme && theme === 'white' ? '#fff' : '#000',
        zIndex,
      })

      styleRef.current = `
        .${prefix}-alert-tips.tips-end-${arr[0]}-${arr[1]}:after {
          border: 5px solid transparent;
          border-${
            ['top', 'bottom'].includes(arr[0]) ? 'bottom' : ['left', 'right'].includes(arr[0]) ? 'right' : ''
          }-color: ${theme && theme === 'white' ? '#fff' : '#000'}
        }
      `

      setSubStyles({
        ...subStyle,
        display: 'inline-block',
      })
    }
  }, [])

  const changeVisible = useCallback(() => {
    if (visible === undefined) {
      setTipVisible(!tipVisible)
      if (onVisibleChange) {
        onVisibleChange(!tipVisible)
      }
    }
  }, [visible, tipVisible, onVisibleChange])

  useEffect(() => {
    if (visible !== undefined) {
      if (onVisibleChange) {
        onVisibleChange(visible)
      }
    }
  }, [visible, onVisibleChange])

  return (
    <>
      <div ref={divRef} className={prefix} onClick={changeVisible}>
        {children}
      </div>
      {(visible || tipVisible) && (
        <Portal to={document.querySelector('body')}>
          <style>{styleRef.current}</style>
          {modal && (visible || tipVisible) && (
            <div className={classnames(prefix + '-alert-tips-modal')} onClick={changeVisible} />
          )}
          <div
            className={classnames(prefix + '-alert-tips', {
              'tips-top-center': placementWay[0] === 'top' && !placementWay[1],
              'tips-left': placementWay[0] === 'left' && placementWay[1],
              'tips-left-center': placementWay[0] === 'left' && !placementWay[1],
              'tips-bottom': placementWay[0] === 'bottom' && placementWay[1],
              'tips-bottom-center': placementWay[0] === 'bottom' && !placementWay[1],
              'tips-right': placementWay[0] === 'right' && placementWay[1],
              'tips-right-center': placementWay[0] === 'right' && !placementWay[1],
              ['tips-end-' + placementWay[0] + '-' + placementWay[1]]: true,
            })}
            style={styles}
          >
            <span style={subStyles}>{run(title)}</span>
          </div>
        </Portal>
      )}
    </>
  )
}) as TipsType

Tips.defaultProps = {}

export default Tips
