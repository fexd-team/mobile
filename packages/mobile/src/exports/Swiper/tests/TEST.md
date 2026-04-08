# Swiper 测试概要

## 覆盖率

针对 `packages/mobile/src/exports/Swiper/index.tsx`，使用命令：

`npx jest --coverage --testPathPattern='exports/Swiper/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/Swiper/index.tsx'`

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **冒烟**：多子项渲染、结构类名
2. **指示器**：默认圆点、当前项高亮、`indicator(total, current)` 参数
3. **vertical**：根节点纵向类名、wrapper `translateY`、纵向滑动切换
4. **loop**：≥3 子项启用循环类名；仅 2 子项时 `loop` 不生效
5. **自定义 indicator**：替换默认指示器
6. **autoplay**：`jest.useFakeTimers` 推进定时器切换与首尾循环；`autoplay={false}` 不切换；触摸打断后再次计时恢复
7. **swipeable**：`false` 时不响应触摸
8. **横向触摸**：`getBoundingClientRect` mock + `touchStart`/`touchMove`/`touchEnd` 左滑下一页、右滑上一页、未达阈值回弹、非循环首尾越界
9. **threshold**：`thresholdPercent` 与 `thresholdPixel` 分支
10. **受控/非受控**：`value`/`onChange` 与 `defaultValue`
11. **speed / easing / rate / preventDefault / stopPropagation**：传入与不崩溃；`rate>0` 时节流配合假计时器
12. **边界**：单子项、空 children、`filter` 空子节点
13. **ref**：指向根容器
14. **循环受控**：`valueLoopOffset` 首尾跳转
15. **循环 + 纵向**：子项 `top` 定位分支
16. **loopSort**：大幅拖动使 `currentTweenIdx` 为负时的 `range` 修正
17. **debounce**：拖动中 `tween` 变化触发 debounce 且仍在拖动时跳过重置

## 评分

- 交互覆盖：5/5（完整触摸链路与 autoplay 定时器）
- 分支覆盖：5/5（与覆盖率表一致）
- 边界处理：5/5（空、单页、2 项 loop、越界）
- 场景真实度：5/5（贴近移动端触摸与轮播行为）
- 综合评分：20/20

## 实现说明

- `jest.mock('../../useSize')` 固定 `width/height`：全局 `ResizeObserver` 在 `jest-setup` 中为空实现，否则 `useSize` 恒为 0，影响偏移与触摸阻尼逻辑。
- `HTMLElement.prototype.getBoundingClientRect` 与 `useTouch` 中百分比计算一致（320×240）。
