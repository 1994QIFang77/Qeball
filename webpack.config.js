
var webpack = require('webpack');//用于访问内置插件（组件）：CommonsChunkPlugin
var ExtractTextPlugin = require("extract-text-webpack-plugin");//用于单独打包css
var HtmlWebpackPlugin = require("html-webpack-plugin");//用于单独打包html


// 环境变量配置，dev / online
var WEBPACK_ENV= process.env.WEBPACK_ENV || 'dev';

console.log(WEBPACK_ENV);

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name, title){//将view里面的htl与src里面对应的js，一起打包放在dist里面（html引入对应的js）
		return {
			template: './src/view/'+ name +'.html',//html原始的模板
			filename: 'view/'+ name +'.html',//目标文件的位置（打包存放位置）
			favicon : './favicon.ico',
			title: title,
			inject: true,//html文件中嵌入的script放置的位置 将JS 文件注入的位置
			hash: true,
			chunks: ['common',name]//设定只引入html需要的js，就是本页面引入的js块（这里是只引入公共逻辑模块和本身文件逻辑模块）
			//excludeChunks[] 排除用不上的chunks
		};
};
//webpack config
var config = {
	entry:{ //打包入口
		'common': ['./src/page/common/index.js'],//公共的js（footer、header、nav、nav-side、nav-simple）
		'index': ['./src/page/index/index.js'],
		'list' : ['./src/page/list/index.js'],
		'detail' : ['./src/page/detail/index.js'],
		'cart' : ['./src/page/cart/index.js'],
		'order-confirm': ['./src/page/order-confirm/index.js'],
        'order-list': ['./src/page/order-list/index.js'],
        'order-detail': ['./src/page/order-detail/index.js'],
		'payment': ['./src/page/payment/index.js'],
		'user-login':['./src/page/user-login/index.js'],
		'user-register': ['./src/page/user-register/index.js'],
		'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
		'user-center': ['./src/page/user-center/index.js'],
		'user-center-update': ['./src/page/user-center-update/index.js'],
		'user-pass-update'  : ['./src/page/user-pass-update/index.js'],
		'result': ['./src/page/result/index.js'],
		'about' : ['./src/page/about/index.js']
	},
	output: { //打包出口 目标文件，__dirname:运行时的当前路径
        path        : __dirname + '/dist/',//存放目标文件路径
        publicPath  : WEBPACK_ENV === "dev" ? "/dist/" : "/dist/",//上线使用，访问文件路径
        filename    : 'js/[name].js'
    },
	externals :{//外部依赖声明
		'jquery':'window.jQuery'
	},
	module: { //各种文件，各种loader
        loaders: [
			//test的意思是对文件名进行按照后面的正则表达式进行正则匹配，匹配符合则使用后面对应的loader进行处理
            { 
				test: /\.css$/, //处理css文件
				loader: ExtractTextPlugin.extract("style-loader","css-loader") 
			},
            { 
				//file-loader:处理图片文件，在CSS中路径中指定的文件（url）、<img src = ""。 在组件中（动态html），src引用相对会加载失败

				//url-loader：与file-loader类似，但是url-loader可以指定一个limit参数，
				//当文件或图片大于limit时，会让file处理，
				//当小于限定的大小时，url-loader 会将URL转为base64位编码的格式，不在是url地址了，直接就是一段编码
				test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, //处理图片文件
				loader: 'url-loader?limit=100&name=resource/[name].[ext]' 
			},
            {
                test: /\.string$/, //处理动态html文件
                loader: 'html-loader',
                query : {
                    minimize : true,
                    removeAttributeQuotes : false
                }
            }
        ]
	},
	resolve : {//配置目录别名
        alias : {
			node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
	plugins:[//插件
		//独立 通用模块
		new webpack.optimize.CommonsChunkPlugin({//公共的js，打包到/dist/js/base.js
			name: 'common',
			filename: 'js/base.js'//所有输出的filename都基于path，放在path下面
		}),
		
		new ExtractTextPlugin("css/[name].css"),//把CSS单独打包到文件里

		//html模板的处理
		new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
		new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表')),
		new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('payment', '订单支付')),
		new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
		new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
		new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
		new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
		new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
		new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
		new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
		new HtmlWebpackPlugin(getHtmlConfig('about', '关于Qeball'))
	],
	devServer: {
        port: 8088,
        inline: true,
        proxy : {
            '**/*.do' : {
                target: 'http://test.happymmall.com',
                changeOrigin : true
            }
        }
    }
};
// if('dev' === WEBPACK_ENV){
// 	config.enyry.common.push('webpack-dev-server/client?http://localhost:8088/');
// }
module.exports = config;
