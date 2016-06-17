/**
 * Created by humorHan on 2016/5/10.
 */
var webpack = require('webpack');
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');

/**
 * webpack 配置
 * @param isWatch 监听模式包括watch和cache参数
 * @param isDev   调试模式
 * @isRev isRev   版本化和压缩
 */
module.exports = function(isWatch, isDev, isRev) {
    return {
        watch: isWatch,
        devtool: isDev ? "#inline-source-map" : null,//eval-source-map
        output: {
            path: path.join(__dirname, 'bundle', 'js'),
            publicPath:'/mfg-wechat/bundle/js/',
            filename: '[name].js',
            chunkFilename: '[name].chunk.js'
        },
        module: {
            loaders: [
                {test:/\.css$/,loader:"style!css"},
                {test:/\.less$/,loader:"style!css!less"},
                {test: /\.tpl$/, loader: 'tmodjs-loader'},
                {test: /\.(png|jpeg|jpg|gif)$/, loader: 'url?limit=8192'},
                {test: /^es5-sham\.min\.js|es5-shim\.min\.js$/, loader: 'script', exclude: node_modules}
            ]
        },
        cache:isWatch,
        resolve: {
            root: [path.join(__dirname, 'js'), path.join(__dirname, 'dep')],
            extensions:['.js','.tpl','.less','.json',''],
            modulesDirectories:['dep','tpl','node_modules'],
            alias: {
                'mock': 'mock.js'
            }
        },
        plugins: (function (){
            if (isRev) {
                return [
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        }
                    }),
                    //正式包: 但是要在html中引用vendor
                    new webpack.optimize.CommonsChunkPlugin({
                        name: "vendor",
                        filename: "vendor.js",
                        minChunks: 5 //Infinity
                    })
                ]
            } else {
                return []
            }
        })(),
        externals: {
            'jquery': '$'
        }
    }
};