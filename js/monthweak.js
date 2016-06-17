//获取公共对象
var home=require('../dep/util/util');
home.go_menu('container');
//获取无数据状态
var nodata=require('../dep/component/no-data/no-data.js');
//获取下来框对象
var sele=require('../dep/component/mock-select/mock-select.js');
//获取appid opeid
var apid='',opid='';
    apid=sessionStorage.getItem('appid');
    opid=sessionStorage.getItem('openid');

//声明下拉表单的默认值
var seleId='';
var seleName=null;
//获取下拉框数据生成下来框
    //请求科目
    $.ajax({
        async:false,
        type:'post',
        url:home.getApiUrl('HomeSchoolContact/LerningPath/GetSubjectGradeListHomeWork'),
        dataType:'json',
        data:{"OpenId":opid,"AppId":apid},
        success:function(data){
            home.checkBind(data);
            if(!data.N.length){
                nodata.init('container','暂无当月弱项信息');
                return;
            }
            var message={"data":[]};
            if(data.OK){
                for(var i=0;i<data.N.length;i++){
                    message.data[i]={
                        "id":data.N[i].GradeID +',' + data.N[i].SubjectID,
                        "name":data.N[i].GradeName + data.N[i].SubjectName
                    }
                }
            }
           sele('subject',message,function(id){
                seleId=id.split(',');
           },function(){
               if(seleName !== null){
                   cont(seleId[0],seleId[1],seleName);
               }
           },'op');
        }
    });

    //请求月份
$.ajax({
    async:false,
    type:'post',
    url:home.getApiUrl('HomeSchoolContact/LerningPath/GraspAnalyzeMonthList'),
    dataType:'json',
    data:{"OpenId":opid,"AppId":apid},
    success:function(dt){
        home.checkBind(dt);

        if(!dt.length){
            nodata.init('container','暂无当月弱项信息');
            return;
        }
        
        var message={"data":[]};
        for(var i=0;i<dt.length;i++){
            message.data[i]={
                "id":dt[i],
                "name":dt[i]
            }
        }

        sele('date1',message,function(name){
            seleName=name;

        },function(){
            if(seleId.length){
                cont(seleId[0],seleId[1],seleName);
            }
        },'dt');

    }
});

//生成下拉框

//页面主体显示内容
function cont(gid,sid,month){
        var ur=home.getApiUrl('HomeSchoolContact/LerningPath/GraspAnalyze');
        var message={
            "OpenId":opid,
            "AppID":apid,
            "CurrentBigGrade":gid,
            "CurrentSubject":sid,
            "month":month,
        };
        $.ajax({
            type:'post',
            url:ur,
            dataType:'json',
            data:message,
            success:function(data){
                if(!data.N){
                    nodata.init('user','暂无当月弱项信息');
                    return ;
                }
                if(data.OK){
                    $('.user-name').html(data.N.StudentName);
                    $('.user-subject').html(data.N.SubjectName);
                    $('.user-month').html(data.N.DefaultMonthDesc);
                    $('.konwpoint').remove();
                    $.each(data.N.Top10List,function(index,item){
                            var rate=parseInt(item.rate * 100)+'%';
                             var name=item.name+'（'+rate+'）';
                            $('.user').append('<li class="konwpoint"><p>'+name+'</p><div class="progress"><p></p></div></li>');
                            $('.progress > p').eq(index).css({width:rate});
                    });
                }

            }
        });
}
