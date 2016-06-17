//$(document).on('ajaxBeforeSend',function(e,xhr,options){
//    console.log("here is ajaxBeforSend\r\n");
//    var openid=sessionStorage.getItem('openid');
//     var appid= sessionStorage.getItem('appid');
//
//    xhr.setRequestHeader("openid",openid);
//    xhr.setRequestHeader("appid",appid);
//    //xhr. setRequestHeader('X-Request-With', null)
//
//});
//$(function(){
    var u=require('util/util');
    var appid=u.getQueryString('a');
    var appsecret= u.getQueryString('b');
    var code= u.getQueryString('code');
    //测试用
      /* var appid='wxc4cad1e99b63d1c0';
      var appsecret='test';
       var code='test';*/
    if(appid&&appsecret&&code)
    {
        var openid=sessionStorage.getItem('openid');
        if(!openid||openid=='undefined')
        {
            openid=u.getOpenId(appid,appsecret,code);
            //openid='o6RpgtxdlBPsgaJURVKtIU3W9Zko';
        }
        if(openid||openid!='undefined') {
            sessionStorage.setItem('openid', openid);
            sessionStorage.setItem('appid', appid);
        }
    }
    else
    {
        //如果url中没有appid,appsecret,code 则说明该页面不是从菜单页跳转，已经有openid了
    }

initIsBind();
function initIsBind()
{
    var isbind=sessionStorage.getItem('isbind');
    if(isbind&&isbind==1)
    {
        //$('body').show();
    }
    else{
        var param = {
            AppID: sessionStorage.getItem('appid'),
            OpenID: sessionStorage.getItem('openid')
        };
        $.ajax({
            type: 'post',
            url: u.getApiUrl('Account/GetInit'),
            data: param,
            //async:false,
            dataType: 'json',
            success: function (data) {
                if (data) {
                    if (data.OK) {
                        //$('body').show();
                        sessionStorage.setItem('isbind',1);
                            if(window.location.href.toLowerCase().indexOf('bindInfo.html'.toLowerCase())>0)
                            {
                                window.location.href='lookInfo.html';
                                return;
                            }
                        }
                    else {
                        if(window.location.href.toLowerCase().indexOf('bindInfo.html'.toLowerCase())>0)
                        {
                            //$('body').show();
                        }
                        else
                        {
                            window.location.href='bindInfo.html';
                            return;
                        }
                    }
                }
            }
        });
    }
}
//})





