<template>
  <el-dropdown
    :placement="placement"
    :trigger="trigger"
    :hide-on-click="hideOnClick"
    @command="handleCommand"
    @visible-change="handleVisibleChange"
  >
    <div
      class="dropdown-btn dropdown-btn__default"
    >
      <span v-if="$slots.default"><slot></slot></span>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="menu in menus"
        :key="menu.command"
        :command="menu.command"
        :disabled="menu.disabled"
        :divided="menu.divided"
        :icon="menu.icon"
      >
        {{ menu.content }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
/**
 * 下拉菜单组件
 */
export default {
  name: 'JyDropDown',
  props: {
    // 下拉选项数据
    menus: {
      type: Array,
      default() {
        return []
      }
    },
    // 菜单弹出位置 top/top-start/top-end/bottom/bottom-start/bottom-end
    placement: {
      type: String,
      default: 'bottom-start'
    },
    // 触发下拉的行为，hover, click
    trigger: {
      type: String,
      default: 'click'
    },
    // 是否在点击菜单项后隐藏菜单
    hideOnClick: {
      type: Boolean,
      default: true
    },
    // 展开下拉菜单的延时（仅在 trigger 为 hover 时有效）
    showTimeout: Number,
    // 收起下拉菜单的延时（仅在 trigger 为 hover 时有效）
    hideTimeout: Number,
    // Dropdown 组件的 tabindex
    tabindex: Number
  },
  methods: {
    handleCommand(...args) {
      this.$emit('command', ...args);
    },
    handleVisibleChange(...args) {
      this.$emit('visible-change', ...args);
    }
  }
}
</script>
<style lang="scss" scoped>
.dropdown-btn {
  display: inline-block;
  box-sizing: border-box;
  height: 30px;
  padding: 0 16px;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  &.dropdown-btn__default {
    color: #333;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    &:hover{
      color: #00A4FF;
      border-color: #00A4FF;
    }
  }
  &.dropdown-btn__primary {
    color: #fff;
    background-color: #2B303D;
    &:hover{
      background-color: #2A3F75;
    }
  }
  .el-icon--right {
    margin-left: 0;
  }
}
</style>
