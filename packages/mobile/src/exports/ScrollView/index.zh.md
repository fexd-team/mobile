---
group:
  title: 布局
  path: /layout
---

# ScrollView 滚动区域 <ImportCost name="ScrollView" />

更详细文档与 demo 请进入这里：[CJY0208/tiny-scroll-listener](https://github.com/CJY0208/tiny-scroll-listener)

## 属性说明

| 属性 | 说明 | 类型 | 默认值 | 提供的值 |
| :-- | :-- | :-- | :-- | :-- |
| distanceToReachEnd | 触发触底函数的距离（单位 px） | number | 100 | - |
| distanceEvents | 任意滚动位置函数相关，常见场景为滚动到某距离时出现“回到顶部”按钮 | array | [] | 下面会详说 |
| shadow | 滚动时是否出现上下阴影边框 | array[boolean, boolean] | [false, false] | [true/false, true/false] |
| wrapperClassName | 最外层的 div 的 className | string | - | - |

### distanceEvents 的元素的属性

可设置多组监听，所以 `distanceEvents` 为数组。

任意滚动位置函数相关，常见场景为滚动到某距离时出现“回到顶部”按钮。

`onGoingIn`、`onGoingOut` 只在值变迁瞬间执行一次，不会执行多次。

| 属性       | 说明                                                | 类型               | 默认值 | 提供的值 |
| :--------- | :-------------------------------------------------- | :----------------- | :----- | :------- |
| distance   | 触发的边界距离，垂直方向是距离顶部的距离（单位 px） | number \| function | -      | -        |
| onGoingIn  | 滚动距离低于 distance 时触发                        | function           | -      | -        |
| onGoingOut | 滚动距离高于 distance 时触发                        | function           | -      | -        |

## 事件属性说明

| 事件名称     | 说明                                                                       | 回调参数            |
| :----------- | :------------------------------------------------------------------------- | :------------------ |
| onEndReached | 到达滚动区域底部会触发的钩子函数，触发后会锁定，除非解锁，否则不会再次触发 | done 函数，用来解锁 |

## 代码示例

<code src="./demos/demo1/index.tsx" />
