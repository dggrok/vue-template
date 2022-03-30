<template>
  <el-input
    v-model="data.value"
    :placeholder="data.placeholder"
    v-bind="newConfig"
    class="search-component-input"
    :style="{ width: `${data.width || 230}px` }"
    @input="handleInput"
    @blur="blurInput"
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
    },
    blurInput (value) {
      this.$emit('blur', value);
    }
  }
};
</script>
<style lang="scss">
.search-component-input {
  .el-input__inner {
    padding-left: 10px;
  }
}
</style>
