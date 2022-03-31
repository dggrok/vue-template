## TreeSelect 树形选择器

基于element的tree组件的二次封装，用于下拉选择且选项为树状的场景。


### 基础用法
:::demo `treeData` 为下拉选项值
```html
<template>
  <div>
    <jy-tree-select
      v-model="value"
      :treeData="treeData"
      placeholder="请选择"
    />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: '',
        treeData: [{
          key: '1',
          label: '一级 1',
          children: [{
            key: '1-1',
            label: '二级 1-1',
            children: [{
              key: '1-1-1',
              label: '三级 1-1-1'
            }]
          }]
        }],
      }
    },
  }
</script>
```
:::

### 多选

:::demo `multiple` 默认不加为false 加上即可多选 。 这里绑定的 `value` 为数组。
```html
<template>
    <jy-tree-select
      v-model="value"
      :treeData="treeData"
      placeholder="请选择"
      multiple
    />
</template>

<script>
  export default {
    data() {
      return {
        value: [],
        treeData: [{
          key: '1',
          label: '一级 1',
          children: [{
            key: '1-1',
            label: '二级 1-1',
            children: [{
              key: '1-1-1',
              label: '三级 1-1-1'
            }]
          }]
        }],
      }
    },
  }
</script>
```
:::

### 远程搜索

:::demo `remote` 属性 开启远程搜索 `remote-method` 远程请求方法
```html
<template>
  <div>
    <jy-tree-select
      v-model="value"
      :treeData="treeData"
      placeholder="请选择"
      remote
      :remote-method="remoteMethod"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      treeData: [],
    }
  },
  methods: {
    remoteMethod() {
      setTimeout(() => {
        this.treeData = [
          {
            key: '1',
            label: '一级 1',
            children: [
              {
                key: '1-1',
                label: '一级 1-1',
              }
            ]
          }
        ];
      }, 500);
    },
  }
}
</script>

```
:::

### 子树懒加载

:::demo `lazy` 属性 开启子树懒加载模式 `load` 懒加载请求方法
```html
<template>
  <div>
    <jy-tree-select
      v-model="value"
      :treeData="treeData"
      placeholder="请选择"
      lazy
      :load="loadNode"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      treeData: [],
    }
  },
  methods: {
    loadNode(node, resolve) {
      setTimeout(() => {
        const data = [{
          label: 'zone',
          key: Math.random()
        }];

        resolve(data);
      }, 500);
    },
  }
}
</script>
```
:::

### 父子节点关联

:::demo `checkStrictly` 默认true 不关联
```html
<template>
  <div>
    <jy-tree-select
      v-model="value"
      :treeData="treeData"
      placeholder="请选择"
      multiple
      :checkStrictly="false"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: [],
      treeData: [{
        key: '1',
        label: '一级 1',
        children: [{
          key: '1-1',
          label: '二级 1-1',
          children: [{
            key: '1-1-1',
            label: '三级 1-1-1'
          }]
        }]
      }],
    }
  },
}
</script>
```
:::

### 自定义树节点渲染内容
:::demo `renderContent` 提供一个方法支持自定义渲染
```html
<template>
  <div>
    <jy-tree-select
      v-model="value"
      :treeData="treeData"
      placeholder="请选择"
      :render-content="renderContent"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: [],
      treeData: [{
        key: '1',
        label: '一级 1',
        children: [{
          key: '1-1',
          label: '二级 1-1',
          children: [{
            key: '1-1-1',
            label: '三级 1-1-1'
          }]
        }]
      }],
    }
  },
  methods: {
    renderContent(h, { node, data, store }) {
        // node表示当前节点的 Node 对象，data表示当前节点的数据。
      return (
        <span>自定义渲染节点内容 {data.label}</span>
      );
    },
  }
}
</script>
```
:::

### 多选时不将选中值按文字的形式展示
:::demo `collapseTags` 默认 `true` 为`false` 时不折叠选中值
```html
<template>
  <div>
    <jy-tree-select
      v-model="value"
      :treeData="treeData"
      placeholder="请选择"
      multiple
      :collapseTags="false"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: [],
      treeData: [{
        key: '1',
        label: '一级 1',
        children: [{
          key: '1-1',
          label: '二级 1-1',
          children: [{
            key: '1-1-1',
            label: '三级 1-1-1'
          }]
        }]
      }],
    }
  },
}
</script>
```
:::

### 展开所有节点
:::demo `defaultExpandAll` 属性默认展开所有节点
```html
<template>
  <div>
    <jy-tree-select
      v-model="value"
      :treeData="treeData"
      placeholder="请选择"
      default-expand-all
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      treeData: [{
        key: '1',
        label: '一级 1',
        children: [{
          key: '1-1',
          label: '二级 1-1',
          children: [{
            key: '1-1-1',
            label: '三级 1-1-1'
          }]
        }]
      }],
    }
  },
}
</script>
```
:::

### Attributes

| 参数                  | 说明                                               | 类型                        | 可选值  | 默认值   |
| :--- | :---- | :---- | :---- | :---- |
| v-model               | 绑定值                                             | string / number / array     | —    | —     |
| placeholder           | 占位符                                             | string     | —    | —     |
| width                 | 宽度                                               | string     | —    | '240px'     |
| multiple              | 是否多选                                           | boolean     | —    | —     |
| clearable             | 是否可清除                                         | boolean     | —    | true     |
| filterable            | 是否可筛选                                         | boolean     | —    | true     |
| collapseTags          | 多选时是否将选中值按文字的形式展示                  | boolean     | —    | true     |
| tree-data             | 树状选项数据                                       | array                       | —    | —     |
| node-key              | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的               | String                      | —    | 'key'     |
| tree-props                 | 配置选项，具体看下表                               | object                      | —    | —     |
| render-after-expand   | 是否在第一次展开某个树节点后才渲染其子节点         | boolean                      | —    | false |
| load                  | 加载子树数据的方法，仅当 lazy 属性为true 时生效    | function(node, resolve)     | —    | —     |
| render-content        | 树节点的内容区的渲染 Function                      | Function(h, { node, data, store }        | —    | —     |
| highlight-current     | 是否高亮当前选中节点，默认值是 true。             | boolean                     | —    | true |
| default-expand-all    | 是否默认展开所有节点                               | boolean                     | —    | false |
| check-on-click-node   | 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。 | boolean | true   | false |
| default-expanded-keys | 默认展开的节点的 key 的数组                        | array                       | —    | —     |
| multiple              | 是否多选                                 | boolean                     | —    | false |
| check-strictly        | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 true   | boolean                     | —    | true |
| filter-node-method    | 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏 | Function(value, data, node) | —    | —     |
| accordion             | 是否每次只打开一个同级树节点展开                   | boolean                     | —    | false |
| indent                | 相邻级节点间的水平缩进，单位为像素                 | number                     | —    | 16 |
| icon-class            | 自定义树节点的图标                              |  string                     | —    | —     |
| lazy                  | 是否懒加载子节点，需与 load 方法结合使用           | boolean                     | —    | false |
| remote                | 是否远程加载树数据，需和 remoteMethod 方法配合       | boolean                     | —    | false |
| remote-method         | 加载树数据的方法，仅当 remote 属性为true 时生效    | function     | —    | —     |
| popper-append-to-body | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false    | boolean | —    | false |
| expand-on-click-node  | 是否在点击节点的时候展开或者收缩节点， 默认值为 false，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。    | boolean | —    | false |
