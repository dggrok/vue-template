## Table 表格

el-table和el-pagination的组合，在它们基础上扩展了功能。
- 支持render函数渲染自定义单元格，支持使用[JSX](https://github.com/vuejs/jsx#installation)
- 内置了el-pagination的current-change和size-change事件
- 内置了表格的序号列
- 实现了pageNum、pageSize、selectedData的双向绑定
- operationColumns支持操作列渲染

### 基本用法

:::demo
```html
<template>
    <jy-standard-table
      :tableData="tableData"
      :tableHeader="tableHeader"
      :selectedData.sync="selectedData"
      :pageNum.sync="pageNum"
      :pageSize.sync="pageSize"
      :total="total"
      :operation-columns="operationColumns"
      @getList="getList"
    />
</template>
<script>
export default {
  data() {
    return {
      tableData: [{ name: 'jjj' }],
      tableHeader: [
        {
          label: '姓名',
          prop: 'name',
          minWidth: '220'
        },
        {
          label: '姓名',
          prop: 'name',
          minWidth: '220'
        },
        {
          label: '姓名',
          prop: 'name',
          minWidth: '220'
        },
        {
          label: '姓名',
          prop: 'name',
          minWidth: '220'
        },
        {
          label: '姓名',
          prop: 'name',
          minWidth: '220'
        },
        {
          label: '姓名',
          prop: 'name',
          minWidth: '220',
          render: (h, { row, column, $index }) => {
            const { name } = row
            console.log('this:', this)
            return (
              <div style="color: red" vOn:click={this.handleClickTableColumn}>
                {name + '------*****-----' + name}
              </div>
            )
          }
        }
      ],
      pageNum: 1,
      pageSize: 30,
      total: 0,
      selectedData: [],
      operationColumns: (record) => [
        {
          content: '启动',
          clickEvent: () => {}
        },
      ],
    }
  },
  methods: {
    getList(){},
    handleClickTableColumn() {
      console.log(11111)
    }
  }
}
</script>
```
:::

### Attributes
| 参数       | 说明                | 类型     | 可选值  | 默认值  |
| -------- | ----------------- | ------ | ---- | ---- |
| tableData    | 表格数据     | Array | —    |  []   |
| tableHeader     | 列渲染配置数据  | Array | -   |  Array   |
| maxHeight     | 表格最大高度       | Number  | —    |  —   |
| rowSelection | 是否显示勾选列  | boolean | —    | true    |
| selectedData  | 选中的数据  | Array | —    | -    |
| hiddenPagination  | 是否隐藏分页  | boolean | —    | -    |
| pageNum    | 页码     | Number | —    | 1    |
| pageSize    | 页长 | Number  | —    | 30    |
| pageSizes | 页长数 | Array | —       | [30, 50, 100]   |
| total    | 总数     | Number | —    |  0   |
| pageLayout     | 分页布局    | string  | —    |  'total, sizes, prev, pager, next, jumper'   |
| operationColumns     | 表格操作列数据   | Function  | —    |  -   |
| operationColumnsConfig     | 操作列配置   | Object  | —    |  {width: 160}   |
| tableProps    | 注入el-table的属性     | Object | —    | {}    |

### 更新日志
- 2021-08-31 添加tableProps属性
- 2021-07-23 添加是否隐藏分页hiddenPagination属性
