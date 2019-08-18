
'use strict';
require('./index.css');
var _mm = require('util/feb-util.js');

//通用页面头部
var header = {
    init: function () {
        //this指向它的调用者
        this.onLoad();//这里的this指向的是init这个方法的调用者header
        this.binEvent();
    },
    onLoad: function(){
        var keyword = _mm.getUrlParam('keyword');//// 获取url参数
        // keyword存在，则回填输入框
        if(keyword){
            $('#search-input').val(keyword);
        };
    },
    //点击搜索
    binEvent: function(){
        var that = this;
        //点击搜索按钮
        $('#search-btn').click(function(){
           that.searchSubmit();//搜索提交
       });
        // 键盘回车后，做搜索提交
        $('#search-input').keyup(function(e){
            // 13是回车键的keyCode
            if(e.keyCode === 13){
                that.searchSubmit();//搜索提交
            }
        });
    },
    //搜索提交
    searchSubmit: function(){
        var keyword = $.trim($('#search-input').val());
        //若keyword存在不为空，则跳转li页面
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;//商品列表页
        }else{
            _mm.goHome();//不存在，keyword为空，就直接返回首页
        }
    }
};
//方法都是内部的，不需要外部调用
header.init();