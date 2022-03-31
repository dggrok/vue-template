import Vue from 'vue';
import App from './App.vue';

import router from './router/router.js';

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// 引入jyUI
import JyUI from '@cyw/vue-components/es'
import '@cyw/vue-components/dist/styles/index.css'
Vue.use(JyUI)

import './asset/scss/index.scss'
import hljs from 'highlight.js';

// 引入demo-block
import DemoBlock from './components/demoBlock/index.vue'
import MainHeader from './components/header.vue'
import SideNav from './components/side-nav.vue';
import './demo-styles/index.scss';
Vue.component('DemoBlock', DemoBlock)
Vue.component('MainHeader', MainHeader)
Vue.component('MainHeader', MainHeader)
Vue.component('SideNav', SideNav);

router.afterEach(() => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
