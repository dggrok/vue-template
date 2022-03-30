import ListPage from './src/main.vue';

/* istanbul ignore next */
ListPage.install = function(Vue) {
  Vue.component(ListPage.name, ListPage);
};

export default ListPage
