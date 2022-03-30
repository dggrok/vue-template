<template>
  <div class="list-page">
    <search
      ref="search"
      :data="searchData"
      :is-default-extend="isSearchDefaultExtend"
      :style="{ marginRight: '10px' }"
      @searchCondition="onSearch"
      @afterClear="onAfterClear"
      v-on="searchClearLitsener"
      @change="onSearchChange"
      @focus="onSearchFocus"
    >
      <template
        v-for="(item, key) in $slotsOnlySearch"
        v-slot:[key]
      >
        <slot :name="key"></slot>
      </template>
    </search>
    <slot name="beforeTable"></slot>
    <div class="table-wrap">
      <table-operation
        v-if="newTableOperationList.length > 0"
        :list="newTableOperationList"
      />
      <standard-table
        :max-height="tableMaxHeight"
        :table-data="tableData"
        :table-header="tableHeader"
        :selected-data.sync="selectedData"
        :row-selection="rowSelection"
        :hidden-pagination="hiddenPagination"
        :page-num.sync="pageNum"
        :page-size.sync="pageSize"
        :total="total"
        :operation-columns="operationColumns"
        :operation-columns-config="operationColumnsConfig"
        :table-props="tableProps"
        @getList="refreshData"
      />
    </div>
  </div>
</template>

<script>
import StandardTable from '@/packages/standard-table'
import Search from '@/packages/search'
import TableOperation from './table-operation.vue'

export default {
  name: 'JyListPage',
  components: {
    StandardTable,
    Search,
    TableOperation
  },
  props: {
    tableMaxHeight: {
      type: [String, Number],
      default: window.innerHeight - 280
    },
    /** 请求表格数据方法，resolve接口返回值 {total,list} */
    request: {
      type: Function,
      default: () => {}
    },
    /** 请求表格数据额外参数 */
    extraRequestParams: {
      type: Object,
      default: () => ({})
    },
    /** 表格列配置数据 */
    tableHeader: {
      type: Array,
      default () {
        return [];
      }
    },
    /** 表格操作列数据 */
    operationColumns: Function,
    /** 操作列配置 */
    operationColumnsConfig: {
      type: Object,
      default: () => ({
        width: 160
      })
    },
    /** 筛选数据 */
    searchData: {
      type: Object,
      default: () => ({})
    },
    /** 处理调取查询接口的入参 */
    processValues: {
      type: Function,
      default: (params) => (params)
    },
    /** 操作按钮数据 [{content(文本),type(按钮类型primary或不传),clickEvent(点击事件), dropdownMenus(下拉菜单数据), commandEvent(下拉菜单command事件)}]  */
    tableOperationList: {
      type: Function,
      default () {
        return [];
      }
    },
    /** 是否默认展开筛选项 */
    isSearchDefaultExtend: {
      type: Boolean,
      default: true
    },
    /** 是否显示勾选列 */
    rowSelection: {
      type: Boolean
    },
    /** 是否隐藏分页 */
    hiddenPagination: Boolean,
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
      tableData: [],
      pageNum: 1,
      pageSize: 30,
      total: 0,
      selectedData: []
    }
  },
  computed: {
    newTableOperationList() {
      let list = []
      if (this.tableOperationList) {
        list = this.tableOperationList(this.selectedData).filter(item => item.access !== false)
      }
      return list
    },
    searchClearLitsener() {
      const listener = {}
      if (this.$listeners.searchClear) {
        listener.searchClear = this.$listeners.searchClear
      }
      return listener
    },
    $slotsOnlySearch() {
      const newVal = {}
      const searchKeys = Object.keys(this.searchData)
      Object.keys(this.$slots).forEach(key => {
        if (searchKeys.indexOf(key) > -1) {
          newVal[key] = this.$slots[key]
        }
      })
      return newVal
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    /**
     * 初始化数据
     */
    initData() {
      this.refreshData()
    },
    /**
     * 刷新表格数据
     */
    refreshData() {
      const searchParams = {};
      this.searchData && Object.keys(this.searchData).forEach(key => { searchParams[key] = this.searchData[key].value });
      const newParams = this.processValues({ ...searchParams })
      this.getTableData(newParams)
    },
    /**
     * 获取表格数据
     */
    getTableData(params) {
      const extraParams = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...this.extraRequestParams,
        ...params
      }
      this.request(extraParams).then(data => {
        this.total = data.total
        this.tableData = data.list
      }).catch(() => {
        this.$toast('网络异常');
      })
    },
    /**
     * 点击查询
     */
    onSearch(params) {
      this.pageNum = 1
      const newParams = this.processValues({ ...params })
      this.getTableData(newParams)
    },
    // 触发search组件里的重置方法
    clearAll() {
      this.$refs.search.clearAll()
    },
    /**
     * 清空筛选项后的回调
     */
    onAfterClear() {
      this.pageNum = 1
      if (this.$listeners.afterClear) {
        this.$emit('afterClear')
      } else {
        this.getTableData()
      }
    },
    onSearchChange(...args) {
      this.$emit('searchChange', ...args)
    },
    onSearchFocus(...args) {
      this.$emit('searchFocus', ...args)
    }
  }
}
</script>
<style lang="scss" scoped>
.list-page {
  .table-wrap {
    margin: 0 10px 10px 0;
    padding: 10px 20px 10px;
    background-color: #fff;
  }
}
</style>
