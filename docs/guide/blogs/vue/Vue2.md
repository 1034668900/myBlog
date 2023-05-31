## 模板语法
### mastach语法 {{ }}  --> 插值语法
- ```{{ }}```内部只能书写**js表达式语句**
- 表达式： 一个表达式会生成一个值，可以放在一个任何需要值的地方
	1. a  -->值本身也是表达式
	2. a+b  --> 运算表达式
	3. foo( ) 	--> 函数调用表达式
	4. 条件 ? 结果1 ： 结果2      --> 三元表达式
- 使用场景
	- 在标签体内解析内容，可以直接读取到data中的所有属性
	- **其实模板语法中可以使用实例对象vm中的所有属性，以及Vue原型上的所有属性在模板中都能使用**

## 指令语法
- **v-bind**
	1. 使用格式： v-bind:属性名 = “属性值”   -->  简写为    :属性名 --> 实现动态绑定属性
	2. 使用场景
		1. 用于解析标签(包括： 标签属性、标签体内容、绑定事件......)
		2.  属性值也得是表达式
		3.  单向绑定(data 中的内容改变会影响使用处的内容跟着改变）
- **v-on**
	1. 使用格式： v-on:事件名   --> 简写 @
	2. 使用场景 --> 用于绑定事件
- **v-text**
	1. **作用**：向其所在的节点中渲染文本内容
	2. **与差值语法的区别**：v-text 会替换掉节点中的内容，{{xx}} 则不会
- **v-html**
	1. **作用**：向指定节点中渲染包含 html 结构的内容
	2. **与插值语法的区别**
		1. v-html 会替换掉节点中所有的内容，{{xx}} 则不会
		2. v-html 可以识别 html 结构

	3. **注意事项**
		- v-html的使用有安全问题
			- 在网站上动态渲染任意 HTML 是非常危险的，容易导致 XSS 攻击
			- 一定要在可信的内容上使用 v-html，永远不要用在用户提交的内容上

- **v-cloak**
	- 特点：该指令没有值
	- 本质是一个特殊属性，Vue 实例创建完毕并接管容器后，会删掉 v-cloak 属性
	- 使用 css 配合 v-cloak 可以解决网速慢时页面展示出 ```{{xxx}}``` 的问题

- **v-once**
	- v-once 所在节点在初次动态渲染后，就视为静态内容了
	- 以后数据的改变不会引起 v-once 所在结构的更新，可以用于优化性能
- **v-pre**
	- 跳过其所在节点的编译过程
	- 可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译

## 数据绑定
### 单向数据绑定
- **v-bind**
	- 实现的是单向绑定,数据只能从data流向页面即**单向数据流**。
	
### 双向数据绑定
- **v-model**
	- 实现的是双向数据绑定,数据可以**双向流动**
	- 双向数据绑定一般都应用在表单类元素（如：input、select等）
	- ```v-model:value``` 可以简写为 v-model,因为v-model默认收集的就是value值。

## el和data的两种写法
### 写法一
```js
new Vue({
	el: '#root',
	// data的对象式写法
	data:{
	}
})
```
### 写法二
```js
const vm = new Vue({
// data的函数式写法 --> 别用箭头函数，会有this指向问题
	data: function(){
		return{
		// 想要的对象
		}
	}
// 函数式写法简写
	data(){
	return {
	// 想要的对象
	}
	}
})
// el的写法二
vm.$mount('#root') // 在实例对象vm上挂载目标容器
```

### 总结
- **由Vue管理的函数一定不要使用箭头函数,箭头函数的this指向的是全局window**

## MVVM 模型
- M **模型**(Model)  : 对应data中的数据
- V **视图**(View) : 模板
- VM **视图模型**(ViewModel) : Vue实例对象
![](/images/vue2/MVVM.png)

## JS 小知识点补充
- **defineproperty(obj, property, 配置项{})**
	- **用于给对象定义属性**
		1. 参数一 绑定属性的目标对象
		2. 参数二 绑定的属性名
		3. 参数三 配置对象
	- **配置对象的属性**
		1. value	设置属性默认值
		2. writable	设置属性数否能够修改
		3. enumerable	设置属性是否可，**枚举**(即是否可遍历)
		4. configurable	设置属性是否可删除或编辑
		5. 在该函数内部可以书写**getter**和**setter**

## 数据代理
### 定义
- 通过一个对象代理对另一个对象中属性的操作(读/写)
- 在Vue2中数据代理是通过defineproperty来实现的
- 一旦data中的数据发生改变，页面中所有用到该数据的地方都会跟着改变

### 数据代理的好处
- 更加方便的操作data中的数据

### Vue2数据代理实现示例

```js
// 实现：通过obj2来代理obj中的x属性
	let obj =  {x : 100}
	let obj2 = { y : 200}
	
	Object.defineProperty(obj2, 'x', {
		get(){
		return obj.x
		},
	// setter中可以接收到属性修改值
		set(value){
		obj.x = value
		}
})
```

## 事件修饰符
- 使用格式 **@click.stop**
	- **prevent**： 阻止默认事件(常用)
	- **stop** ： 阻止事件冒泡(常用)
	- **once**：事件只触发一次(常用)
	- **capture**：使用事件的捕获模式
	- **self**：只有event.target是当前操作的元素时才触发事件
	- **passive**：事件的默认行为立即执行，无需等待事件回调完毕


 ## 键盘事件
- **Keydown**和 **Keyup**
- 使用格式
	- @**keyup**.键名
	- @**keydown**.键名(键码 **不推荐**)
- Vue中**常用按键别名**
	- **enter**	
		- 回车
	- **delete**	
		- 删除(退格)
	- **esc**	
		- 退出
	- **space**	
		- 空格
	- **tab**	
		- 换行(只能配合Keydown键使用，因为Keyup该元素已经失去焦点，无法再响应对应事件)
	- **up**	
		- 上
	- **down**	
		- 下
	- **left**	
		- 左
	- **right** 	
		- 右


- 对于Vue未提供别名的按键，可以使用按键原始的key去绑定，但是要注意转为kebab-case(短横线命名)
	- Vue.config.key
		- 获取对应按键的key
	- Vue.config.keycodes
		- 获取对应按键的codes编码
- **系统修饰按键**(用法**特殊**): ctrl 、 alt 、 shift 、 meta (win键)
	- 配合Keyup使用
		- 按下按键的同时，再按下其它键，接着释放其它按键，事件才会被触发
	- 配合Keydown使用
		- 正常触发事件
- 可以使用KeyCode去指定具体按键(**不推荐**)
- **自定义按键别名**
	- Vue.config.keyCodes.自定义键名 = 键码

## 计算属性(computed)
- **定义**
	- 要使用的属性不存在，需要通过已有属性计算得来
- **原理**
	- 底层借助了**Object.defineProperty**方法提供的**getter**和**setter**
- **get函数什么时候执行？**
	1. 初次读取该属性时会执行一次
	2. 当依赖的数据发生改变时会被再次调用
- **和methods比computed有什么优势？**
	- computed内部有缓存机制(复用),效率更高，调试方便
- **补充**
	1. 计算属性最终会出现在实例对象vm上，使用时可直接读取
	2. 如果计算属性要被修改，那么必须写**set**函数去响应修改，且**set**中要引起计算属性所**依赖**的数据发生变换
	3. 如果计算属性确定不考虑修改，则可以使用计算属性的简写形式
	4. 再页面中可以使用插值语法```{{**计算属性名**}}```来显示计算结果
- **计算属性的简写(不考虑修改才能简写)**

```js
	// 完整写法(计算属性要写成配置对象)
	计算属性名: {
		get(){
		},
	// set按需写
		set(){
		}
	}

	// 简写(不考虑修改)
	计算属性名: function(){
	// 这个函数会被作为get函数使用
	}
```

## 监视属性(watch)
- **监视属性watch**
	1. 当被监视的属性变化时，**回调函数自动调用**，进行相关操作
	2. **监视的属性必须存在**，才能进行监视
	3. 监视的两种写法
		1. new Vue时传入watch配置
		2. 通过vm.$watch监视

```js
	new Vue({
	el: "#root",
	data: {},
	watch: {
		监视属性:{
			immediate: false/true， // 初始化时handler是否执行
			handler(newValue,oldValue){
			// 执行语句
			}
		｝
	}
	})
```

## 计算属性(computed)和监视属性(watch)的区别
- computed能完成的功能，watch都能够完成
- 但是watch能完成的功能，computed不一定能完成。(watch可以进行异步操作)

## 样式绑定
- **class样式**
	- **写法**： class = 'xxx'  其中xxx可以是字符串、对象、数组
		1. **字符串写法**：适用于类名不确定，需要动态获取
		2.  **对象写法**：使用于要绑定多个样式，个数不确定、名字也不确定
		3.  **数组写法**：适用于要绑定多个样式、个数确定、名字也确定，但是不确定用不用
- **style样式**
	-  :style= '{样式属性: xxx}' 其中xxx是动态值
	- :style = '[a, b]' 其中a、b是样式对象

## 条件渲染
- **v-if**
	- **适用场景**：切换频率较低
	- **特点**：不符合if提交的元素直接移除(即无法通过DOM操作获取到元素)
	- **注意事项**： v-if 和 v-else-if 以及 v-else 一起使用时，要求结构不能被打断

- **v-show**
	- **适用场景**： 切换频率较高的场景
	- **特点**：利用的是display属性控制元素的隐藏与否
	- **注意事项**：即使元素被隐藏，也可以通过通过DOM操作获取该元素

## 列表渲染
- **v-for指令**
	- 适用场景：用于展示列表数据
	- 用法：v-for = '(item, index) in xxx'
	- 可以利用v-for指令遍历数组、对象、字符串(非常少)、指定次数遍历(很少)

### v-for指令key原理
- 在使用v-for指令进行遍历时，如果没有指定key值，那么Vue会默认的将遍历时的索引值index作为key
- **将index当作key有什么漏洞**？
	- 对列表数据进行破坏顺序的操作的时候，会产生没有必要的真实DOM的更新，如果此时结构中还有输入类的元素时(例如input输入框),此时会出现数据错乱的现象(和Vue的虚拟DOM对比规则有关)
- **Vue中虚拟DOM对比规则(Diff算法)**
	- 若在旧的虚拟DOM中找到了与新虚拟DOM中相同的key
		1. 若虚拟Dom 中的内容没有改变，则直接使用之前的真实DOM
		2. 若虚拟DOM中的内容变化，则生成新的真实DOM，紧接着替换页面中之前的真实DOM
	- 若在旧的虚拟DOM中没有找到与新的虚拟DOM相同的key
		1. 直接创建新的真实DOM，渲染页面

![Diff算法](/images/vue2/DiffImg.png)

- **以index为key时，为什么在输入框中输入了数据，当进行破坏顺序的操作时数据还是会数据错乱？**
	- 用户在页面中进行的一切操作，都是在操作真实DOM，包括在输入框中输入内容，因此有内容的是真实DOM，但是在Vue的虚拟DOM中，input输入框是没有内容的，对比后发现相同就会将其进行复用，从而导致数据错乱
- **开发过程中key的选择**
	- 最好使用每条数据的唯一标识作为 key, 比如 id、手机号、身份证号、学号等唯一值
	- 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示， 使用 index 作为 key 是没有问题的

## Vue数据监测
- **监测原理**
	1. Vue 会监视 **data 中所有层次**的数据
	2. Vue是如何**监测对象**中的数据的？
		- 通过 setter 实现监视，且要在 new Vue 时就传入要监测的数据
		- 正常操作给对象中后追加的属性，Vue默认不会对齐做响应式处理
		- 如果需要给后添加的属性做响应式处理，可通过以下两个API实现：
			- Vue.set(target，propertyName/index，value) 
			- vm.$set(target，propertyName/index，value）

	3. **Vue如何监测数组中的数据**？
		- 通过包裹数组更新元素的方法实现，本质就是做了两件事：
			- 调用原生对应的方法对数组进行更新
			- 重新解析模板，进而更新页面
	4. **在Vue中操作数组中的某个元素使用如下方法可触发响应式**：
		- **API**：**push()、pop()、shift()、unshift()、splice()、sort()、reverse()**
	5. **注意事项**：**Vue.set() 和 vm.$set() 不能给 vm 或 vm 的根数据对象 添加属性**

## 表单数据收集
- **若：< input type="text">，则 v-model 收集的是 value 值，用户输入的就是 value 值**
- **若：< input type="radio"/>，则 v-model 收集的是 value 值，且要给标签配置 value 值**
- **若：< input type="checkbox"/>**
	- **没有配置** input 的 **value** 属性，那么收集的就是 checked（勾选 or 未勾选，是布尔值）
	- **配置** input 的 **value** 属性
		-  v-model 的初始值是非数组，那么收集的就是 checked（勾选 or 未勾选，是布尔值）
		-  v-model 的初始值是数组，那么收集的的就是 value 组成的数组
- **v-model指令的修饰符**
	- **lazy**：失去焦点再收集数据
	- **number**：输入字符串转为有效的数字
	- **trim**：输入首尾空格过滤

## 过滤器
- **定义**：对要显示的数据进行特定格式化后再显示(适用于处理一些简单的逻辑)
- **使用**
	1. **注册过滤器**：Vue.filter(name,callback) 或 new Vue{filters:{}}
	2. **使用过滤器**：{{ xxx | 过滤器名}}  或  v-bind：属性 = "xxx | 过滤器名"

- **注意事项**
	1. 过滤器也可以接受额外参数、多个过滤器之间也可以串联
	2. 并没有改变原本的数据，而是产生一个对应的新的数据

## 自定义指令
### 局部指令
- 在new Vue实例中配置directives对象

```js
new Vue({
	// 对象式
	directives: {指令名：配置对象}
	// 函数式
	directives: {指令名：回调函数}
})
```

### 全局指令
- Vue.directive(指令名，配置对象)
- Vue.directive(指令名，回调函数)

### 配置对象中常用的三个回调
- bind(element,binding)：指令与元素成功绑定时调用
- inserted(element,binding)：指令所在元素被插入页面时调用
- update(element,binding)：指令所在模板结构被重新解析时调用

### 自定义指令注意事项
- 指令定义时不加 “v-”，但使用时要加 “v-”
- 指令名如果是多个单词，要使用 kebab-case 命名方式，不要用 camelCase 命名

## Vue实例生命周期
### 生命周期定义
- **Vue实例生命周期**又叫**生命周期回调函数**、**生命周期函数**、**生命周期钩子**
- 它是Vue在关键时刻帮我们调用的一些特殊名称的函数
- 生命周期函数的，名字不可更改，但是函数的具体内容是由程序员根据自己的需要编写的
- 生命周期函数中的**this指向**是**vm**或**组件实例对象**
### 生命周期原理
- **原理图**
![生命周期图示](/images/vue2/lifecycle.png)
- 常用生命周期钩子
	1. **mounted**：发送 ajax 请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】
	2. **beforeDestroy**：清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】
- Vue实例的销毁
	1. 销毁后借助 Vue 开发者工具看不到任何信息
	2. 销毁后自定义事件会失效，但原生 DOM 事件依然有效
	3. 一般不会在 beforeDestroy 操作数据，因为即便操作数据，也不会再触发更新流程了
	
## Vue组件化编程
### 组件化的理解
- **模块**
	- **理解**：向外提供特定功能的js程序，一般就是一个js文件
	- **为什么使用模块**？：js文件太多导致结构复杂
	- **模块作用**：复用js，简化js的编写，提高js运行效率

- **组件**
	- **理解**：用来实现局部(特定)功能效果的代码集合(html/css/js/image…..)
	- **为什么使用组件？**一个界面的功能很复杂，根据各自的功能拆分为不同的组件，提高代码的复用，简化结构
	- **组件作用**：复用编码, 简化项目编码, 提高运行效率
- **模块化**
	- 当应用中的 js 都以模块来编写的, 那这个应用就是一个模块化的应用。（就是把一个js文件拆成多个）

- **组件化**
	- 当应用中的功能都是多组件的方式来编写的, 那这个应用就是一个组件化的应用

### 非单文件组件
- **非单文件组件**
	- 一个文件里有多个组件
- **Vue中使用组件的三大步骤**
	1. 定义组件(创建组件)
	2. 注册组件
	3. 使用组件(通过标签的形式使用)

- **组件的定义**
	- **Vue.extend(options)来进行创建**
		- 其中options和创建vm实例时的new Vue(options)的options几乎一样，但也有点区别：
			1. **el不用写**，因为最终所有的组件都由一个vm的管理，由vm中的el决定组件服务于哪个容器
			2. **data必须写成函数**，因为对象的形式书写data时，组件在不同的地方引用时获得的都是同一个对象，会导致组件之间的数据产生关联。
			3. **template可以配置组件结构**

- **组件的注册**
	- 局部注册
		- 通过new Vue的时候传入components属性
	- 全局注册
		- 通过Vue.components('组件名', 组件)

- **组件使用的注意事项**
	- 组件名的注意事项
		- 一个单词组成时
			1. 写法一：首字母小写
			2. 写法二：首字母大写
		- 多个单词组成时
			1. 写法一：kebab-case命名(短横线命名)
			2. 写法二：CamelCase命名(驼峰命名)

	- 组件标签注意事项
		- 写法一：双标签
		- 写法二：单标签
		- 注意：没使用脚手架时，单标签会导致后续组件不能正常渲染
	
	- 组件创建简写
		- const school = Vue.extend(options)可以简写为：const school = options

### VueComponent
- 关于VueComponent
	1. school组件本质是一个名为**VueComponent的构造函数**，且不是程序员定义的，是Vue.extend生成的
	2. 我们只需要写<school/>或<school></school>，Vue解析时会帮我们创建school组件的实例对象， 即Vue帮我们执行的：new VueComponent(options)
	3. **特别注意**：每次调用Vue.extend，返回的都是一个全新的VueComponent！！！！
	4. 关于this指向
		- 组件配置中
			- data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【VueComponent实例对象】
		- new Vue(options)配置中
			-  data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】

	5. VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）。Vue的实例对象简称vm

### Vue和VueComponent的关系
- **一个重要的内置关系**：VueComponent.prototype.__proto__ === Vue.prototype
- **为什么要有这个关系**：让组件实例对象（vc）可以访问到 Vue原型上的属性、方法

![Vue和VueComponent的原型关系图](/images/vue2/vmANDvc.png)
- **在上图中，VueComponent原型对象的隐式原型属性(__proto__)本应该直接指向Object的原型对象，但是为了组件实例对象(vc)可以访问到Vue原型对象上的属性和方法，Vue在内部将vueComponent原型对象的隐式原型属性指向了Vue的原型对象**

### 单文件组件
- **单文件组件**
	- 一个文件里只有一个组件
	- 文件后缀为.vue

## Vue脚手架
### 脚手架文件结构

```js

├── node_modules
├── public
│ ├── favicon.ico: 页签图标
│ └── index.html: 主页面
├── src
│ ├── assets: 存放静态资源
│ │ └── logo.png
│ │── component: 存放组件
│ │ └── HelloWorld.vue
│ │── App.vue: 汇总所有组件
│ │── main.js: 入口文件
├── .gitignore: git 版本管制忽略的配置
├── babel.config.js: babel 的配置文件
├── package.json: 应用包配置文件
├── README.md: 应用描述文件
├── package-lock.json：包版本控制文件
```
### 修改默认配置
	- Vue 脚手架隐藏了所有 webpack 相关的配置，若想查看具体的 webpack 配置， 请执行：
	    **vue inspect > output.js**
	- 修改默认配置可参考官方文档在package.json同级目录下创建vue.config.json配置文件在里面配置

### render函数
- 关于不同版本的Vue
	1. vue.js与vue.runtime.xxx.js的区别
		- vue.js是完整版的Vue，包含：核心功能+模板解析器
		- vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器

	2. 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用render函数接收到的createElement函数去指定具体内容

```js
new Vue({
	render: h => h(App),
}).$mount('#app')
```


## ref属性
- **被用来给元素或子组件注册引用信息**（id的替代者）
- **应用在html标签上获取的是真实DOM元素**，**应用**在组件标签上是**组件实例对象**（vc）
- **使用方式**
	- 打标识：```<h1 ref="xxx">.....</h1>``` 或 ```<School ref="xxx"></School>```
	- 获取：```this.$refs.xxx```

## props属性
- **功能**：让组件接收外部传过来的数据(外部数据优先级大于内部)
- **传递数据格式**：```<Demo name="xxx"/>```
- **接收数据**：
	1. 第一种方式（只接收）：```props:['name'] ```
	2. 第二种方式（限制类型）：```props:{name:String}```
	3. 第三种方式（限制类型、限制必要性、指定默认值）

```js
	// 第三种方式（限制类型、限制必要性、指定默认值）
	props:{
            name:{
            type:String, //类型
            required:true, //必要性
            default:'老王' //默认值
            }
        }
```
- **注意事项**：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据

## mixin(混合、混入)
- 功能：可以把多个
- 组件共用的配置提取成一个混入对象
	- 如果内部数据和外部数据冲突
		1. 声明周期钩子内部和外部的都要，且外部的先执行
		2. 其它的如果内部有则混入的失效，没有则整合

- 混合的使用
	- 引入mixin.js
	- 全局混入 ```Vue.mixin(xxx)```
	- 局部混入```mixins[xxx,xxx]```

## 插件(plugins)
- **功能**：用于增强Vue
- **本质**：就是一个包含**install**方法的一个对象，install方法的第一个参数是Vue，第二个及以后的参数是插件使用者传递的数据
- 定义插件

```js
对象.install = function(Vue, options){
	// 1. 添加全局过滤器
	Vue.filter(...)
	
	// 2. 添加全局指令
	Vue.directive(...)
	
	// 3. 配置全局混入
	Vue.mixin(...)
	
	// 4. 给Vue原型上添加实例方法
	Vue.prototype.$myMethod = function(){}
	
	.......
}
```

- 使用插件：```Vue.use(插件名)```

### 自定义插件

Vue.js 的插件应该暴露一个 `install` 方法。这个方法的第一个参数是 `Vue` 构造器，第二个参数是一个可选的选项对象：

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}

```



## scoped样式
- 作用：让样式在局部生效，防止命名冲突导致的样式覆盖，减少污染样式命名空间
``` <style scoped>```

## 总结TodoList案例

1. 组件化编码流程：

    ​    (1).**拆分静态组件**：组件要按照功能点拆分，命名不要与html元素冲突。

    ​    (2).**实现动态组件**：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：

    ​            1).一个组件在用：放在组件自身即可。

    ​            2). 一些组件在用：放在他们共同的父组件上（<span style="color:red">状态提升</span>）。

    ​    (3).**实现交互**：从绑定事件开始。

2. **props适用于**：

    ​    (1).父组件 ==> 子组件 通信

    ​    (2).子组件 ==> 父组件 通信（要求父先给子一个函数）

3. **使用v-model时要切记**：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！

4. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。

## 浏览器本地存储(WebStorage)
- 存储内容大小一般支持5MB左右（不同浏览器可能还不一样）
- 浏览器端通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制
- API:
	1. ```xxxxxStorage.setItem('key', 'value');```
		- 该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值
	2. ```xxxxxStorage.getItem('person');```
		- 该方法接受一个键名作为参数，返回键名对应的值
	3. ```xxxxxStorage.removeItem('key');```
		- 接收一个键名作为参数，并把该键名从存储中删除
	4. ``` xxxxxStorage.clear()```
		- 清空存储中的所有数据

- **注意事项**
	- SessionStorage存储的内容会随着浏览器窗口关闭而消失
	- LocalStorage存储的内容，需要手动清除才会消失
	- ```xxxxxStorage.getItem(xxx)```如果xxx对应的value获取不到，那么getItem的返回值是null
	-  ```JSON.parse(null)```的结果依然是null

## 组件自定义事件
### 组件通信方式
1. 组件自定义事件是一种组件间通信方式，适用于：**子组件 => 父组 件**    传递数据
2. 使用场景：子组件B想要给父组件A传递数据，则需要在组件A中给组件B绑定自定义事件(事件的回调在父组件中),然后在子组件中通过$emit('事件名')触发父组件中的回调
3. 绑定方式：
	1. 方式一
		- 在父组件中： ```通过v-on/@绑定事件 <Demo @test="getMsg"/>```
		- 在子组件中：```this.$emit('test') 触发父组件中的getMsg回调```
	2. 方式二
		- 在子组件中不变
		- 在父组件中：

```js
<template>
	<Demo ref="demo"/>
</template>

<script>
	mounted( ){
		// this.$refs.demo拿到Demo组件实例对象，再绑定事件
		// 参数一 绑定的事件名，参数二，该事件触发时执行的回调
		this.$refs.demo.$on('test', this.getMsg)
	}
</script>
```

4. 自定义事件和内置事件一样具有相应的**事件修饰符**
5. **触发自定义事件**```this.$emit('事件名', 【接收到的数据】) ```【可选】
6. **解绑自定义事件**```this.$off('事件名')```
	- 组件实例对象(vc)被销毁后该组件实例对象的所有自定义事件都失效了，但是原生DOM事件没有失效
7. 自定义组件上也可以绑定原生DOM事件，需要使用native修饰符
8. **注意**：通过this.$refs.xxx.$on('atguigu',回调)绑定自定义事件时，回调要么配置在methods中，要么用箭头函数，否则this指向会出问题！

### 总结
- 绑定方式二更具有灵活性，可以异步执行事件绑定

## 全局事件总线(GlobalEventBus)
- 一种组件间通信的方式，适用于任意组件间的通信
- 安装全局事件总线

```js
new Vue({
	......
	beforeCreate( ){
		// 安装全局事件总线，$bus就是当前应用的vm
		Vue.prototype.$bus = this
	}，
	......
})
```
- 使用全局事件总线
	1. 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在自身。

```js
methods(){
  demo(data){......}
}

mounted( ){
	this.$bus.$on('自定义事件名', this.demo)
}，
// 在组件实例销毁之前解绑自定义全局事件
beforeDestory( ){
	this.$bus.$off('自定义事件名')
}
```
	2. 提供数据：```this.$bus.$emit('自定义事件名',数据)```

- 最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件

## 消息订阅与发布(pubsub)
1. 一种组件间通信的方式，适用于任意组件间通信
2. 使用步骤
	1. 安装pubsub：```npm i pubsub-js```
	2. 引入： ```import pubsub from 'pubsub-js' ```
	3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身

```js
methods(){
  	demo(data){......}
}
......
mounted() {
//订阅消息
  this.pid = pubsub.subscribe('xxx',this.demo) 
},
beforeDestory( ){
	// 组件实例销毁前取消订阅
	pubsub.unsubscribe(this.pid)
}
```
	4. 提供数据：```pubsub.publish('xxx',数据)```
	5. 最好在beforeDestroy钩子中，用```PubSub.unsubscribe(this.pid)```去取消订阅

## nextTick
- **语法**：```this.$nextTick(回调)```
- **作用**：在下一次DOM更新结束后执行其指定的回调
- **什么时候使用**：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行
- **出现原因**：当你在 Vue 中更改响应式状态时，最终的 DOM 更新并不是同步生效的，而是由 Vue 将它们缓存在一个队列中，直到下一个“tick”才一起执行。这样是为了确保每个组件无论发生多少状态改变，都仅执行一次更新

## Vue封装的过渡与动画
1. 作用：在插入、更新或移除 DOM元素时，在合适的时候给元素添加样式类名
2. 写法
	1. 准备好样式
		1. 元素进入的样式
			1. v-enter：进入的起点
			2. v-enter-active：进入过程中
			3. v-enter-to：进入的终点
		2. 元素离开的样式
			1. v-leave：离开的起点
			2. v-leave-active：离开过程中
			3. v-leave-to：离开的终点
	2. 使用```<transition>```包裹要过度的元素，并配置name属性：
	```js
	<transition name="hello">
	    <h1 v-show="isShow">你好啊！</h1></transition>
	```
	3. 备注：若有多个元素需要过度，则需要使用：```<transition-group>```，且每个元素都要指定key值

## Vue中的ajax
## vue脚手架配置代理
- **方法一**
```js
	// 在vue.config.js中添加如下配置
	devServer:{
		proxy:"http://localhost:8080"
	}
```
- 说明:
	1. 优点：配置简单，请求资源时直接发给前端（8080）即可
	2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理（如果public文件夹里面有的话，优先提供public里面的数据，这样就走不了代理）
	3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）

- **方法二**
```js
module.exports = {
    devServer: {
      proxy: {
      '/api1': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000',// 代理目标的基础路径
        changeOrigin: true,
        ws: true,//用于支持websocket
        pathRewrite: {'^/api1': ''}//将路径带api1的都变成''，再加后面字符串
      },
      '/api2': {// 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:5001',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      }
    }
  }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```
- 说明
	1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理
	2. 缺点：配置略微繁琐，请求资源时必须加前缀

## 插槽
1. **作用**：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 父组件 ===> 子组件 
2. **分类**：默认插槽、具名插槽、作用域插槽
3. **使用方式**:
	1. **默认插槽**
	```js
父组件中：
        <Category>
           <div>html结构1</div>
        </Category>
子组件中：
        <template>
            <div>
               <!-- 定义插槽 -->
               <slot>插槽默认内容...</slot>
            </div>
        </template>
   ```
```
	2. **具名插槽**
	```js
父组件中：
        <Category>
            <template slot="center">
              <div>html结构1</div>
            </template>
​
            <template v-slot:footer>//相当于slot='footer'并且必须配合template标签
               <div>html结构2</div>
            </template>
        </Category>
子组件中：
        <template>
            <div>
               <!-- 定义插槽 -->
               <slot name="center">插槽默认内容...</slot>
               <slot name="footer">插槽默认内容...</slot>
            </div>
        </template>
```
	3. **作用域插槽**
		1. **理解**：数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。（games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）
		2. 具体实现
	
	```js
	父组件中：
	        <Category>
	            <template scope="scopeData">//scopeData是一个对象
	                <!-- 生成的是ul列表 -->
	                <ul>
	                    <li v-for="g in scopeData.games" :key="g">{{g}}</li>
	                </ul>
	            </template>
	        </Category>
	​
	        <Category>
	            <template slot-scope="scopeData">
	                <!-- 生成的是h4标题 -->
	                <h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
	            </template>
	        </Category>
	子组件中：
	        <template>
	            <div>
	                <slot :games="games"></slot>
	            </div>
	        </template>
	        
	        <script>
	            export default {
	                name:'Category',
	                props:['title'],
	                //数据在子组件自身
	                data() {
	                    return {
	                        games:['红色警戒','穿越火线','劲舞团','超级玛丽']
	                    }
	                },
	            }
	        </script>
	```

## Vuex
### Vuex基本属性
1. **概念**
	在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信
2. **什么时候使用Vuex呢**
	当有多个组件需要共享数据时，就可以使用Vuex集中管理状态
3. **搭建Vuex环境**
	1. 注意事项：
		- Vue2匹配Vuex3版本，Vue3匹配Vuex4
	2. 创建文件：src/store/index.js
	
	```js
	//引入Vue核心库
	import Vue from 'vue'
	
	//引入Vuex
	import Vuex from 'vuex'
	
	//应用Vuex插件
	Vue.use(Vuex)
	​
	//创建并暴露store
	export default new Vuex.Store({
	    //准备actions对象——响应组件中用户的动作
		 actions : {}
		//准备mutations对象——修改state中的数据
		 mutations : {}
		//准备state对象——保存具体的数据
		 state : {}
	})
	```
	
	3. 在main.js中创建vm时传入store配置项
	
	```js
		//引入store
		import store from './store'
		......
		​
		//创建vm
		new Vue({
		    render: h => h(App),
		    store
		}).$mount('#app')
	```

###  Vuex基本使用
1. $store在所有组件实例对象身上均可访问
2. $store中核心配置项主要由Actions、Mutations、State组成，其中Actions主要用于处理逻辑等，Mutations可以直接操作State，只有经过Mutations操作State中的数据，开发者工具才监视得到数据变化
3. 组件操作数据时，如果没有网络请求或其它业务逻辑，可以越过Actions(即不通过dispatch向Actions请求)，而直接通过commit向Mutations发起请求。

###  Vuex原理图
![](/images/vue2/vuex.png)

###  getters的使用
1. **概念**：当state中的数据需要经过加工后再使用时，可以使用getters加工。（类似vue中的computed）
2. 使用时在Store实例中配置getters属性
3. 读取数据时： ```$store.getters.属性名 ```
4. 注意：Vuex里的getters是没有划分仓库模块的，因此mapGetters的写法是数组

### 四个map方法的使用
#### mapState
1. **mapState方法：** 用于帮助我们映射state中的数据为计算属性
2. **注意**：**mapState映射方法**内部进行对象写法时，冒号右侧可以写为一个函数，当使用这个计算属性时，右侧的函数就回执行一次，执行时注入的这个state是**总仓库的state**！！！该函数的返回值就是计算属性的值。
	
	```js
	computed: {
	    //借助mapState生成计算属性：sum、school、subject（对象写法）
	     ...mapState({sum:'sum',school:'school',subject:'subject'}),
		
	   // 对象写法时右侧可以写为一个函数,当使用这个计算属性时，右侧函数会立即执行一次，执行时会注入state --》仓库中的数据,右侧函数的返回值就是该计算属性的值
	    ...mapState({
		sum:  state => state.sum
		})
	         
	    //借助mapState生成计算属性：sum、school、subject（数组写法）
	    ...mapState(['sum','school','subject']),
	},
	```

#### mapGetters
1. **mapGetters方法：** 用于帮助我们映射getters中的数据为计算属性
2. 注意：**mapGetters映射方法**内部的对象写法只能为gitter属性取一个在当前组件内的别名

	```js
		computed: {
	    //借助mapGetters生成计算属性：bigSum（对象写法）
	    ...mapGetters({bigSum:'bigSum'}),
	​
	    //借助mapGetters生成计算属性：bigSum（数组写法）
	    ...mapGetters(['bigSum'])
		},
	```

####  mapActions方法：
- 用于帮助我们生成与actions对话的方法，即：包含$store.dispatch(xxx)的函数
	
	```js
	methods:{
	//靠mapActions生成：incrementOdd、incrementWait（对象形式）
	...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
	​
	//靠mapActions生成：incrementOdd、incrementWait（数组形式）
	...mapActions(['jiaOdd','jiaWait'])
	}
	```

#### mapMutations方法：
- 用于帮助我们生成与mutations对话的方法，即：包含$store.commit(xxx)的函数

	```js
		methods:{
	    //靠mapActions生成：increment、decrement（对象形式）
	    ...mapMutations({increment:'JIA',decrement:'JIAN'}),
	    
	    //靠mapMutations生成：JIA、JIAN（对象形式）
	    ...mapMutations(['JIA','JIAN']),
		}
	```
	

####总结
- mapActions与mapMutations使用时，若有传递参数的需要，最好在模板中绑定事件时就传递好参数，否则参数是事件对象

### Vuex模块化+命名空间
1. **目的**：让代码更好维护，让多种数据分类更加明确
2. 修改store.js

	```js
		const countAbout = {
		  namespaced:true,//开启命名空间
		  state:{x:1},
		  mutations: { ... },
		  actions: { ... },
		  getters: {
	    bigSum(state){
	       return state.sum * 10
	    }
		​
		const personAbout = {
		  namespaced:true,//开启命名空间
		  state:{ ... },
		  mutations: { ... },
		  actions: { ... }
		}
	​
		const store = new Vuex.Store({
		modules: {
	    countAbout,
	    personAbout
		})
	```

3. 开启命名空间后，组件中读取state数据:

	```js
	//方式一：自己直接读取
	this.$store.state.personAbout.list
	//方式二：借助mapState读取：
	...mapState('countAbout',['sum','school','subject']),
	```

4. 开启命名空间后，组件中读取getters数据：

	```js
	//方式一：自己直接读取
	this.$store.getters['personAbout/firstPersonName']
	//方式二：借助mapGetters读取：
	...mapGetters('countAbout',['bigSum'])
	```

5. 开启命名空间后，组件中调用dispatch

	```js
	//方式一：自己直接dispatch
	this.$store.dispatch('personAbout/addPersonWang',person)
	//方式二：借助mapActions：
	...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
	```

6. 开启命名空间后，组件中调用commit
	```js
	//方式一：自己直接commit
	this.$store.commit('personAbout/ADD_PERSON',person)
	//方式二：借助mapMutations：
	...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
	
	```


## 路由(Route)
### 基本理解
- 一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理
- 前端路由：key是路径，value是组件

### 基本使用
1. 安装vue-router，命令：npm i vue-router@3（Vue2匹配vue-router3）
2. 应用插件：Vue.use(VueRouter)
3. 编写router配置项:
```js
//引入VueRouter
import VueRouter from 'vue-router'
//引入Luyou 组件
import About from '../components/About'
import Home from '../components/Home'
​
//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
    routes:[
        {
            path:'/about',
            component:About
        },
        {
            path:'/home',
            component:Home
        }
    ]
})
​
//暴露router
export default router
```
4. 实现切换（active-class可配置高亮样式）
```js
<router-link active-class="active" to="/about">About</router-link>
```
5. 指定展示位置
```js
<router-view></router-view>
```

### 注意事项
1. 路由组件通常存放在pages文件夹，一般组件通常存放在components文件夹。
2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有自己的$route属性，里面存储着自己的路由信息。
4. 整个应用只有一个router，可以通过组件的$router属性获取到。

### 嵌套路由
1. 配置路由规则，使用children配置项：
```js
routes:[
    {
        path:'/about',
        component:About,
    },
    {
        path:'/home',
        component:Home,
        children:[ //通过children配置子级路由
            {
                path:'news', //此处一定不要写：/news
                component:News
            },
            {
                path:'message',//此处一定不要写：/message
                component:Message
            }
        ]
    }
]
```

2. 跳转（要写完整路径）：
```js
<router-link to="/home/news">News</router-link>
```

### 路由的query参数
1. 传递参数

	```js
	<!-- 跳转并携带query参数，to的字符串写法 -->
	<router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>
	<!--用模板字符串解析-->
	<!-- <router-link :to="`/home/Message/detail?id=${m.id}&title=${m.title}`">{{m.title}}</router-link>&nbsp;&nbsp; -->    
	​
	<!-- 跳转并携带query参数，to的对象写法 -->
	<router-link 
	    :to="{
	        path:'/home/message/detail',
	        query:{
	           id:666,
	            title:'你好'
	        }
	    }"
	>跳转</router-link>
	
	```

2. 接收参数
	```js
	$route.query.id
	$route.query.title
	```

### 路由的params参数
1. 配置路由，声明接收params参数(占位符)，**可以在配置路由时在占位后加一个?来表示该params参数可传可不传**。
2. 但是配置可传可不传后，如果params参数传递进来的时空串也会出现路径丢失的问题，此时可以在空串后添加一个或运算 ```' ' || undefined```就可以解决路径丢失。
	```js
	{
	    path:'/home',
	    component:Home,
	    children:[
	        {
	            path:'news',
	            component:News
	        },
	        {
	            component:Message,
	            children:[
	                {
	                    name:'xiangqing',
	                    path:'detail/:id/:title', //使用占位符声明接收params参数
	                    component:Detail
	                }
	            ]
	        }
	    ]
	}
	
	```
2. 传递参数
	```js
	<!-- 跳转并携带params参数，to的字符串写法 -->
	<router-link :to="/home/message/detail/666/你好">跳转</router-link>
	<router-link :to="`/home/Message/detail/${m.id}/${m.title}`">{{ m.title}}</router-link>             
	<!-- 跳转并携带params参数，to的对象写法 -->
	<router-link 
    :to="{
        name:'xiangqing',
        params:{
           id:666,
            title:'你好'
        }
    }"
   ```
```

3. 特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！

4. 接收参数：

	```js
	$route.params.id
	$route.params.title
```



### 命名路由
1. 作用：可以简化路由的跳转
2. 使用实例：
	```js
	1. 给路由命名：
	
	{
	    path:'/demo',
	    component:Demo,
	    children:[
	        {
	            path:'test',
	            component:Test,
	            children:[
	                {
	                      name:'hello' //给路由命名
	                    path:'welcome',
	                    component:Hello,
	                }
	            ]
	        }
	    ]
	}
	2. 简化跳转：
	
	<!--简化前，需要写完整的路径 -->
	<router-link to="/demo/test/welcome">跳转</router-link>
	​
	<!--简化后，直接通过名字跳转 -->
	<router-link :to="{name:'hello'}">跳转</router-link>
	​
	<!--简化写法配合传递参数 -->
	<router-link 
	    :to="{
	        name:'hello',
	        query:{
	           id:666,
	            title:'你好'
	        }
	    }"
	>跳转</router-link>
	
	```

### 路由的props配置
1. 作用：让路由组件能更方便的接收到参数。
2. 路由的props配置有三种写法：
```js
	{
	    name:'xiangqing',
	    path:'detail/:id',
	    component:Detail,
	​
	    //第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	    // props:{a:900}
	​
	    //第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	    // props:true
	    
	    //第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	    props(route){
	        return {
	            id:route.query.id,
	            title:route.query.title
	        }
	    }
	}
```

### router-link标签的replace属性
1. 作用：控制路由跳转时操作浏览器历史记录的模式。
2. 浏览器的历史记录有两种写入方式：分别为```push```和```replace```，```push```是追加历史记录，```replace```是替换当前记录。路由跳转时的默认模式为```push```。
3. 开启replace模式：```<router-link replace .......>News</router-link>```。

### 编程式路由导航
1. 作用：不借助```<router-link>```,通过拿到$router对象，借助该对象的方法实现路由跳转，让路由跳转更加灵活。
2. 具体编码：
	```js
	//$router的两个API
	this.$router.push({
	    name:'xiangqing',
	        params:{
	            id:xxx,
	            title:xxx
	        }
	})
	
	this.$router.replace({
	    name:'xiangqing',
	        params:{
	            id:xxx,
	            title:xxx
	        }
	})
	this.$router.forward() //前进
	this.$router.back() //后退
	this.$router.go() //可前进也可后退，里面的参数是正的时候就是前进的步数，负就是后退的
	```

### 缓存路由组件
1. 作用：让不展示的路由组件保持挂载，不被销毁。
2. 具体编码：
```js
//通过include指定被缓存的组件， News是组件名，不写include属性默认缓存keep-alive标签内所有组件
<keep-alive  include="News">
	<router-view></router-view>
</keep-alive>
```
3. 指定多个组件被缓存则动态绑定include，里面内容写成数组即可```:include="['组件名1','组件名2']"```。

### 路由组件独有的两个生命周期钩子
1. 作用：用于捕获路由组件的激活状态。
2. 具体名字：
	1. ```activated```路由组件被激活时触发。
	2. ```deactivated```路由组件失活时触发。

### 路由守卫
1. 作用： 对路由进行权限控制
2. 分类：全局守卫、独享守卫、组件内守卫

#### 全局路由守卫
1. 全局前置路由守卫--初始化时执行、每次路由切换前执行
	```js
	
	// 全局前置路由守卫——初始化的时候被调用、每次路由切换之前被调用
	router.beforeEach((to,from,next) => {
	  console.log('前置路由守卫',to, from)
	  if (to.meta.isAuth) { //判断是否需要鉴权
	    if (localStorage.getItem('school') === 'atguigu') {
	      next()
	    }
	    else {
	      alert('学校名不对，无权限查看！')
	    }
	  } else {
	     next()
	  }
	})
	```
2. 全局后置路由守卫--初始化时执行、每次路由切换后执行
	```js
	
	// 全局后置路由守卫——初始化的时候被调用、每次路由切换之后被调用
	router.afterEach((to,from) => {
	  console.log('后置路由守卫', to, from)
	  // 可在全局后置路由守卫中进行切换网页标题等操作
	document.title = “切换网页标题”
	})
	
	```

#### 独享路由守卫
1. 作用：单独为某一个路由配置守卫

2. **注意**：`beforeEnter` 守卫 **只在进入路由时触发**，不会在 `params`、`query` 或 `hash` 改变时触发。例如，从 `/users/2` 进入到 `/users/3` 或者从 `/users/2#info` 进入到 `/users/2#projects`。它们只有在 **从一个不同的** 路由导航时，才会被触发

3. 使用：
  ```js
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
  },
]
  ```

#### 组件内路由守卫
1. 进入守卫 `beforeRouteEnter`  -- 通过路由规则，进入该组件时被调用

2. 离开守卫 `beforeRouteLeave`   -- 通过路由规则，离开组件时被调用
	
3. `beforeRouteEnter` 守卫 **不能** 访问 `this`，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。

  不过，你可以通过传一个回调给 `next` 来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

4. 对于 `beforeRouteUpdate` 和 `beforeRouteLeave` 来说，`this` 已经可用了，所以*不支持* 传递回调，因为没有必要了。

  ```js
  
const UserDetails = {
  template: `...`,
  beforeRouteEnter(to, from) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
  },
  beforeRouteUpdate(to, from) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
    // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from) {
    // 在导航离开渲染该组件的对应路由时调用
    // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
  },
}
  ```

#### 总结
1. **只有全局路由守卫才有前置后置之分**，通常在前置路由中进行**权限校验**，在后置路由中进行一些例如同步网页的标题与所进入路由组件的title一致之类的操作。
2. 进行权限校验时通常在需要进行权限校验的**路由内的meta属性的配置对象中，配置一个isAuth属性，通过该属性来判断该路由是否需要进行权限校验**。
3. 独享路由守卫顾名思义，可以单独给一个路由配置路由守卫。
4. 组件内路由守卫需要注意的是**只有经过路由规则才会触发路由守卫的回调**，通过直接书写**组件标签引入的组件不会触发路由守卫**，但**独享路由守卫和全局路由守卫能触发**。
5. `beforeRouteEnter` 守卫 **不能** 访问 `this`

### 路由的两种工作模式
1. 工作模式：**history**模式和**hash**模式

2. 对于一个 url 来说，什么是 hash 值？—— # 及其后面的内容就是 hash 值。

3. hash 值不会包含在 HTTP 请求中，即：hash 值不会带给服务器。

4. hash 模式：
	1. **地址中永远带着 # 号**，不美观 。
	2. 若以后将地址通过第三方手机 app 分享，若 app 校验严格，则地址会被标记为不合法。
	3. 兼容性较好。
	
5. history 模式：
	1. 地址干净，美观 。
	2. 兼容性和 hash 模式相比略差。
	3. 应用部署上线时需要后端人员支持，**解决刷新页面服务端 404 的问题**。
	

	
	

### 路由懒加载

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后**当路由被访问的时候才加载对应组件**，这样就会更加高效。(因此后续路由都用**路由懒加载**)

Vue Router 支持开箱即用的[动态导入](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports)，这意味着你可以用动态导入代替静态导入：

```js
// 将
// import UserDetails from './views/UserDetails.vue'
// 替换成
const UserDetails = () => import('./views/UserDetails.vue')

const router = createRouter({
  // ...
  routes: [{ path: '/users/:id', component: UserDetails }],
})
```

`component` (和 `components`) 配置接收一个返回 Promise 组件的函数，Vue Router **只会在第一次进入页面时才会获取这个函数**，然后使用缓存数据。这意味着你也可以使用更复杂的函数，只要它们返回一个 Promise ：

```js
const UserDetails = () =>
  Promise.resolve({
    /* 组件定义 */
  })
```

一般来说，对所有的路由**都使用动态导入**是个好主意。(**不要**在路由中使用[异步组件](https://v3.vuejs.org/guide/component-dynamic-async.html#async-components)。异步组件仍然可以在路由组件中使用，但路由组件本身就是动态导入的。)

如果你使用的是 webpack 之类的打包器，它将自动从[代码分割](https://webpack.js.org/guides/code-splitting/)中受益。

如果你使用的是 Babel，你将需要添加 [syntax-dynamic-import](https://babeljs.io/docs/plugins/syntax-dynamic-import/) 插件，才能使 Babel 正确地解析语法。



## 图片懒加载

### 图片懒插件插件

库：vue-lazyload



## 表单验证

### 表单验证插件配置

```js
// VeeValidate插件表单验证区域

import Vue from 'vue'

import VeeValidate from 'vee-validate'

// 引入中文

import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate)


// 表单验证
VeeValidate.Validator.localize('zh_CN',{

  messages:{

    ...zh_CN.messages,

    is: (failed) => `${failed}必须与密码相同` // 修改内置规则的message

  },
  attributes:{
      // 将每个提示字段转换成中文
    phone: '手机号',
    code: '验证码',
    password: '密码',
    password: '确认密码',
    agree: '协议'

  }
})

// 自定义校验规则
VeeValidate.Validator.extend('agree',{
    validate: value => {
        return value
    },
    getMessage: failed => failed + '必须同意'
})
```

### 表单验证插件的使用

```html
 <label>手机号:</label>

  <input v-model="phone"

  placeholder="请输入你的手机号"

  name="phone"

  v-validate="{required:true , regex: /^1\d{10}$/}"

  :class="{invalid: errors.has('phone')}"

   />

  <span class="error-msg">{{errors.first('phone')}}</span>



  <!-- 确认密码的校验有点区别 -->

  v-validate="{required:true, is:password}"
```

### 在所有的表单验证都通过后再允许注册

```js
  // 等待所有的表单验证成功，返回布尔值
  const success = await this.$validator.validateAll();
  if(success){
      ...
  }
```

## 











