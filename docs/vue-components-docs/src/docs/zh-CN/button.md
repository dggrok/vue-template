## Button 按钮

符合麒麟规范的button按钮

### 基本用法

:::demo `type` 类型 `size` 尺寸

```html
<template>
  <div>
      <jy-button
        type="primary"
        size="medium"
      >按钮</jy-button>
      <jy-button
        size="medium"
      >按钮</jy-button>
      <jy-button
        type="primary"
        size="small"
      >按钮</jy-button>
      <jy-button
        size="small"
      >按钮</jy-button>
  </div>
</template>
```
:::

### 禁用状态
:::demo
```html
<template>
  <div>
      <jy-button
        type="primary"
        size="medium"
        disabled
      >按钮</jy-button>
      <jy-button
        type="primary"
        size="small"
        disabled
      >按钮</jy-button>
  </div>
</template>
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

