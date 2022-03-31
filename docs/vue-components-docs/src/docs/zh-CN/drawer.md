## Drawer 抽屉组件

符合麒麟使用规范的抽屉组件。

### 基本用法

:::demo
```html
<template>
  <div>
    <jy-button  @click="isOpen = true">点击打开抽屉</jy-button>
    <jy-drawer
      :wrapperClosable="true"
      :isOpen.sync="isOpen"
      :showTag="false"
      @clickTag="() => {this.isOpen = !this.isOpen}"
    >
      <div>抽屉里的玩具</div>
    </jy-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false
    }
  }
}
</script>
```
:::

### 侧边栏Tag显示

:::demo `showTag` 显示侧边栏tag `tagOpenText` 属性为自定义tag文本
```html
<template>
  <div>
    <jy-button  @click="isOpen = true">点击打开抽屉</jy-button>
    <jy-drawer
      tagOpenText="玩具抽屉"
      :wrapperClosable="true"
      :isOpen.sync="isOpen"
      :showTag="true"
      @clickTag="() => {this.isOpen = !this.isOpen}"
    >
      <div>抽屉里的玩具</div>
    </jy-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false
    }
  }
}
</script>
```
:::

### 适用于侧弹窗编辑显示底部按钮

:::demo
```vue
<template>
  <div>
    <jy-button  @click="isOpen = true">打开侧弹窗</jy-button>
    <jy-drawer
      :wrapperClosable="true"
      :isOpen.sync="isOpen"
      :showTag="false"
      :showFooter="true"
    >
      <div>抽屉里的玩具</div>
    </jy-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    }
  }
}
</script>
```
:::

### Attributes
| 参数       | 说明                | 类型     | 可选值  | 默认值  |
| -------- | ----------------- | ------ | ---- | ---- |
| isOpen    | 是否打开抽屉     | boolean | —    |  false   |
| width     | 抽屉宽度         | Number | 300、600、900   |  300   |
| title     | 标题text         | string  | —    |  —   |
| withHeader | 是否显示header  | boolean | —    | false    |
| showClose  | 是否显示关闭icon  | boolean | —    | true    |
| showTag    | 是否显示tag     | boolean | —    | true    |
| tagOpenText    | tag展开text | string  | —    | '展开'    |
| tagHeight | tag高度 | string | —       | 80   |
| showFooter    | 是否显示footer     | boolean | —    |  false   |
| cancleBtnText     | 取消按钮文本    | string  | —    |  '取消'   |
| confirmBtnText     | 确定按钮文本   | string  | —    |  '确定'   |
| wrapperClosable     | 点击遮罩层是否可以关闭 Drawer   | boolean  | —    |  false   |
| destroyOnClose     | 控制是否在关闭 Drawer 之后将子元素全部销毁   | boolean  | —    |  false   |

### Events
| 事件名称           | 说明             | 回调参数                            |
| -------------- | -------------- | ---------------------------------------- |
| clickTag          | 点击抽屉tag时触发      | (isOpen)  |
| close             | 点击关闭icon时触发      | -  |
| cancle            | 点击取消按钮时触发      | -  |
| confirm           | 点击确定按钮时触发      | -  |

