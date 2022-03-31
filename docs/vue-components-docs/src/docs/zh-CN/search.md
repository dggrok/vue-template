## Search 搜索

基于麒麟页面规范开发的公共菜单页搜索组件。

### 基本用法

不绑定searchClear，点击重置时，使用默认方法清空筛选项的值后触发绑定的refesh事件（用于刷新列表数据）

:::demo
```html
<template>
  <div style="height:150px">
    <jy-search
      :data="searchData"
      @refresh="getList"
      @searchCondition="handleSearch"
      @change="handleSearchChange"
    >
    </jy-search>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchData: {
        name: {
          type: 'input',
          title: '姓名',
          value: 'ddd',
          config: {
            clearable: true
          },
        },
        shop: {
          type: 'autocomplete',
          title: '店铺',
          value: '',
          config: {
            placeholder: '请输入',
            fetchSuggestions: (queryString, cb) => {
              setTimeout(() => {
                const results = [{ value: '海底捞' }, { value: '西贝' }];
                cb(results);
              }, 3000 * Math.random());
            }
          },
        },
        rank: {
          type: 'select',
          title: '段位',
          value: '',
          options: [
            {
              key: '1',
              val: '青铜'
            },{
              key: '2',
              val: '白银'
            },
            {
              key: '9',
              val: '黄金'
            }
          ],
          config: {
            multiple: true,
            filterable: true,
          }
        },
        rank2: {
          type: 'select',
          title: '段位2',
          value: '',
          options: [],
          config: {
            filterable: true,
            remote: true,
            remoteMethod: (query) => {
              if (query !== '') {
                setTimeout(() => {
                  this.searchData.rank2.options = [
                    {
                      key: '1',
                      val: '青铜'
                    },{
                      key: '2',
                      val: '白银'
                    },
                    {
                      key: '9',
                      val: '黄金'
                    }
                  ]
                }, 200);
              } else {
                this.searchData.rank2.options = [];
              }
            }
          }
        },
        gender: {
          type: 'radioGroup',
          title: '性别',
          value: 'male',
          options: [
            {
              key: 'male',
              val: '男'
            },
            {
              key: 'female',
              val: '女'
            }
          ],
          config: {
          }
        },
        post: {
          type: 'treeSelect',
          title: '岗位',
          value: [],
          config: {
            placeholder: '请选择',
            treeData: [
              {
                key: '1',
                label: '一级 1',
                children: [
                  {
                    key: '1-1',
                    label: '一级 1-1',
                  }
                ]
              }
            ],
            multiple: true,
          }

        },
        address: {
          type: 'cascader',
          title: '地址',
          value: [],
          config: {
            options: [
              {
                key: 'zhejiang',
                label: '浙江',
                children: [
                  {
                    key: 'hangzhou',
                    label: '杭州',
                  },
                  {
                    key: 'ningbo',
                    label: '宁波',
                  }
                ]
              }
            ],
            'show-all-levels': false,
            collapseTags: true,
            size: 'mini',
            props: {
              value: 'key',
              checkStrictly: true,
              multiple: true,
            }
          }
        },
        date: {
          type: 'datePicker',
          title: '日期',
          value: '',
          config: {
            type: 'date',
            format: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd',
          }
        },
        dateRange: {
          type: 'dateRange',
          title: '时间段',
          value: ['',''],
          config: {
            type: 'date',
            format: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd',
          }
        },
      }
    }
  },
  methods: {
    handleSearch(params) {
      console.log("params:", params);
    },
    /**
     * 筛选表单值改变
     * @param {String} value 改变后得值
     * @param {String} key 筛选项的属性名
     */
    handleSearchChange(value, key) {
      console.log(key, value);
      switch (key) {
      case 'name':
        console.log('修改了姓名:', value);
        break;

      default:
        break;
      }
    },
    getList() {
        // 获取列表数据
    }
  }
}
</script>
```
:::

### 绑定searchClear事件（重置时存在除了清空值和刷新表格数据以外的逻辑）

:::demo
```html
<template>
  <div style="height:150px">
    <jy-search
      :data="searchData"
      @searchClear="handleSearchClear"
      @searchCondition="handleSearch"
      @change="handleSearchChange"
    >
    </jy-search>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchData: {
        name: {
          type: 'input',
          title: '姓名',
          value: 'ddd',
          config: {
            clearable: true
          },
        },
      }
    }
  },
  methods: {
    handleSearch(params) {
      console.log("params:", params);
    },
    /**
     * 筛选表单值改变
     * @param {String} value 改变后得值
     * @param {String} key 筛选项的属性名
     */
    handleSearchChange(value, key) {
      console.log(key, value);
      switch (key) {
      case 'name':
        console.log('修改了姓名:', value);
        break;

      default:
        break;
      }
    },
    handleSearchClear() {
        // 清空值
        // 刷新数据
        // 其它逻辑
    }
  }
}
</script>
```
:::

### 渲染自定义组件

:::demo
```html
<template>
  <div style='height: 150px'>
    <jy-search
      :data="searchData"
      @refresh="getList"
      @searchCondition="handleSearch"
      @change="handleSearchChange"
    >
      <!-- 插槽名需与筛选项的属性名对应 -->
      <template v-slot:custom>
        <el-select v-model="searchData.custom.value1" placeholder="请选择" :style="{ width: '100px', marginRight: '10px' }">
          <el-option
            label="喜欢"
            value="1">
          </el-option>
          <el-option
            label="不喜欢"
            value="2">
          </el-option>
        </el-select>
        <el-input :style="{ width: '120px'}" v-model="searchData.custom.value2" placeholder="请输入内容"></el-input>
      </template>
    </jy-search>
  </div>
</template>
<script>

export default {
  data() {
    return {
      searchData: {
        custom: {
          // 自定义组件的type为'slot'
          type: 'slot',
          title: '',
          value1: '',
          value2: '',
        },
      }
    }
  },
  methods: {
    handleSearch(params) {
      console.log("params:", params);
    },
    /**
     * 筛选表单值改变
     * @param {String} value 改变后得值
     * @param {String} key 筛选项的属性名
     */
    handleSearchChange(value, key) {
      console.log(key, value);
    },
    getList() {
        // 获取列表数据
    }
  }
}
</script>
```
:::


### Attributes
| 参数                  | 说明                                               | 类型                        | 可选值  | 默认值   |
| --------------------- | ---------------------------------------- | --------------------------- | ---- | ----- |
| data                  | 用于渲染筛选项的数据,属性是筛选项key，值是此筛选项的配置数据     | object     | —    | —     |
| isDefaultExtend       | 是否默认展开                             | boolean     | —    | false     |

### 筛选项配置数据
| 参数                  | 说明                                     | 类型                        | 可选值 | 默认值   |
| --------------------- | ---------------------------------------- | --------------------------- | ---- | ----- |
| type                  | 组件类型                                 | string         |  见支持的type类型  | —     |
| title                 | title                                    | string         |  —  | —     |
| required              | 显示必填星号                             | boolean         |  —  | —     |
| value                 | 绑定值                                   | string / array         |  —  | —     |
| options               | select和radioGroup的选项数据             | string / array         |  —  | —     |
| config                | 配置，会绑定到内部组件的属性上，api详情见各自组件文档 | string / array         |  —  | —     |
| width                 | 宽度                                      | string / number         |  —  | —     |


### 支持的type类型：
- input 输入框，el-input的封装
- select 下拉选择器，el-select的封装
- cascader 级联选择器，el-cascader的封装
- tree-select 下拉树状选择器，tree-select的封装
- data-picker 日期选择器，el-data-picker的封装
- data-range 日期范围选择器，el-data-picker的封装
- radio-group 单选框组，el-radio的封装
- autocomplete 带输入建议的输入框，el-autocomplete的封装

### Events
| 事件名称           | 说明             | 回调参数                            |
| -------------- | -------------- | ---------------------------------------- |
| change          | 选中值发生变化时触发      | (value, key) value:目前的选中值;key:筛选项属性名 |
| focus           | 获取焦点时触发        | (event: Event 或 instance, key) event:type为input、select、cascader、data-picker；instance:组件实例，type为data-picker；key：筛选项数据key |
| searchCondition | 点击查询按钮触发      | params 类型object，属性为筛选项属性名，值为此筛选项的绑定值 |
| searchClear     | 点击重置触发          | — |
| refresh         | 当不绑定searchClear，点击重置，重置数据后触发。      | — |

### 更新日志
- 2021-07-06 添加required属性用于显示必填星号
- 2021-03-30 展开所有筛选项后点击查询收起筛选项
- 2021-01-25 添加focus事件（type类型为input、select、cascader、data-picker）
- 2020-12-24 新增了`type`为`"autocomplete"`的组件
