
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/feb-util.js');
var _payment = require('service/payment-service.js');
var templateIndex = require('./index.string');


// page 逻辑部分
var page = {
    data: {
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init: function(){
         this.onLoad();
    },
    onLoad : function(){
        // 加载detail数据
        this.loadPaymentInfo();
    },
    // 加载订单列表
    loadPaymentInfo: function(){
        var that = this,
            paymentlHtml = '',
            $pageWrap = $('.page-wrap');
            $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(this.data.orderNumber, function(res){
            // 渲染html
            paymentlHtml = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(paymentlHtml);
            that.listenOrderStatus();
        }, function(errMsg){
            $pageWrap.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },
    //监听订单状态
    listenOrderStatus : function(){
        var that = this;
        this.paymentTimer = window.setInterval(function(){
            _payment.getPaymentStatus(that.data.orderNumber, function(res){
                if(res == true){
                    window.location.href 
                        = './result.html?type=payment&orderNumber=' + that.data.orderNumber;
                }
            });
        },5000);
    }
};
$(function(){
    page.init();
});