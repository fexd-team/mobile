# Radio 测试概要

## 覆盖率

定向采集：`packages/mobile/src/exports/Radio/index.tsx`（本套件同时执行 `Radio.Group` 等用例；上表**仅**统计默认导出组件入口文件，不含 `Group/index.tsx`）。

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

## 测试场景

1. **结构与文案**：渲染 `<Radio>选项</Radio>` → wrapper/label/icon/content 类名齐全；子文案可见。
2. **命名导出**：`prefix`、`defaultIcon` 可导入；`defaultIcon(true)` 可渲染。
3. **checked 样式**：`checked` true/false → active 类名随状态变化。
4. **disabled / block**：对应修饰类出现在 wrapper。
5. **description**：无则不渲染描述节点；有则 `.exd-radio-description` 文案正确。
6. **icon**：节点型 icon 渲染；函数型 icon 随 `checked` 渲染不同内容。
7. **className / label 透传**：`className` 合并到 wrapper；`htmlFor`/`id` 等到 label。
8. **userEvent 点击**：非受控点击 → `onChange(true)`；`disabled` 不触发。
9. **非受控切换**：`defaultChecked={false}` 双次点击 → active 类来回切换。
10. **受控行为**：仅 `checked={false}` 点击不自切；`checked`+`onChange` 与外部 state 联动。
11. **Group 互斥**：`defaultValue` + 子项 `value` → 点击 B 后仅 B 为 active 且 `onChange` 为对应值。
12. **Group 再点已选**：保持选中且行为稳定。
13. **Group disabled**：整组禁用 → 点击不触发 `onChange`。
14. **子项 disabled**：覆盖可点项，点击禁用项不改变选中。
15. **Group 继承与覆盖**：`block`/`icon` 下发；子项可覆盖为非 block 与自定义 icon。
16. **options 布局**：横向切换选中；`block` 时 `Space` 纵向。
17. **options 单项 disabled**：点击禁用项不触发 `onChange`。
18. **仅 children**：无 `options` 时子 Radio 正常渲染。
19. **受控 Group**：`value` + `onChange` 驱动选中项。
20. **API 与 ref**：`radioGroupContext`、`useRadioGroupContext` 存在；`Radio.Group` 传 ref 不崩溃；Radio `ref` 指向 `LABEL`。

## 评分

- 交互覆盖：5/5（`userEvent` 覆盖单选与 Group）
- 分支覆盖：5/5（定向 `index.tsx` 全绿，Group 行为由集成用例覆盖）
- 边界处理：4/5（禁用、受控、options 边界较全；未单独跑空 options 等极端）
- 场景真实度：5/5（与表单单选/选项组一致）
- 综合评分：19/20
