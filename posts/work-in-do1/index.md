<!-- toc -->

## 2018 年针对公司项目的升级优化及建议

### 一. 依赖管理器使用 [yarn](https://yarn.bootcss.com/docs/)，抛弃 `npm` & `cnpm`

> 基本使用

```v
  // 安装全部依赖
  yarn (yarn install) // => npm install

  // 添加依赖包
  yarn add <package>  // => npm install <package> --save
  yarn add <package> -D // => npm install <package> --save-dev

  // 移除依赖包
  yarn remove <package> // => npm uninstall <package>

  // 本地运行（以 vue-cli 为例）
  yarn start (or yarn run dev)  // => npm start (or npm run dev)

  ...
```

> 关于`yarn.lock`

- 为了在不同机器上得到一致的安装结果，`yarn` 需要比配置在 `package.json` 文件中的依赖列表更多的信息。 `yarn` 需要知道每个安装的依赖包的准确的版本号。

- **须提交到版本管理系统**

---

### 二. `webpack` 配置（基于 `vue-cli@2.9.3` 优化及新增功能）

> 基本配置

- 调整依赖包以及移除不必要依赖包，并优化了打包后代码体积（后续还需要根据项目情况继续优化）

  ![优化前后对比](/posts/work-in-do1/webpack_analysis_bundles.png)

- 修改 `host` 为 `0.0.0.0` 以通过本地 IP 地址访问项目

- 沿用 `sass-resources-loader` 将 `less` 变量提升为全局引用

> 新增配置

- 添加打包指定主题（_支持只改变变量的主题_），在 `config/index.js` 中设置 `theme` 字段（_默认为 `null` 即打包默认主题_），指定的主题须存在于 `src/assets/style/theme` 中

- 添加指定项目为单页面或多页面功能（具体见第三点）

- 添加切换主题功能 (具体见第四点)

---

### 三. 关于单页面、多页面配置

**通过配置 `config/index.js` 中的 `moduleName` 来选择单页面应用还是多页面应用。单页面、多页面可随时互相切换，两者互不影响，路由须分开设置**

> 单页面

- 默认为单页面（即 `moduleName` 为 `null`）

- 默认入口文件 `src/main.js`

> 多页面

- 目录结构（以现有项目为例）

  ![多页面文件结构](/posts/work-in-do1/multiple_page.png)

- 设置多页面，须配置 `moduleName` 为项目页面所在文件夹，如设置为 `views`

- 需要在每个页面添加以 `entry-` 为前缀的入口 js 文件（为了避开项目已有 `js` 文件），还要添加与页面文件夹同名的 `html模板`

- 代码示例

  ```js
  // 例：entry-admin.js

  import Vue from 'vue'
  import App from './index/index'
  // import ...
  new Vue({
    el: '#admin',
    components: {
      App
    },
    // ...,
    template: '<App/>'
  })
  ```

  ```html
  <!-- 例：admin.html -->

  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <link
        rel="shortcut icon"
        href="static/faviconsg.ico"
        type="image/x-icon"
      />
      <title>admin</title>
    </head>
    <body>
      <div id="admin"></div>
      <!-- built files will be auto injected -->
    </body>
  </html>
  ```

---

### 四. 关于切换主题功能

**项目提供默认主题，即打包一套主题，后续无论添加多少套主题都不会增加项目打包体积或消耗用户的资源请求**

> 使用方法

- 通过引入 `ThemePicker` 组件（组件后续根据项目需求调整样式及功能）添加切换主题功能（组件会列出当前提供的所有可切换主题）

- 通过调用 `utils/common.js` 中的 `registerTheme` 方法实现切换主题

- 主题切换后通过 `localstorage` 缓存主题名字

> 添加、维护

- 主题统一存放于 `static/theme` 中，其中 `default.less` 为通用设置，剩余其他即为主要主题样式（根据需求添加主题文件）

- 通用设置 `default.less`

  ```css
  /** 例：default.less **/

  /**
  * 通用设置
  * 必须是所有主题通用的，
  * 否则设置到对应主题中
  **/
  ::-webkit-scrollbar-thumb {
    background: @primaryColor;
  }
  ```

- 主题设置

  ```css
  /** 例：dark.less & light.less **/

  /**
  * 主题设置 -- dark.less
  **/
  // 主要
  @primaryColor: #000000;

  // 在变量声明后引入
  @import './default';

  // 布局
  .sidebar {
    width: 400px;
  }

  /* ------ 分割线 ------ */

  /**
  * 主题设置 -- light.less
  **/
  // 主要
  @primaryColor: #ffffff;

  // 在变量声明后引入
  @import './default';

  // 布局
  .sidebar {
    width: 200px;
  }
  ```

---

### 五. 关于重构

> ui 组件

- 对整体样式进行统一调整，构建 ui 组件主题（脱离项目）

- 为将重构风险降至最低，对于项目中广泛使用到的组件，建议沿用组件，只对组件进行功能的增添完善或进行稍微修改；对于项目中少量使用到的组件，可进行整个组件的重构，同时尽量提供与原组件同样的属性和方法；

- 为每个组件提供一个 `install.js` ，提供单个 vue 组件注册以实现按需加载

> 业务层组件貌似不需要重构 (￣ ▽ ￣)"，只需统一命名入口即可

> 业务页面模块

- 现业务模块页面基本上一个页面就包含了多个模块导致代码量大、`vue`实例对象中`data`数据凌乱等，增加了代码维护的难度。

- 建议将每个模块细化出来，如 `通讯录页面模块`（参考如下结构），其包含了 `通讯录管理` 和 `通讯录设置` ，那么可以将这两个模块独立出来分别维护，而独立出来的这两个模块底下又可以细分出 `人员模块` 和 `部门模块` 等，`人员模块` 又分为 `增添人员` 和 `编辑人员`，这样如果要维护代码就可以快速定位修改位置，修改对应模块即可。
  ```v
  │ │ └─...
  │ │ │ ├─common  // 通用业务组件
  │ │ │ ├─contacts    // 通讯录分为通讯录管理和通讯录设置
  │ │ │ │ ├─images    // 通讯录模块图片
  │ │ │ │ ├─contactsManage    // 通讯录管理
  │ │ │ │ │ ├─memberControl   // 人员模块
  │ │ │ │ │ │ │ index.vue // 人员模块入口引入增添人员、编辑人员模块
  │ │ │ │ │ │ │ index.less // 人员模块样式（包括增添人员、编辑人员）
  │ │ │ │ │ │ │ addMenber.vue // 增添人员
  │ │ │ │ │ │ │ editMember.vue // 编辑人员
  │ │ │ │ │ │ └─...
  │ │ │ │ │ ├─sectorControl   // 部门模块
  │ │ │ │ │ └─...
  │ │ │ │ │ index.vue // 通讯录管理入口引入addMember、addSector等其他业务模块
  │ │ │ │ ├─contactsSetting   // 通讯录设置
  │ │ │ │ └─...
  │ │ │ ├─daily
  │ │ │ └─...
  │ │ │
  │ │ └─...
  ```
- 就目前的代码结构，重构的话需要考虑到 `模块的引入`、`组件属性和方法的传递`、`父子级组件同级组件的数据交流`等因素，重构风险较大，需要顾及到的方面较多。

---

### 六. 项目目录结构

**建议每次模块开发时负责人先构思好项目结构，确定构建好后再进行分工**

```v
│ .babelrc
│ .editorconfig
│ .eslintignore
│ .eslintrc.js
│ .gitignore
│ .postcssrc.js
│ index.html
│ package.json
│ README.md     // 统一规范、组件用法说明文档
│ yarn.lock
│
├─build
│
├─config
│
├─src
│ │ App.vue
│ │ main.js
│ │
│ ├─api
│ │ ├─admin
│ │ │ index.js // 引入apiInfo和apiInner等并通过 { apiInfo, apiInner } 导出
│ │ │ apiInfo.js // 导出apiInfo对象
│ │ │ apiInner.js   // 导出apiInner对象
│ │ │ ...
│ │
│ ├─assets  // 静态资源文件
│ │ ├─icon
│ │ │
│ │ ├─images
│ │ │
│ │ └─style
│ │
│ ├─components
│ │ ├─Example // 组件统一大写字母开头？
│ │ │ index.less  // 组件样式
│ │ │ index.vue // 组件主入口
│ │ │ install.js  // 提供单个vue组件注册
│ │ │
│ │ └─...
│ │
│ ├─directives  // 指令
│ │
│ ├─router  // 路由
│ │
│ ├─utils   // 工具
│ │
│ ├─views // 目录结构示例
│ │ └─admin
│ │ │ ├─common  // 通用业务组件
│ │ │ ├─contacts    // 通讯录分为通讯录管理和通讯录设置
│ │ │ │ ├─images    // 通讯录模块图片
│ │ │ │ ├─contactsManage    // 通讯录管理
│ │ │ │ │ ├─memberControl   // 人员模块
│ │ │ │ │ │ │ index.vue // 人员模块入口引入增添人员、编辑人员模块
│ │ │ │ │ │ │ index.less // 人员模块样式（包括增添人员、编辑人员）
│ │ │ │ │ │ │ addMenber.vue // 增添人员
│ │ │ │ │ │ │ editMember.vue // 编辑人员
│ │ │ │ │ │ └─...
│ │ │ │ │ ├─sectorControl   // 部门模块
│ │ │ │ │ └─...
│ │ │ │ │ index.vue // 通讯录管理入口引入addMember、addSector等其他业务模块
│ │ │ │ ├─contactsSetting   // 通讯录设置
│ │ │ │ └─...
│ │ │ ├─daily
│ │ │ └─...
│ │ │ index.less  // 页面样式
│ │ │ index.vue // 提供入口
│ │ │
│ │ └─...
│ │
│ └─vuex
│
├─static
│ │ └─theme // 主题
│ │ │ default.less  // 通用颜色样式设置
│ │ │ dark.less // dark主题
│ │ │ light.less // light主题
│ │ │ ...others theme
│ │ │
│ │ └─...
│
└─test
```
