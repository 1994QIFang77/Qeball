
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
// var navSide = require('page/common/nav-side/index.js');
var templateBanner  = require('./banner.string');
var _mm = require('util/feb-util.js');


$(function() {
    // 渲染banner的html
    var bannerHtml  = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 初始化banner
    var $slider     = $('.banner').unslider({
        dots: true
    });
    $('.banner').mouseenter(function(){
        $('.banner-arrow').show();
    }).mouseleave(function(){
        $('.banner-arrow').hide();
    });
    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });

    //楼层菜单切换
    //1 
    $('.dian .floor-title').on('click',".floor1-title",function(){
        $(this).addClass("current1").siblings().removeClass("current1");
        var i = $(this).index();
        $('.dian .floor-con:eq('+i+')').addClass("disply1").siblings().removeClass("disply1");
    });
    //2
    $('.jia .floor-title').on('click',".floor2-title",function(){
        $(this).addClass("current2").siblings().removeClass("current2");
        var i = $(this).index();
        $('.jia .floor-con:eq('+i+')').addClass("disply2").siblings().removeClass("disply2");
    });
    //3
    $('.fu .floor-title').on('click',".floor3-title",function(){
        $(this).addClass("current3").siblings().removeClass("current3");
        var i = $(this).index();
        $('.fu .floor-con:eq('+i+')').addClass("disply3").siblings().removeClass("disply3");
    });
    //4
    $('.mei .floor-title').on('click',".floor4-title",function(){
        $(this).addClass("current4").siblings().removeClass("current4");
        var i = $(this).index();
        $('.mei .floor-con:eq('+i+')').addClass("disply4").siblings().removeClass("disply4");
    });
    //5
    $('.end .floor-title').on('click',".floor5-title",function(){
        $(this).addClass("current5").siblings().removeClass("current5");
        var i = $(this).index();
        $('.end .floor-con:eq('+i+')').addClass("disply5").siblings().removeClass("disply5");
    });
    // 展示默认背景
    var num = 0;
    var $subbnav = $(".subnav");
    var $sideBarMenu = $(".subnav li");
    $sideBarMenu.each(function (index, ele) {
        num = index * 55;
        $(ele).css("background-position", "0 -"+num + "px");
    });

    var TOP = 0;
    // 滚动效果
    $(window).scroll(function () {
        TOP = $(document).scrollTop();

        if(TOP >= $(".mei").offset().top){
            $sideBarMenu.eq(3).addClass("current").siblings().removeClass();
        } 
        else if(TOP >= $(".fu").offset().top){
            $sideBarMenu.eq(2).addClass("current").siblings().removeClass();
        } 
        else if(TOP >= $(".jia").offset().top){
            $sideBarMenu.eq(1).addClass("current").siblings().removeClass();
        } 
        else if(TOP >= $(".dian").offset().top){
            $sideBarMenu.eq(0).addClass("current").siblings().removeClass();
        } 
        else if(TOP > 20){
            $subbnav.fadeIn();
        }
        else{
            $subbnav.fadeOut();
        }
    });

    $sideBarMenu.click(function () {
        $("html,body").stop().animate({
            // 给具有相同效果的元素添加 共同的样式 jd
            "scrollTop" : $(".tj").eq($(this).index()).offset().top
        },1000);
    });

    $(".aback").click(function () {
        //$(document).scrollTop(0);
        $("html,body").animate({"scrollTop":0},300); // html,body ?
    });
});
