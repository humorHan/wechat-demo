var sele=require('../dep/component/mock-select/mock-select.js');
var home=require('../dep/util/util');
var nodata=require('../dep/component/no-data/no-data.js');
//生成菜单
home.go_menu('container');
//获取openid appid
var apid='',opid='';
apid=sessionStorage.getItem('appid');
opid=sessionStorage.getItem('openid');

//moban
var mode=require('afterclassjob.tpl');
//请求下拉框数据页面显示
var planid='';
var planindexid='';
$.ajax({
    type:'post',
    url:home.getApiUrl('HomeSchoolContact/LerningPath/GetSubjectGradeListPlanInfo'),
    dataType:'json',
    data:{"OpenID":opid,"AppID":apid},
    success:function(data){
        home.checkBind(data);
        if(!data.N.length){
            nodata.init('container','暂无报名学科');
            return;
        }
        if(data.OK){
            var message={"data":[]};
            if(data.OK){
                for(var i=0;i<data.N.length;i++){

                    message.data[i]={
                        "id":data.N[i].planid,
                        "name":data.N[i].orderNum > 0 ? data.N[i].GradeName + data.N[i].SubjectName+data.N[i].orderNum:data.N[i].GradeName + data.N[i].SubjectName,
                    }
                }
            }
            sele('class-learn',message,function(id){
                    planid=id;
            },function(){
                if(planid > 0){
                    xuean(planid);
                }else{
                    nodata.init('main','暂无学案信息');
                    $('.class-date').html('');
                }
            },'le');
        }
    }
});
function xuean(planid){
    $.ajax({
        type:'post',
        url:home.getApiUrl('HomeSchoolContact/LerningPath/GetPlanIndexList'),
        dataType:'json',
        data:{"OpenID":opid,"AppID":apid,"PlanId":planid},
        success:function(data){
            if(!data.N.length){
                nodata.init('main','暂无学案信息');
                $('.class-date').html('');
                return;
            }
            $('.main').html(mode());
            if(data.OK){
                var message={"data":[]};
                if(data.OK){
                    for(var i=0;i<data.N.length;i++){

                        message.data[i]={
                            "id":data.N[i].PlanIndexId,
                            "name":data.N[i].OrderName
                        }
                    }
                }
                sele('class-date',message,function(id){
                    planindexid=id;
                },function(){
                    detainls(planindexid);
                },'cl');
            }
        }
    });
}

function detainls(planindex){
    $.ajax({
        type:'post',
        url:home.getApiUrl('HomeSchoolContact/LerningPath/LessonPlanDetails'),
        dataType:'json',
        data:{"OpenID":opid,"AppID":apid,"Planindex":planindex},
        success:function(data){

            if(!data.N){
                nodata.init('main','暂无学案信息');
                return;
            }
            $('.main').html(mode());
            if(data.Result){
                if(data.N.IsTitle){
                    $('.teachplan-name').html(data.N.TitleName);
                }else{
                    $('.teachplan-name').html('');
                }
                if(data.N.IsFirst){
                    $('.cri-contain').html(data.N.FirstMark);
                }else{
                    $('.classroom-intake').html('');
                }
                if(data.N.IsTarget){
                    $('.teachaim > p ').html(data.N.TargetMark);
                }else{
                    $('.teachaim').html('');
                }
                if(data.N.IsDiff){
                    $('.diff > p ').html(data.N.DiffMark);
                }else{
                    $('.diff').html('');
                }
                if(data.N.IsSummary){
                    $('.summary > p').html(data.N.SummaryMark);
                }else{
                    $('.summary').html('');
                }

                $('.teachplan-starttime').html(time(data.N.StartTime
                ) +'~'+ time(data.N.EndTime) );
                $('.konwpoint').html('');
                $('.testway').html('');
                var poIndex=1;
                $.each(data.N.PlanPointsList,function(index,item){
                    if(item.CurrentLever == 2 && item.IsShow){
                            var par=item.PlanPointsID;
                            var wayIndex=1;
                            $('.konwpoint').append(
                                '<div id=' + item.PlanPointsID + '><p class="point-title">知识点' + poIndex + ':' + item.PointName + '</p></div>'
                            );
                            $('#'+par).append('<div class="konwpoint-title"></div>');
                            poIndex++;
                            $.each(data.N.PlanPointsList,function(index,item){
                                if(item.CurrentLever == 3 && item.IsShow && item.ParentID==par ){
                                    $('#'+item.ParentID).find('.konwpoint-title').append('<p>'+wayIndex+':'+item.PointName+'</p>');
                                    $('#'+item.ParentID).append('<div id='+item.PlanPointsID+'><p class="testway-title">考法'+wayIndex+':'+item.PointName+'</p><div class="jingpin"><p>精品例题</p></div><div class="suitang"><p>随堂练习</p></div></div>');
                                    wayIndex++;
                                }
                            });
                    }
                });
            }
            question(data.N.PlanIndexID);
        }
    });
}
function  question(planindex){
    $.ajax({
        type:'post',
        url:home.getApiUrl('HomeSchoolContact/LerningPath/GetPlanQuestionItems'),
        dataType:'json',
        data:{"OpenID":opid,"AppID":apid,"Planindex":planindex},
        success:function(data){
            $.each(data.N,function(index,item){
                item.PointType == 1 ? $('#'+item.PlanPointsID).find('.jingpin').append('<p>例题'+item.ItemIndex+'</p>'+item.ItemName +'<p>解析:</p>'+item.ItemAnaly):$('#'+item.PlanPointsID).find('.suitang').append('<p>练习'+item.ItemIndex+'</p>'+item.ItemName +'<p>解析</p>'+item.ItemAnaly);
            });
            home.initMathJaxObj('container');
            //initImg();
        }
    });
}

function  time(data){
    var stringT=data.split('T');
    var result=stringT[0].replace(/-/,'年').replace(/-/,'月');
    var h=stringT[1].split(':');
    result=result + '日 '+h[0]+':'+h[1];
    return result ;
}

//处理试题样式
/*function initImg(){
    var img=$('.konwpoint').find('img');
    var w=document.body.clientWidth || window.innerWidth;
    for(var i=0;i<img.length;i++){
        if (img.eq(i).width() >= w) {
            img.eq(i).width("100%");
        }
    }
}*/