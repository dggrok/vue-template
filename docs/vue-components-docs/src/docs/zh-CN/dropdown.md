## DropDown 下拉菜单

基于麒麟业务菜单页面按钮太多时，显示不下的场景，故基于ElementUI扩展了按钮的下拉菜单组件。

### 基础用法

:::demo
```html
<template>
    <jy-drop-down
      :menus="[{ command: 'a', content: '导出选中项' }, { command: 'b', content: '导出筛选项' }]"
      @command="handleCommand"
    >
      导出
    </jy-drop-down>
</template>
<script>
export default {
    methods: {
        handleCommand(command) {
          console.log(command)
        },
    }
}
</script>
```
:::

### 菜单弹出位置可选

:::demo  `placement` 属性 调整菜单出现位置
```html
<template>
  <div>
    <jy-drop-down
      :menus="[{ command: 'a', content: '导出选中项' }, { command: 'b', content: '导出筛选项' }]"
      placement="top"
      @command="handleCommand"
    >
      top
    </jy-drop-down>
    <jy-drop-down
      :menus="[{ command: 'a', content: '导出选中项' }, { command: 'b', content: '导出筛选项' }]"
      placement="top-start"
      @command="handleCommand"
    >
      top-start
    </jy-drop-down>
    <jy-drop-down
      :menus="[{ command: 'a', content: '导出选中项' }, { command: 'b', content: '导出筛选项' }]"
      placement="top-end"
      @command="handleCommand"
    >
      top-end
    </jy-drop-down>
    <jy-drop-down
      :menus="[{ command: 'a', content: '导出选中项' }, { command: 'b', content: '导出筛选项' }]"
      placement="bottom"
      @command="handleCommand"
    >
      bottom
    </jy-drop-down>
    <jy-drop-down
      :menus="[{ command: 'a', content: '导出选中项' }, { command: 'b', content: '导出筛选项' }]"
      placement="bottom-start"
      @command="handleCommand"
    >
      bottom-start
    </jy-drop-down>
    <jy-drop-down
      :menus="[{ command: 'a', content: '导出选中项' }, { command: 'b', content: '导出筛选项' }]"
      placement="bottom-end"
      @command="handleCommand"
    >
      bottom-end
    </jy-drop-down>
  </div>
</template>
<script>
export default {
    methods: {
        handleCommand(command) {
          console.log(command)
        },
    }
}
</script>
```
:::

### 菜单触发行为

:::demo `trigger` 默认 `click`触发 可选 `hover`
```html
<template>
  <div>
    <jy-drop-down
      :menus="[{ command: 'a', content: '导出选中项' }, { command: 'b', content: '导出筛选项' }]"
      trigger="hover"
      @command="handleCommand"
    >
      hover
    </jy-drop-down>
  </div>
</template>
<script>
export default {
  methods: {
    handleCommand(command) {
      console.log(command)
    },
  }
}
</script>
```
:::

### 下拉菜单禁用状态

:::demo `meusItems` 属性中 `disabled` 为禁用  `divided` 为分割线
```vue
<template>
  <div>
    <jy-drop-down
      :menus="[{ command: 'a', content: '导出选中项' }, { command: 'b', content: '导出筛选项',disabled: true, divided: true }]"
      @command="handleCommand"
    >
      导出
    </jy-drop-down>
  </div>
</template>
<script>
export default {
    methods: {
        handleCommand(command) {
          console.log(command)
        },
    }
}
</script>
```
:::


### Attributes
| 参数       | 说明                | 类型     | 可选值  | 默认值  |
| -------- | ----------------- | ------ | ---- | ---- |
| menus     | 下拉选项数据  | Array | -   |  []   |
| placement     | 菜单弹出位置	       | string  | top/top-start/top-end/bottom/bottom-start/bottom-end    |  bottom-start   |
| trigger | 触发下拉的行为  | string | hover, click    | click    |
| hideOnClick  | 是否在点击菜单项后隐藏菜单	  | boolean | —    | true |
| showTimeout    | 展开下拉菜单的延时（仅在 trigger 为 hover 时有效）     | number | —    | 250    |
| hideTimeout    | 收起下拉菜单的延时（仅在 trigger 为 hover 时有效） | number  | —    | 150    |
| tabindex | Dropdown 组件的 tabindex | number | —       | 0   |

### menus item Attributes
| 参数       | 说明                | 类型     | 可选值  | 默认值  |
| -------- | ----------------- | ------ | ---- | ---- |
| command     | 指令  | string/number/object | -   |  —   |
| disabled     | 禁用	       | boolean  | —    |  false   |
| divided | 显示分割线	  | boolean | —    | false    |
| icon  | 图标类名		  | string | —    | —  |

### Events
| 事件名称           | 说明             | 回调参数                            |
| -------------- | -------------- | ---------------------------------------- |
| command          | 点击菜单项触发的事件回调      | dropdown-item 的指令 |
| visible-change           | 下拉框出现/隐藏时触发        | 出现则为 true，隐藏则为 false |

### slot
| name           | 说明             |
| -------------- | -------------- |
| —          | 按钮文字      |
