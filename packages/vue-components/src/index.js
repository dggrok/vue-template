import Drawer from './packages/drawer/index.js';
import Button from './packages/button/index.js';
import Search from './packages/search/index.js';
import TreeSelect from './packages/tree-select/index.js';
import DropDown from './packages/drop-down/index.js';
import StandardTable from './packages/standard-table/index.js';
import ListPage from './packages/list-page/index.js';

const components = [
  Drawer,
  Button,
  Search,
  TreeSelect,
  DropDown,
  StandardTable,
  ListPage
]

const install = function(Vue) {
  if (install.installed) {
    return
  }
  components.forEach(component => {
    Vue.component(component.name, component);
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  Drawer,
  Button,
  Search,
  TreeSelect,
  DropDown,
  StandardTable,
  ListPage
}

export default {
  install
}
