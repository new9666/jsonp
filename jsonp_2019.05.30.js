/**
 * Created by he on 2019/5/30.
 */

{


  // 申明一个 jsonp 方法，接收一个 options 对象
  function jsonp(options) {


    // 如果 options 对象里边没有传入需要的值，就在 defaultOptions 里边获取
    let defaultOptions = {

      // 返回数据以后会执行的方法，接收一个 data，就是需要获取的数据
      success: function (data) {
        throw new Error("请配置成功以后的执行方法！function success(){}");
      },
      // 后端定义的 jsonp 接口，需要接收的属性名
      callback: "callback",

      // 后端定义的 jsonp 接口，需要接收的方法名
      funcName: "getData",

      // 3000ms 以后销毁创建的 Script 标签，
      // 如果 options 有传入 timeout，则根据 options 的 timeout 值来确定销毁时间
      timeout: 3000
    };



    // 将 options 里边的配置项，复制到 defaultOptions 里边来，
    for (let key in options) {
      defaultOptions[key] = options[key];
    }



    // 生成一个伪随机数
    let random = parseInt(Math.random() * 100000000000000000000);

    // 将defaultOptions 里边配置的方法名添加一个随机数字符串，
    // 防止下一步添加到全局对象上过后，会有命名冲突
    let funName = defaultOptions.funcName + "_" + random;

    // 将上边生成的方法名，挂载到全局对象 window 上边，并接收一个参数 data，就是获取到的数据
    window[funName] = function (data) {

      // 执行 defaultOptions 里边配置的 success 方法，并传入一个 data，就是获取到的数据
      defaultOptions["success"](data);
    };

    // 创建一个 Script 标签
    let script = document.createElement("script");

    // scrip 标签的 src 属性值为：url + callback + 自定义的函数名
    script.src = defaultOptions.url + "?" + defaultOptions.callback + "=" + funName;

    // 将 Script 标签插入 body 标签内
    document.body.appendChild(script);

    // 设置一个超时时间，然后将上边创建的 script 标签从 body 标签中删除
    // 删除 Script 标签的同时，也删除上边挂载到 window 全局对象上的方法
    setTimeout(function () {
      document.body.removeChild(script);
      window[funName] = null;


      // 超时时间默认为 3000ms，如果 Options 传入timeout，则根据用户传入的值来确定
    }, defaultOptions.timeout)

  }

  // 使用实例
  /*
  jsonp({
    url: 'http://localhost:3000/api/users',
    success(data) {
      console.log(data);
    },
    timeout: 5000
  })
  */


}