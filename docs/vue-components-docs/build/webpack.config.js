const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入vue-loader插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackBar = require('webpackbar');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // webpack打包的入口文件
  entry: {
    main: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'), // 打包出口
    filename: 'js/[name].[hash].bundle.js' // 打包完的静态资源文件名
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@utils': resolve('src/utils')
    }
  },
  stats: 'errors-only',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'), // 我们要使用的 html 模板地址
      filename: 'index.html', // 打包后输出的文件名
      favicon: './favicon.ico',
      title: '组件库' // index.html 模板内，通过 <%= htmlWebpackPlugin.options.title %> 拿到的变量
    }),
    new VueLoaderPlugin(),
    // 进度条
    new WebpackBar()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        // 这儿组件库的css一般都是处理过的，我们使用一般的loader即可
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.vue$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /(src(\/|\\)docs(\/|\\).*)\.md$/i,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: path.resolve(__dirname, './md-loader/index.js')
          }
        ]
      },
      {
        test: /(src(\/|\\)utilsDocs(\/|\\).*)\.md$/i,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: path.resolve(__dirname, './md-loader/index.js')
          }
        ]
      },
      {
        test: /(CHANGELOG)\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: path.resolve(__dirname, './md-loader/index.js')
          }
        ]
      },
      {
        test: /(src(\/|\\)docs-next(\/|\\).*)\.md$/i,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: path.resolve(__dirname, './md-loader-next/index.js')
          }
        ]
      },
      {
        test: /\.(jpe?g|png|svg|gif)/i,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[hash:5].[ext]',
            outputPath: '/static',
            limit: 8 * 1024
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[hash:5].[ext]',
            outputPath: '/fonts',
            limit: 1000
          }
        }
      }
      // {
      //   test: /\.(jpe?g|png|svg|gif)/i,
      //   type: 'asset',
      //   generator: {
      //     filename: 'static/[hash][ext][query]' // 局部指定输出位置
      //   },
      //   parser: {
      //     dataUrlCondition: {
      //       maxSize: 8 * 1024 // 限制于 8kb
      //     }
      //   }
      // }
    ]
  }
}
