/**
 * Created by humorHan on 2016/5/26.
 */
var noDataTpl = require('no-data-tpl');
require('./css/no-data.css');

var _$el;
var noData = {
    init: function(msg){
        var p={msg:msg}
        _$el.html(noDataTpl(p));
    }
};
module.exports = {
    init: function(dom,msg){
        _$el = $("." + dom);
        noData.init(msg);
    },

};