<template>
  <div
    :class="`jy-drawer ${isOpen ? ' jy-drawer-open' : ''}`"
    :style="{
      top: `${contentOffset.top}px`,
      height: `calc(100% - ${contentOffset.top}px)`,
      width: isOpen ? `calc(100% - ${contentOffset.left}px)` : 0
    }"
  >
    <div
      class="jy-drawer-mask"
      @click="handleClickMask"
    ></div>
    <div
      class="jy-drawer-content-wrapper"
      :style="{ width: width + 'px', right: isOpen ? 0 : `-${width}px` }"
    >
      <div
        v-if="withHeader"
        class="jy-drawer-title"
      >
        <span class="jy-drawer-title-text">{{ title }}</span>
        <i
          v-if="showClose"
          class="el-icon-close"
          @click="handleClickClose"
        ></i>
      </div>
      <div class="jy-drawer-content-wrap">
        <el-scrollbar style="height:100%;overflow-x:hidden;">
          <div
            v-if="rendered"
            class="jy-drawer-content"
          >
            <slot></slot>
          </div>
        </el-scrollbar>
      </div>
      <div
        v-if="showTag"
        class="jy-drawer-tag"
        :style="{ height: tagHeight + 'px', right: width + 'px' }"
        @click="handleClickTag"
      >
        {{ isOpen ? '收起' : tagOpenText }}
      </div>
      <div
        v-if="showFooter"
        class="jy-drawer-footer"
      >
        <div
          class="jy-drawer-footer-btn jy-drawer-footer-btn__default"
          @click="handleCancle"
        >{{ cancleBtnText }}</div>
        <div
          class="jy-drawer-footer-btn jy-drawer-footer-btn__primary"
          @click="handleConfirm"
        >{{ confirmBtnText }}</div>
      </div>
      <div
        v-if="!showFooter"
        class="jy-drawer-footer-slot"
      >
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'JyDrawer',
  props: {
    width: {
      type: Number, // 300、600(1列)、900(2列)
      default: 300
    },
    tagOpenText: {
      type: String,
      default: '展开'
    },
    tagHeight: {
      type: [String, Number],
      default: 80
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    title: String,
    withHeader: {
      type: Boolean,
      default: false
    },
    showTag: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: false
    },
    cancleBtnText: {
      type: String,
      default: '取消'
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    // 点击遮罩层是否可以关闭 Drawer
    wrapperClosable: {
      type: Boolean,
      default: false
    },
    // 控制是否在关闭 Drawer 之后将子元素全部销毁
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    contentOffset: {
      type: Object,
      default() {
        return {
          top: 0,
          left: 0
        }
      }
    }
  },
  data() {
    return {
      rendered: false
    };
  },
  watch: {
    isOpen(isOpen) {
      if (isOpen) {
        this.rendered = true;
      } else {
        if (this.destroyOnClose === true) {
          this.rendered = false
        }
      }
    }
  },
  methods: {
    handleClickTag() {
      if (this.$listeners.clickTag) {
        this.$emit('clickTag', this.isOpen);
      } else {
        this.$emit('update:isOpen', !this.isOpen);
      }
    },
    handleClickMask() {
      if (this.wrapperClosable) {
        this.close()
        this.$emit('close');
      }
    },
    close() {
      this.$emit('update:isOpen', false);
    },
    handleClickClose() {
      this.close()
      this.$emit('close');
    },
    handleCancle() {
      if (this.$listeners.cancle) {
        this.$emit('cancle');
      } else {
        this.close()
        this.$emit('close');
      }
    },
    handleConfirm() {
      this.$emit('confirm');
    }
  }
};
</script>
