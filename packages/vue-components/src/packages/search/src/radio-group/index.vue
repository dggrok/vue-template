<template>
  <el-radio-group
    v-model="data.value"
    v-bind="data.config || {}"
    :style="{ width: `${data.width || 230}px` }"
    @change="handleChange"
  >
    <el-radio
      v-for="option in data.options"
      :key="option.key"
      :label="option.key"
    > {{ option.val }}</el-radio>
  </el-radio-group>
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
