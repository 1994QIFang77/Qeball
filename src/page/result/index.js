
'use strict';
// require('page/common/nav/index.js');
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/feb-util.js');

//根据url上的数据，来显示相应的操作提醒
$(function(){
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    if(type === 'payment'){
        var orderNumber  = _mm.getUrlParam('orderNumber'),
            $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
    }
    //显示对应的提示元素
    $element.show();//用getUrlParam来获取url上的数据，来表明显示哪一个提醒
});