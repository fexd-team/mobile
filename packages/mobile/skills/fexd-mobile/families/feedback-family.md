# Feedback 家族

@fexd/mobile 的反馈体系包含命令式 API 和声明式组件两类。

## 家族成员

### 命令式 API（推荐优先使用）

| API         | 定位     | 阻断交互 | 自动消失    | 典型场景                                 |
| ----------- | -------- | -------- | ----------- | ---------------------------------------- |
| **toast**   | 轻提示   | 否       | 默认 1800ms | 操作成功/失败提示                        |
| **notify**  | 通知条   | 否       | 默认 2600ms | 带 info/success/warning/error 图标的通知 |
| **loading** | 加载遮罩 | 是       | 需手动 hide | 异步操作期间的阻断式加载                 |

### 声明式组件

| 组件                | 定位       | 典型场景                     |
| ------------------- | ---------- | ---------------------------- |
| **Spinner**         | 加载指示器 | 非阻断加载，嵌入页面局部区域 |
| **FullpageSpinner** | 全屏加载   | 页面级加载等待               |
| **Empty**           | 空状态     | 数据为空时的占位             |
| **Result**          | 结果页     | 流程结束的结果展示           |
| **ProgressBar**     | 进度条     | 进度展示                     |
| **Alert**           | 警告提示条 | 页面内警告/提示信息          |
| **Badge**           | 徽标/角标  | 数量提示、状态标记           |
| **Fallback**        | 加载降级   | Suspense fallback            |

## 选型决策

### 操作反馈

```
操作成功/失败 → toast.success / toast.fail
需要带类型图标 → notify.success / notify.warning / notify.error
异步操作阻断 → loading.show / loading.hide（成对调用）
```

### 加载状态

```
阻断式（全局遮罩）→ loading 命令式 API
非阻断式（局部加载）→ Spinner 组件
页面级加载等待 → FullpageSpinner 组件
React Suspense 降级 → Fallback 组件
```

### 空结果

```
数据为空 → Empty 组件
流程结果 → Result 组件
```

## toast vs notify

|          | toast                  | notify                                   |
| -------- | ---------------------- | ---------------------------------------- |
| 方法     | info/success/warn/fail | info/success/warning/error               |
| 默认时长 | 1800ms                 | 2600ms                                   |
| 图标     | 无/简单图标            | 有类型图标（info/success/warning/error） |
| 位置     | 页面中央               | 页面顶部                                 |
| 场景     | 简短操作反馈           | 需要类型区分的通知                       |

**注意**方法名差异：toast 用 `warn`，notify 用 `warning`。

## loading 使用要点

```tsx
// 必须成对调用（内部引用计数）
loading.show()
try {
  await fetchData()
} finally {
  loading.hide()
}

// 不要忘记 hide，否则遮罩不会消失
```

## 常见错误

| 错误                                     | 正确                              |
| ---------------------------------------- | --------------------------------- |
| 用 `Dialog` 做轻提示                     | 用 `toast`                        |
| 用 `toast` 做带类型图标的通知            | 用 `notify`                       |
| `loading.show()` 后忘记 `loading.hide()` | 必须成对调用，推荐 try/finally    |
| 用 `toast` 做阻断式加载                  | 用 `loading`                      |
| 用 `Spinner` 做全局加载遮罩              | 用 `loading` 或 `FullpageSpinner` |
| `toast.warning()`                        | `toast.warn()`（注意方法名）      |
