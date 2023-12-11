---
group:
  title: 反馈
  path: /feedback

mobileDemoFixed: false
---

# Dialog 对话框 <ImportCost name="Dialog" />

## 效果演示

## <code src="./demos/demo1/index.tsx" />

---

## showDialog

`showDialog` 的属性和 `<Dialog />` 几乎完全相同，只是不需要手动定义 `visible`、`onClose`

而且 `children` 属性替换为了 `content`

具体可以参考 [命令式调用（函数式）](/#/exports/feedback/api-method-call)

---

## Dialog

<API identifier="Dialog" hideTitle src="./type.tsx" exports='["default"]'></API>

---

## DialogAction

<API identifier="DialogAction" hideTitle src="./type.tsx" exports='["DOC_PureDialogAction"]'></API>
