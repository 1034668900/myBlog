## Axios的使用
- 引入方式： 
    1. 安装axios   npm i axios   引入 const axios = require('axios').default;
    2. 使用 unpkg CDN: 

        ``` <script src="https://unpkg.com/axios/dist/axios.min.js"></script> ```
    3. 使用 jsDelivr CDN: 

        ```<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>```
- Axios 是一个基于 **promise** 网络请求库，因此可以通过读取promise数据的方法来读取数据
## Axios的特点
- 在Axios的配置对象中只有url是**必须**的，其它的都不是，默认发送get请求
- Axios能够**自动推断**请求体(data)的数据类型，**不需要像Fetch那样必须将请求体(body)数据进行JSON转换**
- Axios读取数据时会**自动将数据转换**为JSON对象，不需要像Fetch那样通过res.json()转换后返回再读取
- Axios为所有的请求方法提供了别名，但并不常用 例如 axios.request(config)
- 我们可以通过Axios.default.属性名 = 属性值 的方式来配置默认属性，
但是这样配置的属性是在所有axios请求中生效的，有时我们需要进行个性化配置时不便，
于是Axios还**支持创建Axios的实例对象**，实例对象会**继承Axios的所有默认配置**，而且可以**单独进行个性化配置**
## Axios中常用的API
- **url**           
    - 请求地址
- **method**        
    - 请求方法
- **baseURL**       
    - 可以通过设置一个 （baseURL）作为请求的根路径，后续只需为axios实例的方法传递相对 URL
    - （baseURL） 将自动加在 （url） 前面，除非 （url） 是一个绝对 URL。
- **data**          
    - 请求体 可以自动推断请求体数据类型，根据数据类型来设置Content-Type的请求头，字符串设置为application/x-www-form-urlencoded，对象设置为application/json仅适用 'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法
- **headers**       
    - 自定义请求头
- **params**         
    - （params） 是与请求一起发送的URL参数，必须是一个简单对象或 URLSearchParams 对象
- **timeout**        
    - 指定请求超时的毫秒数，请求时间超过timeout就会被立即中断
- **responseType**    
    - 指定响应类型，默认值为 responseType: "json"
- **transformRequest：[]**
    - 允许在向服务器发送前，修改请求数据,只能用于 'PUT', 'POST' 和 'PATCH' 这几个请求方法数组里面通常都是函数，且数组中最后一个函数必须返回一个字符串， 一个Buffer实例，ArrayBuffer，FormData，或 Stream
- **transformResponse：[]**
    - （transformResponse） 在传递给 then/catch 前，允许修改响应数据

更多详情可参见[Axios官网](https://www.axios-http.cn/docs/intro)

