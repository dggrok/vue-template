## 安装

### npm 安装(暂未发包)

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。

```shell
npm i @jy-fe/vue-utils -S
```

### 项目中使用

```js
// 动态导出
import { findValueByKey } from "@jy-fe/vue-utils"

// 或者全局导出
import * as vueUtils from "@jy-fe/vue-utils"
vueUtils.findValueByKey()
```
