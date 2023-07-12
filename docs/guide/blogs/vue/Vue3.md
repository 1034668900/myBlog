## Vue3

### Vue3和Vue2的不同点

#### 工程结构

- 在main.js中，Vue3通过`createApp`函数来创建一个**类似**Vue2中的`vm`的应用实例对象`app`

  1. `app`实例对象和`vm`相比内部包含的属性和方法变少

  2. 在Vue3项目中，已经**不能从vue中引入Vue**来创建`vm`实例了

- 在Vue2项目的`template`模板中，**必须**有一个根标签,但是在Vue3项目中**可以没有**根标签

####  响应式核心

1. **setup**

   1. 是Vue3.0中一个新的配置项，值为一个**函数**
   2. 组件中所用到的：数据、方法等等，**均要配置在setup中**，所以setup配置项是组合式API的基本
   3. setup函数的**两种**返回值：
      1. **若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用**。（重点关注！）
      2. *若返回一个渲染函数：则可以自定义渲染内容*。（了解）
   4. **注意事项：**
      1. 在Vue3的项目中仍然可以以Vue2的方式书写`data、methods、computed...`等配置项
         1. 这些配置项内部的数据**依然**可以在模板中直接访问
         2. 这些配置项内部**可以**正常访问到**setup配置项**内部的数据
         3. 但是在setup配置项中**无法访问**`data、methods、computed...`等配置项内部的数据
      2. 如果`data、methods、computed...`等配置项内部的数据和setup配置项中的数据**有重名情况**，**以setup配置项为主**
      3. **setup**不能是一个**async**函数，因为**async函数**的**返回值不是一个对象**，而是一个**Promise**！！！(`后期也可以返回一个Promise实例，但是需要Suspense和异步引入`)
      4. **总结：** Vue2的配置项别在Vue3中混用
      5. Vue3中使用具名插槽时尽量使用`v-slot : 名字`的形式取名，这样在context上下文里的`slots`里接收到时才有名字，如果仍然使用vue2的`slot = "名字"`的形式，即使使用的是具名插槽，接收到的也还是`default`，看不到名字
   5. **setup的执行时机：**
      - 在`beforeCreate`**之前**执行**一次**，this是`undefined`
   6. **setup的参数(2个)：**
      1. props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性
      2. context：上下文对象
         1. attrs: 值为对象，包含：组件外部传递过来，但**没有在props配置中声明的属性**, 相当于 `this.$attrs`
         2. slots: 收到的插槽内容, 相当于 `this.$slots`
         3. emit: 分发自定义事件的函数, 相当于 `this.$emit`

2. **ref函数**

   - 在Vue2中有一个**ref属性**，通过这个属性可以给一个元素打上标记，然后可以通过`this.$refs.xxx`拿到该元素对象，在Vue3中**仍然可以使用该ref属性**，但是得借助Vue3中的**ref函数**

     ```js
     <template>
       <div>
         <h1 ref="hi">{{ name }}</h1>
         <button @click="getRef">点我一下</button>
       </div>
     </template>
     
     <script>
     import {ref} from 'vue'
     export default {
       setup() {
         let name = "FC";
         let hi = ref(null)
         function getRef() {
           console.log(hi.value.innerHTML);
         }
     
         return { name, getRef,hi };
       },
     };
     </script>
     
     ```

   - 通过ref函数创建的**响应式数据**是一个**引用对象！- 简称 ref 对象 - (RefImpl) ** -- reference(引用) -- implement(执行、实现)

   - **ref 对象是可更改的**，也就是说你可以为 `.value` 赋予新的值。它也是响应式的，即所有对 `.value` 的操作都将被追踪，并且写操作会触发与之相关的副作用

   - 通过**ref函数**创建的响应式数据在模板里使用时**不用**加`.value`,但是在`script`标签内使用时需要加

   - 如果**将一个对象赋值给 ref函数**，那么这个对象将通过 [reactive()](https://cn.vuejs.org/api/reactivity-core.html#reactive) 转为具有深层次响应式的对象。这也意味着如果对象中包含了嵌套的 ref，它们将被深层地解包，若要避免这种深层次的转换,可以使用 [`shallowRef()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref) 来替代。

   - **ref实现响应式的原理：**

     - 传入**基本数据类型**时：
       - 利用**Object.defineProperty**以及**getter**和**setter**实现**数据劫持**，从而实现响应式
     - 传入**引用数据类型**时：
       - 这个对象将通过 [reactive()](https://cn.vuejs.org/api/reactivity-core.html#reactive) 转为具有深层次响应式的对象

3. **reactive函数**

   - 返回一个**对象**的**响应式代理** -- **Proxy对象**。返回的对象以及其中嵌套的对象都会通过 [ES Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 包裹，因此**不等于**源对象，建议只使用响应式代理，避免使用原始对象。**基本数据类型不要用它**

     ```js
     let person = {
         name: 'fc',
         age: '21'
     }
     // p1--代理对象     person--源对象
     let p1 = reactive(person)
     ```

     

   - 响应式转换是“**深层**”的：它会影响到**所有嵌套的属性**。若要避免深层响应式转换，只想保留对这个对象顶层次访问的响应性，可以使用 [shallowReactive()](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 作替代
   
4. **ref和reactive对比：**

   - 从定义数据角度对比：
     1. ref用来定义：**基本类型数据**
     2. reactive用来定义：**对象（或数组）类型数据**
     3. 备注：ref也可以用来定义**对象（或数组）类型数据**, 它内部会自动通过`reactive`转为**代理对象**
   - 从原理角度对比：
     1. ref通过`Object.defineProperty()`的`get`与`set`来实现响应式（数据劫持）
     2. reactive通过使用**Proxy**来实现响应式（数据劫持）, 并通过**Reflect**操作**源对象**内部的数据
   - 从使用角度对比：
     1. ref定义的数据：操作数据**需要**`.value`，读取数据时模板中直接读取**不需要**`.value`
     2. reactive定义的数据：操作数据与读取数据：**均不需要**`.value`



### Vue2和Vue3响应式原理对比

- Vue2中想对一个对象添加一个响应式属性有两种途径：
  - 通过调用vc实例身上的$set方法：`this.$set(给哪个对象添加, 添加的属性名, 属性值)`
  - 通过Vue身上的set方法: `Vue.set(给哪个对象添加, 添加的属性名, 属性值)`

#### Vue2响应式实现原理

1. **对象类型**：通过`Object.defineProperty()`对属性的读取、修改进行拦截（数据劫持）

2. **数组类型**：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）

   ```js
   Object.defineProperty(data, 'count', {
       get () {}, 
       set () {}
   })
   ```

- **存在问题：**

  1. 新增属性、删除属性, 界面不会更新
     - 但也可以通过`this.$set | Vue.set 或 this.$delete | Vue.delete`解决
  2. 直接通过下标修改数组, 界面不会自动更新(getter和setter监测不到)
     - 只有通过对数组包裹后的变更方法`push、shift、pop、push、unshift...`等修改的数组才能被Vue所监测到
     - 但也可以通过`this.$set | Vue.set 或 this.$delete | Vue.delete`解决

#### Vue3响应式原理实现

- **实现原理**：

  1. 通过[Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)（代理）: 拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等

  2. 通过[Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)（反射）: 对源对象的属性进行操作

     ```js
     // 简易实现
     new Proxy(data, {
     	// 拦截读取属性值
         get (target, prop) {
         	return Reflect.get(target, prop)
         },
         // 拦截设置属性值或添加新属性
         set (target, prop, value) {
         	return Reflect.set(target, prop, value)
         },
         // 拦截删除属性
         deleteProperty (target, prop) {
         	return Reflect.deleteProperty(target, prop)
         }
     })
     
     ```

  - 为什么使用**Reflect**?
    1. Reflect有着和Object差不多的功能，但是**Reflect每次操作都会返回此次操作是否成功的结果**，这对框架的封装有着至关重要的作用
    2. 利用Object时只能利用try catch来捕获Object操作的结果，这样封装的代码非常混乱，不够简洁

  

### computed计算属性

- 在Vue3中依然可以像Vue2那样定义计算属性，但是不推荐

- Vue3中计算属性的使用方法

  ```js
  import {computed} from 'vue'
  
  setup(){
      ...
  	//计算属性——简写
      let fullName = computed(()=>{
          return person.firstName + '-' + person.lastName
      })
      //计算属性——完整
      let fullName = computed({
          get(){
              return person.firstName + '-' + person.lastName
          },
          set(value){
              const nameArr = value.split('-')
              person.firstName = nameArr[0]
              person.lastName = nameArr[1]
          }
      })
  }
  
  ```



### watch函数

- 与Vue2中watch配置功能一致,但是在**Vue2中watch是一个配置属性**，只能书写一次，而在**Vue3中watch是一个组合式API函数**，可以重复书写
- 存在的两个问题( vue 3.3.2 仍存在)：
  - 监视**reactive定义的响应式数据**时：**oldValue无法正确获取**、**强制开启了深度监视**（deep配置失效）
  - 监视**reactive定义的响应式数据中某个属性**时：deep配置有效
    - **直接在watch函数的第一个参数写响应式数据中的某个属性(`person.age`)不行，因为它不是一个ref定义的属性或reactive定义的对象**，这种情况得将监视**得将响应式数据中的某个属性作为函数的返回值返回(`()=>person.age`)**存在于第一个参数才有效
- **官方说明：**在深层级模式时，如果回调函数由于深层级的变更而被触发，那么新值和旧值将是同一个对象。当直接侦听一个响应式对象时，侦听器会自动启用深层模式
- **watch监听ref定义的对象是否要写`.value`的问题-两种解决办法**：
  - **方法一：需要**写才能正常监听，为什么？因为当不写`.value`时，watch确实能监听到整个`ref对象  RefImpl`，但是我们的数据是存在于`ref对象`的`.value`里的，而且其值是一个对象，因此这种情况时我们**只有**修改了整个对象其地址才会改变，**才**能被watch监听到，单单修改对象内部的属性时，其在内存中的地址是不会改变的，因此这种情况watch监听不到
  - **方法二：** **开启深度监视**，开启深度监视后，`ref对象`内部的`.value`属性即使是一个对象(而且是一个**Proxy对象**)也能被正常监测到
- **watch监视的多种情况：**

```js
//情况一：监视ref定义的响应式数据
watch(sum,(newValue,oldValue)=>{
	console.log('sum变化了',newValue,oldValue)
},{immediate:true})

//情况二：监视多个ref定义的响应式数据
watch([sum,msg],(newValue,oldValue)=>{
	console.log('sum或msg变化了',newValue,oldValue)
}) 

/* 情况三：监视reactive定义的响应式数据
			若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue！！
			若watch监视的是reactive定义的响应式数据，则强制开启了深度监视 
*/
watch(person,(newValue,oldValue)=>{
	console.log('person变化了',newValue,oldValue)
},{immediate:true,deep:false}) //此处的deep配置不再奏效

//情况四：监视reactive定义的响应式数据中的某个属性
watch(()=>person.job,(newValue,oldValue)=>{
	console.log('person的job变化了',newValue,oldValue)
},{immediate:true,deep:true}) 

//情况五：监视reactive定义的响应式数据中的某些属性
watch([()=>person.job,()=>person.name],(newValue,oldValue)=>{
	console.log('person的job变化了',newValue,oldValue)
},{immediate:true,deep:true})

//特殊情况
watch(()=>person.job,(newValue,oldValue)=>{
    console.log('person的job变化了',newValue,oldValue)
},{deep:true}) //此处由于监视的是reactive所定义的对象中的某个属性，所以deep配置有效

```



### watchEffect函数

- watch的套路是：既要指明监视的属性，也要指明监视的回调
- watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性,即**watchEffect所执行的回调中所依赖的数据只要发生变化，整个watchEffect函数就会重新执行一次**
- watchEffect有点像computed
  - 但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值
  - 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值

```js
//watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
watchEffect(()=>{
    const x1 = sum.value
    const x2 = person.age
    console.log('watchEffect配置的回调执行了')
})
```



### 生命周期

- 在Vue3里面不再提组件销毁，而是**组件卸载**

#### 图示

  ![生命周期图示](/images/vue3/lifecycle.png)


#### 生命周期钩子的改变
  - Vue3.0中可以继续使用Vue2.x中的生命周期钩子，但有有两个被更名：
    - beforeDestroy改名为 beforeUnmount
    - destroyed改名为 unmounted
  - Vue3.0也提供了 Composition API 形式的生命周期钩子，与Vue2.x中钩Q子对应关系如下：
    - beforeCreate ===>setup()
    - created == ====>setup()
    - beforeMount ===>onBeforeMount
    - mounted == === ==>onMounted
    - beforeUpdate===>onBeforeUpdate
    - updated  === == = =>onUpdated
    - beforeUnmount ==>onBeforeUnmount
    - unmounted   === ==>onUnmounted



### 自定义hook

- 什么是hook？—— 本质是一个函数，把setup函数中使用的Composition API进行了封装
- 类似于vue2.x中的mixin
- 自定义hook的优势: 复用代码, 让setup中的逻辑更清楚易懂

### toRef 和 toRefs

- **作用**：创建一个 ref 对象，其value值指向另一个对象中的某个属性

- **语法**：const name = toRef(person,'name')

- **应用**: 要将响应式对象中的某个属性单独提供给外部使用时

- **扩展**：toRefs与toRef功能一致，但可以批量创建多个 ref 对象，语法：toRefs(person)



### shallowReactive 和 shallowRef

- shallowReactive：只处理对象最外层属性的响应式（浅响应式）

- shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理(即没有利用`reactive`将对象类型进行响应式处理，而是直接将该对象放在`value`中)

- 什么时候使用?
  - 如果有一个对象数据，结构比较深, 但变化时只是外层属性变化  --> shallowReactive
  - 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生成新的对象来替换 -->  shallowRef



### readonly 与 shallowReadonly

- readonly: 让一个响应式数据变为只读的（深只读）,不改变数据的响应式类型
- shallowReadonly：让一个响应式数据变为只读的（浅只读）
- 应用场景: 不希望数据被修改时



### toRaw 与 markRaw

- toRaw：
  - 作用：将一个由`reactive`生成的响应式对象转为普通对象(`ref对象不行`)。
  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
- markRaw：
  - 作用：标记一个对象，使其永远不会再成为响应式对象。
  - 应用场景:
    有些值不应被设置为响应式的，例如复杂的第三方类库等。
    当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能



### 自定义ref - customRef

- **作用**：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制

- **参数**:  `customRef( track, trigger)`

  - track( ) 	: 	使vue跟踪传入数据的变化
  - trigger( )  :     在数据修改后使vue重新解析模板
  - **注意事项：**
    1. 在使用`customRef`自定义一个ref的时候，要注意我们需要将`customRef`的结果**返回**，不然我们在`customRef`内部的一切操作都毫无意义
    2. `customRef`函数**接收一个回调**,且**该回调内部必须返回一个对象**，对象内**必须**包含`getter`和`setter`

- 自定义ref实现防抖效果案例：

  ```js
  <template>
    <div>
      <!-- 自定义ref -->
      <input type="text" v-model="msg" />
      <h1>{{ msg }}</h1>
    </div>
  </template>
  
  <script>
  import {customRef } from "vue";
  export default {
    setup() {
      function myRef(value,delay=500) {
        let timer;
        return customRef((track, trigger) => {
          return {
            get() {
              track(); // 使vue跟踪value的改变
                
              return value;
            },
            set(newValue) {
              // timer不能定义在这里
              clearTimeout(timer);// 清理上一个定时器
              timer = setTimeout(() => {
                value = newValue;
                trigger(); // 数据修改完后触发vue重新解析模板
              }, delay);
            },
          };
        });
      }
      let msg = myRef("hello");
  
      return { msg };
    },
  };
  </script>
  
  ```

  

  

### 组件通信 - provide 与 inject

- 作用：实现**祖与后代组件间**通信

- 套路：父组件有一个 `provide` API来提供数据，后代组件有一个 `inject` API来开始使用这些数据

- `provide("数据别名", 数据)`、`let data = inject('数据名')`

- 具体写法：

  1. 祖组件中：

  ```js
  setup(){
  	......
      let car = reactive({name:'奔驰',price:'40万'})
      provide('car',car)
      ......
  }
  ```

  2. 后代组件中：

  ```js
     setup(props,context){
     	......
         const car = inject('car')
         return {car}
     	......
     }
  ```
  
  

### 响应式数据的判断

- **isRef**: 检查一个值是否为一个 `ref 对象`
- **isReactive**: 检查一个对象是否是由 `reactive` 创建的响应式代理
- **isReadonly**: 检查一个对象是否是由 `readonly` 创建的只读代理
- **isProxy**: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理



### Composition API 的优势

####  Options API 存在的问题

- 使用传统OptionsAPI中，新增或者修改一个需求，就需要分别在data，methods，computed里修改


#### Composition API 的优势

- 我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起



### 新的组件

#### Fragment 组件

- 在Vue2中: 组件必须有一个根标签
- 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
- 好处: 减少标签层级, 减小内存占用

#### Teleport

- 什么是Teleport？—— `Teleport` 是一种能够将我们的**组件html结构**移动到指定位置的技术

  ```js
  <teleport to="移动位置">
  	<div v-if="isShow" class="mask">
  		<div class="dialog">
  			<h3>我是一个弹窗</h3>
  			<button @click="isShow = false">关闭弹窗</button>
  		</div>
  	</div>
  </teleport>
  ```



#### Suspense<实验性功能>

- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验

- 使用步骤:

  1. 异步引入组件

     ```js
     import {defineAsyncComponent} from 'vue'
     const Child = defineAsyncComponent(()=>import('./components/Child.vue'))
     ```

  2. 使用`Suspense`包裹组件，并配置好`default`与 `fallback`

     ```js
     <template>
     	<div class="app">
     		<h3>我是App组件</h3>
     		<Suspense>
     			<template v-slot:default>
     				<Child/>
     			</template>
     			<template v-slot:fallback>
     				<h3>加载中.....</h3>
     			</template>
     		</Suspense>
     	</div>
     </template>
     ```

     



### Vue3其他改变

#### 全局API的转移

- Vue 2.x 有许多全局 API 和配置。
  - 例如：注册全局组件、注册全局指令等

  ```js
  //注册全局组件
  Vue.component('MyButton', {
    data: () => ({
      count: 0
    }),
    template: '<button @click="count++">Clicked {{ count }} times.</button>'
  })
  
  //注册全局指令
  Vue.directive('focus', {
    inserted: el => el.focus()
  }
  ```

- Vue3.0中对这些API做出了调整：

  - 将全局的API，即：`Vue.xxx`调整到应用实例（`app`）上

    | **2.x 全局 API（**`Vue`  | **3.x 实例 API (**`app`**)** |
    | :----------------------: | :--------------------------: |
    |     Vue.config.xxxx      |       app.config.xxxx        |
    | Vue.config.productionTip |           **移除**           |
    |      Vue.component       |        app.component         |
    |      Vue.directive       |        app.directive         |
    |        Vue.mixin         |          app.mixin           |
    |         Vue.use          |           app.use            |
    |      Vue.prototype       | app.config.globalProperties  |

    

#### 其他改变

- data选项应始终被声明为一个函数

- 过渡效果类名的更改

  - Vue2.x的写法

    ```css
    .v-enter,
    .v-leave-to {
      opacity: 0;
    }
    .v-leave,
    .v-enter-to {
      opacity: 1;
    }
    ```

  - Vue3.x的写法

    ```css
    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
    
    .v-leave-from,
    .v-enter-to {
      opacity: 1;
    }
    ```

- **移除**`keyCode`作为 `v-on `的修饰符，同时也不再支持`config.keyCodes`

- **移除**`v-on.native`修饰符

  - 父组件中绑定事件

    ```html
    <my-component
      v-on:close="handleComponentEvent"
      v-on:click="handleNativeClickEvent"
    />
    ```

    

  - 子组件中声明自定义事件

    - 父组件绑定了两个事件，子组件**声明接收的就是自定义事件**，**没声明的就是原生事件**

    ```html
    <script>
      export default {
          // 父组件绑定了两个事件，子组件声明接收的就是自定义事件，没声明的就是原生事件
        emits: ['close']
      }
    </script>
    ```

- **移除**过滤器（filter）

  > 过滤器虽然这看起来很方便，但它需要一个自定义语法，打破大括号内表达式是 “只是 JavaScript” 的假设，这不仅有学习成本，而且有实现成本！建议用**方法调用或计算属性去替换过滤器**。

- ...