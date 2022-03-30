<template>
  <button
    class="jy-button"
    :disabled="disabled"
    :autofocus="autofocus"
    :class="[
      type ? 'jy-button--' + type : '',
      size ? 'jy-button--' + size : '',
      {
        'is-disabled': disabled,
      }
    ]"
    @click="handleClick"
  >
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
/**
 * 按钮
 */
export default {
  name: 'JyButton',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: String,
    disabled: Boolean,
    autofocus: Boolean
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    }
  }
}
</script>
