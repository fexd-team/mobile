---
group:
  title: 展示
  path: /display
---

# Badge 徽章 <ImportCost name="Badge" />

## API

| 属性          | 说明                           | 类型                                          | 默认值  |
| :------------ | :----------------------------- | :-------------------------------------------- | :------ |
| visible       | 是否显示 Badge                 | `boolean`                                     | true    |
| dot           | 是否显示小圆点                 | `boolean`                                     | false   |
| showZero      | 当数值为 0 时，是否展示        | `boolean`                                     | false   |
| overflowCount | 封顶的数字                     | `number \| string`                            | -       |
| color         | Badge 的字体颜色               | `string`                                      | #FFFFFF |
| bgColor       | Badge 的背景色                 | `string`                                      | #FF411C |
| content       | Badge 的内容                   | `React.ReactNode`                             | -       |
| offset        | 状态点的偏移位置 `[left, top]` | `[number \| string, number \| string]`        | -       |
| type          | 主题类型                       | `['primary', 'success', 'warning', 'danger']` | -       |

---

## Badge.Stamp 的 API

| 属性    | 说明           | 类型     | 默认值  |
| :------ | :------------- | :------- | :------ |
| bgColor | 自定义的背景色 | `string` | #FF411C |
| color   | 自定义的颜色   | `string` | #FFFFFF |
| test    | 自定义的内容   | `string` |         |

---

## 演示代码

<code src="./demos/demo1/index.tsx" />
