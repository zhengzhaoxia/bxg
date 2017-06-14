define(['jquery','template','nprogress','cookie'],function($,template,nprogress) {
	//控制左侧菜单的折叠和展开
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});
	$('#logout').click(function() {
		$.ajax({
			type : 'post',
			url : '/api/logout',
			dataType : 'json',
			success : function(data) {
				// $.removeCookie('loginInfo',{path:'/'});
				location.href = '/login';
			}
		});
	});
	//获取请求路径
	var pathname = location.pathname;
	//判断用户是否已经登录过
	if(pathname != '/login' && !$.cookie('PHPSESSID')) {
		//没有登录的情况要重新跳转到登录页面
		location.href = '/login';
	}
	//获取登录用户的cookie信息
	var loginInfo = $.cookie('loginInfo') && JSON.parse($.cookie('loginInfo'));
	//如果存在，渲染页面
	if(loginInfo) {
		var loginTpl = '<div class="avatar img-circle"><img src="{{tc_avatar}}"></div><h4>{{tc_name}}</h4>';
		var html = template.render(loginTpl,loginInfo);
		$('#loginInfoTpl').html(html);
		//渲染页面
		// $('.aside .profile').find('img').attr('src',loginInfo.tc_avatar);
		// $('.aside .profile').find('h4').text(loginInfo.tc_name);
	}
	// var pathname = location.pathname;
	// console.log(pathname);
	$(document).ajaxStart(function() {
		$('.overlay').show();
	});
	$(document).ajaxStop(function() {
		$('.overlay').hide();
	});
	nprogress.start();
	nprogress.done();
});



	