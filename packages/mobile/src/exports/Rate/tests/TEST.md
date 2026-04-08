# Rate 测试概要

## 覆盖率

定向命令：`npx jest --coverage --testPathPattern='exports/Rate/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/Rate/index.tsx'`

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

（针对 `packages/mobile/src/exports/Rate/index.tsx` 单文件收集。）

## 测试场景

1. **冒烟**：默认渲染 `.exd-rate` 存在；命名导出 `prefix` 与类名前缀一致。
2. **Props**：`count`、`character`、`disabled`、`readOnly`、`size`（含 `default`）、`className` 的 DOM/类名表现。
3. **ref**：`forwardRef` 指向容器根节点。
4. **鼠标交互**：`mouseDown` 根据 `getBoundingClientRect` 与 `clientX` 计算评分并 `onChange`；在 `document.documentElement` 上 `mouseMove` 拖拽更新；`mouseUp` 结束手势。
5. **allowHalf**：半星舍入路径、`mouseMove` 半星结果、`.exd-rate-character-half` 渲染。
6. **阻断**：`disabled` / `readOnly` 不触发 `onChange`；只读模式下 `onStart` 未置 `touchingRef` 时后续 `mouseMove` 走 `applyTouch` 早退（与 `useTouch` 仍派发 move 的组合行为）。
7. **受控与非受控**：`defaultValue` 与 `value` + `rerender`。
8. **边界**：`value === 0`、`value === count`、横向超出 clamp、`clientX === 0`。
9. **节流**：多次 `mouseMove` 后 `mouseUp`，`runOnlyPendingTimers` 后 `onChange` 调用次数稳定。

## 评分

- 交互覆盖：5/5（含 `mouseDown` → `mouseMove` on `document` → `mouseUp` 与 `jest.advanceTimersByTime` 配合 `useTouch` 节流）
- 分支覆盖：5/5（`allowHalf`、`disabled`/`readOnly`、`applyTouch` 早退、`useIOControl` 同值跳过等均有对应场景）
- 边界处理：5/5（0、满星、clamp、只读 move 早退）
- 场景真实度：5/5（贴近评分条拖拽与只读展示）
- **综合评分：20/20**

## 未覆盖说明

无。当前单文件语句/分支/函数/行均为 100%。
