import { lazy } from 'react'

export default [
  {
    name: '布局',
    children: [
      { name: 'Cell 单元格', demo: lazy(() => import('@fexd/mobile/src/exports/Cell/demos/demo1')) },
      { name: 'Collapse 折叠', demo: lazy(() => import('@fexd/mobile/src/exports/Collapse/demos/demo1')) },
      { name: 'Divider 分割线', demo: lazy(() => import('@fexd/mobile/src/exports/Divider/demos/demo1')) },
      { name: 'Grid 宫格', demo: lazy(() => import('@fexd/mobile/src/exports/Grid/demos/demo1')) },
      { name: 'ScrollView 滚动区域', demo: lazy(() => import('@fexd/mobile/src/exports/ScrollView/demos/demo1')) },
      { name: 'Space 间距', demo: lazy(() => import('@fexd/mobile/src/exports/Space/demos/demo1')) },
      { name: 'View 基础视图', demo: lazy(() => import('@fexd/mobile/src/exports/View/demos/demo1')) },
      { name: 'Watermark 水印', demo: lazy(() => import('@fexd/mobile/src/exports/Watermark/demos/demo1')) },
    ],
  },

  {
    name: '导航',
    children: [
      {
        name: 'AnimatedSwitch 路由动画',
        // @ts-ignore
        demo: lazy(() => import('@fexd/mobile-router5/src/exports/AnimatedSwitch/demos/wrap-routes')),
      },
      { name: 'NavBar 导航栏', demo: lazy(() => import('@fexd/mobile/src/exports/NavBar/demos/demo1')) },
      // { name: 'NavBarLayout 路由布局' },
      { name: 'TabBar 标签栏', demo: lazy(() => import('@fexd/mobile/src/exports/TabBar/demos/demo1')) },
      // { name: 'TabBarLayout 路由布局' },
      { name: 'Tabs 选项卡', demo: lazy(() => import('@fexd/mobile/src/exports/Tabs/demos/demo1')) },
    ],
  },

  {
    name: '展示',
    children: [
      { name: 'Alert 警告', demo: lazy(() => import('@fexd/mobile/src/exports/Alert/demos/demo1')) },
      { name: 'Avatar 头像', demo: lazy(() => import('@fexd/mobile/src/exports/Avatar/demos/demo1')) },
      { name: 'Badge 徽章', demo: lazy(() => import('@fexd/mobile/src/exports/Badge/demos/demo1')) },
      { name: 'Empty 缺省页', demo: lazy(() => import('@fexd/mobile/src/exports/Empty/demos/demo1')) },
      { name: 'Icon 图标', demo: lazy(() => import('@documents/exports/display/Icon/demo')) },
      { name: 'Iconfont 字体图标', demo: lazy(() => import('@fexd/mobile/src/exports/Iconfont/demos/demo1')) },
      { name: 'NotFound 未找到', demo: lazy(() => import('@fexd/mobile/src/exports/NotFound/demos/demo1')) },
      { name: 'ProgressBar 进度条', demo: lazy(() => import('@fexd/mobile/src/exports/ProgressBar/demos/demo1')) },
      { name: 'Spinner 加载指示器', demo: lazy(() => import('@fexd/mobile/src/exports/Spinner/demos/demo1')) },
      { name: 'Steps 步骤条', demo: lazy(() => import('@fexd/mobile/src/exports/Steps/demos/demo1')) },
      { name: 'Swiper 轮播', demo: lazy(() => import('@fexd/mobile/src/exports/Swiper/demos/demo1')) },
      { name: 'Timeline 时间线', demo: lazy(() => import('@fexd/mobile/src/exports/Timeline/demos/demo1')) },
      {
        name: 'Transition 动画组件',
        demo: lazy(() => import('@fexd/mobile/src/exports/TransitionFade/demos/demo1')),
        size: 'TransitionFade',
      },
    ],
  },

  {
    name: '输入',
    children: [
      { name: 'Button 按钮', demo: lazy(() => import('@fexd/mobile/src/exports/Button/demos/demo1')) },
      { name: 'Checkbox 多选框', demo: lazy(() => import('@fexd/mobile/src/exports/Checkbox/demos/demo1')) },
      { name: 'DatePicker 时间选择器', demo: lazy(() => import('@fexd/mobile/src/exports/DatePicker/demos/demo1')) },
      { name: 'Form 表单', demo: lazy(() => import('@fexd/mobile/src/exports/Form/demos/demo1')) },
      { name: 'Input 输入框', demo: lazy(() => import('@fexd/mobile/src/exports/Input/demos/demo1')) },
      { name: 'Picker 选择器', demo: lazy(() => import('@fexd/mobile/src/exports/Picker/demos/demo1')) },
      { name: 'Rate 评分', demo: lazy(() => import('@fexd/mobile/src/exports/Rate/demos/demo1')) },
      { name: 'Slider 滑块', demo: lazy(() => import('@fexd/mobile/src/exports/Slider/demos/demo1')) },
      { name: 'Stepper 步进器', demo: lazy(() => import('@fexd/mobile/src/exports/Stepper/demos/demo1')) },
      { name: 'Switch 开关', demo: lazy(() => import('@fexd/mobile/src/exports/Switch/demos/demo1')) },
      { name: 'TimePicker 时间选择器', demo: lazy(() => import('@fexd/mobile/src/exports/TimePicker/demos/demo1')) },
    ],
  },

  {
    name: '反馈',
    children: [
      { name: 'ActionSheet 动作面板', demo: lazy(() => import('@fexd/mobile/src/exports/ActionSheet/demos/demo1')) },
      { name: 'Dialog 对话框', demo: lazy(() => import('@fexd/mobile/src/exports/Dialog/demos/demo1')) },
      { name: 'loading 加载中', demo: lazy(() => import('@fexd/mobile/src/exports/loading/demos/demo1')) },
      { name: 'Modal 模态框', demo: lazy(() => import('@fexd/mobile/src/exports/Modal/demos/demo1')) },
      { name: 'notify 消息', demo: lazy(() => import('@fexd/mobile/src/exports/notify/demos/demo1')) },
      { name: 'Overlay 遮罩层', demo: lazy(() => import('@fexd/mobile/src/exports/Overlay/demos/demo1')) },
      { name: 'Popup 弹出层', demo: lazy(() => import('@fexd/mobile/src/exports/Popup/demos/demo1')) },
      { name: 'toast 提示', demo: lazy(() => import('@fexd/mobile/src/exports/toast/demos/demo1')) },
    ],
  },

  {
    name: '其他',
    children: [
      { name: 'ErrorBoundary 错误边界', demo: lazy(() => import('@fexd/mobile/src/exports/ErrorBoundary/demos/demo1')) },
      { name: 'Portal 渲染视窗', demo: lazy(() => import('@fexd/mobile/src/exports/Portal/demos/demo1')) },
    ],
  },

  {
    name: '实验性',
    children: [
      { name: 'Breadcrumb 面包屑', demo: lazy(() => import('@fexd/mobile/src/exports/Breadcrumb/demos/demo1')) },
      { name: 'Card 卡片', demo: lazy(() => import('@fexd/mobile/src/exports/Card/demos/demo1')) },
      { name: 'CountDown 倒计时', demo: lazy(() => import('@fexd/mobile/src/exports/CountDown/demos/demo1')) },
      { name: 'Flex 弹性布局', demo: lazy(() => import('@fexd/mobile/src/exports/Flex/demos/demo1')) },
      { name: 'Image 图片', demo: lazy(() => import('@fexd/mobile/src/exports/Image/demos/demo1')) },
      { name: 'List 列表', demo: lazy(() => import('@fexd/mobile/src/exports/List/demos/demo1')) },
      { name: 'NoticeBar 提醒栏', demo: lazy(() => import('@fexd/mobile/src/exports/NoticeBar/demos/demo1')) },
      { name: 'Skeleton 骨架屏', demo: lazy(() => import('@fexd/mobile/src/exports/Skeleton/demos/demo1')) },
      { name: 'Tips 提示', demo: lazy(() => import('@fexd/mobile/src/exports/Tips/demos/demo1')) },
      { name: 'Video 视频', demo: lazy(() => import('@fexd/mobile/src/exports/Video/demos/demo1')) },
    ],
  },
]
