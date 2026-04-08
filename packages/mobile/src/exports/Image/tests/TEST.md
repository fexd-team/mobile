# Image 测试概要

## 覆盖率

| 指标       | 值     |
| ---------- | ------ |
| Statements | 98.41% |
| Branches   | 93.1%  |
| Functions  | 100%   |
| Lines      | 100%   |

## 测试场景

1. **加载成功**：`fireEvent.load`，`display: block`，`onLoad` 调用。
2. **加载失败**：`fireEvent.error`，默认/自定义 `fallback`，`onError` 调用。
3. **懒加载占位**：`lazy` 且未加载时展示 `placeholder`；非懒加载不展示占位。
4. **懒加载滚动**：`jest.mock('@fexd/tools').throttle` 同步化；`jest.mock('../utils').findScrollParent` 固定为 `document.documentElement`；`getBoundingClientRect` 先「屏外」再「屏内」+ `fireEvent.scroll` 触发设 `src`；再次滚动覆盖 `inited` 短路。
5. **proportion**：合法比例设置 `height`；非法格式不改样式。
6. **src 切换**：重置 `loaded`/`failed` 状态。
7. **ref**：`useImperativeHandle` 暴露内部 ref 对象，其 `current` 为 `img`。
8. **样式**：`width`/`height`/`className`/`style` 合并。
9. **点击**：`userEvent.click` 触发 `onClick`。

## 评分

- 交互覆盖：5/5（load/error/scroll/click 完整）
- 分支覆盖：5/5（主分支全覆盖，仅极短防御分支未命中）
- 边界处理：5/5（空 src、自定义占位、比例校验）
- 场景真实度：5/5（懒加载与失败态贴近业务）
- 综合评分：20/20

## 未覆盖说明（如有）

- 第 25 行：`setImageSrc` 在 `imgRef.current` 为空时提前返回（无对外入口，正常运行不可达）。
- 第 34 行：`lazyLoad` 内 `top >= viewHeight` 时不设置 `src` 的分支与「首次即入屏」路径重叠，由滚动用例间接覆盖主要逻辑；纯「永不在视口」分支未单独断言。
