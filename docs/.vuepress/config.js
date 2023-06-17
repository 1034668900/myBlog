import { defineUserConfig, defaultTheme } from "vuepress";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { getDirname, path } from "@vuepress/utils";
import { searchPlugin } from "@vuepress/plugin-search";
const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "FengCh",
  description: "欢迎来到我的博客网站 !",
  head: [["link", { rel: "icon", href: "/logo.png" }]],
  // Vue组件注册
  plugins: [
    registerComponentsPlugin({
      // 配置项
      components: {
        // componentsDir: path.resolve(__dirname, './components'),
        Home: path.resolve(__dirname, "./components/Home.vue"),
        HomeButton: path.resolve(__dirname, "./components/UI/HomeButton.vue"),
        SelfIntro: path.resolve(__dirname, "./components/SelfIntro.vue"),
      },
    }),
    searchPlugin({
      // 配置项
      locales: {
        "/": {
          placeholder: "Search",
        },
        "/zh/": {
          placeholder: "搜索",
        },
      },
    }),
  ],
  theme: defaultTheme({
    logo: "/logo.png",
    sidebar: "auto",
    // 默认主题配置
    navbar: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "myProjects",
        children: [
          {
            text: "歌词滚动效果",
            link: "https://github.com/1034668900/Lyrics-scrolling-effect.git",
            activeMatch:
              "https://github.com/1034668900/Lyrics-scrolling-effect.git",
          },
          {
            text: "原生js面向对象编程思想实现购物车效果",
            link: "https://github.com/1034668900/ShoppingCart-Effect.git",
            activeMatch:
              "https://github.com/1034668900/ShoppingCart-Effect.git",
          },
          {
            text: "购物商城微信小程序",
            link: "https://gitee.com/Feng_Ch/uni-shop.git",
            activeMatch: "https://gitee.com/Feng_Ch/uni-shop.git",
          },
          {
            text: "购物商城前台项目",
            link: "https://github.com/1034668900/shopping-mall-project.git",
            activeMatch:
              "https://github.com/1034668900/shopping-mall-project.git",
          },
        ],
      },
      {
        text: "JavaScript",
        children: [
          {
            text: "浅拷贝和深拷贝",
            link: "/guide/blogs/JavaScript/浅拷贝和深拷贝.md",
            activeMatch: "/guide/blogs/JavaScript/浅拷贝和深拷贝.md",
          },
          {
            text: "Promise",
            link: "/guide/blogs/JavaScript/Promise.md",
            activeMatch: "/guide/blogs/JavaScript/Promise.md",
          },
          {
            text: "原型链图示",
            link: "/guide/blogs/JavaScript/一图了解原型链.md",
            activeMatch: "/guide/blogs/JavaScript/一图了解原型链.md",
          },
        ],
      },
      {
        text: "Vue",
        children: [
          {
            text: "Vue2",
            link: "/guide/blogs/vue/Vue2.md",
            activeMatch: "/guide/blogs/vue/Vue2.md",
          },
          {
            text: "Vue3",
            link: "/guide/blogs/vue/Vue3.md",
            activeMatch: "/guide/blogs/vue/Vue3.md",
          },
        ],
      },
      {
        text: "Tools",
        children: [
          {
            text: "webpack",
            link: "/guide/blogs/tools/webpack.md",
            activeMatch: "/guide/tools/tools/webpack.md",
          },
          {
            text: "git",
            link: "/guide/blogs/tools/git基础知识.md",
            activeMatch: "/guide/blogs/tools/git基础知识.md",
          },
        ],
      },
      {
        text: "Browser",
        children: [
          {
            text: "Ajax使用",
            link: "/guide/blogs/browser/Ajax使用.md",
            activeMatch: "/guide/blogs/browser/Ajax使用.md",
          },
          {
            text: "Fetch简介",
            link: "/guide/blogs/browser/Fetch简介.md",
            activeMatch: "/guide/blogs/browser/Fetch简介.md",
          },
          {
            text: "Axios简介",
            link: "/guide/blogs/browser/Axios简介.md",
            activeMatch: "/guide/blogs/browser/Axios简介.md",
          },
          {
            text: "事件循环",
            link: "/guide/blogs/browser/事件循环.md",
            activeMatch: "/guide/blogs/browser/事件循环.md",
          },
          {
            text: "计算机网络",
            link: "/guide/blogs/browser/计算机网络.md",
            activeMatch: "/guide/blogs/browser/计算机网络.md",
          },
        ],
      },
      {
        text: "GitHub",
        link: "https://github.com/1034668900/1034668900.github.io.git",
      },
    ],
  }),
});
