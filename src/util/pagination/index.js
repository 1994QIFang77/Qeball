
'use strict';
require('./index.css');
require('page/common/nav/index.js');
var templatePagination  = require('./index.string');
var _mm = require('util/feb-util.js');

var Pagination = function(){
    var _this = this;
    this.defaultOption = {
        container: null,
        pageNum  : 1,
        pageRange: 3,//在组件上向前和向后显示几页
        onSelectPage : null
    };
    // 事件的处理
    $(document).on('click', '.pg-item', function(){
        var $this = $(this);
        // 对于active和disabled按钮点击，不做处理
        if($this.hasClass('active') || $this.hasClass('disabled')){
            return;
        }
        typeof _this.option.onSelectPage === 'function' 
            ? _this.option.onSelectPage($this.data('value')) : null;
    });
};
// 渲染分页组件
Pagination.prototype.render = function(userOption){
    // 合并选项
    this.option = $.extend({}, this.defaultOption, userOption);
    // 判断容器是否为合法的jquery对象
    if(!(this.option.container instanceof jQuery)){
        return;
    }
    // 判断是否只有1页
    if(this.option.pages <= 1){
        return;
    }
    // 渲染分页内容
    this.option.container.html(this.getPaginationHtml());
};

// 获取分页的html, |上一页| 2 3 4 =5= 6 7 8|下一页|  5/9
Pagination.prototype.getPaginationHtml = function(){
    var html= '',
        option = this.option,
        pageArray = [],
        //start = 当前页码号（5） - 向前向后要显示的页数（3） = 2>0 ->2 3 4 
        start = option.pageNum - option.pageRange > 0  ? option.pageNum - option.pageRange : 1,
        //end = 当前的页码号（5） + 向前向后要显示的页数（3） = 8<9 ->6 7 8
        end  = option.pageNum + option.pageRange < option.pages ? option.pageNum + option.pageRange : option.pages;
  
    // 上一页按钮的数据
    pageArray.push({
        name : '上一页',
        value : this.option.prePage,//前一页的页码
        disabled : !this.option.hasPreviousPage//是不是有前一页，当前是第一页时候就是false了
    });
    // 数字按钮的处理
    for(var i = start; i <= end; i++){
        pageArray.push({
            name : i,
            value : i,//this.option.prePage
            active : (i === option.pageNum)//使当前页有active样式
        });
    };
    // 下一页按钮的数据
    pageArray.push({
        name : '下一页',
        value : this.option.nextPage,
        disabled : !this.option.hasNextPage
    });
    //渲染
    html = _mm.renderHtml(templatePagination, {
        pageArray : pageArray,
        pageNum : option.pageNum,
        pages : option.pages
    });
    return html;
};

module.exports = Pagination;