import React, { useState, useEffect } from 'react'
import { run } from '@fexd/tools'
import { CloseCircleOutline } from '@fexd/icons'
import { Button, Dialog, showDialog, modalConflict, Iconfont, DemoBlock } from '@fexd/mobile'

export default () => (
  <>
    <DemoBlock inline title="基础用法">
      <Button
        onClick={() => {
          showDialog({
            content: '对话框',
          })
        }}
      >
        默认
      </Button>
      <Button
        onClick={() => {
          showDialog({
            title: '标题',
            content: '带标题的对话框',
          })
        }}
      >
        带标题
      </Button>
    </DemoBlock>

    <DemoBlock inline title="主题类型">
      <Button
        onClick={() => {
          showDialog({
            title: '标题',
            content: 'normal 类型',
          })
        }}
      >
        normal（默认）
      </Button>
      <Button
        onClick={() => {
          showDialog({
            title: '标题',
            content: 'iOS 类型',
            theme: 'iOS',
          })
        }}
      >
        iOS
      </Button>
      <Button
        onClick={() => {
          showDialog({
            title: '标题',
            content: 'Android 类型',
            theme: 'Android',
          })
        }}
      >
        Android
      </Button>
    </DemoBlock>

    <DemoBlock inline title="按钮数量">
      <Button
        onClick={() => {
          showDialog({
            title: '标题',
            content: '对话框内容',
            actions: [
              {
                content: '主操作',
              },
            ],
          })
        }}
      >
        normal 1 个
      </Button>
      <Button
        onClick={() => {
          showDialog({
            title: '标题',
            content: '对话框内容',
            actions: [
              {
                content: '主操作',
              },
              {
                content: '辅助操作',
              },
            ],
          })
        }}
      >
        normal 2 个
      </Button>
      <Button
        onClick={() => {
          showDialog({
            title: '标题',
            content: '对话框内容',
            actions: [
              {
                content: '主操作',
              },
              {
                content: '辅助操作 1',
              },
              {
                content: '辅助操作 2',
              },
            ],
          })
        }}
      >
        normal 2 个以上
      </Button>
      <Button
        onClick={() => {
          showDialog({
            title: '标题',
            content: '对话框内容',
            theme: 'iOS',
            actions: [
              {
                content: '主操作',
              },
            ],
          })
        }}
      >
        iOS 1 个
      </Button>
      <Button
        onClick={() => {
          showDialog({
            title: '标题',
            content: '对话框内容',
            theme: 'iOS',
            actions: [
              {
                content: '主操作',
              },
              {
                content: '辅助操作',
              },
            ],
          })
        }}
      >
        iOS 2 个
      </Button>
      <Button
        onClick={() => {
          showDialog({
            title: '标题',
            content: '对话框内容',
            theme: 'iOS',
            actions: [
              {
                content: '主操作',
              },
              {
                content: '辅助操作 1',
              },
              {
                content: '辅助操作 2',
              },
            ],
          })
        }}
      >
        iOS 2 个以上
      </Button>
      <Button
        onClick={() => {
          showDialog({
            title: '标题',
            content: '对话框内容',
            theme: 'Android',
            actions: [
              {
                content: '主操作',
              },
            ],
          })
        }}
      >
        Android 1 个
      </Button>
      <Button
        onClick={() => {
          showDialog({
            title: '标题',
            content: '对话框内容',
            theme: 'Android',
            actions: [
              {
                content: '主操作',
              },
              {
                content: '辅助操作',
              },
            ],
          })
        }}
      >
        Android 2 个
      </Button>
      <Button
        onClick={() => {
          showDialog({
            title: '标题',
            content: '对话框内容',
            theme: 'Android',
            actions: [
              {
                content: '主操作',
              },
              {
                content: '辅助 1',
              },
              {
                content: '辅助 2',
              },
            ],
          })
        }}
      >
        Android 2 个以上
      </Button>
    </DemoBlock>

    <DemoBlock inline title="很长的内容">
      <Button
        onClick={() => {
          showDialog({
            title: '标题',
            content:
              '很长的内容很长的内容很长的内内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容',
            actions: [
              {
                content: '按钮的内容也很长按钮的内容也很长',
              },
              {
                content: '辅助操作',
              },
            ],
          })
        }}
      >
        normal
      </Button>
      <Button
        onClick={() => {
          showDialog({
            title: '标题',
            content:
              '很长的内容很长的内容很长的内内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容',
            theme: 'iOS',
            actions: [
              {
                content: '按钮的内容也很长按钮的内容也很长',
              },
              {
                content: '辅助操作',
              },
            ],
          })
        }}
      >
        iOS
      </Button>
      <Button
        onClick={() => {
          showDialog({
            title: '标题',
            content:
              '很长的内容很长的内容很长的内内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容 很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容很长的内容很长的内容很长的内容 很长的内容',
            theme: 'Android',
            actions: [
              {
                content: '按钮的内容也很长按钮的内容也很长',
              },
              {
                content: '辅助操作',
              },
            ],
          })
        }}
      >
        Android
      </Button>
    </DemoBlock>

    <DemoBlock inline title="前缀、后缀">
      <Button
        onClick={() => {
          const { close } = showDialog({
            title: '拓展',
            content: '带前缀与关闭按钮',
            maskClosable: false,
            prefix: (
              <div
                style={{
                  width: '100%',
                  height: 70,
                  background: 'linear-gradient(to bottom, #3e013f, #b23fc1)',
                  marginBottom: -4,
                }}
              />
            ),
            suffix: (
              <Button
                icon={<CloseCircleOutline style={{ fontSize: 26, color: 'white', marginTop: 4 }} />}
                fill="none"
                shape="round"
                className="close-btn"
                onClick={() => close()}
              />
            ),
            theme: 'normal',
            actions: [
              {
                content: 'OK',
              },
            ],
          })
        }}
      >
        带前缀与关闭按钮
      </Button>
    </DemoBlock>

    <DemoBlock inline title="互斥控制">
      <Button
        onClick={() => {
          showDialog({
            title: '第一层',
            content: (
              <div className="dialog-content dialog-content-bottom" style={{ flexDirection: 'column' }}>
                <div style={{ marginBottom: 10 }}>
                  <p>第一层</p>
                  <p>第一层</p>
                </div>
                <Button
                  key={'打开第二层'}
                  onClick={() => {
                    showDialog({
                      title: '第二层',
                      content: (
                        <div className="dialog-content dialog-content-bottom" style={{ flexDirection: 'column' }}>
                          <div style={{ marginBottom: 10 }}>第二层</div>
                          <Button
                            key={'打开第三层'}
                            onClick={() => {
                              showDialog({
                                title: '第三层',
                                content: <div className="dialog-content dialog-content-bottom">第三层</div>,
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
        隐藏互斥（默认）
      </Button>
      <Button
        onClick={() => {
          showDialog({
            title: '第一层',
            onConflict: modalConflict.handlers.mask,
            content: (
              <div className="dialog-content dialog-content-bottom" style={{ flexDirection: 'column' }}>
                <p>第一层</p>
                <p>第一层</p>
                <Button
                  key={'打开第二层'}
                  onClick={() => {
                    showDialog({
                      title: '第二层',
                      onConflict: modalConflict.handlers.mask,
                      content: (
                        <div className="dialog-content dialog-content-bottom" style={{ flexDirection: 'column' }}>
                          <div style={{ marginBottom: 10 }}>第二层</div>
                          <Button
                            key={'打开第三层'}
                            onClick={() => {
                              showDialog({
                                title: '第三层',
                                onConflict: modalConflict.handlers.mask,
                                content: <div className="dialog-content dialog-content-bottom">第三层</div>,
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
        遮罩互斥
      </Button>
    </DemoBlock>
  </>
)
