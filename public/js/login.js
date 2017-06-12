define(['jquery','cookie'],function($) {
	$('#loginId').click(function() {
		$.ajax({
			type : 'post',
			url : '/api/login',
			data : $('#loginForm').serialize(),
			dataType : 'json',
			success : function(data) {
				if(data.code == 200) {
					//把登录用户的信息存储在cookie中，方便页面之间的共享
					$.cookie('loginInfo',JSON.stringify(data.result),{path:'/'});
					location.href = '/index/index';
				}
			}
		});
		return false;
	});
});