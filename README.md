# Qeball--- 一个多页面的前端电商网站项目

## 简介
这是一个基于Common.js规范，采用webpack打包和npm包管理工具的电商平台。
整个项目从需求分析到项目的脚手架，再到业务代码的开发以及最后的项目上线，都由本人一个人完成。
## 线上访问地址：http://129.204.58.235  (本人还没申请域名 = =|| )
### 注，项目中使用的数据接口都来源于[https://gitee.com/imooccode/happymmallwiki/wikis/Home]
## 项目功能模块

* 用户模块（注册、登录、找回密码、个人中心（修改个人信息）、修改密码）
* 商品模块（首页、商品列表页、商品详情页）
* 购物车模块
* 订单模块（订单页（地址管理）、订单列表页、订单详情页）
* 支付模块

下面是一些开发项目中的笔记

## 网站技术&配置:
* 技术栈：Html+CSS+JavaScript+JQuery
* 模块化方案：CommonJS+Webpack
* 版本控制工具：Git
* 开发环境：npm:Node Package Manager
* 架构模式：前后端完全分离，纯静态方式，分层架构模块化

## 项目分包版本管理 
### npm （package.json）
用来管理包，以及脚本的运行。本地下载安装
* npm init ：项目初始化 初始化完成后，会在项目根目录下生成一个package.json文件，这个文件用来存放npm各种信息
* 使用--save-dev安装的包的信息也会存放到这个文件中
* -g ：全局配置
* npm run dev ：运行自己的快捷脚本，在package.json文件里面的script中进行dev配置

### Git
 用来控制项目版本，让本地开发代码与远程仓库进行连接。本地下载安装
* git使用vim gitconfig来配置（用户、邮箱、别名）
* git clone 远程仓库项目链接:将远程的仓库项目文件clone到本地
* git init ：初始化
* git checkout branch:切换分支
* git merge：合并分支
* git pull origin master
* git status :查看当前文件状态
* git add . :追踪当前的文件
* git commit -am '注释' :把当前的文件做一个提交，提交到本地
* git push :将文件提交到远程代码库
* git tag tag-dev-名字
* git push origin tage-dev-名字 ：打tag（提交之后打一个tag，方便以后找分支）

### webpack （webpack.config.js）
是静态资源打包工具：把前端涉及到的所有文件都通过js的require组织起来，最后以JS为入口。使用npm来 install 依赖包。
* 下载：
* npm install webpack -g: 全局webpack安装
* npm install webpack@1.15.0 --save-dev 本地安装（本项目）
* --save-dev 是你开发时候依赖的东西，--save 是你发布之后还依赖的东西。

 一些常用的命令：
* webpack：以不压缩的形式来打包，常用于调试代码用
* webpack -p ：上线发布时的打包，会把所有文件做最小化压缩
* webpack --watch ：监听文件的改变，自动编译，不能自动刷新浏览器（每次更改内容，自动打包），用于开发过程
* webpack --config webpack.config.js : 指定webpack配置文件
* webpack-dev-server:
	* 前端开发服务器，监听文件的改变，自动刷新浏览器
	* 安装：npm install webpack-dev-server --save-dev
    
webpack配置文件：
	* webpack.config.js
* webpack.config.js下主要参数：
	* entry：打包入口。这个entry可以是一个文件，可以是一个数组（平行文件），也可以是一个对象（多页面使用）
	* output：目标文件（出口）。可以设置一个或多个
	* module：各种loader，webpack的loader的配置是从右往左的
		* 常用loader：
  			* html：html-loader
			* css： css-loader + style-loader
  			* img： url-loader、file-loader、image-loader
 			* js：  babel-loader + babel-preset-es2015 
	* plugins:插件
		* 常用的plugins：
 			* html模板：html-webpack-plugin  
      			* 安装：npm install html-webpack-plugin --save-dev npm install html-loader --save-dev
      			* 用法：<%= require('html-loader!./layout/html-head.html') %>
 			*  公共模块：CommonsChunkPlugin
  			* 单独打包css：extract-text-webpack-plugin
  
	* externals：外部依赖声明，例如：'jquery':'window.jQuery'
	* resolve：配置目录别名

webpack的打包过程：
把项目当做一个整体，输入命令后，会从项目里的webpack.config.js中的entry（入口）中给定的主文件(一个或多个)开始，然后webpack将从这个文件开始找到项目里所有的依赖文件，使用loader处理他们，最后打包成一个或者多个（由output设置打包的目标文件个数）浏览器可识别的JS文件。

### Hogan
一个页面模板，用来渲染模板
* 语法：
	* {{}} : 带转义的显示信息
	* {{{}}} : 不带转移的，用于显示数据就是html格式的
	* {{#imageList}} {{/imageList}} : 遍历imageList集合， {{.}} 表示集中的item
	* {{^title}} message{{title}}： title不存在的时候显示message

### 分层架构
* 逻辑层：page文件     ->   用于js、css的实现
* 数据层：service文件  ->   用于数据交互，请求数据
* 工具层：uitl文件     ->   一些显示某些特定功能的工具（轮播图插件、地址二级联动、分页...）
* html： view文件      ->  页面html代码
* 图片： image文件     ->  本地图片

### 通用工具 （util/feb-util.js）
* 网络请求（ajax）
* URL路径获取
* 模板渲染工具 （hogan）
* 通用字段验证
* 通用操作结果提示
* 统一跳转（登录）

### 公共html（通用） (view/layout)
* footer.html、header.html、nav.html、nav-side.html、nav-simple.html
* 对于的公共css、js在 page/common下

### 通用css  (page/common/layout.css)

### 业务开发
#### 用户模块
* 功能
	* 用户登录（user-login）
  	* 用户注册（user-register）
  	* 找回密码（user-pass-reset）
  	* 个人中心（小型SPA）（user-center）
		* 修改个人信息 （user-center-update）
        	* 修改密码（user-pass-update）
* 主要处理
    	* 数据安全性处理方案、表单异步验证、事件委托/绑定/监听、hogan模板的动态渲染

#### 商品模块
* 功能
  	* 首页（index）
   	* 商品列表页（list）
   	* 商品详情页（detail）
* 主要处理
   	* 分页、排序、轮播图插件的封装使用
   
#### 购物车模块
* 功能
  	* 购物车（cart）
* 主要处理
  	* 购物车商品展示、修改购物车数量、选择和取消选择，全选，反选，商品
  
#### 订单模块
* 功能
  	* 订单页(地址管理)（order-confirm）
  	* 订单列表页（order-list）
  	* 订单详情页（order-detail）
* 主要处理
	* 地址（城市级联操作）、地址复杂表单回填

#### 支付模块 
*  功能
  	* 支付（payment）

### 线上发布
*  线将本地的代码提交到远程，再合并分支（master）.
#### 注意！！！！src文件下的代码是开发时的代码，我们要发布的是经过webpack打包生成的dist文件
* 服务器配置 
  	* 使用gitbash连接线上服务器（自己需要租），输入ssh root@[输入用户名]回车，输入密码。
   	* 进入线上服务器，安装项目所依赖的环境（webpack、git、nginx）
* 将远程仓库的合并过的（master）代码拉下来，拉到线上服务器，并 npm init 初始化
* 配置nginx
  	* 这里不建议在nginx.conf主配置里面直接配置
  	* 建议在nginx目录下，建一个vhost文件，在vhost目录下的文件里配置，然后在nginx.conf下面需要加上： include vhost/*.conf;
  #### 因为我使用的是IP，没有用域名，所以css、js和html一起配置了
  以下是我的配置
  
 ```
server {
listen 80;   //端口号
autoindex on;
server_name 129.204.58.235;//如果有域名，这个可以写域名
access_log /usr/local/nginx/logs/access.log combined;
index index.html index.htm index.jsp index.php;
if ( $query_string ~* ".*[\;'\<\>].*" ){
        return 404;
        }

location = / {
        root /product/frontend/mmall-fe/dist/view;
        index index.html;
}

location ~ .*\.html$ {
        root /product/frontend/qeb-fe/dist/view;
        index index.html index.htm;
}
location ~ .*\.css$ {
        root /product/frontend/qeb-fe;
}
location ~ .*\.js$ {
        root /product/frontend/qeb-fe;
}

location ~ .*\.(png|jpg|gif|svg)$ {
        root /product/frontend/qeb-fe;
}		
location ~ .*\.(eot|otf|ttf|woff|svg|woff2)$ {
        root /product/frontend/qeb-fe;
	    add_header Access-Contorl-Allow-Origin *;
}

location / {
      proxy_pass http://test.happymmall.com;
      //因为这个项目用的是“http://test.happymmall.com;”这个网站的数据，以及接口。所以需要代理
}
}

```

### 开发遇到的难题：
* 脚手架搭建，开发环境搭建 ：webpack.config.js的配置，版本兼容问题
* 订单页面，地址级联问题
* 线上发布，关于IP地址的nginx配置问题



