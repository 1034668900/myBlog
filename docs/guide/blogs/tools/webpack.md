## webpack

- 使前端项目更加工程化
- webpack思想：
  - 工具本身功能追求极简，具体需要什么功能自己**按需引入**
  - 灵活性高

### 基础使用

- 使用步骤
  	1. 初始化项目`npm init -y`
   	2. 安装依赖
        	1. `webpack`
        	2. `webpack-cli`命令行工具
    	3. 在项目中创建src目录，然后编写代码
    	4. 执行```npx webpack```对项目进行打包(注意是`npx`)
- 打包的意义
  - 我们在编写代码时仍然可以书写ES6及其以上语法等，但是打包后`webpack`会将项目打包，并且会将ES6及其以上语法转换为ES5的语法，以及可以将`less`、`sass`、等转换为CSS，将`Vue`、`React`、等转换为`js`。(浏览器只认识`js、html、css`)
- 使用webpack的注意事项
  1. webpack里在src内写的文件是属于前端范畴，在前端运行的，因此遵循的是`ES6模块化的规范`
  2. 除src以外的文件是在node中运行的，例如在其配置文件`webpack.config.js`内遵循的是`Commonjs模块化的规范`
  3. webpack中引入其他模块，但是没有使用内部的方法，这些方法不会被打包，但是如果其他模块内部有些代码要执行，那么即使引入了不使用，那些代码打包时也会一并打包
  4. 默认情况下webpack只能打包`js`，想要打包其他类型的文件需要配置`loader`

### webpack的配置文件

- mode、entry、output

  ```js
  const path = require(path)
  
  module.exports = {
      //设置打包模式： production 表示生产模式  development 表示开发模式
      mode: production,
      // entry用来指定打包时的入口文件  默认 './src/index.js'
      // 有三种写法：单文件写法、数组写法和对象写法(指定多个入口文件，不建议)
      entry: './src/index.js',
      /* 
      可以通过配置 output 选项，告知 webpack 如何向硬盘写入编译文件。
      注意，即使可以存在多个 entry 起点，但只能指定一个 output 配置。 
      */
      output:{
          // 此配置将一个单独的 bundle.js 文件输出到 dist 目录中。
          //filename: 'bundle.js', // 打包后的文件名
          filename: '[name].js',  // []内部是变量-name用入口文件指定的名字作为打包后的文件名
          // 打包前自动清空dist目录
          clean: true ,
          // 指定打包的目录(必须要绝对路径)
          path: path.resolve(__dirname, 'dist'),
  
      }
  }
  ```

- loader(会对代码进行编译)

  - 注意：配置时配置项名字是`module`

  - loader执行顺序：`从右往左、从下往上`

    ```js
    module.exports = {
        // loader
      module: {
        // 规则
        rules: [
            {   
                // 匹配以css结尾的
                test: /\.css$/i,
                // 允许指定多个loader,只引入css-loader，没有style-loader样式不会生效
                use:[
                    // 注意loader顺序！！！
                    {loader: 'style-loader'},// 负责使样式生效
                    {loader: 'css-loader'}// 负责处理import css 文件
                ]
            },
            {
                  // 匹配以sass结尾的
                  test: /\.sass$/i,
                  // 允许指定多个loader
                  use:[
                      {loader: 'style-loader'},
                      {loader: 'sass-loader'}
                  ]
            },
            ,
            {
                //图片等资源类型的数据,可通过type指定路径处理
                test: /\.(jpg|png|gif)$/,
                type: 'asset/resource'
            }
        ],
      },
    }
    ```

    

- babel

  - 通过babel可以将新的JavaScript语法转换为旧的，提高代码的兼容性

  - 在webpack中使用babel需要引入babel的loader

  - 使用步骤：

    1. 安装babel-loader：`npm install --save-dev @babel/core @babel/cli @babel/preset-env`

    2. 配置

       ```js
       {
         "presets": [
           [
             "@babel/preset-env",
             {
               "targets": {
                 "edge": "17",
                 "firefox": "60",
                 "chrome": "67",
                 "safari": "11.1"
               },
               "useBuiltIns": "usage",
               "corejs": "3.6.5"
             }
           ]
         ]
       }
       ```

    3. 在package.json中设置兼容列表

       ```js
       "browserslist": [
           "defaults"
       ]
       ```

- 插件(plugin)

  - 插件用来给webpack扩展功能，提供一些辅助功能
  - html-webpack-plugin
    - 这个插件可以在打包代码后，自动在打包目录生成HTML文件
    - 插件内可以利用`template`指定打包时的模板

  

  

### watch

- 启动项目时添加watch属性会对项目进行监视，一旦项目内容改变会自动重新构建



### 开发服务器

- webpack可以安装一个开发服务器，开启后代码再次运行时就可以在这个开发服务器上运行

  `npm i -D webpack-dev-server`

- 在开发服务器使用后内容修改后浏览器会自动更新，不用手动更新了
- 可以构建时配置`--open`,这样项目启动时会自动在浏览器打开
- 通过`webpack server`启动项目时，不会自动将项目打包到dist，而是直接将其打包到服务器运行

### sourceMap

- 通过配置sourceMap后，可以设置一个代码映射，代码运行时还是执行的是打包后的，但是我们此时可以通过映射的源码对代码进行修改调试

- 在webpack.config.js文件中添加配置`devtool: "inline-source-map"`



## Vite

- 前端项目的一个构建工具
- 相较于`Webpack`，`Vite`采用了不同的运行方式，运行速度更快：
  - 在开发时，并不对项目打包，而是直接采用`ESM`(ES模块)的方式来运行项目
  - 在项目部署时，再对项目进行打包

- 同时`Vite`使用起来更加方便

- 使用插件：

  1. 下载插件

     `$ npm add -D @vitejs/plugin-legacy`

  2. 安装插件

     ```js
     // vite.config.js
     import legacy from '@vitejs/plugin-legacy'
     import { defineConfig } from 'vite'
     
     export default defineConfig({
       plugins: [
         legacy({
           targets: ['defaults', 'not IE 11'],
         }),
       ],
     })
     ```

     