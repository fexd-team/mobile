---
group:
  title: 展示
  path: /display

mobileDemoFixed: false
---

# Result 结果页 <ImportCost name="Result" />

用于反馈一系列操作任务的处理结果。

## 使用说明

<code src="./demos/demo1/index.tsx" />

---

## API

| 属性        | 说明                                 | 类型                                        | 默认值 |
| :---------- | :----------------------------------- | :------------------------------------------ | :----- |
| className   | 自定义类名                           | String                                      | -      |
| status      | 结果状态                             | 'success' \| 'warning' \| 'error' \| 'info' | -      |
| icon        | 自定义图标，会覆盖 status 的默认图标 | ReactNode                                   | -      |
| title       | 标题文字                             | ReactNode                                   | -      |
| description | 描述文字                             | ReactNode                                   | -      |
| children    | 自定义内容，常用于放置操作按钮       | ReactNode                                   | -      |

---

## 状态说明

- **success**: 成功状态，使用 CheckmarkCircle 图标，绿色
- **warning**: 警告状态，使用 AlertCircle 图标，橙色
- **error**: 错误状态，使用 CloseCircle 图标，红色
- **info**: 信息状态，使用 InformationCircle 图标，蓝色

---

## 样式变量

<API identifier="ResultStyleVars" hideTitle src="./type.tsx" exports='["DOC_ResultStyleVars"]'></API>

---
