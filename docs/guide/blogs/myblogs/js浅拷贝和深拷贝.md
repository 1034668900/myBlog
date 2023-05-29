---
sidebar: false
---

在 **JavaScript** 中，

- **标准的内置对象复制操作**
    - （展开语法、Array.prototype.concat()、Array.prototype.slice()、Array.from()、Object.assign() 
    和 Object.create()）**不创建深拷贝**（相反，它们**创建浅拷贝**），**对于浅拷贝，有选择地更改对象中现有元素的共享属性的值与给现有元素赋一个全新的值是不同的，理解这一点很重要**。
- **深拷贝创建方式**:
    - 如果一个 JavaScript 对象可以被序列化，则存在一种创建深拷贝的方式：使用 JSON.stringify() 
    将该对象转换为 JSON 字符串，然后使用 JSON.parse() 将该字符串转换回（全新的）JavaScript 对象

```js
let arr1 = ["1", {list: ["fc", "ly"]}];

// 浅拷贝
let arr2 = [...arr1];
arr2[1].list = ["ly","fc"];
console.log("我是修改了arr2后的arr1:",arr1);// ["1", {list: ["ly", "fc"]}]   源对象被修改了

console.log("~~~~~~~~");
// 深拷贝
let arr3 = ["1", {list: ["fc", "ly"]}];
let arr4 = JSON.parse(JSON.stringify(arr3));
console.log("我是刚刚深拷贝arr3的arr4: ",arr4); // ["1", {list: ["fc", "ly"]}]
arr4[1].list = ["ly", "fc"];
console.log("我是arr4修改后的arr3: ",arr3); // ["1", {list: ["fc", "ly"]}]  此时源对象就没受影响了
console.log();
```
