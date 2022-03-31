const TerserPlugin = require('terser-webpack-plugin');
// 引入webpack通用配置
const webpackCommonConfig = require('./webpack.config.js');
// 引入配置合并插件
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = webpackMerge.merge(webpackCommonConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  optimization: {
    // 提取公共代码
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: { // node_modules里的代码
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          // name: 'vendors', 一定不要定义固定的name
          priority: 10, // 优先级
          enforce: true
        }
      }
    },
    minimizer: [
      // 配置生产环境的压缩方案：js和css
      new TerserPlugin({
        // 多进程打包
        parallel: true,
        terserOptions: {
          // 启动source-map
          sourceMap: true
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, 'css-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader' // 开发环境还是使用style-loader，不然无法及时响应样式变化
          },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
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
  plugins: [
    // 打包体积分析
    // new BundleAnalyzerPlugin(),
    // 提取 CSS
    new MiniCssExtractPlugin({
      filename: "[contenthash].[name].css"
    })
  ],
  performance: {
    maxEntrypointSize: 40000000,
    maxAssetSize: 40000000 // 整数类型（以字节为单位）
  }
})
