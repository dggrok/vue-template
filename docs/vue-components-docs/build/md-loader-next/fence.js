const path = require('path');
const fs = require('fs');

const tagReg = /\s*<([\w-_]+)\s*\/>\s*/;

// 覆盖默认的 fence 渲染策略
module.exports = md => {
  const defaultRender = md.renderer.rules.fence;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    // 判断该 fence 是否在 :::demo 内
    const prevToken = tokens[idx - 1];
    const isInDemoContainer = prevToken && prevToken.nesting === 1 && prevToken.info.trim().match(/^demo\s*(.*)$/);
    if (token.info === 'html' && isInDemoContainer) {
      const matches = token.content.match(tagReg);
      if (matches) {
        const componentName = matches[1];
        const componentPath = path.resolve(env.resourcePath, `../../demos/${componentName}.vue`);
        const content = fs.readFileSync(componentPath, 'utf-8');
        return `<template slot="highlight"><pre v-pre><code class="html">${md.utils.escapeHtml(content.trim())}</code></pre></template>`;
      }
      return '';
    }
    return defaultRender(tokens, idx, options, env, self);
  };
};

