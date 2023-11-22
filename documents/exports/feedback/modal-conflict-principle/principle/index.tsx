/**
 * inline: true
 * className: 'conflict-principle-modal-layers'
 * defaultShowCode: false
 * hideActions: ['CSB', 'EXTERNAL']
 */
import React, { useEffect, useState } from 'react'
import { TransitionFade, TransitionSlideDown, TransitionSlideUp } from '@fexd/mobile'
import { classnames, run, debounce } from '@fexd/tools'

import './style.module.less'

export default () => {
  const [layers, setLayers] = useState({})
  useEffect(() => {
    const handler = debounce((e) => {
      if (e.data.type === 'demo:modal-layers') {
        const modals = JSON.parse(e.data.value)
        console.log('onMessage', modals)

        setLayers((currentLayers) =>
          modals.reduce(
            (layers: any, { ...modal }) => {
              if (modal.modalId === 'exd-overlay-shared') {
                delete modal.placement
              }
              return {
                ...layers,
                [modal.modalId]: {
                  ...modal,
                  visible: true,
                },
              }
            },
            (Object.values(currentLayers) as any[]).reduce(
              (layers, { ...layer }) => ({
                ...layers,
                [layer.modalId]: {
                  ...layer,
                  visible: false,
                },
              }),
              {},
            ),
          ),
        )
      }
    }, 60)

    window.addEventListener('message', handler)

    return () => window.removeEventListener('message', handler)
  }, [])

  return (
    <div className="conflict-principle-layers-wrapper">
      <Layers>
        {Object.values(layers).map(({ modalId, content, ...props }: any) => (
          <Layer
            key={modalId}
            {...props}
            onDestroyed={() => {
              setLayers((currentLayers: any) => {
                delete currentLayers[modalId]
                return { ...currentLayers }
              })
            }}
          >
            {content}
          </Layer>
        ))}
        <Layer level="lowest" mask={false} placement="" zIndex={0} visible={true}>
          <div className="conflict-principle-layers-content">
            <h4>互斥说明</h4>
            <p>模态框中，按照 level 属性共分为 low、normal、high、highest 四层</p>
            <p>
              互斥行为下，模态框使用 shareMask 属性，唤起 level 为 low 的共享蒙层，并使自身蒙层透明，实现单一蒙层的效果
            </p>
            <p>发生互斥时，为继续保持单一蒙层效果，可在模态框内容上创建局部蒙层，或直接将内容隐藏</p>
          </div>
        </Layer>
      </Layers>
    </div>
  )
}

function Layer({
  mask = true,
  maskTransparent = false,
  placement = '',
  level = '',
  contentMask = false,
  contentVisible = true,
  zIndex,
  visible: propVisible,
  style = {},
  children = null,
  onDestroyed = null,
}: any) {
  const [created, setCreated] = useState(false)
  const [visible, setVisible] = useState(false)
  const ContentTransition =
    {
      center: TransitionFade,
      top: TransitionSlideDown,
      bottom: TransitionSlideUp,
    }[placement as string] ?? TransitionFade

  useEffect(() => {
    ;(created ? setVisible : setCreated)(propVisible)
  }, [propVisible])

  useEffect(() => {
    setVisible(created)
  }, [created])

  useEffect(() => {
    if (!created) {
      return
    }
    return () => {
      run(onDestroyed)
    }
  }, [created])

  const speed = visible ? 'slowest' : 'normal'

  return created ? (
    <div
      className={classnames('conflict-principle-layer', {
        [level]: true,
      })}
      style={style}
    >
      {mask && !maskTransparent && (
        <TransitionFade in={visible} speed={speed}>
          <div className={classnames('conflict-principle-layer-mask')} />
        </TransitionFade>
      )}
      <ContentTransition
        in={visible}
        speed={speed}
        onExited={() => {
          setCreated(false)
        }}
      >
        <div
          className={classnames('conflict-principle-layer-placement', {
            [placement]: true,
          })}
        >
          <TransitionFade in={contentVisible} speed={speed} unmountOnExit={false}>
            <div className="conflict-principle-layer-content">{children}</div>
          </TransitionFade>
          <TransitionFade in={contentMask} speed={speed}>
            <div className={classnames('conflict-principle-layer-mask')} />
          </TransitionFade>
        </div>
      </ContentTransition>
    </div>
  ) : null
}

function Layers({ children }: any) {
  const basicTransform = 'translateX(-50%) translateY(-50%) rotateX(45deg) rotate(10deg) skew(-15deg)'
  const zGap = 60

  return (
    <div className="conflict-principle-layers">
      {React.Children.map(children, (child) => child)
        .sort(
          (prev: { props: { zIndex: number } }, next: { props: { zIndex: number } }) =>
            prev.props.zIndex - next.props.zIndex,
        )
        .map((child: any, idx: any, arr: any) =>
          React.cloneElement(child, {
            style: {
              transform: `${basicTransform} translateZ(${(idx - arr.length / 2 + 0.5) * zGap}px)`,
            },
          }),
        )}
    </div>
  )
}
