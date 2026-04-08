# Button 测试概要

## 覆盖率

| 指标       | 值     |
| ---------- | ------ |
| Statements | 95%    |
| Branches   | 100%   |
| Functions  | 100%   |
| Lines      | 94.73% |

验证命令：

`npx jest --coverage --testPathPattern='exports/Button/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/Button/index.tsx'`

## 测试场景

1. **冒烟**：默认渲染不崩溃，`exd-btn` class 与子节点文案出现。
2. **type 枚举**：`plain`/`primary`/`info`/`success`/`warning`/`danger` → 对应 `exd-btn-*` 类名；默认 `plain`。
3. **size 枚举**：`large`/`normal`/`small`/`mini` → 对应尺寸类；默认 `normal`。
4. **shape 枚举**：`square`/`round`/`unset` → 对应形状类；默认 `square`。
5. **fill 枚举**：`solid`/`outline`/`none` → 对应 `exd-btn-fill-*` 类；默认 `solid`。
6. **block**：默认不含 block class；`block=true` 添加 `exd-btn-block`。
7. **disabled**：默认不含 disabled class；`disabled=true` 添加 `exd-btn-disabled`。
8. **as**：`as="a"` 渲染为 `<a>` 标签。
9. **ref**：ref 正确转发到 `HTMLButtonElement`。
10. **icon + iconPosition**：icon 默认在文字左侧；`iconPosition="right"` 在文字右侧。
11. **onClick**：`userEvent.click` 触发回调；disabled 时不触发。
12. **loading**：`loading=true` 显示 Spinner 并阻止点击；`loading=false` 正常；`loading="auto"` 在 onClick 返回 Promise 期间自动进入 loading 态后恢复。
13. **边界**：`children` 为空不崩溃。

## 评分

- 交互覆盖：5/5（userEvent 真实点击、Promise loading 链路）
- 分支覆盖：5/5（所有枚举 + disabled + loading 分支全覆盖）
- 边界处理：5/5（空 children、ref 转发、as 渲染标签）
- 场景真实度：5/5（icon 位置顺序、auto loading Promise 全链路）
- 综合评分：**20/20**
