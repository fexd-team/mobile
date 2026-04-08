# Form 测试概要

## 覆盖率

针对 `packages/mobile/src/exports/Form/index.tsx`，命令：

```bash
npx jest --coverage --testPathPattern='exports/Form/tests' --no-silent --collectCoverageFrom='packages/mobile/src/exports/Form/index.tsx'
```

| 指标       | 值   |
| ---------- | ---- |
| Statements | 100% |
| Branches   | 100% |
| Functions  | 100% |
| Lines      | 100% |

（Jest 对该文件报告的 Branch 计数为 0/0，百分比记为 100%。）

## 测试场景

1. **导出 prefix**：断言 `exd-form` 前缀导出，覆盖模块级导出语句。
2. **冒烟**：`Form` + `Field` + `userEvent` 输入，值与 `form` 同步。
3. **无外部 form**：不传 `form` 时内部创建实例并可写入。
4. **validateOnChange 默认 true**：改值后自动校验并展示错误。
5. **validateOnChange false**：仅手动 `validate` 后展示错误。
6. **validateOnChange 切换**：父组件切换 prop 后，自动校验行为随之变化。
7. **Field 覆盖 validateOnChange**：字段级 `validateOnChange={false}` 覆盖表单级 `true`。
8. **strict true**：`getValues` 仅含已注册字段。
9. **strict false**：`getValues` 可保留 `defaultValues` 中未注册键。
10. **Form.useContextForm**：上下文实例 `setValue` 驱动 `Field` 展示。
11. **外部 setValue**：命令式 `form.setValue` 与 `Field` 展示同步。
12. **setValue / getValues**：字段内改值后 `getValues` 立即一致。
13. **多字段**：多 `Field` 同时存在时 `getValues` 聚合正确。
14. **点号字段名**：`user.name` / `user.age` 作为独立键注册与取值。
15. **条件卸载 Field**：卸载后目标节点不再渲染。
16. **子节点清空**：`Field` 仍挂载但 render 返回 `null` 时注销逻辑生效。
17. **reset**：恢复默认值且输入框回显一致。
18. **同步校验**：规则失败时错误展示。
19. **异步校验**：Promise 规则失败时错误展示。
20. **watchValue**：他字段变化时触发具名规则校验。
21. **Form.useRelative**：`Hook` 内关联计算随字段变化更新。
22. **无 name 的 Field**：不传 `name` 时渲染不抛错。

## 评分

- 交互覆盖：5/5（普遍使用 `userEvent`，含输入/点击/清除链路）
- 分支覆盖：5/5（`index.tsx` 语句与分支均达 100%）
- 边界处理：4/5（含 strict、无 name、条件卸载；全量 createForm 边界在其它包单测覆盖）
- 场景真实度：5/5（对齐文档中的校验、watch、relative 用法）
- 综合评分：19/20

## 未覆盖说明

- 无。当前 `collectCoverageFrom` 仅包含 `Form/index.tsx`，已全部覆盖。
