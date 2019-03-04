## 项目概况

继重构了原有项目 `webpack` 底层后(基于`vue-cli@2.9.3`，调整依赖、配置多页面、优化包体积等)，项目整体比之前好了不少。然而随着项目不断增大，目前代码量也有四万多五万了：

```bash
$ find . -name "*.js" -or -name "*.vue" -or -name "*.less"|xargs grep -v "^$"|wc -l
> 46555

$ node -v
> v10.5.0

$ yarn -v
> 1.7.0
```

开发环境下，执行 `yarn start` 后，构建时间需要将近**40s**

![构建时间](/posts/webpack-optimization/unoptimization-yarn-start.png)

而热加载耗时也要 **3~4s**

![热加载时间](/posts/webpack-optimization/unoptimization-hot.png)

再来看看生产环境下打包的时间，将近 **50s**

![打包时间](/posts/webpack-optimization/unoptimization-yarn-build.png)

这么看来，不管开发环境还是生产环境下，都浪费不少时间。那么，为了效率，只能动手优化了。

## 措施手段

看了 `webpack` 文档，也参考了网上各种资料，那么就先从`webpack` 提供的插件着手吧

### 先来看看 `DllPlugin` 和 `DllReferencePlugin` 插件

> `DllPlugin` 和 `DllReferencePlugin` 用某种方法实现了拆分 bundles，同时还大大提升了构建的速度(官方如是描述，参考[地址](https://webpack.docschina.org/plugins/dll-plugin/))

- `DllPlugin` 需要独立的配置文件，用于创建一个只有 `dll` 的 `bundle`(dll-only-bundle)，同时会生成一个名为 `manifest.json` 的文件，为 `DllReferencePlugin` 提供相关映射。

- `DllReferencePlugin` 则在 `webpack` 主要配置文件设置，把只有 dll 的 bundle(们)(dll-only-bundle(s)) 引用到需要的预编译的依赖。

好吧，光看它的文档有点难以理解，参考文档提供 `example` 动手实践一下吧。

> 一、配置 `DllPlugin`

在 `webpack` 配置文件夹下新建 `webpack.dll.conf.js`

```js
// webpack.dll.conf.js

const path = require('path')
const webpack = require('webpack')
const config = require('../config')

module.exports = {
  entry: {
    // 根据项目自行配置dll入口
    polyfill: ['babel-polyfill'],
    // 据说不能写vue得用vue/dist/vue.esm.js？有兴趣的可以验证一下
    vendor: ['vue/dist/vue.esm.js', 'vue-router', 'vuex'],
    others: ['vue2-dragula', 'vue-awesome-swiper']
  },
  output: {
    // 打包输出到 static 中方便开发环境和生产环境引用
    path: path.resolve(__dirname, '../static/js'),
    filename: 'dll.[name].js',
    // library 须和 DllPlugin 中的 name 保持一致
    library: '[name]_library'
  },
  plugins: [
    // DllPlugin 配置
    new webpack.DllPlugin({
      // manifest.json 生成路径
      path: path.join(__dirname, '../dll/[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
}
```


然后在 `package.json` 中的 `script` 添加多一个命令 "dll": "webpack -p --progress --config build/webpack.dll.conf.js"，命令行执行 `yarn dll`

![yarn dll](/posts/webpack-optimization/yarn-dll.png)

可见生成了三个 bundles，同时生成的 dll 文件夹中也有三个 `manifest.json` 文件。至此，`DllPlugin` 配置已完成，接下来该配置 `DllReferencePlugin`

> 二、配置 `DllReferencePlugin`

现在，只要在 `webpack.base.conf.js` 中的 `plugins` 上添加 `DllReferencePlugin` 即可。对了，还得在 `index.html` 模板中手动引入 dll bundles。


```js
/** webpack.base.conf.js **/

plugins: [
    ...,
    new webpack.DllReferencePlugin({
      manifest: require('../dll/polyfill-manifest.json')
    }),
    new webpack.DllReferencePlugin({
      manifest: require('../dll/vendor-manifest.json')
    }),
    new webpack.DllReferencePlugin({
      manifest: require('../dll/others-manifest.json')
    })
]
```

```js
  /** index.html **/

  <script src="./static/js/dll.polyfill.js"></script>
  <script src="./static/js/dll.vendor.js"></script>
  <script src="./static/js/dll.others.js"></script>
```

再次运行 `yarn start` 查看构建时间

![构建时间](/posts/webpack-optimization/optimization1-yarn-start.png)

之前是 **40s** 左右，现在是 **35s** 左右，貌似提升不大，

再看看热加载速度，发现第一次也要花费 **3.5s** 左右，不过接下来的热加载时间缩短到 **2.5~3s** 的范围，而 `yarn build` 的时间也变化不大

![打包时间](/posts/webpack-optimization/optimization1-yarn-build.png)

### 再来看看 `happypack` 插件

> `happypack` 通过并行（多线程）编译处理文件提升 `webpack` 构建速度

- 修改 `module` 下 `loader`
- 添加 `plugins` 下 `happypack`

> 一、首先添加 `happypack` 插件依赖

    yarn add happypack -D

> 二、根据[happypack 配置](https://github.com/amireh/happypack)，在 `webpack` 配置文件中 添加/修改 配置

```js
// webpack.base.conf.js

module.exports = {
    ...,
    module: {
        rules: [{
            test: /\.js$/,
            // loader: 'babel-loader',
            use: 'happypack/loader?id=babel',
            include: [
            resolve('src'),
            resolve('test'),
            resolve('node_modules/vue-echarts')
            ]
        }]
    },
    plugins: [
        ...,
        new HappyPack({
            id: 'babel',
            threads: 4,
            loaders: [{
                loader: 'babel-loader',
                options: {
                cacheDirectory: true
                }
            }]
        }),
        new HappyPack({
            id: 'less',
            threads: 2,
            loaders: ['css-loader', 'postcss-loader', 'less-loader']
        })
    ]
}
```

```js
// utils.js 使用vue-cli的话配置样式happypack的文件

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      // use: loader
      // 只针对less配置happypack,不对css配置happypack的原因是因为引入的element-ui会出现样式问题
      use: loader === 'less' ? `happypack/loader?id=${extension}` : loader
    })
  }

  return output
}
```

然后，跑起，emmm...第一次构建还是差不多 **30 多 s**，热加载速度也还是差不多，打包还是花了 **40 多 s**......呜呜哇的一声就哭了，咋就没效果呢。

## 后来的我发现

后来才发现，原来是电脑开太多东西**cpu爆满**了，cpu 这玩意一定程度上会影响构建速度，坑呐！在确定 cpu 状态良好后，再次跑起项目

| count | yarn start | yarn build |
| ----- | :--------: | ---------: |
| 1     |  28530ms   |    37394ms |
| 2     |  23808ms   |    35979ms |

发现，跑了两次，一次比一次快，热加载也缩减到1到2秒多，总的来说比之前的快多了。

## 升级webpack亦可提升构建速度

基于vue-cli@2.9.3生成的项目，`webpack`是3.x版本，当我升级到4.x后，速度也有了提升，而且针对包构建后的体积也有了更细的拆分。

升级到4.x，
原本的 `CommonsChunkPlugin` 已不再支持，，`extract-text-webpack-plugin` 也替换为 `mini-css-extract-plugin` ，还有一些用法的调整等。
升级后，项目构建时间以及热加载速度可见也有了提升，
![webpack4.x构建速度](/posts/webpack-optimization/webpack4.14.0_yarn-start.png)
第一次构建速度**21s**，热加载速度也一次比一次快。
