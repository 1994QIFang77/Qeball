
'use strict';
require('./index.css');
var _mm = require('util/feb-util.js');
var templateIndex= require('./index.string');
//侧边导航
var navSide = {
    option : {
        name : '',
        navList : [
            {name : 'user-center', desc : '个人中心', href: './user-center.html'},
            {name : 'order-list', desc : '我的订单', href: './order-list.html'},
            {name : 'user-pass-update', desc : '修改密码', href: './user-pass-update.html'},
            {name : 'about', desc : '关于Qeball', href: './about.html'}
        ]
    },
    init: function (option) {
        //合并，两个参数都是对象
        //this.option是上面那个，option是传进来的
        //使用extend,会使用传进来的option把this.option里面的内容给覆盖掉
        //如果不想被覆盖掉，就 $.extend({},this.option,option);
        //extend是一个浅拷贝，只对第一层的内容生效
        $.extend(this.option,option);//在这里是合并选项，要求覆盖
        this.renderNav();
    },
    //渲染导航菜单
    renderNav: function(){
        //计算active数据(鼠标当前选中的)
        for(var i = 0, iLength = this.option.navList.length; i < iLength; i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;//为当前状态添加active样式
            }
        };
        //渲染list数据
        var navHtml = _mm.renderHtml(templateIndex, {
            navList: this.option.navList
        });
        //把HTML放入容器
        $('.nav-side').html(navHtml);
    }
};

module.exports = navSide;//从外面传进来的init