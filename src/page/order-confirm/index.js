


'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm = require('util/feb-util.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');
var addressModal = require('./address-modal.js');

var page = {
    data : {
        selectedAddressId : null 
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){//加载
        this.loadAddressList();//地址列表
        this.loadProductList();//订单信息
    },
    bindEvent : function(){
       var that = this;
       //地址的选择
       $(document).on('click','.address-item',function(){
        $(this).addClass('active').siblings('.address-item').removeClass('active');
        that.data.selectedAddressId = $(this).data('id');

       });
       //订单的提交
       $(document).on('click','.order-submit',function(){
            //先要判断地址是否存在
            var shippingId = that.data.selectedAddressId;
            if(shippingId){//存在，请求后端，生成订单号
                _order.createOrder({
                    shippingId : shippingId
                },function(res){//成功回调
                    window.location.href = './payment.html?orderNumber=' + res.orderNo ;//跳转到支付页
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }else{
                _mm.errorTips('请选择地址后再提交');
            }
         });
        //地址的添加
        $(document).on('click', '.address-add', function(){
            addressModal.show({
                isUpdate : false,
                onSuccess : function(){
                    that.loadAddressList();//加载地址
                }
            });
        });
        //地址的编辑(从接口读出这一条地址的信息，然后回填到页面上modal)
        $(document).on('click', '.address-update', function(e){
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId,function(res){
                addressModal.show({
                    isUpdate : true,
                    data : res,
                    onSuccess : function(){
                        that.loadAddressList();
                    }
                });
            },function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
        //地址的删除（做一个数据请求，找到要删除地址的id）
        $(document).on('click', '.address-delete', function(e){
            e.stopPropagation();
           var id = $(this).parents('.address-item').data('id');
           if(window.confirm('确认要删除该地址吗？')){
            _address.deleteAddress(id, function(res){
                that.loadAddressList();
            },function(errMsg){
                _mm.errorTips(errMsg);
            });
           }
        });
    },
    // 加载地址列表
    loadAddressList : function(){
        var that = this;
        $('.address-con').html('<div class="loading"></div>');
        // 获取地址列表
        _address.getAddressList(function(res){
            that.addressFilter(res);
            var addressListHtml = _mm.renderHtml(templateAddress, res);
            $('.address-con').html(addressListHtml);
        }, function(errMsg){
            $('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
        })
    },
    //处理地址列表中选中状态
    addressFilter :function(data){
        if(this.data.selectedAddressId){
            var selectedAddressIdFlag = false;
            for(var i=0,length = data.list.length;i<length;i++){
                if(data.list[i].id === this.data.selectedAddressId){
                    data.list[i].isActive = true;
                    selectedAddressIdFlag = true;
                }
            }
            // 如果以前选中的地址不在列表里，将其删除
            if(!selectedAddressIdFlag){
                this.data.selectedAddressId = null;
            }
        }
    },
    // 加载商品清单
    loadProductList : function(){
        var that = this;
        $('.product-con').html('<div class="loading"></div>');
        // 获取地址列表
        _order.getProductList(function(res){
            var productListHtml = _mm.renderHtml(templateProduct, res);
            $('.product-con').html(productListHtml);
        }, function(errMsg){
            $('.product-con').html('<p class="err-tip">商品信息加载失败，请刷新后重试</p>');
        })
    }
};
$(function(){
    page.init();
})