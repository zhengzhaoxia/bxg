define(['jquery','template','bootstrap'],function($,template) {
	//加载列表数据
	$.ajax({
		type : 'get',
		url : '/api/teacher',
		dataType : 'json',
		success : function(data) {
			// console.log(data);
			var html = template('teacherInfoTpl',{list:data.result});
			$('#teacherInfo').html(html);
			$('#teacherInfo').find('.preview').click(function() {
				var tcId = $(this).closest('td').attr('data-id');
				// console.log(tcId);
				$.ajax({
					type : 'get',
					url : '/api/teacher/view',
					data : {tc_id:tcId},
					dataType : 'json',
					success : function(data) {
						// data.result.tc_hometown = data.result.tc_hometown.replace(/[|]/g,' ');
						// data.result.tc_hometown = data.result.tc_hometown.replace(/\|/g,' ');
						data.result.tc_hometown = data.result.tc_hometown.split('|').join(' ');
						var html = template('teacherModalTpl',data.result);
						$('#teacherModalInfo').html(html);
						$('#teacherModal').modal();
					}
				});
				// 防止跳转的默认事件
				return false;
			});
		}
	});
});