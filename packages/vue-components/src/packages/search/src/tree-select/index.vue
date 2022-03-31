<template>
  <jy-tree-select
    v-model="data.value"
    v-bind="data.config || {}"
    :style="{ width: `${data.width || 230}px` }"
    @input="handleInput"
  />
</template>

<script>
import TreeSelect from '@/packages/tree-select';

export default {
  components: {
    [TreeSelect.name]: TreeSelect
  },
  props: {
    data: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  methods: {
    handleInput (value) {
      this.$emit('change', value);
    }
  }
};
</script>
