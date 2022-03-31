// build/webpack.dev.js
// 引入webpack
const webpack = require('webpack');
// 引入webpack通用配置
const webpackCommonConfig = require('./webpack.config.js');
// 引入配置合并插件
const webpackMerge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require("@soda/friendly-errors-webpack-plugin");
// 在node环境中可以获取本机IP地址的包
const internalIp = require("internal-ip");

const port = 9300

module.exports = webpackMerge.merge(webpackCommonConfig, {
  // 指定模式，这儿有none production development三个参数可选
  // 具体作用请查阅官方文档
  mode: 'development',
  target: "web", // 添加这一句
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader' // 开发环境还是使用style-loader，不然无法及时响应样式变化
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass')
            }
          }
        ]
      }
    ]
  },
  devServer: {
    // 默认情况不设置这个只能通过localhost:9000来访问，现在可以通过本机局域网ip来访问，
    host: '0.0.0.0',
    hot: true,
    port: port,
    https: false,
    client: {
      logging: "none",
      overlay: {
        errors: true,
        warnings: true
      },
      progress: true
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `You application is running here http://localhost:${port}`,
          `You application is running here http://${internalIp.v4.sync()}:${port}`
        ]
      },
      // 是否每次都清空控制台
      clearConsole: true
    })

  ]
});
