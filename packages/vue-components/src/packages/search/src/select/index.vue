<template>
  <el-select
    v-model="data.value"
    v-bind="newConfig"
    :style="{ width: `${data.width || 230}px` }"
    @change="handleChange"
  >
    <el-option
      v-for="option in data.options"
      :key="option.key"
      :label="option.val"
      :value="option.key"
    ></el-option>
  </el-select>
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
    handleChange(value) {
      this.$emit('change', value);
    }
  }
};
</script>
