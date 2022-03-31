<template>
  <div class="standard-table-operation-List">
    <template v-if="listFiltered.length <= 3">
      <div
        v-for="(item, index) in listFiltered"
        :key="index"
        class="operation-item"
        @click="item.clickEvent"
      >
        {{ item.content }}
      </div>
    </template>
    <template v-else>
      <div
        v-for="(item, index) in listFiltered.slice(0, 2)"
        :key="index"
        class="operation-item"
        @click="item.clickEvent"
      >
        {{ item.content }}
      </div>
      <el-dropdown
        class="operation-more"
        @command="handleCommand"
      >
        <span class="el-dropdown-link">
          更多<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in listFiltered.slice(2)"
            :key="index"
            :command="index + 2"
            @click="item.clickEvent"
          >
            {{ item.content }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
  </div>
</template>
<script>
import { getOperationColumnsByRowData } from './util'

export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    rowData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      listFiltered: []
    }
  },
  watch: {
    rowData: {
      immediate: true,
      handler(newVal) {
        this.listFiltered = getOperationColumnsByRowData(this.list, newVal)
      }
    }
  },
  methods: {
    handleCommand(command) {
      this.listFiltered[command].clickEvent()
    }
  }
}
</script>
<style lang="scss" scoped>
.standard-table-operation-List {
  .operation-item {
    display: inline-block;
    margin-right: 10px;
    color: #00A4FF;
    cursor: pointer;
    &:last-child {
      margin-right: 0;
    }
  }
  .operation-more {
    display: inline-block;
    color: #00A4FF;
    cursor: pointer;
  }
}
</style>
