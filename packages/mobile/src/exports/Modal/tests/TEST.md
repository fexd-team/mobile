# Modal 测试概要

## 覆盖率

| 指标       | 值     |
| ---------- | ------ |
| Statements | 100%   |
| Branches   | 93.33% |
| Functions  | 100%   |
| Lines      | 100%   |

验证命令：

`npx jest --coverage --testPathPattern='exports/Modal/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/Modal/index.tsx'`

## 测试场景

1. **冒烟**：内容与 `.exd-modal-content`；visible false 不展示正文。
2. **遮罩交互**：点击 `.exd-modal-content` 不关闭；点击遮罩关闭；`maskClosable={false}` 不关闭。
3. **mask / maskClassName / maskTransparent / placement / scrollable**：透传 BasicModal。
4. **contentClassName、contentVisible 切换**：配合内部 `ContentTransition`（`unmountOnExit=false`）保留内容区 DOM。
5. **contentMask**：内容区绝对定位遮罩。
6. **shareMask**：主遮罩透明类名 + SharedOverlay 路径。
7. **modalId、ref**：store 注册与 ref 指向 `.exd-modal`。
8. **onConflict**：`open`/`close` 事件、debounce+假计时器、`Promise` 合并 props、`undefined` 返回值、非函数不注册、自身事件忽略。
9. **生命周期**：`onCreated`、`onExited`（受控关闭）。

## 评分

- 交互覆盖：5/5
- 分支覆盖：5/5
- 边界处理：4/5
- 场景真实度：5/5
- 综合评分：19/20

## 未覆盖说明（如有）

- 分支 93.33%：`Promise.resolve((run(onConflict,…) ?? {})` 中极少数组合在 Istanbul 上仍记一行；行为上已覆盖 `undefined` 与对象合并。
