# Popup 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

验证命令：

`npx jest --coverage --testPathPattern='exports/Popup/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/Popup/index.tsx'`

## 测试场景

1. **冒烟**：Portal、`.exd-popup`、`.exd-popup-content`；visible false 无正文。
2. **Modal 透传**：`bottom` placement、mask、maskClosable、maskTransparent、scrollable、className。
3. **round**：`.exd-popup-round`。
4. **标题**：字符串与 ReactNode `title`；`headerLeft`/`headerRight` 函数形式；自定义 `header` 覆盖默认 NavBar。
5. **NavBar 交互**：`onHeaderLeftClick` / `onHeaderRightClick`（点击 `.exd-nav-bar-left` / `-right`）。
6. **contentClassName、modalId、ref**：类名合并、store、内容根 ref。
7. **生命周期**：受控关闭 `onExited`。

## 评分

- 交互覆盖：5/5
- 分支覆盖：5/5
- 边界处理：4/5
- 场景真实度：5/5
- 综合评分：19/20

## 未覆盖说明（如有）

- 无。
