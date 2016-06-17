$(function () {
    var home = require("util/util");
    var nodedata=require('component/no-data/no-data.js');
    //nodedata.init('main','对不起，数据暂时未加载');
    var todyurl = home.getApiUrl('HomeSchoolContact/TodayStudyStatus/GetTodayStudyStatusList');
     //得打AppID和openid
    var appid = sessionStorage.getItem('appid');
    var openid = sessionStorage.getItem('openid');

    //书写数组存储对应类的id
    var speak = [];
    var homework = [];
    var module = [];
    var newwork = [];
    //请求数据
    $.ajax({
        type: 'post',
        async: false,
        url: todyurl,
        // data to be added to query string:
        data: {AppID: appid, openID: openid},
        // type of data we are expecting in return:
        dataType: 'json',
        success: function (data) {
            if (data.N.HaveClassAlertList.length == 0 && data.N.SubmitHomeWorkAlertList.length == 0 && data.N.NewTeachPlanAlertList.length == 0 && data.N.NewHomeWorkAlertList.length == 0) {
                nodedata.init('main','暂无数据');
             }

         //开课提醒的数据
            var datta = data.N.HaveClassAlertList;
            //交作业提醒的数据
            var datta1 =data.N.SubmitHomeWorkAlertList;
           
            //学案提醒的数据
            var datta2 =data.N.NewTeachPlanAlertList;
            //新作业提醒的数据
            var datta3 =data.N.NewHomeWorkAlertList;
            //获得时间截取的函数
            var start='';
            var end='';
            //设置得到的时间的变量
            var gotTime='';
            //得到今天的时间的变量
            var nowTime='';
            function mytime(val,style){
                var string= (val.dateTimes).match((/(\d)+/));
                start= home.dateFormat(+string[0],style );//'hh:mm'
                var string1 = (val.endDateTime).match((/(\d)+/));
                end= home.dateFormat(+string1[0],style);// 'hh:mm'
                nowTimes=home.dateFormat(+string[0],'dd');
            }
            //nowTimes=home.dateFormat(+new Date()+24*60*60*1000,'dd')
            //书写一个进行时间比较的函数
          var comparetime=function(gettime){
               gotTime=home.dateFormat(+new Date(),'dd');
                var valtime=parseInt(gettime)-parseInt(gotTime);
                if(valtime==0){
                   return  '今天';
                }else if(valtime==1){
                   return '明天';
                }else{
                    return '日期有误';
                }
            }
            var str = '';
            var str1 = '';
            var str2 = '';
            var str3 = '';
            //开讲了
            $.each(datta,function(i,val) {
                speak.push(val.id);
                mytime(val,'hh:mm');
                var stageName = home.getStageStr(val.bgrade);
                var courseName = home.getSubjectName(val.subject);
                str += '<div class="part speak '+val.id+'" id="'+val.id+'"><img src="../bundle/img/detail_03.png" width="31" height="34"><span class="title">开讲啦</span><p>您好:<span class="first_span">' + val.userName + '</span>今天有课，快提醒他上课吧~</p><hr /><p  class="detailed"><span class="subject">' + stageName + '' + courseName + '</span><span>(第'+ val.extendNum + '次)</span><span class="datatime">' + start+ '~' + end+ '</span></p></div>'
             })
            $('.main').append(str);
            //快交作业了

            $.each(datta1,function(i,val) {
                homework.push(val.id);
                mytime(val,'hh:mm');
                comparetime(nowTimes);
                var stageName = home.getStageStr(val.bgrade);
                var courseName = home.getSubjectName(val.subject);
                str1 += '<div class="part homework '+val.id+'" id="'+val.id+'"><img src="../bundle/img/detail_06.png" width="31" height="34"><span class="title">快交作业啦</span><p>您好:<span class="first_span">' +val.userName + '</span>还有未交作业，快督促他交作业吧~</p><hr /><p  class="detailed"><span class="subject">' + stageName + '' + courseName + '</span><span class="datatime">截止&nbsp;&nbsp;<span>'+comparetime(nowTimes)+'</span>&nbsp;' +start+ '</span></span></p></div>'
             })

            $('.main').append(str1);
            //新学案
            $.each(datta2,function(i,val){
                module.push(val.id);
                mytime(val,'MM:dd:hh:mm');
                var mouth=parseInt(start.slice(0,2));
                var day=parseInt(start.slice(3,5));
                var date=start.slice(6);
                var stageName = home.getStageStr(val.bgrade);
                var courseName = home.getSubjectName(val.subject);
                str2 += '<div class="part module '+val.id+'" id="'+val.id+'"><img src="../bundle/img/detail_09.png" width="31" height="34"><span class="title">收到一份新学案</span><p>您好:老师发布了新学案，快提醒<span class="first_span">' +val.userName + '</span>预习吧</p><hr /><p  class="detailed"><span class="subject">' + stageName + '' + courseName + '</span>(第<span>' +val.extendNum + '</span>次)<span class="datatime">上课&nbsp;&nbsp&nbsp;<span class="time">' +mouth+ '月' +day+ '日&nbsp;' +date+ '</span></span></p></div>'
            })
            //新作业
            $('.main').append(str2);
            $.each(datta3,function(i,val){
                newwork.push(val.id);
                mytime(val,'MM:dd:hh:mm');
                var mouth=parseInt(start.slice(0,2));
                var day=parseInt(start.slice(3,5));
                var date=start.slice(6);
                var stageName = home.getStageStr(val.bgrade);
                var courseName = home.getSubjectName(val.subject);
                str3 += '<div class="part newwork '+val.id+'" id="'+val.id+'"><img src="../bundle/img/detail.png" width="31" height="34"><span class="title">收到一份新作业</span><p>您好:老师布置了新作业，快督促<span class="first_span">' +val.userName + '</span>作答吧~</p><hr /><p  class="detailed"><span class="subject">' + stageName + '' + courseName + '</span><span class="datatime">截止&nbsp;&nbsp;&nbsp;<span>' +mouth+ '月' +day+ '日&nbsp;' +date+ '</span></span></p></div>';
            })
            $('.main').append(str3);
        },
        error: function (xhr, type) {
        }
    });

    //将一个将时间存到localStrong里面存储过期时间进行数据清除
    //+24*60*60*1000
    var today=home.dateFormat(+new Date(),'MM dd')
   //wsCache.set('limitTime',1, {exp :new Date(limitTime)});
    if(localStorage.getItem('limitTime')!=today){
        localStorage.clear();
    }
    localStorage.setItem('limitTime',home.dateFormat(+new Date(),'MM dd'));
    //书写一个得到url地址的函数
    function geturl(oriurl,key,val){
       location.href=oriurl+'?'+key+'='+val;
    }
    var typestr = ['speak', 'homework', 'module', 'newwork'];
    var typeval = [speak, homework, module, newwork];
    var typeclass = ['.speak', '.homework', '.module', '.newwork'];
    //clas代表选择器的类目typeclass
    //val代表数组typeval
    //str代表标识的变量typestr
    function readed(clas, va, str) {
        //得到所有的存储数据循环便利所有的数值，如果点击之后将信息设置成已读
        function already(){
            for(var i=0;i<localStorage.length;i++){
                var name=localStorage.key(i);
                var value=localStorage.getItem(name);
                for (var j = 0; j < va.length; j++) {
                   //得到元素的id
                    var myId=$(clas).eq(j).attr('id');
                    if (myId==value&&name.indexOf(clas)>-1){
                       var myclas=$(clas)
                        $.each(myclas,function(){
                            if($(this).hasClass(myId)){
                                $(this).css('background','#EBEBEB')
                            }
                        })

                    }
                }
            }
        }
        already();
        $('.main').on('tap',clas,function (){
             //得到当前元素相对于原先集合的位置
            var num=$(clas).index($(this));
            //对work数组进行循环对当前点击的元素设置一个localStorage数值
            for (var i = 0; i < va.length; i++){
                if (num == i){
                    localStorage.setItem(clas + va[i], va[i]);
                }
            }
           $(this).css('background','#EBEBEB');
            //得到点击对象的id的值函数点击的时候跳转页面
              var id=$(this).attr('id');
               switch (clas)
                {
                    case '.homework':
                        var url="today-work.html";
                        geturl(url,'workid',id);
                        break;
                    case '.newwork':
                        var url="today-work.html";
                        geturl(url,'workid',id);
                        break;
                    case '.module':
                        var url="prepare.html";
                        geturl(url,'workid',id);
                        break;
                    case '.speak':
                        var url="prepare.html";
                        geturl(url,'workid',id);
                        break;
                }
        });
 }
    //循环遍历上面的函数
    for (var i = 0; i < 4; i++) {
        (function(i){
            readed(typeclass[i], typeval[i], typestr[i]);
        })(i)
    }
});




