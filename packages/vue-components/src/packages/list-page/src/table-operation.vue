<template>
  <div class="table-operation">
    <template
      v-for="(item) in list"
    >
      <jy-drop-down
        v-if="item.dropdownMenus && item.dropdownMenus.length > 0"
        :key="item.content"
        class="table-operation-item"
        :menus="item.dropdownMenus"
        @command="(command) => handleCommand(command, item)"
      >
        {{ item.content }}
      </jy-drop-down>
      <jy-button
        v-else
        :key="item.content"
        class="table-operation-item"
        :type="item.type"
        @click="(e) => handleClickItem(e, item)"
      >
        {{ item.content }}
      </jy-button>
    </template>
  </div>
</template>
<script>
import DropDown from "@/packages/drop-down";
import Button from "@/packages/button";

export default {
  components: {
    [DropDown.name]: DropDown,
    [Button.name]: Button,
  },
  props: {
    /** 操作列数据 [{content(文本),clickEvent(点击事件))}] */
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    handleClickItem(e, item) {
      item.clickEvent && item.clickEvent(e, item)
    },
    handleCommand(command, item) {
      item.commandEvent && item.commandEvent(command, item)
    }
  }
}
</script>
<style lang="scss" scoped>
.table-operation {
  display: flex;
  margin-bottom: 15px;
  > .table-operation-item {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
