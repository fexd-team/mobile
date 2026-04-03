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
| 全部导出入口  | `src/index.ts`（120 个稳定导出） |
| 全局样式      | `src/style.less`                 |
| 设计变量      | `src/theme/vars.less`            |
| CSS 变量版    | `src/theme/vars.cssvars.less`    |
| HTML 属性类型 | `src/helpers/html.types.ts`      |

以上路径均相对于 `node_modules/@fexd/mobile/`。
