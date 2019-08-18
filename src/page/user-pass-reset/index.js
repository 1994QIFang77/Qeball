
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
    data: {
        username: '',//用户名
        question: '',//问题
        answer:'', //问题答案
        token: ''   
    },
   init: function(){
       this.onLoad();//页面一打开，要显示第一步
       this.bindEvent();
   },
   onLoad: function(){
       this.loadStepUsername();
   },
   //提交登录，再调用submit
   bindEvent: function(){
       var that = this;
       //第一步：用户按钮的点击下一步(根据用户名获取密码提示问题接口)
      $('#submit-username').click(function(){
           var username = $.trim($('#username').val());
           //用户名存在
           if(username){
               //用户名成功，返回提示的问题
               _user.getQuestion(username,function(res){
                        that.data.username = username;
                        that.data.question = res;
                        that.loadStepQuestion();//执行第二步
               },function(errMsg){
                   formError.show(errMsg);
               });
           }
           //用户名不存在
           else{
                formError.show('请输入用户名');
           }
      });
      //第二步：问题答案按钮的点击下一步（根据用户名、问题和答案获取认证token接口）
      $('#submit-question').click(function(){
            var answer = $.trim($('#answer').val());
            //问题答案
            if(answer){
                //检查密码提示问题答案
                //密码提示问题答案正确，返回token
                _user.checkAnswer({
                    username: that.data.username,
                    question: that.data.question,
                    answer: answer
                },function(res){
                         that.data.answer = answer;
                         that.data.token = res;
                         that.loadStepPassword();//执行第三步
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            //问题答案不存在
            else{
                formError.show('请输入密码提示问题的答案');
            }
        });
         //第三步：输入新密码后点击下一步（根据用户名、新密码和认证token重置密码接口）
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            //密码不为空
            if(password && password.length >= 8){
               
                _user.resetPassword({
                    username        : that.data.username,
                    passwordNew     : password,
                    forgetToken     : that.data.token
                },function(res){//返回成功，重置密码成功
                    window.location.href = './result.html?type=pass-reset';
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            //密码为空
            else{
                formError.show('请输入不少于8位的新密码');
            }
        });
   },
   //加载显示第一步：输入用户名
   loadStepUsername: function(){
       $('.step-username').show();
   },
   //加载显示第二步：输入答案
   loadStepQuestion: function(){
       formError.hide();//进入第二步的时候，将一切错误提示信息全部隐藏
        //第二步
       $('.step-username').hide().siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },
    //加载显示第三步：提交密码
    loadStepPassword: function(){
        formError.hide();//进入第二步的时候，将一切错误提示信息全部隐藏
        //第二步
       $('.step-question').hide().siblings('.step-password').show();
    }
};

//  JQ入口
$(function(){
   page.init();
});