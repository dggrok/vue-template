const fs = require('fs');
const path = require('path');

/** 判断.git是否为文件夹 */
const stats = fs.statSync(path.join(__dirname, '.git'));

/**
 * 判断是否为子模块
 * 子模块.git是一个文件，里面记录着子模块路径，提交信息在主模块的.git文件夹下
 */
const isSubmodule = !stats.isDirectory();

/** 非子模块时，commitlint-config-gitmoji路径 */
let COMMITLINT_CONFIG_GITMOJI_URL = path.join(
  __dirname,
  './node_modules/commitlint-config-gitmoji',
);

/** 子模块时，commitlint-config-gitmoji路径 */
if (isSubmodule) {
  COMMITLINT_CONFIG_GITMOJI_URL = path.join(
    __dirname,
    '../../node_modules/commitlint-config-gitmoji',
  );
}

module.exports = {
  extends: [COMMITLINT_CONFIG_GITMOJI_URL],
  rules: {
    'subject-empty': [0],
    'type-empty': [0],
  },
};
