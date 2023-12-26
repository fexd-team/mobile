import React, { useState } from 'react'
import { run } from '@fexd/tools'
import {
  Button,
  Modal,
  TransitionSlideUp,
  TransitionSlideDown,
  Iconfont,
  modalConflict,
  showModal,
  modalStore,
  DemoBlock,
} from '@fexd/mobile'

import './style.module.less'

export default () => (
  <>
    <DemoBlock inline title="内容位置">
      <ModalDemo>中间（默认）</ModalDemo>
      <ModalDemo placement="top">顶部</ModalDemo>
      <ModalDemo placement="bottom">底部</ModalDemo>
    </DemoBlock>

    <DemoBlock inline title="自定义内容与动画">
      <ModalDemo buttonText="中间 Fade">
        <div className="modal-content modal-content-center">中间 Fade</div>
      </ModalDemo>
      <ModalDemo placement="top" transition={TransitionSlideDown} buttonText="顶部 Slide-Down">
        <div className="modal-content modal-content-top">顶部 Slide-Down</div>
      </ModalDemo>
      <ModalDemo placement="bottom" transition={TransitionSlideUp} buttonText="底部 Slide-up">
        <div className="modal-content modal-content-bottom">底部 Slide-up</div>
      </ModalDemo>
      <ModalDemo placement="bottom" transition={TransitionSlideUp} buttonText="自定义速度" transitionSpeed={1500}>
        <div className="modal-content modal-content-bottom">龟速 1500ms</div>
      </ModalDemo>
    </DemoBlock>

    <DemoBlock inline title="遮罩属性">
      <ModalDemo mask={false} buttonText="无遮罩">
        <div className="modal-toast modal-toast-center">无遮罩关闭功能，需再次点击按钮来关闭</div>
      </ModalDemo>
      <ModalDemo maskTransparent buttonText="遮罩透明">
        <div className="modal-toast modal-toast-center">点哪里都能关闭，遮罩还在只是透明了</div>
      </ModalDemo>
      <ModalDemo maskClosable={false} buttonText="遮罩不可关闭">
        {({ setShow }: any) => (
          <>
            <div className="modal-content modal-content-center">遮罩不可关闭，需要自定义点击元素来关闭</div>
            <Iconfont
              type="close-circle"
              onClick={() => setShow(false)}
              style={{ marginTop: 12, color: '#fff', fontSize: 32 }}
            />
          </>
        )}
      </ModalDemo>
    </DemoBlock>

    <DemoBlock inline title="长内容滚动">
      <ModalDemo scrollable destroyOnExit={false} buttonText="长内容滚动">
        <div style={{ padding: 14, width: 130, display: 'inline-block' }}>
          {Array(50)
            .fill('')
            .map((item, idx) => (
              <div key={idx} className="modal-list-item">
                内容条目 {idx + 1}
              </div>
            ))}
        </div>
      </ModalDemo>
    </DemoBlock>

    <DemoBlock inline title="无互斥控制">
      <Button
        onClick={() => {
          showModal({
            placement: 'bottom',
            transition: TransitionSlideUp,
            shareMask: false,
            onConflict: null,
            content: (
              <div className="modal-content modal-content-bottom" style={{ height: '60vh', flexDirection: 'column' }}>
                <div style={{ marginBottom: 10 }}>第一层</div>
                <Button
                  key={'打开第二层'}
                  onClick={() => {
                    showModal({
                      placement: 'bottom',
                      transition: TransitionSlideUp,
                      shareMask: false,
                      onConflict: null,
                      content: (
                        <div
                          className="modal-content modal-content-bottom"
                          style={{ height: '40vh', flexDirection: 'column' }}
                        >
                          <div style={{ marginBottom: 10 }}>第二层</div>
                          <Button
                            key={'打开第三层'}
                            onClick={() => {
                              showModal({
                                placement: 'bottom',
                                transition: TransitionSlideUp,
                                shareMask: false,
                                onConflict: null,
                                content: <div className="modal-content modal-content-bottom">第三层</div>,
                              })
                            }}
                          >
                            {'打开第三层'}
                          </Button>
                        </div>
                      ),
                    })
                  }}
                >
                  {'打开第二层'}
                </Button>
              </div>
            ),
          })
        }}
      >
        多层 Slide-up
      </Button>

      <Button
        onClick={() => {
          showModal({
            placement: 'bottom',
            transition: TransitionSlideUp,
            shareMask: false,
            onConflict: null,
            content: (
              <div className="modal-content modal-content-bottom" style={{ height: '60vh', flexDirection: 'column' }}>
                <div style={{ marginBottom: 10 }}>Slide-up</div>
                <Button
                  onClick={() => {
                    showModal({
                      placement: 'top',
                      transition: TransitionSlideDown,
                      shareMask: false,
                      onConflict: null,
                      content: (
                        <div
                          className="modal-content modal-content-bottom"
                          style={{ height: '40vh', flexDirection: 'column' }}
                        >
                          <div style={{ marginBottom: 10 }}>第二层</div>
                          <Button
                            onClick={() => {
                              showModal({
                                placement: 'bottom',
                                transition: TransitionSlideUp,
                                shareMask: false,
                                onConflict: null,
                                content: <div className="modal-content modal-content-bottom">Slide-up</div>,
                              })
                            }}
                          >
                            打开一个 Slide-up
                          </Button>
                        </div>
                      ),
                    })
                  }}
                >
                  打开一个 Slide-down
                </Button>
              </div>
            ),
          })
        }}
      >
        Slide-up 和 Slide-down
      </Button>
    </DemoBlock>

    <DemoBlock inline title="互斥控制">
      <Button
        onClick={() => {
          showModal({
            placement: 'bottom',
            transition: TransitionSlideUp,
            onConflict: modalConflict.handlers.mask,
            content: (
              <div className="modal-content modal-content-bottom" style={{ height: '60vh', flexDirection: 'column' }}>
                <div style={{ marginBottom: 10 }}>第一层</div>
                <Button
                  key={'打开第二层'}
                  onClick={() => {
                    showModal({
                      placement: 'bottom',
                      transition: TransitionSlideUp,
                      content: (
                        <div
                          className="modal-content modal-content-bottom"
                          style={{ height: '40vh', flexDirection: 'column' }}
                        >
                          <div style={{ marginBottom: 10 }}>第二层</div>
                          <Button
                            key={'打开第三层'}
                            onClick={() => {
                              showModal({
                                placement: 'bottom',
                                transition: TransitionSlideUp,
                                content: <div className="modal-content modal-content-bottom">第三层</div>,
                              })
                            }}
                          >
                            {'打开第三层'}
                          </Button>
                        </div>
                      ),
                    })
                  }}
                >
                  {'打开第二层'}
                </Button>
              </div>
            ),
          })
        }}
      >
        多层 Slide-up
      </Button>

      <Button
        onClick={() => {
          showModal({
            placement: 'bottom',
            transition: TransitionSlideUp,
            onConflict: modalConflict.handlers.mask,
            content: (
              <div className="modal-content modal-content-bottom" style={{ height: '60vh', flexDirection: 'column' }}>
                <div style={{ marginBottom: 10 }}>Slide-up</div>
                <Button
                  onClick={() => {
                    showModal({
                      placement: 'top',
                      transition: TransitionSlideDown,
                      onConflict: modalConflict.handlers.mask,
                      content: (
                        <div
                          className="modal-content modal-content-bottom"
                          style={{ height: '40vh', flexDirection: 'column' }}
                        >
                          <div style={{ marginBottom: 10 }}>第二层</div>
                          <Button
                            onClick={() => {
                              showModal({
                                placement: 'bottom',
                                transition: TransitionSlideUp,
                                content: <div className="modal-content modal-content-bottom">Slide-up</div>,
                              })
                            }}
                          >
                            打开一个 Slide-up
                          </Button>
                        </div>
                      ),
                    })
                  }}
                >
                  打开一个 Slide-down
                </Button>
              </div>
            ),
          })
        }}
      >
        Slide-up 和 Slide-down
      </Button>
    </DemoBlock>
  </>
)

function ModalDemo({ children, buttonText = children, ...props }: any) {
  const [show, setShow] = useState(false)

  if (buttonText === '多层 Slide-up') {
    // @ts-ignore
    window.setShow = setShow
  }

  return (
    <>
      <Button key={buttonText} onClick={() => setShow((show) => !show)}>
        {buttonText}
      </Button>
      <Modal visible={show} onClose={() => setShow((show) => !show)} {...props}>
        {run(children, undefined, { show, setShow })}
      </Modal>
    </>
  )
}
