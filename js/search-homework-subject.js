/**
 * Created by humorHan on 2016/5/30.
 */
var noData = require('component/no-data/no-data.js');
var util = require('util/util');
require('template-helper.js');
var topicBody = require('topic-text.tpl');
var explainQues = require('explainQuestion.tpl');
var handlerTpl = require('handler.tpl');

var _num = 1;
var homeworkStatus = util.getQueryString('homework-status');
var searchHomeworkSubject = {
    init: function(){
        $(".header").find(".course-name").html(util.getQueryString('stage-subject-name'));
        this.render();
        this.initBtns();
    },
    render: function(){
        var tThis = this;
        $.ajax({
            type:'post',
            url: util.getApiUrl('HomeSchoolContact/LerningPath/HomeworkDetailsLP'),
            data: {
                AppID: sessionStorage.appid,
                OpenID: sessionStorage.openid,
                workId: util.getQueryString('homework-id'),
                index: _num
            },
            dataType:'json',
            success: function(dt){
                util.checkBind(dt);
                var data = dt.N;
                data.homeworkStatus = homeworkStatus;
                if (!data) {
                    $(".handler").remove();
                    $(".content-wrapper").addClass('no');
                    noData.init("content-wrapper");
                    return false;
                }
                $(".handler").addClass("click");
                data.num = _num;
                //data.QuestionCount = 21;
                $(".homework-name").html(data.homeWorkName);
                $(".content").html(topicBody(data));
                $(".answer-analysis-note").html(explainQues(data));
                if (homeworkStatus == 2 || homeworkStatus == 3) {
                    $(".user-answer").hide();
                    $(".score").hide();
                    $(".subjective-answer").show();
                }
                $(".handler").html(handlerTpl(data));
                $("img").css("max-width", "100%");
                util.initMathJaxObj("content-wrapper");
                tThis.initq();
            }
        })
    },
    initBtns: function(){
        var tThis = this;
        var $handler = $(".handler");
        //查看评语 上一题 下一题
        $handler.delegate('.homework-comment', 'touchend', function(){
            location.href = encodeURI('./homework-comment.html' + '?stage-subject-name=' + $(".course-name").html() + '&homework-id=' + util.getQueryString("homework-id"));
        }).delegate('.left-btn', 'touchend', function(){
            if ($handler.hasClass("click")) {
                $handler.removeClass("click");
                tThis.render(--_num);
            }
        }).delegate('.right-btn', 'touchend', function(){
            if ($handler.hasClass("click")) {
                $handler.removeClass("click");
                tThis.render(++_num);
            }
        });
    },
    //处理试题样式
    initq: function(){
        var winH = parseFloat(document.body.clientWidth);
        var $tb = $('table');
        //var $img = $(".subAnswer-style").find("img");
        for (var i = 0, len1 = $tb.length; i < len1; i++) {
            if ($tb.eq(i).width() >= winH) {
                $tb.eq(i).width("100%");
            }
        }
        /*for (var j = 0, len2 = $img.length; j < len2; j++) {
            if ($img.eq(j).width() >= winH) {
                $img.eq(j).width("100%");
            }
        }*/
    }
};
$(function(){
    searchHomeworkSubject.init();
});