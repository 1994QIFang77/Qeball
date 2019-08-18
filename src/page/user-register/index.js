
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/feb-util.js');

//表单里的错误提示
var formError = {
   show: function(errMsg){
       $('.error-item').show().find('.err-msg').text(errMsg);
   },
   hide: function(){
       $('.error-item').hide().find('.err-msg').text('');
   }
};

//page 逻辑部分
var page = {
   init: function(){
       this.bindEvent();
   },
   //提交注册，再调用submit
   bindEvent: function(){
       var that = this;
       
       //验证username(感应验证)
       //blur：失去焦点
       $('#username').blur(function(){
           var username = $.trim($(this).val());
           if(!username){
                return;
            }
           //异步验证用户是否存在(提示用)（后端验证）
           _user.checkUsername(username, function(res){
                formError.hide();//验证成功后，要把之前错误提示给隐藏掉
            }, function(errMsg){
                formError.show(errMsg);//验证错误后，显示错误提示
            });
       });
       //注册按钮的点击
      $('#submit').click(function(){
           that.submit();
      });
      //如果按下回车键，也进行提交,13为回车键
      $('.user-content').keyup(function(e){
           if(e.keyCode === 13){
               that.submit();
           }
      });
   },
   //  提交表单
   submit: function(){
        var formData = {
            username        : $.trim($('#username').val()),
            password        : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#password-confirm').val()),
            phone           : $.trim($('#phone').val()),
            email           : $.trim($('#email').val()),
            question        : $.trim($('#question').val()),
            answer          : $.trim($('#answer').val())
       },
       // 表单验证结果（前端验证）
       validateResult = this.formValidate(formData);
       //验证成功
       if(validateResult.status){
       //提交（提交给后端）
           _user.register(formData, function(res){
            //    window.location.href = _mm.getUrlParam('redirect') || './index.html';
               window.location.href = './result.html?type=register';//跳转到result成功提示页，并且显示对应的提示元素
           }, function(errMsg){
               formError.show(errMsg);//后端数据验证不通过
           });
       }
       //验证失败
       else{
          //错误提示
          formError.show(validateResult.msg);
       }
   },
   //表单字段验证
   formValidate: function(formData){
       var result = {
           status: false,
           msg: ''
       };
       //验证用户名是否为空
       if(!_mm.validate(formData.username, 'require')){
           result.msg = '用户名不能为空';
           return result;
       }
       //验证密码是否为空
       if(!_mm.validate(formData.password, 'require')){
           result.msg = '密码不能为空';
           return result;
       }
       //验证密码的长度
       if(formData.password.length < 8){
            result.msg = '密码不能少于8位';
            return result;
        }
        //验证两次输入的密码是否一致
       if(formData.password !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
            return result;
        }
        // 验证手机号
        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = '手机号格式不正确';
            return result;
        }
        // 验证邮箱格式
        if(!_mm.validate(formData.email, 'email')){
            result.msg = '邮箱格式不正确';
            return result;
        }
        // 验证密码提示问题是否为空
        if(!_mm.validate(formData.question, 'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        // 验证密码提示问题答案是否为空
        if(!_mm.validate(formData.answer, 'require')){
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
       //通过验证，返回正确提示
       result.status   = true;
       result.msg      = '验证通过';
       return result;
   }
};

//  JQ入口
$(function(){
   page.init();
});