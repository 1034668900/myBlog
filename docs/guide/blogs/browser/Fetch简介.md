# Fetch简介
- ajax在得到数据后对其处理时，如果处理的步骤较繁琐的话，就会在内部不断的嵌套，不利于维护 ，但是通过fetch可以解决该问 题，fetch是一个函数，其返回结果是一个promise
- fetch是ajax的升级版，采用的是Promise API，因此fetch也是异步的
- fetch是原生js就支持的一种ajax请求方式
## **fetch的使用**
- fetch(访问路径，配置对象)，其返回结果是一个**promise**，因此，
- **处理方式一**：
    可以通过.then的方式来读取数据，可以通过.catch的方式来处理异常
- **处理方式二**：
可以通过async和await来处理，但是将promise转换为async和await处理时一定要使用try{ }catch(e){ }的方式来处理异常

    ```js
        fetch('https://www.baidu.com',{
            method:'GET',
            mode:'cors',
            cache: 'default'
        }).then(v => {
            console.log(v.statusText);
        }).catch(e => {
            console.log(e);
        })
    ```

## **fetch配置对象说明**
- 在fetch的配置对象中，可以指定**method**(访问方法),**headers**(请求头),**body**(请求体),**signal**(处理信号)等等属性
  
- **fetch终止请求**
  1. 有时使用fetch发送一个请求后，如果服务器内部没有对该请求进行响应，那么该请求的状态一直是待处理，此时可以通过**AbortController**接口里的**abort**方法终止该请求
  2. **使用步骤**：
       1. **创建接口实例对象** const controll = new AbortController( )
       2. **在fetch的配置对象中添加属性**   { signal: controll.signal } 
       3. **通过实例对象controll调用abort方法终止请求**  controll.abort()
      
       
        