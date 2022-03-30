<template>
  <div
    ref="treeselect"
    v-clickoutside="handleClosePopover"
    class="jy-treeselect"
    :style="{ width: width }"
    @click.stop="toggleMenu"
  >

    <el-input
      ref="reference"
      :value="selected.length > 0 ? selected[0][treeProps.label || 'label'] : ''"
      type="text"
      :placeholder="placeholder"
      readonly
    >
      <template
        v-if="$slots.prefix"
        slot="prefix"
      >
        <slot name="prefix"></slot>
      </template>
      <template slot="suffix">
        <i
          v-show="!showClose"
          :class="['el-select__caret', 'el-input__icon', 'el-icon-' + selectorIconClass]"
        ></i>
        <i
          v-if="showClose"
          class="el-select__caret el-input__icon el-icon-circle-close"
          @click="handleClear"
        ></i>
      </template>
    </el-input>

    <div
      v-if="multiple || (filterable && visible)"
      ref="tags"
      class="selector-tags"
    >
      <template v-if="multiple && !collapseTags && selected.length">
        <el-tag
          v-for="item in selected"
          :key="item[nodeKey]"
          class="selector-tag"
          type="info"
          closable
          disable-transitions
          @close="handleCloseTag(item)"
        >
          {{ item[treeProps.label || 'label'] }}
        </el-tag>
      </template>
      <template v-if="multiple && collapseTags && selected.length">
        <el-tag
          class="selector-tag"
          type="info"
          closable
          disable-transitions
          @close="handleCloseTag(selected[0])"
        >
          {{ selected[0][treeProps.label || 'label'] }}
        </el-tag>
        <el-tag
          v-if="selected.length > 1"
          class="selector-tag"
          type="info"
          :closable="false"
          disable-transitions
        >
          + {{ selected.length - 1 }}
        </el-tag>
      </template>
      <input
        v-if="filterable && (multiple || (!multiple && visible))"
        ref="input"
        :value="query"
        :placeholder="
          (!multiple && selected.length > 0) ?
            selected[0][treeProps.label || 'label'] :
            (multiple && selected.length > 0) ? '' : placeholder
        "
        :style="{ 'flex-grow': '1', paddingLeft: multiple ? '10px' : '15px' }"
        type="text"
        class="selector-filter-input"
        @focus="handleFocus"
        @input="(e) => handleQueryChange(e.target.value)"
      />
    </div>

    <transition
      name="el-zoom-in-top"
      @after-leave="doDestroy"
    >
      <select-menu
        v-show="visible"
        ref="popper"
        :append-to-body="popperAppendToBody"
      >
        <el-scrollbar
          ref="scrollbar"
          class="treeselect-popover"
          tag="ul"
          wrap-class="el-select-dropdown__wrap"
          view-class="el-select-dropdown__list"
          :style="{ minWidth: popoverWidth + 'px' }"
        >
          <el-tree
            ref="tree"
            class="treeselect-tree"
            :data="treeData"
            :node-key="nodeKey"
            :props="treeProps"
            :expand-on-click-node="expandOnClickNode"
            :check-strictly="checkStrictly"
            :show-checkbox="multiple"
            :filter-node-method="filterNodeMethod_"
            :render-after-expand="renderAfterExpand"
            :highlight-current="highlightCurrent"
            :default-expand-all="defaultExpandAll"
            :check-on-click-node="checkOnClickNode"
            :default-checked-keys="defaultCheckedKeys"
            :default-expanded-keys="defaultExpandedKeys"
            :lazy="lazy"
            :load="load"
            :render-content="renderContent || renderContent_"
            :accordion="accordion"
            :indent="indent"
            :icon-class="iconClass"
            @node-click="handleNodeClick"
            @check="handleCheck"
          ></el-tree>
        </el-scrollbar>
      </select-menu>
    </transition>
  </div>
</template>

<script lang="jsx">
import { valueEquals } from 'element-ui/src/utils/util';
import clickoutside from '@/utils/clickoutside';
import selectMenu from './select-dropdown.vue';

export default {
  name: 'jy-tree-select',
  directives: {
    clickoutside
  },
  components: {
    selectMenu
  },
  props: {
    value: [String, Number, Array],
    placeholder: String,
    // 节点唯一表示的键名
    nodeKey: {
      type: String,
      default: 'key'
    },
    // 是否多选
    multiple: Boolean,
    // 树数据
    treeData: {
      type: Array,
      default() {
        return [];
      }
    },
    treeProps: {
      type: Object,
      default() {
        return {
          children: 'children',
          label: 'label',
          disabled: 'disabled'
        };
      }
    },
    // 是否可清除
    clearable: {
      type: Boolean,
      default: true
    },
    // 是否可筛选
    filterable: {
      type: Boolean,
      default: true
    },
    // 是否在点击节点的时候选中节点
    checkOnClickNode: {
      type: Boolean,
      default: true
    },
    // 是否默认展开所有节点
    defaultExpandAll: Boolean,
    // 默默认展开的节点的 key 的数组
    defaultExpandedKeys: Array,
    // 对树节点进行筛选时执行的方法
    filterNodeMethod: Function,
    // 父子不互相关联
    checkStrictly: {
      type: Boolean,
      default: true
    },
    remote: Boolean,
    remoteMethod: Function,
    // 是否懒加载子节点，需与 load 方法结合使用
    lazy: Boolean,
    // 加载子树数据的方法，仅当 lazy 属性为true 时生效
    load: Function,
    // 树节点的内容区的渲染 Function
    renderContent: Function,
    width: {
      type: String,
      default: '240px'
    },
    // 是否在第一次展开某个树节点后才渲染其子节点
    renderAfterExpand: {
      type: Boolean,
      default: false
    },
    // 是否高亮当前选中节点，默认值是 false。
    highlightCurrent: {
      type: Boolean,
      default: true
    },
    // 是否每次只打开一个同级树节点展开
    accordion: Boolean,
    // 相邻级节点间的水平缩进，单位为像素
    indent: Number,
    // 自定义树节点的图标
    iconClass: String,
    // 多选时是否将选中值按文字的形式展示
    collapseTags: {
      type: Boolean,
      default: true
    },
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    // 是否在点击节点的时候展开或者收缩节点
    expandOnClickNode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selected: this.multiple ? [] : {},
      query: '',
      popoverWidth: '',
      visible: false,
      menuVisibleOnFocus: false
    };
  },
  computed: {
    readonly() {
      return !this.filterable || this.multiple || !this.visible;
    },
    showClose() {
      return this.clearable && this.selected.length;
    },
    defaultCheckedKeys() {
      return this.multiple ? this.value : [this.value];
    },
    selectorIconClass() {
      return this.remote && this.filterable ? '' : (this.visible ? 'arrow-up is-reverse' : 'arrow-up');
    },
    renderContent_() {
      return (h, { data }) => {
        return (
          <span style={data[this.treeProps.textGray || 'textGray'] ? 'color: #C0C4CC;' : ''}>
            { data[this.treeProps.label || 'label'] }
          </span>
        );
      };
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal, oldVal) {
        if (!valueEquals(newVal, oldVal)) {
          this.$nextTick(() => {
            if (this.multiple) {
              this.$refs.tree.setCheckedKeys(newVal);
            } else {
              this.$refs.tree.setCheckedKeys([newVal]);
            }
            this.selected = this.$refs.tree.getCheckedNodes();
          });
        }
      }
    },
    width: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.popoverWidth = this.$refs.treeselect && this.$refs.treeselect.offsetWidth;
        });
      }
    },
    visible(val) {
      if (!val) {
        this.menuVisibleOnFocus = false;
        this.query = '';
        this.handleQueryChange(this.query);
      } else {
        this.$refs.popper && this.$refs.popper.updatePopper();
        if (!this.multiple && this.filterable) {
          this.$nextTick(() => {
            this.$refs.input.focus();
          });
        }
      }
    },
    selected() {
      // 多选时，根据tags设置input的高度
      if (this.multiple) {
        this.$nextTick(() => {
          const inputChildNodes = this.$refs.reference.$el.childNodes;
          const input = [].filter.call(inputChildNodes, item => item.tagName === 'INPUT')[0];
          input.style.height = Math.max(30, this.$refs.tags.offsetHeight + 2) + 'px';
        });
      }
    },
    treeData: {
      immediate: false,
      handler() {
        this.$nextTick(() => {
          if (this.multiple) {
            this.$refs.tree.setCheckedKeys(this.value);
          } else {
            this.$refs.tree.setCheckedKeys([this.value]);
          }
          this.selected = this.$refs.tree.getCheckedNodes();
        });
      }
    }
  },
  created() {

  },
  mounted() {
    this.checkRepeatNodeKey()
  },
  methods: {
    // 节点点击的回调
    handleNodeClick(data) {
      if (this.multiple || data[this.treeProps.disabled || 'disabled']) {
        return;
      }
      const value = data[this.nodeKey];
      this.$emit('input', value);
      this.emitChange(value);
      this.visible = false;
    },
    // 复选框被点击的回调
    handleCheck(data, checkedObj) {
      if (!this.multiple || data[this.treeProps.disabled || 'disabled']) {
        return;
      }
      const value = checkedObj.checkedKeys;
      this.$emit('input', value);
      this.emitChange(value);
    },
    // 关闭tag的回调
    handleCloseTag(node) {
      this.$refs.tree.setChecked(node[this.nodeKey], false, true);
      const value = this.$refs.tree.getCheckedKeys();
      this.$emit('input', value);
      this.emitChange(value);
    },
    // 清除已选择数据
    handleClear() {
      if (this.multiple) {
        this.$emit('input', []);
        this.emitChange([]);
      } else {
        this.$emit('input', '');
        this.emitChange('');
      }
    },
    handleQueryChange(value) {
      if (this.remote) { // 开启远程搜索时
        this.remoteMethod();
      } else {
        this.query = value;
        this.$refs.tree.filter(value);
      }
    },
    // 对树节点进行筛选时执行的方法
    filterNodeMethod_(value, data, node) {
      if (this.filterNodeMethod) return this.filterNodeMethod(value, data, node);
      // 未传入筛选方法时，定义默认的筛选方法
      if (!value) return true;
      return data[this.treeProps.label || 'label'].indexOf(value) !== -1;
    },
    handleFocus() {
      this.visible = true;
      this.menuVisibleOnFocus = true;
    },
    handleBlur() {

    },
    handleClosePopover() {
      this.visible = false;
    },
    toggleMenu() {
      if (this.menuVisibleOnFocus) {
        this.menuVisibleOnFocus = false;
      } else {
        this.visible = !this.visible;
      }
    },
    doDestroy() {
      this.$refs.popper && this.$refs.popper.doDestroy();
    },
    // 触发组件绑定的change事件
    emitChange(val) {
      if (!valueEquals(this.value, val)) {
        this.$emit('change', val);
      }
    },
    // 检查重复节点
    checkRepeatNodeKey() {
      const keys = [];
      let repeat = false;
      // let repeatNode = {};
      const traverse = (list) => {
        list.forEach(item => {
          const key = item[this.nodeKey];
          if (keys.indexOf(key) > -1) {
            repeat = true;
            // repeatNode = item;
            return;
          } else {
            keys.push(key)
          }
          if (item[this.treeProps.children || 'children']) {
            traverse(item[this.treeProps.children || 'children']);
          }
        });
      };
      if (this.treeData) {
        traverse(this.treeData);
      }
      if (repeat) {
        // console.error(`存在多个${this.nodeKey}=${repeatNode[this.nodeKey]}的节点`)
      }
    }
  }
};
</script>

