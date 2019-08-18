

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/feb-util.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
    data : {
            productId: _mm.getUrlParam('productId') || ''
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        if(!this.data.productId){
            //   _mm.goHome();//如果没有传productId，就自动跳回首页
        }
        this.loadDetail();
    },
    bindEvent : function(){
       var that = this;
       $(document).on('mouseenter','.p-img-item',function(){
           var imageUrl = $(this).find('.p-img').attr('src');
           $('.main-img').attr('src',imageUrl);
       });
       //count操作，数量
       $(document).on('click','.p-count-btn',function(){
            var type = $(this).hasClass('plus')?'plus':'minus';
            var $pCount = $('.p-count');
            var currCount = parseInt($pCount.val());//加减计算用
            var minCount = 1 , maxCount = that.data.detailInfo.stock || 1;
            if(type == 'plus'){
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCoun);//点击数量加按钮，如果没超过库存就加1，否则就是库存数
            }
            else if(type == 'minus'){
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
       
                //加入购物车按钮
        $(document).on('click','.cart-add',function(){
            if(that.data.detailInfo.stock>0){
                _cart.addToCart({
                    productId : that.data.productId,//商品id
                    count  : $('.p-count').val()   //数量
                },function(res){
                    //存在bug，当库存为0的时候，居然还可以提交
                    //修改：判断库存数量，当为0 的时候，按钮设置不可用，btn.disabled=‘disabled’
                    window.location.href = './result.html?type=cart-add';   
                },function(errMsg){
                    _mm.errorTips(errMsg)
                });
            }
            else{
                alert("库存不够");
            }
         });
    },
    // 加载商品详情的数据
// 加载商品详情的数据
loadDetail : function(){
    var that = this,
        html = '',
        $pageWrap = $('.page-wrap');
    // loading
    $pageWrap.html('<div class="loading"></div>');
    // 请求detail信息
    _product.getProductDetail(this.data.productId, function(res){
        that.filter(res);
        // 缓存住detail的数据
        that.data.detailInfo = res;
        // render
        html = _mm.renderHtml(templateIndex, res);
        $pageWrap.html(html);
    }, function(errMsg){
        $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>');
    });
},
// 数据匹配(数据过滤)
    filter : function(data){
    data.subImages = data.subImages.split(',');
    }
};
$(function(){
    page.init();
})