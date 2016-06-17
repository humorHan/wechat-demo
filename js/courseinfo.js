/**
 * Created by humorHan on 2016/5/24.
 */
var mockSelect = require('component/mock-select/mock-select.js');
var util = require('util/util');
//var Mock = require('mock');
//var mockData = Mock.mock(
//    {
//        'N|3-5': [
//            {
//                'GradeID|+1': 1,
//                'GradeName|1': ['小学','初中','高中'],
//                'SubjectID|+1': 100,
//                'SubjectName|1': ['数学','语文','英语','物理','生物','化学','政治','历史']
//            }
//        ]
//    }
//);


var isCourseReady = false;
var CurrentBigGrade, CurrentSubject;
var courseInfo = {
    init: function(){
        this.initCourse();
    },
    initCourse: function(){
        var param = {
            AppID: sessionStorage.getItem('appid'),
            OpenID: sessionStorage.getItem('openid')
        };
        var tThis = this;
        //处理数据
        var subjectlist={data:[]} ;
        //$.each(subjectlist.data,function(i, item){
        //    item.id = item.GradeID + ',' + item.SubjectID;
        //    item.name = item.GradeName + item.SubjectName
        //});
        $.ajax({
            type: 'post',
            async:false,
            url:util.getApiUrl('HomeSchoolContact/Registration/GetRegistrationDropDownList'),
            data: param,
            success:function(data){
               // util.checkBind(data);

                if(data)
                {
                    if(data.OK)
                    {
                            //clist=data.N;
                            $.each(data.N, function (i, item) {
                                item.id = item.userSujectId;
                                if (item.orderNum > 0) {
                                    item.name = util.getStageStr(item.bgrade) + util.getSubjectName(item.subjectId) + item.orderNum.toString();
                                }
                                else {
                                    item.name = util.getStageStr(item.bgrade) + util.getSubjectName(item.subjectId);
                                }
                                subjectlist.data = data.N;
                            })
                    }
                    else {

                    }
                }
            }
        });

        if(subjectlist.data.length>0)
        {
            mockSelect('course', subjectlist, function(ids){
                //console.log('你需要的id集合: ' + ids);
                var arrTemp = ids.split(',');
                tThis.getcourseInfo(ids);
            },function(){
                //页面回调
                //tThis.getcourseInfo();
            },'course-option', function(flag){
                if (flag) {}
            });
        }
        else {
            //无数据
            var nodata=require('component/no-data/no-data');
            nodata.init('bg-white','暂无报名科目');
            return false;
        }

    },
    //获取课程信息
    getcourseInfo: function (id) {
        var param = {
            AppID: sessionStorage.getItem('appid'),
            OpenID: sessionStorage.getItem('openid'),
            usersubjectid:id

        };
        $.ajax({
            type: 'post',
            url: util.getApiUrl('HomeSchoolContact/Registration/GetRegistration'),
            data: param,
            dataType: 'json',
            // timeout: 300,
            success: function (data) {
               // util.checkBind(data);
                if (data) {
                    if (data.OK) {
                        var c=data.N;
                        if(c.length>0){
                            if(c[0].classStartTime&&c[0].planid>0)
                            {
                                if(c[0].classStartTime.indexOf("-")>0){
                                    $("#coursestarttime").html('未开课');
                                }
                                else {
                                    $("#coursestarttime").html('于 '+util.getLocalTime(c[0].classStartTime)+' 开课');
                                }
                            }
                            else
                            {
                                $("#coursestarttime").html('未开课');
                            }
                            var tpl=require('courseinfo.tpl');
                            $("#tbcourseinfo").html(tpl(c));
                        }
                        else {
                            //无数据
                            var nodata=require('component/no-data/no-data');
                            nodata.init('main','暂无报名科目');
                        }


                    }
                }
            }
        });
    }
};
$(function(){
    courseInfo.init();
});