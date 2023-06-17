# Promise

## Promise基础

### 为什么要使用Promise

- **Promise**是ES6新引进的**解决异步编程的一种方案**，Promise是一个**构造函数**，专门用来**封装异步操作**，**并接收其运行成功**或者**失败的结果**，Promise可以避免异步操作多层嵌套的问题，即**回调地狱**，通过对对象调**then方法**拿到成功或失败的数据，然后**在Promise对象外部进行接下来的操作**，从而**避免了多层嵌套**

### Promise的三种状态及其改变

- Promise的三种状态
  - **pending**	： 初始状态，等待处理中
  - **resolved/fulfilled**     :   操作成功完成
  - **rejected**     :   操作失败
- 状态改变：
  - 状态只能由`pending` 改变为  `resolved/fulfilled`   |   `rejected`



### Promise的结构

- 在new一个Promise实例的时候，我们需要传入一个执行器函数，这个执行器函数的执行是同步的

  ```js
  let p = new Promise((resolve,reject) => {
      // 同步执行
      console.log(1);
  })
  
  console.log(2);
  
  // 输出结果： 先1 后2
  ```

  

- 执行器函数会接收两个参数（**resolve**和**reject**），这两个参数就是两个函数，`resolve`在成功的时候调用，`reject`在失败的时候调用，**resolve**或**reject**两个函数中任意一个调用后，Promise的状态就会**改变**

- **异步操作**在执行器中书写

- Promise实例对象身上有两个属性：

  - **PromiseState** : 保存当前Promise的状态
  - **PromiseResult**：保存当前Promise的结果

### Promise原型对象的方法 

#### .then( )

- `Promise.prorotype.then( )`方法接收**两个参数**，第一个参数是处理成功的回调，第二个参数是处理失败的回调
- `Promise.prorotype.then( )`方法会返回一个新的Promise对象，正因如此，Promise可以实现**链式调用**

#### .catch( )

- 我们通过`Promise.prorotype.catch( )`方法可以处理Promise失败的结果

#### .finally( )

- `Promise.prototype.finally( )`方法会**返回**一个**Promise**,在Promise结束时，无论其结果是`fulfilled`还是`rejected`，该方法都会执行其指定的回调。这为在`Promise`**执行结果无论是成功还是失败都需要执行的代码**提供了一种方式，避免了同样的语句需要在`.then( ) 和 .catch( )`中都要写一次的情况

- 语法：`p.finally( cb )`,其中`cb`是Promise执行结束后需要执行的回调

  

### Promise构造函数的方法

#### resolve( )

- `Promise.resolve( value )`方法调用后会返回一个**Promise**对象，这个Promise对象的结果取决于传入的值`value`,如果该值是一个**非Promise对象**,那么返回的Promise对象的结果为**成功**，如果该值是一个**Promise对象**，**那么返回的Promise对象的结果取决于该值的结果**

#### reject( )

- `Promise.reject( value )`方法调用后，无论内部`value`值是什么，都会直接返回一个失败的Promise

#### all( )

- `Promise.all( iterable)`方法接收一个Promise的**iterable**(可迭代)类型（注：**Array**、**Map**、**Set**都属于ES6的iterable类型)的值，并且**只返回一个Promise实例**

- 只有iterable中**所有的Promise的结果都是成功**，`Promise.all( iterable)`返回的状态是**成功**，结果是**所有的Promise对象的结果**

  ```js
  let p1 = Promise.resolve(1)
  let p2 = Promise.resolve(1)
  let p3 = Promise.resolve(1)
  let p4 = Promise.resolve(1)
  
  let promiseArr = [p1,p2,p3,p4]
  
  let promiseAll = Promise.all(promiseArr)
  
  console.log(promiseAll);// fulfilled
  ```

  

- 只要iterable中有**任何一个Promise失败**，`Promise.all( iterable)`返回的**状态**就是**失败**，**结果**就是**失败的Promise的结果**

  ```js
  let p1 = Promise.reject(1)
  let p2 = Promise.resolve(1)
  let p3 = Promise.resolve(1)
  let p4 = Promise.resolve(1)
  
  let promiseArr = [p1,p2,p3,p4]
  
  let promiseAll = Promise.all(promiseArr)
  
  console.log(promiseAll);// rejected
  ```

  

#### race( )

- `Promise.race( iterable )`方法接收一个Promise的**iterable**类型对象，返回一个新的**Promise对象**，这个Promise对象的结果取决于`iterable`中**最先完成**的Promise对象的结果(无论成功还是失败)

  ```js
  let p1 = new Promise((resolve,reject) => {
      setTimeout(() => {
          resolve()
      }, 1000)
  })
  let p2 = new Promise((resolve,reject) => {
      setTimeout(() => {
          reject()
      }, 500)
  })
  let p3 = new Promise((resolve,reject) => {
      setTimeout(() => {
          resolve()
      }, 2000)
  })
  
  
  let promiseArr = [p1,p2,p3]
  
  let promiseAll = Promise.race(promiseArr)
  console.log(promiseAll);// rejected
  ```



#### any( )

- `Promise.any( iterable )`方法接收一个由**Promise组成的可迭代对象**，该方法会返回一个**新的Promise**，一旦`iterable`中任意一个Promise状态变为`fulfilled`（成功），那么该方法返回的Promise状态就是`fulfilled`(成功)，其结果就是`iterable`中**最先成功的结果**。

  ```js
  let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("我第二");
    }, 1000);
  });
  let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("我最先成功");
    }, 500);
  });
  let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("我最后成功");
    }, 2000);
  });
  
  let promiseArr = [p1, p2, p3];
  
  let promiseAll = Promise.any(promiseArr);
  promiseAll.then(
    (value) => {
      console.log(value);
      console.log(promiseAll); // fulfilled  我最先成功
    },
    (err) => {
      console.log(err);
      console.log(promiseAll);
    }
  );
  ```

- 如果`iterable`中所有的Promise执行后的状态都是`rejected`，那么`Promise.any(iterable)`方法返回的Promise的状态就是`rejected`,结果是`AggregateError`实例

  ```js
  let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("我第二失败");
    }, 1000);
  });
  let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("我最先失败");
    }, 500);
  });
  let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("我最后失败");
    }, 2000);
  });
  
  let promiseArr = [p1, p2, p3];
  
  let promiseAll = Promise.any(promiseArr);
  promiseAll.then(
    (value) => {
      console.log(value);
      console.log(promiseAll);
    },
    (err) => {
      console.log(err);
      console.log(promiseAll);// Promise {<rejected>: AggregateError: All promises were rejected}
    }
  );
  ```

  

#### allSettled( )

- `Promise.allSettled( iterable )`接受有一个由Promise组成的可迭代对象，当`iterable`中所有的Promise的**状态**都**改变**后，`Promise.allSettled( iterable )`方法**就会返回一个成功的Promise**，且**返回结果**是**描述每个Promise执行结果的数组**

  ```js
  let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("我第二失败");
    }, 1000);
  });
  let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("我最先失败");
    }, 500);
  });
  let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("我最后失败");
    }, 2000);
  });
  
  let promiseArr = [p1, p2, p3];
  
  let promiseAll = Promise.allSettled(promiseArr);
  promiseAll.then(
    (value) => {
      console.log(value);//  [{…}, {…}, {…}]
      console.log(promiseAll);// fulfilled  Array(3)
    },
    (err) => {
      console.log(err);
      console.log(promiseAll);
    }
  );
  ```



## Promise进阶

### Promise状态改变对应回调执行问题

- 当Promise 的状态发生改变时，其对应状态的回调**指定多个**其**依然会执行**

  - pending --> fulfilled

  ```js
  let p = new Promise((resolve, reject) => {
    resolve('ok')
  });
  
  p.then(value => {
      console.log("1",value);
  })
  
  p.then(value => {
      console.log("2",value);
  })
  
  // 执行结果： 1 ok   2 ok
  ```

  - pending --> rejected

  ```js
  let p = new Promise((resolve, reject) => {
    reject('failed')
  });
  
  p.then(value => {
      console.log("1",value);
  },err => {
      console.log("1",err);
  })
  
  p.then(value => {
      console.log("2",value);
  },err => {
      console.log("2",err);
  })
  
  // 执行结果： 1 failed   2 failed
  ```

  

### Promise状态改变和指定回调的顺序问题

- **问题提出**：promise的**状态改变**和**指定回调函数**谁先谁后？（注意，不是回调的执行）

- **答案**：**都有可能!**
  1. **正常情况**下是**先执行回调再改变状态**，但也可以**先改变状态再指定回调**
  2. 如何**先改变状态再指定回调**？
     	1. 在执行器中直接调用`resolve( ) 或 reject( )`
      	2. 延迟一定时间再调用`.then( )`
  3. **什么时候才能得到数据？**
     1. 如果**先指定的回调**，那么当Promise的**状态**发生**改变时**，**回调函数**就会**调用**，**得到数据**
     2. 如果**先改变的状态**，那么**指定回调时**，**回调函数**就会**调用**，**得到数据**



### then方法返回的Promise的结果由什么决定

- 由`.then( )`方法**指定的回调执行的结果**决定

- 具体情况：

  1. 如果指定回调抛出异常，那么新Promise的状态为`rejected`，结果为异常信息

     ```js
     let p = new Promise((resolve, reject) => {
         resolve("ok");
     });
     
     let result = p.then((value) => {
       // 抛出异常
       throw new Error('failed')
     });
     
     console.log(result);
     
     ```

  2. 如果指定回调的返回值是**非Promise对象**，那么**新Promise的状态**为`fulfilled`，其**结果**为指定回调的**返回值**

     ```js
     let p = new Promise((resolve, reject) => {
         resolve("ok");
     });
     
     let result = p.then((value) => {
         return '你好呀'
     });
     
     console.log(result);// fulfilled  你好
     ```

  3. 如果指定回调的返回值是**Promise对象**，那么**新Promise的状态**由**返回值的Promise的状态决定**

     ```js
     let p = new Promise((resolve, reject) => {
         resolve("ok");
     });
     
     let result = p.then((value) => {
         return Promise.resolve('ok')
     });
     
     console.log(result);// fulfilled  ok
     
     ------------------------------------------
     
     let p = new Promise((resolve, reject) => {
         resolve("ok");
     });
     
     let result = p.then((value) => {
         return Promise.reject('failed')
     });
     
     console.log(result);// rejected  failed
     
     ```

     

### Promise异常穿透

- 当通过`.then( )`方法链式调用时，只需要在**最后使用**`.catch( )`方法便能捕获到**第一个异常**的Promise，这就是Promise的**异常穿透**

  ```js
  let p = new Promise((resolve, reject) => {
    reject("failed");
  });
  
  p.then((value) => {
    console.log(value);
  })
    .then((value) => {
      console.log(value);
    })
    .catch((err) => {
      console.log(err); // failed
    });
  
  ```

  



## 自定义Promise

### resolve | reject 方法注意事项

- **resolve**方法和**reject**方法使用时是直接`resolve() | reject()`调用的，因此在写该方法时其**内部的this不是Promise实例对象**

  

### then 方法注意事项

#### then方法获取异步结果实现注意点

- 在**then方法获取异步任务的结果实现时**，**不能直接调用**使用then方法时传入的**两个回调**（成功的和失败的），因为此时promise的状态为`pending`,而应该在写then方法时判断状态为`pending`的情况，并在此时**保存传入的两个回调（定义一个实例对象身上的callback属性存放）**，然后在`resolve和reject`方法**被调用时判断**`callback`是否含有这两个回调，有就调用
- 保存时若将`callback`定义为对象的形式，则**重复调用then方法**时**后面的then方法**的回调会**覆盖**前面then方法的回调
- 将`callback`定义为**数组**，将每次then方法调用时传递的**两个回调以对象形式**存入数组中，在`resolve | reject`中**循环遍历查找回调**，便可实现多个then方法重复执行

#### then方法返回结果注意事项

1. **同步**任务结果返回情况

   - then方法调用后会**返回**一个**新的Promise**，这个新Promise的状态取决于then方法内两个**回调执行返回结果**(详情见上方)

   - 这个新Promise也是自定义Promise的**实例对象**，因此可以通过`resolve | reject`方法**修改**新Promise的**状态**

2. **异步**任务结果返回情况

   - 异步获取返回结果时，不能再直接将**then**方法的两个回调**push**到**callback**中,因为这两个方法最终是在`resolve | reject`中执行的，**以下写法会导致在then方法中拿不到这两个回调执行的返回结果**，如下:

     ```js
     // then方法内
     this.callback.push({
         onResolve,
         onReject
     })
     ```

   - 可以将这两个回调包装成函数，这样在`resolve | reject`中执行`onResolve |  onReject`时，**实质**执行的是`then`中`onResolve 和 onReject`对应的函数，这样就可以在`then`中拿到这两个回调执行的返回结果,然后**根据返回结果决定新Promise的状态**

     ```js
      this.callbacks.push({
             onResolve: () => {
               // 这里写成函数，并在函数中调用成功的回调
               // 当该函数在resolve中执行时可以在此处拿到onResolve执行结果的返回值
               try {
                 let result = onResolve(this.promiseResult);
                 if (result instanceof Promise) {
                   if (result.promiseState === "fulfilled") {
                     resolve(result.promiseResult);
                   }
                   if (result.promiseState === "rejected") {
                     reject(result.promiseResult);
                   }
                 } else {
                   resolve(result);
                 }
               } catch (error) {
                 reject(error);
               }
             },
             onReject: () => {
               try {
                 let result = onReject(this.promiseResult);
                 if (result instanceof Promise) {
                   if (result.promiseState === "fulfilled") {
                     resolve(result.promiseResult);
                   }
                   if (result.promiseState === "rejected") {
                     reject(result.promiseResult);
                   }
                 } else {
                   resolve(result);
                 }
               } catch (error) {
                 reject(error);
               }
             },
           });
     ```

   - **根据返回结果来更新Promise的状态的代码重复性很高，将其封装后可大大简化代码量**(封装时注意**this**的指向)

     ```js
         // 封装函数用于处理Promise状态
     	const self = this
         function judgeState(callback) {
           try {
             let result = callback(self.promiseResult);
             // 判断onResolve执行的返回结果
             if (result instanceof Promise) {
               // 是Promise，则判断该Promise的状态
               if (result.promiseState === "fulfilled") {
                 resolve(result.promiseResult);
               }
               if (result.promiseState === "rejected") {
                 reject(result.promiseResult);
               }
             } else {
               // 不是Promise
               resolve(result);
             }
           } catch (error) {
             reject(error);
           }
         }
         if (this.promiseState === "fulfilled") {
           judgeState(onResolve);// 调用函数处理Promise状态
         }
         if (this.promiseState === "rejected") {
           judgeState(onReject);// 调用函数处理Promise状态
         }
         if (this.promiseState === "pending") {
           // 保存回调，
           this.callbacks.push({
             onResolve: () => {
               // 这里写成函数，并在函数中调用成功的回调
               // 当该函数在resolve中执行时可以在此处拿到onResolve执行结果的返回值
               judgeState(onResolve)
             },
             onReject: () => {
                 judgeState(onReject)// 调用函数处理状态
             },
           });
         }
     ```




### catch方法实现

- 异常穿透实现原理

  - 通过调用**then**方法，给**成功的回调传入undefined**，**正常传入失败的回调**,同时在then方法中判断传入的**onResolve**和**onReject**是不是函数，不是的话给其一个默认值

    ```js
    // catch方法
    Promise.prototype.catch = function (onReject) {
      return this.then(undefined, onReject);
    };
    ```

    

    ```js
     // then方法中
    if (typeof onReject !== "function") {
        onReject = (e) => {
          throw e;
        };
      }
      if (typeof onResolve !== "function") {
        onResolve = (val) => val;
      }
    ```



### Promise.resolve方法实现

```js
// 封装Promise.resolve方法
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    // 判断传入参数的类型
    if (value instanceof Promise) {
      if (value.promiseState === "fulfilled") {
        resolve(value.promiseResult);
      }
      if (value.promiseState === "rejected") {
        reject(value.promiseResult);
      }
    } else {
      resolve(value);
    }
  });
};
```



### Promise.reject方法实现

```js
// 封装Promise.reject方法
Promise.reject = function (value) {
  return new Promise((resolve, reject) => {
    // 判断传入参数的类型
    if (value instanceof Promise) {
      reject(value.promiseResult);
    } else {
      resolve(value);
    }
  });
};
```



### Promise.all方法

- Promise.all方法接收一个**Promise类型的可迭代对象**，那么**每个item项**就是一个**Promise**，既然是Promise，那么**就可以调用then方法**，最后**该Promise是成功还是失败**，**可以通过**它**执行的是then方法中的哪个回调**就可以知道

- **注意**：添加成功Promise结果的时候，尽量**不要使用push方法**，因为**Promise状态的改变顺序可能是不同的**，直接使用push方法会导致**结果的下标**和**迭代对象内容的下标**不对应

  ```js
  // 封装Promise.all方法
  Promise.all = function (promiseArr) {
    return new Promise((resolve, reject) => {
      let sucNum = 0;//记录成功的Promise数量
      let promiseResult = [];// 存放成功Promise的结果
      promiseArr.forEach((item,index) => {
        item.then(
          (value) => {
            sucNum++;
            promiseResult[index] = value;
            // 全部Promise成功才改变状态
            if (sucNum === promiseArr.length) {
              resolve(promiseResult);
            }
          },
          (err) => {
            reject(err);
            return
          }
        );
      });
    });
  };
  ```



### Promise.race方法

- `Promise.race( iterable )`方法接收一个Promise的**iterable**类型对象，返回一个新的**Promise对象**，这个Promise对象的结果取决于`iterable`中**最先完成**的Promise对象的结果(无论成功还是失败)

  ```js
  // 封装Promise.race方法
  Promise.race = function (promiseArr){
    return new Promise((resolve,reject) => {
      promiseArr.forEach(item => {
        item.then(value => {
          resolve(value)// 谁最先完成直接修改新Promise的状态和结果
        }, err => {
          reject(err)// 谁最先完成直接修改新Promise的状态和结果
        })
      })
    })
  }
  ```



### Promise.any方法

```js
// 封装Promise.any方法
Promise.any = function (promiseArr){
  return new Promise((resolve,reject) => {
    promiseArr.forEach(item => {
      item.then(value => {
        resolve(value)
      })
    })
  })
}
```



### Promise.allSettled方法

```js
// 封装Promise.allSettled方法
Promise.allSettled = function (promiseArr) {
  return new Promise((resolve, reject) => {
    let changeNum = 0; // 记录状态改变Promise的数量
    let resultArr = []; // 记录promise的结果
    promiseArr.forEach((item, index) => {
      item.then(
        (value) => {
          changeNum++;
          resultArr[index] = value;
          judgeAll();
        },
        (err) => {
          changeNum++;
          resultArr[index] = err;
          judgeAll();
        }
      );
    });
    // 判断全部Promise是否执行完毕
    function judgeAll() {
      if (changeNum === promiseArr.length) {
        resolve(resultArr);
      }
    }
  });
};
```



## 自定义Promise完整代码

```js
// 自定义Promise
function Promise(executor) {
  // 添加Primise的属性,该属性应该存在于实例对象
  this.promiseState = "pending";
  this.promiseResult = null;
  this.callbacks = [];
  // 保存this的指向
  const self = this;

  /* 
        1. 修改Promise状态：
            resolve/reject/抛出错误
    */
  // resolve方法
  function resolve(data) {
    // 该方法在外部是直接调用的，因此这里的this将是window
    // 判断promise的状态,使得状态只能从pending变化为fulfilled/rejected
    if (self.promiseState !== "pending") return;
    self.promiseState = "fulfilled";
    self.promiseResult = data;
    // then方法内的回调是异步执行的
    setTimeout(() => {
      self.callbacks.forEach((callback) => {
        // 判断callback中是否有成功的回调
        if (callback.onResolve) {
          // 调用并传递成功的数据
          callback.onResolve(data);
        }
      });
    });
  }
  // reject
  function reject(data) {
    if (self.promiseState !== "pending") return;
    self.promiseState = "rejected";
    self.promiseResult = data;
    setTimeout(() => {
      self.callbacks.forEach((callback) => {
        if (callback.onReject) {
          callback.onReject(data);
        }
      });
    });
  }
  try {
    // 同步调用执行器函数
    executor(resolve, reject);
  } catch (error) {
    // 出现错误，修改promise的状态并传入错误信息
    if (self.promiseState !== "pending") return;
    reject(error);
  }
}

// 为Promise原型对象添加方法
/* 
 then方法：
    1. 获取Promise执行的结果
    2. 链式调用
    3. then方法是由Promise的实例对象调用的，因此this可以拿到实例对象的promise状态
    4. then方法调用多次仍会执行
    5. then方法的返回值也是一个Promise，并且这个Promise的状态不是一成不变的

*/
Promise.prototype.then = function (onResolve, onReject) {
  if (typeof onReject !== "function") {
    onReject = (e) => {
      throw e;
    };
  }
  if (typeof onResolve !== "function") {
    onResolve = (val) => val;
  }
  return new Promise((resolve, reject) => {
    const self = this;
    // 封装函数用于处理Promise状态
    function judgeState(callback) {
      try {
        let result = callback(self.promiseResult);
        // 判断onResolve执行的返回结果
        if (result instanceof Promise) {
          // 是Promise，则判断该Promise的状态
          if (result.promiseState === "fulfilled") {
            resolve(result.promiseResult);
          }
          if (result.promiseState === "rejected") {
            reject(result.promiseResult);
          }
        } else {
          // 不是Promise
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    }
    if (this.promiseState === "fulfilled") {
      setTimeout(() => {
        judgeState(onResolve); // 调用函数处理状态
      });
    }
    if (this.promiseState === "rejected") {
      setTimeout(() => {
        judgeState(onReject); // 调用函数处理状态
      });
    }
    if (this.promiseState === "pending") {
      // 保存回调，
      this.callbacks.push({
        onResolve: () => {
          // 这里写成函数，并在函数中调用成功的回调
          // 当该函数在resolve中执行时可以在此处拿到onResolve执行结果的返回值
          judgeState(onResolve);
        },
        onReject: () => {
          judgeState(onReject);
        },
      });
    }
  });
};

// 添加catch方法
/* 
  catch方法异常穿透:可以通过调用then方法，给成功的回调传入undefined
*/
Promise.prototype.catch = function (onReject) {
  return this.then(undefined, onReject);
};

// 封装Promise.resolve方法
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    // 判断传入参数的类型
    if (value instanceof Promise) {
      if (value.promiseState === "fulfilled") {
        resolve(value.promiseResult);
      }
      if (value.promiseState === "rejected") {
        reject(value.promiseResult);
      }
    } else {
      resolve(value);
    }
  });
};

// 封装Promise.reject方法
Promise.reject = function (value) {
  return new Promise((resolve, reject) => {
    // 判断传入参数的类型
    if (value instanceof Promise) {
      reject(value.promiseResult);
    } else {
      reject(value);
    }
  });
};

// 封装Promise.all方法
Promise.all = function (promiseArr) {
  return new Promise((resolve, reject) => {
    let sucNum = 0; //记录成功的Promise数量
    let promiseResult = []; // 存放成功Promise的结果
    promiseArr.forEach((item, index) => {
      item.then(
        (value) => {
          sucNum++;
          promiseResult[index] = value;
          // 全部Promise成功才改变状态
          if (sucNum === promiseArr.length) {
            resolve(promiseResult);
          }
        },
        (err) => {
          reject(err);
          return;
        }
      );
    });
  });
};

// 封装Promise.race方法
Promise.race = function (promiseArr) {
  return new Promise((resolve, reject) => {
    promiseArr.forEach((item) => {
      item.then(
        (value) => {
          resolve(value); // 谁最先完成直接修改新Promise的状态和结果
        },
        (err) => {
          reject(err); // 谁最先完成直接修改新Promise的状态和结果
        }
      );
    });
  });
};

// 封装Promise.any方法
Promise.any = function (promiseArr) {
  return new Promise((resolve, reject) => {
    promiseArr.forEach((item) => {
      item.then((value) => {
        resolve(value);
      });
    });
  });
};

// 封装Promise.allSettled方法
Promise.allSettled = function (promiseArr) {
  return new Promise((resolve, reject) => {
    let changeNum = 0; // 记录状态改变Promise的数量
    let resultArr = []; // 记录promise的结果
    promiseArr.forEach((item, index) => {
      item.then(
        (value) => {
          changeNum++;
          resultArr[index] = value;
          judgeAll();
        },
        (err) => {
          changeNum++;
          resultArr[index] = err;
          judgeAll();
        }
      );
    });
    // 判断全部Promise是否执行完毕
    function judgeAll() {
      if (changeNum === promiseArr.length) {
        resolve(resultArr);
      }
    }
  });
};

```

