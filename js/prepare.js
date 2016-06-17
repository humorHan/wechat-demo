var home=require('../dep/util/util');
var nodata=require('../dep/component/no-data/no-data.js');

//获取openid appid
var apid='',opid='';
apid=sessionStorage.getItem('appid');
opid=sessionStorage.getItem('openid');
//获取workid
var workid=home.getQueryString('workid');
//加载试题数据
detainls(workid);
function detainls(planindex){
    $.ajax({
        type:'post',
        url:home.getApiUrl('HomeSchoolContact/LerningPath/LessonPlanDetails'),
        dataType:'json',
        data:{"OpenID":opid,"AppID":apid,"Planindex":planindex},
        success:function(data){
            if(!data.N){
                nodata.init('container','无数据');
                return;
            }
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
                    $('.teachaim ').html('');
                }
                if(data.N.IsDiff){
                    $('.diff > p ').html(data.N.DiffMark);
                }else{
                    $('.diff ').html('');
                }
                $('.class-date').html(time(data.N.StartTime
                    ) +'~'+ time1(data.N.EndTime) );
                $('.teachplan-starttime').html(data.UserName);
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
                item.PointType == 1 ? $('#'+item.PlanPointsID).find('.jingpin').append('<p>例题'+item.ItemIndex+'</p>'+item.ItemName):$('#'+item.PlanPointsID).find('.suitang').append('<p>练习'+item.ItemIndex+'</p>'+item.ItemName);
            });
            home.initMathJaxObj('container');
        }
    });
}

function  time(data){
    var str=data.split(':');
    var result='上课:'+str[0].replace(/-/g,'/').replace('T','&nbsp')+':'+str[1];
    return result ;
}
function  time1(data){
    var str=data.split('T');
    var str2=str[1].split(':');
    var result=str2[0] +':'+ str2[1];
    return result ;
}