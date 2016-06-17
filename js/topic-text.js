/**
 * Created by Administrator on 2016/5/25.
 */
    var noData = require('component/no-data/no-data');
    require("template-helper.js");
    var mockSelect = require('component/mock-select/mock-select.js');
    var  w=require('util/util');
    w.go_menu('topic-Box');
    var ur= w.getApiUrl('HomeSchoolContact/LerningPath/GetWrongQuesDataByUserid');
    var ulke= w.getApiUrl('HomeSchoolContact/LerningPath/GetSubjectGradeListHomeWork');
    var topicBody=require("topic-text.tpl");
    var explainQues=require("explainQuestion.tpl");
    var firstTopic=require("footer_first_topic.tpl");
    var last=require("last.tpl");
    var centerTopic=require("footer_center_topic.tpl");
    var appid="";
    var openid="";
    var CurrentSubject,CurrentBigGrade;
    appid=sessionStorage.getItem('appid');
    openid=sessionStorage.getItem('openid');
    var id={
    "AppID":appid,
    "OpenID":openid,
    };
   select();
   function select() {
       $.ajax({
           type: "post",
           url: ulke,
           data: id,
           dataType: "json",
           success: function (data) {
               w.checkBind(data);
               if(data.N.length==0){
                   $(".main").removeClass("bg-white");
                   noData.init('topicBox',"暂无报名科目");
                   return false;
               };
               if (data.OK) {
                   var data = {
                       data: data.N
                   };
                   $.each(data.data,function(i, item){
                       item.id = item.GradeID + ',' + item.SubjectID;
                       item.name = item.GradeName + item.SubjectName;
                       $("#left-select").html(item.name);
                   });
                   //请求下拉列表框
                   mockSelect('left-select', data, function(ids){
                       var arrTemp = ids.split(',');
                       CurrentBigGrade = arrTemp[0];
                       CurrentSubject = arrTemp[1];
                       $(".main").removeClass("bg-white");
                       $("#footer").html("");
                       $(".main").html("");
                       $("#main-text").html("");
                       $("#main-answer").html("");
                       $("#header-num-sum").html(0);
                       $("#text-now-num").html(0);
                       index=1;
                       wrongNum();
                   },function(){
                       //wrongNum();
                   },'option-box');
               }
           },
           error: function (xhr, type) {}
       });
   }
//请求显示错题总数和题干
   var index =1;
   function  wrongNum(num){
        var kemuparames={
           "AppID":appid,
           "OpenID": openid,
           "Index": num || 1 ,
           "CurrentSubject":CurrentSubject,
            "bgrade":CurrentBigGrade
        };
        $.ajax({
            type:"post",
            url:ur,
            data:kemuparames,
            dataType:"json",
            success:function(data){
                w.checkBind(data);
                if(data.OK){
                    $(".main").addClass("bg-white");
                    if(!data.N){
                        $(".main").removeClass("bg-white");
                        noData.init('main',"暂无错题信息");
                        return false;
                    }
                    var typeSbject=data.QuestionType;
                    var total=data.N.QuestionCount;
                    var note=data.N.NoteContent;
                    var user=data.N.UserResult;
                    var rAnswer=data.N.RightAnswer;
                    var uAnswer=data.N.UserAnswer;
                    var explain=data.N.QuestionAnalsis;
                    data.N.index = index;
                    change(index);
                    var qbody='<div class="main-text box-padding-top"  id="main-text">'+topicBody(data.N)+'</div>';
                    var qexplain='<div class="main-answer box-padding-top box-padding-bottom "  id="main-answer">'+explainQues(data.N)+'</div>'
                    $(".main").html(qbody);
                    $(".main").append(qexplain);
                    $(".subAnswer-style").find("img").css("max-width", "100%");
                    initq();
                    $("#score").hide();
                    $("#header-num-sum").html(total);
                    $("#text-now-num").html(index);
                    $(".score").hide();
                    $("img").css("max-width","100%");
                    w.initMathJaxObj('topic-Box');
                   function change(index){
                      if(index==1&&total==1){
                           $("#footer").html();
                       }
                      else if(index==1){
                          $("#footer").html(firstTopic(data.N));
                          rightTopic();
                      }
                      else if(index > 1 && index <total){
                          $("#footer").html(centerTopic(data.N));
                          rightTopic();
                          leftTopic();
                      }
                      else if(index >= total){
                          $("#footer").html(last(data.N));
                          leftTopic();
                      }
                   }
                  function  leftTopic(){
                      $("#leftText").click(function(){
                           index--;
                           wrongNum(index);
                           $("#text-now-num").html(index);
                           change(index);
                           return index;
                      })
                  }
                  function rightTopic(){
                      $("#rightText").click(function(){
                          index++;
                          wrongNum(index);
                          $("#text-now-num").html(index);
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
            error: function(xhr, type){}
        });
    }
//处理试题样式
function initq(){
    var winH = parseFloat(document.body.clientWidth)-30;
    var scale = winH / 650;
    var $img = $(".subAnswer-style").find("img");
    var tb = document.getElementsByTagName('table');
    for (var i = 0; i < tb.length ; i++) {
        if (tb[i].offsetWidth >= winH) {
            tb[i].style.width="100%";
           /* var img=tb[i].find("img");
             var w=parseInt(img.width());
             if(w>=70){
             img.style.zoom="0.7";
             }*/
          /*  var img=tb[i].find("img");
            img.style.


            zoom="0.5";*/
        }
    }
    for (var j = 0, len2 = $img.length; j < len2; j++) {
        if ($img.eq(j).width() >= winH) {
            $img.eq(j).width("100%");
        }
    }
}
