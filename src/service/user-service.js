
'use strict';
var _mm = require('util/feb-util.js');

//用户数据与后端进行。。。
var _user = {

    //检测登录状态 nav.html
    checkLogin: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/get_user_info.do'),// 获取地址
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //用户登录 user-login.html（登录验证）
    login: function(userInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/login.do'),// 获取地址
            data: userInfo, 
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //检查用户名是否已存在 user-register.html（注册）
    checkUsername: function(username, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/check_valid.do'),// 这个user/check_valid.do地址有用户名、邮件、手机号码
            data: {
                type: 'username',//
                str: username //传进来的username的值
            }, 
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
     // 用户注册 user-register.html（注册）
     register : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/register.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //第一步输入用户名点击，检测用户名是否正确，获取用户密码提示问题 user-pass-reset.html（找回密码）
    //返回值为question的问题，显示在input框的提示上面
    getQuestion: function(username, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_get_question.do'),
            data    : {
                username: username 
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //第二步输入问题答案点击，检测question的问题答案是否正确，获取token user-pass-reset.html（找回密码）
    checkAnswer: function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_check_answer.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //第三步输入新密码点击，提交,user-pass-reset.html 重置密码
    resetPassword: function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

    //获取用户，加载信息，user-center.html（个人中心）
    // user-center-update.html(修改个人信息)
    getUserInfo: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/get_information.do'),// 获取接口，如果没有登录，强制登录
            method: 'POST',
            success: resolve,
            error: reject    
        });
    },
    //更改用户信息， user-center-update.html(修改个人信息)
    updateUserInfo: function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/update_information.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },


   //登录状态下更新用户密码，user-pass-update.html(修改密码)
    updatePassword: function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    
    //登出（退出）nav.html
    logout: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/logout.do'),// 获取地址
            method: 'POST',
            success: resolve,
            error: reject    
        });
    }
}
module.exports = _user;