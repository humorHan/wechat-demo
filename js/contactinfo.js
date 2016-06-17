/**
 * Created by yangjin on 2016/5/20.
 */
var u=require('util/util')
require('template-helper');
$(function () {
    var param = {
        AppID: sessionStorage.getItem('appid'),
        OpenID: sessionStorage.getItem('openid')
    };
    $.ajax({
        type: 'post',
        url: u.getApiUrl('HomeSchoolContact/ContactTeacher/GetContactTeacher'),
        data: param,
        dataType: 'json',
       // timeout: 300,
        success: function (data) {
            u.checkBind(data);
            if (data) {
                if (data.OK) {
                    var d = data.N.classSubjectTeacher;
                    if(d.length>0)
                    {
                     var d1=[];
                    for(var k=0;k< d.length;k++)
                    {
                        var item1=d[k];

                        if(item1.bgrade&&item1.subject&&item1.bgrade!=''&&item1.subject!='')
                        {
                            item1.bgradename=u.getStageStr(item1.bgrade);
                            item1.subjectname=u.getSubjectName(item1.subject);
                            d1.push(item1);
                        }

                    }

                    var tpl = require('contactteacherinfo.tpl');
                    $("#contactinfo").html(tpl(d1));
                    var xg = data.N;

                    var tpl = require('contactxueguaninfo.tpl');
                    $("#contactinfo").append(tpl(xg));
                    }
                    else {
                        //无数据
                        var nodata=require('component/no-data/no-data');
                        nodata.init('body','暂无老师联系方式');
                        return false;
                    }
                }
            }
        }
    });



})




