---
nav:
  title: 共建指南

title: 快捷命令
order: 21
---

## 快捷创建组件及文档

使用 `yarn new:component` 命令创建一个组件目录及初始文件，将自动进行组件导出

并会同时生成对应文档，默认为 `experimental` 实验类型

```bash
yarn new:component --name=<组件名>
```

将会得到如下输出

```bash
$ yarn new:component --name=Form
yarn run v1.22.10
$ node ./scripts/new-component/index.js --name=Form
Write: packages\mobile\src\exports\Form\index.tsx
Write: packages\mobile\src\exports\Form\style.less
Write: packages\mobile\src\exports\Form\type.ts
Write: docs\documents\exports\experimental\Form\demo\index.tsx
Write: docs\documents\exports\experimental\Form\demo\style.module.less
Write: docs\documents\exports\experimental\Form\index.md
Done in 0.46s.
```

---

## 查看每个组件大小

使用 `yarn size` 命令查看 `package/mobile` 中每个组件的 build 大小，需要先进行构建

```bash
yarn build # 如果已经构建过了，可以省略这一步
yarn size # 原理是对每一个导出启动一次 webpack 包分析，耗时稍长
```

将会得到如下输出

```bash
$ yarn size
yarn run v1.22.10
$ node ./scripts/size/index.js
[ESM] 18k -- DatePicker
[ESM] 17.7k -- TimePicker
[ESM] 14.7k -- Picker
[ESM] 12.4k -- AnimatedSwitch
[ESM] 11k -- loading
[ESM] 10.9k -- DatePickerView
[ESM] 10.7k -- TimePickerView
[ESM] 9.5k -- showPopup
[ESM] 9.5k -- toast
[ESM] 8.9k -- notify
[ESM] 8.8k -- showDialog
[ESM] 8.7k -- Popup
[ESM] 8.5k -- showModal
[ESM] 7.9k -- Dialog
[ESM] 7.6k -- Modal
[ESM] 7.5k -- PickerView
[ESM] 6.7k -- BasicModal
[ESM] 6.5k -- ErrorBoundary
[ESM] 5.7k -- Button
[ESM] 5.5k -- Fallback
[ESM] 5.5k -- TransitionSwitch
[ESM] 5.3k -- Tabs
[ESM] 5k -- Overlay
[ESM] 4.3k -- FullpageSpinner
[ESM] 4.3k -- createTransition
[ESM] 4.3k -- TransitionSlideDown
[ESM] 4.3k -- TransitionSlideUp
[ESM] 4.3k -- TransitionNone
[ESM] 4.2k -- TransitionFade
[ESM] 4.2k -- Spinner
[ESM] 4.2k -- ProgressBar
[ESM] 3.5k -- ScrollView
[ESM] 2.9k -- Steps
[ESM] 2.8k -- Grid
[ESM] 2.6k -- TabBar
[ESM] 2.5k -- List
[ESM] 2.4k -- Iconfont
[ESM] 2.4k -- Input
[ESM] 2.4k -- TextArea
[ESM] 2.4k -- NavBar
[ESM] 2.4k -- BasicInput
[ESM] 2.3k -- Breadcrumb
[ESM] 2.2k -- useTextFieldProps
[ESM] 2.2k -- MaterialLabel
[ESM] 2.1k -- Timeline
[ESM] 2.1k -- Card
[ESM] 2k -- Switch
[ESM] 1.9k -- Divider
[ESM] 1.9k -- BasicButton
[ESM] 1.8k -- NoticeBar
[ESM] 1.7k -- useScrollLock
[ESM] 1.7k -- Skeleton
[ESM] 1.6k -- useIOControl
[ESM] 1.6k -- createModel
[ESM] 1.5k -- modalStore
[ESM] 1.4k -- CountDown
[ESM] 1.4k -- ModalStation
[ESM] 1.3k -- modalConflict
[ESM] 1k -- Portal
[ESM] 886 -- useForcedUpdate
[ESM] 590 -- Field
[ESM] 589 -- Form
[ESM] 427 -- uniqueId
--------------------
[CJS] 20.2k -- DatePicker
[CJS] 19.9k -- TimePicker
[CJS] 18.6k -- AnimatedSwitch
[CJS] 16.8k -- Picker
[CJS] 12.7k -- loading
[CJS] 11.8k -- DatePickerView
[CJS] 11.6k -- TimePickerView
[CJS] 11.4k -- showPopup
[CJS] 11.3k -- toast
[CJS] 10.5k -- notify
[CJS] 10.4k -- showDialog
[CJS] 10.3k -- Popup
[CJS] 10k -- showModal
[CJS] 9.4k -- Dialog
[CJS] 8.9k -- Modal
[CJS] 8.4k -- PickerView
[CJS] 7.7k -- BasicModal
[CJS] 7.5k -- ErrorBoundary
[CJS] 6.5k -- Button
[CJS] 6.2k -- TransitionSwitch
[CJS] 6k -- Fallback
[CJS] 5.9k -- Tabs
[CJS] 5.6k -- Overlay
[CJS] 4.9k -- FullpageSpinner
[CJS] 4.8k -- ProgressBar
[CJS] 4.8k -- Spinner
[CJS] 4.5k -- TransitionSlideUp
[CJS] 4.5k -- TransitionNone
[CJS] 4.5k -- TransitionSlideDown
[CJS] 4.5k -- TransitionFade
[CJS] 4.4k -- createTransition
[CJS] 4.3k -- ScrollView
[CJS] 3.3k -- Grid
[CJS] 3.2k -- Steps
[CJS] 3.1k -- Input
[CJS] 3k -- BasicInput
[CJS] 3k -- TextArea
[CJS] 2.9k -- TabBar
[CJS] 2.9k -- List
[CJS] 2.8k -- Breadcrumb
[CJS] 2.8k -- NavBar
[CJS] 2.7k -- MaterialLabel
[CJS] 2.6k -- Iconfont
[CJS] 2.6k -- Switch
[CJS] 2.5k -- useTextFieldProps
[CJS] 2.3k -- Timeline
[CJS] 2.3k -- Card
[CJS] 2.1k -- Divider
[CJS] 2k -- BasicButton
[CJS] 2k -- createModel
[CJS] 2k -- modalStore
[CJS] 1.9k -- useScrollLock
[CJS] 1.9k -- NoticeBar
[CJS] 1.9k -- useIOControl
[CJS] 1.8k -- Skeleton
[CJS] 1.8k -- ModalStation
[CJS] 1.6k -- CountDown
[CJS] 1.4k -- modalConflict
[CJS] 1.2k -- Portal
[CJS] 914 -- useForcedUpdate
[CJS] 560 -- Field
[CJS] 558 -- Form
[CJS] 296 -- uniqueId
Done in 74.09s.
```
