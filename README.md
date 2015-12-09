
###介绍
原生组件，无需依赖其他库，适用于ie9+以及其他主流浏览器（由于水平垂直居中用了css3特性。事件用了addEventListener）
提供功能：
+ 带遮罩
+ 自定义按钮文字
+ 自定义ok回调函数
+ 可取消标题和foot
+ 可设置自动关闭延迟时间


一、参数配置

```
        title:'',   //modal标题
        text:'',   //modal内容
        hasMask:true, //是否需要遮罩
        hasFoot:true, //是否需要foot（确定，取消按钮）
        hasCancelBtn:true, //是否需要删除按钮
        okButText:'确定', // ok按钮名
        cancelButText:'取消',//cancel按钮名
        autoCloseDelay:2000     //自动关闭时间
```
二、使用
```
var modal = new Modal();
modal.init({
       title:'标题',
       text:'这是一个小例子',
       hasMask:true,
       okBtnCallback:function(){}
});
```
