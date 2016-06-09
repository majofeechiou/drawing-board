'use strict'
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlPack = require('html-webpack-plugin');

var FILE_SRC = 'src/';
var FILE_BUILD = 'build/';

module.exports = {
	entry: {
		'index': [ path.join( __dirname, FILE_SRC, 'index.js' ) ]
	},
	module: {
		loaders: [
            { 
                test: /\.jsx?$/, 
                loaders: ['script-loader'], 
                include: /external/
            },
            { 
                test: /\.jsx?$/, 
                loaders: ['babel-loader']
            },
            {
                test: /\.jsx?$/,  
                loader: 'babel',
                include: /lib/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader',
                    {
                        publicPath: '../',  // 回到dist，像是 background-image: url(../img/header-e147da.jpg); 就是由這控制的
                        // publicPath: path.join(__dirname, 'dist'),  // 絕對路徑是要不得的作法，你可以看你我用筆電看到的結果 -> background-image: url(D:\develop\kkdev\showcase\distimg/header-e147da.jpg);
                    }
                )
            },
            {
                test: /\.css$/,
                loader: 'postcss-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/, 
                exclude: /(node_modules|bower_components)/,
                loader: "url-loader",
                query: {
                    limit: 10000, // 若大於10kb，就會轉為base64
                    name: 'images/[name].[ext]'  // 這邊的路徑會相對於使用url-loader的loader, 也就是scss的publicPath
                }
            },
            {
                test: /\.woff(2)?$/, 
                loader: "url-loader",
                query: {
                    limit: 10000,
                    name: 'font/[name].[ext]'
                }
            },
            {
                test: /\.(ttf|eot|svg)$/, 
                loader: "file-loader",
                query: {
                    name: 'font/[name].[ext]'
                }
            }
		]
	},
	output: {
		path: path.join(__dirname, FILE_BUILD),
		filename: 'js/[name].js'
	},
	resolve: {
        extensions: ['', '.css', '.js', '.jsx'],
        alias: {
            'JsonExtend': path.join(__dirname, 'node_modules/json-extend/index.js'),
            'DeepExtend': path.join(__dirname, 'node_modules/deep-extend/index.js'),
            'ComponentEmitter': path.join(__dirname, 'node_modules/component-emitter/index.js'),
            'ReactGroup': path.join(__dirname, 'lib/react-group/index.js'),
            'ReactGroup_css': path.join(__dirname, 'lib/react-group/css/index.css'),
            'Extend': path.join(__dirname, 'lib/extend/index.js')
        }
	},
    postcss: function () {
        return [ 
            require('autoprefixer')({browsers: ['> 1%', 'IE 7']}), 
            require('precss'), 
            // require('postcss-inline-svg'),
            // require('postcss-svgo'),
            require('postcss-fontpath'), 
            require("postcss-calc"), 
            require('postcss-color-alpha'), 
            require('postcss-mixins') 
        ];
    },
	plugins: [
		// new HtmlPack({ 
		// 	title: 'Images',// 在這設定的變數，可在template.html中用 {%= o.htmlWebpackPlugin.options.title %} 帶入
		// 	filename: 'index.html', // 輸出的檔名是什麼
		// 	template: path.join( FILE_SRC, 'template/index.html' ),
		// 	inject: 'body' // 檔案會從輸出的index.html的哪裡link入
		// }),
		new ExtractTextPlugin('css/[name].css')
	]
};
