const { OFF, ERROR, WARN } = require('./constant');

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.vue']
      }
    },
    'import/extensions': ['.js', '.vue']
  },
  extends: ['plugin:vue/recommended', 'plugin:import/errors', 'plugin:import/warnings'],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  rules: {
    'comma-dangle': OFF,
    'vue/eqeqeq': ['error', 'always', { null: 'ignore' }],
    'vue/max-attributes-per-line': [
      ERROR,
      {
        singleline: WARN,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    'vue/order-in-components': [
      'error',
      {
        order: [
          'el',
          'name',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'data',
          'computed',
          'watch',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render'],
          'renderError'
        ]
      }
    ],
    'vue/attributes-order': [
      'error',
      {
        order: ['DEFINITION', 'LIST_RENDERING', 'CONDITIONALS', 'RENDER_MODIFIERS', 'GLOBAL', 'UNIQUE', 'TWO_WAY_BINDING', 'OTHER_DIRECTIVES', 'OTHER_ATTR', 'EVENTS', 'CONTENT']
      }
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: false,
        ignores: []
      }
    ],
    'vue/html-self-closing': 'off',
    'vue/no-mutating-props': 'off',
    'vue/singleline-html-element-content-newline': 'off', // 带属性的标签中的内容需另起一行
    'vue/multiline-html-element-content-newline': 'off', // 元素中有多行内容，需每行内容各占一行
    'vue/no-v-html': 'off', // 关闭禁止使用v-html的规定
    'vue/require-prop-types': ERROR, // 组件props 不能以数组形式存在
    'vue/require-default-prop': OFF,
    'vue/prop-name-casing': ['error', 'camelCase'], // 在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和 JSX 中应该始终使用 kebab-case。
    'accessor-pairs': ERROR, // 强制 getter 和 setter 在对象中成对出现，与计算属性的get和set无关
    'arrow-spacing': [
      ERROR,
      {
        before: true,
        after: true
      }
    ], // 要求箭头函数的箭头之前或之后有空格
    'block-spacing': [ERROR, 'always'], // 禁止或强制在代码块中开括号前和闭括号后有空格
    'brace-style': [
      ERROR,
      '1tbs',
      {
        allowSingleLine: true // 允许块的开括号和闭括号在 同一行
      }
    ], // 大括号的风格统一使用one true brace style
    camelcase: [
      OFF,
      {
        properties: 'always'
      }
    ], // 禁用：要求使用骆驼拼写法
    'comma-spacing': [
      ERROR,
      {
        before: false,
        after: true
      }
    ], // 强制在逗号周围使用空格
    'comma-style': [ERROR, 'last'], // 逗号风格
    'constructor-super': ERROR, // 要求在构造函数中有 super() 的调用
    curly: [ERROR, 'multi-line'], // 强制所有控制语句使用一致的括号风格，如：if可以省略大括号
    'dot-location': [ERROR, 'property'], // 强制在 点号 之前和之后一致的换行
    'eol-last': ERROR, // 文件末尾需存在至少一行空行
    eqeqeq: ['error', 'always', { null: 'ignore' }], // 强制使用绝对等于（不等于）,不对null要求
    'generator-star-spacing': [
      ERROR,
      {
        before: true,
        after: true
      }
    ], // 强制 generator 函数中 * 号周围使用一致的空格
    'handle-callback-err': [ERROR, '^(err|error)$'], // 要求回调函数中有容错处理
    indent: [
      ERROR,
      ERROR,
      {
        SwitchCase: WARN // 强制 switch 语句中的 case 子句的缩进2个空格
      }
    ], // 强制使用一致的缩进
    'jsx-quotes': [ERROR, 'prefer-single'], // 强制所有不包含单引号的 JSX 属性值使用单引号
    'key-spacing': [
      ERROR,
      {
        beforeColon: false,
        afterColon: true
      }
    ], // 强制在对象字面量的属性中冒号后使用空格
    'keyword-spacing': [
      ERROR,
      {
        before: true,
        after: true
      }
    ], // 强制在关键字周围都使用空格
    'new-cap': [
      ERROR,
      {
        newIsCap: true, // 构造函数方法名必须大写
        capIsNew: false // 构造函数不需要一定使用new
      }
    ], // 构造函数大写限制
    'new-parens': ERROR, // 要求调用无参构造函数时带括号
    'no-array-constructor': ERROR, // 禁止使用 Array 构造函数
    'no-caller': ERROR, // 禁用 arguments.caller 或 arguments.callee
    'no-console': ERROR, // 不可以使用console
    'no-class-assign': ERROR, // 不允许修改类声明的变量
    'no-cond-assign': ERROR, // 禁止在条件语句中出现赋值操作符
    'no-const-assign': ERROR, // 禁止修改 const 声明的变量
    'no-control-regex': OFF, // 禁止在正则表达式中使用控制字符
    'no-delete-var': ERROR, // 禁止对变量使用 delete 操作符。
    'no-dupe-args': ERROR, // 禁止在 function 定义中出现重复的参数
    'no-dupe-class-members': ERROR, // 禁止类成员中出现重复的名称
    'no-dupe-keys': ERROR, // 禁止对象字面量中出现重复的 key
    'no-duplicate-case': ERROR, // 禁止出现重复的 case 标签
    'no-empty-character-class': ERROR, // 禁止在正则表达式中出现空字符集
    'no-empty-pattern': ERROR, // 禁止使用空解构模式
    'no-eval': ERROR, // 禁用 eval()
    'no-ex-assign': ERROR, // 禁止对 catch 子句中的异常重新赋值
    'no-extend-native': ERROR, // 禁止扩展原生对象
    'no-extra-bind': ERROR, // 禁止不必要的bind()调用
    'no-extra-boolean-cast': ERROR, // 禁止不必要的布尔类型转换
    'no-extra-parens': [ERROR, 'functions'], // 禁止冗余的括号
    'no-fallthrough': ERROR, // 禁止 case 语句落空
    'no-floating-decimal': ERROR, // 禁止数字字面量中使用前导和末尾小数点
    'no-func-assign': ERROR, // 禁止对 function 声明重新赋值
    'no-implied-eval': ERROR, // 禁止使用类似 eval() 的方法
    'no-inner-declarations': [ERROR, 'functions'], // 禁止在嵌套的语句块中出现 function 声明
    'no-invalid-regexp': ERROR, // 禁止在 RegExp 构造函数中出现无效的正则表达式
    'no-irregular-whitespace': ERROR, // 禁止不规则的空白
    'no-iterator': ERROR, // 禁用 __iterator__ 属性
    'no-label-var': ERROR, // 禁止同一作用域下，标签与属性同名
    'no-labels': [
      ERROR,
      {
        allowLoop: false,
        allowSwitch: false
      }
    ], // 禁用标签语句
    'no-lone-blocks': ERROR, // 禁用不必要的嵌套块
    'no-mixed-spaces-and-tabs': ERROR, // 禁止空格和 tab 的混合缩进
    'no-multi-spaces': ERROR, // 禁止使用多个空格
    'no-multi-str': ERROR, // 禁止使用多行字符串
    'no-multiple-empty-lines': [
      ERROR,
      {
        max: 1 // 最多空一行
      }
    ], // 禁止出现多行空行
    'no-global-assign': ERROR, // 禁止对原生对象或只读的全局对象进行赋值
    'no-unsafe-negation': ERROR, // 禁止对关系运算符的左操作数使用否定操作符
    'no-new-object': ERROR, // 禁用 Object 的构造函数
    'no-new-require': ERROR, // 禁止调用 require 时使用 new 操作符
    'no-new-symbol': ERROR, // 禁止 Symbol 对象前使用 new
    'no-new-wrappers': ERROR, // 禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-obj-calls': ERROR, // 禁止把全局对象作为函数调用
    'no-octal': ERROR, // 禁用八进制字面量
    'no-octal-escape': ERROR, // 禁止在字符串字面量中使用八进制转义序列
    'no-path-concat': ERROR, // 禁止对 __dirname 和 __filename 进行字符串连接
    'no-proto': ERROR, // 禁用__proto__，可使用 Object.getPrototypeOf 和 Object.setPrototypeOf 代替。
    'no-redeclare': ERROR, // 禁止多次声明同一变量
    'no-regex-spaces': ERROR, // 禁止正则表达式字面量中出现多个空格
    'no-return-assign': [ERROR, 'except-parens'], // 禁止在 return 语句中使用赋值语句
    'no-self-assign': ERROR, // 禁止自我赋值
    'no-self-compare': ERROR, // 禁止自身比较
    'no-sequences': ERROR, // 禁用逗号操作符
    'no-shadow-restricted-names': ERROR, // 禁止将标识符定义为受限的名字
    'func-call-spacing': ERROR, // 禁止在函数标识符和其调用之间有空格
    'no-sparse-arrays': ERROR, // 禁用稀疏数组（error:[,,] | true: [1,ERROR,]）
    'no-this-before-super': ERROR, // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
    'no-throw-literal': ERROR, // 禁止抛出的异常不是Error 对象
    'no-trailing-spaces': ERROR, // 禁止使用行尾空白（空格、tab 和其它 Unicode 空白字符）。
    'no-undef': ERROR, // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-undef-init': ERROR, // 禁止将变量初始化为 undefined
    'no-unexpected-multiline': ERROR, // 禁止出现令人困惑的多行表达式
    'no-unmodified-loop-condition': ERROR, // 禁用一成不变的循环条件，防止死循环
    'no-unneeded-ternary': [
      ERROR,
      {
        defaultAssignment: false // 禁止条件表达式作为默认的赋值模式
      }
    ], // 禁止可以在有更简单的可替代的表达式时使用三元操作符
    'no-unreachable': ERROR, // 禁止在 return、throw、continue 和 break 语句之后出现,如果执行的代码
    'no-unsafe-finally': ERROR, // 禁止在 finally 语句块中出现控制流语句
    'no-unused-vars': ERROR, // 禁止出现未使用过的变量
    'no-useless-call': ERROR, // 禁止不必要的 .call() 和 .apply()
    'no-useless-computed-key': ERROR, // 禁止在对象中使用不必要的计算属性
    'no-useless-constructor': ERROR, // 禁用不必要的构造函数
    'no-useless-escape': OFF, // 禁用不必要的转义字符
    'no-whitespace-before-property': ERROR, // 禁止属性前有空白
    'no-with': ERROR, // 禁用 with 语句
    'one-var': [
      ERROR,
      {
        initialized: 'never' // 要求每个作用域的初始化的变量有多个变量声明，除非变量没有初始化
      }
    ], // 强制函数中的变量要么一起声明要么分开声明
    'operator-linebreak': [
      ERROR,
      'after',
      {
        // 要求把换行符放在操作符后面
        overrides: {
          '?': 'before', // 问号置于操作数之前
          ':': 'before' // 冒号置于操作数之前
        }
      }
    ],
    'padded-blocks': [ERROR, 'never'], // 禁止块内填充（块内不能出现首尾空行）
    quotes: [
      OFF,
      'single',
      {
        // js代码中，必须使用单引号
        avoidEscape: true, // 允许字符串使用单引号或双引号，只要字符串中包含了一个其它引号，否则需要转义
        allowTemplateLiterals: true // 允许字符串使用反勾号
      }
    ], // 强制使用一致的反勾号、双引号或单引号
    'semi-spacing': [
      ERROR,
      {
        before: false, // 禁止分号之前有空格
        after: true // 强制分号之后有空格
      }
    ],
    'space-before-blocks': [ERROR, 'always'], // 强制代码块之前出现空格
    /* 'space-before-function-paren'冲突： https://github.com/prettier/prettier/issues/3847 */
    'space-before-function-paren': OFF, // 关闭函数圆括号之前有一个空格，这个会和prettier冲突，暂未找到解决方法
    'space-in-parens': [ERROR, 'never'], // 禁止圆括号内出现空格
    'space-infix-ops': ERROR, // 强制操作符周围有空格
    'space-unary-ops': [
      ERROR,
      {
        words: true, // 适用于单词类一元操作符，例如：new、delete、typeof、void、yield
        nonwords: false // 不适用于这些一元操作符: -、+、--、++、!、!!
      }
    ], // 在一元操作符之前或之后存在空格
    'spaced-comment': [
      ERROR,
      'always',
      {
        // // 或 /* 必须跟随至少一个空白。
        markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ','] // 这些字符在注释头可以不出现空格
      }
    ], // 强制在注释中 // 或 /* 使用一致的空格
    'template-curly-spacing': [ERROR, 'never'], // 禁止模板字符串花括号内出现空格（可以换行）
    'use-isnan': ERROR, // 强制使用 isNaN() 检查 NaN
    'valid-typeof': ERROR, // 强制 typeof 表达式与有效的字符串进行比较
    'wrap-iife': [ERROR, 'any'], // 强制立即执行的函数用括号包裹
    'yield-star-spacing': [ERROR, 'both'], // 强制在 yield* 表达式中 * 周围使用空格
    yoda: [ERROR, 'never'], // 禁止将字面变量写在表达式的左边
    'prefer-const': ERROR, // 要求使用 const 声明那些声明后不再被修改的变量
    'no-debugger': ERROR, // 生产环境禁用 debugger
    // 'no-console': process.env.NODE_ENV === 'production' ? ERROR : 0,
    'object-curly-spacing': [
      ERROR,
      'always',
      {
        objectsInObjects: false
      }
    ], // 强制在花括号中使用一致的空格
    'array-bracket-spacing': [ERROR, 'never'], // 强制数组方括号中使用一致的空格
    'import/no-unresolved': [
      ERROR,
      {
        ignore: ['^@/', '^@']
      }
    ]
  }
};
