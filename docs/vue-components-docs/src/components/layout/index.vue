<template>
  <el-scrollbar
    ref="componentScrollBar"
    class="page-component__scroll"
  >
    <div class="page-container page-component">
      <el-scrollbar class="page-component__nav">
        <side-nav
          :data="sideBarData"
          :base="baseUrl"
        ></side-nav>
      </el-scrollbar>
      <div class="page-component__content">
        <router-view class="content"></router-view>
      </div>
      <el-backtop
        v-if="showBackToTop"
        target=".page-component__scroll .el-scrollbar__wrap"
        :right="100"
        :bottom="150"
      ></el-backtop>
    </div>
  </el-scrollbar>
</template>
<script>
import bus from '../../bus';
import navsData from '../../nav.config.json';
import { throttle } from 'throttle-debounce';

export default {
  data() {
    return {
      navsData,
      sideBarData: [],
      baseUrl: '/component',
      scrollTop: 0,
      showHeader: true,
      componentScrollBar: null,
      componentScrollBoxElement: null
    };
  },
  computed: {
    showBackToTop() {
      return !this.$route.path.match(/backtop/);
    }
  },
  watch: {
    '$route.path'(newValue) {
      if (newValue && /utils/.test(newValue)) {
        this.sideBarData = navsData['zh-CN']['utils']
        this.baseUrl = '/utils'
      }
      if (newValue && /component/.test(newValue)) {
        this.sideBarData = navsData['zh-CN']['component']
        this.baseUrl = '/component'
      }
      // 触发伪滚动条更新
      this.componentScrollBox.scrollTop = 0;
      this.$nextTick(() => {
        this.componentScrollBar.update();
      });
    },
  },
  created() {
    bus.$on('navFade', val => {
      this.navFaded = val;
    });
  },
  mounted() {
    this.componentScrollBar = this.$refs.componentScrollBar;
    this.componentScrollBox = this.componentScrollBar.$el.querySelector('.el-scrollbar__wrap');
    this.throttledScrollHandler = throttle(300, this.handleScroll);
    this.componentScrollBox.addEventListener('scroll', this.throttledScrollHandler);
    this.renderAnchorHref();
    this.goAnchor();
    const { path } = this.$route
    if (path && /utils/.test(path)) {
      this.sideBarData = navsData['zh-CN']['utils']
      this.baseUrl = '/utils'
    }
    if (path && /component/.test(path)) {
      this.sideBarData = navsData['zh-CN']['component']
      this.baseUrl = '/component'
    }
  },
  destroyed() {
    document.body.classList.remove('is-component');
  },
  beforeDestroy() {
    this.componentScrollBox.removeEventListener('scroll', this.throttledScrollHandler);
  },
  methods: {
    renderAnchorHref() {
      if (/changelog/g.test(location.href)) return;
      const anchors = document.querySelectorAll('h2 a,h3 a,h4 a,h5 a');
      const basePath = location.href.split('#').splice(0, 2).join('#');

      [].slice.call(anchors).forEach(a => {
        const href = a.getAttribute('href');
        a.href = basePath + href;
      });
    },

    goAnchor() {
      if (location.href.match(/#/g).length > 1) {
        const anchor = location.href.match(/#[^#]+$/g);
        if (!anchor) return;
        const elm = document.querySelector(anchor[0]);
        if (!elm) return;

        setTimeout(_ => {
          this.componentScrollBox.scrollTop = elm.offsetTop;
        }, 50);
      }
    },

    handleScroll() {
      const scrollTop = this.componentScrollBox.scrollTop;
      if (this.showHeader !== this.scrollTop > scrollTop) {
        this.showHeader = this.scrollTop > scrollTop;
      }
      if (scrollTop === 0) {
        this.showHeader = true;
      }
      if (!this.navFaded) {
        bus.$emit('fadeNav');
      }
      this.scrollTop = scrollTop;
    }
  },
  beforeRouteUpdate(to, from, next) {
    next();
    setTimeout(() => {
      const toPath = to.path;
      const fromPath = from.path;
      if (toPath === fromPath && to.hash) {
        this.goAnchor();
      }
      if (toPath !== fromPath) {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        this.renderAnchorHref();
      }
    }, 100);
  }
};
</script>

<style lang="scss">
.page-component__scroll {
  height: calc(100% - 80px);
  margin-top: 80px;

  > .el-scrollbar__wrap {
    overflow-x: auto;
  }
}

.page-component {
  box-sizing: border-box;
  height: 100%;

  &.page-container {
    padding: 0;
  }

  .page-component__nav {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 240px;
    margin-top: 80px;
    transition: padding-top .3s;

    > .el-scrollbar__wrap {
      height: 100%;
      overflow-x: auto;
    }

    &.is-extended {
      padding-top: 0;
    }
  }

  .side-nav {
    height: 100%;
    padding-top: 50px;
    padding-right: 0;
    padding-bottom: 50px;

    & > ul {
      padding-bottom: 50px;
    }
  }

  .page-component__content {
    box-sizing: border-box;
    padding-bottom: 100px;
    padding-left: 270px;
  }

  .content {
    padding-top: 50px;

    > {
      h3 {
        margin: 55px 0 20px;
      }

      table {
        width: 100%;
        margin-bottom: 45px;
        font-size: 14px;
        line-height: 1.5em;
        background-color: #fff;
        border-collapse: collapse;

        strong {
          font-weight: normal;
        }

        td, th {
          max-width: 250px;
          padding: 15px;
          border-bottom: 1px solid #dcdfe6;
        }

        th {
          color: #909399;
          font-weight: normal;
          white-space: nowrap;
          text-align: left;
        }

        td {
          color: #606266;
        }

        th:first-child, td:first-child {
          padding-left: 10px;
        }
      }

      ul:not(.timeline) {
        margin: 10px 0;
        padding: 0 0 0 20px;
        color: #5e6d82;
        font-size: 14px;
        line-height: 2em;
      }
    }
  }
}

@media (max-width: 768px) {
  .page-component {
    .page-component__nav {
      position: static;
      width: 100%;
      margin-top: 0;
    }
    .side-nav {
      padding-top: 0;
      padding-left: 50px;
    }
    .page-component__content {
      padding-right: 10px;
      padding-left: 10px;
    }
    .content {
      padding-top: 0;
    }
    .content > table {
      display: block;
      overflow: auto;
    }
  }
}
</style>

