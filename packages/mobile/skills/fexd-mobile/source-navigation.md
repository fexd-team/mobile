# 源码导航

`@fexd/mobile` npm 包**包含完整源码发布**（`files` 字段含 `src/`），可直接在 `node_modules/@fexd/mobile/src/` 中查看和读取任何组件的源码。

> 优先查阅 `references/{ComponentName}.md` 获取用法和 Props。当文档不够详尽时，按以下路径直接读取源码补充。

## 单组件路径约定

```
node_modules/@fexd/mobile/src/exports/{ComponentName}/
├── index.tsx          # 组件实现
├── type.tsx           # Props 类型定义（接口名 {Name}Props 或 Pure{Name}Props）
├── index.zh.md        # 中文文档（约 52 个组件有）
├── style.less         # 样式 + Less 变量（命名：@{component-prefix}-{property}）
└── demos/demo1/       # 可运行示例
```

判断开发中组件：存在 `.developing` 文件 = 未导出，不可使用。

## 按需求查找

| 需要            | 读取                                                                   |
| --------------- | ---------------------------------------------------------------------- |
| 完整 Props 类型 | `src/exports/{Name}/type.tsx`                                          |
| 用法说明和示例  | `src/exports/{Name}/index.zh.md`                                       |
| 样式变量        | `src/exports/{Name}/style.less` 或 type.tsx 中的 `DOC_{Name}StyleVars` |
| 可运行 Demo     | `src/exports/{Name}/demos/demo1/index.tsx`                             |

## 全局资源

| 资源          | 路径                             |
| ------------- | -------------------------------- |
| 全部导出入口  | `src/index.ts`（127 个公开导出） |
| 全局样式      | `src/style.less`                 |
| 设计变量      | `src/theme/vars.less`            |
| CSS 变量版    | `src/theme/vars.cssvars.less`    |
| HTML 属性类型 | `src/helpers/html.types.ts`      |

以上路径均相对于 `node_modules/@fexd/mobile/`。

## Props 验证协议

当需要确认某个组件是否支持某个 Prop 时，按以下顺序查证：

```
1. 查 reference 文档 → references/{ComponentName}.md
2. 查源码类型 → src/exports/{ComponentName}/type.tsx（找 {Name}Props / Pure{Name}Props 接口）
3. 查默认值 → type.tsx 中的 defaultProps 或组件实现中的默认值
4. 查 demo 用法 → src/exports/{ComponentName}/demos/
5. 查中文文档 → src/exports/{ComponentName}/index.zh.md
```

### 关键规则

- **reference 与源码冲突时，以源码 type.tsx 为准**：reference 文档可能滞后，TypeScript 类型定义是最权威的 Props 来源。
- **找不到的 Prop 不要猜**：如果在 reference 和 type.tsx 中都找不到某个 Prop，声明"该 Prop 在当前版本文档中未找到，建议查阅源码确认"，不要按其他组件库的习惯假设存在。
- **注意继承关系**：很多组件的 Props 继承自底层组件。例如 `DialogProps` 继承 `ModalProps`，`PopupProps` 继承 `ModalProps`。查找 Prop 时需要沿继承链向上追溯。
- **注意 Omit**：子组件可能 `Omit` 了父组件的某些 Props。例如 `DialogProps = Omit<ModalProps, 'placement' | 'transition' | 'type'>`，意味着 Dialog 不支持这三个 Modal 的 Prop。

### 验证示例

**确认 Button 是否支持 `danger` prop：**

1. `references/Button.md` → 找到 `type` 属性，值为 `plain | primary | info | success | warning | danger`，**没有单独的 `danger` prop**，danger 是 `type` 的一个值
2. `src/exports/Button/type.tsx` → 确认 `PureButtonProps` 无 `danger` 字段
3. 结论：Button 没有 `danger` prop，应该用 `type="danger"`

**确认 Form 是否有 `Form.Item`：**

1. `references/Form.md` → 只有 `Form.Field`，无 `Form.Item`
2. `src/exports/Form/type.tsx` → `FormStaticMethods` 中只有 `Form.Field`
3. 结论：`Form.Item` 不存在，用 `Form.Field`
