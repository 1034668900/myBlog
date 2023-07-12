# Vue2数据响应式原理

## Object.defineProperty（  ）方法介绍

- `Object.defineProperty(obj, prop, descriptor)`方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象
- 参数：
  1. obj：要定义的对象
  2. prop： 定义的属性
  3. descriptor： 要定义或修改的属性的描述符

- **存在问题** : `getter、setter`想实现**数据修改必须设置一个中转变量**

  ```js
  
  let obj = {};
  let temp = 9;
  Object.defineProperty(obj, "a", {
    // 可枚举
    enumerable: true,
    configurable: true,
    get() {
      console.log("get被访问");
      return temp;
    },
    set(newValue) {
      console.log("set被访问");
      temp = newValue;
    },
  });
  
  
  console.log("1", obj.a); //1  9
  obj.a = 10;
  console.log("2", obj.a); //2  10
  ```

- **解决办法：**自定义`defineReactive（ ）`方法，利用闭包实现

  

  

## 自定义 defineReactive( ) 方法

- 外部函数变量`val`在内部函数中使用，从而实现一个**闭包**环境

```js
function defineReactive(data,key,val){
    Object.defineProperty(data,key,{
        // 可枚举
        enumerable:true,
        configurable:true,
        get(){
            return val
        },
        set(newValue){
            if(val !== newValue){
                val = newValue
            }
        }
    })
}
let obj = {}
defineReactive(obj,'a',200)

console.log("1", obj.a);//1 200
obj.a = 10;
console.log("2", obj.a);//2 10

```



## 对象属性侦测实现

- **本质**：利用递归侦测对象的全部属性

- 图示

  ![递归侦测数据](/images/vue2/vue2响应式原理/递归侦测数据.jpg)

- **函数解释：**
  1. **observe(  )函数**：工具函数，用于检测一个对象是否为**Observe类**的**实例**（是否含有__ob__属性）
  2. **Observer( )类**：用于将一个普通的**object**对象的每个属性都转换为**响应式属性**，同时为每个属性都添加一个`__ob__`属性，其值为`Observer( )类的实例`(**注意：**构造函数中的**this**是**Observer**的**实例**)
  3. **defineReactive( )函数**：将一个对象的某个属性（旧属性或新属性）设置为响应式数据

- **注意事项：**

  1. **defineReactive( )**函数中要对设置的属性值value要调用**observe**进行检测是否含有`__ob__`,而且当属性被修改时，也要对setter的中的**newValue**用**observe**进行检测(因为赋的新值**newValue**也可能会是一个**对象**)
  2. **defineReactive( )**中的**childOb**在当前阶段没什么用，但是后续会使用到
  3. 此时的**数据侦测**还不能处理**数组**

- **具体实现：**

  1. **defineReactive( )函数**

     ```js
     import observe from "./observe";
     
     export default function defineReactive(data,key,value){
         if(arguments.length == 2){
             value = data[key]
         }
         console.log("我是defineReactive",key,value);
         // 为属性定义属性值时也要对其检测是否含有__ob__属性
         let childOb = observe(value)
         Object.defineProperty(data,key,{
             get(){
                 console.log("get属性被访问了",value);
                 return value
             },
     
             set(newValue){
                 console.log("set属性被访问,有人修改数据了,值为",newValue);
                 value = newValue
                 // 修改值时也要对修改的新值进行检测
                 childOb = observe(newValue)
             }
     
         })
     }
     ```

     

  2. **observe(  )函数**

     ```js
     import Observer from "./Observer"
     
     // 用于检测一个对象是否含有__ob__属性
     export default function observe(obj){
         // 检测是否为object对象
         if(typeof obj !== 'object')return
         // 定义ob存储__ob__属性值(是Observer类的实例)
         let ob
         // 检测是否含有__ob__属性
         if(typeof obj.__ob__ !== 'undefined'){
             // 有__ob__属性
             ob = obj.__ob__
         }else{
             // 没有__ob__属性
             ob = new Observer(obj)
         }
         return ob
     }
     ```

     

  3. **Observer( )类**

     ```js
     //目的： 用于将一个普通的object对象的全部属性转换为响应式数据
     import defineReactive from "./defineReactive";
     import { def } from "./utils";
     export default class Observer{
         constructor(obj){
             console.log("我是Observer");
             // 为obj添加__ob__属性，值为Observer类的实例（this）,并不可枚举
             def(obj,"__ob__",this,false)
             this.walk(obj)
         }
         // 遍历
         walk(obj){
             for(let item in obj){
                 // 将属性转换为响应式
                 defineReactive(obj,item)
             }
         }
     }
     ```

     

## 数组属性侦测的完善

- **存在问题**：上述侦测没有对数组类型进行处理，因此数组类型的数据还不能完成侦测

- **实现思路：**

  - 将数组的七个方法进行重写，使其能够被侦测，**特别注意**需要修改数组对象的原型链，使其优先使用重写后的方法

  - 图示

    ![](/images/vue2/vue2响应式原理/数组侦测.jpg)

- **注意事项：**
  1. **arrayMethods**是以**Array.prototype**为**原型**创建的对象，因此要使用API`const arrayMethods = Object.create(Array.prototype)`,同时该方法要**暴露**（在**Observer**中会引入使用）
  2. **重写**数组方法时，需要**备份原生的方法**来**对数据进行修改**，**重写的目的**只是为了使该操作能被**侦测**到
  3. **Observer**需要对**obj的类型**进行**判断**，如果是一个数组（`Array.isArray(obj)`）,则需要调用**针对数组类型**进行**响应式转换**的**自定义**函数**observeArray(obj)**
  4. 一定要注意**push、unshift、splice**可以添加**新项**，因此也要对它们添加的新项进行**observe**检测
  5. 处理**push、unshift、splice**时需要拿到数组对象的**`__ob__`对应的实例对象**，因为在该实例对象身上有**Observer**中定义的`observeArray( )`方法
  6. 需要创建一个数组对象**insertItems** 用于存储**数组方法**导致的**添加的新项**，后续根据该对象**是否为空**来选择性的**调用ob**身上的**observeArray**方法进行**检测**
  7. 处理**splice添加新项**的参数时，**splice**的**使用语法**为：`splice(下标，个数，添加的新项)`,因此这种情况我们要拿到添加的新项时需要将**arguments**进行数组分割，而**arguments**是一个**伪数组**，不具有**slice**方法，因此在使用前先用**扩展运算符**将其**转换为一个数组**存储`args = [...arguments]`，再利用slice分割数组拿到**添加的新项**`insertItems = Arguments.slice(2)`

- **具体实现**

  - array.js

  ```js
  import { def } from "./utils"
  
  // 备份数组原型对象的方法
  const arrayPrototype = Array.prototype
  
  const methodNames = [
      'push',
      'pop',
      'shift',
      'unshift',
      'splice',
      'sort',
      'reverse'
  ]
  // 以Array.prototype为原型创建arrMethods对象,并将其暴露
  export const arrMethods = Object.create(arrayPrototype)
  
  methodNames.forEach(methodName => {
      // 备份原来的方法
      const originMethod = arrayPrototype[methodName]
      // 定义新的方法
      def(arrMethods,methodName,function(){
          // 重写数组操作方法使其能被监测
          // 调用原生方法操作数据
          originMethod.apply(this,arguments)
          /* 
              因为push/splice/unshift可以向数组中插入数据，因此也需要对这些新添加的数据进行observe监测
              ，因此需要拿到__ob__属性对应的实例，在该实例身上有observeArray方法
  
              数组对象肯定不是最高层，最高层不能是数组，
              例如main中obj.g是数组，因此第一次遍历的时候g已经被添加了__ob__属性
          */
         // 取出数组身上的ob
      
         const ob = this.__ob__
         // arguments是一个类数组，没有数组的方法，将其转换一下
         let Arguments = [...arguments]
         // 存储不同方法插入的新项
         let insertItems = []
  
          switch(methodName){
              case 'push':
              case 'unshift':
                  insertItems = arguments
                  break;
              case 'splice':
                  // splice语法： splice(下标，个数，插入新项)
                  insertItems = Arguments.slice(2)
                  break;
          }
  
          // 判断有没有需要插入的新项
          if(insertItems){
              // 有，则对其进行检测
              ob.observeArray(insertItems)
          }
      },false)
  
  })
  
  ```

  - Observer类

  ```js
  //目的： 用于将一个普通的object对象的全部属性转换为响应式数据
  import { arrMethods } from "./array";
  import defineReactive from "./defineReactive";
  import { def } from "./utils";
  export default class Observer {
    constructor(obj) {
      console.log("我是Observer");
      // 为obj添加__ob__属性，值为Observer类的实例（this）,并不可枚举
      def(obj, "__ob__", this, false);
      if (Array.isArray(obj)) {
        // 是数组对象的话就要修改其原型指向，使其优先调用修改后的方法
        Object.setPrototypeOf(obj, arrMethods);
        // 再对数组内部进行遍历，转换响应式
        this.observeArray(obj)
      } else {
        this.walk(obj);
      }
    }
    // object的遍历
    walk(obj) {
      for (let item in obj) {
        // 将属性转换为响应式
        defineReactive(obj, item);
      }
    }
  
    // 数组的遍历
    observeArray(obj) {
      for (let i = 0, l = obj.length; i < l; i++) {
            // 逐项observe
          observe(obj[i])
      }
    }
  }
  
  ```



## 依赖收集

- **定义**：需要用到数据的地方，称为**依赖**
- **发展历程：**
  - Vue1.x, **细粒度**依赖，即用到数据的**DOM**都是依赖
  - Vue2.x，**中等粒度**依赖，即用到数据的**组件**是依赖
- **发生位置：**
  - 在**getter**中**收集**依赖
  - 在**setter**中**触发**依赖