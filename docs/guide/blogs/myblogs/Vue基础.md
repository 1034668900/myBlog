**本文供自己复习使用，仅供参考**
## main.js文件

```js
import { createApp } from 'vue'
import App from './App.vue'
/* 
    App.vue是根组件
        - createApp(App) 是将根组件关联到应用上(应用上只能挂载一个根组件)
                        子组件只需要在需要的地方使用即可
        - createApp(App).mount('#app')  
                - 将应用挂载到页面上，
                - 会返回一个根组件的实例，通常命名为vm
                - 组件实例是一个proxy代理对象
*/

const app = createApp(App)
// 返回根组件的实例对象
const vm = app.mount('#app')

/* 
    由于我们这里使用的是ES的模块化，然后通过在网页中利用script标签引入的这个模块，
    ES模块都是运行在一个单独的作用域的，因此在模块里写的代码都相当于在闭包里，不在全局作用域，
    因此在浏览器的控制台是无法直接访问到vm的，需要先将vm添加为window的属性才能在浏览器控制台访问
*/
window.vm = vm
<script>
```
## App.vue文件 - **选项式API风格**

```js
// 引入shallowReactive 创建浅层响应式对象
import { shallowReactive } from 'vue';
export default{
  /* 
      - data用来指定实例对象中的响应式属性
      - 使用vue时，应减少使用箭头函数的次数
      - 如果data通过箭头函数使用，则无法通过this来访问组件实例 
      - 在data中，this就是当前组件的实例vm
  */
  data(){

    /* this就是组件实例，相当于直接向组件实例中添加一个name属性,在浏览体控制台通过vm.name(需要先将vm添加到window)可以直接访问 
        - 1.但是通过vm.name修改值后，页面上的值并不会改变，只有data中返回的对象被代理转换后的数据才是响应式数据
        - 2.但是在页面中其它响应式数据改变时，该改变可以生效一次
        - 3.vm.$data是实际的代理对象,通过vm.$data可以直接访问到$data中的数据
        - 4.我们可以通过vm.$data动态的为代理对象中添加响应式数据,但是不建议这么做
        - 5.我们可以将暂时没用到，后面可能会用的属性先添加到return返回的对象中，值设置为null，使vue对其代理
            后续就可以直接通过根组件的实例对象直接对该属性进行修改，不致于通过$data动态添加导致结构混乱
                  
        总结: 直接向实例中添加的属性不会被vue所代理，不是响应式数据，修改后页面不会变化
    */
    // this.name = 'fc'

    /*  data会返回一个对象作为返回值，vue会对该对象进行一个代理，
        从而将其转换为响应式数据，响应式数据可以直接通过组件实例访问
    注意：- 尽量不要在外部创建一个对象obj，然后在data内直接return obj,
          这样每调用一次组件，虽然都会创建不同的代理对象，但是被代理对象一直都是那个obj，组件实例之间会相互影响
         - 而我们通过return{} 这样的方式，每次调用组件都创建的是一个新的对象，组件实例之间相互独立，不会影响
         - vue在构建响应式对象时，会同时将对象中的属性也构建成响应式属性 ，即return{内部的所有属性都是响应式属性}
               

     */
    // return obj   不可取
    // 深层响应式对象 即return{内部的所有属性都是响应式属性}
    return {
      msg: "ly超漂亮",
      // stu 内部的属性也全都是响应式属性
      stu: {
        name:"ly",
        age: 21,
        gender: "女",
        boyFriend: {
          name:"fc",
          age:21
        }
      },
      // 数组也是响应式的
      arr: ["1","2","3"]
    }

    // 有时不希望返回的是深层次响应式对象，会对性能有所影响，此时可以创建浅层响应式对象
    // 需要引入shallowReactive进行包装
 /*    return shallowReactive({
      // 此时只有 msg 和 stu 属性为响应式属性，stu内部所有属性都不是响应式属性
      msg: "ly超漂亮",
      stu: {
        name:"ly",
        age: 21,
        gender: "女",
        boyFriend: {
          name:"fc",
          age:21
        }
      }
    }) */
  },
  
  // 在需要使用的地方注册子组件
  components: {
  // 属性名:属性值  通过属性名调用，相同时可以简写只写MyButton        
  },
  
  // created函数会在组件创建完毕后调用
  created(){
    // 此时的name属性也是一个响应式数据,该方法在data方法内部调用没用，
    // 因为那时data方法刚调用，响应式对象还没有建立,$data还木有
    this.$data.name = 'fc'
  },

 /* 
    methods用来指定实例对象中的方法 
      - 直接使用时 --> 属性() ，在事件绑定中可以不写()
      - 它是一个对象{},可以在对象内部定义多个方法
      - 这些方法最终会被挂载到组件实例上
      - 后续可以直接通过组件实例调用这些方法
      - 所有组合实例中的属性，都可以直接在template模板中访问
      - methods中函数的this会被自动绑定为组件实例
 
 */
  methods:{
      sum(a, b){
        console.log(this); // 组件实例vm
        return a + b
      },
      changeAge(){
        if(this.stu.age >= 18){
          this.stu.age = 17
        }else{
          this.stu.age = 21
        }
      },

      methodsInfo(){
      console.log("~~  methodInfo调用");
      return this.stu.age>=18 ? "你是一个成年人~~":"你是一个未成年人~~"
    }
  },

  /* computed 计算属性 使用时不需要加()
    - 结构{ 属性名: getter} , 在只有getter的时候可以简写{ 属性名(){}}， getter的返回值就是该属性名的值
    - 计算属性也可以设置setter,使得计算属性可写，但是不建议这样做,尽量让计算属性只读
    注意： 计算属性的功能methods也能实现，为什么还会使用computed?
      原因：
          - 计算属性，只在其依赖的数据发生变化时才会重新执行，会对数据进行缓存,性能更好
          - 而methods中的方法每次组件重新渲染都会调用
  */
  computed: {
    // 在计算属性的getter中，尽量只做读取相关的逻辑，不要执行会产生(副)作用的代码(例如改)
    computedInfo(){
      console.log("-->  computedInfo调用");
      return this.stu.age>=18 ? "你是一个成年人-->":"你是一个未成年人-->"
    }
  }
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <h1>{{ stu.name }} -- {{ stu.age }} -- {{ stu.gender }} </h1>
  <hr>
  <span> 评语:{{ computedInfo }}</span>
  <hr><br>
  <span> 评语:{{ methodsInfo() }}</span>
  <hr>
  <button @click="changeAge">年龄变化</button>

  
</template>
```
## 模板语法：

```js
<script setup>
import { ref } from 'vue'
const html = `<h2>我是一段html语句</h2>`

const attrs = {
  id: '1',
  class: 'test'
}

let isDisabled = ref(true)
// 组合式API不需要使用this，因此使用箭头函数没影响，选项式API尽量别使用箭头函数
const changeFlag = () => {
    isDisabled.value ? isDisabled.value = false : isDisabled.value = true
 
}
</script>

<template>
  <!-- 
       模板语法：
        - 在模板中可以直接访问到组件中声明的变量
        - 除了组件中的变量外，vue还提供了一些全局对象可以访问： Date、Math、RegExp....
        - 还可以通过app对象来向全局中添加一些全局变量
   	      例如：app.config.globalProperties.属性名 = XXX
        - 使用插值语法(双大括号），只能使用表达式(有返回值的语句)
        - 插值语法实际上就是在修改元素的textContent，如果内容中含有标签，标签会被转义显示，不会作为标签生效
     指令：
   	    - 指令是模板中为标签设置的一些特殊属性，它可以设置标签如何显示内容
        - 指令使用 v- 开头 
          v-text 将表达式的值作为元素的textContent插入，相当于{{}},对标签有转义
          v-html 将表达式的值作为元素的innerHTML插入，对标签没有转义，有XSS攻击的风险
          v-bind 为标签动态的绑定属性,可以简写为冒号 :

   -->
  <!-- <h1>{{ alert("嘿嘿") }}</h1> -->
  <div v-text="html"></div>
  <div v-html="html"></div>
  <!-- 可以直接为该div绑定attrs对象中的所有属性   可以简写 :="attrs" -->
  <div v-bind="attrs"></div>
  <!-- disabled是一个布尔属性(属性值和属性名一样),为布尔值设置属性时，转换后为true也算true
        注意空串 "" 在这里会被当作真值  
  -->
  <input type="text" :disabled="isDisabled">
  <br><hr>
  <button @click="changeFlag">点击切换输入框状态</button>
</template>

<style scoped>
  /* 直接在style标签内书写的样式是全局样式，在全局生效，
  可以通过为style标签添加scoped属性，使样式成为局部样式，只对当前组件生效 
实现原理：
  - 当我们为style标签添加scoped属性后，vue会自动为组件中的所有元素生成一个随机的属性
    形如 data-v-7a7a37b1, 生成后，所有的选择器都会在最后添加一个[data-v-7a7a37b1]
    例如 h1{} -> h1[data-v-7a7a37b1]{}   标签[属性]   属性选择器
  - 注意：- 随机生成的属性，除了会添加到当前组件内的所有元素上，
           也会添加到当前组件引入的其它组件的根元素上，其它组件若是多根组件就都不加
          - 这样设计是为了可以通过父组件来为子组件设计一些样式
  - :deep()   深度选择器 
        例如  .app h2 {}   改造后->  .app h2[XXX]   只有app组件内有[xxx]属性的 h2 生效
              .app .deep(h2) {}   改造后->  .app[XXX] h2  app[xxx]组件内所有的h2都生效，无论是不是当前组件的
  - :global() 全局选择器
 */
</style>

<style module>
/*
  css 模块
    - 会自动的对模块中的类名进行哈希(hash)化,来确保类名的唯一性
    - 在模板中需要使用的地方加上 :class = "$style.box1" 即可使用css模块中对应的样式
    - 如果不想使用$style,可以通过modeule的属性值来指定变量名
 */
 .box1{
  background-color: aqua;
 }
</style>


```