/**
 * Created by humorHan on 2016/5/27.
 */
var util = require('util/util');
var commentTpl = require('homework-comment-tpl');

var comment = {
    init: function(){
        $(".header").find(".course-name").html(util.getQueryString('stage-subject-name'));
        this.requestComment();
    },
    requestComment: function(){
        var tThis = this;
        $.ajax({
            type:'post',
            url: util.getApiUrl('HomeSchoolContact/LerningPath/HomeworkInfo'),
            data: {
                AppID: sessionStorage.appid,
                OpenID: sessionStorage.openid,
                workId: util.getQueryString('homework-id')
            },
            dataType:'json',
            success: function(dt){
                util.checkBind(dt);
                var data = dt.N;
                $(".header").find(".homework-name").html(data.WorkName);
                $(".comment-content").html(commentTpl(data));
                tThis.initBtns(data.HomeworkStatus);
            }
        });
    },
    initBtns: function(status){
        //查看试题
        $('.handler').bind('touchend', function(){
            location.href = encodeURI('./search-homework-subject.html' + '?stage-subject-name=' + $(".course-name").html() + '&homework-id=' + util.getQueryString("homework-id") + '&homework-status=' + status);
        });
    }
};
$(function(){
    comment.init();
});