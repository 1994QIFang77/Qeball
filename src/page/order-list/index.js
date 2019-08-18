

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/feb-util.js');
var _order = require('service/order-service.js');
var Pagination = require('util/pagination/index.js');
var templateIndex = require('./index.string');
 //page 逻辑部分
 var page = {
    data: {
        listParam : {
            pageNum     : 1,
            pageSize    : 10//分页
        }
    },
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        this.loadOrderList();
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
    },
    // 加载订单列表
    loadOrderList: function(){
        var that = this,
            orderListHtml   = '',
            $listCon        = $('.order-list-con');
        $listCon.html('<div class="loading"></div>');
        _order.getOrderList(this.data.listParam, function(res){
            // 渲染html
            orderListHtml = _mm.renderHtml(templateIndex, res);
            $listCon.html(orderListHtml);
            that.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage : res.prePage,
                hasNextPage : res.hasNextPage,
                nextPage : res.nextPage,
                pageNum : res.pageNum,
                pages : res.pages
            });
        }, function(errMsg){
            $listCon.html('<p class="err-tip">加载订单失败，请刷新后重试</p>');
        });
    },
    // 加载分页信息
    loadPagination : function(pageInfo){
        var that = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                that.data.listParam.pageNum = pageNum;
                that.loadOrderList();
            }
        }));
    }
 };
//  JQ入口
 $(function(){
    page.init();
 });