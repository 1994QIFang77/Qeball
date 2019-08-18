

require('./index.css');
require('page/common/header/index.js');
var nav = require('page/common/nav/index.js');
var _mm = require('util/feb-util.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
    data : {
         
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadCart();
    },
    bindEvent : function(){
       var that = this;
       //商品的选择 / 取消选择
       $(document).on('click','.cart-select',function(){
          var $this = $(this);
          var productId = $this.parents('.cart-table').data('product-id');
          //切换选中状态
          //选中
          if($this.is(':checked')){
            _cart.selectProduct(productId, function(res){
                that.renderCart(res);
            }, function(errMsg){
                that.showCartError();
            });
        }
          //取消选中
        else{
            _cart.unselectProduct(productId, function(res){
                that.renderCart(res);
            }, function(errMsg){
                that.showCartError();
            });
          }
       });

       // 商品的全选 / 取消全选
       $(document).on('click','.cart-select-all',function(){
            var $this = $(this);
            if($this.is(':checked')){
                _cart.selectAllProduct(function(res){
                    that.renderCart(res);
                }, function(errMsg){
                    that.showCartError();
                });
            }
            // 取消全选
            else{
                _cart.unselectAllProduct(function(res){
                    that.renderCart(res);
                }, function(errMsg){
                    that.showCartError();
                });
            }
        });
        //商品数量的变化
        $(document).on('click', '.count-btn', function(){
            var $this = $(this);
            var $pCount = $this.siblings('.count-input');
            var currCount = parseInt($pCount.val());

            var type = $this.hasClass('plus') ? 'plus' : 'minus';
            var productId = $this.parents('.cart-table').data('product-id');
            var minCount = 1;
            var maxCount = parseInt($pCount.data('max'));
            var newCount = 0;
            if(type === 'plus'){
                if(currCount >= maxCount){
                    _mm.errorTips('该商品数量已达到上限');
                    return;
                }
                newCount = currCount+1;
            }
            else if(type === 'minus'){
                if(currCount <= minCount){
                    return;
                }
                newCount = currCount-1;
            }
            // // 更新购物车商品数量
            _cart.updateProduct({
                productId :productId,
                count: newCount
            }, function(res){
               that.renderCart(res);
            }, function(errMsg){
               that.showCartError();
            });
        });
        //删除单个商品
        $(document).on('click', '.cart-delete', function(){
            if(window.confirm('确认要删除该商品？')){
                var productId = $(this).parents('.cart-table')//多个
                    .data('product-id');
                that.deleteCartProduct(productId);
            }
        });
         //删除选中商品
         $(document).on('click', '.delete-selected', function(){
            if(window.confirm('确认要删除选中的商品？')){
                //用一个数组存入将要删除的商品
                var arrProductIds = [];
                $selectedItem = $('.cart-select:checked');
                //循环取商品的ID,存入数组arrProductIds里面去
                for(var i = 0,iLength =  $selectedItem.length;i<iLength;i++)
                {
                    arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                }
                if(arrProductIds.length){
                    that.deleteCartProduct(arrProductIds.join(','));
                }
                else{
                    _mm.errorTips('您还没有选中要删除的商品');
                }   
            }
        });
       // 提交购物车
        $(document).on('click', '.btn-submit', function(){
            // 总价大于0，进行提交
            if(that.data.cartInfo && that.data.cartInfo.cartTotalPrice > 0){
                window.location.href = './order-confirm.html';
            }else{
                _mm.errorTips('请选择商品后再提交');
            }
        });
    },
     // 删除指定商品，支持批量，productId用逗号分割
     deleteCartProduct : function(productIds){
        var that = this;
        _cart.deleteProduct(productIds, function(res){
            that.renderCart(res);
        }, function(errMsg){
            that.showCartError();
        });
    },
    // 加载购物车信息
    loadCart : function(){
        var that = this;
        //获取购物车列表
        _cart.getCartList(function(res){
            that.renderCart(res);
        },function(errMsg){
            that.showCartError();
        })
    },
    //渲染购物车
    renderCart: function(data){
        this.filter(data);
        //缓存购物车信息
        this.data.cartInfo = data;
        //生成HTML
        var cartHtml = _mm.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);
        //通知导航的购物车更新数量(局部刷新)
        nav.loadCartCount();
    },
    // 数据匹配
    filter : function(data){
        data.notEmpty = !!data.cartProductVoList.length;
    },
    // 显示错误信息
    showCartError: function(){
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新试试吧。</p>');
    }
};
$(function(){
    page.init();
})