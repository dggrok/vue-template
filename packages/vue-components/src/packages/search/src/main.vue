<template>
  <div class="search-component">
    <template v-if="!isDefaultExtend">
      <search-content
        :data="data"
        :all-data="data"
        :show-extend-icon="false"
        :is-extend="true"
        v-on="$listeners"
      >
        <template
          v-for="(item, key) in $slots"
          v-slot:[key]
        >
          <slot :name="key"></slot>
        </template>
      </search-content>
    </template>
    <template v-else>
      <search-content
        :data="dataLimit2"
        :all-data="data"
        :show-extend-icon="showExtendIcon"
        :show-extend-view.sync="showExtendView"
        :is-extend="false"
        v-on="$listeners"
      >
        <template
          v-for="(item, key) in $slots"
          v-slot:[key]
        >
          <slot :name="key"></slot>
        </template>
      </search-content>
      <div
        v-if="showExtendView"
        v-click-outside="handleClickOutside"
        class="search-all-view"
      >
        <search-content
          :data="data"
          :all-data="data"
          :show-extend-icon="false"
          :show-extend-view.sync="showExtendView"
          :is-extend="true"
          v-on="$listeners"
        >
          <template
            v-for="(item, key) in $slots"
            v-slot:[key]
          >
            <slot :name="key"></slot>
          </template>
        </search-content>
      </div>
    </template>
  </div>
</template>

<script>
// import clickOutside from '@/directive/module/v-click-outside';
import clickOutside from 'element-ui/src/utils/clickoutside';
import searchContent from './search-content.vue';

export default {
  name: 'JySearch',
  directives: {
    clickOutside
  },
  components: {
    searchContent
  },
  props: {
    data: {
      type: Object,
      default () {
        return {};
      }
    },
    // 是否默认展开
    isDefaultExtend: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showExtendView: false
    };
  },
  computed: {
    dataLimit2() {
      const newData = {};
      Object.keys(this.data).forEach((key, index) => {
        if (index < 2) {
          newData[key] = this.data[key];
        }
      });
      return newData;
    },
    fieldNum() {
      return Object.keys(this.data).length;
    },
    showExtendIcon() {
      return this.fieldNum > 2;
    }
  },
  methods: {
    handleClickOutside() {
      this.showExtendView = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.search-component {
  position: relative;
  display: inline-block;
  background: #fff;
  .search-all-view {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    margin-right: 10px;
    background: #fff;
    box-shadow:0 4px 20px 0 rgba(0,0,0,0.25);
  }
}
</style>
<style lang="scss">
.search-component {
  .iconNone{
    .el-icon-date{
      font-size: 0;
    }
    .el-date-editor--date .el-input__inner,.el-date-editor--month .el-input__inner{
      padding:0 10px !important;
      .el-input_icon{
        width: auto;
      }
    }
    .el-icon-circle-close{
      position: relative;
      left: 5px;
    }
  }
  .el-select__tags-text{
    max-width: 90px;
  }
  .el-input__inner {
    padding-left: 10px;
  }
}
</style>
