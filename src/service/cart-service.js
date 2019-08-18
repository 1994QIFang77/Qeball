
'use strict';
var _mm = require('util/feb-util.js');

var _cart = {
    //获取购物车数量 nav.html
    getCartCount: function(resolve, reject){
        _mm.request({//
            url: _mm.getServerUrl('/cart/get_cart_product_count.do'),// 获取地址
            success: resolve,
            error: reject    
        });
    },
    // 添加到购物车 detail.html(商品详细页)
    addToCart : function(productInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/add.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    //获取购物车列表 cart.html
    getCartList: function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/cart/list.do'),// 获取地址
            success: resolve,
            error: reject    
        });
    },
    //选中购物车商品 cart.html
    selectProduct : function(productId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/select.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
     //取消选中购物车商品 cart.html
     unselectProduct : function(productId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 全选 选中全部商品  cart.html
    selectAllProduct : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // 取消全选 选中全部商品  cart.html
    unselectAllProduct : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // 更新购物车商品数量 cart.html
    updateProduct : function(productInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/update.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
     // 删除指定商品
    deleteProduct : function(productIds, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/delete_product.do'),
            data    : {
                productIds : productIds
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports =_cart;