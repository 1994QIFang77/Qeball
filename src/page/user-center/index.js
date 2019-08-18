
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
    // 检查用户登录状态，渲染个人中心
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex, res); //渲染
            $('.panel-body').html(userHtml);
        },function(errMsg){
            _mm.errorTips(errMsg);
            
        });
    }
 };


//  JQ入口
 $(function(){
    page.init();
 });