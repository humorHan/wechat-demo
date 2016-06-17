/**
 * Created by humorHan on 2016/5/20.
 */
require('./css/mock-select.css');
var selectTpl = require('mock-select-tpl');
var selectUlTpl = require('select-ul-tpl');

function mockSelect(dom, data, callbackId, callback, id, callBackFlag){
    this.dom = $("." + dom);
    this.data = data;
    this.callbackId = callbackId;
    this.callback = callback;
    this.id = $("#" + id);
    this.callBackFlag = callBackFlag;
    this.initDom();
    this.initBtns();
}
mockSelect.prototype = {
    initDom: function(){
        this.dom.html(selectTpl(this.data));
        this.id.html(selectUlTpl(this.data));
        this.callbackId(this.dom.find(".name").attr('data-id'));
        if (this.callBackFlag) {
            this.callBackFlag(true);
        } else {
            this.callback();
        }
        var offset = this.dom.offset();
        this.id.find(".mock-ul").css({
            'left': 0,
            'top': offset.top + 42
        });
        this.id.find(".mock-ul").css({
            'max-height': $(window).height() - offset.height - offset.top
        });
    },
    initBtns: function(){
        //点击显示下拉
        var tThis= this;
        this.dom.undelegate().delegate('.name-wrap', 'tap', function(e){
            e.stopPropagation();
            //console.log(tThis.dom);
            if (!(tThis.dom.find('.name-wrap').hasClass('active'))) {
                $(".mock-select").removeClass('active').find(".name-wrap").removeClass('active');
                $(".mock-ul").hide();
                $(this).addClass('active');
                tThis.dom.find(".mock-select").addClass('active');
                tThis.id.find(".mock-ul").show();
            } else {
                $(".mock-ul").hide();
                $(".mock-select").removeClass('active').find(".name-wrap").removeClass('active');
                $(this).removeClass('active');
                tThis.dom.find(".mock-select").removeClass('active');
                tThis.id.find(".mock-ul").hide();
            }
        });
        //下拉消失
        this.id.undelegate().delegate('li', 'tap', function(e){
            e.stopPropagation();
            tThis.id.find("li.active").removeClass("active");
            $(this).addClass("active").find(".right").removeClass("display-none");
            tThis.dom.find('.name-wrap').removeClass('active').find(".name").html($(this).find(".item-name").html()).attr("data-id", $(this).attr("data-id"));
            tThis.dom.find(".mock-select").removeClass('active');
            tThis.id.find(".mock-ul").hide();
            tThis.callbackId(tThis.dom.find(".name").attr('data-id'));
            if (tThis.callback) {
                tThis.callback();
            }
        });
        //下拉消失
        $(document).unbind(".local").bind("tap.local", function(){
            $(".mock-ul").hide();
            $('.name-wrap,.mock-select').removeClass('active');
        });
    }
};
module.exports = function(dom, data, callbackId, callback, id, callBackFlag){
    /**
     * * 模拟下拉框组件
     * 拿到id
     * @param dom       下拉框父级class
     * @param data      下拉数据（处理过的格式为{data: [{id:'',name:''},{},{}]}）,另外注意orderNum > 0 ? +orderNum : ''
     * @param callbackId      通过回调传给个人页面需要的id
     * @param callback        个人页面的回调处理
     * @param id              存放下拉选项的id
     * @param callBackFlag（非必传）  告诉页面模板渲染完了有了id等参数 可以渲染个人页面了
     */
    return new mockSelect(dom, data, callbackId, callback, id, callBackFlag);
};