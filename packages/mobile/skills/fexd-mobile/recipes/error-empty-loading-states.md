# 错误、空状态、加载状态

移动端页面需要处理三种非正常状态：加载中、数据为空、操作出错。本 recipe 提供统一处理模式。

## 加载状态

### 阻断式（全局遮罩）

异步操作期间阻塞用户交互：

```tsx
import { loading } from '@fexd/mobile'

loading.show()
try {
  await fetchData()
} finally {
  loading.hide()
}
```

- 适用：提交、删除等需要等待的操作
- 注意：`show/hide` 必须成对调用（引用计数机制）

### 页面级加载

```tsx
import { FullpageSpinner } from '@fexd/mobile'

if (loading) return <FullpageSpinner />
```

- 适用：页面首次加载

### 局部加载

```tsx
import { Spinner } from '@fexd/mobile'
;<div style={{ textAlign: 'center', padding: 20 }}>
  <Spinner />
</div>
```

- 适用：区域加载，不阻断其他交互

### React Suspense 降级

```tsx
import { Fallback } from '@fexd/mobile'
;<Suspense fallback={<Fallback />}>
  <MyComponent />
</Suspense>
```

## 空状态

```tsx
import { Empty } from '@fexd/mobile'

if (!data.length) return <Empty description="暂无数据" />
```

### 带操作按钮的空状态

```tsx
<Empty description="暂无订单">
  <Button type="primary" size="small" onClick={handleCreate}>
    去下单
  </Button>
</Empty>
```

## 错误状态

### 操作错误提示

```tsx
import { toast } from '@fexd/mobile'

try {
  await api.submit(data)
  toast.success('提交成功')
} catch (error) {
  toast.fail(error.message || '操作失败')
}
```

### 结果页错误

```tsx
import { Result } from '@fexd/mobile'

if (error) return <Result status="error" title="加载失败" description={error.message} />
```

### 警告提示条

```tsx
import { Alert } from '@fexd/mobile'
;<Alert type="warning">数据可能不完整，请核实</Alert>
```

4 种 type：info / success / warning / error。

## 完整模式：页面级三态

```tsx
import { FullpageSpinner, Empty, Result } from '@fexd/mobile'
import { toast, loading } from '@fexd/mobile'

function DataPage() {
  const { data, loading: fetching, error, refetch } = useFetch()

  if (fetching) return <FullpageSpinner />
  if (error) return <Result status="error" title="加载失败" description={error.message} />
  if (!data?.length) return <Empty description="暂无数据" />

  return (
    <div>
      {data.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}
```

### 带刷新的空状态/错误状态

```tsx
if (error)
  return (
    <Result status="error" title="加载失败" description={error.message}>
      <Button type="primary" size="small" onClick={refetch}>
        重试
      </Button>
    </Result>
  )

if (!data?.length)
  return (
    <Empty description="暂无数据">
      <Button type="primary" size="small" onClick={refetch}>
        刷新
      </Button>
    </Empty>
  )
```

## 列表操作反馈

### 删除项目

```tsx
async function handleDelete(id: string) {
  const controller = showDialog({
    title: '确认删除',
    content: '此操作不可撤销',
    actions: [
      {
        content: '删除',
        type: 'danger',
        onClick: () => {
          controller.close()
          doDelete(id)
        },
      },
    ],
  })
}

async function doDelete(id: string) {
  loading.show()
  try {
    await api.delete(id)
    toast.success('删除成功')
    refetch()
  } catch {
    toast.fail('删除失败')
  } finally {
    loading.hide()
  }
}
```

## 不可用的组件

| 需求     | 禁用                | 替代                      |
| -------- | ------------------- | ------------------------- |
| 骨架屏   | Skeleton（开发中）  | Spinner / FullpageSpinner |
| 提示条   | NoticeBar（开发中） | Alert                     |
| 全局提示 | Tips（开发中）      | toast / notify            |
