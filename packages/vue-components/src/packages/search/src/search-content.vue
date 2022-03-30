<template>
  <div class="search-content clearfix">
    <div
      v-for="(field, key) in data"
      :key="key"
      class="search-model"
    >
      <div
        v-if="field.title"
        class="title"
        :class="field.required ? 'title-required' : ''"
        :style="{ width: isExtend ? field.titleWidth + 'px' : 'auto' }"
      >
        {{ field.title }}
      </div>
      <div
        class="field-content"
        @click.stop
      >
        <slot
          v-if="field.type === 'slot'"
          :name="key"
        ></slot>
        <component
          :is="`${field.type}_C`"
          v-else
          :data="field"
          @change="(value) => handleChange(value, key)"
          @blur="(value) => handleBlur(value, key)"
        ></component>
      </div>
    </div>
    <div class="search-btn">
      <button
        v-if="showExtendIcon"
        class="extend icon-bpo"
        @click="handleClickExtend"
      >&#xe6de;</button>
      <button
        class="btn-primary"
        @click="searchAll()"
      >查询</button>
      <button
        class="btn-default"
        @click="clearAll()"
      >重置</button>
    </div>
  </div>
</template>

<script>
import * as components from './components';

export default {
  components: {
    ...components
  },
  props: {
    data: {
      type: Object,
      default () {
        return {};
      }
    },
    allData: {
      type: Object,
      default () {
        return {};
      }
    },
    showExtendIcon: Boolean,
    showExtendView: Boolean,
    isExtend: Boolean
  },
  computed: {
    fieldNum() {
      return Object.keys(this.data).length;
    }
  },
  methods: {
    handleChange(value, key) {
      this.$emit('change', value, key);
    },
    handleBlur(value, key) {
      this.$emit('blur', value, key);
    },
    handleClickExtend() {
      this.$emit('update:showExtendView', true);
    },
    // 查询
    searchAll () {
      const params = {};
      Object.keys(this.allData).forEach(key => { params[key] = this.allData[key].value });
      this.$emit('searchCondition', params);
      this.$emit('update:showExtendView', false);
    },
    // 置空
    clearAll () {
      if (this.$listeners.searchClear) {
        this.$emit('searchClear');
      } else {
        Object.keys(this.allData).forEach(key => {
          const { type } = this.allData[key];
          if (type === 'input') {
            this.allData[key].value = '';
          } else if (type === 'select') {
            const multiple = this.allData[key].config && this.allData[key].config.multiple;
            if (multiple) {
              this.allData[key].value = [];
            } else {
              this.allData[key].value = '';
            }
          } else if (type === 'treeSelect') {
            const multiple = this.allData[key].config && this.allData[key].config.multiple;
            if (multiple) {
              this.allData[key].value = [];
            } else {
              this.allData[key].value = '';
            }
          } else if (type === 'cascader') {
            this.allData[key].value = [];
          } else if (type === 'datePicker') {
            this.allData[key].value = '';
          } else if (type === 'dateRange') {
            this.allData[key].value = ['', ''];
          } else if (type === 'radioGroup') {
            this.allData[key].value = '';
          } else if (type === 'autocomplete') {
            this.allData[key].value = '';
          }
        });
        this.$emit('refresh');
      }
      this.$emit('afterClear');
    }
  }
};
</script>

<style lang="scss" scoped>
.search-content {
  padding-left: 20px;
}
.search-model {
  float: left;
  height: 30px;
  margin: 15px 10px 0 0 !important;

  .title {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    width: 85px;
    height: 30px;
    margin-right: 10px;
    color: #333;
    font-size: 14px !important;
    line-height: 1;
    text-align: right;
    vertical-align: middle;
  }
  .title-required {
    &::before {
      margin-right: 4px;
      color: #F56C6C;
      content: '*';
    }
  }
  .field-content {
    display: inline-block;
    vertical-align: middle;
  }
}
.search-btn {
  float: left;
  margin: 15px 0;
  font-size: 14px;

  .extend {
    float: left;
    width:30px;
    height:30px;
    margin-right: 20px;
    color: #666;
    background: #fff;
    border:1px solid rgba(204,204,204,1);
    border-radius:4px;
    cursor: pointer;
  }

  .btn-primary {
    margin-right: 10px;

    &:hover {
      color: #fff;
      background: #3c4c6c !important;
    }

    &:active {
      color: #fff;
      background: #01050f !important;
    }
  }

  .btn-default {
    &:hover {
      color: #00A4FF;
      border-color: #00A4FF !important;
    }

    &:active {
      color: #013d5e;
      border-color: #013d5e !important;
    }
  }

  .color-primary {
    margin-left: 7px;
    color: #00A4FF;
    font-size:14px;
    cursor: pointer;
  }
}
</style>
