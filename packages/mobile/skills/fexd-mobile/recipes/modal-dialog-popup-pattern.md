# Modal / Dialog / Popup 选型与组合模式

弹层是移动端最常见的交互之一。本 recipe 解决"该用哪种弹层"和"弹层+操作+反馈如何组合"。

## 选型速查

```
用户需要确认/取消？ → showDialog
底部弹出内容面板？ → showPopup
多选项操作菜单？ → showActionSheet
完全自定义内容？ → showModal
轻提示，自动消失？ → toast
带类型图标的通知？ → notify
阻断式加载？ → loading
```

## 最常见模式：确认 → 操作 → 反馈

```tsx
import { showDialog, toast, loading } from '@fexd/mobile'

async function handleDelete() {
  const controller = showDialog({
    title: '确认删除',
    content: '此操作不可撤销',
    actions: [
      {
        content: '取消',
        onClick: () => controller.close(),
      },
      {
        content: '删除',
        type: 'danger',
        onClick: () => {
          controller.close()
          performDelete()
        },
      },
    ],
  })
}

async function performDelete() {
  loading.show()
  try {
    await api.delete(id)
    toast.success('删除成功')
  } catch {
    toast.fail('删除失败')
  } finally {
    loading.hide()
  }
}
```

## showPopup：底部内容面板

```tsx
import { showPopup } from '@fexd/mobile'

const controller = showPopup({
  title: '筛选条件',
  round: true,
  style: { minHeight: '40%' },
  content: <FilterPanel onConfirm={() => controller.close()} />,
})
```

适合：筛选面板、详情面板、表单弹层等需要展示复杂内容的底部弹出。

## showActionSheet：操作菜单

```tsx
import { showActionSheet, toast } from '@fexd/mobile'

const controller = showActionSheet({
  title: '选择操作',
  actions: [
    {
      content: '拍照',
      onClick: () => {
        controller.close()
        takePhoto()
      },
    },
    {
      content: '从相册选择',
      onClick: () => {
        controller.close()
        pickImage()
      },
    },
    {
      content: '删除',
      type: 'danger',
      onClick: () => {
        controller.close()
        handleDelete()
      },
    },
  ],
})
```

适合：2-5 个操作选项，不需要复杂内容的场景。

## showModal：完全自定义

```tsx
import { showModal, TransitionSlideUp } from '@fexd/mobile'

const controller = showModal({
  placement: 'bottom',
  transition: TransitionSlideUp,
  maskClosable: true,
  content: <CustomContent onClose={() => controller.close()} />,
})
```

适合：Dialog/Popup/ActionSheet 都无法满足的自定义弹层需求。

## 声明式：持久弹层

```tsx
import { Dialog } from '@fexd/mobile'

const [visible, setVisible] = useState(false)
;<Dialog
  visible={visible}
  onClose={() => setVisible(false)}
  title="设置"
  actions={[{ content: '确定', onClick: () => setVisible(false) }]}
>
  内容
</Dialog>
```

适合：弹层需要跟随组件生命周期、频繁开关。

## Hook：绑定到特定容器

```tsx
import { useShowDialog } from '@fexd/mobile'

function MyComponent() {
  const [showDialog, stationNode] = useShowDialog()

  return (
    <div>
      <Button onClick={() => showDialog({ content: '来自 Hook 的弹窗' })}>弹窗</Button>
      {stationNode}
    </div>
  )
}
```

适合：需要将弹层挂载到特定容器而非全局。

## 多弹层组合

```tsx
// showDialog + showActionSheet 组合
async function handleItemAction() {
  const sheetController = showActionSheet({
    actions: [
      {
        content: '编辑',
        onClick: () => {
          sheetController.close()
          openEdit()
        },
      },
      {
        content: '删除',
        onClick: () => {
          sheetController.close()
          // 删除前再确认
          const dialogController = showDialog({
            title: '确认删除',
            content: '不可撤销',
            actions: [
              {
                content: '删除',
                type: 'danger',
                onClick: () => {
                  dialogController.close()
                  performDelete()
                },
              },
            ],
          })
        },
      },
    ],
  })
}
```

## 常见错误

| 错误                               | 正确                      |
| ---------------------------------- | ------------------------- |
| 用 `showModal` 做确认对话          | 用 `showDialog`，更简洁   |
| 用 `showDialog` 展示大量内容       | 用 `showPopup`            |
| 用 `showPopup` 做操作菜单          | 用 `showActionSheet`      |
| 声明式 + useState 管理一次性弹层   | 命令式 `showXxx()` 更简洁 |
| `loading.show()` 后不 `hide()`     | try/finally 保证成对      |
| 在 modalStore 监听中调用命令式 API | 禁止，会导致无限循环      |
