import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import layout from '../components/layout/index.vue'
import changeLog from '../components/change-log.vue'
import navConfig from '../nav.config.json';

const LOAD_DOCS_MAP = {
  'zh-CN': path => {
    return r => require.ensure([], () =>
      r(require(`../docs/zh-CN${path}.md`)),
    'zh-CN');
  }
};

const LOAD_DOC_NEXT_MAP = {
  'zh-CN': path => {
    return r => require.ensure([], () =>
      r(require(`../docs-next${path}/zh-CN${path}.md`)),
    'zh-CN');
  }
}

const LOAD_UTILS_DOCS = {
  'zh-CN': path => {
    return r => require.ensure([], () =>
      r(require(`../utilsDocs/zh-CN${path}.md`)),
    'zh-CN');
  }
}

const loadDocs = function(lang, path) {
  return LOAD_DOCS_MAP[lang](path);
};

const loadNextDocs = function (lang, path) {
  return LOAD_DOC_NEXT_MAP[lang](path);
}

const loadUtilsDocs = function(lang, path) {
  return LOAD_UTILS_DOCS[lang](path);
};

const registerRoute = (navConfig) => {
  const route = [];
  Object.keys(navConfig).forEach((lang) => {
    const navs = navConfig[lang]["component"];
    route.push(...generateRoutes(navs, lang, "component"))
    const utilsNavs = navConfig[lang]["utils"];
    route.push(...generateRoutes(utilsNavs, lang, "utils"))
  });
  return route;
}

const generateRoutes = (navs, lang, prop) => {
  const route = []
  route.push({
    path: `/${prop}`,
    redirect: `/${prop}/installation`,
    component: layout,
    children: []
  });
  navs.forEach(nav => {
    if (nav.href) return;
    if (nav.groups) {
      nav.groups.forEach(group => {
        group.list.forEach(nav => {
          addRoute(nav, lang, prop);
        });
      });
    } else if (nav.children) {
      nav.children.forEach(nav => {
        addRoute(nav, lang, prop);
      });
    } else {
      addRoute(nav, lang, prop);
    }
  });
  function addRoute(page, lang, prop) {
    let component;
    if (page.path === '/changelog') {
      component = changeLog
    } else if (page.path === '/button') {
      component = loadNextDocs(lang, page.path)
    } else {
      if (prop === "component") {
        component = loadDocs(lang, page.path)
      }
      if (prop === "utils") {
        component = loadUtilsDocs(lang, page.path)
      }
    }
    const child = {
      path: `/${prop}/` + page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
        lang
      },
      name: `/${prop}/-` + lang + (page.title || page.name),
      component: component.default || component
    };

    route[0].children.push(child);
  }
  return route
}

let routes = registerRoute(navConfig);

routes = routes.concat([
  {
    path: '/',
    redirect: `/component/installation`
  },
  {
    path: '/utils',
    redirect: `/utils/installation`
  },
  // {
  //   path: '*',
  //   redirect: `/component/installation`
  // }
])

export default new Router({
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 };
  }
});
