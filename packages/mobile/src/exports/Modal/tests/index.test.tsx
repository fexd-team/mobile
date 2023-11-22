import React from 'react'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { Modal, showModal, modalStore } from '@fexd/mobile'
import { delay } from '@fexd/tools'

describe('Modal', () => {
  afterEach(async () => {
    act(() => {
      modalStore.destroyAll()
    })

    document.body.innerHTML = ''
  })

  // modalId?: ModalIdType // 模态框 id，基础模态框必传，用于区分模态框
  // visible: boolean // 是否显示模态框
  // children?: React.ReactNode // 模态框内容
  test('应能正常渲染内容', () => {
    render(<Modal visible>Modal Test</Modal>)
    const testElement = screen.getByText(/Modal Test/i)
    expect(testElement).toBeInTheDocument()
  })

  // onClose?: React.ReactEventHandler<HTMLElement> // 行为意图钩子，尝试关闭时，用于控制外部 visible 变量
  test('点击遮罩时，onClose 应该触发', async () => {
    const onClose = jest.fn()
    render(<Modal visible onClose={onClose} />)
    fireEvent.click(document.querySelector('.exd-modal-content')!)
    expect(onClose).not.toBeCalled()
    fireEvent.click(document.querySelector('.exd-modal-mask')!)
    expect(onClose).toBeCalled()
    // await waitForElementToBeRemoved(modal)
  })
  // // className?: string // 内容容器的类名
  // type?: string // 模态框类型，仅用作互斥标识使用，无其他用途
  // level?: ModalLevel // 模态框等级，影响其 z-index
  // portalClassName?: string // 模态框 Portal 容器的类名
  // scrollable?: boolean // 模态框内容是否可滚动
  test('scrollable 正常工作', () => {
    render(<Modal visible>Non Scrollable</Modal>)
    const testElement1 = screen.getByText(/Non Scrollable/i)
    expect(testElement1.parentNode).not.toHaveClass('exd-modal-scrollable')

    render(
      <Modal visible scrollable>
        Scrollable Modal
      </Modal>,
    )
    const testElement2 = screen.getByText(/Scrollable Modal/i)
    expect(testElement2.parentNode).toHaveClass('exd-modal-scrollable')
  })

  // placement?: ModalPlacement // 内容位置，可选值为 center、top、bottom
  test('placement 正常工作', () => {
    render(<Modal visible>Placement Center</Modal>)
    const testElement1 = screen.getByText(/Placement Center/i)
    expect(testElement1.parentNode).toHaveClass('exd-modal-center')

    render(
      <Modal visible placement="top">
        Placement Top
      </Modal>,
    )
    const testElement2 = screen.getByText(/Placement Top/i)
    expect(testElement2.parentNode).toHaveClass('exd-modal-top')

    render(
      <Modal visible placement="bottom">
        Placement Bottom
      </Modal>,
    )
    const testElement3 = screen.getByText(/Placement Bottom/i)
    expect(testElement3.parentNode).toHaveClass('exd-modal-bottom')
  })
  // transition?: TransitionType // 内容出入动画类型
  // transitionSpeed?: TransitionSpeed // 动画速度

  // mask?: boolean // 是否显示遮罩，基于 Overlay 组件
  // maskClassName?: string // 遮罩样式名
  test('mask 属性正常工作', async () => {
    render(<Modal visible maskClassName="default-mask" />)
    expect(document.querySelector('.default-mask')).toBeInTheDocument()

    render(<Modal visible mask={false} maskClassName="no-mask" />)
    expect(document.querySelector('.no-mask')).not.toBeInTheDocument()
    // await waitForElementToBeRemoved(modal)
  })

  // maskClosable?: boolean // 点击遮罩是否允许关闭（触发 onClose 意图钩子）
  test('maskClosable 属性正常工作', async () => {
    const onClose1 = jest.fn()
    render(<Modal visible onClose={onClose1} maskClassName="mask1" />)
    fireEvent.click(document.querySelector('.mask1')!)
    expect(onClose1).toBeCalled()

    const onClose2 = jest.fn()
    render(<Modal visible onClose={onClose2} maskClosable={false} maskClassName="mask2" />)
    fireEvent.click(document.querySelector('.mask2')!)
    expect(onClose2).not.toBeCalled()
    // await waitForElementToBeRemoved(modal)
  })

  // maskTransparent?: boolean // 遮罩是否透明
  test('maskTransparent 属性正常工作', async () => {
    render(<Modal visible maskClassName="mask1" maskTransparent />)
    expect(document.querySelector('.mask1')).toHaveClass('exd-overlay-transparent')
  })
  // maskTransition?: TransitionType // 遮罩出入动画类型

  // onCreated?: () => void // 生命周期，模态框创建后
  // onEnter?: TransitionProps['onEnter'] // 生命周期，开始入场前
  // onEntered?: TransitionProps['onEntered'] // 生命周期，入场完成后
  // onExit?: TransitionProps['onExit'] // 生命周期，开始退场前
  // onExited?: TransitionProps['onExited'] // 生命周期，退场完成后
  // onDestroyed?: () => void // 生命周期，模态框销毁后
  test('生命周期函数正常执行且顺序正确', async () => {
    const arr: string[] = []
    const onCreated = jest.fn()
    const onEnter = jest.fn()
    const onEntered = jest.fn()
    const onExit = jest.fn()
    const onExited = jest.fn()
    const onDestroyed = jest.fn()

    let controller: any
    act(() => {
      controller = showModal({
        transitionSpeed: 'none',
        content: null,
        onCreated() {
          arr.push('onCreated')
          onCreated()
        },
        onEnter() {
          arr.push('onEnter')
          onEnter()
        },
        onEntered() {
          arr.push('onEntered')
          onEntered()
        },
        onExit() {
          arr.push('onExit')
          onExit()
        },
        onExited() {
          arr.push('onExited')
          onExited()
        },
        onDestroyed() {
          arr.push('onDestroyed')
          onDestroyed()
        },
      })
    })

    await delay(60)

    expect(onCreated).toBeCalled()
    expect(onEnter).toBeCalled()
    expect(onEntered).toBeCalled()

    expect(onExit).not.toBeCalled()
    expect(onExited).not.toBeCalled()
    expect(onDestroyed).not.toBeCalled()

    act(() => controller.close())

    await controller.promise
    await delay(60)

    expect(onExit).toBeCalled()
    expect(onExited).toBeCalled()
    expect(onDestroyed).toBeCalled()

    // modalStore.destroyAll()

    // 测试执行顺序
    expect(arr.join(' -> ')).toBe('onCreated -> onEnter -> onEntered -> onExit -> onExited -> onDestroyed')
  })

  // 以下部分暂未覆盖测试用例

  // ref?: React.Ref<HTMLDivElement>
  // storeProps?: any
  // destroyOnExit?: boolean // 退场后是否销毁内容
  // portalTo?: any // 弹窗 portal 注入的位置
  // shareMask?: boolean // 是否共享蒙层
  // contentClassName?: string // 内容容器样式
  // contentVisible?: boolean // 内容是否可见
  // contentTransition?: TransitionType
  // contentTransitionSpeed?: TransitionSpeed
  // contentMask?: boolean
  // contentMaskTransition?: TransitionType
  // onConflict?: ModalConflictHandler | null
})
