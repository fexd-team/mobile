---
group:
  title: 输入
  path: /data
---

# Checkbox 多选框 <ImportCost name="Checkbox" />

是否被选中的两种状态之间的切换。

## 使用说明

### 受控模式

通过 `checked` (当前是否选中) 和 `onChange` (当选中的状态发生变化时触发的回调函数) 控制。

<!-- prettier-ignore -->
```jsx | pure
<Checkbox checked={checked} onChange={setChecked}>123</Checkbox>
<Checkbox checked={checked} onChange={setChecked}>123</Checkbox>
```

### 禁用状态

通过 `disabled` 属性将多选框设置为不可点击，字体颜色会被置灰。如果当前状态为选中，框的背景颜色也会被置灰。

<!-- prettier-ignore -->
```jsx | pure
<Checkbox checked={true} disabled>true</Checkbox>
<Checkbox checked={false} disabled>false</Checkbox>
```

### 块级元素

多选框在默认情况下为行内块级元素，通过 block 属性可以将按钮的元素类型设置为块级元素。

<!-- prettier-ignore -->
```jsx | pure
<Checkbox checked={true} block>true</Checkbox>
<Checkbox checked={false} block>false</Checkbox>
```

### Checkbox 组

需要配合 `<Checkbox.Group></Checkbox.Group>` 使用。

有两种生成组的方式，一种是使用 `options` 属性，更直接方便；另一种是自定义 `<Checkbox/>` ，更灵活自由。

#### 使用数组数据

通过 `<Checkbox.Group></Checkbox.Group>` 的 `options` 属性定义多个多选框选项。

<!-- prettier-ignore -->
```jsx | pure
<Checkbox.Group
  options={options}
  value={value} 
  onChange={setValue}>
</Checkbox.Group>
```

#### 自定义子元素

在 `<Checkbox.Group></Checkbox.Group>` 里的 `<Checkbox>` 使用 `value` 属性定义被勾选中时选项的值。

<!-- prettier-ignore -->
```jsx | pure
<Checkbox.Group value={value} onChange={setValue}>
  <Checkbox value="A">A</Checkbox>
  <Checkbox value="B">B</Checkbox>
  <Checkbox value="C">C</Checkbox>
  <Checkbox value="D">D</Checkbox>
  <Checkbox value="E">E</Checkbox>
</Checkbox.Group>
```

## API

### Checkbox 的 API

| 属性     | 说明                                          | 类型                              | 默认值  |
| :------- | :-------------------------------------------- | :-------------------------------- | :------ |
| checked  | 是否选中                                      | `boolean`                         | `false` |
| disabled | 是否禁用                                      | `boolean`                         | `false` |
| block    | 是否为块级元素                                | `boolean`                         | `false` |
| name     | 原生 `<input type="checkbox">` 的 `name` 属性 | `string`                          | -       |
| onChange | 当选中的值发生变化时触发的回调函数            | `(checked: boolean) => void`      | -       |
| value    | 组模式下选项的值                              | `string` \| `number` \| `boolean` | -       |

### Checkbox.Group 的 API

| 属性     | 说明                                     | 类型                        | 默认值 |
| :------- | :--------------------------------------- | :-------------------------- | :----- |
| value    | 选中的值的组合                           | `Value[]`                   | `[]`   |
| onChange | 当选中的值发生变化时触发的回调函数       | `(values: Value[]) => void` | -      |
| name     | 为所有 `<Checkbox />` 都加上 `name` 属性 | `string`                    | -      |
| options  | 生成组的选项组合                         | `Option[]`                  | -      |

<br/>

<!-- prettier-ignore -->
```ts | pure
type Value = string | number | boolean

interface option {
  value: Value
  label: string
  disabled?: boolean
  block?: boolean
}
```

## 演示代码

<!-- ### 预览 -->
<code src="./demos/demo1/index.tsx" />
