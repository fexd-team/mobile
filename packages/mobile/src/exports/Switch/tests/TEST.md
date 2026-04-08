# Switch 测试概要

## 覆盖率

以下数据来自定向采集（仅统计 `exports/Switch/index.tsx`，避免全量 `collectCoverageFrom` 下未加载文件显示为 0% 的干扰）：

```bash
npx jest --coverage --testPathPattern='exports/Switch/tests' --no-silent \
  --collectCoverageFrom='packages/mobile/src/exports/Switch/index.tsx'
```

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

说明：当前 Istanbul 对该文件记录的 branch 点为 0，分支列显示为 100%（N/A）。

## 源码与类型要点

- **type.tsx 主要 props**：`checked`、`defaultChecked`（经 `useIOControl`）、`children`、`onChange(checked: boolean)`、`ref`，以及 `HTMLLabelElement` 上除 `defaultValue`/`onChange` 外的透传属性（如 `className`、`disabled`、`id`、`data-*` 等）。**无 `loading` 专用 prop**。
- **index.tsx 分支**：`className` 有无（`classnames`）；`checked` 真假（`--checked` 修饰类）；`input` 的 `onChange` 中读取 `e.target.checked` 并 `setValue`；`label` 上显式 `onChange={undefined}` 覆盖透传的 `onChange`。

## 测试场景

1. **导出 prefix**：命名导出与根类名前缀一致。
2. **冒烟**：`defaultChecked={false}` 下渲染不崩溃，存在 checkbox 与 `.exd-switch__container`。
3. **展示**：受控 `checked` true/false 与样式类；非受控 `defaultChecked` 真/假。
4. **className**：自定义合并；`undefined` / `null` 不导致崩溃。
5. **透传**：`data-testid`、`id`、`disabled` 落在 `label`。
6. **children**：传入不抛错；当前实现不将 `children` 渲染进 DOM。
7. **userEvent**：点击 `label`、点击 `checkbox`；`onChange` 参数 true/false。
8. **禁用交互**：在测试中将原生 `input.disabled = true` 后，`userEvent` 点击不触发 `onChange`（因 `disabled` 仅透传到 `label`，用原生 checkbox disabled 验证「禁用阻断」语义）。
9. **受控**：仅 `checked` 无 `onChange` 点击不切换；`checked` + `onChange` 双次点击切换；`checked` 优先于 `defaultChecked`。
10. **非受控**：`defaultChecked` + 点击切换。
11. **fireEvent**：`fireEvent.click(checkbox)` 触发回调链路。
12. **ref**：转发到 `label`。

## 评分

- 交互覆盖：5/5（`userEvent` 点击 label/checkbox，多步受控切换）
- 分支覆盖：5/5（checked 真/假、className、透传、事件路径均有覆盖）
- 边界处理：4/5（`null`/`undefined` className、children；未测 `filterIOValue` 等 IO 扩展，Switch 未暴露）
- 场景真实度：4/5（与典型表单开关一致；`loading` 非本组件 API，未编造）
- **综合评分：18/20**

## 未覆盖说明（如有）

- 组件未实现 `loading` prop；测试仅覆盖 `type.tsx` / 实现中真实存在的 API。
- 全仓库默认 `jest --coverage` 的 summary 为所有 `exports/*/index` 聚合，单测套件不会执行未引用组件，表中其它组件常为 0%；评估 Switch 请以本文「定向 collectCoverageFrom」为准。
