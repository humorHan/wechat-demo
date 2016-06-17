/**
 * Created by yangjin on 2016/5/20.
 */
var u=require('util/util')
$(function () {
    var param = {
        AppID: sessionStorage.getItem('appid'),
        OpenID: sessionStorage.getItem('openid')
    };

    $.ajax({
        type: 'post',
        url: u.getApiUrl('Account/GetBindMfgInfo'),
        data: param,
        dataType: 'json',
        //timeout: 300,
        success: function (data) {
            //u.checkBind(data);
            if (data) {
                if (data.OK) {
                    var d = data.N;
                    var tpl = require('lookinfostu.tpl');
                    $("#stuinfo").html(tpl(d));
                    var tpl = require('lookinfoparent.tpl');
                    $("#parentinfo").html(tpl(d));
                }
            }
        }
    });


    $("#btnunbind").click(function () {
        var stuname = $("#stuname").html().trim();
        var stuid = $("#stuid").html().trim();
        //hack iphone
        if(stuid.indexOf("a")>0)
        {
            stuid=$(stuid).html();
        }
        var pop=  require('component/pop-confirm/pop-confirm');
        pop.show('<p>确认解除与学生</p>' + stuname + '（' + stuid + '）的绑定么？', function (e) {
            if (e) {
                unbindstu();
            }
            else {

            }
        });
        //u.showConfirm('确认解除与' + stuname + '（' + stuid + '）的绑定么？', function (e) {
        //    if (e) {
        //        unbindstu();
        //    }
        //    else {
        //
        //    }
        //});

    });
})
//解绑用户
function unbindstu()
{
    var param={
        AppID:sessionStorage.getItem('appid'),
        OpenID:sessionStorage.getItem('openid')
    };

    $.ajax({
        type: 'post',
        url:u.getApiUrl('Account/UnBindMfgID'),
        data:param,
        dataType: 'json',
        //timeout: 300,
        success: function(data){
            if(data)
            {
                if(data.OK)
                {
                    u.showPopMsg('解绑成功',1);
                    setTimeout(function(){
                        window.location.href='bindinfo.html';
                    },1000)
                }
                else {
                    u.showPopMsg('解绑失败',2);
                }
            }

        },
        error: function(xhr, type){
            //alert('Ajax error!')
            u.showPopMsg('解绑失败',2);
        }
    });
}

pushHistory();
window.addEventListener("popstate", function(e) {
    WeixinJSBridge.invoke('closeWindow',{
    },function(res){
        //alert("close");
        //console.log(res.err_msg);
    });
}, false);
function pushHistory() {
    var state = {
        title: "title",
        url: "#"
    };
    window.history.pushState(state, "title", "#");
}



