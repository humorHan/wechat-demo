/**
 * Created by humorHan on 2016/5/24.
 */
var mockSelect = require('component/mock-select/mock-select.js');
var util = require('util/util');
require('template-helper');
var noData = require('component/no-data/no-data.js');
var homeworkListTpl = require('homework-list-tpl');

var params = {
    AppID: sessionStorage.appid,
    OpenID: sessionStorage.openid
};

var isCourseReady = false, isTypeReady = false;
var userSujectId, statusId, pageIndex = 1, pageSize = 10;
var homeworkList = {
    init: function(){
        util.go_menu('wrapper');
        this.initCourse();
        this.initType();
        this.initBtns();
    },
    initCourse: function(){
        var tThis = this;
        $.ajax({
            type: 'post',
            url: util.getApiUrl('HomeSchoolContact/Registration/GetRegistrationDropDownList'),
            data: params,
            dataType: 'json',
            success: function(dt) {
                util.checkBind(dt);
                //没有科目显示无数据
                if (dt.N.length == 0) {
                    noData.init("wrapper", '暂无作业信息~');
                    return false;
                }
                //处理数据
                var data = {
                    data: dt.N
                };
                $.each(data.data, function (i, item) {
                    item.id = item.userSujectId;
                    item.name = util.getStageStr(item.bgrade) + util.getSubjectName(item.subjectId) + (item.orderNum > 0 ? +item.orderNum : '')
                });
                mockSelect('course', data, function (id) {
                    //console.log('你需要的id集合: ' + ids);
                    userSujectId = id;
                }, function () {
                    //页面回调
                    pageIndex = 1;
                    tThis.list();
                }, 'course-option', function (flag) {
                    if (flag) {
                        isCourseReady = true;
                        tThis.list();
                    }
                });
            }
        });
    },
    initType: function(){
        var tThis = this;
        $.ajax({
            type: 'post',
            url: util.getApiUrl('HomeSchoolContact/LerningPath/WorkStatusList'),
            data: params,
            dataType:'json',
            success:function(dt) {
                util.checkBind(dt);
                //处理数据
                var data = {
                    data: dt
                };
                //console.log(data);
                $.each(data.data,function(i, item){
                    //console.log(item);
                    item.id = item.StausId;
                    item.name = item.StausName
                });
                mockSelect('type', data, function(id){
                    //console.log('homeworkId: ' + id);
                    statusId = id;
                },function(){
                    //console.log('筛选类型回调');
                    pageIndex = 1;
                    tThis.list();
                },'type-option', function(flag){
                    if (flag) {
                        isTypeReady = true;
                        tThis.list();
                    }
                });
            }
        });
    },
    list: function(num, isScroll){
        var tThis = this;
        if (isCourseReady && isTypeReady) {
            //console.log(num);
            $.ajax({
                type: 'post',
                url: util.getApiUrl('HomeSchoolContact/LerningPath/HomeworkList'),
                data: {
                    AppID: sessionStorage.appid,
                    OpenID: sessionStorage.openid,
                    CourseID: userSujectId,
                    pageSize: pageSize,
                    pageIndex: num || pageIndex,
                    statusIds: statusId
                },
                dataType: 'json',
                success: function(data) {
                    util.checkBind(data);
                    var isListNull = data.N.HomeworkList;
                    if (isScroll == true) {
                        if (isListNull.length == 0 && $(".homework-item").length == 0) {
                            noData.init('homework-lists', '暂无作业信息~');
                            return false;
                        }
                        $(".homework-lists").append(homeworkListTpl(data.N.HomeworkList));
                    } else {
                        if (isListNull.length == 0) {
                            noData.init('homework-lists', '暂无作业信息~');
                            return false;
                        }
                        $(".homework-lists").html(homeworkListTpl(data.N.HomeworkList));
                    }
                }
            });
        }
    },
    initBtns: function(){
        var tThis = this;
        window.onscroll = function(){
            var scrollTop = $(window).scrollTop();
            var scrollHeight = $(document).height();
            var windowHeight = $(window).height();
            if (scrollTop + windowHeight == scrollHeight) {
                tThis.list(++pageIndex, true);
            }
        };
        //跳转到作业评语
        $('.homework-lists').delegate('.homework-item.click', 'tap', function(){
            location.href = encodeURI('./homework-comment.html?homework-id=' + $(this).attr("data-homework-id") + '&stage-subject-name=' + $(".mock-select").find(".name").html());
        });
    }
};
$(function(){
    homeworkList.init();
});