<template>
  <el-autocomplete
    v-model="data.value"
    v-bind="newConfig"
    class="search-component-autocomplete"
    :style="{ width: `${data.width || 230}px` }"
    @input="handleInput"
  />
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
  computed: {
    newConfig() {
      return {
        clearable: true,
        ...(this.data.config || {})
      };
    }
  },
  methods: {
    handleInput (value) {
      this.$emit('change', value);
    }
  }
};
</script>
<style lang="scss">
.search-component-autocomplete {
  .el-input__inner {
    padding-left: 10px;
  }
}
</style>
