# jsonp
 学习 Jsonp 的原理与使用，并且自己封装一个 Jsonp 方法



# 使用实例

```js
jsonp({
  url: 'http://localhost:3000/api/users',
  success: ( data )=>{
    console.log( data );
  }
})
```
