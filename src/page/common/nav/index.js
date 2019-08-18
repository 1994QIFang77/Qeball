
'use strict';
require('./index.css');
var _mm = require('util/feb-util.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
//导航
var nav = {

    //初始化，入口
    init: function () {
        //this指向它的调用者
        this.binEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    // 把事件全部放在一起，登录退出注册
    binEvent: function(){
        //登录点击事件
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        //注册点击事件
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        //退出事件
        //退出时，需要请求到后端数据，让后端把记录的登录状态都删掉
        //user-service.js
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();//页面重新刷新
            },function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },
    //获取加载用户信息
    loadUserInfo: function(){
        _user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.login').show()
            .find('.username').text(res.username);
        },function(errMsg){
            //do nothing
        });
    },
    //加载购物车的数量
    loadCartCount: function(){
        _cart.getCartCount(function(res){
            $('.nav .cart-count').text(res || 0);
        },function(errMsg){
            $('.nav .cart-count').text(res || 0);
        });
    }
};
// 输出数据
//把nav当做一个对象输出出去，调用上的inint()
module.exports = nav.init();