<template>
  <div class="date-range-search-component iconNone">
    <el-date-picker
      v-model="data.value[0]"
      class="dateitem"
      :style="{ width: data.width + 'px' }"
      v-bind="data.config"
      placeholder="开始时间"
      @change="comparing(data.value[0],data.value[1])"
    ></el-date-picker>
    <span style="float: left;margin: 0 5px;">{{ data.separator || '至' }}</span>
    <el-date-picker
      v-model="data.value[1]"
      class="dateitem"
      :style="{ width: data.width + 'px' }"
      v-bind="data.config"
      placeholder="结束时间"
      @change="comparing(data.value[0],data.value[1])"
    ></el-date-picker>
  </div>
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
    comparing(beforval, afeterval) {
      this.$emit('change', this.data.value);
      if (!beforval || !afeterval) {
        return;
      }
      if (beforval && beforval.length === 7) {
        beforval = beforval + '-01';
        afeterval = afeterval + '-01';
      }
      beforval = beforval.replace('/-/g', '/');
      afeterval = afeterval.replace('/-/g', '/');
      beforval = new Date(beforval).getTime();
      afeterval = new Date(afeterval).getTime();
      if (beforval > afeterval) {
        this.$toast('结束时间不能小于开始时间');

        this.data.value = ['', ''];
        this.$emit('change', ['', '']);
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.date-range-search-component {
  display: inline-block;
  line-height: 30px;

  .dateitem {
    float: left;
    width: 140px;
  }
}
</style>
<style lang="scss">
.date-range-search-component.iconNone .el-date-editor .el-input__inner {
  padding: 0 10px !important;
}
.date-range-search-component.iconNone .el-icon-date {
  font-size: 0;
}
.date-range-search-component.iconNone .el-input__prefix .el-input__icon{
  font-size: 0;
}
</style>
