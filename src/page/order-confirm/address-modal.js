
'use strict';
var _mm = require('util/feb-util.js');
var _cities = require('util/cities/index.js');//城市二级联动
var _address = require('service/address-service.js');
var templateAddressModal = require('./address-modal.string');

var addressModal = {
    show : function(option){
        //option的绑定
       this.option = option;
       this.option.data = option.data || {};
       this.$modalWrap = $('.modal-wrap');
       //渲染页面（地址的弹窗界面）
       this.loadModal();
       //绑定事件
       this.bindEvent();
    },
    bindEvent : function(){
        var that = this;
        //省份和城市的二级联动
        this.$modalWrap.find('#receiver-province').change(function(){
            var selectedProvince = $(this).val();
            that.loadCities(selectedProvince);
        });
        //提交收货地址
        this.$modalWrap.find('.address-btn').click(function(){
            var receiverInfo = that.getReceiverInfo();
            var isUpdate = that.option.isUpdate;//用来区分是添加还是编辑
            //添加 使用新地址，且验证通过（前端语法验证）
            if(!isUpdate && receiverInfo.status){
                //提交给后端
                _address.save(receiverInfo.data,function(res){
                    _mm.successTips('地址添加成功');
                    that.hide();
                    typeof that.option.onSuccess === 'function' && that.option.onSuccess(res);
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            //编辑地址，且验证通过（前端语法验证）
            else if(isUpdate && receiverInfo.status){
                _address.update(receiverInfo.data,function(res){
                    _mm.successTips('地址修改成功');
                    that.hide();
                    typeof that.option.onSuccess === 'function' && that.option.onSuccess(res);
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            //验证不通过（前端语法验证）
            else{
                _mm.errorTips(receiverInfo.errMsg || '好像哪里不对了~');
            }
        });
        //保证点击modal内容区的时候，不关闭弹窗（阻止事件冒泡）
        this.$modalWrap.find('.modal-container').click(function(e){
           e.stopPropagation();
        });
        
        //关闭弹窗（点击x，或者是是点击modal区域外部）
        // this.$modalWrap.find('.close').click(function(){
        //     that.hide();
        // });
        $('.close').click(function(e){
            that.hide();
        });
    },
    loadModal : function(){
        var addressModalHtml = _mm.renderHtml(templateAddressModal,{
            //????? 这么写的原因是为了编辑时，回填
             isUpdate : this.option.isUpdate,
             data  : this.option.data
        });
        this.$modalWrap.html(addressModalHtml);
        //加载省份
        this.loadProvince();
        
    },
    //加载省份信息
    loadProvince : function(){
        var provinces = _cities.getProvinces() || [];
        var $provinceSelect = this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
        //如果的更新地址（编辑），并且有省份信息，做省份的回填
        if(this.option.isUpdate && this.option.data.receiverProvince){//编辑时，地址回填
            $provinceSelect.val(this.option.data.receiverProvince);
            //加载城市
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    //加载城市信息
    loadCities : function(provinceName){
        var cities = _cities.getCities(provinceName) || [];
        var $citySelect = this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));

        //如果的更新地址（编辑），并且有城市信息，做城市的回填
        if(this.option.isUpdate && this.option.data.receiverCity){//编辑时，地址回填
            $citySelect.val(this.option.data.receiverCity);
        }
    },
    // 获取表单里收件人信息，并做表单的验证
    getReceiverInfo : function(){
        var receiverInfo = {},
            result = {
                status : false
            };
        receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = this.$modalWrap.find('#receiver-province').val();
        receiverInfo.receiverCity = this.$modalWrap.find('#receiver-city').val();
        receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val());
        
        if(this.option.isUpdate){//表单编辑，提交
            receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
        }
        // 表单验证
        if(!receiverInfo.receiverName){
            result.errMsg = '请输入收件人姓名';
        }
        else if(!receiverInfo.receiverProvince){
            result.errMsg = '请选择收件人所在省份';
        }
        else if(!receiverInfo.receiverCity){
            result.errMsg = '请选择收件人所在城市';
        }
        else if(!receiverInfo.receiverAddress){
            result.errMsg = '请输入收件人详细地址';
        }
        else if(!receiverInfo.receiverPhone){
            result.errMsg = '请输入收件人手机号';
        }
        // 所有验证都通过了
        else{
            result.status   = true;
            result.data     = receiverInfo;
        }
        return result;
    },
    //获取select框的选项，输入：array 输出：html
    getSelectOption : function(optionArray){
        var html = '<option value="">请选择</option>';
        for(var i = 0, length = optionArray.length; i < length; i++){
            html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>';
        }
        return html;
    },
    hide : function(){
        this.$modalWrap.empty();
    }
};

module.exports = addressModal;