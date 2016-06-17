//获取公共对象
var home=require('../dep/util/util');
var nodata=require('../dep/component/no-data/no-data.js');

//获取appid opeid
var apid='',opid='';
apid=sessionStorage.getItem('appid');
opid=sessionStorage.getItem('openid');
var workid=home.getQueryString('workid');

//页面数据请求
$.ajax({
    url:home.getApiUrl('HomeSchoolContact/TodayStudyStatus/GetHomeWorkChart'),
    dataType:'json',
    data:{"OpenId":opid,"AppId":apid,"WorkId":workid},
    success:function(data){
        home.checkBind(data);
        if(!data.N){
            nodata.init('container','无数据');
            return;
        }
        if(data.OK){
            var createTime=data.N.createDateTime;
            var endTime=data.N.endDateTime;
            var homeWorkName=data.N.homeWorkName;
            var count=data.N.quesCount;
            var quesCountType=data.N.quesCountByType;
            var quesDiff=data.N.quesCountByDifficulty;

            //解析时间戳加入页面
            var ts=createTime.match(/\d+/g);
            var te=endTime.match(/\d+/g);
            var timeStart=now(parseInt(ts[0]));
            var timeEnd=now(parseInt(te[0]))
            $('.time').html('布置：'+timeStart);
            $('.title-time').html('截止：'+timeEnd);

            //解析标题题目,总数加入页面
            $('.title-name').html(homeWorkName);
            $('.work-total span').html(count);

            //传入数据生成图表
            var selData=[];
            var colData=[];
            var perCount=0;
            $.each(quesCountType,function(index,item){
                 perCount=perCount+item;
            });
            $.each(quesCountType,function(index,item){
                    selData[index]={
                        "value":item,
                        "name":((item/perCount)*100).toFixed(0) == 0 ? '':((item/perCount)*100).toFixed(0)  + '%'
                    }
            });
            $.each(quesDiff,function(index,item){
                colData[index]={
                    "name":'容易题',
                    "type":'bar',
                    "data":[item]
                }
            });

            sector(selData);
            colum(colData);
        }
    }
});

//时间戳解析
function now(second){
    var date=new Date(second);
    var y=date.getFullYear();
    var m=date.getMonth()+1;
    var d=date.getDate() > 9 ? '/' +date.getDate(): '/0' + date.getDate();
    var h=date.getHours();
    var mn=date.getMinutes();
    m=m > 9 ? '/'+ m :'/0' + m ;
    mn=mn > 9 ? ':'+ mn :':0' + mn ;
    return y+m+d+' '+h+mn;
}

//扇形图
var echarts=require('echarts.js');
function sector(data){
    var col=['#41acff','#ffac0b','#00d535'];
    var d=[];
    col=[];
    if(data[0].value)
    {
        col.push("#41acff");
        d.push(data[0]);
    }
    if(data[1].value)
    {
        col.push("#ffac0b");
        d.push(data[1]);
    }
    if(data[2].value)
    {
        col.push("#00d535");
        d.push(data[2]);
    }
    var myChart = echarts.init(document.getElementById('pie'));

    option = {
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '80%',
                center: ['40%', '50%'],

                label: {
                    normal: {
                        show: true,
                        position: 'inside',

                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '12',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:d,
            }
        ],
        color:col
    };

    myChart.setOption(option);
}
function colum(data){
    var count=0;
    $.map(data,function(item){
            if(item.data[0] > count){
                count=item.data[0];
            }
    });
    if(5 >= count){
        count=5;
    }
    var myChart = echarts.init(document.getElementById('colum'));
    option = {

        xAxis: {
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false},
            type : 'category',
            data : []
        },
        grid: {
            show:true,
            left: '2.5%',
            top:'5%',
            width:'95%',
            height:'100%',
            containLabel:true
        },
        yAxis: {
            type : 'value',
            min:0,
            interval: null,
            max:count,
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {lineStyle:{type:'dashed'}}
        },
        series:data,
        color:['#5879cd','#58cdcc','#6fd490','#ffe066','#ff6666'],
        backgroundColor:'#fff'
    };
    myChart.setOption(option);
}
$('.look').click(function(){
    window.location.href='afterClass-homework.html?workid='+workid+'';
});
