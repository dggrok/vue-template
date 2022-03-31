<template>
  <div class="standard-table-component">
    <el-table
      ref="table"
      :data="tableData"
      border
      v-bind="{ ...$attrs, ...tableProps }"
      :max-height="maxHeight || tableMaxheight"
      style="width:100%;"
      v-on="$listeners"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="rowSelection && selectedData"
        type="selection"
        width="55"
        fixed="left"
      ></el-table-column>
      <el-table-column
        v-if="indexColumnShow"
        type="index"
        :index="tableColumIndex"
        label="序号"
        width="60"
        align="center"
        fixed="left"
      ></el-table-column>
      <table-column
        v-for="(val, index) in tableHeaderFilter"
        :key="index"
        :value="val"
      />
      <el-table-column
        v-if="operateColumnShow"
        label="操作"
        fixed="right"
        :width="operationColumnsConfig.width"
      >
        <template slot-scope="scope">
          <operation-list
            :list="operationColumns(scope.row)"
            :row-data="scope.row"
          />
        </template>
      </el-table-column>
    </el-table>
    <div class="table-pagination">
      <el-pagination
        v-if="tableData.length && !hiddenPagination"
        :current-change="pageSize"
        :current-page="pageNum"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        background
        :layout="pageLayout"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script lang="jsx">
/**
 * 标准表格组件
 * el-table和el-pagination的组合，在它们基础上扩展了功能。
 * 支持render函数渲染自定义单元格
 * 内置了el-pagination的current-change和size-change事件
 * 内置了表格的序号列
 * 实现了pageNum、pageSize、selectedData的双向绑定
 */
import OperationList from './operation-list.vue'
import { getOperationColumnsByRowData } from './util'

export default {
  name: 'JyStandardTable',
  components: {
    'table-column': {
      props: {
        value: {
          required: true,
          type: Object,
          default: () => ({})
        }
      },
      render: function (h) {
        const attrs = this.value;

        return (
          <el-table-column
            type={attrs.type}
            index={attrs.index}
            columnKey={attrs.columnKey}
            label={attrs.label}
            prop={attrs.prop}
            width={attrs.width}
            minWidth={attrs.minWidth}
            fixed={attrs.fixed}
            renderHeader={attrs.renderHeader}
            sortable={attrs.sortable}
            sortMethod={attrs.sortMethod}
            sortBy={attrs.sortBy}
            sortOrders={attrs.sortOrders}
            resizable={attrs.resizable}
            formatter={attrs.formatter}
            show-overflow-tooltip={attrs.showOverflowTooltip !== false}
            align={attrs.align}
            headerAlign={attrs.headerAlign}
            className={attrs.className}
            labelClassName={attrs.labelClassName}
            selectable={attrs.selectable}
            reserveSelection={attrs.reserveSelection}
            filters={attrs.filters}
            filterPlacement={attrs.filterPlacement}
            filterMultiple={attrs.filterMultiple}
            filterMethod={attrs.filterMethod}
            filteredValue={attrs.filteredValue}
            scopedSlots={this.value.render ? {
              default: ({ row, column, $index }) => {
                return this.value.render ? this.value.render(h, { row, column, $index }) : row[column.property];
              }
            } : undefined}
          >
          </el-table-column>
        );
      }
    },
    OperationList
  },
  props: {
    // 表格数据
    tableData: {
      type: Array,
      default () {
        return [];
      }
    },
    tableHeader: {
      type: Array,
      default () {
        return [];
      }
    },
    // 表格最大高度
    maxHeight: Number,
    // 是否显示勾选列
    rowSelection: {
      type: Boolean,
      default: true
    },
    // 选中的数据
    selectedData: Array,
    // 是否隐藏分页
    hiddenPagination: Boolean,
    pageNum: { // 页码
      type: Number,
      default: 1
    },
    pageSize: { // 页长
      type: Number,
      default: 30
    },
    pageSizes: { // 页长数
      type: Array,
      default () {
        return [30, 50, 100];
      }
    },
    total: { // 总数
      type: Number,
      default: 0
    },
    pageLayout: { // 分页布局
      type: String,
      default: 'total, prev, pager, next, sizes, jumper'
    },
    // 表格操作列数据
    operationColumns: Function,
    /** 操作列配置 */
    operationColumnsConfig: {
      type: Object,
      default: () => ({
        width: 160
      })
    },
    // 是否显示序号列
    indexColumnShow: {
      type: Boolean,
      default: true
    },
    // el-table的属性
    tableProps: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      tableMaxheight: null
    };
  },
  computed: {
    tableHeaderFilter() {
      return this.tableHeader.filter(item => !item.hidden)
    },
    // 是否显示操作列
    operateColumnShow() {
      return this.operationColumns && this.operationColumnsConfig.show !== false && this.tableData.some(rowData => {
        const listFiltered = getOperationColumnsByRowData(this.operationColumns(rowData), rowData)
        return listFiltered.length > 0
      })
    }
  },
  watch: {
    tableData: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          // 计算表格最大高度，父实例需设置名为pageContent的ref
          if (this.$parent.$refs.pageContent && this.$refs.table) {
            const contentHeight = this.$parent.$refs.pageContent.offsetHeight;
            const tableHeight = this.$refs.table.$el.offsetHeight;
            const maxHeight = tableHeight - (contentHeight + 101 - window.innerHeight);
            this.tableMaxheight = maxHeight - 10;
          }
        });
      }
    }
  },
  methods: {
    // 选择表格数据回调
    handleSelectionChange (val) {
      if (!this.$listeners['selection-change']) {
        this.$emit('update:selectedData', val);
      }
    },
    // 每页条数发生变化时的回调
    handleSizeChange (val) {
      this.$emit('update:pageSize', val);
      if (this.pageNum !== 1) {
        this.$emit('update:pageNum', 1);
        this.$emit('getList');
        return;
      }
      this.$emit('getList');
    },
    // 当前页变化时的回调
    handleCurrentChange (val) {
      this.$emit('update:pageNum', val);
      this.$emit('getList');
    },
    tableColumIndex(index) {
      return index + 1 + this.pageSize * (this.pageNum - 1);
    },
    // 用于多选表格，清空用户的选择
    clearSelection(...args) {
      this.$refs.table.clearSelection(...args);
    },
    toggleRowSelection(...args) {
      this.$refs.table.toggleRowSelection(...args);
    },
    toggleAllSelection(...args) {
      this.$refs.table.toggleAllSelection(...args);
    },
    toggleRowExpansion(...args) {
      this.$refs.table.toggleRowExpansion(...args);
    },
    setCurrentRow(...args) {
      this.$refs.table.setCurrentRow(...args);
    },
    clearSort(...args) {
      this.$refs.table.clearSort(...args);
    },
    clearFilter(...args) {
      this.$refs.table.clearFilter(...args);
    },
    doLayout(...args) {
      this.$refs.table.doLayout(...args);
    },
    sort(...args) {
      this.$refs.table.sort(...args);
    }
  }
};
</script>
<style lang="scss" scoped>
.standard-table-component {
  .table-pagination {
    overflow: hidden;
  }
}
</style>
