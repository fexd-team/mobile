/**
 * mobile-device-style: fixed
 */
import React, { useState, useEffect } from 'react'
import { run, debounce } from '@fexd/tools'
import {
  Button,
  Modal,
  TransitionSlideUp,
  TransitionSlideDown,
  Iconfont,
  modalConflict,
  showModal,
  modalStore,
  showDialog,
  showPopup,
  toast,
  loading,
  notify,
} from '@fexd/mobile'
import DemoBlock from '@documents/components/DemoBlock'
import './style.module.less'

// Modal.defaultProps.transitionSpeed = 'slowest'
// @ts-ignore
window.modalStore = modalStore

const Demo = () => {
  usePrincipleExplain()

  return (
    <>
      <DemoBlock inline title="各种模态框">
        <Button
          onClick={() => {
            showModal({
              content: '一个 Modal',
            })
          }}
        >
          showModal
        </Button>
        <Button
          onClick={() => {
            showPopup({
              content: '一个 Popup',
            })
          }}
        >
          showPopup
        </Button>
        <Button
          onClick={() => {
            showDialog({
              content: '一个 Dialog',
            })
          }}
        >
          showDialog
        </Button>
        <Button
          onClick={() => {
            toast.info('一个 toast', {
              duration: 5000,
            })
          }}
        >
          toast
        </Button>
        <Button
          onClick={() => {
            notify.info('一个 notify', {
              duration: 5000,
            })
          }}
        >
          notify
        </Button>
        <Button
          onClick={() => {
            loading.show({
              mask: false,
            })
          }}
        >
          展示 loading
        </Button>

        <Button
          onClick={() => {
            loading.hide(true)
          }}
        >
          隐藏 loading
        </Button>
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
                <div
                  className="demo-modal-conflict-content demo-modal-conflict-content-bottom"
                  style={{ height: '60vh', flexDirection: 'column' }}
                >
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
                            className="demo-modal-conflict-content demo-modal-conflict-content-bottom"
                            style={{ height: '40vh', flexDirection: 'column' }}
                          >
                            <div style={{ marginBottom: 10 }}>第二层</div>
                            <DemoBlock inline title="">
                              <Button
                                onClick={() => {
                                  toast.info('一个 toast', {
                                    duration: 5000,
                                  })
                                }}
                              >
                                toast
                              </Button>
                              <Button
                                onClick={() => {
                                  notify.info('一个 notify', {
                                    duration: 5000,
                                  })
                                }}
                              >
                                notify
                              </Button>
                              <Button
                                key={'打开第三层'}
                                onClick={() => {
                                  showModal({
                                    placement: 'bottom',
                                    transition: TransitionSlideUp,
                                    shareMask: false,
                                    onConflict: null,
                                    content: (
                                      <div className="demo-modal-conflict-content demo-modal-conflict-content-bottom">
                                        第三层
                                      </div>
                                    ),
                                  })
                                }}
                              >
                                {'打开第三层'}
                              </Button>
                            </DemoBlock>
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
                <div
                  className="demo-modal-conflict-content demo-modal-conflict-content-bottom"
                  style={{ height: '60vh', flexDirection: 'column' }}
                >
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
                            className="demo-modal-conflict-content demo-modal-conflict-content-bottom"
                            style={{ height: '40vh', flexDirection: 'column' }}
                          >
                            <div style={{ marginBottom: 10 }}>第二层</div>
                            <DemoBlock>
                              <Button
                                onClick={() => {
                                  toast.info('一个 toast', {
                                    duration: 5000,
                                  })
                                }}
                              >
                                toast
                              </Button>
                              <Button
                                onClick={() => {
                                  notify.info('一个 notify', {
                                    duration: 5000,
                                  })
                                }}
                              >
                                notify
                              </Button>
                              <Button
                                onClick={() => {
                                  showModal({
                                    placement: 'bottom',
                                    transition: TransitionSlideUp,
                                    shareMask: false,
                                    onConflict: null,
                                    content: (
                                      <div className="demo-modal-conflict-content demo-modal-conflict-content-bottom">
                                        Slide-up
                                      </div>
                                    ),
                                  })
                                }}
                              >
                                打开一个 Slide-up
                              </Button>
                            </DemoBlock>
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
                <div
                  className="demo-modal-conflict-content demo-modal-conflict-content-bottom"
                  style={{ height: '60vh', flexDirection: 'column' }}
                >
                  <div style={{ marginBottom: 10 }}>第一层</div>
                  <Button
                    key={'打开第二层'}
                    onClick={() => {
                      showModal({
                        placement: 'bottom',
                        transition: TransitionSlideUp,
                        content: (
                          <div
                            className="demo-modal-conflict-content demo-modal-conflict-content-bottom"
                            style={{ height: '40vh', flexDirection: 'column' }}
                          >
                            <div style={{ marginBottom: 10 }}>第二层</div>
                            <DemoBlock>
                              <Button
                                onClick={() => {
                                  toast.info('一个 toast', {
                                    duration: 5000,
                                  })
                                }}
                              >
                                toast
                              </Button>
                              <Button
                                onClick={() => {
                                  notify.info('一个 notify', {
                                    duration: 5000,
                                  })
                                }}
                              >
                                notify
                              </Button>
                              <Button
                                onClick={() => {
                                  showDialog({
                                    content: '一个 Dialog',
                                  })
                                }}
                              >
                                Dialog
                              </Button>
                              <Button
                                key={'打开第三层'}
                                onClick={() => {
                                  showModal({
                                    placement: 'bottom',
                                    transition: TransitionSlideUp,
                                    content: (
                                      <div className="demo-modal-conflict-content demo-modal-conflict-content-bottom">
                                        第三层
                                      </div>
                                    ),
                                  })
                                }}
                              >
                                {'打开第三层'}
                              </Button>
                            </DemoBlock>
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
                <div
                  className="demo-modal-conflict-content demo-modal-conflict-content-bottom"
                  style={{ height: '60vh', flexDirection: 'column' }}
                >
                  <div style={{ marginBottom: 10 }}>Slide-up</div>
                  <Button
                    onClick={() => {
                      showModal({
                        placement: 'top',
                        transition: TransitionSlideDown,
                        onConflict: modalConflict.handlers.mask,
                        content: (
                          <div
                            className="demo-modal-conflict-content demo-modal-conflict-content-bottom"
                            style={{ height: '40vh', flexDirection: 'column' }}
                          >
                            <div style={{ marginBottom: 10 }}>第二层</div>
                            <Button
                              onClick={() => {
                                showModal({
                                  placement: 'bottom',
                                  transition: TransitionSlideUp,
                                  content: (
                                    <div className="demo-modal-conflict-content demo-modal-conflict-content-bottom">
                                      Slide-up
                                    </div>
                                  ),
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
}

export default () => <Demo />

function usePrincipleExplain() {
  useEffect(() => {
    if (!window.parent) {
      return
    }
    const handler = debounce(() => {
      window.parent.postMessage(
        {
          type: 'demo:modal-layers',
          value: JSON.stringify(
            modalStore.getAll().map((modal) => {
              const { props = {}, ...rest } = modal

              return {
                ...rest,
                contentRef: null,
                placement: props.placement,
                mask: props.mask,
                maskTransparent: props.maskTransparent,
                contentVisible: props.contentVisible,
                contentMask: props.contentMask,
              }
            }),
          ),
        },
        '*',
      )
    }, 100)

    modalStore.eventBus.on('open', handler)
    modalStore.eventBus.on('close', handler)

    return () => {
      modalStore.eventBus.off('open', handler)
      modalStore.eventBus.off('close', handler)
    }
  }, [])
}
