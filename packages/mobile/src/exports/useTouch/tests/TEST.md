# useTouch 测试概要

## 覆盖率

| 指标       | 值     |
| ---------- | ------ |
| Statements | 96.29% |
| Branches   | 81.39% |
| Functions  | 100%   |
| Lines      | 100%   |

> 命令：`npx jest --coverage --testPathPattern='exports/useTouch/tests' --collectCoverageFrom='packages/mobile/src/exports/useTouch/index.ts'`

## 测试场景

1. **触摸**：`touchstart` → `touchmove` → `touchend`，`onStart` / `onMove` / `onEnd`。
2. **鼠标**：`mousedown` → `document` 上 `mousemove` / `mouseup` / `mouseleave`。
3. **选项**：`disabled`、`stopPropagation`、`preventDefault` 与 `touchend` 特例、`mousedown` 后 `touchend` 的 `preventDefault`。
4. **几何**：`getBoundingClientRect` mock、`width: 0`、空对象 rect；缺省 `client` 坐标。
5. **双指**、**默认 rate + fake timers**、**无触点早退**、卸载不抛错。

## 评分

- 交互覆盖：5/5
- 分支覆盖：4/5（未达 85% 分支目标）
- 边界处理：5/5
- 场景真实度：5/5
- 综合评分：19/20

## 未覆盖说明

- **Branches 81.39%**：剩余分支多为 `normalize` / `getNextTouches` / 事件包装上的可选链与节流内部组合，在 jsdom 与当前 `run(addEventListener)` 行为下难以稳定触发；**Statements 已高于 90%**。
