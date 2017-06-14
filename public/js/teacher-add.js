define(['jquery','util','template'],function($,util,template) {
	util.setMenu('/teacher/list');
	//获取参数中的tc_id
	var tcId = util.qs('tc_id',location.search);
	//提交表单处理
	function submitForm(url) {
		$('#addTeacherId').click(function() {
			$.ajax({
				type : 'post',
				url : url,
				data : $('#addTeacherForm').serialize(),
				dataType : 'json',
				success : function(data) {
					// console.log(data);
					if(data.code == 200) {
						location.href = '/teacher/list';
					}

				}
			});
		});
	}
	if(tcId){
		//根据id查询数据
		$.ajax({
			type : 'get',
			url : '/api/teacher/edit',
			data : {tc_id : tcId},
			dataType : 'json',
			success : function(data) {
				// console.log(data);
				$('#navsFlag').text('讲师编辑');
				data.result.operateFlag = '编辑';
				var html = template('addTeacherTpl',data.result);
				$('#addTeacherInfo').html(html);
				submitForm('/api/teacher/update');
			}
		});
	}else {
		$('#navsFlag').text('讲师添加');
		var html = template('addTeacherTpl',{operateFlag : '添加',tc_gender : 1});
		$('#addTeacherInfo').html(html);
		submitForm('/api/teacher/add');
	}
	
});