
'use strict';
var Hogan = require('hogan.js');
var conf = {
    serverHost : ''
};
//通用工具
var _mm = {
    //请求后端数据（网络请求）
    request: function(param){
        var that=this;
        $.ajax({
            type: param.method||'get',      //请求方式
            url: param.url ||'',            //请求的发送的地址
            dataType: param.type ||'json',  //数据类型
            data: param.data || '',         //请求发送到服务端的数据
            success: function(res){//是一个方法，请求成功的回调函数，传入返回后的数据，以及包含成功的字符串
                //请求成功，200
                if(res.status === 0){//这个status是与后端一起约定的，不是http状态
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                    //param.success(res.data,res.msg); 将请求成功的数据回传过去，data数据，msg信息
                }
                //没有登录状态，需要强制登录
                else if(res.status === 10){
                    that.doLogin(); //跳到登录页
                }
                //请求数据错误
                else if(res.status === 1){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            //是一个方法，请求失败404时调用此函数
            error: function (err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
     // 获取服务器地址
     getServerUrl : function(path){
        return conf.serverHost + path;
    },
     // 获取url参数
     getUrlParam : function(name){
         //比如：/product/list.do?keyword=1&past=2 我们需要提取出name，也就是keyword
        
         var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');//^&(非&)，&|$：以&结束(匹配^或者&开头，&或&结尾)
        //reg= keyword=1
        
        var result = window.location.search.substr(1).match(reg);
        // window.location.search：拿到？后面的：?keyword=1。substr(1)：keyword=1
        //keyword=1.match（keyword=1）匹配返回一个数组
        //返回一个数组["keyword=1", "keyword", "1", "", index: 9, input: "keyword=1"] 
        return result ? decodeURIComponent(result[2]) : null;//result[2]为1
    },
    //渲染html模板（把传入的模板数据进行拼接）
    renderHtml:function(htmlTemplate,data){//传入模板和数据
        var template= Hogan.compile(htmlTemplate);//编译
        var result  = template.render(data);//渲染（输出）
        return result;
    },
    
    // 成功提示
    successTips : function(msg){
        alert(msg || '操作成功！');
    },
    // 错误提示
    errorTips : function(msg){
        alert(msg || '哪里不对！');
    },
    //表单自动验证（字段验证）支持非空、手机、邮箱的判断
    validate:function(value,type){//value：待验证的字符串,type：类型，这个类型包括是require，是phone，还是email
        var value = $.trim(value);
        // 非空验证 有值，就返回true，空，返回false
        if('require' === type){ 
            return !!value;//强制转换成boolearn型
        }
        //手机号验证
        if('phone' === type){ 
            return  /^1\d{10}$/.test(value);//强制转换成boolearn型
        }
        // 邮箱格式验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);//.test()就是一个验证的过程
        }
    },
    //统一登录处理
    doLogin: function(){ 
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //跳回主页
    goHome: function(){ 
        window.location.href = './index.html';//相对路径，当前层级（同层）
    }
};

module.exports = _mm;