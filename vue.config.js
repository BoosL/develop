const path = require("path");
const debug = process.env.NODE_ENV !== 'production'
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const Is_PRDD = ['production', 'test'].includes(process.env.NODE_ENV)

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 基本路径
  publicPath: './',

  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,

  indexPath: "index.html",
  pages: undefined,

  // 生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,

  // webpack配置
  //对内部的 webpack 配置进行更细粒度的修改 https://github.com/neutrinojs/webpack-chain see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
    if (debug) {
      // 本地开发配置
    } else {
      // 生产开发配置
    }
    //修改文件引入自定义路径
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@components', resolve('src/components'))
  },

  //调整 webpack 配置 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
  configureWebpack: (config) => {
    if (debug) {
      // 为开发环境配置
      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name (module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `${packageName.replace('@', '')}`
              }
            }
          }
        }
      }
    } else {
      // 为生产环境配置
      config.mode = 'production'
      // 利用splitChunks将每个依赖包单独打包，在生产环境下配置
      // 开启gzip压缩
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: /\.ts$|\.html$|\.json$|\.scss/,
        threshold: 10240,
        minRatio: 0.8
      }));
      // 开启分离js
      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name (module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `${packageName.replace('@', '')}`
              }
            }
          }
        },
        minimizer: [new UglifyPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true, // console
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })]
      };
      // 取消webpack警告的性能提示
      config.performance = {
        hints: 'warning',
        //入口起点的最大体积
        maxEntrypointSize: 50000000,
        //生成文件的最大体积
        maxAssetSize: 30000000,
        //只给出 ts 文件的性能提示
        assetFilter: function (assetFilename) {
          return assetFilename.endsWith('.ts');
        }
      }
    }
  },
  css: {
    requireModuleExtension: false,
    loaderOptions: {
      css: {},
      postcss: {},
      sass: {}
    },
  },

  pwa: {
    // PWA 插件相关配置
  },
  devServer: {
    host: "192.168.1.54",  // 访问域名
    port: 8000, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器  http://172.11.11.22:8888/rest/XX/
    hot: true, // 热模块更换
    hotOnly: true, // 热更新
    useLocalIp: true,
    disableHostCheck: true,
    contentBase: path.join(__dirname,'dist'),
    // proxy: 'http://localhost:8000'   // 配置跨域处理,只有一个代理
    proxy: {
      "/api": {
        target: "http://b.qxy37.net/wapapis/",
        pathRewrite: { '^/api': '' },
        changOrigin: true, //允许跨域
        ws: true, //websocket支持
        secure: false
      }
    },
  }
};

