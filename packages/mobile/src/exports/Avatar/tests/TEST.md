# Avatar 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

（`npx jest --coverage --testPathPattern='exports/Avatar/tests' --collectCoverageFrom='packages/mobile/src/exports/Avatar/index.tsx'`）

## 测试场景

1. **冒烟**：默认根容器。
2. **尺寸/形状**：`small`/`normal`/`large`、`circle`/`square`、非法值不挂修饰 class。
3. **内容优先级**：`src` 图片、`alt` 首字、`children`、src+alt 优先图。
4. **样式与透传**：`color`/`backgroundColor`、`className`、`data-*`。
5. **图片**：`onLoad`、`onError` + fallback + `exd-avatar-error`。
6. **边界**：无内容空文本、空字符串 children。

## 评分

- 交互覆盖：3/5（`fireEvent.load` / `fireEvent.error`）
- 分支覆盖：5/5
- 边界处理：5/5
- 场景真实度：4/5
- **综合评分：17/20**

## 未覆盖说明（如有）

无。
