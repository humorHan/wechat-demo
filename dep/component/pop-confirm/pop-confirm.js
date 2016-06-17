
var poptpl = require('pop-confirm-tpl');
require('./css/pop-confirm.css');

var pop = {
    showConfirm:function(msg,callback)
    {
        var layer=document.createElement("div");
        layer.className="layer";
        document.body.appendChild(layer);
        var d={msg:msg};
        $('body').append( poptpl(d));
        $('.popconfirm').css('top',(document.documentElement.clientHeight -$('.popconfirm').height())/2);
        $(".btnok").unbind("click");
        $(".btnok").click(function(){
            $(".layer").remove();
            $(".popconfirm").remove();
            if(callback)
            {
                return callback(true);
            }

        });
        $(".btncancel,.icon-close").click(function(){
            $(".layer").remove();
            $(".popconfirm").remove();
            if(callback)
            {
                return callback(false);
            }
        });
    },
};
module.exports = {
    show: function(msg,callback){
      return  pop.showConfirm(msg,callback);
    },

};