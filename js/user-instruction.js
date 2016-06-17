/**
 * Created by Administrator on 2016/5/23.
 */
var go_study_show = require('util/util');
/*
var arr=["#study-logo1","#study-logo2","#study-logo3","#study-logo4"];
go_study_show.go_study_show("#study-logo1","#study-show1",arr);
go_study_show.go_study_show("#study-logo2","#study-show2",arr);
go_study_show.go_study_show("#study-logo3","#study-show3",arr);
go_study_show.go_study_show("#study-logo4","#study-show4",arr);*/
var arr=["#study-logo1","#study-logo2","#study-logo3","#study-logo4"];
var arr1=["#study-show1","#study-show2","#study-show3","#study-show4"];
$.map(arr,function(item,index){
    $(item).parent().on('click',function(){
        show(index);
    });
});
function show(index){
    for(var i=0;i<arr.length;i++){
        if(index == i){
            if($(arr1[i]).css('display')  == 'none' ){
                $(arr1[i]).show();
                $(arr[i]).attr("src","../bundle/img/top-jiantou.png")
            }else{
                $(arr1[i]).hide();
                $(arr[i]).attr("src", "../bundle/img/btm.png")
            }
        }else{
            $(arr1[i]).hide();
            $(arr[i]).attr("src", "../bundle/img/btm.png");
        }
    }
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
