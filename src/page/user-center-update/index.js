
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/feb-util.js');
 var _user = require('service/user-service.js');
var templateIndex= require('./index.string');

 //page 逻辑部分
 var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    //提交登录，再调用submit
    onLoad: function(){
        //初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        //加载用户信息
        this.loadUserInfo();
    },
    bindEvent: function(){
        var that = this;
        //由于panel部分是通过js的hogan渲染上去的，所以在修改的时候，去bindEvent是Bind不上去的，
        //需要杂全局监听一个事件，通过事件冒泡来判断修改的是哪一个元素
        //点击提交按钮后的动作
        $(document).on('click','.btn-submit',function(){
            var userInfo = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val())
            },
            //表单验证结果，与注册类似
            validateResult = that.validateForm(userInfo);

            if(validateResult.status){
                // 更改用户信息
                _user.updateUserInfo(userInfo, function(res, msg){
                    _mm.successTips(msg);
                    window.location.href = './user-center.html';
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },

    // 检查用户登录状态，渲染个人中心
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex, res); //渲染
            $('.panel-body').html(userHtml);
        },function(errMsg){
            _mm.errorTips(errMsg);
        });
    },
     // 验证字段信息
     validateForm : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
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
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
 };

//  JQ入口
 $(function(){
    page.init();
 });