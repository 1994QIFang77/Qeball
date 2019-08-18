

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
    //提交登录，再调用submit
    bindEvent: function(){
        var that = this;
        //登录按钮的点击
       $('#submit').click(function(){
            that.submit();//字段验证
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
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        },
        // 表单验证结果
        validateResult = this.formValidate(formData);//表单前端逻辑验证
        //验证成功
        if(validateResult.status){
        //提交
            _user.login(formData, function(res){//后端验证
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
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
    //表单字段验证（前端逻辑验证）
    formValidate: function(formData){
        var result = {
            status: false,
            msg: ''
        };
        if(!_mm.validate(formData.username, 'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '密码不能为空';
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