<template>
  <div
    id="app"
    :class="{ 'is-component': isComponent }"
  >
    <main-header></main-header>
    <div class="main-cnt">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
  computed: {
    isComponent() {
      return true
      // return /^component-/.test(this.$route.name || '');
    }
  }
}
</script>
