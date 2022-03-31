<template>
  <div class="button">
    <jy-button
      type="primary"
      size="medium"
      disabled
    >按钮</jy-button>
    <jy-button
      type="primary"
      size="small"
      disabled
    >按钮</jy-button>
  </div>
</template>
<style lang="scss" scoped>
.button ::v-deep {
  .jy-button {
    margin: 5px;
  }
}
</style>
