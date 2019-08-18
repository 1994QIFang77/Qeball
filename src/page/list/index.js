
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/feb-util.js');
var _product        = require('service/product-service.js');
 var Pagination      = require('util/pagination/index.js');
var templateIndex   = require('./index.string');

var page = {
    data : {
        listParam : {
            keyword : _mm.getUrlParam('keyword')    || '',
            categoryId : _mm.getUrlParam('categoryId') || '',
            orderBy : _mm.getUrlParam('orderBy')    || 'default',//排序
            pageNum : _mm.getUrlParam('pageNum')    || 1,//当前页码号
            pageSize : _mm.getUrlParam('pageSize')   || 20//表一页最多可以装几条数据（容量）
        }
    },

    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadList();
    },
    
    bindEvent : function(){
        var that = this;
        // 排序的点击事件
        $('.sort-item').click(function(){
            var $this = $(this);
            that.data.listParam.pageNum = 1;
            // 点击默认排序
            if($this.data('type') === 'default'){
                // 已经是active样式
                if($this.hasClass('active')) {
                    return;
                }
                // 其他
                else{
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    that.data.listParam.orderBy = 'default';
                }
            }
            // 点击价格排序
            else if($this.data('type') === 'price'){
                // active class 的处理
                $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                // 升序、降序的处理
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');//样式
                    that.data.listParam.orderBy = 'price_asc';
                }else{
                    $this.addClass('desc').removeClass('asc');
                    that.data.listParam.orderBy = 'price_desc';
                }
            }
            // 重新加载列表
            that.loadList();
        });
    },
    // 加载list数据
    loadList : function(){
        var that = this,
            listHtml = '',
            listParam = this.data.listParam,
            $pListCon = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId 
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _product.getProductList(listParam, function(res){
            listHtml = _mm.renderHtml(templateIndex, {
                list :  res.list
            });
            $pListCon.html(listHtml);
            that.loadPagination({
                hasPreviousPage : res.hasPreviousPage,//是不是有前一页，当前是第一页时候就是false了
                prePage : res.prePage, //前一页的页码
                hasNextPage : res.hasNextPage,//是不是有后一页，当前是最后一页时候就是false了
                nextPage : res.nextPage,// 后一页的页码
                pageNum : res.pageNum, // 当前页码号
                pages : res.pages // 总共有多少页
            });
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    },
    // 加载分页信息
    loadPagination : function(pageInfo){
        var that = this;
        //使用this，代表整个page都可以调用
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                that.data.listParam.pageNum = pageNum;
                that.loadList();
            }
        }));
    }
};
$(function(){
    page.init();
})