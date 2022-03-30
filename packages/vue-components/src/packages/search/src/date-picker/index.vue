<template>
  <el-date-picker
    v-model="data.value"
    v-bind="data.config || {}"
    class="search-component-date-picker"
    :style="{ width: `${data.width || 230}px` }"
    @change="handleChange"
  ></el-date-picker>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value);
    }
  }
};
</script>
<style lang="scss">
.search-component-date-picker.el-input--prefix {
  .el-input__inner {
    padding-left: 30px;
  }
}
</style>
