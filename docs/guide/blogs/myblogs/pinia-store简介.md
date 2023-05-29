---
sidebar: false
---

```js
<script setup>
import {useCountStore} from '../store/countStore'
// 获得store实例
/* 
    - store实例本身就是一个reactive对象，可以通过它直接访问state中的数据，
    - 但是如果将store实例中的数据直接解构出来，那这个数据就会丧失响应性
    - 但是可以通过 storeToRefs(store实例) 的方式将解构出来的数据转换为响应式数据, 
      但是该方法只能解构state和getters,不能解构 actions

    - state 的修改
        - 1. 直接修改(不建议)
        - 2. 建议通过actions中提供的方法进行修改
        - 3. 通过 $patch(补丁) 的方法进行修改，而且可以同时修改多个,但是修改数组类多个数据时就是覆盖，不够灵活
        - 4. 通过 $patch 传函数的形式进行修改，传函数时会往函数里传入state对象
        - 5. 通过 $state 直接替换state达到修改的目的
        - 6. $reset重置state
    
    - store 的订阅 -- 当state中的数据发生一些变化时需要对齐进行监听
        - 可以通过 store.$subscribe(函数，配置对象) 的方式对state中的数据进行一个订阅
        - 订阅会随着它所在的组件被卸载时一并卸载，
          可以通过设置配置对象 store.$subscribe((mutation, state) => {
            // mutation 是修改的信息
            //  state 当前state对象
          }, {detached:true}) 使其一直生效
        - 注意： 使用订阅时，不要在回调函数中直接修改state，会导致递归
    
    - actions 的订阅  -- 监听 actions 中的方法被调用
          - store.$onAction(()=>{})
          
*/



function changeName(){
    store.$patch({
        name:"我是patch修改的名字哟~"
    })
}

function changeSkills(){
    store.$patch(state => {
        const skills = new Set(state.skills).add("筋斗云")
        state.skills = (Array.from(skills))
    })
}
const store = useCountStore()

// 监听state
// mutation 修改的信息  state 当前state对象
store.$subscribe((mutation,state) => {
    console.log("state发生变化了",state);
    console.log(mutation);
})

// 监听actions
store.$onAction(({name, args, store, after, onError}) => {
    /* 
        name        --> 被调用的 action 的名字
        store       --> store 实例
        args        --> action接收到的参数
        after()     --> 可以设置一个回调函数，函数会在action调用成功后触发
        onError()   --> 可以设置一个回调函数，函数会在action调用失败后触发
     */
    console.log(name);
    after(() => {
        console.log("action函数调用成功了");
    })
    onError((err) => {
        console.log("action函数调用失败了",err);
    })
})
</script>

<template>
<h1>{{ store.count }} -- {{ store.name }}</h1>
<p>{{ store.increment }}</p>
<h2>{{ store.skills }}</h2>
<h2>--{{ store.double }}--</h2>
<button @click="store.addCount">自增</button>
<br><hr>
<button @click="store.name = 'fc'">改名</button>
<button @click="changeName">patch改名</button>
<button @click="changeSkills">修改技能</button>
</template>
```