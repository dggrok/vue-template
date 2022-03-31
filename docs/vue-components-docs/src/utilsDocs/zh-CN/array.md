## array 数组方法

### findValueByKey（根据key获取对应的value）
`findValueByKey` 方法 用于数据转换，后台返回的key转成对应字典的value值
### 参数
| 参数       | 说明        | 类型                      | 可选值 | 默认值 |
| -------- |-----------|-------------------------|----|-----|
| array    | 传入的字典数组   | Arrary[{key: '',val: ''}] | —  | []  |
| key     | 需要转换的key值 | Number ｜ String         | -   | '' |
### 返回值
返回key对应的value值
### 使用
```js
import { findValueByKey } from "@jy-fe/vue-utils"

const options = [
  {key: 1, val: '是'}, {key: 0, val: '否'}
]

findValueByKey(options, 1); // 是
findValueByKey(options, 0); // 否
```

### filterByName （根据name去重数组）

`filterByName` 方法 用于对象数组去重，根据对应的属性值过滤数组。

### 参数
| 参数    | 说明       | 类型                     | 可选值 | 默认值 |
|-------|----------|------------------------|----|-----|
| array | 传入的字典数组  | Arrary[{name: '',val: ''， ...}] | —  | []  |
| name     | 需要去重的属性名 | String                 | -   | '' |

### 返回值
返回经过name属性过滤过的数组

### 使用
```js
import { filterByName } from "@jy-fe/vue-utils"

const arr = [
  {name: '1', val: '1'}, {name: '1', val: '1'}, {name: '2', val: '2'}
]

filterByName(arr, 'name'); // [{name: '1', val: '1'}, {name: '2', val: '2'}]
```
### arrayEqual (判断两个数组是否相等)
`arrayEqual` 方法 用于判断两个数组是否相等的情况。

### 参数
| 参数   | 说明 | 类型                     | 可选值 | 默认值 |
|------|--|------------------------|----|-----|
| arr1 | 要比较的数组1 | Arrary[] | —  | []  |
| arr2 | 要比较的数组2 | Arrary[] | -  | [] |

### 返回值
若相同则返回true，不相同，返回false
### 使用
```js
import { arrayEqual } from "@jy-fe/vue-utils"

const arr1 = [
  {name: '1', val: '1'},{name: '2', val: '2'}
]
const arr2 = [
  {name: '1', val: '1'},{name: '2', val: '2'}
]

arrayEqual(arr1, arr2); // true

arrayEqual(arr1, []); // false
```
