<template>
  <div
    class="demo-block"
    :class="[blockClass, { 'hover': hovering }]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div
      ref="meta"
      class="meta"
    >
      <div
        v-if="$slots.default"
        class="description"
      >
        <slot></slot>
      </div>
      <div class="highlight">
        <slot name="highlight"></slot>
      </div>
    </div>
    <div
      ref="control"
      class="demo-block-control"
      :class="{ 'is-fixed': fixedControl }"
      @click="isExpanded = !isExpanded"
    >
      <transition name="arrow-slide">
        <i :class="[iconClass, { 'hovering': hovering }]"></i>
      </transition>
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
      <!--      <el-tooltip effect="dark" :content="langConfig['tooltip-text']" placement="right">-->
      <!--        <transition name="text-slide">-->
      <!--          <el-button-->
      <!--              v-show="hovering || isExpanded"-->
      <!--              size="small"-->
      <!--              type="text"-->
      <!--              class="control-button"-->
      <!--              @click.stop="goCodepen">-->
      <!--            {{ langConfig['button-text'] }}-->
      <!--          </el-button>-->
      <!--        </transition>-->
      <!--      </el-tooltip>-->
    </div>
  </div>
</template>
<script type="text/babel">
import { stripScript, stripStyle, stripTemplate } from '../../utils/index';

export default {
  data() {
    return {
      codepen: {
        script: '',
        html: '',
        style: ''
      },
      hovering: false,
      isExpanded: false,
      fixedControl: false,
      scrollParent: null
    };
  },

  computed: {

    blockClass() {
      return `demo-zh demo-${this.$router.currentRoute.path.split('/').pop()}`;
    },

    iconClass() {
      return this.isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom';
    },

    controlText() {
      return this.isExpanded ? '收起' : '展开';
    },

    codeArea() {
      return this.$el.getElementsByClassName('meta')[0];
    },

    codeAreaHeight() {
      if (this.$el.getElementsByClassName('description').length > 0) {
        return this.$el.getElementsByClassName('description')[0].clientHeight +
            this.$el.getElementsByClassName('highlight')[0].clientHeight + 20;
      }
      return this.$el.getElementsByClassName('highlight')[0].clientHeight;
    }
  },

  watch: {
    isExpanded(val) {
      this.codeArea.style.height = val ? `${this.codeAreaHeight + 1}px` : '0';
      if (!val) {
        this.fixedControl = false;
        this.$refs.control.style.left = '0';
        this.removeScrollHandler();
        return;
      }
      setTimeout(() => {
        this.scrollParent = document.querySelector('.page-component__scroll > .el-scrollbar__wrap');
        this.scrollParent && this.scrollParent.addEventListener('scroll', this.scrollHandler);
        this.scrollHandler();
      }, 200);
    }
  },

  created() {
    const highlight = this.$slots.highlight;
    if (highlight && highlight[0]) {
      let code = '';
      let cur = highlight[0];
      if (cur.tag === 'pre' && (cur.children && cur.children[0])) {
        cur = cur.children[0];
        if (cur.tag === 'code') {
          code = cur.children[0].text;
        }
      }
      if (code) {
        this.codepen.html = stripTemplate(code);
        this.codepen.script = stripScript(code);
        this.codepen.style = stripStyle(code);
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      const highlight = this.$el.getElementsByClassName('highlight')[0];
      if (this.$el.getElementsByClassName('description').length === 0) {
        highlight.style.width = '100%';
        highlight.borderRight = 'none';
      }
    });
  },

  beforeDestroy() {
    this.removeScrollHandler();
  },

  methods: {
    scrollHandler() {
      const { top, bottom, left } = this.$refs.meta.getBoundingClientRect();
      this.fixedControl = bottom > document.documentElement.clientHeight &&
          top + 44 <= document.documentElement.clientHeight;
      this.$refs.control.style.left = this.fixedControl ? `${left}px` : '0';
    },

    removeScrollHandler() {
      this.scrollParent && this.scrollParent.removeEventListener('scroll', this.scrollHandler);
    }
  }
};
</script>
<style lang="scss">
.demo-block {
  border: solid 1px #ebebeb;
  border-radius: 3px;
  transition: .2s;

  &.hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
  }

  code {
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
  }

  .demo-button {
    float: right;
  }

  .source {
    padding: 24px;
  }

  .meta {
    height: 0;
    overflow: hidden;
    background-color: #fafafa;
    border-top: solid 1px #eaeefb;
    transition: height .2s;
  }

  .description {
    box-sizing: border-box;
    margin: 10px;
    padding: 20px;
    color: #666;
    font-size: 14px;
    line-height: 22px;
    word-break: break-word;
    background-color: #fff;
    border: solid 1px #ebebeb;
    border-radius: 3px;

    p {
      margin: 0;
      line-height: 26px;
    }

    code {
      display: inline-block;
      height: 18px;
      margin: 0 4px;
      padding: 1px 5px;
      color: #5e6d82;
      font-size: 12px;
      line-height: 18px;
      background-color: #e6effb;
      border-radius: 3px;
    }
  }

  .highlight {
    pre {
      margin: 0;
    }

    code.hljs {
      max-height: none;
      margin: 0;
      border: none;
      border-radius: 0;

      &::before {
        content: none;
      }
    }
  }

  .demo-block-control {
    position: relative;
    box-sizing: border-box;
    height: 44px;
    margin-top: -1px;
    color: #d3dce6;
    text-align: center;
    background-color: #fff;
    border-top: solid 1px #eaeefb;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    cursor: pointer;

    &.is-fixed {
      position: fixed;
      bottom: 0;
      width: 868px;
    }

    i {
      font-size: 16px;
      line-height: 44px;
      transition: .3s;
      &.hovering {
        transform: translateX(-40px);
      }
    }

    > span {
      position: absolute;
      display: inline-block;
      font-size: 14px;
      line-height: 44px;
      transform: translateX(-30px);
      transition: .3s;
    }

    &:hover {
      color: #409EFF;
      background-color: #f9fafc;
    }

    & .text-slide-enter,
    & .text-slide-leave-active {
      transform: translateX(10px);
      opacity: 0;
    }

    .control-button {
      position: absolute;
      top: 0;
      right: 0;
      padding-right: 25px;
      padding-left: 5px;
      font-size: 14px;
      line-height: 26px;
    }
  }
}
</style>

