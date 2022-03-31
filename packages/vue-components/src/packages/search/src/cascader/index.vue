<template>
  <el-cascader
    v-model="data.value"
    v-bind="data.config || {}"
    :style="{ width: `${data.width || 230}px` }"
    @change="handleChange"
  ></el-cascader>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {};
      }
    },
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value);
    }
  }
};
</script>
