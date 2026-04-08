# Flex 测试概要

## 覆盖率

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

（命令：`npx jest --coverage --testPathPattern='exports/Flex/tests' --collectCoverageFrom='packages/mobile/src/exports/Flex/index.tsx'`）

## 测试场景

1. **冒烟**：默认 `Flex` 渲染根 `.exd-flex` 与子节点。
2. **子节点数量**：无子 / 单子 / 多子均不崩溃。
3. **wrap**：`wrap=false` 出现 `exd-flex-no-wrap`，默认不出现。
4. **align**：`top` / `middle` / `bottom` 修饰类。
5. **justify**：`start` / `end` / `center` / `space-around` / `space-between` 修饰类。
6. **className**：合并到根节点。
7. **ref**：转发到根 `div`。
8. **复合**：`Flex.Item` 与 Context 相关 props（`targetRef`、`smValue` 等）传入不崩溃。

## 评分

- 交互覆盖：3/5（布局组件以静态结构断言为主）
- 分支覆盖：5/5
- 边界处理：4/5（空子、多子、wrap 默认与关闭）
- 场景真实度：4/5（对齐文档常用 flex 布局用法）
- 综合评分：16/20

## 未覆盖说明（如有）

无（当前 `index.tsx` 全覆盖）。
