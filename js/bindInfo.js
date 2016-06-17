/**
 * Created by yangjin on 2016/5/20.
 */
var u=require('util/util')
$(function (){
   checkIsBind();
 $("#btnbind").on("click",function(){

     if(!validateinput())
     {
         return false;
     }
     getStuInfo();
 });
});
//验证用户输入
function validateinput(){
    var stuid=$("#stuid").val();
    var stupwd=$("#stupwd").val();
    var fname=$("#fname").val();
    var fphone=$("#fphone").val();
    if(!stuid)
    {
        u.showPopMsg('请输入学生账号！');
        return false;
    }
    else {
        var numreg = /^\d{6,10}$/;
        if(!numreg.test(stuid))
        {
            u.showPopMsg('请输入有效帐号！');
            return false;
        }
    }
    if(!stupwd)
    {
        u.showPopMsg('请输入学生密码！');
        return false;
    }
    else {

    }
    if(!fname)
    {
        u.showPopMsg('请输入家长姓名！');
        return false;
    }
    else{
        if(fname.length>10)
        {
            u.showPopMsg('请输入有效姓名！');
            return false;
        }
    }
    if(!fphone)
    {
        u.showPopMsg('请输入家长手机！');
        return false;
    }
    else {
        var myreg = /^1[3|4|5|7|8]\d{9}$/;
        if(!myreg.test(fphone))
        {
            u.showPopMsg('请输入有效手机号！');
            return false;
        }
    }
    return true;
}
//获取用户信息
function getStuInfo(){
    var param={
        AppID:sessionStorage.getItem('appid'),
        OpenID:sessionStorage.getItem('openid'),
        MfgID:$("#stuid").val(),
        PWD:escape($("#stupwd").val()),
        ParentName:$("#fname").val(),
        ParentPhone:$("#fphone").val()
    };
    $.ajax({
        type: 'post',
        url:u.getApiUrl('Account/GetBindMfgID'),
        data:param,
        dataType: 'json',
        //timeout: 300,
        success: function(data){
            if(data)
            {
                if(data.OK)
                {
                    var stuname=data.Result;
                    var stuid=$("#stuid").val();
                    var pop=  require('component/pop-confirm/pop-confirm');
                    pop.show('<p> 确认要绑定学生</p>'+stuname+'（'+stuid+'）么？',function(e){
                        if(e)
                        {
                            bindStu();
                        }
                        else {

                        }
                    });
                }
                else {
                    var code=data.Code;
                    switch (code.toString())
                    {
                        case '1':
                            u.showPopMsg('账号不存在!',2);
                            break;
                        case '6':
                            u.showPopMsg('账号不存在!',2);
                            break;
                        case '7':
                            u.showPopMsg('账号或密码输入有误!',2);
                            break;
                        case '8':
                            u.showPopMsg('该用户已经绑定!',2);
                            break;
                    }

                }
            }

        },
        error: function(xhr, type){
            u.showPopMsg('绑定失败',2);
        }
    });
}
//绑定
function  bindStu(){
    var param={
        AppID:sessionStorage.getItem('appid'),
        OpenID:sessionStorage.getItem('openid'),
        MfgID:$("#stuid").val(),
        PWD:escape($("#stupwd").val()),
        ParentName:$("#fname").val(),
        ParentPhone:$("#fphone").val()
    };

    $.ajax({
        type: 'post',
        url:u.getApiUrl('Account/BindMfgID'),
        data:param,
        dataType: 'json',
        //timeout: 300,
        success: function(data){
            if(data)
            {
                if(data.OK)
                {
                    u.showPopMsg('绑定成功',1);
                    setTimeout(function(){
                        window.location.href='user-instruction.html';
                    },1000)
                }
                else {
                    var code=data.Code;
                    switch (code.toString())
                    {
                        case '1':
                            u.showPopMsg('账号不存在!',2);
                            break;
                        case '6':
                            u.showPopMsg('账号不存在!',2);
                            break;
                        case '7':
                            u.showPopMsg('账号或密码输入有误!',2);
                            break;
                        case '8':
                            u.showPopMsg('该用户已经绑定!',2);
                            break;
                    }
                }
            }

        },
        error: function(xhr, type){
            u.showPopMsg('绑定失败',2);
        }
    });

}

function checkIsBind()
{
var param = {
    AppID: sessionStorage.getItem('appid'),
    OpenID: sessionStorage.getItem('openid')
};
$.ajax({
    type: 'post',
    url: u.getApiUrl('Account/GetInit'),
    data: param,
    dataType: 'json',
    success: function (data) {
         if (data) {
            if (data.OK) {
               window.location.href='lookInfo.html';
                return;
            }
             else {
                var d=data.N;
                if(d.MfgID&&d.MfgID>0)
                {
                    $("#stuid").val(d.MfgID);
                    $("#stupwd").val('');
                    $("#fname").val(d.ParentName);
                    $("#fphone").val(d.ParentPhone);
                }
            }
        }
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
