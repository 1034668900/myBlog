# Ajax使用
## **使用步骤**
- **创建一个xhr对象**
    - const xhr = new XMLHttpRequest()
- **设置请求信息**(参数一请求方式, 参数二请求路径)
    - xhr.open("GET", "http://localhost:3000/students")
- **发送请求**
    - xhr.send()

## 代码实例

```js
<body>
    <h1>AJAX测试</h1>
    <br/>
    <button id="btn">点我加载数据</button>
    <div id="root"></div>
    <script>
        const btn = document.getElementById('btn')
        /* 
        实现将访问得到的数据在html中显示出来，利用DOM操作
        */
        const root = document.getElementById('root')
        btn.onclick = () => {
            // 创建一个xhr对象
            const xhr = new XMLHttpRequest()

            // 法二：指定xhr.response返回数据类型   json只能小写
            xhr.responseType = "json"

            // 为xhr绑定一个load事件，即当xhr加载完毕后执行对应回调
            xhr.onload = () => {
                /*当xhr加载完毕后再打印，
                但是此时也有问题，若是访问路径出错的话，直接打印的数据没有意义而且会报错，因此应该先判断
                console.log(xhr.response); */

                // 判断响应状态码(此时的响应状态码和我们在服务器定义的不是一个东西)
                if(xhr.status === 200){
                    // xhr.response返回的数据是字符串形式的
                    // 法一 ：手动将返回的数据转换为JSON
                    //const result = JSON.parse(xhr.response)
                    //console.log(result);

                    // 法二
                    //console.log(xhr.response);

                    // 渲染页面
                    // 储存数据
                    const result = xhr.response
                    // 创建一个ul
                    const ul = document.createElement("ul")
                    // 将ul插入到root这个div中
                    root.appendChild(ul)
                    // 遍历result
                    for(let v of result.data){
                        /* 
                        insertAdjacentHTML方法的四个参数
                        -beforebegin ：元素自身的前面。
                        -afterbegin  ：插入元素内部的第一个子节点之前。
                        -beforeend   ：插入元素内部的最后一个子节点之后。
                        -afterend    ：元素自身的后面。
                        
                        */
                        ul.insertAdjacentHTML(
                            "beforeend",
                            `<li>${v.id} - ${v.name} - ${v.age} - ${v.address}</li>`
                        )
                    }


                }
            }

            // 设置请求信息(参数一请求方式, 参数二请求路径)
            xhr.open("GET", "http://localhost:3000/students")

            // 发送请求
            xhr.send()

            // 读取响应信息   xhr.response表示响应信息
            // 但是此时读取不到，因为AJAX请求是异步的，此时直接打印是没有结果的
            //console.log(xhr.response);
        }
    </script>        
</body>


```