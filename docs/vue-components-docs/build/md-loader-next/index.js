const md = require('./config');

module.exports = function(source) {
  const content = md.render(source, {
    resourcePath: this.resourcePath
  });

  const startTag = '<!--element-demo:';
  const startTagLen = startTag.length;
  const endTag = ':element-demo-->';
  const endTagLen = endTag.length;
  const tagReg = /\s*<([\w-_]+)\s*\/>\s*/;

  let componenetsString = '';
  const output = []; // 输出的内容
  let start = 0; // 字符串开始位置

  let commentStart = content.indexOf(startTag);
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen);

  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart));

    const commentContent = content.slice(commentStart + startTagLen, commentEnd);
    const matches = commentContent.match(tagReg);
    if (matches) {
      const demoComponentName = matches[1];
      output.push(`<template slot="source"><${demoComponentName} /></template>`);
      const imports = `()=>import('../demos/${demoComponentName}.vue')`;
      componenetsString += `${JSON.stringify(demoComponentName)}: ${imports},`;
    }
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }

  // 仅允许在 demo 不存在时，才可以在 Markdown 中写 script 标签
  let pageScript = '';
  if (componenetsString) {
    pageScript = `<script>
      export default {
        name: 'component-doc',
        components: {
          ${componenetsString}
        }
      }
    </script>`;
  } else if (content.indexOf('<script>') === 0) { // 硬编码，有待改善
    start = content.indexOf('</script>') + '</script>'.length;
    pageScript = content.slice(0, start);
  }

  output.push(content.slice(start));
  return `
    <template>
      <section class="content element-doc">
        ${output.join('')}
      </section>
    </template>
    ${pageScript}
  `;
};
