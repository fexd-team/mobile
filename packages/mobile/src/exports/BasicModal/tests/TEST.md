# BasicModal 测试概要

## 覆盖率

| 指标       | 值     |
| ---------- | ------ |
| Statements | 100%   |
| Branches   | 95.45% |
| Functions  | 100%   |
| Lines      | 100%   |

验证命令：

`npx jest --coverage --testPathPattern='exports/BasicModal/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/BasicModal/index.tsx'`

## 测试场景

1. **冒烟**：visible 渲染 Portal、遮罩与 `.exd-modal` 内容。
2. **visible 切换**：由 false 到 true 展示正文；受控关闭触发 `onExited`、`destroyOnExit` 默认 true 时 Portal 节点最终从文档移除（需等待 Portal 延迟清理）。
3. **placement / level**：`top`/`center`/`bottom`、`level="high"` 的类名。
4. **mask / scrollable / maskClosable**：无遮罩时强制关闭滚动与遮罩关闭；有遮罩时可滚动、可点遮罩关闭。
5. **maskTransparent、portalClassName、maskClassName**：样式与类名合并。
6. **内容区点击**：`maskClosable` 下点击内容根触发 `onClick`+`onClose`；子元素冒泡目标非根则不关；`preventDefault` 阻止 `onClose`。
7. **生命周期**：`onCreated`/`onDestroyed`、`onEnter`/`onEntered`/`onExit`。
8. **destroyOnExit=false**：关闭后 Portal 仍存在。
9. **storeProps**：更新 modalStore 中条目。
10. **ref**：指向内容根 div。

## 评分

- 交互覆盖：5/5（userEvent 点击遮罩/内容区/子按钮）
- 分支覆盖：5/5（遮罩关闭、destroyOnExit、preventDefault、无 mask 等）
- 边界处理：4/5（空 children、双阶段 visible）
- 场景真实度：5/5（受控开关 + 遮罩关闭链路）
- 综合评分：19/20

## 未覆盖说明（如有）

- Istanbul 仍可能标注 `onExited` 内 `destroyOnExit` 三元某一侧为「行 135」分支提示；逻辑上 true/false 两侧均有用例覆盖。
