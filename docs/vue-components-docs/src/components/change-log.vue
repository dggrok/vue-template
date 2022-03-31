<template>
  <div class="page-changelog">
    <div class="heading">
      <el-button class="fr">
        <a
          href="https://github.com/ElemeFE/element/releases"
          target="_blank"
        >GitHub Releases</a>
      </el-button>
      更新日志
    </div>
    <ul
      ref="timeline"
      class="timeline"
    >
    </ul>
    <change-log ref="changeLog"></change-log>
  </div>
</template>
<script>
import ChangeLog from '../../CHANGELOG.md';

export default {
  components: {
    ChangeLog
  },
  data() {
    return {};
  },
  mounted() {
    const changeLog = this.$refs.changeLog;
    const changeLogNodes = changeLog.$el.children;
    let a = changeLogNodes[1].querySelector('a');
    a && a.remove();
    let release = changeLogNodes[1].textContent.trim();
    let fragments = `<li><h3><a href="https://github.com/ElemeFE/element/releases/tag/v${release}" target="_blank">${release}</a></h3>`;

    for (let len = changeLogNodes.length, i = 2; i < len; i++) {
      const node = changeLogNodes[i];
      a = changeLogNodes[i].querySelector('a');
      a && a.getAttribute('class') === 'header-anchor' && a.remove();
      if (node.tagName !== 'H3') {
        fragments += changeLogNodes[i].outerHTML;
      } else {
        release = changeLogNodes[i].textContent.trim();
        fragments += `</li><li><h3><a href="https://github.com/ElemeFE/element/releases/tag/v${release}" target="_blank">${release}</a></h3>`;
      }
    }
    fragments = fragments.replace(/#(\d+)/g, '<a href="https://github.com/ElemeFE/element/issues/$1" target="_blank">#$1</a>');
    fragments = fragments.replace(/@([\w-]+)/g, '<a href="https://github.com/$1" target="_blank">@$1</a>');
    this.$refs.timeline.innerHTML = `${fragments}</li>`;

    changeLog.$el.remove();
  }
};
</script>

<style lang="scss">
.page-changelog {
  padding-bottom: 100px;

.fr {
  float: right;
  padding: 0;

&.el-button {
   transform: translateY(-3px);
 }

a {
  display: block;
  padding: 10px 15px;
  color: #333;
}

&:hover a {
   color: #409EFF;
 }
}

.heading {
  margin-bottom: 60px;
  color: #333;
  font-size: 24px;
}

.timeline {
  position: relative;
  padding: 0 0 10px;
  color: #5e6d82;

> li {
  position: relative;
  padding-bottom: 15px;
  line-height: 1.8;
  list-style: none;
  border: 1px solid #ddd;
  border-radius: 4px;

&:not(:last-child) {
   margin-bottom: 50px;
 }
}

ul {
  padding: 30px 30px 15px;

ul {
  padding: 5px 0 0 27px;

  li {
  padding-left: 0;
  color: #555;
  word-break: normal;
}

li::before {
  display: inline-block;
  margin-right: -12px;
  vertical-align: middle;
  border: solid 1px #333;
  content: '';
  //circle: 4px #fff;
}
}
}

li li {
  padding-bottom: 5px;
  padding-left: 20px;
  color: #333;
  font-size: 16px;
  word-break: break-all;
  list-style: none;

&::before {
   display: inline-block;
   vertical-align: middle;
   transform: translateX(-20px);
   content: '';
   //circle: 6px #333;
 }
}

i {
  display: inline-block;
  padding: 0 20px;
}

h3 {
  margin:0;
  padding: 15px 30px;
  color: #333;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 1px solid #ddd;

a {
  float: none;
  margin-left: 0;
  color: #333;
  font-size: 20px;
  opacity: 1;
}
}

h4 {
  margin: 0 0 -10px;
  padding-top: 30px;
  padding-left: 54px;
  font-weight: bold;
  font-size: 18px;
}

p {
  margin: 0;
}

em {
  position: absolute;
  top: 23px;
  right: 30px;
  color: #666;
  font-size: 16px;
  font-style: normal;
}
}
}
</style>

