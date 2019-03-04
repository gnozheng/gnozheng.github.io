## 基于 `vue2.x` 实践 `prerender-spa-plugin` 插件

### 先从 `官方examples` 入手

由于对这个插件一无所知，所以先从官方示例下手。

- 1、github 搜索 `prerender-spa-plugin`
- 2、git clone ...
- 3、yarn install
- 4、yarn build

本来一气呵成的事，却在第三步卡住了...

呵，不就装个依赖嘛！

然而，最后得到的结果却是安装失败信息:

![](/posts/prerender-spa-plugin/failed-to-download-chromium.png)

在经过一番折腾后（其实没折腾，网上解决方案太麻烦就算了），还是用 `cnpm` 给装上了。

好，在以上步骤都搞定后，看看克隆下来的栗子中打包出来的文件：

![](/posts/prerender-spa-plugin/example-dist.png)

运行打包后的文件，看看页面及源代码：

![页面](/posts/prerender-spa-plugin/example-page.png)

![源代码](/posts/prerender-spa-plugin/example-source.png)

嗯，貌似没问题，审查代码中也有了 dom 结构。接着看它的主要配置（以下配置列出大概，并非栗子中原文件配置写法）：

```js
// webpack配置
// 省略其它...
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = {
  // ...
  plugins: [
    // ...
    // 生产模式下添加...
    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/', '/about', '/contact'],

      renderer: new Renderer({
        inject: {
          foo: 'bar'
        },
        headless: false,
        renderAfterDocumentEvent: 'render-event'
      })
    })
  ]
}
```

```js
// 省略其它...
const router = new VueRouter({
  // ...
  mode: 'history'
})

new Vue({
  // ...
  mounted() {
    // You'll need this for renderAfterDocumentEvent
    // render-event 对应 renderAfterDocumentEvent
    document.dispatchEvent(new Event('render-event'))
  }
})
```

要注意的是，单页面预渲染适用于非动态路由，如果要渲染动态路由可考虑 SSR(服务端渲染)，推荐使用 nuxtjs。

### 听说 `实践是检验真理的唯一标准` ？

基于 `vue@2.5.2` ，在 `build` 文件夹下新建文件 `prerender.conf.js`

```
<!-- vue-cli模板项目文件 -->

├─build
│  │ ...
│  │ prerender.conf.js
│  │ webpack.prod.conf.js
│  │ ...
│...

```

```js
// prerender.conf.js

const path = require('path')
// 预渲染插件
// https://github.com/chrisvfritz/prerender-spa-plugin
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = new PrerenderSPAPlugin({
  // required 预渲染的 webpack-outputted 路径
  staticDir: path.join(__dirname, '../dist'),
  // optional 页面预渲染输出路径
  // outputDir: path.join(__dirname, '../prerendered'),
  // optional index.html 路径
  // indexPath: path.join(__dirname, '../index.html'),
  // required 要预渲染的路由
  routes: ['/', '/adminHome'],
  // opotional 在渲染内容到文件前可自定义`html`文件和输出路径
  postProcess(renderedRoute) {
    // 忽略所有重定向redirects
    renderedRoute.route = renderedRoute.originalRoute

    // 删除空白（生产模式下禁用）
    // renderedRoute.html = renderedRoute.html.split(/>[\s]+</gmi).join('><')

    // 如果输出路径名以 `。html` 文件结尾的话移除 `/index.html`
    // eg. /dist/dir/special.html/index.html -> /dist/dir/special.html
    // if(renderedRoute.route.endsWith('.html')){
    //   renderedRoute.outputPath = path.join(__dirname, 'dist', renderedRoute.route)
    // }

    return renderedRoute
  },

  // optional uses html-minifier
  // minify: {
  //   collapseBooleanAttributes: true,
  //   collapseWhitespace: true,
  //   keepClosingSlash: true,
  //   sortAttributes: true
  // }

  // 服务配置项
  server: {
    port: 8001
  },

  renderer: new Renderer({
    // optional 添加到 `window对象` 的属性名，其内容为 `inject`
    // injectProperty: '__PRERENDER_INJECTED',

    // optional 任何希望通过 `window.injectProperty` 访问的值
    // inject: {
    //   foo: 'bar'
    // }

    // optional 路由异步渲染
    // 限制并行渲染路由数
    // maxConcurrentRoutes: 4,

    // optional 等待指定事件触发后才渲染
    // eg. `document.dispatchEvent(new Event('custom-render-trigger'))`
    renderAfterDocumentEvent: 'render-event',

    // optional 等待指定元素用 `document.querySelector` 被检测才渲染
    // renderAfterElementExists: 'element',

    // optional 等待一段时间后才渲染
    // renderAfterTime: 5000

    // 渲染时显示浏览器窗口
    headless: false
  })
})
```

```js
// webpack.prod.conf.js
// 省略其它...
const PrerenderPlugin = require('./prerender.conf')
// ...
module.exports = {
  // ...,
  plugins: [
    // ...,
    PrerenderPlugin
  ]
}
```

以上配置需要手动指定需要渲染的路由，为了方便，可通过 `glob` 提取路由目录下的文件内容来实现快速指定需要预渲染的路由页面。

### 扩展 `prerender.conf.js`

- 在 `config/index` 下：

```js
module.exports = {
  build: {
    routersToPrerender: {
      // type = null => 不开启渲染插件
      // type = 'default' => 渲染所有路由
      // type = 'router-path' => 渲染指定路由
      // type = 'file-path' => 渲染指定路径下的路由
      type: null,
      // 当 type => router-path 或 file-path 时
      // 用于配置 路由路径 或 文件路径
      source: [],
      // 是否开启 vueMetaInfo 插件
      metaInfo: true
    }

    // ...
  }
}
```

- 修改 `prerender.conf.js`并补充添加 `glob` 读取路由文件 ：

```js
const path = require('path')
const glob = require('glob')
const config = require('../config')
// 预渲染插件
// https://github.com/chrisvfritz/prerender-spa-plugin
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

// 预渲染配置逻辑
// config.build.routersToPrerender => 'default' || 'router-path' || 'file-path'
// 'default' => 渲染所有路由
// 'router-path' => 渲染指定路由
// 'file-path' => 渲染指定路径下的路由
const { type, source } = config.build.routersToPrerender

const defaultFunc = () => {
  let temp = []
  glob.sync(path.join(__dirname, '../src/router/*/*.js')).forEach(filePath => {
    let routers = require(filePath)
    temp = temp.concat(routers.map(item => item.path))
  })

  return temp.filter(item => item.includes('/'))
}

const routerPathFunc = () => {
  return source
}

const filePathFunc = () => {
  let temp = []
  source.map(filePath => {
    let routers = require(filePath)
    temp = temp.concat(routers.map(item => item.path))
  })
  return temp.filter(item => item.includes('/'))
}

const routersToPrerenderMap = {
  default: defaultFunc,
  'router-path': routerPathFunc,
  'file-path': filePathFunc
}

let plugin = null
if (routersToPrerenderMap[type]) {
  //   console.log(123)
  let routersToPrerender = routersToPrerenderMap[type]()
  plugin = new PrerenderSPAPlugin({
    // required 预渲染的 webpack-outputted 路径
    staticDir: path.join(__dirname, '../dist'),
    // optional 页面预渲染输出路径
    // outputDir: path.join(__dirname, '../prerendered'),
    // optional index.html 路径
    // indexPath: path.join(__dirname, '../index.html'),
    // required 要预渲染的路由
    routes: routersToPrerender,
    // opotional 在渲染内容到文件前可自定义`html`文件和输出路径
    postProcess(renderedRoute) {
      // console.log(`--- renderedRoute ---`, renderedRoute)
      // 忽略所有重定向redirects
      // renderedRoute.route = renderedRoute.originalRoute

      // 删除空白（生产模式下禁用）
      // renderedRoute.html = renderedRoute.html.split(/>[\s]+</gmi).join('><')

      // 如果输出路径名以 `.html` 文件结尾的话移除 `/index.html`
      // eg. /dist/dir/special.html/index.html -> /dist/dir/special.html
      // if(renderedRoute.route.endsWith('.html')){
      //   renderedRoute.outputPath = path.join(__dirname, 'dist', renderedRoute.route)
      // }
      // 带参
      const renderedRoutePath = renderedRoute.route.split('/')
      if (renderedRoute.route.includes(':')) {
        renderedRoute.outputPath = path.join(
          __dirname,
          '../dist',
          renderedRoutePath[renderedRoutePath.length - 2],
          'index.html'
        )
      }

      return renderedRoute
    },

    // optional uses html-minifier
    // minify: {
    //   collapseBooleanAttributes: true,
    //   collapseWhitespace: true,
    //   keepClosingSlash: true,
    //   sortAttributes: true
    // }

    // 服务配置项
    server: {
      port: 8087
    },

    renderer: new Renderer({
      // optional 添加到 `window对象` 的属性名，其内容为 `inject`
      // injectProperty: '__PRERENDER_INJECTED',

      // optional 任何希望通过 `window.injectProperty` 访问的值
      // inject: {
      //   foo: 'bar'
      // }

      // optional 路由异步渲染
      // 限制并行渲染路由数
      // maxConcurrentRoutes: 4,

      // optional 等待指定事件触发后才渲染
      // eg. `document.dispatchEvent(new Event('custom-render-trigger'))`
      renderAfterDocumentEvent: 'render-event',

      // optional 等待指定元素用 `document.querySelector` 被检测才渲染
      // renderAfterElementExists: 'element',

      // optional 等待一段时间后才渲染
      // renderAfterTime: 5000

      // 渲染时显示浏览器窗口
      headless: false
    })
  })
}

module.exports = plugin
```

之后，即可通过指定 `config/index.js` 下 `routersToPrerender` 的键值快速配置需要渲染的路由页面。
