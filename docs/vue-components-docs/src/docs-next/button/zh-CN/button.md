## Button 按钮

符合麒麟规范的button按钮

### 基本用法

:::demo `type` 类型 `size` 尺寸
```html
<basic />
```
:::

### 禁用状态
:::demo  `disabled` 禁用属性
```html
<disabled />
```
:::


### Attributes
| 参数                  | 说明                                               | 类型                        | 可选值  | 默认值   |
| :--- | :---- | :---- | :---- | :---- |
| type | 类型 | string | primary/default | default |
| size | 尺寸 | string | medium/small | medium |
| disabled | 是否禁用状态 | boolean | - | false |
| autofocus | 是否默认聚焦 | boolean | - | false |

### Events
| 事件名称           | 说明             | 回调参数                                     |
| :--- | :---- | :---- |
| click    | 点击按钮触发      | 当前 `event` 对象 |

