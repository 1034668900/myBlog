# Web Workers

## 分线程的意义
> 当在浏览器端用户交互需要处理大量数据时，在主线程参与运算过程中，用户对页面进行任何操作都没有响应，很影响用户体验，此时就可以利用H5提供的Web Workers多线程来将主线程需要进行大量运算的代码添加到分线程中进行运算，这样即使运算过程中用户也依然可以的页面进行操作:



  ##  Web Workers使用步骤

-  **注意**： 分线程是单独创建的一个js文件，且Window的方法在这里不能调用，因为在分线程里全局对象不是Window,而是`DedicatedWorkerGlobalScope`，因此在分线程中不能更新界面，这是特意这样设计的，就是为了防止js多线程对同一个对象处理时复杂得到同步问题
- **缺点**
  1. 慢 ,直接在主线程计算会更快，但是在主线程计算过程会冻结界面，但是分线程计算不会阻塞界面
  2. 不能跨域加载js 
  3. 分线程里代码不能访问window全局对象 
  4. 不是所有浏览器都支持	
- 使用
  1. 主线程中创建一个worker对象,并传入分线程的url`eg: var worker = new Worker("worker.js");`
  2. 主线程中绑定接收消息的监听`eg: worker.onmessage = function(event) {
       console.log("主线程接收分线程返回的数据: " + event.data);
     }`
  3. 主线程向分线程发送数据  由于该操作是异步进行，所有和onmessage代码没有顺序要求`eg: worker.postMessage(inputNum);`
  4. 分线程接收主线程传递的数据`eg: var onmessage = function(event){ }`
  5. 分线程对数据进行计算处理
  6. 分线程返回处理结果`eg: postMessage(result)`

```js
    -1. 主线程中创建一个worker对象,并传入分线程的url
        eg: var worker = new Worker("worker.js");
    -2. 主线程中绑定接收消息的监听
        eg: worker.onmessage = function(event) {
      console.log("主线程接收分线程返回的数据: " + event.data);
    }
    -3. 主线程向分线程发送数据  由于该操作是异步进行，所有和onmessage代码没有顺序要求       
    eg: worker.postMessage(inputNum);
    -4. 分线程接收主线程传递的数据
        eg: var onmessage = function(event){}
    -5. 分线程对数据进行计算处理
    -6. 分线程返回处理结果
        eg: postMessage(result)
```



