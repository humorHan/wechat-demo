/**
 * Created by Administrator on 2016/5/27.
 */
var appid='',openid='';
var  w=require('util/util');
var noData = require('component/no-data/no-data');
var url= w.getApiUrl("HomeSchoolContact/LerningPath/HomeworkDetailsLP");
var headlineTopic=require("headlineTopic.tpl");
var topicBody=require("homeworkTopic.tpl");
var firstTopic=require("footer_first_topic.tpl");
var lastTopic=require("footer_last_topic.tpl");
var footerOneTopic=require("footer-onetopic.tpl");
var centerTopic=require("footer_center_topic.tpl");
appid=sessionStorage.getItem('appid');
openid=sessionStorage.getItem('openid');
homeworkName();
var index=1;
function homeworkName(num){
    var dataid={
        "OpenID":openid,
        "AppID":appid,
        "index": num ||  1,
        "workId":w.getQueryString("workid")
    };
    $.ajax({
        type:'post',
        url:url,
        dataType:'json',
        data:dataid,
        success:function(data){
            w.checkBind(data);
                if(data.OK){
                    if(data.N.length==0){
                    $(".homeWork_box").removeClass("bg-white");
                    noData.init('homeWork_box');
                    return false;
                };
                var total=1;
                total=data.N.QuestionCount;
                var homeworkname=data.N.homeWorkName;
                var subname=w.getStageStr(data.N.Bgrade)+ w.getSubjectName(data.N.Subjectid);
                $("#subjectName").html(subname);
                data.N.index = index;
                $("#homeworkName").html(homeworkname);
                var headline='<div class="main-topic font-size16 border-bottom" class="headline" >'+headlineTopic(data.N)+'</div>';
                var qbody='<div class="main-answer box-padding-top box-padding-bottom"  id="topicbody" >'+topicBody(data.N)+'</div>';
                $(".main").html(headline);
                $(".main").append(qbody);
                $(".subAnswer-style").find("img").css("max-width", "100%");
                $("img").css("max-width","100%");
                change(index);
                initq();
                w.initMathJaxObj('homeWork_box');
                function change(index) {
                    if(index==1&&total==1){
                        $("#footer").html(footerOneTopic(data.N));
                        backTostydy();
                    }
                    else if (index == 1) {
                        $("#footer").html(firstTopic(data.N));
                        rightTopic();
                    }
                    else if (index > 1 && index < total) {
                        $("#footer").html(centerTopic(data.N));
                        rightTopic();
                        leftTopic();
                    }
                    else if (index >= total) {
                        $("#footer").html(lastTopic(data.N));
                        leftTopic();
                        backTostydy();
                    }
                }
                function  leftTopic(){
                    $("#leftText").click(function(){
                        index--;
                        homeworkName(index);
                        $("#nownum").html(index);
                        change(index);
                        return index;
                    })
                }
                function rightTopic(){
                    $("#rightText").click(function(){
                        index++;
                        homeworkName(index);
                        $("#nownum").html(index);
                        change(index);
                        return index;
                    })
                }
                function backTostydy(){
                    $("#rightText").click(function(){
                        location.href="tody-study.html";
                    })
                }
            }
        },
        error:function(xhr, type){}
    })
}
//处理试题样式
function initq(){
    var winH = parseFloat(document.body.clientWidth) ;
    var scale = winH / 650-30;
    var tb = document.getElementsByTagName('table');
    //if (zoom) {
    for (var i = 0; i < tb.length ; i++) {
        if (tb[i].offsetWidth >= winH) {
            tb[i].style.width="100%";
        }
    }
}

